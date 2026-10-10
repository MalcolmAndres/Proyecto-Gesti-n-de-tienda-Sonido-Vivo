import { useState } from 'react'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {

        event.preventDefault()

        if (!email.includes('@')) {
            setError('El correo electrónico no es válido')
            return
        }

        if (password.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres')
            return
        }

        setError('')

        console.log('Email:', email)
        console.log('Password:', password)
    }

    return (
        <div className="container mt-4">

            <h1>Iniciar Sesión</h1>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    {/* 
                    <label className="form-label">
                        Correo electrónico
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                        */}

                    <label
                        htmlFor="email"
                        className="form-label"
                    >
                        Correo electrónico
                    </label>

                    <input
                        id="email"
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    {/*}
                    <label className="form-label">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                        */}

                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Contraseña
                    </label>

                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Ingresar
                </button>

            </form>

        </div>
    )
}

export default Login