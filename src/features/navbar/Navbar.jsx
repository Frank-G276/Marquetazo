import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import '../../../my-bulma-project.scss'; 
import logoMarquetazo from '../../assets/images/Marquetazo.png';
import { categoryStructure } from '../../data/categoryStructure';
import SearchSuggestions from './SearchSuggestions'; 

const SubcategoryPanel = ({ category, onNavigate }) => {
  return (
    <div className="subcategory-panel menu">
      <p className="menu-label">{category.name}</p>
      <ul className="menu-list">
        {category.subcategories.map(subcat => (
          <li key={subcat}>
           <Link
             to={`/category/${encodeURIComponent(category.name)}`}
             onClick={(e) => {
               e.preventDefault();
               onNavigate(`/category/${encodeURIComponent(category.name)}`);
             }}
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

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  
  // --- Lógica de Posicionamiento del Portal ---
  const searchFormRef = useRef(null);
  const [searchRect, setSearchRect] = useState(null);

  // --- Lógica de "Debounce" (Antirrebote) ---
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setIsSuggestionsOpen(false);
      setSearchResults([]);
      setIsLoadingSearch(false);
      return;
    }
    setIsLoadingSearch(true);

    const timerId = setTimeout(async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.products || []);
        setIsSuggestionsOpen(true);
        if (searchFormRef.current) {
          setSearchRect(searchFormRef.current.getBoundingClientRect());
        }
      } catch (err) {
        console.error("Error en la búsqueda:", err);
        setIsSuggestionsOpen(false);
      }
      setIsLoadingSearch(false);
    }, 300); 

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]); 

  // --- Cierra el menú si se hace clic fuera o se hace scroll ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
        closeSuggestions();
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", closeSuggestions); 
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", closeSuggestions);
    };
  }, []); 

  const toggleMenu = () => setIsActive(!isActive); 
  
  const closeSuggestions = () => {
    setIsSuggestionsOpen(false);
  };
  
  const closeDropdown = () => {
    setHoveredCategory(null);
    setIsActive(false); 
  };
  
  const handleSuggestionClick = (path) => {
    navigate(path); 
    closeSuggestions(); 
  };

  const handleCategoryClick = (path) => {
    navigate(path); 
    closeDropdown(); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    handleSuggestionClick(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleFocus = () => {
    if (searchQuery.trim() && searchResults.length > 0) {
      setIsSuggestionsOpen(true);
      if (searchFormRef.current) {
        setSearchRect(searchFormRef.current.getBoundingClientRect());
      }
    }
  };

  return (
    <>
      <nav className="navbar is-exito is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/" onClick={closeDropdown}>
            <img src={logoMarquetazo} alt="Logo Supermercado Marquetazo" />
          </Link>

          {/* Dropdown de "Menú" (Categorías) */}
          <div className="navbar-item has-dropdown is-hoverable is-categories-dropdown">
            <a className="navbar-link">
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(`/category/${encodeURIComponent(cat.name)}`);
                    }}
                  >
                    <span>{cat.name}</span>
                    <span className="icon is-small is-right is-pulled-right">
                      <i className="fas fa-chevron-right"></i>
                    </span>
                  </Link>

                  {cat.subcategories.length > 0 && hoveredCategory?.name === cat.name && (
                    <div className="navbar-dropdown is-subcategory-dropdown">
                      <SubcategoryPanel 
                        category={cat} 
                        onNavigate={handleCategoryClick} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Burger (Móvil) */}
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

        {/* Menú principal (Buscador, Ubicación, Iconos) */}
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            
            {/* Formulario de Búsqueda */}
            <form 
              className="navbar-item search-form" 
              onSubmit={handleSearchSubmit}
              ref={searchFormRef}
            >
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input-navbar input is-rounded"
                    type="text"
                    placeholder="Buscar en Marquetazo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleFocus}
                  />
                  {isLoadingSearch && (
                    <span className="icon is-small is-right loading-spinner">
                      <i className="fas fa-spinner fa-spin"></i>
                    </span>
                  )}
                </div>
                <div className="control">
                  <button type="submit" className="button is-dark is-rounded">
                    <span className="icon"><i className="fas fa-search"></i></span>
                  </button>
                </div>
              </div>

              {/* El componente del Portal */}
              {isSuggestionsOpen && searchResults.length > 0 && searchRect && (
                <SearchSuggestions 
                  results={searchResults}
                  query={searchQuery}
                  onNavigate={handleSuggestionClick} 
                  searchRect={searchRect} 
                />
              )}
            </form>

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
            <Link className="navbar-item is-icon-text" to={"/login"} onClick={closeDropdown}>
              <span className="icon"><i className="fas fa-bell"></i></span>
              <span className="is-size-7"> Login </span>
            </Link>
            <Link className="navbar-item is-icon-text" to={"/profile"} onClick={closeDropdown}>
              <span className="icon"><i className="fas fa-user"></i></span>
              <span className="is-size-7">Mi cuenta</span>
            </Link>
            <Link className="navbar-item is-icon-text" to="#" onClick={() => { onCartClick(); closeDropdown(); }}>
              <span className="icon"><i className="fas fa-shopping-cart"></i></span>
              <span className="is-size-7">Carrito</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;