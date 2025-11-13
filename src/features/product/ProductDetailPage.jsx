// src/features/product/ProductDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.scss';
import { useCart } from "../ShoppingCart/CartContext";

const ProductDetailPage = () => {
    const { addToCart } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // Reiniciamos todo al empezar una nueva búsqueda
      setLoading(true);
      setError(null);
      setProduct(null); // Importante si navegas de un producto a otro
      
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.thumbnail); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); 

  // --- BARRERAS DE RENDERIZADO ---
  // Estas comprobaciones van ANTES de usar el objeto 'product'

  // 1. Si está cargando, muestra la barra de progreso y detente
  if (loading) {
    return <progress className="progress is-large is-primary" max="100">Cargando...</progress>;
  }

  // 2. Si hubo un error, muestra el error y detente
  if (error) {
    return (
      <section className="section">
        <div className="notification is-danger">Error: {error}</div>
      </section>
    );
  }

  // 3. Si no está cargando y no hay error, pero 'product' sigue siendo 'null'
  //    (esto es una seguridad extra), no renderices nada.
  if (!product) {
    return null;
  }
  
  // --- RENDERIZADO SEGURO ---
  // Si el código llega aquí, es 100% seguro que 'product' SÍ tiene datos.
  
  const finalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <section className="section product-detail-page">
      <div className="container">
        <div className="columns">
          
          {/* Columna 1: Galería de Imágenes */}
          <div className="column is-half">
            <figure className="image is-4by3">
              <img src={selectedImage} alt={product.title} />
            </figure>
            
            <div className="columns is-mobile is-multiline mt-4">
              {product.images.slice(0, 5).map((img, index) => (
                <div 
                  className="column is-one-quarter" 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                >
                  <figure className={`image is-1by1 thumbnail-image ${img === selectedImage ? 'is-active' : ''}`}>
                    <img src={img} alt={`${product.title} - vista ${index+1}`} />
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Columna 2: Información y Compra */}
          <div className="column is-half">
            <h1 className="title is-2">{product.title}</h1>
            <h2 className="subtitle is-4 has-text-grey">{product.brand}</h2>
            
            <div className="product-price mb-4">
              <span className="title is-3 has-text-primary">${finalPrice}</span>
              <span className="strikethrough-price ml-3 is-size-5 has-text-grey-light">
                ${product.price.toFixed(2)}
              </span>
              <span className="tag is-danger is-large ml-3">
                {product.discountPercentage.toFixed(0)}% OFF
              </span>
            </div>

            <p className="mb-4">{product.description}</p>
            
            <div className="tags are-medium mb-4">
              <span className="tag is-light">Stock: {product.stock}</span>
              <span className="tag is-light">Rating: {product.rating.toFixed(1)} ★</span>
            </div>

            <button className="button is-primary is-large is-fullwidth" onClick={() => addToCart(product)}>
              <span className="icon"><i className="fas fa-cart-plus"></i></span>
              <span>Añadir al Carrito</span>
            </button>
            
            <div className="content mt-5">
              <ul>
                <li><strong>SKU:</strong> {product.sku}</li>
                <li><strong>Garantía:</strong> {product.warrantyInformation}</li>
                <li><strong>Envío:</strong> {product.shippingInformation}</li>
                <li><strong>Devolución:</strong> {product.returnPolicy}</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;