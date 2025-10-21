import React, { useState } from 'react';
import Navbar from './features/Navbar/Navbar';
import ShoppingCart from './features/ShoppingCart/ShoppingCart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [carrito, setCarrito] = useState([{ id: 1, nombre: 'Jabon', precio: "3.500", unidades : "1" }]); // Ejemplo de carrito con un producto

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <Navbar onCartClick={toggleCart} />
      <ShoppingCart isOpen={isCartOpen} onClose={toggleCart} carrito={carrito} />
    </>
  );
}

export default App;
