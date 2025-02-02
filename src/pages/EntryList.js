import React, { useEffect, useState } from 'react';
import EntryItem from './EntryItem';
import api from '../api';

const EntryList = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await api.get('entries');
                setEntries(response.data.entries);
            } catch (error) {
                console.error("Error fetching entries", error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div className="entry-list">
            {entries.map((entry, index) => (
                <EntryItem key={index} entry={entry} />
            ))}
        </div>
    );
};

export default EntryList;

