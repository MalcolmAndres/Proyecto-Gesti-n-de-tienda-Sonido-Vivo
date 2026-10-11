// VERSIÓN MÍNIMA (temporal) para que todos puedan trabajar desde el día 1.
// login(rol) crea un usuario falso con ese rol, sin contraseña.
// P1 la reemplaza por la versión real: login(email, password) que llama a authService.
// Lo que el resto del equipo usa NO cambia: usuario, login, logout, tieneRol.
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const USUARIOS_FALSOS = {
  ADMIN: { id: 1, nombre: "Admin de prueba", email: "admin@sonidovivo.cl", rol: "ADMIN", activo: true },
  VENDEDOR: { id: 2, nombre: "Vendedor de prueba", email: "vendedor@sonidovivo.cl", rol: "VENDEDOR", activo: true },
  CLIENTE: { id: 3, nombre: "Cliente de prueba", email: "cliente@correo.cl", rol: "CLIENTE", activo: true },
};

const leerUsuario = () => {
  try {
    return JSON.parse(localStorage.getItem("usuario"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuario);

  const login = (rol) => {
    const u = USUARIOS_FALSOS[rol];
    localStorage.setItem("token", `mock-token-${u.id}`);
    localStorage.setItem("usuario", JSON.stringify(u));
    setUsuario(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const tieneRol = (...roles) => !!usuario && roles.includes(usuario.rol);

  return (
    <AuthContext.Provider value={{ usuario, login, logout, tieneRol }}>
      {children}
    </AuthContext.Provider>
  );
}
