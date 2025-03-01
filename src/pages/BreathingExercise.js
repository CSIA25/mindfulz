import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLungs, FaPlay, FaPause } from 'react-icons/fa';
import './BreathingExercise.css';

function BreathingExercise() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const durations = { inhale: 4, hold: 7, exhale: 8 };
    const totalDuration = durations[phase];
    let startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTimer(totalDuration - elapsed);

      if (elapsed >= totalDuration) {
        startTime = Date.now();
        setPhase((prev) => (prev === 'inhale' ? 'hold' : prev === 'hold' ? 'exhale' : 'inhale'));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, phase]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
    if (!isRunning) setPhase('inhale'); // Reset to inhale when starting
  };

  const circleVariants = {
    inhale: { scale: 1.5, backgroundColor: '#68d391' },
    hold: { scale: 1.5, backgroundColor: '#2c5282' },
    exhale: { scale: 1, backgroundColor: '#e6f0fa' },
  };

  return (
    <div className="breathing-exercise">
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="breathing-container"
      >
        <h2 className="breathing-title">
          <FaLungs /> Breathing Exercise
        </h2>
        <p className="breathing-instructions">
          Follow the 4-7-8 technique: Inhale for 4s, hold for 7s, exhale for 8s.
        </p>
        <motion.div
          className="breathing-circle"
          animate={phase}
          variants={circleVariants}
          transition={{ duration: isRunning ? (phase === 'inhale' ? 4 : phase === 'hold' ? 7 : 8) : 0.3 }}
        >
          <span className="breathing-text">
            {phase.charAt(0).toUpperCase() + phase.slice(1)} {timer > 0 ? Math.ceil(timer) : ''}
          </span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className="btn btn-primary"
        >
          {isRunning ? <FaPause /> : <FaPlay />} {isRunning ? 'Pause' : 'Start'}
        </motion.button>
      </motion.section>
    </div>
  );
}

export default BreathingExercise;