import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ClinicContext } from '../contexts/ClinicContext';
import useAuth from '../hooks/useAuth';
import { FaUsers, FaCalendarAlt, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import PatientCard from '../components/PatientCard';
import './AdminDashboard.css';

function AdminDashboard() {
  const { patients, removePatient, appointments } = useContext(ClinicContext);
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('patients');

  const handleLogout = () => logout();

  return (
    <div className="admin-dashboard">
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="sidebar"
      >
        <div className="sidebar-header">
          <h2>Admin Hub</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveSection('patients')} className={activeSection === 'patients' ? 'active' : ''}>
            <FaUsers /> Patients
          </button>
          <button
            onClick={() => setActiveSection('appointments')}
            className={activeSection === 'appointments' ? 'active' : ''}
          >
            <FaCalendarAlt /> Appointments
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </motion.aside>

      <main className="main-content">
        {activeSection === 'patients' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="patients-section"
          >
            <h3><FaUsers /> Patients</h3>
            <div className="patients-grid">
              {patients.length ? (
                patients.map((patient) => (
                  <PatientCard key={patient.id} {...patient} onDelete={() => removePatient(patient.id)} />
                ))
              ) : (
                <p className="no-data">No patients registered.</p>
              )}
            </div>
          </motion.section>
        )}

        {activeSection === 'appointments' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="appointments-section"
          >
            <h3><FaCalendarAlt /> Appointments</h3>
            <div className="appointments-table">
              {appointments.length ? (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>{apt.date}</td>
                        <td>{apt.time}</td>
                        <td>{patients.find((p) => p.id === apt.patientId)?.name || 'Unknown'}</td>
                        <td className={`status-${apt.status}`}>{apt.status}</td>
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
    </div>
  );
}

export default AdminDashboard;