// src/features/auth/Login.jsx

import React, { useState } from 'react';
import './Login.scss'; // Reutilizamos los mismos estilos
import { Link } from 'react-router-dom';

const Login = () => {
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para manejar la respuesta
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // 1. Obtener usuarios de Local Storage
      const usersStorage = localStorage.getItem('users');
      const users = usersStorage ? JSON.parse(usersStorage) : [];

      // 2. Buscar si el email existe
      const foundUser = users.find(user => user.email === email);

      // 3. Validación: Usuario no encontrado
      if (!foundUser) {
        setError('El correo electrónico no está registrado.');
        setLoading(false);
        return;
      }

      // 4. Validación: Contraseña incorrecta
      if (foundUser.password !== password) {
        setError('La contraseña es incorrecta.');
        setLoading(false);
        return;
      }

      // 5. ¡Éxito!
      setLoading(false);
      setSuccess('¡Inicio de sesión exitoso! Redirigiendo...');

      // Guardamos la sesión del usuario (sin la contraseña)
      const userSession = {
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        image: foundUser.image || ''
      };
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      window.dispatchEvent(new Event('userChanged'));
      
      // Redirigimos al inicio después de 1.5 segundos
      setTimeout(() => {
        window.location.href = '/'; // Redirige al Home
      }, 1500);

    } catch (err) {
      setLoading(false);
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
      console.error(err);
    }
  };

  return (
    <section className="hero is-fullheight login-page">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <div className="box login-box">
                <h2 className="title is-3 has-text-centered">Iniciar Sesión</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* --- Mensajes de Error o Éxito --- */}
                  {error && (
                    <div className="notification is-danger is-light is-size-7">{error}</div>
                  )}
                  {success && (
                    <div className="notification is-success is-light is-size-7">{success}</div>
                  )}

                  {/* Campo de Email */}
                  <div className="field">
                    <label className="label">Correo Electrónico</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-rounded"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  {/* Campo de Contraseña */}
                  <div className="field">
                    <label className="label">Contraseña</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-rounded"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  {/* Botón de Login */}
                  <div className="field">
                    <button 
                      type="submit" 
                      className={`button is-primary is-fullwidth is-rounded has-text-weight-bold ${loading ? 'is-loading' : ''}`}
                      disabled={loading}
                    >
                      Entrar
                    </button>
                  </div>
                </form>

                {/* Enlaces inferiores */}
                <div className="login-links has-text-centered">
                  <p className="is-size-7">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="is-link">Regístrate aquí</Link>
                  </p>
                  <p className="is-size-7 mt-2">
                    <Link to = "/forgot-password">
                      <a className="is-link">¿Olvidaste tu contraseña?</a>
                    </Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;