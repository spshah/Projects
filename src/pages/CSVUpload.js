import React, { useState } from 'react';
import api from '../api';

const CSVUpload = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('csv_file', csvFile);

        try {
            // eslint-disable-next-line
            const response = await api.post('import-csv/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('CSV imported successfully!');
        } catch (error) {
            setMessage('Error uploading CSV!');
        }
    };

    return (
        <div>
            <h1>CSV Import</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload CSV</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CSVUpload;

