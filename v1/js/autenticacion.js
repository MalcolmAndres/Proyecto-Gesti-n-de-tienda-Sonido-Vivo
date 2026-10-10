document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    if (usuarioLogueado) {
        const navLogin = document.querySelector('a[href*="login.html"]');
        if (navLogin) {
            navLogin.textContent = `Hola, ${usuarioLogueado.nombre || "Usuario"}`;
            navLogin.href = "#";
            navLogin.title = "Cerrar sesión";
            navLogin.addEventListener("click", (e) => {
                e.preventDefault();
                if (confirm("¿Deseas cerrar sesión?")) {
                    localStorage.removeItem("usuarioLogueado");
                    window.location.href = "../../index.html";
                }
            });
        }
    }
});