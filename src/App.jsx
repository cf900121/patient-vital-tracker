// src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  // State variables for user inputs and stored data
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [temperature, setTemperature] = useState('');
  const [message, setMessage] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [dataHistory, setDataHistory] = useState({
    heartRate: [],
    systolic: [],
    diastolic: [],
    temperature: [],
    timestamps: []
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('patientData');
    if (storedData) {
      setDataHistory(JSON.parse(storedData));
    }
  }, []);

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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (validateInputs()) {
      // Add the new data to the history
      const newData = {
        heartRate: [...dataHistory.heartRate, heartRate],
        systolic: [...dataHistory.systolic, systolic],
        diastolic: [...dataHistory.diastolic, diastolic],
        temperature: [...dataHistory.temperature, temperature],
        timestamps: [...dataHistory.timestamps, new Date().toLocaleString()]
      };

      // Update state and save to local storage
      setDataHistory(newData);
      localStorage.setItem('patientData', JSON.stringify(newData));

      evaluateHealth();
    }
  };

  // Function to handle reset
  const handleReset = () => {
    setHeartRate('');
    setSystolic('');
    setDiastolic('');
    setTemperature('');
    setMessage('');
    setHealthStatus('');
  };

  // Chart data preparation
  const chartData = {
    labels: dataHistory.timestamps,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: dataHistory.heartRate,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Systolic BP (mmHg)',
        data: dataHistory.systolic,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Diastolic BP (mmHg)',
        data: dataHistory.diastolic,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Temperature (°F)',
        data: dataHistory.temperature,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        tension: 0.1
      }
    ]
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

      {/* Chart to visualize the data */}
      {dataHistory.timestamps.length > 0 && (
        <div className="chart-container">
          <h2>Vitals Over Time</h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;
