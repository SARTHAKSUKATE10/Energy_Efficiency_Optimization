import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChartBar, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './Sector.css';

const SectorCard = ({ label, value, unit = '' }) => (
  <div className="sector-card">
    <div className="sector-card-label">{label}</div>
    <div className="sector-card-value">
      {value} {unit}
    </div>
  </div>
);

const Sector = () => {
  const [sectorData, setSectorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

  // Add default data for initial render
  useEffect(() => {
    // Set a default date to today
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const fetchSectorData = async (selectedDate) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/sector', {
        date: selectedDate,
      });
      setSectorData(response.data);
    } catch (error) {
      console.error('Error fetching sector data:', error);
      const errorMessage = error.response 
        ? `${error.response.status} - ${error.response.data.error}`
        : 'Network Error. Please try again later.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (date) {
      fetchSectorData(date);
    } else {
      setError('Please select a valid date.');
    }
  };

  return (
    <div className="sector-container">
      <div className="sector-header">
        <div className="header-container">
          <FaChartBar style={{ marginRight: '10px', fontSize: '2rem', verticalAlign: 'middle' }} />
          <h1 style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px' }}>Sector Energy Analysis</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="sector-form">
        <div className="form-group">
          <label htmlFor="date">Select Date for Sector Data</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Get Sector Data'}
        </button>
      </form>

      {isLoading && (
        <div className="loading-indicator">
          <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading sector data...</span>
        </div>
      )}

      {error && (
        <div className="error-message">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      {sectorData && (
        <div className="sector-results">
          {Object.entries(sectorData).map(([key, value], index) => (
            <div 
              key={key} 
              className="sector-card" 
              style={{ '--index': index }}
            >
              <div className="sector-card-label">{key}</div>
              <div className="sector-card-value">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sector;
