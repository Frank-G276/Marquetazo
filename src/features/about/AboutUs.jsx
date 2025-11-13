// src/features/about/AboutUs.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.scss';


const AboutUs = () => {
  return (
    <div className="about-us-page">
      
      {/* --- 1. Sección Hero --- */}
      <section className="hero is-medium is-primary about-hero">
        <div className="hero-body has-text-centered">
          <p className="title is-1">
            Conoce Marquetazo
          </p>
          <p className="subtitle is-3">
            Tu supermercado de confianza, del campo a tu puerta.
          </p>
        </div>
      </section>

      {/* --- 2. Sección Misión/Historia --- */}
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            
            {/* Columna de Imagen */}
            <div className="column is-half">
              <figure className="image is-4by3 mission-image">
                <img 
                  src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg" 
                  alt="Mercado local con productos frescos" 
                />
              </figure>
            </div>
            
            {/* Columna de Texto */}
            <div className="column is-half">
              <div className="content">
                <h2 className="title is-2">Nuestra Historia</h2>
                <p className="is-size-5">
                  Marquetazo nació de una idea simple: todos merecen acceso a productos frescos y de calidad sin la complicación de la ciudad. 
                  Comenzamos como un pequeño puesto en el mercado local, conectando a agricultores de la región con familias que buscaban lo mejor para su mesa.
                </p>
                <p>
                  Hoy, esa conexión es digital, pero el corazón es el mismo. Hemos crecido, pero seguimos siendo tu "tienda de la esquina", 
                  comprometidos con la frescura, el comercio justo y con llevar lo mejor de la tierra directamente a tu hogar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Sección de Valores --- */}
      <section className="section has-background-light values-section">
        <div className="container">
          <div className="has-text-centered">
            <h2 className="title is-2">Nuestros Pilares</h2>
            <p className="subtitle is-5">Lo que nos define y nos impulsa.</p>
          </div>
          
          <div className="columns is-centered mt-6">
            
            {/* Valor 1: Frescura */}
            <div className="column is-one-third has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-3x fa-leaf"></i>
              </span>
              <h3 className="title is-4 mt-4">Frescura Inigualable</h3>
              <p>Trabajamos sin intermediarios para que las frutas y verduras lleguen a tu mesa en menos de 48 horas desde su cosecha.</p>
            </div>
            
            {/* Valor 2: Sostenibilidad */}
            <div className="column is-one-third has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-3x fa-recycle"></i>
              </span>
              <h3 className="title is-4 mt-4">Sostenibilidad</h3>
              <p>Minimizamos el desperdicio de alimentos y usamos empaques 100% biodegradables. Cuidar tu salud es cuidar el planeta.</p>
            </div>
            
            {/* Valor 3: Comunidad */}
            <div className="column is-one-third has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-3x fa-hands-helping"></i>
              </span>
              <h3 className="title is-4 mt-4">Comercio Justo</h3>
              <p>Pagamos un precio justo a nuestros agricultores locales, fortaleciendo la economía de nuestra comunidad y asegurando la calidad.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- 4. Sección CTA (Llamado a la Acción) --- */}
      <section className="section cta-section">
        <div className="container has-text-centered">
          <h2 className="title is-2">¿Listo para llenar tu carrito?</h2>
          <p className="subtitle is-5">Descubre por qué miles de familias nos prefieren.</p>
          <Link to="/" className="button is-warning is-large mt-4">
            <span className="icon"><i className="fas fa-shopping-basket"></i></span>
            <span>Ver Productos</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;