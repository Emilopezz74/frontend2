import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router'
import './RegisterScreen.css'

const FORM_FIELDS = {
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password'
}

const initial_form_state = {
    [FORM_FIELDS.NAME]: '',
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PASSWORD]: ''
}

const RegisterScreen = () => {
    const navigate = useNavigate()
    const goToLogin = () => navigate("/login")

    const { sendRequest, loading, response, error } = useFetch()
    const [formError, setFormError] = useState(null) // Estado para errores de validación

    // Función de validación
    const validateForm = (form_state) => {
        if (!form_state[FORM_FIELDS.NAME].trim()) return "El nombre es obligatorio"
        if (!form_state[FORM_FIELDS.EMAIL].trim()) return "El email es obligatorio"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form_state[FORM_FIELDS.EMAIL])) return "Ingrese un email válido"
        if (!form_state[FORM_FIELDS.PASSWORD].trim()) return "La contraseña es obligatoria"
        if (form_state[FORM_FIELDS.PASSWORD].length < 6) return "La contraseña debe tener al menos 6 caracteres"
        return null
    }

    const onRegister = (form_state) => {
        // Validación antes de enviar
        const validationError = validateForm(form_state)
        if (validationError) {
            setFormError(validationError)
            return
        }
        setFormError(null)

        // Solo si pasa la validación
        sendRequest(async () => {
            await register(
                form_state[FORM_FIELDS.NAME],
                form_state[FORM_FIELDS.EMAIL],
                form_state[FORM_FIELDS.PASSWORD]
            )
            return { message: "Usuario registrado correctamente" }
        })
    }

    const { form_state: register_form_state, handleSubmit, handleInputChange } = useForm({
        initial_form_state,
        onSubmit: onRegister
    })

    return (
        <div className="register-container">
            <div className="background-pattern" />
            <div className="register-card-wrapper">
                <div className="register-card">
                    <div className="register-header">
                        <div className="logo-container">
                            <div className="logo-circle">
                                <svg className="logo-icon" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-... (tu path SVG) ..." />
                                </svg>
                            </div>
                        </div>
                        <h1 className="register-title">Registrate</h1>
                        <p className="register-subtitle">Únete a nuestra comunidad</p>
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-field" style={{ animationDelay: "0.1s" }}>
                            <label htmlFor={FORM_FIELDS.NAME} className="form-label">Nombre</label>
                            <input
                                name={FORM_FIELDS.NAME}
                                id={FORM_FIELDS.NAME}
                                type="text"
                                onChange={handleInputChange}
                                value={register_form_state[FORM_FIELDS.NAME]}
                                className="form-input"
                                placeholder="Ingresa tu nombre"
                            />
                        </div>

                        <div className="form-field" style={{ animationDelay: "0.2s" }}>
                            <label htmlFor={FORM_FIELDS.EMAIL} className="form-label">Email</label>
                            <input
                                name={FORM_FIELDS.EMAIL}
                                id={FORM_FIELDS.EMAIL}
                                type="email"
                                onChange={handleInputChange}
                                value={register_form_state[FORM_FIELDS.EMAIL]}
                                className="form-input"
                                placeholder="ejemplo@correo.com"
                            />
                        </div>

                        <div className="form-field" style={{ animationDelay: "0.3s" }}>
                            <label htmlFor={FORM_FIELDS.PASSWORD} className="form-label">Contraseña</label>
                            <input
                                name={FORM_FIELDS.PASSWORD}
                                id={FORM_FIELDS.PASSWORD}
                                type="password"
                                onChange={handleInputChange}
                                value={register_form_state[FORM_FIELDS.PASSWORD]}
                                className="form-input"
                                placeholder="Mínimo 6 caracteres"
                                autoComplete="off"
                            />
                        </div>

                        {/* Mostrar errores de validación */}
                        {formError && <div className="error-message">{formError}</div>}
                        {error && <div className="error-message">{error.message}</div>}

                        <div className="form-submit" style={{ animationDelay: "0.4s" }}>
                            {!response ? (
                                <button type="submit" disabled={loading} className="submit-button">
                                    {loading ? "Registrando..." : "Registrarse"}
                                </button>
                            ) : (
                                <div className="success-container">
                                    <button type="button" disabled className="success-button">
                                        <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Registrado
                                    </button>
                                    <div className="success-message">{response.message}</div>
                                    <button className="go-login-btn" onClick={goToLogin}>Ir a Login</button>
                                </div>
                            )}
                        </div>

                        <div className="login-link" style={{ animationDelay: "0.5s" }}>
                            <span className="login-text">¿Ya tienes una cuenta? </span>
                            <a href="/login" className="login-anchor" onClick={(e) => { e.preventDefault(); goToLogin() }}>
                                Inicia sesión aquí
                            </a>
                        </div>
                    </form>
                </div>

                <p className="register-footer" style={{ animationDelay: "0.6s" }}>
                    Al registrarte, aceptas nuestros términos y condiciones
                </p>
            </div>
        </div>
    )
}

export default RegisterScreen
