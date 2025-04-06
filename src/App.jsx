import React, { useState } from 'react';
import './App.css';

const normalRanges = {
  temperature: { min: 97.8, max: 99.1 },
  heartRate: { min: 60, max: 100 },
  oxygenSaturation: { min: 95, max: 100 },
  bloodPressure: { min: 90, max: 120 }, // General range for systolic BP
};

const App = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    heartRate: '',
    oxygenSaturation: '',
    bloodPressure: '',
  });

  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...formData,
      timestamp: new Date().toLocaleString(),
    };
    setRecords([newRecord, ...records]);
    setFormData({
      temperature: '',
      heartRate: '',
      oxygenSaturation: '',
      bloodPressure: '',
    });
  };

  const isOutOfRange = (value, type) => {
    const range = normalRanges[type];
    if (type === 'bloodPressure') {
      return value < range.min || value > range.max;
    }
    return value < range.min || value > range.max;
  };

  return (
    <div className="container">
      <h1>Patient Vital Tracker</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Temperature (°F)</label>
        <input
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
        />

        <label>Heart Rate (bpm)</label>
        <input
          type="number"
          name="heartRate"
          value={formData.heartRate}
          onChange={handleChange}
        />

        <label>Oxygen Saturation (%)</label>
        <input
          type="number"
          name="oxygenSaturation"
          value={formData.oxygenSaturation}
          onChange={handleChange}
        />

        <label>Blood Pressure (Systolic/Diastolic)</label>
        <input
          type="text"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
        />

        <button type="submit">Add Vital</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°F)</th>
            <th>Heart Rate (bpm)</th>
            <th>Oxygen Saturation (%)</th>
            <th>Blood Pressure (S/D)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            const [systolic, diastolic] = record.bloodPressure.split('/');
            return (
              <tr key={index}>
                <td>{record.timestamp}</td>
                <td
                  className={isOutOfRange(record.temperature, 'temperature') ? 'out-of-range' : ''}
                >
                  {record.temperature}
                </td>
                <td
                  className={isOutOfRange(record.heartRate, 'heartRate') ? 'out-of-range' : ''}
                >
                  {record.heartRate}
                </td>
                <td
                  className={isOutOfRange(record.oxygenSaturation, 'oxygenSaturation') ? 'out-of-range' : ''}
                >
                  {record.oxygenSaturation}
                </td>
                <td
                  className={isOutOfRange(systolic, 'bloodPressure') ? 'out-of-range' : ''}
                >
                  {record.bloodPressure}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
