import axios from 'axios';

// 1. Create a customized Axios instance pointing to your Express backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// 2. Set up the Request Interceptor
API.interceptors.request.use(
  (config) => {
    // Check if we have a user saved in the browser's localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // If a user exists AND they have a token, attach it to the request headers
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    // Send the modified request on its way
    return config;
  },
  (error) => {
    // If something goes wrong with the request itself, reject it
    return Promise.reject(error);
  }
);

export default API;