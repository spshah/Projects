import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Header from "../components/Header";
import EntryList from "../components/EntryList";
import './Home.css';  // Add your custom styling

const Home = () => {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [yearTotal, setYearTotal] = useState(0);
    const [topCategories, setTopCategories] = useState([]);

    useEffect(() => {
        // Fetch the necessary data from API
        const fetchData = async () => {
            try {
                const expensesResponse = await api.get('expenses/current-month');
                setTotalExpenses(expensesResponse.data.total);

                const yearResponse = await api.get('expenses/year-total');
                setYearTotal(yearResponse.data.total);

                const categoriesResponse = await api.get('expenses/top-categories');
                setTopCategories(categoriesResponse.data.categories);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home">
            {/* Top section: expenses and categories */}
            <div className="top-section">
                <h1>Current Month Expenses</h1>
                <div className="expenses">
                    <div>Total Expenses: ₹{totalExpenses}</div>
                    <div>Total This Year: ₹{yearTotal}</div>
                    <div className="top-categories">
                        <h2>Top 3 Expense Categories</h2>
                        <ul>
                            {topCategories.map((category, index) => (
                                <li key={index}>{category.name}: ₹{category.amount}</li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/visualizations">
                        <button className="visualization-btn">View Custom Visualizations</button>
                    </Link>
                </div>
            </div>

            {/* Bottom section: entries list */}
            <div className="entry-list-section">
                <Header />
                <EntryList />
            </div>
        </div>
    );
};

export default Home;

