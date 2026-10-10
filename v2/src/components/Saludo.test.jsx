import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Saludo from './Saludo'
describe('Componente Saludo', () => {
    test('muestra el nombre recibido', () => {
        render(
            <Saludo nombre="Hernán" />
        )
        expect(
            screen.getByText('Hola Hernán')
        ).toBeInTheDocument()
    })
})