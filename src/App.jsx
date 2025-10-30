
import React, { useState } from 'react';
import '../my-bulma-project.scss'
import Home from './features/home/Home';
import Navbar from './features/navbar/Navbar';
import ShoppingCart from './features/ShoppingCart/ShoppingCart';
import { useProducts } from './hooks/useProducts'
import Login from './features/auth/login/Login';
import Register from './features/auth/register/Register';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, loading, error } = useProducts();
  const [carrito, setCarrito] = useState([{ id: 1, nombre: 'Jabon', precio: "3.500", unidades : "1" }]); // Ejemplo de carrito con un producto

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
    {/*
      <Navbar onCartClick={toggleCart} />
      <Home />
      <ShoppingCart isOpen={isCartOpen} onClose={toggleCart} carrito={carrito} />
    */}
      <Login />
      <Register />
    </>
  );
}

export default App;
