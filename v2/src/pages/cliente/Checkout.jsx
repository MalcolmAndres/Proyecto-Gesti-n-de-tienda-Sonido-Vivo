import { useCart } from "../../hooks/useCart";
import { useState } from "react";

export default function Checkout() {

  // Obtenemos productos y total carrito.
  const { carrito, totalCarrito } = useCart();
  const [tipoEntrega, setTipoEntrega] = useState("retiro");

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

          </section>

        </div>
      )}

    </main>
  );
}
