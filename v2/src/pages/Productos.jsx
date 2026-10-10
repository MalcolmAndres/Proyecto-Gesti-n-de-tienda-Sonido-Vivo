import Producto from '../components/Producto'
import { useLocation } from 'react-router-dom'

function Productos() {


    const location = useLocation()

    const parametros = new URLSearchParams(location.search)

    const categoria = parametros.get('categoria')

    return (
        <div className="container mt-4">

            <h1 className="text-center mb-4">
                Nuestros Productos
            </h1>

            <p>
                Categoría seleccionada: {categoria}
            </p>

            <div className="row g-4">

                <div className="col-12 col-md-6 col-lg-4">
                    <Producto
                        id="1"
                        nombre="Notebook Lenovo"
                        precio="599.990"
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <Producto
                        id="2"
                        nombre="Mouse Logitech"
                        precio="29.990"
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <Producto
                        id="3"
                        nombre="Teclado Redragon"
                        precio="49.990"
                    />
                </div>

            </div>

        </div>
    )
}

export default Productos