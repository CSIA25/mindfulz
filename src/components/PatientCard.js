import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import './PatientCard.css';

function PatientCard({ id, name, email, createdAt, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="patient-card"
    >
      <div className="patient-info">
        <h4>{name}</h4>
        <p>{email}</p>
        <p className="created-at">Joined: {new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onDelete}
        className="btn btn-danger"
      >
        <FaTrash />
      </motion.button>
    </motion.div>
  );
}

export default PatientCard;