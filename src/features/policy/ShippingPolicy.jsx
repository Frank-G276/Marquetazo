// src/features/policy/ShippingPolicy.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Policy.scss'; // Un archivo SCSS que compartiremos con otras políticas

const ShippingPolicy = () => {
  return (
    <div className="policy-page">
      
      {/* --- 1. Hero --- */}
      <section className="hero is-medium is-primary about-hero">
        <div className="hero-body has-text-centered">
          <p className="title is-1">
            Políticas de Envío
          </p>
          <p className="subtitle is-4">
            Claro, rápido y confiable. Así es Marquetazo.
          </p>
        </div>
      </section>

      {/* --- 2. Nuestro Proceso (El Timeline) --- */}
      <section className="section">
        <div className="container">
          <h2 className="title is-2 has-text-centered">Nuestro Proceso de Envío</h2>
          <div className="shipping-steps columns is-centered mt-6">
            
            {/* Paso 1 */}
            <div className="step-item column is-one-quarter has-text-centered">
              <div className="step-icon">
                <i className="fas fa-3x fa-receipt"></i>
              </div>
              <h4 className="title is-4 mt-4">1. Orden Recibida</h4>
              <p>Recibimos tu orden y nuestro equipo la valida al instante.</p>
            </div>
            
            {/* Paso 2 */}
            <div className="step-item column is-one-quarter has-text-centered">
              <div className="step-icon">
                <i className="fas fa-3x fa-box-open"></i>
              </div>
              <h4 className="title is-4 mt-4">2. Pedido Preparado</h4>
              <p>Preparamos y empacamos tus productos (¡con extra cuidado si son frescos!).</p>
            </div>

            {/* Paso 3 */}
            <div className="step-item column is-one-quarter has-text-centered">
              <div className="step-icon">
                <i className="fas fa-3x fa-truck"></i>
              </div>
              <h4 className="title is-4 mt-4">3. En Reparto</h4>
              <p>Tu pedido sale de nuestra bodega con uno de nuestros mensajeros aliados.</p>
            </div>

            {/* Paso 4 */}
            <div className="step-item column is-one-quarter has-text-centered">
              <div className="step-icon">
                <i className="fas fa-3x fa-home"></i>
              </div>
              <h4 className="title is-4 mt-4">4. ¡Llegamos!</h4>
              <p>Recibes tus productos en la puerta de tu casa. ¡A disfrutar!</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Costos y Tiempos (La Tabla) --- */}
      <section className="section has-background-light">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-5">Tiempos y Costos</h2>
          
          {/* Aviso de Envío Gratis */}
          <div className="notification is-warning has-text-centered">
            <span className="icon is-medium mr-2"><i className="fas fa-gift"></i></span>
            ¡Envío **GRATIS** en Bogotá por compras superiores a $150.000 COP!
          </div>

          <table className="table is-fullwidth is-striped is-hoverable policy-table">
            <thead>
              <tr>
                <th>Zona de Envío</th>
                <th>Tiempo Estimado de Entrega</th>
                <th>Costo de Envío</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bogotá D.C. (Zona Urbana)</strong></td>
                <td>1 día hábil (pedidos antes de 12pm pueden llegar el mismo día)</td>
                <td>$8.000 COP</td>
              </tr>
              <tr>
                <td><strong>Ciudades Principales (Nacional)</strong></td>
                <td>2-3 días hábiles</td>
                <td>$15.000 COP</td>
              </tr>
              <tr>
                <td><strong>Zonas Especiales y Rurales</strong></td>
                <td>5-7 días hábiles</td>
                <td>$25.000 COP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- 4. Políticas Especiales --- */}
      <section className="section">
        <div className="container">
          <div className="columns">
            {/* Columna de Frescos */}
            <div className="column">
              <div className="policy-section">
                <span className="icon is-large policy-icon">
                  <i className="fas fa-2x fa-leaf"></i>
                </span>
                <div className="content">
                  <h4 className="title is-4">Política de Productos Frescos</h4>
                  <p>Para garantizar la máxima frescura, los pedidos que incluyan frutas, verduras o productos refrigerados **solo se envían dentro de Bogotá D.C.** No despachamos perecederos a otras ciudades para mantener nuestra promesa de calidad.</p>
                </div>
              </div>
            </div>

            {/* Columna de Tracking */}
            <div className="column">
              <div className="policy-section">
                <span className="icon is-large policy-icon">
                  <i className="fas fa-2x fa-map-marked-alt"></i>
                </span>
                <div className="content">
                  <h4 className="title is-4">Seguimiento de tu Pedido</h4>
                  <p>Recibirás un correo electrónico con el número de guía tan pronto como tu pedido sea despachado. Podrás rastrearlo en tiempo real.</p>
                  <p>Si tienes cualquier duda, no dudes en <Link to="/contact">contactarnos</Link>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default ShippingPolicy;