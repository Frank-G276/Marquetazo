// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const loadCartForCurrentUser = useCallback(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.email) {
      const cartKey = `cart_${currentUser.email}`;
      const saved = localStorage.getItem(cartKey);
      setCarrito(saved ? JSON.parse(saved).items : []);
    } else {
      setCarrito([]);
    }
  }, []);

  // cargar al montar
  useEffect(() => {
    loadCartForCurrentUser();
  }, [loadCartForCurrentUser]);

  // escuchar evento personalizado para recargar cuando cambie el usuario en la misma pestaña
  useEffect(() => {
    const handler = () => loadCartForCurrentUser();
    window.addEventListener('userChanged', handler);
    return () => window.removeEventListener('userChanged', handler);
  }, [loadCartForCurrentUser]);

  // guardar cada vez que cambie carrito
  useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser?.email) return;  // Si no hay usuario, no se guarda
  if (carrito.length === 0) return; // Evita sobreescribir con [] al cerrar sesión

  const cartKey = `cart_${currentUser.email}`;
  const payload = { email: currentUser.email, items: carrito };
  localStorage.setItem(cartKey, JSON.stringify(payload));
  }, [carrito]);

  const addToCart = (product) => {
    setCarrito(prev => {
      const exists = prev.find(i => i.id === product.id);
      const updated = exists
        ? prev.map(i => i.id === product.id ? { ...i, unidades: i.unidades + 1 } : i)
        : [...prev, { ...product, unidades: 1 }];
      return updated;
    });
  };

  const reduceToCart = (product) => {
    setCarrito(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (!exists) return prev;
      if (exists.unidades === 1) return prev.filter(i => i.id !== product.id);
      return prev.map(i => i.id === product.id ? { ...i, unidades: i.unidades - 1 } : i);
    });
  };

  const deleteFromCart = (product) => {
    setCarrito(prev => prev.filter(i => i.id !== product.id));
  };

  const clearCart = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, addToCart, reduceToCart, deleteFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
