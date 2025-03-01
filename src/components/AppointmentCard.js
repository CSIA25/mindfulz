import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaTrash, FaMoneyBillWave } from 'react-icons/fa';
import './AppointmentCard.css';

function AppointmentCard({ id, date, time, status, onCancel, onPay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="appointment-card"
    >
      <div className="appointment-info">
        <h4>{date}</h4>
        <p>{time} - <span className={`status-${status}`}>{status}</span></p>
      </div>
      <div className="appointment-actions">
        {status !== 'cancelled' && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className="btn btn-danger"
            >
              <FaTrash className="icon" /> Cancel
            </motion.button>
            {status === 'booked' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPay}
                className="btn btn-primary"
              >
                <FaMoneyBillWave className="icon" /> Pay
              </motion.button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

AppointmentCard.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
};

export default AppointmentCard;