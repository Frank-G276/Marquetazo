import React from 'react';

// --- Importaciones de Componentes ---
import HeroCarousel from './HeroCarousel'; // El carrusel principal de promociones
import ProductCarousel from './ProductCarousel'; // El carrusel de productos por categoría

// --- Importaciones de Lógica y Datos ---
import { useProducts } from '../../hooks/useProducts';
import { categoryStructure } from '../../data/categoryStructure';

// --- Importación de Estilos ---
import './Home.scss'; 

const Home = () => {
  // 1. Llamamos al hook para obtener los datos
  const { products, loading, error } = useProducts();

  // 2. Función para filtrar productos según nuestra estructura de categorías
  const getProductsForCategory = (mainCategoryName) => {
    // Encuentra la categoría en nuestra estructura local
    const category = categoryStructure.find(c => c.name === mainCategoryName);
    if (!category) return []; // Si no la encuentra, devuelve array vacío
    
    // Obtiene la lista de subcategorías (ej: ['laptops', 'smartphones'])
    const subcategories = category.subcategories;
    
    // Filtra la lista total de productos de la API
    return products.filter(product => subcategories.includes(product.category));
  };

  // 3. Manejo de estado: Cargando (Loading)
  if (loading) {
    return (
      <section className="section is-large">
        <progress className="progress is-large is-primary" max="100">Cargando...</progress>
      </section>
    );
  }

  // 4. Manejo de estado: Error
  if (error) {
    return (
      <section className="section">
        <div className="container">
          <div className="notification is-danger">
            <h2 className="title is-4">¡Oh no! Hubo un error</h2>
            <p>No pudimos cargar los productos. Por favor, intenta de nuevo más tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  // 5. Estado exitoso: Mostrar la página completa
  return (
    <div className="home-page">
      
      {/* --- CARRUSEL PRINCIPAL DE PROMOCIONES --- */}
      <HeroCarousel />

      {/* --- SECCIONES DE PRODUCTOS POR CATEGORÍA --- */}
      <div className="container">
        
        {/* Mapeamos NUESTRA estructura de categorías */}
        {categoryStructure.map((category) => {
          
          // Obtenemos los productos filtrados para esta sección específica
          const categoryProducts = getProductsForCategory(category.name);
          
          // Si no hay productos de esa categoría en la API, no mostramos la sección
          if (categoryProducts.length === 0) return null;

          // Renderizamos la sección
          return (
            <section key={category.name} className="section category-section" id={category.name.toLowerCase()}>
              
              {/* Título de la sección */}
              <h2 className="title is-3">{category.name}</h2>
              
              {/* Carrusel de productos para esta categoría */}
              <ProductCarousel products={categoryProducts} />

              {/* Botón para "Ver todo" */}
              <div className="has-text-right">
                <a href={`/category/${category.name}`} className="button is-primary is-outlined">
                  Ver todo en {category.name}
                </a>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Home;