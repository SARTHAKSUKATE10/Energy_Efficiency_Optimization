from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS  # Add CORS support

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow communication between different origins (React on 3000, Flask on 5000)
CORS(app)

# Load the trained model and scaler for weather prediction
model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')
le_conditions = joblib.load('label_encoder.pkl')  # Label encoder for conditions

# Load the trained model and scaler for sector data
model_sector = joblib.load('random_forest_model1.pkl')
scaler_sector = joblib.load('scaler1.pkl')
le_conditions_sector = joblib.load('label_encoder1.pkl')  # Label encoder for sector conditions

# Load the sector dataset
df = pd.read_csv('C:\\Users\\VRUTTIK MORAGHA\\Desktop\\App\\Energy_Efficiency_Optimization\\Datasets\\sectorWise1-1-18 to 31-12-19.csv', parse_dates=['Date'])

@app.route('/')
def home():
    return "Welcome to the Weather Prediction and Sector Data API!"

@app.route('/weather', methods=['POST'])
def predict_weather():
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
    

@app.route('/sector', methods=['POST'])
def get_sector_data():
    try:
        # Get the input data from the request (JSON format)
        data = request.get_json()

        # Validate input
        if 'date' not in data or not data['date']:
            return jsonify({'error': 'Invalid input. Please provide a valid date.'}), 400

        # Extract and preprocess input date
        input_date = pd.to_datetime(data['date'])

        # Filter the data for the provided date
        filtered_data = df[df['Date'] == input_date]

        # Check if data is found for the provided date
        if filtered_data.empty:
            return jsonify({'error': 'No data found for the provided date.'}), 404

        # Select only the specified columns from the filtered data
        columns_to_return = [
            'Season', 'Solar Energy (kWh)', 'Precipitation (mm)', 'Population',
            'Total Usage (kWh)', 'Urban Usage (kWh)', 'Rural Usage (kWh)', 
            'Urban Household (kWh)', 'Urban Industrial (kWh)', 'Urban Commercial (kWh)', 
            'Urban Others (kWh)', 'Rural Household (kWh)', 'Rural Industrial (kWh)', 
            'Rural Commercial (kWh)', 'Rural Others (kWh)'
        ]
        
        # Extract only the specified columns from the filtered data
        response_data = filtered_data[columns_to_return].iloc[0].to_dict()

        return jsonify(response_data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

