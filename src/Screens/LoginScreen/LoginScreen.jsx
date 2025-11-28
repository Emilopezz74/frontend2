import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch.jsx'
import useForm from '../../hooks/useForm.jsx'
import { login } from '../../services/authService.js'
import { useNavigate } from 'react-router'
import LOCALSTORAGE_KEYS from '../../constants/localstorage.js'
import './LoginScreen.css'

const FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

const initial_form_state = {
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PASSWORD]: ''
}

export const LoginScreen = () => {

    const navigate = useNavigate()
    const irARegistro = () => {
        navigate("/register");
    };


    const {
        sendRequest,
        loading,
        response,
        error
    } = useFetch()

    const onLogin = (form_state) => {
        sendRequest(() => login(
            form_state[FORM_FIELDS.EMAIL],
            form_state[FORM_FIELDS.PASSWORD]
        ))
    }

useEffect(() => {
    console.log(response)
    if (response) {
        console.log(response.data)
        localStorage.setItem(LOCALSTORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
        localStorage.setItem('user_name', response.data.user_name)
        navigate('/home')
    }
}, [response])

    const {
        form_state: login_form_state,
        handleSubmit,
        handleInputChange
    } = useForm(
        {
            initial_form_state,
            onSubmit: onLogin
        }
    )

     return (
    <div className="login-container">
      {/* Animated background elements */}
      <div className="whatsapp-bg">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="whatsapp-logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
          <h1 className="login-title">Iniciar Sesión</h1>
          <p className="login-subtitle">Ingresa a tu cuenta de WhatsApp</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor={FORM_FIELDS.EMAIL}>Email</label>
            <input
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              type="email"
              placeholder="tu@email.com"
              onChange={handleInputChange}
              value={login_form_state[FORM_FIELDS.EMAIL]}
              disabled={!!response}
            />
          </div>

          <div className="input-group">
            <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña</label>
            <input
              name={FORM_FIELDS.PASSWORD}
              id={FORM_FIELDS.PASSWORD}
              type="password"
              placeholder="••••••••"
              onChange={handleInputChange}
              value={login_form_state[FORM_FIELDS.PASSWORD]}
              disabled={!!response}
            />
          </div>

          {!response ? (
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          ) : (
            <>
              <button className="login-btn success" type="button" disabled={true}>
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Sesión Iniciada
              </button>
              <span className="success-msg">{response.message}</span>
            </>
          )}

          {error && (
            <div className="error-msg">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {error.message}
            </div>
          )}

          <div className="login-link">
            <span className="login-text">¿No tienes una cuenta? </span>
            <a
              href="/register"
              className="login-anchor"
              onClick={(e) => {
                e.preventDefault()
                irARegistro()
              }}
            >
              Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
    )
}