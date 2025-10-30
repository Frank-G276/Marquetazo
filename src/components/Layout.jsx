// src/components/Layout.jsx

import React, { useState } from 'react';

import { Outlet } from 'react-router-dom'; 
import Navbar from '../features/navbar/Navbar';
import ShoppingCart from '../features/ShoppingCart/ShoppingCart';
import { useProducts } from '../hooks/useProducts'



const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, loading, error } = useProducts();
  const [carrito, setCarrito] = useState([{ id: 1, nombre: 'Jabon', precio: "3.500", unidades : "1" }]); // Ejemplo de carrito con un producto

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  return (
    <div>
      <Navbar onCartClick={toggleCart}/>
      <main>
        <Outlet />
      </main>
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={toggleCart}
        carrito={carrito}
      />
      
    </div>
  );
};

export default Layout;