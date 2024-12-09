import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login';  // Import the LoginPage component
import Dashboard from '../pages/dashboard';  // Import the LoginPage component
import Signup from '../pages/signup';  // Import the LoginPage component


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<LoginPage />} /> {/* Default route - Login Page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Home page route */}
          <Route path="/signup" element={<Signup />} /> {/* Register page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
