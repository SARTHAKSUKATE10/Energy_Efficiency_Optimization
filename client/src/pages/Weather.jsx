import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCloudSun, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './Weather.css';

const WeatherCard = ({ label, value, unit = '' }) => (
  <div className="weather-card">
    <div className="weather-card-label">{label}</div>
    <div className="weather-card-value">
      {value} {unit}
    </div>
  </div>
);

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

  // Add default data for initial render
  useEffect(() => {
    // Set a default date to today
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const fetchWeatherData = async (selectedDate) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/weather', {
        date: selectedDate,
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
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
      fetchWeatherData(date);
    } else {
      setError('Please select a valid date.');
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-header">
        <div className="header-container">
          <FaCloudSun style={{ marginRight: '10px', fontSize: '2rem', verticalAlign: 'middle' }} />
          <h1 style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px' }}>Weather Analysis</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="weather-form">
        <div className="form-group">
          <label htmlFor="date">Select Date for Weather Data</label>
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
          {isLoading ? 'Fetching...' : 'Get Weather Data'}
        </button>
      </form>

      {isLoading && (
        <div className="loading-indicator">
          <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading weather data...</span>
        </div>
      )}

      {error && (
        <div className="error-message">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      {weatherData && (
        <div className="weather-results">
          {Object.entries(weatherData).map(([key, value], index) => (
            <div 
              key={key} 
              className="weather-card" 
              style={{ '--index': index }}
            >
              <div className="weather-card-label">{key}</div>
              <div className="weather-card-value">
                {typeof value === 'number' ? value.toFixed(1) : value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
