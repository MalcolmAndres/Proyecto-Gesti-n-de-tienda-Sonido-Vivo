import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import puntosRetiro from "../mocks/data/puntosRetiro.json";

// Centrar el mapa cuando cambia el punto seleccionado.
function CentrarMapa({ puntoSeleccionado }) {
    const map = useMap();

    useEffect(() => {
        const punto = puntosRetiro.find(
            (item) => String(item.id) === String(puntoSeleccionado)
        );

        if (punto) {
            map.setView(
                [punto.latitud, punto.longitud],
                15
            );
        }
    }, [puntoSeleccionado, map]);

    return null;
}

export default function Mapa({ puntoSeleccionado }) {

    return (
        <div className="mt-4">

            <h4>Ubicaciones y puntos de retiro</h4>

            <MapContainer
                center={[-33.025, -71.58]}
                zoom={12}
                style={{ height: "400px", width: "100%" }}
            >
                <CentrarMapa puntoSeleccionado={puntoSeleccionado} />

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Muestra los puntos de retiro disponibles */}
                {puntosRetiro.map((punto) => (
                    <Marker
                        key={punto.id}
                        position={[punto.latitud, punto.longitud]}
                    >
                        <Popup>

                            <strong>{punto.nombre}</strong>

                            <p>{punto.direccion}</p>

                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${punto.latitud},${punto.longitud}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cómo llegar

                            </a>

                        </Popup>

                    </Marker>
                ))}

            </MapContainer>

        </div>
    );
}