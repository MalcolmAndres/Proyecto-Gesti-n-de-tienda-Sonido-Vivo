import { render, screen } from '@testing-library/react'
//import { describe, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Producto from './Producto'
import userEvent from '@testing-library/user-event'
import {
    describe,
    test,
    expect,
    beforeEach
} from 'vitest'
beforeEach(() => {
    localStorage.clear()
})

const renderProducto = () => {

    render(
        <MemoryRouter>
            <Producto
                id="1"
                nombre="Notebook Lenovo"
                precio="599.990"
            />
        </MemoryRouter>
    )

}

//describe('Componente Producto', () => {
test('muestra el nombre del producto', () => {
    renderProducto()

    expect(
        screen.getByText('Notebook Lenovo')
    ).toBeInTheDocument()
})


test('muestra el precio del producto', () => {
    renderProducto()

    expect(
        screen.getByText('Precio: $599.990')
    ).toBeInTheDocument()
})

test('muestra stock inicial de 5', () => {

    renderProducto()

    expect(
        screen.getByText('Stock disponible: 5')
    ).toBeInTheDocument()

})

test('aumenta el stock al presionar +', async () => {

    const user = userEvent.setup()

    renderProducto()

    const botonAumentar = screen.getByRole(
        'button',
        { name: '+' }
    )

    await user.click(botonAumentar)

    expect(
        screen.getByText('Stock disponible: 6')
    ).toBeInTheDocument()

})

test('disminuye el stock al presionar -', async () => {

    const user = userEvent.setup()

    renderProducto()

    const botonDisminuir = screen.getByRole(
        'button',
        { name: '-' }
    )

    await user.click(botonDisminuir)

    expect(
        screen.getByText('Stock disponible: 4')
    ).toBeInTheDocument()

})

test('no permite que el stock sea negativo', async () => {

    const user = userEvent.setup()

    renderProducto()

    const botonDisminuir = screen.getByRole(
        'button',
        { name: '-' }
    )

    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)

    expect(
        screen.getByText('Stock disponible: 0')
    ).toBeInTheDocument()

})