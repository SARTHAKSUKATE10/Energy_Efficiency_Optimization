const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Comprehensive CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'https://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Mock Sector Data Route
app.post('/sector', (req, res) => {
  const { date } = req.body;

  // Validate date
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  try {
    // Mock sector data (replace with actual data retrieval logic)
    const sectorData = {
      'Season': 'Summer',
      'Solar Energy (kWh)': 1500,
      'Precipitation (mm)': 25,
      'Population': 100000,
      'Total Usage (kWh)': 5000000,
      'Urban Usage (kWh)': 3500000,
      'Rural Usage (kWh)': 1500000,
      'Urban Household (kWh)': 1200000,
      'Urban Industrial (kWh)': 1500000,
      'Urban Commercial (kWh)': 600000,
      'Urban Others (kWh)': 200000,
      'Rural Household (kWh)': 800000,
      'Rural Industrial (kWh)': 400000,
      'Rural Commercial (kWh)': 200000,
      'Rural Others (kWh)': 100000
    };

    // Simulate some variation based on date
    const dateObj = new Date(date);
    const monthMultiplier = dateObj.getMonth() + 1;
    
    Object.keys(sectorData).forEach(key => {
      if (key.includes('(kWh)')) {
        sectorData[key] *= (monthMultiplier / 6);
      }
    });

    res.json(sectorData);
  } catch (error) {
    console.error('Sector Data Error:', error);
    res.status(500).json({ error: 'Failed to retrieve sector data' });
  }
});

// Mock Weather Data Route
app.post('/weather', (req, res) => {
  const { date } = req.body;

  // Validate date
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  try {
    // Mock weather data (replace with actual data retrieval logic)
    const weatherData = {
      'Temperature (°C)': 32,
      'Humidity (%)': 65,
      'Wind Speed (km/h)': 12,
      'Precipitation (mm)': 5,
      'Solar Radiation (W/m²)': 800,
      'Air Quality Index': 45,
      'UV Index': 7,
      'Cloud Cover (%)': 20,
      'Atmospheric Pressure (hPa)': 1013
    };

    // Simulate some variation based on date
    const dateObj = new Date(date);
    const monthMultiplier = dateObj.getMonth() + 1;
    
    Object.keys(weatherData).forEach(key => {
      if (key.includes('(')) {
        weatherData[key] *= (monthMultiplier / 6);
      }
    });

    res.json(weatherData);
  } catch (error) {
    console.error('Weather Data Error:', error);
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    details: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for: http://localhost:3000`);
});
