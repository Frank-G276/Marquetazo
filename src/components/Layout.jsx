
import React, { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom'; 
import Navbar from '../features/navbar/Navbar';
import ShoppingCart from '../features/ShoppingCart/ShoppingCart';
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../features/ShoppingCart/CartContext'
import Footer from '../features/footer/Footer';



const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { loading, error } = useProducts();
  const { carrito } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 0) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }; 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.add('has-navbar-fixed-top');
    return () => {
      document.body.classList.remove('has-navbar-fixed-top');
    };
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="has-navbar-fixed-top">
      <Navbar onCartClick={toggleCart}/>
      <main >
        <Outlet />
      </main>
      <Footer />
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={toggleCart}
        carrito={carrito}
      />
      
    </div>
  );
};

export default Layout;