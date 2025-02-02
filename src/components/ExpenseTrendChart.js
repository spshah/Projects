import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExpenseTrendChart = ({ period = 'monthly' }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/expenses-trend/${period}/`)
            .then(response => {
                const data = response.data;
                const labels = data.map(item => period === 'monthly' ? new Date(item.month).toLocaleString('default', { month: 'long', year: 'numeric' }) : item.year);
                const expenses = data.map(item => item.total_expenses);

                setChartData({
                    labels,
                    datasets: [{
                        label: `Total Expenses (${period.charAt(0).toUpperCase() + period.slice(1)})`,
                        data: expenses,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.1,
                        fill: false
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching expense trend data:', error);
            });
    }, [period]);

    return (
        <div>
            <h2>Expense Trend</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ExpenseTrendChart;


//import React, { useEffect, useState } from 'react';
//import { Line } from 'react-chartjs-2';
//import axios from 'axios';
//
//const ExpenseTrendChart = ({ period = 'monthly' }) => {
//    const [data, setData] = useState([]);
//
//    useEffect(() => {
//        axios.get(`http://127.0.0.1:8000/api/expenses-trend/${period}/`)
//            .then(response => setData(response.data))
//            .catch(error => console.error('Error fetching trend data:', error));
//    }, [period]);
//
//    // Code to format data into chart.js compatible format...
//    return (
//        <Line data={data} />
//    );
//};
//
//export default ExpenseTrendChart;

