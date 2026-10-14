
import { useState } from "react";
import Mapa from "../../components/Mapa";
import puntosRetiro from "../../mocks/data/puntosRetiro.json";

export default function Ubicacion() {
  const [puntoSeleccionado, setPuntoSeleccionado] = useState("");

  return (
    <main className="container my-4">
      <h2>Ubicaciones y puntos de retiro</h2>

      <p>
        Consulta nuestras ubicaciones y selecciona un punto de retiro
        para visualizarlo en el mapa.
      </p>

      <div className="mb-3">
        <label htmlFor="puntoRetiro" className="form-label">
          Seleccionar ubicación
        </label>

        <select
          id="puntoRetiro"
          className="form-select"
          value={puntoSeleccionado}
          onChange={(e) => setPuntoSeleccionado(e.target.value)}
        >
          <option value="">Seleccione una ubicación</option>

          {puntosRetiro.map((punto) => (
            <option key={punto.id} value={punto.id}>
              {punto.nombre}
            </option>
          ))}
        </select>
      </div>

      <Mapa puntoSeleccionado={puntoSeleccionado} />

      <h3 className="mt-4">Nuestros puntos de retiro</h3>

      <div className="row g-3 mt-2">
        {puntosRetiro.map((punto) => (
          <div className="col-12 col-md-6" key={punto.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{punto.nombre}</h5>
                <p className="card-text">{punto.direccion}</p>

                <button
                  className="btn btn-warning"
                  onClick={() =>
                    setPuntoSeleccionado(String(punto.id))
                  }
                >
                  Ver en el mapa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
