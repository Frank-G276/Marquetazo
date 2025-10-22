// src/features/home/HeroCarousel.jsx

import React, { useState, useEffect } from 'react';
import './HeroCarousel.scss';
import Hero1 from '../../assets/images/home/Hero1.jpg';
import Hero2 from '../../assets/images/home/Hero2.jpg';
import Hero3 from '../../assets/images/home/Hero3.jpg';

// --- Imágenes de ejemplo para las promociones ---
// (Puedes reemplazar esto con tus propias imágenes)
const promoImages = [
  {
    id: 1,
    url: Hero1,
    alt: 'Promoción de frutas y verduras'
  },
  {
    id: 2,
    url: Hero2,
    alt: 'Ofertas en tecnología'
  },
  {
    id: 3,
    url: Hero3,
    alt: 'Especial de vinos y licores'
  }
];
// ------------------------------------------------

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efecto para el temporizador automático
  useEffect(() => {
    // Fija el intervalo de 5 segundos
    const timer = setInterval(() => {
      // Avanza al siguiente slide, o vuelve al primero si está en el último
      setCurrentSlide(prevSlide => 
        (prevSlide + 1) % promoImages.length
      );
    }, 5000); // 5000ms = 5 segundos

    // ¡Importante! Limpia el temporizador cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []); // El array vacío [] asegura que esto solo se ejecute al montar

  // Función para ir a un slide específico (para los puntos de navegación)
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <section className="hero-carousel" aria-label="Carrusel de promociones">
      <div className="carousel-slides">
        {promoImages.map((image, index) => (
          <div
            key={image.id}
            className={`carousel-slide ${index === currentSlide ? 'is-active' : ''}`}
          >
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
      
      {/* Puntos de navegación */}
      <div className="carousel-dots">
        {promoImages.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'is-active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;