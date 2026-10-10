import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Login from './Login'
import userEvent from '@testing-library/user-event'

describe('Página Login', () => {

    test('muestra el formulario de inicio de sesión', () => {

        render(<Login />)

        expect(
            screen.getByText('Iniciar Sesión')
        ).toBeInTheDocument()

    })

    test('muestra los campos de correo y contraseña', () => {
        render(<Login />)
        expect(
            screen.getByLabelText('Correo electrónico')
        ).toBeInTheDocument()
        expect(
            screen.getByLabelText('Contraseña')
        ).toBeInTheDocument()
    })

    test('permite escribir el correo electrónico', async () => {

        const user = userEvent.setup()

        render(<Login />)

        const inputEmail = screen.getByLabelText(
            'Correo electrónico'
        )

        await user.type(
            inputEmail,
            'hernan@gmail.com'
        )

        expect(inputEmail).toHaveValue(
            'hernan@gmail.com'
        )

    })

    test('permite escribir la contraseña', async () => {

        const user = userEvent.setup()

        render(<Login />)

        const inputPassword = screen.getByLabelText(
            'Contraseña'
        )

        await user.type(
            inputPassword,
            '12345'
        )

        expect(inputPassword).toHaveValue('12345')

    })

    test('muestra error cuando el correo no es válido', async () => {

        const user = userEvent.setup()

        render(<Login />)

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'hernan'
        )

        await user.type(
            screen.getByLabelText('Contraseña'),
            '12345'
        )

        await user.click(
            screen.getByRole(
                'button',
                { name: 'Ingresar' }
            )
        )

        expect(
            screen.getByText(
                'El correo electrónico no es válido'
            )
        ).toBeInTheDocument()

    })

    test('muestra error cuando la contraseña es muy corta', async () => {

        const user = userEvent.setup()

        render(<Login />)

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'hernan@gmail.com'
        )

        await user.type(
            screen.getByLabelText('Contraseña'),
            '12'
        )

        await user.click(
            screen.getByRole(
                'button',
                { name: 'Ingresar' }
            )
        )

        expect(
            screen.getByText(
                'La contraseña debe tener al menos 4 caracteres'
            )
        ).toBeInTheDocument()

    })

    test('no muestra error con datos válidos', async () => {

        const user = userEvent.setup()

        render(<Login />)

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'hernan@gmail.com'
        )

        await user.type(
            screen.getByLabelText('Contraseña'),
            '12345'
        )

        await user.click(
            screen.getByRole(
                'button',
                { name: 'Ingresar' }
            )
        )

        expect(
            screen.queryByText(
                'El correo electrónico no es válido'
            )
        ).not.toBeInTheDocument()

        expect(
            screen.queryByText(
                'La contraseña debe tener al menos 4 caracteres'
            )
        ).not.toBeInTheDocument()

    })

})