
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
export const getMisPedidos = () => {
    if (USE_MOCKS) {
        return mockApi.getMisPedidos();
    }
    throw new Error("La consulta de pedidos con el backend aún no está implementada.");
};

export const getPedidos = () => {
    if (USE_MOCKS) {
        return mockApi.getPedidos();
    }

    throw new Error("La consulta de pedidos con el backend aún no está implementada.");
};

export const actualizarEstadoPedido = (id, estado) => {
    if (USE_MOCKS) {
        return mockApi.actualizarEstadoPedido(id, estado);
    }

    throw new Error("La actualización de pedidos con el backend aún no está implementada.");
};

