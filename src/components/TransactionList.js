import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/transactions/')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.category}: {transaction.amount} INR
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;

