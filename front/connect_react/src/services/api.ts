import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Export CSRF token utility
export const getCsrfToken = async (): Promise<string> => {
  try {
    const response = await api.get<{ csrf_token: string }>('/csrf_token');
    const csrfToken = response.data.csrf_token;
    localStorage.setItem('csrf_token', csrfToken);
    return csrfToken;
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    // Clear any invalid token
    localStorage.removeItem('csrf_token');
    throw error;
  }
};

// Define API base URL from environment variable or default to local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with base URL
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/sessions
});

// Add a request interceptor to include CSRF token in requests
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip CSRF token for GET requests and public endpoints
    if (config.method?.toLowerCase() === 'get' || config.url === '/csrf_token') {
      return config;
    }

    try {
      // Always get a fresh CSRF token for each request
      const csrfToken = await getCsrfToken();
      
      // Create a new headers object with AxiosHeaders
      const headers = new AxiosHeaders({
        ...config.headers,
        'X-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHttpRequest'
      });
      
      // Return new config with updated headers
      return {
        ...config,
        headers,
        withCredentials: true // Ensure credentials are sent with every request
      };
    } catch (error) {
      console.error('Error getting CSRF token:', error);
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          console.error('Unauthorized access - please log in');
          // You might want to redirect to login here
          // window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          console.error('You do not have permission to perform this action');
          break;
        case 404:
          console.error('The requested resource was not found');
          break;
        case 422:
          // Handle validation errors
          console.error('Validation error:', error.response.data);
          break;
        case 500:
          console.error('Server error - please try again later');
          break;
        default:
          console.error('An error occurred');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response from server - please check your connection');
    } else {
      // Something happened in setting up the request
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
