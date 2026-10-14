import puntosRetiro from "../../mocks/data/puntosRetiro.json";
import { useEffect, useState } from "react";
import {
  getPedidos,
  actualizarEstadoPedido
} from "../../services/pedidosService";

export default function GestionPedidos() {

  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [actualizandoId, setActualizandoId] = useState(null);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const resultado = await getPedidos();
        setPedidos(resultado);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarPedidos();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      setActualizandoId(id);
      setError("");

      const pedidoActualizado = await actualizarEstadoPedido(
        id,
        nuevoEstado
      );

      setPedidos((pedidosActuales) =>
        pedidosActuales.map((pedido) =>
          pedido.id === id
            ? { ...pedidoActualizado }
            : pedido
        )
      );

    } catch (error) {
      setError(error.message);
    } finally {
      setActualizandoId(null);
    }
  };

  const nombreEstado = (estado) => {
    switch (estado) {
      case "EN_PREPARACION":
        return "En preparación";
      case "DESPACHADO":
        return "Despachado";
      case "ENTREGADO":
        return "Entregado";
      default:
        return estado;
    }
  };

  return (
    <main className="container my-4">

      <h2>Gestión de pedidos</h2>

      {cargando && <p>Cargando pedidos...</p>}

      {error && (

        <div className="alert alert-danger" role="alert">

          {error}

        </div>
      )}

      {!cargando && pedidos.length === 0 && (
        <p>No hay pedidos registrados.</p>
      )}

      {!cargando && pedidos.map((pedido) => (

        <div className="card mb-3" key={pedido.id}>

          <div className="card-body">

            <h5>Pedido N° {pedido.id}</h5>

            <p>

              Cliente ID: {pedido.usuarioId}

            </p>

            <p>

              Fecha: {new Date(pedido.fecha).toLocaleString("es-CL")}

            </p>

            <p>

              Estado: {nombreEstado(pedido.estado)}

            </p>

            <p>
              Método de pago: {
                pedido.metodoPago === "TARJETA"
                  ? "Tarjeta de débito o crédito"
                  : pedido.metodoPago === "TRANSFERENCIA"
                    ? "Transferencia bancaria"
                    : pedido.metodoPago === "EFECTIVO"
                      ? "Efectivo al retirar"
                      : "No registrado"
              }
            </p>

            <p>
              Tipo de entrega: {
                pedido.tipoEntrega === "retiro"
                  ? "Retiro en tienda"
                  : "Despacho a domicilio"
              }
            </p>

            {pedido.tipoEntrega === "domicilio" && (

              <p>Dirección: {pedido.direccion}</p>

            )}

            {pedido.tipoEntrega === "retiro" && (
              <p>
                Punto de retiro: {
                  puntosRetiro.find(
                    (punto) => String(punto.id) === String(pedido.puntoRetiro)
                  )?.nombre || "No disponible"
                }
              </p>
            )}

            <h6>Productos</h6>

            <ul>

              {pedido.productos.map((producto) => (

                <li key={producto.id}>
                  {producto.nombre} - Cantidad: {producto.cantidad}
                </li>

              ))}

            </ul>

            <h5>

              Total: ${pedido.total.toLocaleString("es-CL")}

            </h5>

            <label
              className="form-label"
              htmlFor={`estado-${pedido.id}`}
            >
              Cambiar estado

            </label>

            <select

              id={`estado-${pedido.id}`}
              className="form-select"
              value={pedido.estado}
              disabled={
                actualizandoId === pedido.id ||
                pedido.estado === "ENTREGADO"
              }
              onChange={(e) =>
                cambiarEstado(pedido.id, e.target.value)
              }
            >
              <option value="EN_PREPARACION" disabled={pedido.estado !== "EN_PREPARACION"}>

                En preparación

              </option>

              <option value="DESPACHADO" disabled={pedido.estado !== "EN_PREPARACION"}>

                Despachado

              </option>

              <option value="ENTREGADO" disabled={pedido.estado !== "DESPACHADO"}>

                Entregado

              </option>

            </select>

          </div>
        </div>

      ))}

    </main>
  );
}
