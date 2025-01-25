from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
import base64

df = pd.read_csv('C:\\Users\\VRUTTIK MORAGHA\\Desktop\\App\\Energy_Efficiency_Optimization\\Datasets\\sectorWise1-1-18 to 31-12-19.csv', parse_dates=['Date'])

# Function to generate line graph for Yearly Energy Consumption
def generate_yearly_energy_consumption_graph(filtered_data):
    try:
        # Ensure 'Date' is in datetime format and extract the year
        filtered_data['Year'] = pd.to_datetime(filtered_data['Date']).dt.year

        # Group data by year and sum the total usage
        yearly_data = filtered_data.groupby('Year').agg({
            'Total Usage (kWh)': 'sum'
        }).reset_index()

        # Log yearly data for debugging
        print("Yearly Energy Consumption Data:", yearly_data)

        # If no data is available after grouping
        if yearly_data.empty:
            raise ValueError("No data available for yearly energy consumption.")

        # Plot the line graph for Energy Consumption
        fig, ax = plt.subplots(figsize=(10, 6))
        ax.plot(yearly_data['Year'], yearly_data['Total Usage (kWh)'], label='Yearly Energy Consumption (kWh)', color='blue', marker='o')
        ax.set_xlabel('Year')
        ax.set_ylabel('kWh')
        ax.set_title('Yearly Energy Consumption')
        ax.legend()

        # Save the plot as an image
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')

        return img_base64

    except Exception as e:
        print(f"Error in generating yearly energy consumption graph: {str(e)}")
        return None
