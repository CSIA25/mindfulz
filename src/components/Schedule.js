import React from 'react';
import PropTypes from 'prop-types';
import './Schedule.css';

function Schedule({ appointments }) {
  return (
    <div className="schedule">
      <h3>Schedule</h3>
      <ul className="schedule-items">
        {appointments.length ? (
          appointments.map(({ id, date, time, status }) => (
            <li key={id} className="schedule-item">
              {date} at {time} - <span className={`status-${status}`}>{status}</span>
            </li>
          ))
        ) : (
          <p>No appointments scheduled.</p>
        )}
      </ul>
    </div>
  );
}

Schedule.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Schedule;