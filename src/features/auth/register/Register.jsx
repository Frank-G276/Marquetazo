import { useState } from 'react';
import './Register.scss'; 
import { Link } from "react-router-dom";


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess(''); 

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // --- 2. Lógica de Local Storage ---
    try {
      // Obtenemos los usuarios existentes o un array vacío
      const usersStorage = localStorage.getItem('users');
      const users = usersStorage ? JSON.parse(usersStorage) : [];

      // Revisamos si el email ya está registrado
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        setError('Este correo electrónico ya está registrado.');
        return;
      }

      // Creamos el nuevo usuario 
      const newUser = {
        firstName,
        lastName,
        email,
        password 
      };

      // Agregamos el nuevo usuario a la lista
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Guardar usuario logueado
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      // Crear carrito asociado al usuario
      const userCart = {
        email: newUser.email,
        items: []
      };
      localStorage.setItem(`cart_${newUser.email}`, JSON.stringify(userCart));

      setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
      
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      setError('Ocurrió un error al guardar el usuario.');
      console.error(err);
    }
  };

  return (
    <section className="hero is-fullheight register-page">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-fifths">
              <div className="box register-box">
                <h2 className="title is-3 has-text-centered">Crea tu Cuenta</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* --- Mensajes de Error o Éxito --- */}
                  {error && (
                    <div className="notification is-danger is-light is-size-7">{error}</div>
                  )}
                  {success && (
                    <div className="notification is-success is-light is-size-7">{success}</div>
                  )}

                  <div className="columns">
                    {/* Campo de Nombre */}
                    <div className="column">
                      <div className="field">
                        <label className="label">Nombre</label>
                        <div className="control has-icons-left">
                          <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Tu nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                          <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
                        </div>
                      </div>
                    </div>
                    {/* Campo de Apellido */}
                    <div className="column">
                      <div className="field">
                        <label className="label">Apellido</label>
                        <div className="control has-icons-left">
                          <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Tu apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                          <span className="icon is-small is-left"><i className="fas fa-user-plus"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>

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
                      />
                      <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                    </div>
                  </div>

                  {/* Campo de Contraseña */}
                  <div className="field">
                    <label className="label">Contraseña</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-rounded"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                    </div>
                  </div>

                  {/* Campo de Confirmar Contraseña */}
                  <div className="field">
                    <label className="label">Confirmar Contraseña</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-rounded"
                        type="password"
                        placeholder="Repite tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <span className="icon is-small is-left"><i className="fas fa-check-double"></i></span>
                    </div>
                  </div>

                  {/* Botón de Registro */}
                  <div className="field mt-5">
                    <button 
                      type="submit" 
                      className="button is-primary is-fullwidth is-rounded has-text-weight-bold"
                    >
                      Registrarme
                    </button>
                  </div>
                </form>

                {/* Enlace inferior */}
                <div className="register-links has-text-centered mt-4">
                  <p className="is-size-7">
                    ¿Ya tienes cuenta?{' '}
                    <Link to = "/login">
                      <a className="is-link">Inicia sesión</a>
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

export default Register;