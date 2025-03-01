import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './Modal.css';

function Modal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Secure Payment</h3>
        <p>Payment simulation (to be integrated later).</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="btn btn-close"
        >
          <FaTimes className="icon" /> Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;