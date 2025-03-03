import matplotlib
matplotlib.use('Agg')
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow communication between different origins (React on 3000, Flask on 5000)
CORS(app)

# Get the absolute path to the project root directory
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

try:
    # Load the trained model and scaler for sector data
    model = joblib.load(os.path.join(PROJECT_ROOT, 'backend', 'random_forest_model.pkl'))
    scaler = joblib.load(os.path.join(PROJECT_ROOT, 'backend', 'scaler.pkl'))
    le_conditions = joblib.load(os.path.join(PROJECT_ROOT, 'backend', 'label_encoder.pkl'))

    # Load the trained model and scaler for sector data
    model_sector = joblib.load(os.path.join(PROJECT_ROOT, 'backend', 'random_forest_model1.pkl'))
    scaler_sector = joblib.load(os.path.join(PROJECT_ROOT, 'backend', 'scaler1.pkl'))
    le_conditions_sector = joblib.load(os.path.join(PROJECT_ROOT, 'backend', 'label_encoder1.pkl'))

    # Load the sector dataset
    dataset_path = os.path.join(PROJECT_ROOT, 'Datasets', 'sectorWise1-1-18 to 31-12-19.csv')
    print(f"Loading dataset from: {dataset_path}")
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset file not found at: {dataset_path}")
    
    df = pd.read_csv(dataset_path)
    df['Date'] = pd.to_datetime(df['Date'])
    print(f"Dataset loaded successfully. Shape: {df.shape}")
    print(f"Columns: {df.columns.tolist()}")
except Exception as e:
    print(f"Error during initialization: {str(e)}")
    raise

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
    try:
        plt.figure(figsize=(10, 5))  
        plt.subplots_adjust(bottom=0.2, left=0.1, right=0.95, top=0.9)  
        
        # Sample the data to reduce overlapping points
        sampled_data = filtered_data.iloc[::7]  
        
        plt.plot(sampled_data['Date'], sampled_data['Total Usage (kWh)'], 
                marker='o', color='#2196F3', label='Total', linewidth=2, 
                markersize=5, markevery=2)  
        plt.plot(sampled_data['Date'], sampled_data['Urban Usage (kWh)'], 
                marker='s', color='#4CAF50', label='Urban', linewidth=2, 
                markersize=5, markevery=2)
        plt.plot(sampled_data['Date'], sampled_data['Rural Usage (kWh)'], 
                marker='^', color='#FFC107', label='Rural', linewidth=2, 
                markersize=5, markevery=2)
        
        plt.title('Yearly Energy Consumption Trends', fontsize=12, pad=20)  
        plt.xlabel('Date', fontsize=10, labelpad=10)
        plt.ylabel('Energy Consumption (kWh)', fontsize=10, labelpad=10)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.legend(fontsize=9, bbox_to_anchor=(0.5, -0.15), loc='upper center', ncol=3)
        plt.xticks(rotation=45, ha='right', fontsize=9)
        plt.yticks(fontsize=9)
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png', dpi=300, bbox_inches='tight')
        buf.seek(0)
        plt.close()
        
        return base64.b64encode(buf.getvalue()).decode('utf-8')
    except Exception as e:
        print(f"Error in generate_yearly_energy_consumption_graph: {str(e)}")
        raise

# Function to generate line graph for Yearly Expenditure
def generate_yearly_expenditure_graph(filtered_data):
    try:
        plt.figure(figsize=(10, 5))  
        plt.subplots_adjust(bottom=0.2, left=0.1, right=0.95, top=0.9)
        
        plt.plot(filtered_data['Date'], filtered_data['Total Usage (kWh)'], 
                marker='o', color='#2196F3', linewidth=2, markersize=5, markevery=2)
        
        plt.title('Yearly Energy Expenditure', fontsize=12, pad=20)
        plt.xlabel('Date', fontsize=10, labelpad=10)
        plt.ylabel('Expenditure', fontsize=10, labelpad=10)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.xticks(rotation=45, ha='right', fontsize=9)
        plt.yticks(fontsize=9)
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png', dpi=300, bbox_inches='tight')
        buf.seek(0)
        plt.close()
        
        return base64.b64encode(buf.getvalue()).decode('utf-8')
    except Exception as e:
        print(f"Error in generate_yearly_expenditure_graph: {str(e)}")
        raise

# Function to generate pie chart for Energy Usage Distribution
def generate_pie_chart(filtered_data):
    try:
        plt.figure(figsize=(7, 4))  
        
        # Calculate averages for the pie chart
        urban_total = filtered_data['Urban Usage (kWh)'].mean()
        rural_total = filtered_data['Rural Usage (kWh)'].mean()
        
        # Data for pie chart
        sizes = [urban_total, rural_total]
        labels = ['Urban', 'Rural']
        colors = ['#4CAF50', '#FFC107']
        
        plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', 
                startangle=90, textprops={'fontsize': 9})
        plt.title('Energy Usage Distribution', fontsize=12, pad=20)
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png', dpi=300, bbox_inches='tight')
        buf.seek(0)
        plt.close()
        
        return base64.b64encode(buf.getvalue()).decode('utf-8')
    except Exception as e:
        print(f"Error in generate_pie_chart: {str(e)}")
        raise

@app.route('/dashboard', methods=['POST'])
def dashboard():
    try:
        # Get data from frontend
        data = request.get_json()
        print(f"Received data: {data}")  # Debug log
        
        start_date = pd.to_datetime(data['start_date'])
        end_date = pd.to_datetime(data['end_date'])
        
        print(f"Parsed dates - Start: {start_date}, End: {end_date}")  # Debug log
        print(f"DataFrame shape: {df.shape}")  # Debug log
        print(f"DataFrame columns: {df.columns}")  # Debug log

        # Filter the data based on the date range
        filtered_data = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]
        print(f"Filtered data shape: {filtered_data.shape}")  # Debug log

        if filtered_data.empty:
            print("No data found for the selected date range")  # Debug log
            return jsonify({'error': 'No data found for the selected date range.'}), 404

        # Generate graphs
        try:
            energy_consumption_graph = generate_yearly_energy_consumption_graph(filtered_data)
            print("Generated energy consumption graph")  # Debug log
        except Exception as e:
            print(f"Error generating energy consumption graph: {str(e)}")
            return jsonify({'error': f'Error generating energy consumption graph: {str(e)}'}), 500

        try:
            expenditure_graph = generate_yearly_expenditure_graph(filtered_data)
            print("Generated expenditure graph")  # Debug log
        except Exception as e:
            print(f"Error generating expenditure graph: {str(e)}")
            return jsonify({'error': f'Error generating expenditure graph: {str(e)}'}), 500

        try:
            pie_chart = generate_pie_chart(filtered_data)
            print("Generated pie chart")  # Debug log
        except Exception as e:
            print(f"Error generating pie chart: {str(e)}")
            return jsonify({'error': f'Error generating pie chart: {str(e)}'}), 500

        # Return graphs in base64 encoding
        return jsonify({
            'energy_consumption_graph': energy_consumption_graph,
            'expenditure_graph': expenditure_graph,
            'pie_chart': pie_chart
        })
    except Exception as e:
        print(f"Dashboard error: {str(e)}")  # Debug log
        import traceback
        print(f"Full traceback: {traceback.format_exc()}")  # Detailed error log
        return jsonify({'error': f'Error: {str(e)}'}), 500


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, port=5000)
