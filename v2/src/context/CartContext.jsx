// importar heramientas de react
import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

// crear contexto para compartir datos de carrito
export const CartContext = createContext(null);


// lee el carrito guardado en el navegador (o una lista vacía)
const leerCarrito = () => {
    try {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
        return [];
    }
};

// componente que permitirá compartir el carrito con otras partes de la aplicación

export function CartProvider({ children }) { 

    // estado que almacena productos del carrito
    const [carrito, setCarrito] = useState(leerCarrito);
    const { usuario } = useAuth();

    // mensaje emergente al agregar al carrito: { tipo: "ok" | "error", texto } o null
    const [aviso, setAviso] = useState(null);
    const cerrarAviso = () => setAviso(null);

    // guarda el carrito cada vez que cambia
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // vacía el carrito cuando se cierra sesión
    useEffect(() => {
        if (!usuario) setCarrito([]);
    }, [usuario]);


const agregarProducto = (producto) => {

    // revisa el stock ANTES de agregar, para avisar al cliente
    const enCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadActual = enCarrito ? enCarrito.cantidad : 0;

    if (cantidadActual >= producto.stock) {
        setAviso({ tipo: "error", texto: `No hay más stock disponible de ${producto.nombre}.` });
        return;
    }

    setAviso({ tipo: "ok", texto: `${producto.nombre} se agregó al carrito.` });

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
                totalCarrito,
                aviso,
                cerrarAviso
            }}
        >
            {children}
        </CartContext.Provider>
    );

}