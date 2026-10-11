// TEMPORAL — P1 lo diseña
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="container py-5" style={{ maxWidth: 420 }}>
      <h1 className="brand text-center mb-4">Sonido Vivo</h1>
      <Outlet />
    </main>
  );
}
