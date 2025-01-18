import React, { useState } from 'react';

const Prediction = () => {
  const [inputs, setInputs] = useState({
    feature1: '',
    feature2: '',
    feature3: '', // Add as many features as required by your model
    // Add more features based on the data
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send input data to the backend (replace with your actual API endpoint)
      const response = await fetch('http://localhost:5000/prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();
      setPrediction(data.prediction);  // Assuming the API returns a 'prediction' field
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <h2>Enter Feature Values for Prediction</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Feature 1:</label>
          <input
            type="number"
            name="feature1"
            value={inputs.feature1}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-field">
          <label>Feature 2:</label>
          <input
            type="number"
            name="feature2"
            value={inputs.feature2}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-field">
          <label>Feature 3:</label>
          <input
            type="number"
            name="feature3"
            value={inputs.feature3}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Add more input fields as per the model's requirements */}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default Prediction;
