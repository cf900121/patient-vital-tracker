// src/App.jsx

import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables for user inputs
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [temperature, setTemperature] = useState('');
  const [message, setMessage] = useState('');
  const [healthStatus, setHealthStatus] = useState('');

  // Function to validate inputs
  const validateInputs = () => {
    if (heartRate < 40 || heartRate > 180) {
      setMessage('Heart rate must be between 40 and 180 bpm.');
      return false;
    }
    if (systolic < 90 || systolic > 200) {
      setMessage('Systolic BP must be between 90 and 200 mmHg.');
      return false;
    }
    if (diastolic < 60 || diastolic > 120) {
      setMessage('Diastolic BP must be between 60 and 120 mmHg.');
      return false;
    }
    if (temperature < 95 || temperature > 104) {
      setMessage('Temperature must be between 95 and 104 °F.');
      return false;
    }
    return true;
  };

  // Function to evaluate health status based on the inputs
  const evaluateHealth = () => {
    let bpStatus = 'Normal';
    if (systolic > 130 || diastolic > 80) {
      bpStatus = 'High Blood Pressure (Hypertension)';
    }
    let heartRateStatus = heartRate > 100 ? 'High Heart Rate' : 'Normal Heart Rate';
    let temperatureStatus = temperature > 98.6 ? 'Fever' : 'Normal Temperature';

    setHealthStatus(`${bpStatus}, ${heartRateStatus}, ${temperatureStatus}`);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (validateInputs()) {
      evaluateHealth();
    }
  };

  // Handle reset
  const handleReset = () => {
    setHeartRate('');
    setSystolic('');
    setDiastolic('');
    setTemperature('');
    setMessage('');
    setHealthStatus('');
  };

  return (
    <div className="app">
      <h1>Patient Vital Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Heart Rate (bpm):</label>
          <input
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="Enter heart rate between 40 and 180"
          />
        </div>
        <div className="input-group">
          <label>Systolic BP (mmHg):</label>
          <input
            type="number"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            placeholder="Enter systolic BP between 90 and 200"
          />
        </div>
        <div className="input-group">
          <label>Diastolic BP (mmHg):</label>
          <input
            type="number"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            placeholder="Enter diastolic BP between 60 and 120"
          />
        </div>
        <div className="input-group">
          <label>Temperature (°F):</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Enter temperature between 95 and 104"
          />
        </div>
        {message && <p className="error-message">{message}</p>}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>

      {healthStatus && (
        <div className="health-status">
          <h2>Health Status:</h2>
          <p>{healthStatus}</p>
        </div>
      )}
    </div>
  );
}

export default App;
