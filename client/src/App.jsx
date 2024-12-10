import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, CartProvider } from '../context/authContext';
import LoginPage from '../pages/login';
import Dashboard from '../pages/dashboard';
import Signup from '../pages/signup';
import Shop from '../pages/shop';
import Navbar from '../components/navbar';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <div className="app ">
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
