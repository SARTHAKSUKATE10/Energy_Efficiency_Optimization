import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Importing the external CSS file

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

  const fetchWeatherData = async (selectedDate) => {
    try {
      const response = await axios.post('http://localhost:5000/weather', {
        date: selectedDate,
      });
      setWeatherData(response.data);
      setError(null); // Clear previous errors if the call succeeds
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Check if the error has a response from the backend
      if (error.response) {
        setError(`Backend error: ${error.response.status} - ${error.response.data.error}`);
      } else {
        setError('Network Error. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Ensure the loading state is reset
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (date) {
      setIsLoading(true);
      fetchWeatherData(date);
    } else {
      setError('Please select a valid date.');
    }
  };

  return (
    <div className="container">
      <div className="weather-card">
        <h1>Weather Prediction</h1>
        <form onSubmit={handleSubmit} className="weather-form">
          <label htmlFor="date">Select a Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>

        {isLoading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : weatherData ? (
          <div className="weather-result">
            <div className="card">
              <strong>Temperature: </strong>{weatherData['Temperature (°C)']}°C
            </div>
            <div className="card">
              <strong>Humidity: </strong>{weatherData['Humidity (%)']}%
            </div>
            <div className="card">
              <strong>Wind Speed: </strong>{weatherData['Wind Speed (km/h)']} km/h
            </div>
            <div className="card">
              <strong>Precipitation Probability: </strong>{weatherData['Precipitation Probability (%)']}%
            </div>
            <div className="card">
              <strong>Conditions: </strong>{weatherData['Conditions']}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;

