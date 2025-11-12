import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'; 
import './Navbar.scss'; 

const SearchSuggestions = ({ results, query, onNavigate, searchRect }) => {
  const brands = [...new Set(results.map(p => p.brand))].slice(0, 4);
  const suggestions = results.slice(0, 5);

  const portalStyle = {
    position: 'fixed',
    top: `${searchRect.bottom + 8}px`,
    left: `${searchRect.left}px`,
    width: `${searchRect.width}px`,
    zIndex: 1000 
  };

  const portalContent = (
    <div className="search-suggestions box" style={portalStyle}> 
      <div className="columns">
        
        {/* Columna de Sugerencias */}
        <div className="column is-two-thirds">
          <h4 className="title is-6 suggestion-title">Sugerencias</h4>
          <ul className="suggestion-list">
            {suggestions.map(product => (
              <li key={product.id}>
                <Link 
                  to={`/product/${product.id}`} 
                  className="suggestion-item"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/product/${product.id}`);
                  }}
                >
                  <img src={product.thumbnail} alt="" className="suggestion-image" />
                  <span>{product.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Columna de Marcas */}
        <div className="column">
          <h4 className="title is-6 suggestion-title">Marcas</h4>
          <ul className="suggestion-list">
            {brands.map(brand => (
              <li key={brand}>
                <Link 
                  to={`/search?q=${encodeURIComponent(brand)}`}
                  className="suggestion-item"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/search?q=${encodeURIComponent(brand)}`);
                  }}
                >
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
      
      {/* Botón "Ver todos los resultados" */}
      <div className="has-text-centered">
        <Link 
          to={`/search?q=${encodeURIComponent(query)}`}
          className="button is-link is-fullwidth"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/search?q=${encodeURIComponent(query)}`);
          }}
        >
          Ver todos los resultados ({results.length})
        </Link>
      </div>
    </div>
  );

  return ReactDOM.createPortal(portalContent, document.body);
};

export default SearchSuggestions;   