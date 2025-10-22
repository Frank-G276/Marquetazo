import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue exitosa');
        }
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  return { products, loading, error };
}