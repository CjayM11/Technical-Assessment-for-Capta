import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const CartContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);

//get user info from token 
const decodeJwt = (token) => {

  if (!token) {
    console.error('Token is missing');
    return null;
  }

  // Split token :  [header, payload, signature]
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.error('Invalid token format');
    return null;
  }

  const base64Url = tokenParts[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  try {
    const decodedPayload = JSON.parse(window.atob(base64));

    // Check expiration 
    const currentTime = Math.floor(Date.now() / 1000);  // in seconds
    if (decodedPayload.exp && decodedPayload.exp < currentTime) {
      console.error('Token has expired');
      return null;
    }

    return decodedPayload;
  } catch (e) {
    console.error('Error decoding token', e);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const decodedUser = decodeJwt(token);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
  }, [token]);

  const login = (userData) => {
    console.log("User logged in:", userData);
    setUser(userData.user);
    sessionStorage.setItem('token', userData.token);
    setToken(userData.token);
  };


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    console.log("User logged out");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// didnt work out TODO : remove later
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
