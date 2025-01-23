import React, { useState } from 'react';
import axios from 'axios';
import './Sector.css'; // Importing the external CSS file

const Sector = () => {
    const [sectorData, setSectorData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [date, setDate] = useState('');

    const fetchSectorData = async (selectedDate) => {
        try {
            const response = await axios.post('http://localhost:5000/sector', {
                date: selectedDate,
            });
            setSectorData(response.data);
            setError(null); // Clear previous errors if the call succeeds
        } catch (error) {
            console.error('Error fetching sector data:', error);
            if (error.response) {
                setError(`Backend error: ${error.response.status} - ${error.response.data.error}`);
            } else {
                setError('Network Error. Please try again later.');
            }
        } finally {
            setIsLoading(false); // Ensure the loading state is reset
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (date) {
            setIsLoading(true);
            fetchSectorData(date);
        } else {
            setError('Please select a valid date.');
        }
    };

    return (
        <div className="container">
            <div className="sector-card">
                <h1>Sector Data</h1>
                <form onSubmit={handleSubmit} className="sector-form">
                    <label htmlFor="date">Select a Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button type="submit">Get Sector Data</button>
                </form>

                {isLoading ? (
                    <p className="loading-text">Loading...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : sectorData ? (
                    <div className="sector-result">
                        <div className="card">
                            <strong>Season: </strong>{sectorData.Season}
                        </div>
                        <div className="card">
                            <strong>Solar Energy: </strong>{sectorData['Solar Energy (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Precipitation: </strong>{sectorData['Precipitation (mm)']} mm
                        </div>
                        <div className="card">
                            <strong>Population: </strong>{sectorData.Population}
                        </div>
                        <div className="card">
                            <strong>Total Usage: </strong>{sectorData['Total Usage (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Urban Usage: </strong>{sectorData['Urban Usage (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Rural Usage: </strong>{sectorData['Rural Usage (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Urban Household: </strong>{sectorData['Urban Household (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Urban Industrial: </strong>{sectorData['Urban Industrial (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Urban Commercial: </strong>{sectorData['Urban Commercial (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Urban Others: </strong>{sectorData['Urban Others (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Rural Household: </strong>{sectorData['Rural Household (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Rural Industrial: </strong>{sectorData['Rural Industrial (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Rural Commercial: </strong>{sectorData['Rural Commercial (kWh)']} kWh
                        </div>
                        <div className="card">
                            <strong>Rural Others: </strong>{sectorData['Rural Others (kWh)']} kWh
                        </div>

                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Sector;
