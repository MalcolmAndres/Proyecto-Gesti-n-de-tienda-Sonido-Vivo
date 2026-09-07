const contenedor = document.getElementById("contenedor-tarjetas");

async function cargarInstrumentos() {
    try {
        const respuesta = await fetch("instrumentos.json");
        const instrumentos = await respuesta.json();

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
                                <button onclick="verDetalle(${item.id})" class="btn btn-dark w-100 btn-sm">Ver instrumento</button>
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

function verDetalle(id) {
    window.location.href = `detalle.html?id=${id}`;
}

cargarInstrumentos();