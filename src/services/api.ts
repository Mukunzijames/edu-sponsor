"use client";
import axios from "axios";
import Cookies from 'js-cookie';


const API_URL = "https://edu-sponsor-api.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method, config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network Error: Unable to connect to API server');
      console.error('Error details:', error.message);
      
      // Create a custom error for network issues
      const networkError = new Error('Unable to connect to server. Please check your internet connection or try again later.');
      networkError.name = 'NetworkError';
      return Promise.reject(networkError);
    }
    
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      Cookies.remove('auth_token');
      localStorage.removeItem('user');
      
      // Only redirect if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 