import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    if (users[email]) {
      // Check password
      if (users[email].password === password) {
        const userName = users[email].name || email.split('@')[0];
        const subscription = users[email].subscription || 'free';
        onLogin(email, userName, subscription);
        resetForm();
      } else {
        setError('Invalid password');
      }
    } else {
      setError('No account found with this email. Please register first.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    // Check if user already exists
    if (users[email]) {
      setError('An account with this email already exists');
      return;
    }

    // Register new user with free subscription
    const userName = email.split('@')[0];
    users[email] = {
      password: password,
      name: userName,
      subscription: 'free',
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // Automatically log in the new user
    onLogin(email, userName, 'free');
    resetForm();
  };

  const handleGuestLogin = () => {
    const guestEmail = `guest_${Date.now()}@example.com`;
    onLogin(guestEmail, 'Guest', 'free');
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setIsRegistering(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="modal__overlay" onClick={handleClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={handleClose}>×</button>
        <h2 className="modal__title">
          {isRegistering ? 'Register for Summarist' : 'Login to Summarist'}
        </h2>
        
        {error && <div className="modal__error">{error}</div>}
        
        <form className="login__form" onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {isRegistering && (
            <div className="form__group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit" className="btn modal__btn">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        
        <div className="modal__switch">
          {isRegistering ? (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                className="modal__switch-btn"
                onClick={() => {
                  setIsRegistering(false);
                  setError('');
                }}
              >
                Login here
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="modal__switch-btn"
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                }}
              >
                Register here
              </button>
            </p>
          )}
        </div>
        
        {!isRegistering && (
          <>
            <div className="modal__divider">
              <span>OR</span>
            </div>
            <button className="btn guest__btn" onClick={handleGuestLogin}>
              Login as Guest
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
