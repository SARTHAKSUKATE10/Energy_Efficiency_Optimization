import torch
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from train_model import CNN_LSTM_Model  
import joblib

# --- 1️⃣ Load the Scaler ---
scaler_path = "../models/scaler.pkl"
scaler = joblib.load(scaler_path)  # Load trained scaler
print("✅ Scaler loaded successfully!")

# --- 2️⃣ Load Dataset & Extract Relevant Features ---
df = pd.read_csv("../data/sectorwise_energy_updated.csv")

# Extract features (excluding target columns)
feature_columns = [
    "Temp (°C)", "Humidity (%)", "Precipitation (mm)", "Solar Energy (kWh)",
    "Population", "Month", "Year", "Season_Winter", "Season_Summer", "Season_Monsoon",
    "Period_Morning", "Period_Afternoon", "Period_Evening", "Period_Night"
]
X_test = df[feature_columns].values.astype(np.float32)

# Select the target based on evaluation mode
evaluation_mode = "rural"  # Change to "urban" or "sectorwise" accordingly

if evaluation_mode == "rural":
    y_test = df["Rural Usage (kWh)"].values.astype(np.float32)
elif evaluation_mode == "urban":
    y_test = df["Urban Usage (kWh)"].values.astype(np.float32)
elif evaluation_mode == "sectorwise":
    y_test = df[
        ["Rural Household (kWh)", "Rural Industrial (kWh)", "Rural Commercial (kWh)", "Rural Others (kWh)",
         "Urban Household (kWh)", "Urban Industrial (kWh)", "Urban Commercial (kWh)", "Urban Others (kWh)"]
    ].sum(axis=1).values.astype(np.float32)  # Summing all sectors

# --- 3️⃣ Normalize Using the Loaded Scaler ---
X_test_scaled = scaler.transform(X_test)

# Reshape for CNN-LSTM (Adding a time step dimension)
X_test_scaled = X_test_scaled.reshape(X_test_scaled.shape[0], 1, X_test_scaled.shape[1])

# --- 4️⃣ Convert to PyTorch Tensor (with Device Handling) ---
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

X_tensor = torch.tensor(X_test_scaled, dtype=torch.float32).to(device)

# --- 5️⃣ Initialize & Load Trained Model ---
input_dim = X_test.shape[1]
model = CNN_LSTM_Model(input_dim).to(device)

# Load trained model weights
if evaluation_mode == "rural":
    model.load_state_dict(torch.load("../models/cnn_lstm_rural.pth", map_location=device))
elif evaluation_mode == "urban":
    model.load_state_dict(torch.load("../models/cnn_lstm_urban.pth", map_location=device))
elif evaluation_mode == "sectorwise":
    model.load_state_dict(torch.load("../models/cnn_lstm_sectorwise.pth", map_location=device))

model.eval()
print("✅ Model loaded successfully!")

# --- 6️⃣ Make Predictions ---
with torch.no_grad():
    y_pred_tensor = model(X_tensor).squeeze()

# Convert Predictions to NumPy (Move to CPU first)
y_pred = y_pred_tensor.cpu().numpy()

# --- 7️⃣ Compute Evaluation Metrics ---
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

# Print results
print(f"\n📊 Model Performance ({evaluation_mode.capitalize()} Model):")
print(f"   🔹 MAE: {mae:.4f}")
print(f"   🔹 RMSE: {rmse:.4f}")
print(f"   🔹 R² Score: {r2:.4f}")

# --- 8️⃣ Plot Actual vs Predicted ---
plt.figure(figsize=(12, 6))
plt.scatter(range(len(y_test)), y_test, label="Actual", alpha=0.7, color='blue')
plt.scatter(range(len(y_pred)), y_pred, label="Predicted", alpha=0.7, color='orange')
plt.xlabel("Samples")
plt.ylabel(f"{evaluation_mode.capitalize()} Energy (kWh)")
plt.title(f"Actual vs. Predicted {evaluation_mode.capitalize()} Energy Usage")
plt.legend()
plt.grid(True)
plt.show()
