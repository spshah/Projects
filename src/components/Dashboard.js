import React, { useState } from 'react';
import ExpenseTrendChart from './ExpenseTrendChart';

const Dashboard = () => {
    const [period, setPeriod] = useState('monthly');  // 'monthly' or 'yearly'

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <button onClick={() => setPeriod('monthly')}>Monthly</button>
                <button onClick={() => setPeriod('yearly')}>Yearly</button>
            </div>
            <ExpenseTrendChart period={period} />
        </div>
    );
};

export default Dashboard;

