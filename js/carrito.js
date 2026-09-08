let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log("Carrito recuperado:", carrito);

const contenedorCarrito = document.getElementById("contenedor-carrito");

function mostrarCarrito() {

    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = `
            <div class="card shadow-sm border-0">
                <div class="card-body text-center py-5">

                    <i class="bi bi-cart fs-1 text-secondary"></i>

                    <h4 class="mt-3">
                        Tu carrito está vacío
                    </h4>

                    <p class="text-secondary">
                        Agrega productos desde nuestro catálogo.
                    </p>

                    <a href="../productos/catalogo.html" class="btn btn-warning fw-bold">
                        Ver catálogo
                    </a>

                </div>
            </div>
        `;

    } else {

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