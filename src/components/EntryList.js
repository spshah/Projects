import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EntryList = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await axios.get("/api/entries/");
            setEntries(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
        } finally {
            setLoading(false);
        }
    };

    const filteredEntries = entries.filter(entry =>
        entry.month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search by month..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filteredEntries.map((entry) => (
                <Link
                    to={`/entry/${entry.id}`}
                    key={entry.id}
                    className="block p-4 mb-2 bg-gray-100 rounded shadow-md flex justify-between items-center"
                >
                    <div>
                        <p className="font-semibold">{entry.month}</p>
                        <p className="text-sm text-gray-500">Updated: {entry.last_updated}</p>
                    </div>
                    <p className={`text-lg font-bold ${entry.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
                        ₹{Math.abs(entry.balance)}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default EntryList;
