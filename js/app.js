const contenedor = document.getElementById("contenedor-tarjetas");
let instrumentos = []; // instrumentos disponibles para todo el archivo app.js

async function cargarInstrumentos() {
    try {
        const respuesta = await fetch("instrumentos.json");
        instrumentos = await respuesta.json();

        contenedor.innerHTML = "";

        instrumentos.forEach(item => {
            
            let badgeDescuento = item.descuento ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${item.descuento} OFF</span>` : "";

            contenedor.innerHTML += `
                <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 shadow-sm position-relative border-0 p-3">
                        ${badgeDescuento}
                        <div class="text-center py-3">
                            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}" style="height: 200px; object-fit: contain;">
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between p-0 mt-3">
                            <div>
                                <h6 class="card-title text-dark fw-bold mb-1" style="font-size: 0.95rem; min-height: 40px;">${item.nombre}</h6>
                                <p class="text-muted text-uppercase mb-2" style="font-size: 0.8rem;">${item.marca}</p>
                            </div>
                            <div>
                                <p class="fw-bold fs-5 text-dark mb-3">${item.precio}</p>
                                <!-- Al hacer clic, lo mandamos a detalle.html enviando su ID -->
                                
                                <button onclick="verDetalle(${item.id})" class="btn btn-dark w-100 btn-sm mb-2">
                                    Ver instrumento
                                </button>

                                <button onclick="agregarAlCarrito(${item.id})" class="btn btn-warning w-100 btn-sm fw-bold">
                                    Agregar al carrito
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Hubo un error al cargar el JSON:", error);
        contenedor.innerHTML = `<p class="text-danger">No se pudieron cargar los instrumentos.</p>`;
    }

}

function actualizarContadorCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let cantidadTotal = 0;

    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
    });

    const contadorCarrito = document.getElementById("contador-carrito");

    contadorCarrito.textContent = `Carrito (${cantidadTotal})`;
}

function agregarAlCarrito(id) {

    // busca por el primer elemento de instrumenos que el id sea igual al id que recibimos desde el catálogo
    const producto = instrumentos.find(item => item.id === id); 

    // localStorage = Espacio en el navegador para guardar datos de una página web de forma local
    // arregloJs = lista[]

    // Primero intenta recuperar lo guardado con el nombre "carrito", pero localStorage guarda todo como texto, por eso se usa JSON.parse,
    // para transformar el texto nuevamente en un arreglo de JavaScript.

    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // || [] = si todavía no existe ningún carrito, crea un arreglo

    const productoExistente = carrito.find(item => item.id === id); //Busca el producto en el carrito

    if (productoExistente) {

        productoExistente.cantidad++; // ++ sirve para ir aumentando de 1 en 1

    } else {

        producto.cantidad = 1;
        carrito.push(producto); //si no, se agrega 1 como cantidad del producto

    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); //guarda el carrito / JSON.stringify = convertimos el arreglo nuevamente a texto para poder guardarlo

    console.log("Carrito:", carrito);

    actualizarContadorCarrito();
}

function verDetalle(id) {
    window.location.href = `detalle.html?id=${id}`;
}

cargarInstrumentos();
actualizarContadorCarrito();