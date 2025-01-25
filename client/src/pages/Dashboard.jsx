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

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/dashboard', {
        start_date: startDate,
        end_date: endDate
      });

      setGraphs({
        energy_consumption_graph: response.data.energy_consumption_graph,
        expenditure_graph: response.data.expenditure_graph,
        pie_chart: response.data.pie_chart
      });

    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Energy Sector Data Dashboard</h2>
      <div className="form">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(event) => handleDateChange(event, setStartDate)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(event) => handleDateChange(event, setEndDate)}
          />
        </label>
        <PrimaryButton text="Fetch Data" onClick={fetchData} disabled={loading} />
      </div>

      {error && <Text variant="xLarge">{error}</Text>}

      {loading && <Text>Loading...</Text>}

      {!loading && graphs.energy_consumption_graph && (
        <div>
          <h3>Yearly Energy Consumption</h3>
          <img src={`data:image/png;base64,${graphs.energy_consumption_graph}`} alt="Energy Consumption" />
        </div>
      )}

      {!loading && graphs.expenditure_graph && (
        <div>
          <h3>Yearly Expenditure</h3>
          <img src={`data:image/png;base64,${graphs.expenditure_graph}`} alt="Expenditure" />
        </div>
      )}

      {!loading && graphs.pie_chart && (
        <div>
          <h3>Energy Usage Distribution</h3>
          <img src={`data:image/png;base64,${graphs.pie_chart}`} alt="Energy Usage" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

