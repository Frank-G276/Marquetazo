import React from 'react';
import './ShoppingCart.scss';
import { useCart } from "../../features/ShoppingCart/CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ isOpen, onClose }) => {
  const { carrito, addToCart, reduceToCart, deleteFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="title-cart is-5">Tu carrito</h2>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </div>

        <div className="cart-content">
          {carrito.length > 0 ? (
            <>
              <div className="cart-items">
                {carrito.map(item => (
                  <div key={item.id} className="cart-item">
                    <img className='img-cart' src={item.thumbnail} alt={item.title} />

                    <div className="cart-info">
                      <p className="cart-title">{item.title}</p>

                      <div className="cart-quantity">
                        <button className="qty-btn" onClick={() => reduceToCart(item)}>-</button>
                        <span className="qty">{item.unidades}</span>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>

                    <div className="cart-price">
                      <strong>${(item.price * item.unidades).toFixed(2)}</strong>
                      <button className="remove-btn" onClick={() => deleteFromCart(item)}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <p className="total">
                  Total: <strong>${carrito.reduce((t, i) => t + i.price * i.unidades, 0).toFixed(2)}</strong>
                </p>

                <button className="button checkout-btn" onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}>
                  Proceder al pago
                </button>
              </div>
            </>
          ) : (
            <p>Tu carrito está vacío</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
