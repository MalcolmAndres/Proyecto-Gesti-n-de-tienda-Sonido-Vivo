import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import puntosRetiro from "../../mocks/data/puntosRetiro.json";
import Mapa from "../../components/Mapa";
import { useAuth } from "../../hooks/useAuth";
import { crearPedido } from "../../services/pedidosService";

export default function Checkout() {

  const { carrito, totalCarrito, vaciarCarrito } = useCart();// se obtiene los productos y total de carrito
  const { usuario } = useAuth();// se obtiene el usuario que inició sesión
  const [tipoEntrega, setTipoEntrega] = useState("retiro");
  const [direccion, setDireccion] = useState("");
  const [puntoRetiro, setPuntoRetiro] = useState("");
  const [mensaje, setMensaje] = useState(""); // mensaje validación pedido
  const [procesando, setProcesando] = useState(false);

  // valida los datos de entrega y registra el pedido
  const validarPedido = async () => {

    if (procesando) return;

    if (carrito.length === 0) {
      setMensaje("El carrito está vacío.");
      return;
    }

    if (!usuario) {
      setMensaje("Debe iniciar sesión para confirmar el pedido.");
      return;
    }

    if (tipoEntrega === "retiro" && !puntoRetiro) {
      setMensaje("Debe seleccionar un punto de retiro.");
      return;
    }

    if (tipoEntrega === "domicilio" && !direccion.trim()) {
      setMensaje("Debe ingresar una dirección de despacho.");
      return;
    }

    const datosPedido = {
      usuarioId: usuario.id,
      productos: carrito.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
      })),
      total: totalCarrito,
      tipoEntrega,
      direccion: tipoEntrega === "domicilio" ? direccion.trim() : null,
      puntoRetiro: tipoEntrega === "retiro" ? Number(puntoRetiro) : null,
    };

    try {
      setProcesando(true);
      setMensaje("");

      const pedido = await crearPedido(datosPedido);

      vaciarCarrito();

      setMensaje(`Pedido N° ${pedido.id} registrado correctamente.`);

    } catch (error) {
      setMensaje(error.message || "No se pudo registrar el pedido.");
    } finally {
      setProcesando(false);
    }
  };


  return (
    <main className="container my-4">

      <h2>Confirmar pedido</h2>

      {/*mensaje validación*/}
      {mensaje && (

        <div className="alert alert-info mt-4" role="alert">

          {mensaje}

        </div>

      )}

      <h3 className="mt-4">Resumen de compra</h3>

      {carrito.length === 0 ? (
        <p>No tienes productos para comprar.</p>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div
              className="card mb-3"
              key={producto.id}
            >
              <div className="card-body">

                <h5>{producto.nombre}</h5>

                <p>Cantidad: {producto.cantidad}</p>

                <p>Subtotal: ${(producto.precio * producto.cantidad).toLocaleString("es-CL")}</p>

              </div>

            </div>
          ))}

          <h4>

            Total: ${totalCarrito.toLocaleString("es-CL")}

          </h4>

          {/*Selección del tipo de entrega*/}
          <section className="mt-4">

            <h5>Tipo de entrega</h5>

            <div className="form-check">

              <input
                className="form-check-input"
                type="radio"
                name="tipoEntrega"
                id="retiro"
                value="retiro"
                checked={tipoEntrega === "retiro"}
                onChange={() => setTipoEntrega("retiro")}
              />

              <label className="form-check-label" htmlFor="retiro">

                Retiro en tienda

              </label>

            </div>

            <div className="form-check">

              <input
                className="form-check-input"
                type="radio"
                name="tipoEntrega"
                id="domicilio"
                value="domicilio"
                checked={tipoEntrega === "domicilio"}
                onChange={() => setTipoEntrega("domicilio")}
              />

              <label className="form-check-label" htmlFor="domicilio">

                Despacho a domicilio

              </label>

            </div>

            {/*muestra la dirección cuando se selecciona un despacho*/}
            {tipoEntrega === "domicilio" && (

              <div className="mt-3">

                <label htmlFor="direccion" className="form-label">

                  Dirección de despacho

                </label>

                <input

                  type="text"
                  id="direccion"
                  className="form-control"
                  placeholder="Ingrese su dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)} />

              </div>
            )}

            {/*muestra los puntos disponibles para retiro*/}
            {tipoEntrega === "retiro" && (

              <div className="mt-3">

                <label htmlFor="puntoRetiro" className="form-label">

                  Punto de retiro

                </label>

                <select

                  id="puntoRetiro"
                  className="form-select"
                  value={puntoRetiro}
                  onChange={(e) => setPuntoRetiro(e.target.value)}
                >
                  <option value="">Seleccione un punto de retiro</option>

                  {puntosRetiro.map((punto) => (
                    <option key={punto.id} value={punto.id}>
                      {punto.nombre}
                    </option>
                  ))}

                </select>

                <Mapa puntoSeleccionado={puntoRetiro} />

              </div>

            )}

          </section>

          {/*validar pedido*/}

          <button

            type="button"
            className="btn btn-warning mt-3"
            onClick={validarPedido}
            disabled={procesando}
          >
            {procesando ? "Registrando pedido..." : "Confirmar pedido"}

          </button>

        </div>
      )}

    </main>

  );

}
