from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS  # Add CORS support

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow communication between different origins (React on 3000, Flask on 5000)
CORS(app)

# Load the trained model and scaler for sector data
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


# Function to generate line graph for Yearly Energy Consumption
def generate_yearly_energy_consumption_graph(filtered_data):
    # Group data by year
    filtered_data['Year'] = pd.to_datetime(filtered_data['Date']).dt.year
    yearly_data = filtered_data.groupby('Year').agg({
        'Total Usage (kWh)': 'sum'
    }).reset_index()

    # Plot the line graph for Energy Consumption
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(yearly_data['Year'], yearly_data['Total Usage (kWh)'], label='Yearly Energy Consumption (kWh)', color='blue', marker='o')
    ax.set_xlabel('Year')
    ax.set_ylabel('kWh')
    ax.set_title('Yearly Energy Consumption')
    ax.legend()

    # Save the plot as an image
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')

    return img_base64

# Function to generate line graph for Yearly Expenditure
def generate_yearly_expenditure_graph(filtered_data):
    # Group data by year
    filtered_data['Year'] = pd.to_datetime(filtered_data['Date']).dt.year
    yearly_data = filtered_data.groupby('Year').agg({
        'Total Usage (kWh)': 'sum'
    }).reset_index()

    # Plot the line graph for Expenditure
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(yearly_data['Year'], yearly_data['Total Usage (kWh)'] * 0.1, label='Yearly Expenditure', color='red', marker='o')
    ax.set_xlabel('Year')
    ax.set_ylabel('Expenditure (in USD)')
    ax.set_title('Yearly Expenditure (Estimated)')
    ax.legend()

    # Save the plot as an image
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')

    return img_base64

# Function to generate pie chart for Energy Usage Distribution
def generate_pie_chart(filtered_data):
    # Group data by urban/rural usage
    grouped_data = filtered_data.groupby(['Urban/Rural']).agg({
        'Total Usage (kWh)': 'sum'
    }).reset_index()

    # Generate pie chart
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.pie(grouped_data['Total Usage (kWh)'], labels=grouped_data['Urban/Rural'], autopct='%1.1f%%', colors=['#ff9999','#66b3ff','#99ff99','#ffcc99'])
    ax.set_title('Energy Usage Distribution: Urban vs Rural')

    # Save the plot as an image
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')

    return img_base64

@app.route('/dashboard', methods=['POST'])
def dashboard():
    try:
        # Get data from frontend
        data = request.get_json()
        start_date = pd.to_datetime(data['start_date'])
        end_date = pd.to_datetime(data['end_date'])

        # Filter the data based on the date range
        filtered_data = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]

        if filtered_data.empty:
            return jsonify({'error': 'No data found for the selected date range.'}), 404

        # Generate graphs
        energy_consumption_graph = generate_yearly_energy_consumption_graph(filtered_data)
        expenditure_graph = generate_yearly_expenditure_graph(filtered_data)
        pie_chart = generate_pie_chart(filtered_data)

        # Return graphs in base64 encoding
        return jsonify({
            'energy_consumption_graph': energy_consumption_graph,
            'expenditure_graph': expenditure_graph,
            'pie_chart': pie_chart
        })
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, port=5000)


