document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.querySelector("form.needs-validation");
    if (!formLogin) return;

    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        formLogin.classList.add("was-validated");

        if (!formLogin.checkValidity()) {
            return;
        }

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        const dominioValido = /@(admin\.vivo\.cl|empleado\.vivo\.cl|gmail\.com|hotmail\.com)$/;
        if (!dominioValido.test(email)) {
            emailInput.setCustomValidity("Dominio no permitido.");
            formLogin.classList.add("was-validated");
            return;
        } else {
            emailInput.setCustomValidity("");
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioEncontrado = usuarios.find(
            u => u.correo === email && u.password === password
        );

        if (usuarioEncontrado || email.endsWith("@admin.vivo.cl") || email.endsWith("@empleado.vivo.cl")) {
            const datosSesion = usuarioEncontrado || { correo: email, nombre: email.split("@")[0] };
            localStorage.setItem("usuarioLogueado", JSON.stringify(datosSesion));

            if (email.endsWith("@admin.vivo.cl")) {
                window.location.href = "../administracion/dashboard-admin.html";
            } else if (email.endsWith("@empleado.vivo.cl")) {
                window.location.href = "../administracion/dashboard-empleado.html";
            } else {
                window.location.href = "../../index.html";
            }
        } else {
            passwordInput.setCustomValidity("Credenciales incorrectas");
            formLogin.classList.add("was-validated");
        }
    });
});