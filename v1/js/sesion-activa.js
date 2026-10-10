document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    if (usuarioLogueado) {
        // Ejemplo: Buscar el enlace de Iniciar Sesión y cambiarlo por el nombre o Cerrar Sesión
        const navLogin = document.querySelector('a[href*="login.html"]');
        if (navLogin) {
            navLogin.textContent = `Hola, ${usuarioLogueado.nombre}`;
            navLogin.href = "#";
            navLogin.addEventListener("click", () => {
                if (confirm("¿Deseas cerrar sesión?")) {
                    localStorage.removeItem("usuarioLogueado");
                    window.location.reload();
                }
            });
        }
    }
});