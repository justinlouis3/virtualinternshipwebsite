import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    const userName = email.split('@')[0];
    onLogin(userName);
  };

  const handleGuestLogin = () => {
    // Add your guest login logic here
    onLogin('Guest');
  };

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>
        <h2 className="modal__title">Login to Summarist</h2>
        <form className="login__form" onSubmit={handleLogin}>
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
          <button type="submit" className="btn modal__btn">Login</button>
        </form>
        <div className="modal__divider">
          <span>OR</span>
        </div>
        <button className="btn guest__btn" onClick={handleGuestLogin}>
          Login as Guest
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
