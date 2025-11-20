import './ContactUs.scss';

const ContactUs = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! (Simulación)');
  };

  return (
    <div className="contact-page">
      <section className="section">
        <div className="container">
          <div className="title-container has-text-centered">
            <h1 className="title is-1">¡Hablemos!</h1>
            <h2 className="subtitle is-4">
              Estamos aquí para ayudarte, ya sea una duda, una sugerencia o un saludo.
            </h2>
          </div>
          <div className="columns contact-container-card">
            
            <div className="column is-5 contact-info-panel">
              <h3 className="title is-3 has-text-white">Habla con un humano</h3>
              <p className="has-text-white mb-5">
                ¿Odias los formularios? No hay problema. Aquí tienes las rutas directas para conectar con nosotros.
              </p>

              <div className="contact-option">
                <span className="icon is-large"><i className="fas fa-2x fa-phone-alt"></i></span>
                <div className="contact-details">
                  <h5 className="title is-5 has-text-white">Llámanos</h5>
                  <p>+57 300 123 4567</p>
                </div>
              </div>

              <div className="contact-option">
                <span className="icon is-large"><i className="fas fa-2x fa-envelope"></i></span>
                <div className="contact-details">
                  <h5 className="title is-5 has-text-white">Escríbenos</h5>
                  <p>soporte@marquetazo.com</p>
                </div>
              </div>

              <div className="contact-option">
                <span className="icon is-large"><i className="fas fa-2x fa-store"></i></span>
                <div className="contact-details">
                  <h5 className="title is-5 has-text-white">Visítanos</h5>
                  <p>Av. Siempre Viva 123, Bogotá</p>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="social-icons-contact">
                <span className="icon is-medium"><i className="fab fa-2x fa-facebook-f"></i></span>
                <span className="icon is-medium"><i className="fab fa-2x fa-instagram"></i></span>
                <span className="icon is-medium"><i className="fab fa-2x fa-whatsapp"></i></span>
              </div>
            </div>

            {/* --- PANEL DERECHO (FORMULARIO) --- */}
            <div className="column is-7 contact-form-panel">
              <h3 className="title is-3">O, déjanos un mensaje</h3>
              <form onSubmit={handleSubmit}>
                
                {/* Nombre y Email */}
                <div className="field is-grouped">
                  <div className="control is-expanded">
                    <label className="label">Nombre</label>
                    <input className="input is-medium" type="text" placeholder="Tu nombre" required />
                  </div>
                  <div className="control is-expanded">
                    <label className="label">Email</label>
                    <input className="input is-medium" type="email" placeholder="tu@correo.com" required />
                  </div>
                </div>

                {/* Asunto */}
                <div className="field">
                  <label className="label">Asunto</label>
                  <div className="control">
                    <div className="select is-fullwidth is-medium">
                      <select>
                        <option>Tengo una duda sobre un producto</option>
                        <option>Problemas con mi pedido</option>
                        <option>Sugerencias y mejoras</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Mensaje */}
                <div className="field">
                  <label className="label">Mensaje</label>
                  <div className="control">
                    <textarea className="textarea is-medium" rows="6" placeholder="Cuéntanos más..." required></textarea>
                  </div>
                </div>

                {/* Botón */}
                <div className="field">
                  <div className="control">
                    <button className="button is-warning is-large is-fullwidth" type="submit">
                      <span className="icon"><i className="fas fa-paper-plane"></i></span>
                      <span>Enviar Mensaje</span>
                    </button>
                  </div>
                </div>

              </form>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;