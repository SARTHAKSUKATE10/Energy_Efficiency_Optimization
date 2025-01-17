import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/weather', { 
          // Adjust URL if necessary
          tempmax: 35.0,
          tempmin: 25.0,
          humidity: 60.0,
          windspeed: 10.0
        });
        setWeatherData(response.data);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data.'); 
        setIsLoading(false); 
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h1>Today's Weather</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
