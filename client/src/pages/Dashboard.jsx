import React, { useState } from 'react';
import axios from 'axios';
import { PrimaryButton, Text } from '@fluentui/react';
import './Dashboard.css';

const Dashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [graphs, setGraphs] = useState({
    energy_consumption_graph: '',
    expenditure_graph: '',
    pie_chart: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event, setter) => {
    setter(event.target.value);
  };

  const fetchData = async () => {
    if (!startDate || !endDate) {
      setError('Please provide both start and end dates.');
      return;
    }

    console.log('Fetching data with dates:', { startDate, endDate });
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/dashboard', {
        start_date: startDate,
        end_date: endDate
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setGraphs({
        energy_consumption_graph: response.data.energy_consumption_graph,
        expenditure_graph: response.data.expenditure_graph,
        pie_chart: response.data.pie_chart
      });

    } catch (err) {
      console.error('Error details:', err);
      setError(err.response?.data?.error || err.message || 'Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboardContainer">
      {/* Fixed header section */}
      <div className="headerSection">
        <h1 className="dashboardTitle">Energy Sector Data Dashboard</h1>
        
        {/* Input controls section */}
        <div className="controlsSection">
          <div className="dateInputs">
            <div className="inputGroup">
              <label htmlFor="startDate">Start Date:</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(event) => handleDateChange(event, setStartDate)}
                className="dateInput"
                min="2018-01-01"
                max="2019-12-31"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="endDate">End Date:</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(event) => handleDateChange(event, setEndDate)}
                className="dateInput"
                min="2018-01-01"
                max="2019-12-31"
              />
            </div>
            <PrimaryButton 
              text={loading ? "Loading..." : "Fetch Data"} 
              onClick={fetchData} 
              disabled={loading || !startDate || !endDate}
              className="fetchButton"
            />
          </div>
          {error && <Text className="errorMessage">{error}</Text>}
          {loading && <Text className="loadingMessage">Loading...</Text>}
        </div>
      </div>

      {/* Scrollable graphs section */}
      <div className="graphsSection">
        {!loading && graphs.energy_consumption_graph && (
          <div className="graphContainer">
            <h2>Yearly Energy Consumption</h2>
            <div className="graphWrapper">
              <img 
                src={`data:image/png;base64,${graphs.energy_consumption_graph}`} 
                alt="Energy Consumption"
                className="graphImage"
              />
            </div>
          </div>
        )}

        {!loading && graphs.expenditure_graph && (
          <div className="graphContainer">
            <h2>Yearly Expenditure</h2>
            <div className="graphWrapper">
              <img 
                src={`data:image/png;base64,${graphs.expenditure_graph}`} 
                alt="Expenditure"
                className="graphImage"
              />
            </div>
          </div>
        )}

        {!loading && graphs.pie_chart && (
          <div className="graphContainer">
            <h2>Energy Usage Distribution</h2>
            <div className="graphWrapper">
              <img 
                src={`data:image/png;base64,${graphs.pie_chart}`} 
                alt="Energy Usage"
                className="graphImage"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
