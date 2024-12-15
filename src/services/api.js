import axios from 'axios';

const API_BASE_URL = 'https://eventtriggeringapiv1.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Add a token to the request headers if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log('Token:', token); // Print the token to the console
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('No token found in localStorage'); // Inform if no token is available
    }
    return config;
});

export default api;
