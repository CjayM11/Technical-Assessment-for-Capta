import React, { useState } from 'react';
import { RegisterUser } from '../src/services.js/authService';

const RegisterForm = ({ onRegistrationSuccess, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // State to control visibility of password requirements
  const [hasInteractedWithPassword, setHasInteractedWithPassword] = useState(false); // Track if the user has focused on the password field

  // Password validation checks
  const validatePassword = () => {
          
    const passwordTrimmed = password.trim();
    const confirmPasswordTrimmed = confirmPassword.trim();
         
    const isLengthValid = passwordTrimmed.length >= 6;
    const doPasswordsMatch = passwordTrimmed === confirmPasswordTrimmed;

    setPasswordValid(isLengthValid);
    setPasswordMatch(doPasswordsMatch);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Registesr user
    const registrationResult = await RegisterUser(email, name, password);

    if (registrationResult.success) {
      console.log(`Registration successful`);
      onRegistrationSuccess();
      console.log({ message: 'onLoginSuccess' });
    } else {
      setErrorMessage(registrationResult.message || 'Registration failed');
    }
  };


  return (
    <div className="hero w-screen">
      <div className="hero-content flex items-center justify-center w-full text-center text-neutral-content">
        <div className="card bg-base-100 w-full max-w-md flex-row shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
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
                <span className="label-text">Name & Surname</span>
              </label>
              <input
                type="text"
                placeholder="full name"
                className="input input-bordered"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="create password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword();
                }}
                onFocus={() => {
                  setIsPasswordFocused(true);
                  setHasInteractedWithPassword(true); // Set interaction flag
                  validatePassword();
                }}
                onBlur={() => setIsPasswordFocused(false)} // Hide requirements when focus is lost
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePassword();
                }}
                onFocus={() => validatePassword()}
              />
            </div>

            {/* Password Validation Checklist */}
            {(hasInteractedWithPassword && (isPasswordFocused || !passwordMatch)) && (
              <div className="form-control mt-4">
                <ul className="list-none space-y-2">
                  <li>
                    <span className={`text-${passwordValid ? 'green' : 'red'}-500`}>
                      {passwordValid ? '✓' : '✘'} Password must be at least 6 characters
                    </span>
                  </li>
                  <li>
                    <span className={`text-${passwordMatch ? 'green' : 'red'}-500`}>
                      {passwordMatch ? '✓' : '✘'} Passwords must match
                    </span>
                  </li>
                </ul>
              </div>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!passwordValid || !passwordMatch}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
