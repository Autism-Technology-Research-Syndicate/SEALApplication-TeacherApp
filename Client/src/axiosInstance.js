import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Set the base URL for your API
});

// Add a request interceptor to include the Bearer token in the headers
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance; // Export the Axios instance
