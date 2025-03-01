import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ClinicProvider from './contexts/ClinicContext';
import AuthProvider from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import BreathingExercise from './pages/BreathingExercise';
import Payment from './pages/Payment';
import Signup from './pages/Signup';
import useAuth from './hooks/useAuth';
import './App.css';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <ClinicProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> {}
                <Route path="/patient" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/breathing" element={<ProtectedRoute role="patient"><BreathingExercise /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute role="patient"><Payment /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ClinicProvider>
    </AuthProvider>
  );
}

export default App;
