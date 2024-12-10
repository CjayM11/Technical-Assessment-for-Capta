import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const CartContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);


const decodeJwt = (token) => {

  if (!token) {
    console.error('Token is missing');
    return null;
  }

  // Split the token into its parts: [header, payload, signature]
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.error('Invalid token format');
    return null;
  }

  const base64Url = tokenParts[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');  // URL safe base64 decode

  try {
    // Decode the payload
    const decodedPayload = JSON.parse(window.atob(base64));

    // Optionally: Check if the token has expired (if `exp` is available)
    const currentTime = Math.floor(Date.now() / 1000);  // Current timestamp in seconds
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
    console.log("User logged in:", userData); // Log the user data during login
    setUser(userData.user);  // Set the user state with the user object
    sessionStorage.setItem('token', userData.token); // Store the token in sessionStorage
    setToken(userData.token);  // Update the token state
};


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token'); // Remove the token to forget the session
    console.log("User logged out"); // Optionally log out message
  };


  return (
    <AuthContext.Provider value={{ user, login,logout,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = (product) => {
      setCart((prevCart) => [...prevCart, product]); // Update the cart state
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
