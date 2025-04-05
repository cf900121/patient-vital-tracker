import { useState } from 'react';

function App() {
  const [patientVitals, setPatientVitals] = useState({
    heartRate: '',
    bloodPressure: '',
    temperature: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setPatientVitals({
      ...patientVitals,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Patient Vital Tracker</h1>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="heartRate" className="block text-sm font-medium">Heart Rate (bpm):</label>
            <input
              type="number"
              id="heartRate"
              name="heartRate"
              value={patientVitals.heartRate}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="bloodPressure" className="block text-sm font-medium">Blood Pressure (mmHg):</label>
            <input
              type="text"
              id="bloodPressure"
              name="bloodPressure"
              value={patientVitals.bloodPressure}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="temperature" className="block text-sm font-medium">Temperature (°F):</label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={patientVitals.temperature}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded w-full">
            Submit
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>Heart Rate:</strong> {patientVitals.heartRate} bpm</p>
          <p><strong>Blood Pressure:</strong> {patientVitals.bloodPressure} mmHg</p>
          <p><strong>Temperature:</strong> {patientVitals.temperature} °F</p>
        </div>
      )}
    </div>
  );
}

export default App;
