import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth
import useAuth from '../hooks/useAuth';
import './Login.css';

function Login() {
  const { login } = useAuth(); // Custom auth context for admin
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    // Admin hardcoded login
    if (credentials.email === 'admin@mindful.com' && credentials.password === 'admin123') {
      login(credentials.email, credentials.password);
      navigate('/admin');
      return;
    }

    // Patient Firebase login
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      login(credentials.email, credentials.password); // Update auth context
      navigate('/patient');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-container"
      >
        <h2 className="login-title">
          <FaSignInAlt /> Login
        </h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="input"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="btn btn-primary"
        >
          <FaSignInAlt /> Login
        </motion.button>
      </motion.section>
    </div>
  );
}

export default Login;