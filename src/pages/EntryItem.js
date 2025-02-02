import React from 'react';
import { Link } from 'react-router-dom';

const EntryItem = ({ entry }) => {
    const balanceColor = entry.balance >= 0 ? 'green' : 'red';
    const balanceDisplay = entry.balance >= 0 ? `₹${entry.balance}` : `₹${Math.abs(entry.balance)}`;

    return (
        <div className="entry-item">
            <div className="left">
                <img src={entry.logo} alt={entry.month} />
                <div>
                    <div>{entry.month}</div>
                    <div>Last Updated: {entry.updated}</div>
                </div>
            </div>
            <div className="right" style={{ color: balanceColor }}>
                {balanceDisplay}
            </div>
            <Link to={`/entry/${entry.id}`}>View Details</Link>
        </div>
    );
};

export default EntryItem;

