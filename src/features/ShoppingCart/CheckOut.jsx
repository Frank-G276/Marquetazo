import React from "react";
import { useCart } from "../ShoppingCart/CartContext";


const Checkout = () => {
  const { carrito } = useCart();

  const total = carrito
    .reduce((total, item) => total + item.price * item.unidades, 0)
    .toFixed(2);

  return (
    <section className="section checkout-container">
      <div className="container">
        <h1 className="title is-3 has-text-centered">Finalizar Compra</h1>

        <div className="box">

          <h2 className="title is-5">Tu pedido</h2>

          {carrito.map(item => (
            <div key={item.id} className="level">
              <div className="level-left">
                <figure className="image is-64x64">
                  <img src={item.thumbnail} alt={item.title} />
                </figure>
                <div className="ml-3">
                  <p className="has-text-weight-semibold">{item.title}</p>
                  <p className="is-size-7">{item.unidades} unidad(es)</p>
                </div>
              </div>
              <div className="level-right has-text-weight-semibold">
                ${(item.price * item.unidades).toFixed(2)}
              </div>
            </div>
          ))}

          <hr />

          <div className="is-flex is-justify-content-space-between">
            <span className="has-text-weight-semibold">Total:</span>
            <span className="has-text-weight-semibold">${total}</span>
          </div>

          <button className="button is-primary is-fullwidth mt-4">
            Confirmar y pagar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
