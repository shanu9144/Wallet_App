import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wallet-app-fdwh.onrender.com/api', // Ensure this matches your backend server URL
    withCredentials: true, // Ensure credentials are sent with requests
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        console.error('API error:', error);
        console.error('Error details:', error.message, error.stack); // Detailed error logging
        return Promise.reject(error);
    }
);

export default instance;
