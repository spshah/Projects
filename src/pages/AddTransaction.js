import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const AddTransaction = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const entryId = searchParams.get("entry"); // Get entry (month) ID from URL
    const [formData, setFormData] = useState({
        date: "",
        amount: "",
        category: "",
        remarks: "",
        payment_mode: "",
        entry: entryId, // Link transaction to the selected month
    });

    const categories = {
        income: ["Salary", "Meal Card (Pluxee)", "Misc Income"],
        expense: ["Groceries", "Bills", "Entertainment", "Eating Out", "Misc", "Transportation", "Personal", "Medicines", "Petrol", "Snacks", "Utilities"],
        savings: ["Investment", "Savings", "Fixed Deposit (FD)"],
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/transactions/", formData);
            navigate(`/entry/${entryId}`); // Redirect to entry details page
        } catch (err) {
            console.error("Error adding transaction", err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Add Transaction</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <label className="block">
                    Date:
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </label>

                <label className="block">
                    Amount (₹):
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </label>

                <label className="block">
                    Category:
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        <optgroup label="Income">
                            {categories.income.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </optgroup>
                        <optgroup label="Expense">
                            {categories.expense.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </optgroup>
                        <optgroup label="Savings">
                            {categories.savings.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </optgroup>
                    </select>
                </label>

                <label className="block">
                    Remarks:
                    <input
                        type="text"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </label>

                <label className="block">
                    Payment Mode:
                    <input
                        type="text"
                        name="payment_mode"
                        value={formData.payment_mode}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </label>

                <div className="flex space-x-3">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                    >
                        Save & Add New
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/entry/${entryId}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;




const AddCashInEntry = () => {
    const [formData, setFormData] = useState({
        date: '31/01/2025', // Set default date if needed
        time: '11:57 pm', // Set default time if needed
        amount: '',
        remark: '',
        category: '',
        paymentMode: 'Cash', // Default payment mode
        image: null, // For image upload
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to API)
        console.log(formData);
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <button className="back-button">Back</button> {/* Replace with your back icon */}
                <span className="form-title">Add Cash In Entry</span>
                <button className="settings-button">Settings</button> {/* Replace with your settings icon */}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="date">Date and Time</label>
                    <div className="date-time">
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="amount">Amount *</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="remark">Remark</label>
                    <input
                        type="text"
                        id="remark"
                        name="remark"
                        value={formData.remark}
                        onChange={handleChange}
                    />
                    <button className="mic-button">Mic</button> {/* Replace with your mic icon */}
                </div>

                <div className="input-group">
                    <label htmlFor="image">Attach Image or PDF</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="category">Category *</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {/* Add your category options here */}
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="paymentMode">Payment Mode *</label>
                    <div className="payment-options">
                        <label>
                            <input
                                type="radio"
                                name="paymentMode"
                                value="Cash"
                                checked={formData.paymentMode === 'Cash'}
                                onChange={handleChange}
                            />
                            Cash
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMode"
                                value="UPI"
                                checked={formData.paymentMode === 'UPI'}
                                onChange={handleChange}
                            />
                            UPI
                        </label>
                        <button className="show-more">Show More</button> {/* Add more payment options as needed */}
                    </div>
                </div>

                <button type="button" className="add-more-fields">Add More Fields</button>

                <div className="form-buttons">
                    <button type="submit" className="save-add-new">SAVE & ADD NEW</button>
                    <button type="submit" className="save">SAVE</button>
                </div>
            </form>
        </div>
    );
};

export default AddCashInEntry;