import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load the dataset
df = pd.read_csv(r'C:\\Users\\VRUTTIK MORAGHA\\Desktop\\App\\Energy_Efficiency_Optimization\\sectorwiseMerged.csv')

# Preprocess the data
df['Date'] = pd.to_datetime(df['Date'])
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month
df['Day'] = df['Date'].dt.day

# Encode categorical variables
df = pd.get_dummies(df, columns=['Season', 'Period'], drop_first=True)

# Select features and target
features = ['Temp (°C)', 'Humidity (%)', 'Solar Energy (kWh)', 'Precipitation (mm)', 'Population', 'Year', 'Month', 'Day'] + \
           [col for col in df.columns if col.startswith('Season_')] + \
           [col for col in df.columns if col.startswith('Period_')]
target = 'Total Usage (kWh)'

X = df[features]
y = df[target]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'energy_usage_model.pkl')