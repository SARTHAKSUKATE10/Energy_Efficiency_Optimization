from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor

# Assuming model is trained and saved
model = RandomForestRegressor()
model.load('random_forest_model.pkl')  # Update with your actual model file path

scaler = StandardScaler()

app = Flask(__name__)

@app.route('/prediction', methods=['POST'])
def predict():
    # Get input features from request
    features = request.json

    # Convert features to numpy array and scale
    input_array = np.array(list(features.values())).reshape(1, -1)
    input_scaled = scaler.transform(input_array)

    # Make prediction
    prediction = model.predict(input_scaled)

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)

