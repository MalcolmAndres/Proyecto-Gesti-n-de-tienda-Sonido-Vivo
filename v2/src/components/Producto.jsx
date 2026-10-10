import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function Producto({ id, nombre, precio }) {

    //const [stock, setStock] = useState(5)
    const [stock, setStock] = useState(() => {
        const stockGuardado = localStorage.getItem(nombre)

        return stockGuardado !== null ? Number(stockGuardado) : 5 //operador ternario
    })

    useEffect(() => {
        localStorage.setItem(nombre, stock)
    }, [stock, nombre])


    const disminuirStock = () => {
        if (stock > 0) {
            setStock(stock - 1)
        }
    }

    return (
        <div className="card h-100">
            <div className="card-body">

                <h5 className="card-title">
                    {nombre}
                </h5>

                <p className="card-text">
                    Precio: ${precio}
                </p>

                <p>
                    Stock disponible: {stock}
                </p>

                <button
                    className="btn btn-danger me-2"
                    onClick={disminuirStock}
                >
                    -
                </button>

                <button
                    className="btn btn-success"
                    onClick={() => setStock(stock + 1)}
                >
                    +
                </button>

                <Link
                    to={`/producto/${id}`}
                    className="btn btn-primary ms-2"
                >
                    Ver detalle
                </Link>

            </div>
        </div>
    )
}

export default Producto