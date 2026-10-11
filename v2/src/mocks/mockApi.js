import usuariosIniciales from "./data/usuarios.json";
const delay =(ms = 300) => new Promise((resolve) => 
setTimeout(resolve,ms));
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

const db = {
  usuarios: cargar("usuarios", usuariosIniciales),
};
export const mockApi = {
 
    // Aqui poner despues que Simula una llamada a la API para obtener los usuarios
async login({ email, password }) {
  await delay();
  const usuario = db.usuarios.find(
    (u) => u.email === email && u.password === password
  );
  if (!usuario) throw new Error("Correo o contraseña incorrectos");
  if (!usuario.activo) throw new Error("Tu cuenta está desactivada");
  return { token: `mock-token-${usuario.id}`, usuario: sinPassword(usuario) };
},
}
    

