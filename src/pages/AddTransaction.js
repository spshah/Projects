import React, { useState } from 'react';
import './AddTransaction.css';

const AddTransaction = () => {
    const [amount, setAmount] = useState('');
    const [remark, setRemark] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMode, setPaymentMode] = useState([]);
    const [date, setDate] = useState('');
    
    const handlePaymentModeChange = (event) => {
        const value = event.target.value;
        setPaymentMode(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    };

    const handleSave = () => {
        // Add save functionality here
        console.log('Transaction Saved:', { amount, remark, category, paymentMode, date });
    };

    const handleSaveAndAddNew = () => {
        // Add save and add new functionality here
        console.log('Save and Add New');
    };

    return (
        <div className="add-transaction">
            <h1>Add Transaction</h1>
            <form>
                <label>Date:</label>
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />

                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

                <label>Remark:</label>
                <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />

                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="savings">Savings</option>
                </select>

                <label>Payment Mode:</label>
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" value="Cash" onChange={handlePaymentModeChange} /> Cash
                    </label>
                    <label>
                        <input type="checkbox" value="Card" onChange={handlePaymentModeChange} /> Card
                    </label>
                    <label>
                        <input type="checkbox" value="UPI" onChange={handlePaymentModeChange} /> UPI
                    </label>
                </div>

                <div className="buttons">
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={handleSaveAndAddNew}>Save and Add New</button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;

