import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
            const response = await axios.get("/api/summary/");
            setSummary(response.data);
        } catch (err) {
            setError("Failed to fetch summary data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 bg-blue-500 text-white rounded-b-lg shadow-md">
            <h2 className="text-lg font-semibold">Financial Overview</h2>
            <p className="text-sm">Total Expenses This Month: ₹{summary.total_expense}</p>
            <p className="text-sm">Total Expenses This Year: ₹{summary.yearly_expense}</p>
            <p className="text-sm">Top 3 Expense Categories: {summary.top_categories.join(", ")}</p>
            <button className="mt-2 bg-white text-blue-500 px-4 py-2 rounded">
                View Detailed Reports
            </button>
        </div>
    );
};

export default Header;
