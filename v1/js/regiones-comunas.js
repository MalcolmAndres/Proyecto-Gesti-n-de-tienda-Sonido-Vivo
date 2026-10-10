document.addEventListener('DOMContentLoaded', function() {
    const urlJson = '../../data/regiones-comunas.json';

    const selectRegion = document.getElementById('selectRegion');
    const selectComuna = document.getElementById('selectComuna');

    let datosChile = []; 

    fetch(urlJson)
    .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        
    .then(data => {
        datosChile = data.regiones;
        cargarRegiones();
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

    function cargarRegiones() {
        selectRegion.innerHTML = '<option value="" selected disabled>Seleccione Región</option>';
        
        datosChile.forEach(item => {
            const option = document.createElement('option');
            option.value = item.region;
            option.textContent = item.region;
            selectRegion.appendChild(option);
        });
    }

    selectRegion.addEventListener('change', function() {
        const regionNombre = this.value;
        
        selectComuna.innerHTML = '<option value="" selected disabled>Seleccione Comuna</option>';
        
        if (!regionNombre) {
            selectComuna.disabled = true;
            return;
        }

        const regionEncontrada = datosChile.find(r => r.region === regionNombre);

        if (regionEncontrada && regionEncontrada.comunas) {
            selectComuna.disabled = false;

            regionEncontrada.comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                selectComuna.appendChild(option);
            });
        }
    });
});