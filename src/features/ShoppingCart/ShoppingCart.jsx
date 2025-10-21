import React from 'react';
import './ShoppingCart.scss';

const ShoppingCart = ({ isOpen, onClose, carrito }) => {
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
                {carrito.map((item) => (
                  <div key={item.id} className="cart-item">
                    <p>{item.nombre}</p> <p>{item.unidades} x ${item.precio} </p>
                  </div>
                ))}
              </div>
              <button className="button is-exito is-fullwidth">
                Proceder al pago
              </button>
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
