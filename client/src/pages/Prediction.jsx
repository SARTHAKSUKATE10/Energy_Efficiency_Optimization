import React, { useState } from 'react';

const Prediction = () => {
  const [inputs, setInputs] = useState({
    feature1: '',
    feature2: '',
    feature3: '', // Add more features as required by your model
    feature4: '', // Example additional feature
    feature5: '', // Example additional feature
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error message

    try {
      // Send input data to the backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: Object.values(inputs) }), // Send input values as an array
      });

      const data = await response.json();

      if (data.prediction) {
        setPrediction(data.prediction); // Assuming the API returns a 'prediction' field
      } else {
        setError('Prediction failed. Please check your inputs.');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      setError('An error occurred. Please try again later.');
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

        {/* Add more input fields based on the model's requirements */}
        <div className="input-field">
          <label>Feature 4:</label>
          <input
            type="number"
            name="feature4"
            value={inputs.feature4}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-field">
          <label>Feature 5:</label>
          <input
            type="number"
            name="feature5"
            value={inputs.feature5}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

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

