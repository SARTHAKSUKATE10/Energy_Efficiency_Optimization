import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  TextField,
  Link,
  mergeStyleSets,
  Dropdown, 
  PrimaryButton, 
} from '@fluentui/react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const styles = mergeStyleSets({
  container: {
    backgroundColor: '#E0F2F1',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: '100%',
    marginLeft: '40%',
  },
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  input: {
    width: '250px',
    padding: '10px',
  },
  table: {
    backgroundColor: '#FFF8E1',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    borderCollapse: 'collapse',
    width: '100%',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '10px',
  },
});

const Prediction = () => {
  // ... (your Prediction component logic)
};

const Graphs = () => {
  const [selectedGraph, setSelectedGraph] = useState('Current Usage');

  const graphOptions = [
    { key: 'current', text: 'Current Usage' },
    { key: 'monthly', text: 'Monthly Usage' },
    { key: 'yearly', text: 'Yearly Usage' },
    { key: 'predicted', text: 'Predicted Energy Consumption' }, 
  ];

  const data = [
    { name: '00:00', energy: 100 }, 
    { name: '01:00', energy: 120 }, 
    { name: '02:00', energy: 90 }, 
    // ... more data points
  ];

  return (
    <Stack horizontalAlign="center">
      <div className={styles.container}>
        <Text variant="large" className={styles.title}>
          Graphical Analysis For Predicted Values
        </Text>

        <Stack horizontalAlign="center" style={{ marginBottom: '20px' }}>
          <Dropdown
            placeholder="Select Graph"
            options={graphOptions}
            selectedKey={selectedGraph}
            onChange={(event, option) => setSelectedGraph(option.key)}
          />
          <PrimaryButton text="Submit" />
        </Stack>

        {selectedGraph === 'predicted' && (
          <div>
            <Text variant="large" style={{ textAlign: 'center', marginBottom: '20px' }}>
              Predicted Energy Consumption Data
            </Text>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /> 
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="energy" stroke="#8884d8" activeDot={{ r: 8 }} /> 
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {/* Render other graphs (Current Usage, Monthly Usage, Yearly Usage) here */}
      </div>
    </Stack>
  );
};

export default Graphs;