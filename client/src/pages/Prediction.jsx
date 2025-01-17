import React, { useState } from 'react';
import {
  Stack,
  Text,
  TextField,
  Link,
  mergeStyleSets,
} from '@fluentui/react';
import axios from 'axios';

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [predictionData, setPredictionData] = useState([]);

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://localhost:5000/prediction', {
        startDate,
        endDate
      });
      setPredictionData(response.data.details);
    } catch (error) {
      console.error('Error fetching prediction data:', error);
    }
  };

  const calculateTotal = () => {
    return predictionData.reduce((total, item) => total + item['Total Usage (kWh)'], 0);
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
          </div>
          <div>
            <TextField
              label="To Date"
              type="date"
              className={styles.input}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
                <th className={styles.tableCell}>Total Usage (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {predictionData.map((row) => (
                <tr key={row.Date}>
                  <td className={styles.tableCell}>{row.Date}</td>
                  <td className={styles.tableCell}>{row['Total Usage (kWh)']}</td>
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