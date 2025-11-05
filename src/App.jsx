
import React from 'react';
import '../my-bulma-project.scss'
import Home from './features/home/Home';
import Login from './features/auth/login/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './features/auth/register/Register';
import Layout from './components/Layout';
import Checkout from "./features/ShoppingCart/CheckOut"; 
import CategoryPage from './features/category/CategoryPage';



function App() {
  

  return (
    <Routes>
    
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
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
