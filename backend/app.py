from flask import Flask, request, jsonify
import joblib
import pandas as pd
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the weather model
weather_model = joblib.load('weather_model.pkl')

# Load the energy usage model
energy_usage_model = joblib.load('energy_usage_model.pkl')

# Load the energy usage dataset
energy_df = pd.read_csv(r'C:\\Users\\VRUTTIK MORAGHA\\Desktop\\App\\Energy_Efficiency_Optimization\\sectorwiseMerged.csv')

@app.route('/weather', methods=['POST'])
def predict_weather():
    try:
        data = request.get_json()
        input_data = {
            'year': datetime.now().year,
            'month': datetime.now().month,
            'day': datetime.now().day,
            'tempmax': data['tempmax'],
            'tempmin': data['tempmin'],
            'humidity': data['humidity'],
            'windspeed': data['windspeed']
        }
        input_df = pd.DataFrame([input_data])
        prediction = weather_model.predict(input_df)
        result = {
            'temp': prediction[0],
            'humidity': input_data['humidity'],
            'windspeed': input_data['windspeed']
        }
        return jsonify(result), 200  # Return 200 OK status code
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return 500 Internal Server Error

@app.route('/prediction', methods=['POST'])
def predict_energy_usage():
    try:
        data = request.get_json()
        start_date = data['startDate']
        end_date = data['endDate']

        # Filter the data based on the date range
        mask = (energy_df['Date'] >= start_date) & (energy_df['Date'] <= end_date)
        filtered_df = energy_df.loc[mask]

        # Calculate the total energy usage
        total_energy = filtered_df['Total Usage (kWh)'].sum()

        # Prepare the result
        result = {
            'total_energy': total_energy,
            'details': filtered_df[['Date', 'Total Usage (kWh)']].to_dict(orient='records')
        }

        return jsonify(result), 200  # Return 200 OK status code
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return 500 Internal Server Error

if __name__ == '__main__':
    app.run(port=5000, debug=True)  # Use port 5000 for Flask
