const contenedor = document.getElementById("contenedor-tarjetas");
let instrumentos = []; 

async function cargarInstrumentos() {
    try {
       const respuesta = await fetch("../../data/instrumentos.json");
        instrumentos = await respuesta.json();

        if (!contenedor) return;

        contenedor.innerHTML = instrumentos.map(item => {
            let badgeDescuento = item.descuento ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${item.descuento} OFF</span>` : "";
            // Si la propiedad es 'imagen' o 'imagenUrl', usamos fallback
            let imgSource = item.imagen || item.imagenUrl || 'https://via.placeholder.com/200';

            return `
                <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 shadow-sm position-relative border-0 p-3">
                        ${badgeDescuento}
                        <div class="text-center py-3">
                            <img src="${imgSource}" class="card-img-top" alt="${item.nombre}" style="height: 200px; object-fit: contain;">
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between p-0 mt-3">
                            <div>
                                <h6 class="card-title text-dark fw-bold mb-1" style="font-size: 0.95rem; min-height: 40px;">${item.nombre}</h6>
                                <p class="text-muted text-uppercase mb-2" style="font-size: 0.8rem;">${item.marca}</p>
                            </div>
                            <div>
                                <p class="fw-bold fs-5 text-dark mb-3">$${item.precio ? item.precio.toLocaleString('es-CL') : 0}</p>
                                
                                <button onclick="verDetalle('${item.id}')" class="btn btn-dark w-100 btn-sm mb-2">
                                    Ver instrumento
                                </button>

                                <button onclick="agregarAlCarrito('${item.id}')" class="btn btn-warning w-100 btn-sm fw-bold">
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");

    } catch (error) {
        console.error("Hubo un error al cargar el JSON:", error);
        if (contenedor) {
            contenedor.innerHTML = `<p class="text-danger">No se pudieron cargar los instrumentos. Verifique la ruta del archivo JSON.</p>`;
        }
    }
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let cantidadTotal = 0;

    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
    });

    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = `Carrito (${cantidadTotal})`;
    }
}

function agregarAlCarrito(id) {
    const producto = instrumentos.find(item => item.id === id); 
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        // Se usa una copia ({...producto}) para no modificar el objeto original en el array instrumentos
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function verDetalle(id) {
    window.location.href = `detalle.html?id=${id}`;
}

cargarInstrumentos();
actualizarContadorCarrito();