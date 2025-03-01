import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const ClinicContext = createContext();

const ClinicProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const getAvailableSlots = useCallback((date) => {
    const bookedTimes = appointments.filter((a) => a.date === date).map((a) => a.time);
    const allSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);
    return allSlots.filter((slot) => !bookedTimes.includes(slot));
  }, [appointments]);

  const addPatientAndBook = useCallback(({ name, email, date, time }) => {
    if (!name || !email || !date || !time) {
      setError('All fields are required');
      return null;
    }
    const selectedDateTime = new Date(`${date}T${time}`);
    if (isNaN(selectedDateTime.getTime())) {
      setError('Invalid date or time');
      return null;
    }
    if (appointments.some((a) => a.date === date && a.time === time)) {
      setError('Time slot already booked');
      return null;
    }
    const patientId = crypto.randomUUID();
    const newPatient = { id: patientId, name, email, createdAt: new Date().toISOString() };
    const newAppointment = { id: crypto.randomUUID(), patientId, date, time, status: 'booked' };
    setPatients((prev) => [...prev, newPatient]);
    setAppointments((prev) => [...prev, newAppointment]);
    setError(null);
    return { patient: newPatient, appointment: newAppointment };
  }, [appointments]);

  const updatePatient = useCallback((id, updates) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const removePatient = useCallback((id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    setAppointments((prev) => prev.filter((a) => a.patientId !== id));
  }, []);

  const bulkRemovePatients = useCallback((ids) => {
    setPatients((prev) => prev.filter((p) => !ids.includes(p.id)));
    setAppointments((prev) => prev.filter((a) => !ids.includes(a.patientId)));
  }, []);

  const cancelAppointment = useCallback((id) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
  }, []);

  const rescheduleAppointment = useCallback((id, newDate, newTime) => {
    if (appointments.some((a) => a.date === newDate && a.time === newTime && a.id !== id)) {
      setError('New time slot already booked');
      return false;
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime, status: 'booked' } : a))
    );
    setError(null);
    return true;
  }, [appointments]);

  const value = {
    patients,
    appointments,
    error,
    getAvailableSlots,
    addPatientAndBook,
    updatePatient,
    removePatient,
    bulkRemovePatients,
    cancelAppointment,
    rescheduleAppointment,
    setError,
  };

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
};

ClinicProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClinicProvider;