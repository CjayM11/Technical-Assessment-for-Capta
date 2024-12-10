import React, { useState } from 'react';
import { loginUser } from '../src/services.js/authService';
import { useAuth } from '../context/authContext';
const LoginForm = ({ onLoginSuccess, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {

    e.preventDefault(); // Prevent form from refreshing the page

    // Send login request to backend
    const result = await loginUser(email, password);

    if (result.success) {
      onLoginSuccess(); // Notify parent component of successful login
      login({ user: result.user, token: result.token });
    } else {
      setErrorMessage(result.message || 'Login failed'); // Handle error
    }
  };

  return (
    <div className="hero w-screen">
      <div className="hero-content flex items-center justify-center w-full text-center text-neutral-content">
        <div className="card bg-base-100 w-full max-w-5xl flex-row shadow-2xl">
          <div className="w-1/2 p-6">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">Login</button>
              </div>
            </form>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="w-1/2 p-6 flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-4">Start Shopping!</h1>
            <p className="text-lg mb-6">Don't have an account yet? No problem, register now.</p>
            <button className="btn btn-accent w-full mb-4">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
