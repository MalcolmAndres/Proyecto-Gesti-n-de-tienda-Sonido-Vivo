import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import puntosRetiro from "../../mocks/data/puntosRetiro.json";
import Mapa from "../../components/Mapa";

export default function Checkout() {

  // Obtenemos productos y total carrito.
  const { carrito, totalCarrito } = useCart();
  const [tipoEntrega, setTipoEntrega] = useState("retiro");
  const [direccion, setDireccion] = useState("");
  const [puntoRetiro, setPuntoRetiro] = useState("");
  const [mensaje, setMensaje] = useState(""); // Mensaje validación pedido


  // Valida los datos de entrega antes de confirmar
  const validarPedido = () => {

    if (carrito.length === 0) {
      setMensaje("El carrito está vacío.");
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

    setMensaje("Los datos del pedido son correctos.");
  };

  return (
    <main className="container my-4">

      <h2>Confirmar pedido</h2>

      <h4 className="mt-4">Resumen de compra</h4>

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

            <h6>Tipo de entrega</h6>

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

          {/*mensaje validación*/}
          {mensaje && (

            <div className="alert alert-info mt-4" role="alert">

              {mensaje}

            </div>

          )}

          {/*validar pedido*/}

          <button

            type="button"
            className="btn btn-warning mt-3"
            onClick={validarPedido}
          >
            Confirmar pedido

          </button>

        </div>
      )}

    </main>

  );
  
}
