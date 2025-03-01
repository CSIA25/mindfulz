import React from 'react';
import PropTypes from 'prop-types';
import './PatientList.css';

function PatientList({ patients, deletePatient }) {
  return (
    <div className="patient-list">
      <h3>Manage Patients</h3>
      <ul className="patient-items">
        {patients.length ? (
          patients.map(({ id, name, email }) => (
            <li key={id} className="patient-item">
              <span>{name} ({email})</span>
              <button onClick={() => deletePatient(id)} className="btn-danger">Delete</button>
            </li>
          ))
        ) : (
          <p>No patients registered yet.</p>
        )}
      </ul>
    </div>
  );
}

PatientList.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.object).isRequired,
  deletePatient: PropTypes.func.isRequired,
};

export default PatientList;