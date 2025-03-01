import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

# Check if GPU is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# --- 1️⃣ Load the Scaler (Fixing Previous Issue) ---
scaler_path = "../models/scaler.pkl"

if os.path.exists(scaler_path):
    scaler = joblib.load(scaler_path)  # Load saved scaler
    print("✅ Scaler loaded successfully!")
else:
    raise FileNotFoundError("🚨 Scaler file not found! Did you run train_model.py first?")

# --- 2️⃣ Load Data ---
features_df = pd.read_csv("../data/features.csv")
target_df = pd.read_csv("../data/target.csv")

X = features_df.values.astype(np.float32)
y = target_df.values.astype(np.float32).reshape(-1, 1)

# --- 3️⃣ Split Train & Test Sets BEFORE Scaling ---
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False, random_state=42)

# --- 4️⃣ Normalize using the Loaded MinMaxScaler ---
X_train_scaled = scaler.transform(X_train)  # Fit on training data
X_test_scaled = scaler.transform(X_test)  # Transform test data

# Reshape for CNN-LSTM (Adding a time step dimension)
X_train_scaled = X_train_scaled.reshape(X_train_scaled.shape[0], 1, X_train_scaled.shape[1])
X_test_scaled = X_test_scaled.reshape(X_test_scaled.shape[0], 1, X_test_scaled.shape[1])

# Convert to PyTorch tensors and move to device
X_train_tensor = torch.tensor(X_train_scaled, dtype=torch.float32).to(device)
y_train_tensor = torch.tensor(y_train, dtype=torch.float32).to(device)
X_test_tensor = torch.tensor(X_test_scaled, dtype=torch.float32).to(device)
y_test_tensor = torch.tensor(y_test, dtype=torch.float32).to(device)

# --- 5️⃣ Define CNN-LSTM Model ---
class CNN_LSTM_Model(nn.Module):
    def __init__(self, input_dim):
        super(CNN_LSTM_Model, self).__init__()
        self.conv1 = nn.Conv1d(in_channels=1, out_channels=64, kernel_size=3, padding=1)
        self.conv2 = nn.Conv1d(in_channels=64, out_channels=32, kernel_size=3, padding=1)
        self.lstm = nn.LSTM(input_size=32, hidden_size=64, num_layers=1, batch_first=True)
        self.dropout = nn.Dropout(0.5)
        self.fc1 = nn.Linear(64, 32)
        self.fc2 = nn.Linear(32, 1)

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = torch.relu(self.conv2(x))
        x = x.permute(0, 2, 1)  # Swap dimensions for LSTM
        x, _ = self.lstm(x)
        x = self.dropout(x[:, -1, :])
        x = torch.relu(self.fc1(x))
        return self.fc2(x)

# Initialize and move model to device
input_dim = X.shape[1]
model = CNN_LSTM_Model(input_dim).to(device)

# Loss and Optimizer
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.0005, weight_decay=1e-5)

# --- 6️⃣ Training the Model with Mini-Batches ---
num_epochs = 100
batch_size = 32

dataset = torch.utils.data.TensorDataset(X_train_tensor, y_train_tensor)
train_loader = torch.utils.data.DataLoader(dataset, batch_size=batch_size, shuffle=True)

for epoch in range(num_epochs):
    model.train()
    total_loss = 0

    for batch_X, batch_y in train_loader:
        optimizer.zero_grad()
        outputs = model(batch_X)
        loss = criterion(outputs, batch_y)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    if epoch % 10 == 0:
        print(f"Epoch [{epoch}/{num_epochs}], Loss: {total_loss / len(train_loader):.4f}")

# --- 7️⃣ Save Model ---
torch.save(model.state_dict(), "../models/cnn_lstm_model.pth")
print("✅ Model training completed and saved!")

# --- 8️⃣ Evaluate Model ---
model.eval()
with torch.no_grad():
    y_pred_tensor = model(X_test_tensor)

# Convert back to NumPy
y_pred = y_pred_tensor.cpu().numpy()
y_test = y_test_tensor.cpu().numpy()

# Print Sample Predictions
print("\n🔍 Sample Predictions (First 5)")
print(f"Actual: {y_test[:5].flatten()}")
print(f"Predicted: {y_pred[:5].flatten()}")
