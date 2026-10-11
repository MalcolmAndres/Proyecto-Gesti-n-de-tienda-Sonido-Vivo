// TEMPORAL — P1 lo reemplaza usando el componente <Navbar /> responsive
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="barra d-flex flex-wrap gap-3 align-items-center px-3 py-2">
        <Link to="/" className="brand">Sonido Vivo</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/mis-pedidos">Mis pedidos</Link>
        <Link to="/ubicacion">Ubicación</Link>
        <Link to="/gestion/pedidos">Pedidos</Link>
        <Link to="/gestion/stock">Stock</Link>
        <Link to="/admin/usuarios">Usuarios</Link>
        <Link to="/admin/reportes">Reportes</Link>
        <span className="ms-auto small">{usuario?.nombre} ({usuario?.rol})</span>
        <button className="btn btn-sm btn-primario" onClick={() => { logout(); navigate("/login"); }}>Salir</button>
      </header>
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}
