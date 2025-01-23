import React, { useState } from 'react';
import axios from 'axios';
import { Stack, Text, PrimaryButton, mergeStyleSets } from '@fluentui/react';

const styles = mergeStyleSets({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  },
  chartContainer: {
    margin: '20px',
    textAlign: 'center',
  },
  image: {
    width: '80%',
    maxWidth: '600px',
    height: 'auto',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
});

const Dashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [graphs, setGraphs] = useState({
    energy_consumption_graph: '',
    expenditure_graph: '',
    pie_chart: ''
  });
  const [error, setError] = useState('');

  const handleDateChange = (event, setter) => {
    setter(event.target.value);
  };

  const fetchData = async () => {
    if (!startDate || !endDate) {
      setError('Please provide both start and end dates.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/dashboard', {
        start_date: startDate,
        end_date: endDate,
      });

      if (response.data.error) {
        setError(response.data.error);
        setGraphs({ energy_consumption_graph: '', expenditure_graph: '', pie_chart: '' });
      } else {
        setGraphs({
          energy_consumption_graph: response.data.energy_consumption_graph,
          expenditure_graph: response.data.expenditure_graph,
          pie_chart: response.data.pie_chart
        });
        setError('');
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => handleDateChange(e, setStartDate)}
        />
        <label htmlFor="endDate">End Date: </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => handleDateChange(e, setEndDate)}
        />
        <PrimaryButton text="Fetch Data" onClick={fetchData} />
      </div>

      {error && <Text variant="large" style={{ color: 'red' }}>{error}</Text>}

      <div className={styles.chartContainer}>
        {graphs.energy_consumption_graph && (
          <div>
            <h3>Yearly Energy Consumption</h3>
            <img
              src={`data:image/png;base64,${graphs.energy_consumption_graph}`}
              alt="Yearly Energy Consumption"
              className={styles.image}
            />
          </div>
        )}

        {graphs.expenditure_graph && (
          <div>
            <h3>Yearly Expenditure</h3>
            <img
              src={`data:image/png;base64,${graphs.expenditure_graph}`}
              alt="Yearly Expenditure"
              className={styles.image}
            />
          </div>
        )}

        {graphs.pie_chart && (
          <div>
            <h3>Energy Usage Distribution</h3>
            <img
              src={`data:image/png;base64,${graphs.pie_chart}`}
              alt="Energy Usage Distribution"
              className={styles.image}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

