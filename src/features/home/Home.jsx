import React from 'react';
import HeroCarousel from './HeroCarousel'; 
import ProductCarousel from './ProductCarousel'; 
import { useProducts } from '../../hooks/useProducts';
import { categoryStructure } from '../../data/categoryStructure';


import './Home.scss'; 
import { Link } from 'react-router-dom';

const Home = () => {
  const { products, loading, error } = useProducts();

  const getProductsForCategory = (mainCategoryName) => {
    const category = categoryStructure.find(c => c.name === mainCategoryName);
    if (!category) return [];

    const subcategories = category.subcategories;
    
    return products.filter(product => subcategories.includes(product.category));
  };

  if (loading) {
    return (
      <section className="section is-large">
        <progress className="progress is-large is-primary" max="100">Cargando...</progress>
      </section>
    );
  }

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

  return (
    <div className="home-page">
      
      <HeroCarousel />
      <div className="container">
        
        
        {categoryStructure.map((category) => {
          
          const categoryProducts = getProductsForCategory(category.name);
          
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.name} className="section category-section" id={category.name.toLowerCase()}>
              
              <h2 className="title is-3">{category.name}</h2>
              
              <ProductCarousel products={categoryProducts} />

              <div className="has-text-right">
                <Link 
                  to={`/category/${encodeURIComponent(category.name)}`} 
                  className="button is-primary is-outlined"
                >
                  Ver todo en {category.name}
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Home;