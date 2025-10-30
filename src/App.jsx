
import React, { useState } from 'react';
import '../my-bulma-project.scss'
import Home from './features/home/Home';
import Navbar from './features/navbar/Navbar';
import ShoppingCart from './features/ShoppingCart/ShoppingCart';
import { useProducts } from './hooks/useProducts'
import Login from './features/auth/login/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './features/auth/register/Register';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, loading, error } = useProducts();
  const [carrito, setCarrito] = useState([{ id: 1, nombre: 'Jabon', precio: "3.500", unidades : "1" }]); // Ejemplo de carrito con un producto

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <Routes>
    
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />
    
    <Route path="*" element={
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title is-1">Error 404</h1>
          <p className="subtitle is-3">Página No Encontrada</p>
          <a href="/" className="button is-primary">
            Volver al inicio
          </a>
        </div>
      </section>
    } />
  </Routes>
  );
}

export default App;
