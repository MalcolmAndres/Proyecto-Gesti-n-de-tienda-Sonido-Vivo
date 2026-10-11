// TEMPORAL — login falso para elegir rol. P1 lo reemplaza por el formulario real.
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { INICIO_POR_ROL, NOMBRE_ROL, ROLES } from "../../utils/roles";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const entrar = (rol) => {
    login(rol);
    navigate(INICIO_POR_ROL[rol]);
  };

  return (
    <div className="d-grid gap-2">
      <p className="text-center">Login de prueba: elige con qué rol entrar</p>
      {Object.values(ROLES).map((rol) => (
        <button key={rol} className="btn btn-primario" onClick={() => entrar(rol)}>
          Entrar como {NOMBRE_ROL[rol]}
        </button>
      ))}
    </div>
  );
}
