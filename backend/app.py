from flask import Flask, request, jsonify
import joblib
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# Load the model
model = joblib.load('weather_model.pkl')

@app.route('/weather', methods=['POST'])
def predict():
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
        prediction = model.predict(input_df)
        result = {
            'temp': prediction[0],
            'humidity': input_data['humidity'],
            'windspeed': input_data['windspeed']
        }
        return jsonify(result), 200  # Return 200 OK status code
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return 500 Internal Server Error

if __name__ == '__main__':
    app.run(port=3000 ,debug=True)