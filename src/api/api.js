import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';  // Django backend API URL

export const fetchTransactions = () => {
    return axios.get(`${API_URL}transactions/`)
        .then(response => response.data)
        .catch(error => console.error("Error fetching transactions:", error));
};

