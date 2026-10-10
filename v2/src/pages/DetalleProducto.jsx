import { useParams } from 'react-router-dom'

function DetalleProducto() {

    const { id } = useParams()
    const productos = {
        1: 'Notebook Lenovo',
        2: 'Mouse Logitech',
        3: 'Teclado Redragon'
    }

    const nombreProducto = productos[id]

    return (
        <div className="container mt-4">

            <h1>Detalle del Producto</h1>

            <p>
                ID:{id}
            </p>
            <h3>{nombreProducto}</h3>

        </div>
    )
}

export default DetalleProducto