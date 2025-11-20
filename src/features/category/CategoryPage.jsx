import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { categoryStructure } from '../../data/categoryStructure'; 
import ProductCard from '../home/ProductCard'; 
import './CategoryPage.scss';

const CategoryPage = () => {
  const { categoryName } = useParams(); 
  const decodedCategoryName = decodeURIComponent(categoryName);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      setError(null);
      setProducts([]); 

      const category = categoryStructure.find(c => c.name === decodedCategoryName);

      if (!category) {
        setError('Categoría no encontrada.');
        setLoading(false);
        return;
      }

      try {
        const promises = category.subcategories.map(subcategory =>
          fetch(`https://dummyjson.com/products/category/${subcategory}`).then(res => res.json())
        );
        
        const results = await Promise.all(promises);

        const allProducts = results.flatMap(data => data.products);
        
        setProducts(allProducts);

      } catch (e) {
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [decodedCategoryName]);

  if (loading) {
    return <progress className="progress is-large is-primary" max="100">Cargando...</progress>;
  }

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-2">{decodedCategoryName}</h1>
        <h2 className="subtitle">
          {products.length} productos encontrados
        </h2>

        <div className="columns is-multiline">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;