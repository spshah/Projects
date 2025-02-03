import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EntryDetail = () => {
    const { id } = useParams(); // Get entry ID from URL
    const navigate = useNavigate();
    const [entry, setEntry] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEntryDetails();
    }, []);

    const fetchEntryDetails = async () => {
        try {
            const response = await axios.get(`/api/entries/${id}/`);
            setEntry(response.data.entry);
            setTransactions(response.data.transactions);
        } catch (err) {
            setError("Failed to fetch entry details");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                await axios.delete(`/api/transactions/${transactionId}/`);
                setTransactions(transactions.filter((t) => t.id !== transactionId));
            } catch (err) {
                setError("Error deleting transaction");
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{entry.month}</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => navigate(`/visualize/${id}`)}
                >
                    📊 View Reports
                </button>
            </div>

            {/* Balance Summary */}
            <div className="bg-gray-100 p-4 rounded shadow-md">
                <p><strong>Net Balance:</strong> ₹{entry.balance}</p>
                <p><strong>Total Income:</strong> ₹{entry.total_income}</p>
                <p><strong>Total Expenses:</strong> ₹{entry.total_expense}</p>
            </div>

            {/* Transactions List */}
            <h3 className="mt-4 font-semibold">Transactions</h3>
            <div className="mt-2">
                {transactions.length === 0 ? (
                    <p>No transactions found.</p>
                ) : (
                    transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="p-2 bg-white rounded shadow-md flex justify-between items-center mb-2"
                        >
                            <div>
                                <p className="font-semibold">{transaction.category}</p>
                                <p className="text-sm text-gray-500">{transaction.remarks || "No remarks"}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className={`font-bold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                                    ₹{Math.abs(transaction.amount)}
                                </p>
                                <button
                                    onClick={() => handleDeleteTransaction(transaction.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    ❌
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Transaction Button */}
            <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
                onClick={() => navigate(`/add-transaction/${id}`)}
            >
                ➕ Add Transaction
            </button>
        </div>
    );
};

export default EntryDetail;

