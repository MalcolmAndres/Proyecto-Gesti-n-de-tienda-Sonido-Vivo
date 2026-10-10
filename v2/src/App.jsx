// Orden de los providers:
// BrowserRouter (rutas) > AuthProvider (sesión) > AppRouter (páginas)
// P3 agrega <CartProvider> dentro de AuthProvider cuando haga el carrito.
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}
