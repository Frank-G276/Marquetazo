// src/features/home/ProductCarousel.jsx

import React from 'react';
import ProductCard from './ProductCard'; // Reutilizamos tu componente de tarjeta
import './ProductCarousel.scss'; // Aquí crearemos los efectos

const ProductCarousel = ({ products }) => {
  if (!products || products.length === 0) {
    return null; // No mostrar nada si no hay productos
  }

  return (
    // El 'container' es para los efectos de difuminado en los bordes
    <div className="carousel-container">
      {/* El 'track' es el que tiene el scroll y el snap */}
      <div className="carousel-track">
        {products.map(product => (
          // Usamos tu ProductCard existente. 
          // ¡Sus clases de 'column' (is-one-quarter, etc.) 
          // funcionarán perfecto aquí!
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;