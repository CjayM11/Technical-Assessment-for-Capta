import React, { useState } from 'react';
import LoginForm from '../components/form';  // Import the LoginForm component
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle success callback from LoginForm
  const handleLoginSuccess = () => {
    navigate('/dashboard');  // Redirect to the dashboard on successful login
  };

  return (
    <div className="grid grid-cols-1 gap-40 justify-center">
      <div className="mb-20 ml-20 flex justify-center">
        <LoginForm 
          onLoginSuccess={handleLoginSuccess} // Pass the success handler as prop
          setErrorMessage={setErrorMessage}    // Pass error handler to LoginForm
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default LoginPage;
