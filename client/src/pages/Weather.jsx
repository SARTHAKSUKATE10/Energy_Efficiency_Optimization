import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudSun, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './Weather.css';

const WeatherCard = ({ label, value, unit = '' }) => (
  <div className="card">
    <strong>{label}</strong>
    {value} {unit}
  </div>
);

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

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
    <div className="container1">
      <img
        className="background-image"
        src="https://images.unsplash.com/photo-1530908295418-4c6c9f2916e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Weather Forecast Background"
      />
      <div className="content-overlay">
        <div className="weather-card">
          <h1><FaCloudSun style={{ marginRight: '10px' }} />Weather Forecast</h1>
          <form onSubmit={handleSubmit} className="weather-form">
            <label htmlFor="date">Select a Date for Weather Prediction</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Fetching...' : 'Get Weather'}
            </button>
          </form>

          {isLoading && (
            <div className="loading-text">
              <FaSpinner style={{ marginRight: '10px', animation: 'spin 1s linear infinite' }} />
              Loading weather data...
            </div>
          )}

          {error && (
            <div className="error-text">
              <FaExclamationTriangle style={{ marginRight: '10px' }} />
              {error}
            </div>
          )}

          {weatherData && !isLoading && !error && (
            <div className="weather-result">
              <WeatherCard 
                label="Temperature" 
                value={weatherData['Temperature (°C)']} 
                unit="°C" 
              />
              <WeatherCard 
                label="Humidity" 
                value={weatherData['Humidity (%)']} 
                unit="%" 
              />
              <WeatherCard 
                label="Wind Speed" 
                value={weatherData['Wind Speed (km/h)']} 
                unit="km/h" 
              />
              <WeatherCard 
                label="Precipitation" 
                value={weatherData['Precipitation Probability (%)']} 
                unit="%" 
              />
              <div className="card" style={{ gridColumn: 'span 2', textAlign: 'center' }}>
                <strong>Weather Conditions</strong>
                {weatherData['Conditions']}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
