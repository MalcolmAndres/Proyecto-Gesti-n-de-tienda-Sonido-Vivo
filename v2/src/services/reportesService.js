export const getReporteVentas = ({ desde, hasta }) =>
  USE_MOCKS
    ? mockApi.getReporteVentas({ desde, hasta })
    : http.get(ENDPOINTS.REPORTE_VENTAS, { params: { desde, hasta } }).then((r) => r.data);