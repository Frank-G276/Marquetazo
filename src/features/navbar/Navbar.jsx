import React, { useState } from 'react';
import './Navbar.scss';
import '../../../my-bulma-project.scss'; 
import logoMarquetazo from '../../assets/images/Marquetazo.png';
import { categoryStructure } from '../../data/categoryStructure';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const SubcategoryPanel = ({ category }) => { 
  return (
    <div className="subcategory-panel menu"> 
      <p className="menu-label">{category.name}</p>
      <ul className="menu-list">
        {category.subcategories.map(subcat => (
          <li key={subcat}>
           <Link
             to={`/category/${encodeURIComponent(category.name)}`}
             >
              {subcat.replace(/-/g, ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


const Navbar = ({ onCartClick }) => {
  const [isActive, setIsActive] = useState(false); 
  const [hoveredCategory, setHoveredCategory] = useState(null); 
  
  const navigate = useNavigate();
  const toggleMenu = () => setIsActive(!isActive);
  const handleMouseLeave = () => setActiveCategory(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login", { replace: true });  
  };

  const closeDropdown = () => {
    setHoveredCategory(null); 
    setIsActive(false); 
  };

  return (
    <>
      <nav className="navbar is-exito is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/" onClick={closeDropdown}>
            <img src={logoMarquetazo} alt="Logo Supermercado Marquetazo" />
          </Link>

          <div className="navbar-item has-dropdown is-hoverable is-categories-dropdown"> 
            <a className="navbar-link" > 
              <span className="icon-text has-text-weight-bold">
                <span className="icon"><i className="fas fa-bars"></i></span>
                <span>Menú</span>
              </span>
            </a>

            <div className="navbar-dropdown is-boxed is-categories-menu"> 
              {categoryStructure.map(cat => (
                
                <div 
                  key={cat.name} 
                  className={`navbar-item has-dropdown is-hoverable category-item ${hoveredCategory?.name === cat.name ? 'is-active' : ''}`}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)} 
                >
                  <Link 
                    to={`/category/${encodeURIComponent(cat.name)}`} 
                    className="navbar-link" 
                    onClick={closeDropdown} 
                  >
                    <span>{cat.name}</span>
                    <span className="icon is-small is-right is-pulled-right">
                      <i className="fas fa-chevron-right"></i>
                    </span>
                  </Link>

                  
                  {cat.subcategories.length > 0 && hoveredCategory?.name === cat.name && (
                    <div className="navbar-dropdown is-subcategory-dropdown"> 
                      <SubcategoryPanel category={cat} onClose={closeDropdown} /> 
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
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

        
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input-navbar input is-rounded"
                    type="text"
                    placeholder="Buscar en Marquetazo..."
                  />
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
              <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
              <span>¿Cómo quieres recibir tu pedido?</span>
              <span className="icon is-small is-right">
                <i className="fas fa-chevron-right"></i>
              </span>
            </a>
          </div>

          <div className="navbar-end">
            {!currentUser && (
              <Link
                className="navbar-item is-icon-text"
                to="/login"
                onClick={closeDropdown}
              >
                <span className="icon"><i className="fas fa-bell"></i></span>
                <span className="is-size-7">Login</span>
              </Link>
            )}

            <Link
              className="navbar-item is-icon-text"
              onClick={closeDropdown}
            >
              <span className="icon"><i className="fas fa-user"></i></span>
              <span className="is-size-7">Mi cuenta</span>
            </Link>

            <Link
              className="navbar-item is-icon-text"
              onClick={() => { onCartClick(); closeDropdown(); }}
            >
              <span className="icon"><i className="fas fa-shopping-cart"></i></span>
              <span className="is-size-7">Carrito</span>
            </Link>
            
            {currentUser && (
              <>
                <Link className="navbar-item is-icon-text" onClick={handleLogout}>
                <span className="icon"><i className="fas fa-sign-out-alt"></i></span>
                <span className="is-size-7">Cerrar sesión</span>
                </Link>

                <span className="navbar-item is-size-7">
                  Hola, {currentUser.firstName}
                </span>

              </>
            )}
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;