const carritoVacio = document.getElementById("carrito-vacio");
const contenedorCarrito = document.getElementById("contenedor-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log("Carrito recuperado:", carrito);

function mostrarCarrito() {


    if (carrito.length === 0) {

        // style.display = permite controlar como se muestra un elemento HTML
        // block = muestra el elemento como un bloque
        // none = oculta el elemento


        carritoVacio.style.display = "block"; // muestra el mensaje de carrito vacío

        contenedorCarrito.style.display = "none"; // oculta el contenedor donde irían los productos

    } else {

        carritoVacio.style.display = "none"; // oculta mensaje de tu carrito está vacío

        contenedorCarrito.style.display = "block"; // muestra los productos

        contenedorCarrito.innerHTML = "";

        carrito.forEach(producto => {

            contenedorCarrito.innerHTML += `
                <div class="card shadow-sm border-0 mb-3">

                    <div class="card-body">

                        <h5 class="fw-bold">
                            ${producto.nombre}
                        </h5>

                        <p class="text-secondary mb-1">
                            Marca: ${producto.marca}
                        </p>

                        <p class="mb-1">
                            Precio: ${producto.precio}
                        </p>

                        <div class="d-flex align-items-center gap-2 mt-3">

                            <span>Cantidad:</span>

                            <button onclick="disminuirCantidad(${producto.id})" class="btn btn-outline-secondary btn-sm">
                                -
                            </button>

                            <span class="fw-bold">
                                ${producto.cantidad}
                            </span>

                            <button onclick="aumentarCantidad(${producto.id})" class="btn btn-outline-secondary btn-sm">
                                +
                            </button>

                        </div>

                        <button onclick="eliminarProducto(${producto.id})" class="btn btn-danger btn-sm mt-3">
                            Eliminar
                        </button>

                    </div>

                </div>
            `;

        });

    }
            
}

function aumentarCantidad(id) {

    const producto = carrito.find(item => item.id === id);

    producto.cantidad++;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();

}

function disminuirCantidad(id) {

    const producto = carrito.find(item => item.id === id);

    if (producto.cantidad > 1) {

        producto.cantidad--;

        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();

    }

}

function eliminarProducto(id) {

    carrito = carrito.filter(producto => producto.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();

}

mostrarCarrito();