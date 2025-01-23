from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS  # Add CORS support

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow communication between different origins (React on 3000, Flask on 5000)
CORS(app)

# Load the trained model and scaler
model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')
le_conditions = joblib.load('label_encoder.pkl')  # Label encoder for conditions

@app.route('/')
def home():
    return "Welcome to the Weather Prediction API!"

@app.route('/weather', methods=['POST'])
def predict():
    try:
        # Get the input data from the request (JSON format)
        data = request.get_json()

        # Validate input
        if 'date' not in data or not data['date']:
            return jsonify({'error': 'Invalid input. Please provide a valid date.'}), 400
        
        # Extract and preprocess input date
        input_date = pd.to_datetime(data['date'])
        month = input_date.month
        day = input_date.day

        # Default feature values (adjustable for future)
        default_features = [month, day, 30, 15, 50, 5, 10]  # Example values for tempmax, tempmin, etc.
        scaled_features = scaler.transform([default_features])

        # Predict using the trained model
        predictions = model.predict(scaled_features)

        # Decode categorical conditions
        predicted_conditions = le_conditions.inverse_transform([int(predictions[0, 4])])

        response = {
            "Temperature (°C)": round(predictions[0, 0], 2),
            "Humidity (%)": round(predictions[0, 1], 2),
            "Wind Speed (km/h)": round(predictions[0, 2], 2),
            "Precipitation Probability (%)": round(predictions[0, 3], 2),
            "Conditions": predicted_conditions[0]
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)




