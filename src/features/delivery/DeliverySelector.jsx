import { useState, useEffect } from "react";
import "./DeliverySelector.scss";

const DeliverySelector = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email || "guest";

  if (!currentUser) {
    return (
      <div className="delivery-entry" style={{ cursor: "pointer" }}>
        <i className="fas fa-map-marker-alt"></i>
        <span>¿Cómo quieres recibir tu pedido?</span>
      </div>
    );
  }

  const modeKey = `deliveryMode_${userEmail}`;
  const addressKey = `deliveryAddress_${userEmail}`;

  const [isActive, setIsActive] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState(localStorage.getItem(modeKey) || "");
  const [address, setAddress] = useState(localStorage.getItem(addressKey) || "");

  useEffect(() => {
    localStorage.setItem(modeKey, deliveryMode);
    localStorage.setItem(addressKey, address);
  }, [deliveryMode, address, modeKey, addressKey]);

  const handleModeSelect = (mode) => {
    setDeliveryMode(mode);
    if (mode === "pickup") setAddress("");
  };

  const handleSave = () => {
    setIsActive(false);
  };

  return (
    <>
      <div
        className="delivery-entry"
        onClick={() => setIsActive(true)}
        style={{ cursor: "pointer" }}
      >
        <i className="fas fa-map-marker-alt"></i>
        {deliveryMode ? (
          <span>
            {deliveryMode === "home"
              ? `Entregar en: ${address || "Dirección no especificada"}`
              : "Recoger en tienda"}
          </span>
        ) : (
          <span>¿Cómo quieres recibir tu pedido?</span>
        )}
      </div>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => setIsActive(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title modal-text-color">
              Selecciona cómo quieres recibir tu pedido
            </p>
          </header>
          <section className="modal-card-body">
            <div className="buttons is-centered">
              <button
                className={`button ${deliveryMode === "home" ? "is-success" : "is-light"}`}
                onClick={() => handleModeSelect("home")}
              >
                🏠 Domicilio
              </button>
              <button
                className={`button ${deliveryMode === "pickup" ? "is-success" : "is-light"}`}
                onClick={() => handleModeSelect("pickup")}
              >
                🛒 Recoger en tienda
              </button>
            </div>

            {deliveryMode === "home" && (
              <div className="field mt-4">
                <label className="label">Dirección o ciudad</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ej: Calle 45 #10-20, Bogotá"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            )}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleSave}>
              Guardar
            </button>
            <button className="button" onClick={() => setIsActive(false)}>
              Cancelar
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DeliverySelector;
