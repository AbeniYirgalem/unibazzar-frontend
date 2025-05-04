import axios from 'axios';
import { refreshToken } from '../store/authSlice';
import store from '../store';

// Create axios instance with baseURL
const api = axios.create({
  baseURL: 'https://api.unibazzar.com', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors (expired token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 (Unauthorized) and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await store.dispatch(refreshToken());
        
        // If token refresh was successful, update the Authorization header
        const state = store.getState();
        const newToken = state.auth.accessToken;
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If token refresh fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;