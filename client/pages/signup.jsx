import React, { useState } from 'react';
import RegisterForm from '../components/register_form';  // Import the LoginForm component
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    console.log({message:"hande reg successs - trying to nav"});
    navigate('/');  // Redirect to the dashboard on successful registration
  };
  
//TODO: not navigating to dash after login 
  return (
    <div className="grid grid-cols-1 gap-40 justify-center">
      <div className="mb-20 ml-20 flex justify-center">
        <RegisterForm
          onRegistrationSuccess={handleRegistrationSuccess} // Pass the success handler as prop
          setErrorMessage={setErrorMessage}    // Pass error handler to LoginForm
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default SignUpPage;
