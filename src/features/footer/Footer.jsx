import React from 'react';
import { Link } from 'react-router-dom';
import logoMarquetazo from '../../assets/images/Marquetazo.png'; 
import './Footer.scss';

const Footer = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <footer className="footer custom-footer">
      <div className="container">
        <div className="columns">
          
          <div className="column is-one-quarter">
            <Link to="/">
              <img src={logoMarquetazo} alt="Marquetazo Logo" className="footer-logo" />
            </Link>
            <p className="is-size-7 mt-4">
              Tu supermercado de confianza, a un clic de distancia.
            </p>
            <div className="social-icons mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon is-medium">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon is-medium">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon is-medium">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </div>
          </div>

          <div className="column">
            <h4 className="title is-5 footer-title">Marquetazo</h4>
            <ul>
              <li><Link to="/about-us">Sobre Nosotros</Link></li>
              <li><Link to="/contact">Contáctanos</Link></li>
              <li><Link to="/jobs">Trabaja con Nosotros</Link></li>
            </ul>
          </div>

          <div className="column">
            <h4 className="title is-5 footer-title">Soporte</h4>
            <ul>
              <li><Link to="/faq">Preguntas Frecuentes</Link></li>
              <li><Link to="/shipping">Políticas de Envío</Link></li>
              <li><Link to="/privacy">Políticas de Privacidad</Link></li>
            </ul>
          </div>

          {/* Mi cuenta */}
          <div className="column">
            <h4 className="title is-5 footer-title">Mi Cuenta</h4>
            <ul>
              {currentUser ? (
                <>
                  <li><Link to="/profile">Mi Perfil</Link></li>
                  <li><Link to="/checkout">Ver Carrito</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Iniciar Sesión</Link></li>
                  <li><Link to="/register">Registrarme</Link></li>
                </>
              )}
            </ul>
          </div>

        </div>
        
        <div className="content has-text-centered">
          <p className="is-size-7">
            © 2025 Marquetazo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
