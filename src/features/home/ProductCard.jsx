import React from 'react';
import './ProductCard.scss'; // Crearemos este archivo ahora

const ProductCard = ({ product }) => {
  return (
    // Definimos las columnas de Bulma para que sea responsive
    <div className="column is-one-quarter-desktop is-half-tablet">
      <div className="card product-card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={product.thumbnail} alt={product.title} />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              {/* El título usará el color de texto oscuro por defecto */}
              <p className="title is-5">{product.title}</p>
              <p className="subtitle is-6 has-text-grey">{product.brand}</p>
            </div>
          </div>
          <div className="content">
            {/* Usamos has-text-primary, que tu SCSS definió como $organic-green */}
            <span className="title is-4 has-text-primary">${product.price}</span>
            <p className="is-size-7 mt-2">{product.description.substring(0, 50)}...</p>
          </div>
        </div>
        <footer className="card-footer">
          {/* Este botón usará $organic-green como color de fondo */}
          <a href="#" className="card-footer-item button is-primary is-fullwidth">
            <span className="icon">
              {/* Asegúrate de tener Font Awesome importado en tu index.html */}
              <i className="fas fa-cart-plus"></i>
            </span>
            <span>Añadir</span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default ProductCard;