import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaHeart, FaUserFriends, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Home.css';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => navigate(user ? '/patient' : '/login');

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="home">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero"
      >
        <h1 className="hero-title">
          <FaBrain /> Welcome to Mindful Minds
        </h1>
        <p className="hero-text">Your sanctuary for stress, anxiety, and depression therapy.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookNow}
          className="btn btn-primary"
        >
          Book Now <FaArrowRight />
        </motion.button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="services"
      >
        <h2>Our Services</h2>
        <div className="services-grid">
          {[
            { icon: FaHeart, title: 'Stress Therapy', desc: 'Find calm with personalized sessions.' },
            { icon: FaUserFriends, title: 'Anxiety Support', desc: 'Ease your mind with expert care.' },
            { icon: FaBrain, title: 'Depression Care', desc: 'Rediscover hope through therapy.' },
          ].map((service, idx) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.2 }}
              className="service-card"
            >
              <service.icon className="service-icon" />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Mindful Minds</h4>
            <p>Your mental wellness partner.</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <p><Link to="/" className="footer-link">Home</Link></p>
            <p><Link to={user ? (user.role === 'admin' ? '/admin' : '/patient') : '/login'} className="footer-link">Dashboard</Link></p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@mindfulminds.com</p>
          </div>
        </div>
        <p className="footer-bottom">© {new Date().getFullYear()} Mindful Minds</p>
      </footer>
    </div>
  );
}

export default Home;