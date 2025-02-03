import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionDetails = () => {
    const { id } = useParams(); // Get transaction ID from URL
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        try {
            const response = await axios.get(`/api/transactions/${id}/`);
            setTransaction(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch transaction");
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                await axios.delete(`/api/transactions/${id}/`);
                navigate("/transactions"); // Redirect after deletion
            } catch (err) {
                setError("Error deleting transaction");
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
            <div className="bg-gray-100 p-4 rounded shadow-md">
                <p><strong>Date:</strong> {transaction.date}</p>
                <p><strong>Amount:</strong> ₹{transaction.amount}</p>
                <p><strong>Category:</strong> {transaction.category}</p>
                <p><strong>Remarks:</strong> {transaction.remarks || "No remarks"}</p>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => navigate(`/edit-transaction/${id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TransactionDetails;
