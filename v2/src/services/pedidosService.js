
import { mockApi } from "../mocks/mockApi";
import { USE_MOCKS } from "./config";

// registra un pedido utilizando la API simulada
export const crearPedido = (datos) => {
    if (USE_MOCKS) {
        return mockApi.crearPedido(datos);
    }

    throw new Error("El registro de pedidos con el backend aún no está implementado.");
};

// se obtienen los pedidos registrados por un cliente
export const getPedidosPorUsuario = (usuarioId) => {
    if (USE_MOCKS) {
        return mockApi.getPedidosPorUsuario(usuarioId);
    }

    throw new Error("La consulta de pedidos con el backend aún no está implementada.");
};

