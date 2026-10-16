export const ENDPOINTS = {

  AUTH_LOGIN: "/api/auth/login",
  AUTH_REGISTRO: "/api/auth/registro",
  USUARIOS: "/api/usuarios",
  USUARIO: (id) => `/api/usuarios/${id}`,
  USUARIO_ESTADO: (id) => `/api/usuarios/${id}/estado`,


  PRODUCTOS: "/api/productos",
  PRODUCTO: (id) => `/api/productos/${id}`,
  PRODUCTO_STOCK: (id) => `/api/productos/${id}/stock`,
  CATEGORIAS: "/api/categorias",
  REPORTE_VENTAS: "/api/reportes/ventas",


  PEDIDOS: "/api/pedidos",
  MIS_PEDIDOS: "/api/pedidos/mis-pedidos",
  PEDIDO: (id) => `/api/pedidos/${id}`,
  PEDIDO_ESTADO: (id) => `/api/pedidos/${id}/estado`,
  PUNTOS_RETIRO: "/api/puntos-retiro",
};
