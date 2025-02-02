import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Forecast = () => {
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/expense-forecast/')
            .then(response => {
                setForecast(response.data.forecasted_expense);
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
            });
    }, []);

    return (
        <div>
            <h2>Expense Forecast</h2>
            {forecast ? (
                <p>Forecasted Expense for the next month: {forecast} INR</p>
            ) : (
                <p>Loading forecast...</p>
            )}
        </div>
    );
};

export default Forecast;

