import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import './Payment.css';

function Payment() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = () => {
    // Simulate payment processing
    setTimeout(() => {
      setIsVerified(true);
    }, 1500); // 1.5s delay for "processing"
  };

  const handleReset = () => {
    setCardDetails({ cardNumber: '', expiry: '', cvv: '', name: '' });
    setIsVerified(false);
  };

  return (
    <div className="payment">
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="payment-container"
      >
        {isVerified ? (
          <div className="payment-verified">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="verified-icon"
            >
              <FaCheckCircle />
            </motion.div>
            <h2 className="payment-title">Payment Verified</h2>
            <p className="payment-message">Your payment has been successfully processed.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="btn btn-primary"
            >
              Back to Dashboard
            </motion.button>
          </div>
        ) : (
          <>
            <h2 className="payment-title">
              <FaCreditCard /> Payment Details
            </h2>
            <div className="payment-form">
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                placeholder="Card Number (e.g., 1234 5678 9012 3456)"
                className="input"
                maxLength="19"
              />
              <div className="payment-row">
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleChange}
                  placeholder="Expiry (MM/YY)"
                  className="input"
                  maxLength="5"
                />
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleChange}
                  placeholder="CVV (e.g., 123)"
                  className="input"
                  maxLength="3"
                />
              </div>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleChange}
                placeholder="Name on Card"
                className="input"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePay}
                className="btn btn-primary"
                disabled={!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name}
              >
                <FaCreditCard /> Pay Now
              </motion.button>
            </div>
          </>
        )}
      </motion.section>
    </div>
  );
}

export default Payment;