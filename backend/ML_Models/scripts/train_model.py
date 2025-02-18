import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, LSTM, Dense, Dropout, Flatten
from tensorflow.keras.optimizers import Adam

# ✅ Load Preprocessed Data
X_train = np.load("../data/X_Urban_Usage_(kWh).npy")  # Example for Urban sector
y_train = np.load("../data/y_Urban_Usage_(kWh).npy")

X_val = np.load("../data/X_Rural_Usage_(kWh).npy")  # Example for Rural sector
y_val = np.load("../data/y_Rural_Usage_(kWh).npy")

# ✅ Define CNN + LSTM Model
model = Sequential([
    Conv1D(filters=64, kernel_size=3, activation="relu", input_shape=(X_train.shape[1], X_train.shape[2])),
    Dropout(0.2),
    LSTM(100, return_sequences=True),
    Dropout(0.2),
    LSTM(50),
    Dense(25, activation="relu"),
    Dense(1)  # Output layer
])

# ✅ Compile Model
model.compile(optimizer=Adam(learning_rate=0.001), loss="mse", metrics=["mae"])

# ✅ Train Model
history = model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=50, batch_size=32)

# ✅ Save Model
model.save("../models/energy_forecast_model.h5")

print("✅ Model training complete. Saved as energy_forecast_model.h5")
