const contenedor = document.getElementById("contenedor-tarjetas");
let instrumentos = []; 

// Función para asignar color y estilo según las categorías exactas del JSON
function obtenerEstiloCategoria(categoria) {
    switch (categoria) {
        case "Guitarras Acústicas":
            return {
                colorBorde: "border-primary",
                badgeFondo: "bg-primary",
                icono: "bi-music-note-beamed"
            };
        case "Guitarras Eléctricas":
            return {
                colorBorde: "border-danger",
                badgeFondo: "bg-danger",
                icono: "bi-lightning-charge"
            };
        case "Bajos Eléctricos":
            return {
                colorBorde: "border-info",
                badgeFondo: "bg-info text-dark",
                icono: "bi-soundwave"
            };
        case "Baterías":
            return {
                colorBorde: "border-warning",
                badgeFondo: "bg-warning text-dark",
                icono: "bi-disc"
            };
        case "Teclados y Pianos":
            return {
                colorBorde: "border-success",
                badgeFondo: "bg-success",
                icono: "bi-piano"
            };
        case "Amplificadores":
            return {
                colorBorde: "border-dark",
                badgeFondo: "bg-dark text-white",
                icono: "bi-speaker"
            };
        case "Micrófonos":
            return {
                colorBorde: "border-secondary",
                badgeFondo: "bg-secondary",
                icono: "bi-mic"
            };
        case "Pedales de Efectos":
            return {
                colorBorde: "border-primary-subtle",
                badgeFondo: "bg-primary-subtle text-dark border border-primary",
                icono: "bi-sliders"
            };
        case "Accesorios":
            return {
                colorBorde: "border-light-subtle",
                badgeFondo: "bg-light text-dark border",
                icono: "bi-tools"
            };
        case "Estudio y Grabación":
            return {
                colorBorde: "border-purple text-dark", 
                badgeFondo: "bg-purple text-white", // Nota: si usas Bootstrap estándar, puedes cambiar esto por "bg-info"
                icono: "bi-headphones"
            };
        default:
            return {
                colorBorde: "border-secondary",
                badgeFondo: "bg-secondary text-white",
                icono: "bi-music-note"
            };
    }
}

async function cargarInstrumentos() {
    try {
        const respuesta = await fetch("../../data/instrumentos.json");
        instrumentos = await respuesta.json();

        if (!contenedor) return;

        contenedor.innerHTML = instrumentos.map(item => {
            let badgeDescuento = item.descuento ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${item.descuento} OFF</span>` : "";
            
            // Obtenemos los estilos según la categoría exacta del item
            const estilo = obtenerEstiloCategoria(item.categoria);

            // Manejo de imagen (si no existe, genera el placeholder con el icono correspondiente)
            let contenidoVisual = "";
            if (item.imagen || item.imagenUrl) {
                let imgSource = item.imagen || item.imagenUrl;
                contenidoVisual = `<img src="${imgSource}" class="card-img-top" alt="${item.nombre}" style="height: 200px; object-fit: contain;">`;
            } else {
                contenidoVisual = `
                    <div class="d-flex flex-column align-items-center justify-content-center bg-light rounded" style="height: 200px;">
                        <i class="bi ${estilo.icono} fs-1 text-secondary mb-2"></i>
                        <span class="text-muted small text-uppercase fw-bold text-center px-2">${item.categoria}</span>
                    </div>
                `;
            }

            return `
                <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                    <!-- Tarjeta con borde dinámico según la categoría -->
                    <div class="card h-100 shadow-sm position-relative border-2 ${estilo.colorBorde} p-3">
                        ${badgeDescuento}
                        <div class="text-center py-3">
                            ${contenidoVisual}
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between p-0 mt-3">
                            <div>
                                <!-- Pequeña etiqueta superior con el icono y la categoría -->
                                <span class="badge ${estilo.badgeFondo} mb-2" style="font-size: 0.7rem;">
                                    <i class="bi ${estilo.icono} me-1"></i>${item.categoria}
                                </span>
                                <h6 class="card-title text-dark fw-bold mb-1" style="font-size: 0.95rem; min-height: 40px;">${item.nombre}</h6>
                                <p class="text-muted text-uppercase mb-2" style="font-size: 0.8rem;">${item.marca} - ${item.modelo || ''}</p>
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