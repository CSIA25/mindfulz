import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaUserShield, FaSignOutAlt, FaCaretDown, FaLungs, FaCreditCard, FaUserPlus } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="navbar"
    >
      <Link to="/" className="navbar-title">
        <motion.span whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          Mindful Minds
        </motion.span>
      </Link>
      <ul className="navbar-links">
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="navbar-link">
            <FaHome /> Home
          </Link>
        </motion.li>
        {user ? (
          <li className="navbar-user">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDropdown}
              className="navbar-user-btn"
            >
              {user.role === 'admin' ? <FaUserShield /> : <FaUser />}
              {user.email.split('@')[0]} <FaCaretDown className={isDropdownOpen ? 'rotate' : ''} />
            </motion.button>
            <motion.ul
              className="navbar-dropdown"
              initial="hidden"
              animate={isDropdownOpen ? 'visible' : 'hidden'}
              variants={dropdownVariants}
              transition={{ duration: 0.2 }}
            >
              <motion.li whileHover={{ backgroundColor: 'rgba(104, 211, 145, 0.2)' }}>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/patient'}
                  className="navbar-dropdown-link"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {user.role === 'admin' ? 'Admin Dashboard' : 'Patient Dashboard'}
                </Link>
              </motion.li>
              {user.role === 'patient' && (
                <>
                  <motion.li whileHover={{ backgroundColor: 'rgba(104, 211, 145, 0.2)' }}>
                    <Link
                      to="/breathing"
                      className="navbar-dropdown-link"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaLungs /> Breathing Exercise
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ backgroundColor: 'rgba(104, 211, 145, 0.2)' }}>
                    <Link
                      to="/payment"
                      className="navbar-dropdown-link"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaCreditCard /> Payment
                    </Link>
                  </motion.li>
                </>
              )}
              <motion.li whileHover={{ backgroundColor: 'rgba(229, 62, 62, 0.2)' }}>
                <button onClick={handleLogout} className="navbar-dropdown-btn">
                  <FaSignOutAlt /> Logout
                </button>
              </motion.li>
            </motion.ul>
          </li>
        ) : (
          <>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="navbar-link">
                <FaUser /> Login
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup" className="navbar-link">
                <FaUserPlus /> Sign Up
              </Link>
            </motion.li>
          </>
        )}
      </ul>
    </motion.nav>
  );
}

export default Navbar;