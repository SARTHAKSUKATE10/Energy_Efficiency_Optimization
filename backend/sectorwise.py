# Import necessary libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer
import joblib  # To save the model

# Load the dataset
file_path = 'C:\\Users\\VRUTTIK MORAGHA\\Desktop\\App\\Energy_Efficiency_Optimization\\sectorwiseMerged.csv'  # Update this path if necessary
data = pd.read_csv(file_path)

# Check for missing values and basic statistics
print(data.info())
print(data.describe())
print(data.isnull().sum())

# Ensure only numeric columns are included in the correlation matrix
numeric_data = data.select_dtypes(include=[float, int])

# Visualize correlations
plt.figure(figsize=(10, 8))
sns.heatmap(numeric_data.corr(), annot=True, cmap='coolwarm', fmt=".2f")
plt.title('Correlation Matrix')
plt.show()

# Convert problematic numeric columns to proper types
for col in data.select_dtypes(include=['object']).columns:
    try:
        data[col] = pd.to_numeric(data[col], errors='coerce')
    except:
        pass

# Handle missing values by filling them with the mean of the column
data.fillna(data.mean(), inplace=True)

# Encode categorical columns
categorical_columns = data.select_dtypes(include=['object']).columns
label_encoders = {}

for col in categorical_columns:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col].astype(str))  # Ensure consistent string type
    label_encoders[col] = le

# Scale numerical features
scaler = StandardScaler()
numerical_columns = data.select_dtypes(include=['float64', 'int64']).columns
data[numerical_columns] = scaler.fit_transform(data[numerical_columns])

# Display head of cleaned data
print(data.head())

# Initialize the imputer (filling missing values with the mean of the column)
imputer = SimpleImputer(strategy='mean')  # You can also use 'median' or 'most_frequent'

# Set target column (make sure this matches your target column name in the dataset)
target_column = 'target_column_name_here'  # Update with the actual target column name
X_imputed = imputer.fit_transform(data.drop(target_column, axis=1))
y_imputed = data[target_column].fillna(imputer.strategy)  # Fill target column if it has missing values

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_imputed, y_imputed, test_size=0.2, random_state=42)

# Print the sizes of the training and testing sets
print(f'Training set size: {X_train.shape}')
print(f'Testing set size: {X_test.shape}')

# Train Linear Regression model
lr = LinearRegression()
lr.fit(X_train, y_train)

# Train Random Forest Regressor
rf = RandomForestRegressor(random_state=42)
rf.fit(X_train, y_train)

# Evaluate both models
models = {'Linear Regression': lr, 'Random Forest': rf}
for name, model in models.items():
    y_pred = model.predict(X_test)
    print(f'{name} Results:')
    print(f'MAE: {mean_absolute_error(y_test, y_pred):.4f}')
    print(f'MSE: {mean_squared_error(y_test, y_pred):.4f}')
    print(f'R² Score: {r2_score(y_test, y_pred):.4f}')
    print('-' * 30)

# Save the trained Random Forest model
model_filename = 'random_forest_model.pkl'
joblib.dump(rf, model_filename)

# Save the scaler
scaler_filename = 'scaler.pkl'
joblib.dump(scaler, scaler_filename)

# Ensure X_test is a pandas DataFrame
X_test = pd.DataFrame(X_test)

# Forecast on new data (replace with actual data for prediction)
new_data = X_test.iloc[:5]  # Extracting the first 5 test samples as a DataFrame
predictions = rf.predict(new_data)  # Predict using the RandomForest model
print('Predictions:', predictions)
