const carritoVacio = document.getElementById("carrito-vacio");
const contenedorCarrito = document.getElementById("contenedor-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log("Carrito recuperado:", carrito);

function mostrarCarrito() {


    if (carrito.length === 0) {

        // style.display = permite controlar como se muestra un elemento HTML
        // block = muestra el elemento como un bloque
        // none = oculta el elemento

        carritoVacio.style.display = "block";

        contenedorCarrito.style.display = "none";

    } else {

        carritoVacio.style.display = "none";

        contenedorCarrito.style.display = "block";

        contenedorCarrito.innerHTML = "";

        let totalCompra = 0;

        carrito.forEach(producto => {

            const subtotal = producto.precio * producto.cantidad;

            totalCompra = totalCompra + subtotal;

            contenedorCarrito.innerHTML += `
                <div class="card shadow-sm border-0 mb-3">

                    <div class="card-body">

                        <!-- NUEVO:
                        usamos row para ordenar mejor el contenido del producto -->

                        <div class="row align-items-center">

                            <!-- NUEVO:
                            columna principal con la información del producto -->

                            <div class="col-12 col-md-8">

                                <h5 class="fw-bold mb-2">
                                    ${producto.nombre}
                                </h5>

                                <p class="text-secondary mb-1">
                                    Marca: ${producto.marca}
                                </p>


                                <!-- NUEVO:
                                toLocaleString("es-CL") agrega los puntos de miles -->

                                <p class="mb-2">
                                    Precio: $${producto.precio.toLocaleString("es-CL")}
                                </p>


                                <div class="d-flex align-items-center gap-2 mt-3">

                                    <span>
                                        Cantidad:
                                    </span>

                                    <button
                                        onclick="disminuirCantidad('${producto.id}')"
                                        class="btn btn-outline-secondary btn-sm">
                                        -
                                    </button>

                                    <!-- NUEVO:
                                    px-2 agrega espacio horizontal alrededor de la cantidad -->

                                    <span class="fw-bold px-2">
                                        ${producto.cantidad}
                                    </span>

                                    <button
                                        onclick="aumentarCantidad('${producto.id}')"
                                        class="btn btn-outline-secondary btn-sm">
                                        +
                                    </button>

                                </div>


                                <!-- NUEVO:
                                botón eliminar con borde rojo en vez de fondo completamente rojo -->

                                <button
                                    onclick="eliminarProducto('${producto.id}')"
                                    class="btn btn-outline-danger btn-sm mt-3">

                                    <!-- NUEVO:
                                    icono de papelera de Bootstrap Icons -->

                                    <i class="bi bi-trash"></i>

                                    Eliminar

                                </button>

                            </div>


                            <!-- NUEVO:
                            segunda columna para destacar el subtotal -->

                            <div class="col-12 col-md-4 text-md-end mt-3 mt-md-0">

                                <p class="text-secondary mb-1">
                                    Subtotal
                                </p>

                                <h4 class="fw-bold mb-0">

                                    <!-- NUEVO:
                                    subtotal con formato chileno -->

                                    $${subtotal.toLocaleString("es-CL")}

                                </h4>

                            </div>

                        </div>

                    </div>

                </div>
            `;

        });


        // NUEVO:
        // tarjeta que muestra el resumen de la compra

        contenedorCarrito.innerHTML += `
            <div class="card shadow-sm border-0 mt-4">

                <div class="card-body">

                    <!-- NUEVO -->
                    <h4 class="fw-bold mb-3">
                        Resumen de compra
                    </h4>


                    <!-- NUEVO:
                    línea divisoria -->

                    <hr>


                    <!-- NUEVO:
                    separa el texto Total y el precio -->

                    <div class="d-flex justify-content-between align-items-center">

                        <span class="fs-5">
                            Total:
                        </span>

                        <span class="fs-4 fw-bold">

                            <!-- NUEVO:
                            total con formato chileno -->

                            $${totalCompra.toLocaleString("es-CL")}

                        </span>

                    </div>


                    <!-- NUEVO:
                    w-100 hace que el botón ocupe todo el ancho -->

                    <button class="btn btn-success fw-bold w-100 mt-4">

                        <!-- NUEVO:
                        icono Bootstrap -->

                        <i class="bi bi-bag-check"></i>

                        Confirmar compra

                    </button>


                    <!-- NUEVO:
                    botón para volver al catálogo -->

                    <a
                        href="../productos/catalogo.html"
                        class="btn btn-outline-secondary w-100 mt-2">

                        Seguir comprando

                    </a>

                </div>

            </div>
        `;

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