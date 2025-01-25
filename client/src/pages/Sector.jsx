import React, { useState } from 'react';
import axios from 'axios';
import { FaChartBar, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './Sector.css';

const SectorCard = ({ label, value, unit = '' }) => (
  <div className="card">
    <strong>{label}</strong>
    {value} {unit}
  </div>
);

const Sector = () => {
  const [sectorData, setSectorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

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
    <div className="container1">
      <img
        className="background-image"
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Sector Data Background"
      />
      <div className="content-overlay">
        <div className="sector-card">
          <h1><FaChartBar style={{ marginRight: '10px' }} />Sector Analysis</h1>
          <form onSubmit={handleSubmit} className="sector-form">
            <label htmlFor="date">Select a Date for Sector Data</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Fetching...' : 'Get Sector Data'}
            </button>
          </form>

          {isLoading && (
            <div className="loading-text">
              <FaSpinner style={{ marginRight: '10px', animation: 'spin 1s linear infinite' }} />
              Loading sector data...
            </div>
          )}

          {error && (
            <div className="error-text">
              <FaExclamationTriangle style={{ marginRight: '10px' }} />
              {error}
            </div>
          )}

          {sectorData && !isLoading && !error && (
            <div className="sector-result">
              <SectorCard label="Season" value={sectorData.Season} />
              <SectorCard label="Solar Energy" value={sectorData['Solar Energy (kWh)']} unit="kWh" />
              <SectorCard label="Precipitation" value={sectorData['Precipitation (mm)']} unit="mm" />
              <SectorCard label="Population" value={sectorData.Population} />
              <SectorCard label="Total Usage" value={sectorData['Total Usage (kWh)']} unit="kWh" />
              <SectorCard label="Urban Usage" value={sectorData['Urban Usage (kWh)']} unit="kWh" />
              <SectorCard label="Rural Usage" value={sectorData['Rural Usage (kWh)']} unit="kWh" />
              <SectorCard label="Urban Household" value={sectorData['Urban Household (kWh)']} unit="kWh" />
              <SectorCard label="Urban Industrial" value={sectorData['Urban Industrial (kWh)']} unit="kWh" />
              <SectorCard label="Urban Commercial" value={sectorData['Urban Commercial (kWh)']} unit="kWh" />
              <SectorCard label="Urban Others" value={sectorData['Urban Others (kWh)']} unit="kWh" />
              <SectorCard label="Rural Household" value={sectorData['Rural Household (kWh)']} unit="kWh" />
              <SectorCard label="Rural Industrial" value={sectorData['Rural Industrial (kWh)']} unit="kWh" />
              <SectorCard label="Rural Commercial" value={sectorData['Rural Commercial (kWh)']} unit="kWh" />
              <SectorCard label="Rural Others" value={sectorData['Rural Others (kWh)']} unit="kWh" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sector;
