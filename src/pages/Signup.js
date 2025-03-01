import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Added Link to the import
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      setSuccess('Account created successfully! Redirecting to login...');
      setError('');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2s
    } catch (err) {
      setError(err.message || 'Failed to create account. Try again.');
      setSuccess('');
    }
  };

  return (
    <div className="signup">
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="signup-container"
      >
        <h2 className="signup-title">
          <FaUserPlus /> Sign Up
        </h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
          placeholder="Password (min 6 characters)"
          className="input"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          className="btn btn-primary"
          disabled={!credentials.email || credentials.password.length < 6}
        >
          <FaUserPlus /> Create Account
        </motion.button>
        <p className="signup-hint">
          Already have an account? <Link to="/login" className="signup-link">Log in here</Link>
        </p>
      </motion.section>
    </div>
  );
}

export default Signup;