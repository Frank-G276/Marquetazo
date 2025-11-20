import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../home/ProductCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        if (!response.ok) {
          throw new Error('Error al buscar productos');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <progress className="progress is-large is-primary" max="100">Buscando...</progress>;
  }

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-2">Resultados de búsqueda para: "{query}"</h1>
        <h2 className="subtitle">
          {products.length} productos encontrados
        </h2>

        {products.length === 0 ? (
          <div className="notification is-warning">
            No se encontraron productos que coincidan con tu búsqueda.
          </div>
        ) : (
          <div className="columns is-multiline">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;