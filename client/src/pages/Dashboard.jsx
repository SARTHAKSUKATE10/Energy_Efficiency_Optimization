import React from 'react';
import {
  Stack,
  Text,
  mergeStyleSets,
} from '@fluentui/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const styles = mergeStyleSets({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust height as needed
    width: '100%', // Adjust width as needed
    marginLeft: '40%',
  },
  card: {
    backgroundColor: '#333', // Dark background
    color: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '200px',
    textAlign: 'center',
    marginRight: '20px', 
  },
  chartContainer: {
    width: '45%',
    height: 300,
    margin: '20px',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
  },
});

const data = [
  { name: 'January', value: 4000 },
  { name: 'February', value: 3000 },
  { name: 'March', value: 2000 },
  { name: 'April', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'June', value: 2390 },
  { name: 'July', value: 3490 },
  { name: 'August', value: 3100 },
  { name: 'September', value: 2800 },
  { name: 'October', value: 3900 },
  { name: 'November', value: 3100 },
  { name: 'December', value: 3200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4500', '#E63900', '#A333C8', '#9966FF', '#990099', '#4D2600', '#000000', '#800000'];

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}> 
        <Stack horizontal>
          <div className={styles.card}>
            <Text variant="large">Total Energy Consumption</Text>
            <Text variant="xxLarge">65760 Kw/hr</Text>
          </div>
          <div className={styles.card}>
            <Text variant="large">Total Expenditure</Text>
            <Text variant="xxLarge">₹ 389001</Text>
          </div>
          <div className={styles.card}>
            <Text variant="large">Total Energy Consumption</Text>
            <Text variant="xxLarge">65760 Kw/hr</Text>
          </div>
          <div className={styles.card}>
            <Text variant="large">Total Expenditure</Text>
            <Text variant="xxLarge">₹ 389001</Text>
          </div>
        </Stack>
      </div>

      <div className={styles.mainContent}> 
        <Stack horizontal>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" /> 
              </BarChart>
            </ResponsiveContainer>
            <Text variant="medium" style={{ textAlign: 'center', marginTop: '10px' }}>Yearly Energy Consumption</Text>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Text variant="medium" style={{ textAlign: 'center', marginTop: '10px' }}>Yearly Expenditure</Text>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Dashboard;
