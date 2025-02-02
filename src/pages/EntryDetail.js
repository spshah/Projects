import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const EntryDetail = () => {
    const { entryId } = useParams();
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const fetchEntryDetail = async () => {
            try {
                const response = await api.get(`entries/${entryId}`);
                setEntry(response.data.entry);
            } catch (error) {
                console.error("Error fetching entry details", error);
            }
        };

        fetchEntryDetail();
    }, [entryId]);

    if (!entry) return <div>Loading...</div>;

    return (
        <div className="entry-detail">
            <h1>{entry.month}</h1>
            <div className="net-balance">
                <div>Total In: ₹{entry.totalIn}</div>
                <div>Total Out: ₹{entry.totalOut}</div>
            </div>
            <div className="transactions">
                {entry.transactions.map((transaction, index) => (
                    <div key={index}>
                        <div>{transaction.remark}</div>
                        <div>{transaction.amount}</div>
                    </div>
                ))}
            </div>
            <button>Add Entry</button>
        </div>
    );
};

export default EntryDetail;

