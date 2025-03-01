import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, email, role: 'admin' | 'patient' }
  const [error, setError] = useState(null);

  const login = useCallback((email, password) => {
    // Hardcoded admin login
    if (email === 'admin@mindful.com' && password === 'admin123') {
      setUser({ id: 'admin1', email, role: 'admin' });
      setError(null);
      return true;
    }
    // Firebase patient login will set user elsewhere, just return true if successful
    setUser({ id: email, email, role: 'patient' }); // Simplified for Firebase
    setError(null);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = { user, error, login, logout, setError };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;