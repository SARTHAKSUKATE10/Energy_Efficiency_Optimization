import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib

# ✅ Load Dataset
df = pd.read_csv("../data/sectorwise_final.csv")

# ✅ Convert Date Column to Datetime
if 'date' in df.columns:
    df['date'] = pd.to_datetime(df['date'], errors='coerce')  # Convert to datetime
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year

# ✅ Define Target Variables
target_columns = ["Urban Usage (kWh)", "Rural Usage (kWh)"]
# Remove non-numeric columns
feature_columns = df.select_dtypes(include=[np.number]).columns.tolist()

# ✅ Exclude Target Columns from Features
feature_columns = [col for col in feature_columns if col not in target_columns]

# ✅ Normalize Features
scaler = StandardScaler()
df[feature_columns] = scaler.fit_transform(df[feature_columns])

# Save the scaler for inference
joblib.dump(scaler, "../models/scaler.pkl")

# ✅ Create Sequences for LSTM (Time Series)
timesteps = 10  # Use past 10 days for prediction

def create_sequences(X, y, timesteps):
    """
    Convert data into sequences of past `timesteps` for time series modeling.
    """
    Xs, ys = [], []
    for i in range(len(X) - timesteps):
        Xs.append(X[i : i + timesteps])
        ys.append(y.iloc[i + timesteps])
    return np.array(Xs), np.array(ys)

# Process each target separately
processed_data = {}
for target in target_columns:
    X = df[feature_columns].values
    y = df[target]

    X_seq, y_seq = create_sequences(X, y, timesteps)
    processed_data[target] = (X_seq, y_seq)

    # Save processed data
    np.save(f"../data/X_{target.replace(' ', '_')}.npy", X_seq)
    np.save(f"../data/y_{target.replace(' ', '_')}.npy", y_seq)

print("✅ Feature Engineering Done! Saved sector-wise sequences.")
