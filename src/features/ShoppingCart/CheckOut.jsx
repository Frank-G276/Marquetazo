import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.scss";

const Checkout = () => {
  const { carrito, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const total = carrito
    .reduce((total, item) => total + item.price * item.unidades, 0)
    .toFixed(2);

  const handleConfirmPayment = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 😅");
      return;
    }

    
    clearCart();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/"); 
  };

  return (
    <section className="section checkout-container">
      <div className="container">
        <h1 className="title is-3 has-text-centered">Finalizar Compra</h1>

        <div className="box">
          <h2 className="title is-5">Tu pedido</h2>

          {carrito.length > 0 ? (
            carrito.map((item) => (
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
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )}

          <hr />

          <div className="is-flex is-justify-content-space-between">
            <span className="has-text-weight-semibold">Total:</span>
            <span className="has-text-weight-semibold">${total}</span>
          </div>

          <button
            className="button is-primary is-fullwidth mt-4"
            onClick={handleConfirmPayment}
          >
            Confirmar y pagar
          </button>
        </div>
      </div>

      <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">¡Compra exitosa!</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleCloseModal}
            ></button>
          </header>

          <section className="modal-card-body has-text-centered">
            <p className="is-size-5 mb-3">
              🎉 ¡Gracias por tu compra!
            </p>
            <p className="is-size-6">
              Tu pedido se ha procesado correctamente.  
              Recibirás los detalles por correo electrónico.
            </p>
          </section>

          <footer className="modal-card-foot is-justify-content-center">
            <button className="button is-success" onClick={handleCloseModal}>
              Aceptar
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
