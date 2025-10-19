// src/features/Navbar/Navbar.jsx

import React, { useState } from 'react';
import './Navbar.scss';
import '../../../my-bulma-project.scss';
import logoMarquetazo from '../../assets/images/Marquetazo.png';
import { categoryStructure } from '../../data/categoryStructure';
import './Sidebar.scss';

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


// --- Componente Principal Navbar ---
const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };
  
  return (
    <>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item is-clickable" onClick={() => setIsSidebarOpen(true)}>
            <span className="icon-text has-text-weight-bold">
              <span className="icon"><i className="fas fa-bars"></i></span>
              <span>Menú</span>
            </span>
          </div>
          <a className="navbar-item" href="#"><img src={logoMarquetazo} alt="Logo Marquetazo" /></a>
          <a role="button" className={`navbar-burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded={isActive} onClick={() => setIsActive(!isActive)}>
            <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
          </a>
        </div>
        
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
           {/* --- SECCIÓN RESTAURADA --- */}
           <div className="navbar-start">
             <div className="navbar-item">
               <div className="field has-addons">
                 <div className="control is-expanded">
                   <input className="input is-rounded" type="text" placeholder="Buscar en exito.com" />
                 </div>
                 <div className="control">
                   <a className="button is-dark is-rounded">
                     <span className="icon"><i className="fas fa-search"></i></span>
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
             <a className="navbar-item navbar-icon-text">
               <span className="icon"><i className="fas fa-user"></i></span>
               <span>Mi cuenta</span>
             </a>
             <a className="navbar-item navbar-icon-text">
               <span className="icon"><i className="fas fa-shopping-cart"></i></span>
               <span>Carrito</span>
             </a>
           </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="sidebar-container" onMouseLeave={handleMouseLeave}>
            <div className="sidebar-menu menu">
              <div className="sidebar-header">
                  <p className="menu-label">Categorías</p>
                  <button className="delete" onClick={() => setIsSidebarOpen(false)}></button>
              </div>
              <ul className="menu-list ">
                {categoryStructure.map((cat) => (
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