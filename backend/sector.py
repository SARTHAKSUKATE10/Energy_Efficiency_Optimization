from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
import numpy as np
import pandas as pd
import joblib

# Load the dataset
df = pd.read_csv('C:\\Users\\VRUTTIK MORAGHA\\Desktop\\App\\Energy_Efficiency_Optimization\\Datasets\\sectorWise1-1-18 to 31-12-19.csv', parse_dates=['Date'])

# Convert 'Date' to datetime and extract features
df['Date'] = pd.to_datetime(df['Date'])
df['year'] = df['Date'].dt.year
df['month'] = df['Date'].dt.month
df['day'] = df['Date'].dt.day
df['Season'] = df['Season'].astype('category')

# Handle missing values
df.fillna(df.mean(numeric_only=True), inplace=True)

# Encode the categorical 'Season' column
le_season = LabelEncoder()
df['season_encoded'] = le_season.fit_transform(df['Season'])

# Select features and targets
features = ['month', 'day', 'Solar Energy (kWh)', 'Precipitation (mm)', 'Population', 
            'Urban Usage (kWh)', 'Rural Usage (kWh)', 'Urban Household (kWh)', 
            'Urban Industrial (kWh)', 'Urban Commercial (kWh)', 'Urban Others (kWh)', 
            'Rural Household (kWh)', 'Rural Industrial (kWh)', 'Rural Commercial (kWh)', 
            'Rural Others (kWh)']
targets = ['season_encoded', 'Solar Energy (kWh)', 'Precipitation (mm)', 'Population', 
           'Total Usage (kWh)', 'Urban Usage (kWh)', 'Rural Usage (kWh)', 
           'Urban Household (kWh)', 'Urban Industrial (kWh)', 'Urban Commercial (kWh)', 
           'Urban Others (kWh)', 'Rural Household (kWh)', 'Rural Industrial (kWh)', 
           'Rural Commercial (kWh)', 'Rural Others (kWh)']

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
joblib.dump(model, 'random_forest_model1.pkl')
joblib.dump(scaler, 'scaler1.pkl')
joblib.dump(le_season, 'label_encoder1.pkl')
