import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClinicContext } from '../contexts/ClinicContext';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  FaUserEdit,
  FaCalendarPlus,
  FaMoneyBillWave,
  FaStickyNote,
  FaSave,
  FaTrash,
  FaSignOutAlt,
  FaSort,
} from 'react-icons/fa';
import Modal from '../components/Modal';
import './PatientDashboard.css';

function PatientDashboard() {
  const { appointments, addPatientAndBook, cancelAppointment, getAvailableSlots } = useContext(ClinicContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Add navigate hook
  const [formData, setFormData] = useState({ name: user.email.split('@')[0], email: user.email, date: '', time: '' });
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState('dateAsc');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [notes, setNotes] = useState(localStorage.getItem('patientNotes') || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeSection, setActiveSection] = useState('appointments');

  useEffect(() => {
    if (formData.date) setAvailableSlots(getAvailableSlots(formData.date));
    const interval = setInterval(() => localStorage.setItem('patientNotes', notes), 5000); // Autosave every 5s
    return () => clearInterval(interval);
  }, [formData.date, getAvailableSlots, notes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    addPatientAndBook(formData);
    setFormData({ ...formData, date: '', time: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home on logout
  };

  const handlePay = () => {
    navigate('/payment'); // Redirect to payment page
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortOrder === 'dateAsc') return new Date(a.date) - new Date(b.date);
    if (sortOrder === 'dateDesc') return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const unpaidCount = sortedAppointments.filter((apt) => apt.status === 'booked').length;
  const totalCount = sortedAppointments.length;

  return (
    <div className="patient-dashboard">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="sidebar"
      >
        <div className="sidebar-header">
          <h2>Mindful Minds</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveSection('profile')} className={activeSection === 'profile' ? 'active' : ''}>
            <FaUserEdit /> Profile
          </button>
          <button onClick={() => setActiveSection('booking')} className={activeSection === 'booking' ? 'active' : ''}>
            <FaCalendarPlus /> Book
          </button>
          <button onClick={() => setActiveSection('payments')} className={activeSection === 'payments' ? 'active' : ''}>
            <FaMoneyBillWave /> Payments
          </button>
          <button
            onClick={() => setActiveSection('appointments')}
            className={activeSection === 'appointments' ? 'active' : ''}
          >
            <FaStickyNote /> Appointments
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Profile Section */}
        {activeSection === 'profile' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="profile-section"
          >
            <div className="profile-header">
              <div className="avatar">{formData.name.charAt(0).toUpperCase()}</div>
              <h3>Profile</h3>
            </div>
            {isEditingProfile ? (
              <div className="profile-edit">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsEditingProfile(false)}
                  className="btn btn-primary"
                >
                  <FaSave /> Save
                </motion.button>
              </div>
            ) : (
              <div className="profile-details">
                <p><span>Name:</span> {formData.name}</p>
                <p><span>Email:</span> {user.email}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsEditingProfile(true)}
                  className="btn btn-edit"
                >
                  <FaUserEdit /> Edit
                </motion.button>
              </div>
            )}
          </motion.section>
        )}

        {/* Booking Section */}
        {activeSection === 'booking' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="booking-section"
          >
            <h3><FaCalendarPlus /> Book a Session</h3>
            <div className="booking-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="input"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="input"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input"
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="input"
                disabled={!formData.date}
              >
                <option value="">Select Time</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                <FaCalendarPlus /> Book Now
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* Payments Section */}
        {activeSection === 'payments' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="payments-section"
          >
            <h3><FaMoneyBillWave /> Payments</h3>
            <div className="payment-stats">
              <p>Unpaid: {unpaidCount}</p>
              <p>Total: {totalCount}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(unpaidCount / totalCount || 0) * 100}%` }}
                />
              </div>
            </div>
            {unpaidCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handlePay} // Redirect to payment page
                className="btn btn-primary"
              >
                <FaMoneyBillWave /> Pay All
              </motion.button>
            )}
          </motion.section>
        )}

        {/* Appointments Section */}
        {activeSection === 'appointments' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="appointments-section"
          >
            <h3><FaStickyNote /> Appointments</h3>
            <div className="controls">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="dateAsc">Date ↑</option>
                <option value="dateDesc">Date ↓</option>
              </select>
            </div>
            <div className="appointments-table">
              {sortedAppointments.length ? (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>{apt.date}</td>
                        <td>{apt.time}</td>
                        <td className={`status-${apt.status}`}>{apt.status}</td>
                        <td>
                          {apt.status !== 'cancelled' && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => cancelAppointment(apt.id)}
                                className="btn btn-danger"
                              >
                                <FaTrash />
                              </motion.button>
                              {apt.status === 'booked' && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  onClick={handlePay} // Redirect to payment page
                                  className="btn btn-primary"
                                >
                                  <FaMoneyBillWave />
                                </motion.button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-data">No appointments scheduled.</p>
              )}
            </div>
          </motion.section>
        )}
      </main>

      {/* Floating Notes Widget */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="notes-widget"
      >
        <h4><FaStickyNote /> Notes</h4>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Your thoughts..."
          className="notes-input"
        />
      </motion.div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default PatientDashboard;