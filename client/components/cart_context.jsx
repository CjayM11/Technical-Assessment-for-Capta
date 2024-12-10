import React, { createContext, useState, useContext } from 'react';

const cart_context = createContext();

export const useCart = () => {
  return useContext(cart_context);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      // Recalculate subtotal
      setSubtotal(updatedCart.reduce((total, item) => total + item.price, 0));
      return updatedCart;
    });
  };

  return (
    <cart_context.Provider value={{ cart, addToCart, subtotal }}>
      {children}
    </cart_context.Provider>
  );
};
