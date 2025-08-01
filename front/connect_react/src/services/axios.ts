import axios from 'axios';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth tokens, logging, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors, logging, etc.
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', error.response?.data || error.message);
    }
    
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login or clear auth
      localStorage.removeItem('authToken');
      // You can add redirect logic here if needed
    }
    
    if (error.response?.status === 403) {
      // Forbidden - show appropriate message
      console.error('Access forbidden');
    }
    
    if (error.response?.status >= 500) {
      // Server error - show generic error message
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
