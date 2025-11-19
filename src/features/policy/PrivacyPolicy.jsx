// src/features/policy/PrivacyPolicy.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Policy.scss'; 

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      
      {/* --- 1. Hero --- */}
      <section className="hero is-medium is-primary about-hero">
        <div className="hero-body has-text-centered">
          <p className="title is-1">
            Políticas de Privacidad
          </p>
          <p className="subtitle is-4">
            Tu confianza es nuestra prioridad.
          </p>
        </div>
      </section>

      {/* --- 2. Contenido Legal --- */}
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-three-quarters">
              <div className="content is-medium">
                
                <p className="has-text-grey is-italic">Última actualización: 13 de noviembre de 2025</p>
                
                <p>Bienvenido a Marquetazo. Nos tomamos tu privacidad muy en serio. Esta Política de Privacidad describe cómo recopilamos, usamos, protegemos y (en algunos casos) compartimos tu información personal cuando visitas o realizas una compra en nuestro sitio web.</p>
                
                <h2 className="title is-3 mt-6">1. Información que Recopilamos</h2>
                <p>Recopilamos información de varias maneras cuando interactúas con nuestro sitio:</p>
                <ul>
                  <li><strong>Información Personal Directa:</strong> Esto incluye tu nombre, dirección de correo electrónico, dirección de envío y facturación, número de teléfono y detalles de pago. La recopilamos cuando creas una cuenta o realizas un pedido.</li>
                  <li><strong>Información de Uso y Cookies:</strong> Recopilamos automáticamente información sobre cómo navegas en el sitio, qué productos ves y qué dispositivo usas. Usamos cookies para mantener tu sesión iniciada y recordar lo que hay en tu carrito.</li>
                </ul>

                <h2 className="title is-3 mt-6">2. Cómo Usamos tu Información</h2>
                <p>Usamos la información que recopilamos para varios propósitos:</p>
                <ul>
                  <li>Para procesar y enviar tus pedidos.</li>
                  <li>Para comunicarnos contigo sobre tu pedido o tu cuenta.</li>
                  <li>Para mejorar y optimizar nuestro sitio web (por ejemplo, analizando cómo interactúan los usuarios).</li>
                  <li>Para enviarte correos electrónicos promocionales (solo si te suscribes explícitamente).</li>
                </ul>

                <h2 className="title is-3 mt-6">3. Cómo Compartimos tu Información</h2>
                <p><strong>No vendemos tu información personal.</strong> Sin embargo, compartimos información con terceros de confianza que nos ayudan a operar:</p>
                <ul>
                  <li><strong>Proveedores de Pago:</strong> Para procesar de forma segura tu tarjeta de crédito/débito.</li>
                  <li><strong>Empresas de Logística:</strong> Para entregar tu pedido en tu dirección (ej. la empresa de envíos).</li>
                  <li><strong>Plataformas de Marketing:</strong> Para gestionar nuestro boletín de noticias (solo si te suscribes).</li>
                </ul>

                <h2 className="title is-3 mt-6">4. Seguridad de tu Información</h2>
                <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información. Nuestro sitio utiliza cifrado SSL (Secure Socket Layer) para proteger tus datos de pago durante la transacción.</p>

                <h2 className="title is-3 mt-6">5. Tus Derechos</h2>
                <p>Tienes derecho a acceder, rectificar o eliminar tu información personal en cualquier momento. Puedes hacerlo directamente desde tu <Link to="/profile">página de perfil</Link> o contactándonos.</p>

                <h2 className="title is-3 mt-6">6. Cambios a esta Política</h2>
                <p>Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos sobre cualquier cambio publicando la nueva política en esta página.</p>

                <h2 className="title is-3 mt-6">Contáctanos</h2>
                <p>Si tienes cualquier pregunta sobre esta política de privacidad, no dudes en <Link to="/contact">contactarnos</Link>.</p>
              
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default PrivacyPolicy;