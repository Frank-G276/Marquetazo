import { useState, useEffect } from 'react';
import './HeroCarousel.scss';
import Hero1 from '../../assets/images/home/Hero1.jpg';
import Hero2 from '../../assets/images/home/Hero2.jpg';
import Hero3 from '../../assets/images/home/Hero3.jpg';


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

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    // Fija el intervalo de 5 segundos
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => 
        (prevSlide + 1) % promoImages.length
      );
    }, 5000); 

    return () => clearInterval(timer);
  }, []); 

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