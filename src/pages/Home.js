import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Header from "../components/Header";
import EntryList from "../components/EntryList";
import './Home.css';  // Add your custom styling
/*
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
            {/* Top section: expenses and categories }
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
            <button className="visualization-btn">Analysis</button>
        </Link>
    </div>
</div>

{ Bottom section: entries list }
            <div className="entry-list-section">
                <Header />
                <EntryList />
            </div>
        </div>
    );
};

export default Home;
*/


const transactions = [
    { date: '11 January 2025', description: 'Groceries - Vegetables', type: 'UPI', amount: 130, balance: -63193.80 },
    { date: '10 January 2025', description: 'Groceries - Milk and other', type: 'UPI', amount: 66, balance: -63063.80 },
    // ... more transactions
];
const Home = () => {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [yearTotal, setYearTotal] = useState(0);
    const [topCategories, setTopCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTransactions = transactions.filter(transaction => {
        const search = searchTerm.toLowerCase();
        return transaction.description.toLowerCase().includes(search) ||
            transaction.type.toLowerCase().includes(search) ||
            transaction.amount.toString().includes(search);
    });

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
        <div className="container">
            <div className="header">
                <div className="header-left">
                    <span>January</span>
                    <button className="add-member">Add Member, Book Activity etc</button>
                </div>
                <div className="header-right">
                    <button className="pdf-button">PDF</button>
                </div>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by remark or amount"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="search-button">Q</button> {/* Consider using an icon here */}
            </div>

            <div className="summary">
                <div className="summary-item">
                    <span>Net Balance</span>
                    <span>-63,193.80</span>
                </div>
                <div className="summary-item">
                    <span>Total In (+)</span>
                    <span>12,110</span>
                </div>
                <div className="summary-item">
                    <span>Total Out (-)</span>
                    <span>75,303.80</span>
                </div>
            </div>

            <div className="filter-options">
                <select>
                    <option>Select Date</option>
                </select>
                <select>
                    <option>Entry Type</option>
                </select>
                <select>
                    <option>Member</option>
                </select>
            </div>

            <button className="view-reports">VIEW REPORTS ></button>

            <div className="transactions">
                <p>Showing {filteredTransactions.length} entries</p>
                {filteredTransactions.map((transaction, index) => (
                    <div key={index} className="transaction">
                        <div className="transaction-date">{transaction.date}</div>
                        <div className="transaction-details">
                            <div className="transaction-description">{transaction.description}</div>
                            <div className="transaction-type">{transaction.type}</div>
                        </div>
                        <div className="transaction-amount">{transaction.amount}</div>
                        <div className="transaction-balance">Balance: {transaction.balance}</div>
                    </div>
                ))}
            </div>

            <div className="bottom-buttons">
                <button className="cash-in">CASH IN</button>
                <button className="cash-out">CASH OUT</button>
            </div>

            {/*
            <div className="home">
                { Top section: expenses and categories }
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
                            <button className="visualization-btn">Analysis</button>
                        </Link>
                    </div>
                </div>

                {Bottom section: entries list}
                <div className="entry-list-section">
                    <Header />
                    <EntryList />
                </div>
            </div>*/}
        </div>
    );
};

export default Home;