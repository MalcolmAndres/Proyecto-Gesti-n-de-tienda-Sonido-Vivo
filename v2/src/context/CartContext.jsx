// importar heramientas de react
import { createContext, useState } from "react";

// crear contexto para compartir datos de carrito
export const CartContext = createContext(null);


// componente que permitirá compartir el carrito con otras partes de la aplicación

export function CartProvider({ children }) { // children representa los componentes que están dentro de CartProvider

    // estado que almacena productos del carrito
    const [carrito, setCarrito] = useState([]);


const agregarProducto = (producto) => {

    setCarrito((carritoActual) => {

        const productoExistente = carritoActual.find(
            (item) => item.id === producto.id

        );

        if (productoExistente) {

            if (productoExistente.cantidad >= producto.stock) {
                return carritoActual;
            }

            return carritoActual.map((item) =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 } // ? = si coincide la id, agrega el item y aumenta la cantidad +1
                    : item  // : = si no coincide la id, se mantiene el item sin aumentar la cantidad
            );

        }

        if (producto.stock <= 0) {
            return carritoActual;
        }

        return [...carritoActual, { ...producto, cantidad: 1 }];


    });

};

const eliminarProducto = (producto) => {

    setCarrito((carritoActual) => {

        return carritoActual.filter(
            (item) => item.id !== producto.id
        );
    });

}

const aumentarCantidad = (producto) => {

    setCarrito((carritoActual) => {

        const productoExistente = carritoActual.find(
            (item) => item.id === producto.id

        );

        if (productoExistente && 
            productoExistente.cantidad >= 1 &&
            productoExistente.cantidad < producto.stock
        ) {
            return carritoActual.map((item) =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );

        }

        return carritoActual;

    });

};

const disminuirCantidad = (producto) => {

    setCarrito((carritoActual) => {

        const productoExistente = carritoActual.find(
            (item) => item.id === producto.id

        );

        if (productoExistente && productoExistente.cantidad > 1) {
            return carritoActual.map((item) =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            );

        }

        if (productoExistente && productoExistente.cantidad === 1) {
            return carritoActual.filter(
                (item) => item.id !== producto.id
            );
        }

        return carritoActual;


    });

};

const vaciarCarrito = () => {

   setCarrito([]);

};

const totalCarrito = carrito.reduce((total, producto) => {
    return total + (producto.precio * producto.cantidad);
}, 0);

return (
        <CartContext.Provider
            value={{
                carrito,
                agregarProducto,
                eliminarProducto,
                aumentarCantidad,
                disminuirCantidad,
                vaciarCarrito,
                totalCarrito
            }}
        >
            {children}
        </CartContext.Provider>
    );

}