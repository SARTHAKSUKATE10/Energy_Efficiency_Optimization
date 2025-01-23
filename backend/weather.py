import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
import numpy as np
import joblib

# Load the dataset
df = pd.read_csv('C:\\Users\\VRUTTIK MORAGHA\\Desktop\\App\\Energy_Efficiency_Optimization\\Datasets\\puneWeather.csv')

# Convert datetime and extract features
df['datetime'] = pd.to_datetime(df['datetime'])
df['year'] = df['datetime'].dt.year
df['month'] = df['datetime'].dt.month
df['day'] = df['datetime'].dt.day

# Handle missing values
df.fillna(df.mean(numeric_only=True), inplace=True)

# Encode categorical columns
le_conditions = LabelEncoder()
df['conditions_encoded'] = le_conditions.fit_transform(df['conditions'])

# Select features and targets
features = ['month', 'day', 'tempmax', 'tempmin', 'humidity', 'cloudcover', 'windspeed']
targets = ['temp', 'humidity', 'windspeed', 'precipprob', 'conditions_encoded']

X = df[features]
y = df[targets]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the model for multi-output prediction
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Save the model, scaler, and label encoder
joblib.dump(model, 'random_forest_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(le_conditions, 'label_encoder.pkl')


