
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getPedidosPorUsuario } from "../../services/pedidosService";
import puntosRetiro from "../../mocks/data/puntosRetiro.json";

export default function MisPedidos() {

  const { usuario } = useAuth();

  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Consulta los pedidos del cliente.
  useEffect(() => {
    let activo = true;

    const cargarPedidos = async () => {
      try {
        setCargando(true);
        setError("");

        const resultado = await getPedidosPorUsuario(usuario.id);

        if (activo) {
          setPedidos(resultado);
        }

      } catch (error) {
        if (activo) {
          setError(error.message || "No se pudieron cargar los pedidos.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    if (usuario?.id != null) {
      cargarPedidos();
    } else {
      setPedidos([]);
      setCargando(false);
    }

    return () => {
      activo = false;
    };

  }, [usuario?.id]);

  return (
    <main className="container my-4">

      <h2>Mis pedidos</h2>

      {cargando && <p>Cargando pedidos...</p>}

      {error && (

        <div className="alert alert-danger" role="alert">

          {error}

        </div>
      )}

      {!cargando && !error && pedidos.length === 0 && (
        <p>No tienes pedidos registrados.</p>
      )}

      {!cargando && !error && pedidos.map((pedido) => (
        <div className="card mb-3" key={pedido.id}>

          <div className="card-body">

            <h3>Pedido N° {pedido.id}</h3>

            <p>
              Fecha: {new Date(pedido.fecha).toLocaleString("es-CL")}
            </p>

            <p>
              Estado: {
                pedido.estado === "EN_PREPARACION"
                  ? "En preparación"
                  : pedido.estado === "DESPACHADO"
                    ? "Despachado"
                    : pedido.estado === "ENTREGADO"
                      ? "Entregado"
                      : pedido.estado
              }
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
              Tipo de entrega: {pedido.tipoEntrega === "retiro"
                ? "Retiro en tienda"
                : "Despacho a domicilio"}
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

            <h4>

              Productos

            </h4>

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

          </div>

        </div>
      ))}

    </main>
  );
}
