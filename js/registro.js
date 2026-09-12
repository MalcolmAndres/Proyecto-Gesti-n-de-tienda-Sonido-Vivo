document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector("form.needs-validation");
    if (!formRegistro) return;

    formRegistro.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        formRegistro.classList.add("was-validated");

        if (!formRegistro.checkValidity()) {
            return;
        }

        const run = document.getElementById("run").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const correoInput = document.getElementById("correo");
        const correo = correoInput.value.trim().toLowerCase();
        const password = document.getElementById("contrasena").value;
        const repetirPasswordInput = document.getElementById("repetirContrasena");
        const repetirPassword = repetirPasswordInput.value;

        const dominioCliente = /@(gmail\.com|hotmail\.com)$/;
        if (!dominioCliente.test(correo)) {
            correoInput.setCustomValidity("Solo se aceptan correos @gmail.com o @hotmail.com.");
            formRegistro.classList.add("was-validated");
            return;
        } else {
            correoInput.setCustomValidity("");
        }

        if (password !== repetirPassword) {
            repetirPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
            formRegistro.classList.add("was-validated");
            return;
        } else {
            repetirPasswordInput.setCustomValidity("");
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const existe = usuarios.some(u => u.correo === correo);
        if (existe) {
            correoInput.setCustomValidity("Este correo ya está registrado.");
            formRegistro.classList.add("was-validated");
            return;
        } else {
            correoInput.setCustomValidity("");
        }

        const nuevoUsuario = { run, nombre, apellido, correo, password };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        window.location.href = "login.html";
    });
});