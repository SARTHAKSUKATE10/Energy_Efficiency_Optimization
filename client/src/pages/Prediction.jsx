import React, { useState } from 'react';
import {
  Stack,
  Text,
  TextField,
  Link,
  mergeStyleSets,
} from '@fluentui/react';

const styles = mergeStyleSets({
  container: {
    backgroundColor: '#E0F2F1',
    padding: '30px', 
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '80%', 
    height: '100%',
    marginLeft: '40%',
    marginTop: '5%',
    // Remove float for better layout
  },
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    marginBottom: '30px', // Increased margin for better spacing
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
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [predictionData, setPredictionData] = useState([]);

  const handlePredict = () => {
    // Simulate prediction logic (replace with actual prediction function)
    const simulatedData = [
      { date: '2020-05-07', energy: 52507 },
      { date: '2020-05-08', energy: 7820.27 },
      { date: '2020-05-09', energy: 4700.14 },
    ];

    setPredictionData(simulatedData);
  };

  const calculateTotal = () => {
    return predictionData.reduce((total, item) => total + item.energy, 0);
  };

  return (
    <Stack horizontalAlign="center" style={{ width: '100%', height: '100%' }}> 
      <div className={styles.container}>
        <Text variant="large" className={styles.title}>
          Predict Energy Consumption
        </Text>

        <div className={styles.inputContainer}>
          <div>
            <TextField
              label="From Date"
              type="date"
              className={styles.input}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label="Time"
              type="time"
              className={styles.input}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="To Date"
              type="date"
              className={styles.input}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <TextField
              label="Time"
              type="time"
              className={styles.input}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <Link onClick={handlePredict} text="Predict">
          Predict
        </Link>

        <div className={styles.table}>
          <table>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableCell}>Date</th>
                <th className={styles.tableCell}>Energy (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {predictionData.map((row) => (
                <tr key={row.date}>
                  <td className={styles.tableCell}>{row.date}</td>
                  <td className={styles.tableCell}>{row.energy}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Text variant="small" className={styles.total}>
            Total: {calculateTotal().toFixed(2)} kWh
          </Text>
        </div>
      </div>
    </Stack>
  );
};

export default Prediction;