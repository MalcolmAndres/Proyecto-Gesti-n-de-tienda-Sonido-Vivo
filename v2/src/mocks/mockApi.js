// ===== ZONA 1: IMPORTS =====
import usuariosIniciales from "./data/usuarios.json";

// ===== ZONA 2: FUNCIONES DE AYUDA =====
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const cargar = (clave, inicial) => {
  try {
    const guardado = localStorage.getItem(`mock_${clave}`);
    return guardado ? JSON.parse(guardado) : structuredClone(inicial);
  } catch {
    return structuredClone(inicial);
  }
};

const guardar = (clave, valor) =>
  localStorage.setItem(`mock_${clave}`, JSON.stringify(valor));

const sinPassword = ({ password, ...resto }) => resto;

const siguienteId = (lista) => Math.max(0, ...lista.map((x) => x.id)) + 1;

// ===== ZONA 3: BASE DE DATOS EN MEMORIA =====
const db = {
  usuarios: cargar("usuarios", usuariosIniciales),
};

// ===== ZONA 4: API FALSA =====
export const mockApi = {
  // ----- Usuarios (Persona 1) -----
  async login({ email, password }) {
    await delay();
    const usuario = db.usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (!usuario) throw new Error("Correo o contraseña incorrectos");
    if (!usuario.activo) throw new Error("Tu cuenta está desactivada");
    return { token: `mock-token-${usuario.id}`, usuario: sinPassword(usuario) };
  },

  async registro({ nombre, email, password }) {
    await delay();
    if (db.usuarios.some((u) => u.email === email)) {
      throw new Error("Ese correo ya está registrado");
    }
    const nuevo = { id: siguienteId(db.usuarios), nombre, email, password, rol: "CLIENTE", activo: true };
    db.usuarios.push(nuevo);
    guardar("usuarios", db.usuarios);
    return { token: `mock-token-${nuevo.id}`, usuario: sinPassword(nuevo) };
  },

  async getUsuarios() {
    await delay();
    return db.usuarios.map(sinPassword);
  },

  async crearUsuario(datos) {
    await delay();
    if (db.usuarios.some((u) => u.email === datos.email)) {
      throw new Error("Ese correo ya está registrado");
    }
    const nuevo = { id: siguienteId(db.usuarios), activo: true, ...datos };
    db.usuarios.push(nuevo);
    guardar("usuarios", db.usuarios);
    return sinPassword(nuevo);
  },

  async actualizarUsuario(id, cambios) {
    await delay();
    const usuario = db.usuarios.find((u) => u.id === id);
    if (!usuario) throw new Error("Usuario no encontrado");
    Object.assign(usuario, cambios);
    guardar("usuarios", db.usuarios);
    return sinPassword(usuario);
  },

  // ----- Productos (Persona 2) y Pedidos (Persona 3) van aquí abajo -----
};
