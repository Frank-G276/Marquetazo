import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss'; 
import { useCart } from "../ShoppingCart/CartContext";


const ProductCard = ({ product }) => {
   const { addToCart } = useCart();
  return (
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
              <p className="title is-5">{product.title}</p>
              <p className="subtitle is-6 has-text-grey">{product.brand}</p>
            </div>
          </div>
          <div className="content">
            <span className="title is-4 has-text-primary">${product.price}</span>
            <p className="is-size-7 mt-2">{product.description.substring(0, 50)}...</p>
          </div>
        </div>
        <footer className="card-footer">
          <Link 
              to={`/product/${product.id}`} 
              className="card-footer-item button is-light"
            >
              Ver detalle
          </Link>
          <a className="card-footer-item button is-primary is-fullwidth" onClick={() => addToCart(product)}>
            <span className="icon">
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