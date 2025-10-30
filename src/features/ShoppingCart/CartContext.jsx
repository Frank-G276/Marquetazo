import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (product) => {
    setCarrito(prevCarrito => {
      const exists = prevCarrito.find(item => item.id === product.id);

      if (exists) {
        return prevCarrito.map(item =>
          item.id === product.id
            ? { ...item, unidades: item.unidades + 1 }
            : item
        );
      }

      return [...prevCarrito, { ...product, unidades: 1 }];
    });
  };

    const addProduct = (product) => {
      setCarrito(prevCarrito => {
        const exists = prevCarrito.find(item => item.id === product.id);

        if (exists) {
          return prevCarrito.map(item =>
            item.id === product.id
              ? { ...item, unidades: item.unidades + 1 }
              : item
          );
        }

        return [...prevCarrito, { ...product, unidades: 1 }];
      });
    };

    const reduceToCart = (product) => {
      setCarrito(prevCarrito => {
        const exists = prevCarrito.find(item => item.id === product.id);
        if (exists.unidades === 1) {
          return prevCarrito.filter(item => item.id !== product.id);
        }
        return prevCarrito.map(item =>
          item.id === product.id
            ? { ...item, unidades: item.unidades - 1 }
            : item
        );
      });
    };

    const deleteFromCart = (product) => {
      setCarrito(prevCarrito =>
        prevCarrito.filter(item => item.id !== product.id)
      );
    };

    

    return (
    <CartContext.Provider value={{ carrito, addToCart, reduceToCart, addProduct, deleteFromCart }}>
      {children}
    </CartContext.Provider>
    );
}

// ✅ Hook para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);
