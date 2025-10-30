import React, { useState } from "react";
import "../my-bulma-project.scss";
import Home from "./features/home/Home";
import Navbar from "./features/navbar/Navbar";
import ShoppingCart from "./features/ShoppingCart/ShoppingCart";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./features/ShoppingCart/CartContext";
import { Routes, Route } from "react-router-dom"; 
import Checkout from "./features/ShoppingCart/CheckOut"; 
import Login from './features/auth/login/Login';
import Register from './features/auth/register/Register';


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { loading, error } = useProducts();
  const { carrito } = useCart();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <Navbar onCartClick={toggleCart} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={toggleCart}
        carrito={carrito}
      />
      <Home />
      <ShoppingCart isOpen={isCartOpen} onClose={toggleCart} carrito={carrito} />
    
    </>
  );
}

export default App;
