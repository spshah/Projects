import React, { useState } from 'react';
import axios from 'axios';

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
        const newTransaction = {
            amount,
            remark,
            category,
            payment_mode: paymentMode,
            date
        };
        axios.post('http://127.0.0.1:8000/api/transactions/', newTransaction)
            .then(response => {
                console.log('Transaction Saved:', response.data);
            })
            .catch(error => {
                console.error('Error saving transaction:', error);
            });
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
                </div>
            </form>
        </div>
    );
};
import axios from 'axios';

// Function to get transaction data
const fetchTransactionData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/transactions/');
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
export default AddTransaction;

