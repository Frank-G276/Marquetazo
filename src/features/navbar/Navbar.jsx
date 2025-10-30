import React, { useState } from 'react';
import './Navbar.scss';
import '../../../my-bulma-project.scss';
import logoMarquetazo from '../../assets/images/Marquetazo.png';
import { categoryStructure } from '../../data/categoryStructure';
import './Sidebar.scss';
import { useNavigate } from "react-router-dom";

const SubcategoryPanel = ({ category }) => {
  return (
    <div className="subcategory-panel menu">
      <p className="menu-label">{category.name}</p>
      <ul className="menu-list">
        {category.subcategories.map(subcat => (
          <li key={subcat}>
            <a>{subcat.replace(/-/g, ' ')}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};



const Navbar = ({ onCartClick }) => {
  // Estado para controlar el menú móvil y el sidebar
  const [isActive, setIsActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();
  const toggleMenu = () => setIsActive(!isActive);
  const handleMouseLeave = () => setActiveCategory(null);

  return (
    <>
      <nav className="navbar is-exito" role="navigation" aria-label="main navigation">
        <div className="navbar-brand ">
        
          <a className="navbar-item" onClick={() => navigate("/home")}>
            <img src={logoMarquetazo} alt="Logo Marquetazo" />
          </a>

          <div className="navbar-item is-clickable" onClick={() => setIsSidebarOpen(true)}>
            <span className="icon-text has-text-weight-bold">
              <span className="icon"><i className="fas fa-bars"></i></span>
              <span>Menú</span>
            </span>
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

        {/* Menú principal */}
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            {/* Buscador */}
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

            {/* Ubicación */}
            <a className="navbar-item has-text-weight-bold is-hidden-touch">
              <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
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
              <span className="icon"><i className="fas fa-user" onClick={() => navigate("/login")}></i></span>
              <span className="is-size-7">Mi cuenta</span>
            </a>
            <a className="navbar-item is-icon-text" onClick={onCartClick}>
              <span className="icon"><i className="fas fa-shopping-cart"></i></span>
              <span className="is-size-7">Carrito</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Sidebar de categorías */}
      {isSidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="sidebar-container" onMouseLeave={handleMouseLeave}>
            <div className="sidebar-menu menu">
              <div className="sidebar-header">
                <p className="menu-label">Categorías</p>
                <button className="delete" onClick={() => setIsSidebarOpen(false)}></button>
              </div>
              <ul className="menu-list">
                {categoryStructure.map(cat => (
                  <li key={cat.name} onMouseEnter={() => setActiveCategory(cat)}>
                    <a className={activeCategory?.name === cat.name ? 'is-active' : ''}>
                      <span>{cat.name}</span>
                      <span className="icon is-small is-right">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {activeCategory && activeCategory.subcategories.length > 0 && (
              <SubcategoryPanel category={activeCategory} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
