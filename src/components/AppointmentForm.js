import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AppointmentForm.css';

function AppointmentForm({ bookAppointment }) {
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.time) {
      setError('Please select both date and time');
      return;
    }
    bookAppointment(formData);
    setFormData({ date: '', time: '' });
    setError('');
  };

  return (
    <div className="appointment-form">
      <h3>Book Appointment</h3>
      {error && <p className="error">{error}</p>}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="input-field"
      />
      <button onClick={handleSubmit} className="btn-primary">Book</button>
    </div>
  );
}

AppointmentForm.propTypes = {
  bookAppointment: PropTypes.func.isRequired,
};

export default AppointmentForm;