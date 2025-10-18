import React, { useState } from 'react';
import './Navbar.scss'; // Importamos nuestros estilos personalizados
import '../../../my-bulma-project.scss';
import logoMarquetazo from '../../assets/images/Marquetazo.png';

const Navbar = () => {
  // Estado para controlar si el menú móvil está activo o no
  const [isActive, setIsActive] = useState(false);

  // Función para cambiar el estado al hacer clic en el burger
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-exito" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img src={logoMarquetazo} alt="Logo Marquetazo" />
        </a>
        
        {/* El botón de hamburguesa para móviles */}
        <a 
          role="button" 
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu" 
          aria-expanded={isActive} 
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      {/* El menú que se mostrará/ocultará en móviles */}
      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input className="input is-rounded" type="text" placeholder="Buscar en exito.com" />
              </div>
              <div className="control">
                <a className="button is-dark is-rounded">
                  <span className="icon">
                    <i className="fas fa-search"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <a className="navbar-item has-text-weight-bold is-hidden-touch">
            <span className="icon">
                <i className="fas fa-map-marker-alt"></i>
            </span>
            <span>¿Cómo quieres recibir tu pedido?</span>
            <span className="icon is-small is-right">
                <i className="fas fa-chevron-right"></i>
            </span>
          </a>
        </div>

        <div className="navbar-end">
          <a className="navbar-item is-icon-text">
            <span className="icon"><i className="fas fa-bell"></i></span>
            <span className="is-size-7">Notificaciones</span>
          </a>
          <a className="navbar-item is-icon-text">
            <span className="icon"><i className="fas fa-user"></i></span>
            <span className="is-size-7">Mi cuenta</span>
          </a>
          <a className="navbar-item is-icon-text">
            <span className="icon"><i className="fas fa-shopping-cart"></i></span>
            <span className="is-size-7">Carrito</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;