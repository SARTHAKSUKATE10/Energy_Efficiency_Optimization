import React, { useState } from 'react';
import axios from 'axios';
import { FaChartBar, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './Dashboard.css';

const DashboardCard = ({ title, image, alt }) => (
  <div className="graph-card">
    <strong>{title}</strong>
    <div className="graph-wrapper">
      <img 
        src={`data:image/png;base64,${image}`} 
        alt={alt}
        className="graph-image"
      />
    </div>
  </div>
);

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
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

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
      const errorMessage = err.response?.data?.error || err.message || 'Error fetching data. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container1">
      <img
        className="background-image"
        src="https://images.unsplash.com/photo-1516737490857-847eca281a42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Dashboard Background"
      />
      <div className="content-overlay">
        <div className="dashboard-card">
          <h1><FaChartBar style={{ marginRight: '10px' }} />Energy Dashboard</h1>
          
          <div className="dashboard-form">
            <div className="date-inputs">
              <div className="input-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min="2018-01-01"
                  max="2019-12-31"
                />
              </div>
              <div className="input-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min="2018-01-01"
                  max="2019-12-31"
                />
              </div>
              <button 
                onClick={fetchData} 
                disabled={loading || !startDate || !endDate}
              >
                {loading ? 'Fetching...' : 'Get Data'}
              </button>
            </div>
          </div>

          {loading && (
            <div className="loading-text">
              <FaSpinner style={{ marginRight: '10px', animation: 'spin 1s linear infinite' }} />
              Loading dashboard data...
            </div>
          )}

          {error && (
            <div className="error-text">
              <FaExclamationTriangle style={{ marginRight: '10px' }} />
              {error}
            </div>
          )}

          {!loading && !error && (graphs.energy_consumption_graph || graphs.expenditure_graph || graphs.pie_chart) && (
            <div className="dashboard-result">
              {graphs.energy_consumption_graph && (
                <DashboardCard 
                  title="Yearly Energy Consumption" 
                  image={graphs.energy_consumption_graph} 
                  alt="Energy Consumption Graph" 
                />
              )}
              {graphs.expenditure_graph && (
                <DashboardCard 
                  title="Yearly Expenditure" 
                  image={graphs.expenditure_graph} 
                  alt="Expenditure Graph" 
                />
              )}
              {graphs.pie_chart && (
                <DashboardCard 
                  title="Energy Usage Distribution" 
                  image={graphs.pie_chart} 
                  alt="Energy Usage Pie Chart" 
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
