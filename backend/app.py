# Import necessary libraries
from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Load the trained model and scaler
model_filename = 'random_forest_model.pkl'
scaler_filename = 'scaler.pkl'

# Load model and scaler using joblib
model = joblib.load(model_filename)
scaler = joblib.load(scaler_filename)

@app.route('/')
def home():
    return "Welcome to the Energy Efficiency Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request (JSON format)
        data = request.get_json()

        # Extract the features from the input data
        input_data = data['features']  # Ensure 'features' is a list of values
        
        # Convert input data to a numpy array and scale using the saved scaler
        input_array = np.array(input_data).reshape(1, -1)
        scaled_input = scaler.transform(input_array)

        # Predict using the trained Random Forest model
        prediction = model.predict(scaled_input)
        
        # Send the prediction as a response
        response = {
            'prediction': prediction.tolist()  # Convert numpy array to list for JSON response
        }
        return jsonify(response)
    
    except Exception as e:
        # Handle any errors that occur during prediction
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Run the app on the local server
    app.run(debug=True)


