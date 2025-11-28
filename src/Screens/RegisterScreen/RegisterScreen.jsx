import React from 'react'
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

    const {
        sendRequest,
        loading,
        response,
        error
    } = useFetch()

    // Validación simple antes de enviar al backend
    const validateForm = (form_state) => {
        if (!form_state[FORM_FIELDS.NAME].trim()) {
            return "El nombre es obligatorio"
        }
        if (!form_state[FORM_FIELDS.EMAIL].trim()) {
            return "El email es obligatorio"
        }
        // Regex simple para validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form_state[FORM_FIELDS.EMAIL])) {
            return "Ingrese un email válido"
        }
        if (!form_state[FORM_FIELDS.PASSWORD].trim()) {
            return "La contraseña es obligatoria"
        }
        if (form_state[FORM_FIELDS.PASSWORD].length < 6) {
            return "La contraseña debe tener al menos 6 caracteres"
        }
        return null
    }
    const onRegister = async (form_state) => {
        sendRequest(async () => {
            await register(
                form_state[FORM_FIELDS.NAME],
                form_state[FORM_FIELDS.EMAIL],
                form_state[FORM_FIELDS.PASSWORD]
            )
            return { message: "Usuario registrado correctamente" }
        })
    }

    const {
        form_state: register_form_state,
        handleSubmit,
        handleInputChange
    } = useForm({
        initial_form_state,
        onSubmit: onRegister
    })

    return (
        <div className="register-container">
            <div className="background-pattern" />

            <div className="register-card-wrapper">
                <div className="register-card">
                    {/* Header */}
                    <div className="register-header">
                        <div className="logo-container">
                            <div className="logo-circle">
                                <svg className="logo-icon" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="register-title">Registrate</h1>
                        <p className="register-subtitle">Únete a nuestra comunidad</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="register-form">
                        {/* Name */}
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

                        {/* Email */}
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

                        {/* Password */}
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
                            />
                        </div>

                        {/* Submit */}
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

                        {/* Error */}
                        {error && <div className="error-message">{error.message}</div>}

                        {/* Login link */}
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
