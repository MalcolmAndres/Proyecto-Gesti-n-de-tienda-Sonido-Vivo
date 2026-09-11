document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const emailInput = document.getElementById("email");
            if (!emailInput) return;

            const email = emailInput.value.trim().toLowerCase();

            // Rutas correctas basadas en tu explorador de archivos
            if (email.includes("admin")) {
                window.location.href = "../administracion/dashboard-admin.html";
            } else if (email.includes("empleado")) {
                window.location.href = "../administracion/dashboard-empleado.html";
            } else {
                window.location.href = "../../index.html";
            }
        });
    }
});