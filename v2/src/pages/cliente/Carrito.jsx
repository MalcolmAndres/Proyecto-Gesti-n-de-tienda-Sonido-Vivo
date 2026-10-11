import { useCart } from "../../hooks/useCart";
import instrumentos from "../../../../v1/data/instrumentos.json";

export default function Carrito() {

  const {
    carrito,
    totalCarrito,
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito
  } = useCart();

  const productoPrueba = instrumentos[0];

  return (
    <main className="container my-4">

      <h2>Mi carrito de compras</h2>

      {/* Botón temporal para probar el carrito */}
      <button
        className="btn btn-warning mb-3"
        onClick={() => agregarProducto(productoPrueba)}
      >
        Agregar {productoPrueba.nombre}
      </button>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((producto) => (

            <div className="card mb-3" key={producto.id}>

              <div className="card-body">

                <h3>{producto.nombre}</h3>

                <p>Precio: ${producto.precio.toLocaleString("es-CL")}</p>

                {/*organiza elementos en una fila, centra verticalmente los botones, 16 px entre elementos*/}
                <div className="d-flex align-items-center gap-3">

                  {/*Disminuir cantidad*/}
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => disminuirCantidad(producto)}
                  >
                    -
                  </button>

                  <span>Cantidad: {producto.cantidad}</span>

                  {/*Aumentar cantidad*/}
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => aumentarCantidad(producto)}
                  >
                    +
                  </button>

                </div>

                {/*Eliminar producto*/}
                <button

                  className="btn btn-outline-danger mt-3"

                  onClick={() => eliminarProducto(producto)}
                >
                  Eliminar producto

                </button>

              </div>

            </div>


          )

          )}

          <h4>Total: ${totalCarrito.toLocaleString("es-CL")}</h4>

          {/*Vaciar productos del carrito*/}
          <button

            className="btn btn-danger mt-3"

            onClick={vaciarCarrito}
          >
            Vaciar carrito

          </button>



        </div>

      )}

    </main>
  );
}