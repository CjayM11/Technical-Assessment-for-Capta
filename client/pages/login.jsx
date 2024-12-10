import React, { useState } from 'react';
import LoginForm from '../components/form';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');  
  };

  return (
    <div className="grid grid-cols-1 gap-40 justify-center">
      <div className="mb-20 ml-20 flex justify-center">
        <LoginForm
          onLoginSuccess={handleLoginSuccess} 
          setErrorMessage={setErrorMessage}    
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default LoginPage;
