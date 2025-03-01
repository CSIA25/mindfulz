import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClinicContext } from '../contexts/ClinicContext';
import { FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import './PaymentPage.css';

function PaymentPage() {
  const { appointmentId } = useParams(); // Get appointment ID from URL
  const { updateAppointmentStatus } = useContext(ClinicContext); // Function to update status
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'processing', 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    setPaymentStatus('processing');
    // Simulate payment processing (replace with actual API call in production)
    setTimeout(() => {
      updateAppointmentStatus(appointmentId, 'PAID'); // Update status in context
      setPaymentStatus('success');
      setTimeout(() => navigate('/patient'), 2000); // Redirect back after 2 seconds
    }, 1000); // Simulate 1-second processing delay
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="payment-page"
    >
      <h2>
        <FaCreditCard className="icon" /> Payment Details
      </h2>
      {paymentStatus === 'success' ? (
        <div className="success-message">
          <FaCheckCircle className="success-icon" />
          <p>Payment Successful!</p>
          <p>Redirecting to dashboard...</p>
        </div>
      ) : (
        <div className="payment-form">
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="input"
            maxLength="16"
          />
          <input
            type="text"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className="input"
            maxLength="5"
          />
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
            placeholder="CVV"
            className="input"
            maxLength="3"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            className="btn btn-primary"
            disabled={paymentStatus === 'processing'}
          >
            <FaCreditCard className="icon" />{' '}
            {paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default PaymentPage;