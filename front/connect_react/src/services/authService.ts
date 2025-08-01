import api, { getCsrfToken } from './api';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  ApiError
} from '@/types/auth';

const authService = {
  /**
   * Get CSRF token from the server
   * @returns {Promise<string>} CSRF token
   */
  getCsrfToken,

  /**
   * Login user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<AuthResponse>} Authentication response
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // Ensure we have a CSRF token before login
      await getCsrfToken();
      
      const response = await api.post<AuthResponse>('/login', { 
        email, 
        password 
      });
      
      // Store user role in localStorage for role-based routing
      if (response.data.user?.role) {
        localStorage.setItem('user_role', response.data.user.role);
      }
      
      // Refresh CSRF token after login
      await getCsrfToken();
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      // Clear CSRF token on login failure
      localStorage.removeItem('csrf_token');
      throw error;
    }
  },

  /**
   * Logout the current user
   * @returns {Promise<void>}
   */
  logout: async (): Promise<void> => {
    try {
      // Simple DELETE request since CSRF verification is disabled for the destroy action
      await api.delete('/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with cleanup even if logout request fails
      throw error; // Re-throw to allow error handling in components
    } finally {
      // Always clear auth-related data from localStorage
      localStorage.removeItem('user_role');
      localStorage.removeItem('csrf_token');
      // Clear any cached user data
      delete api.defaults.headers.common['Authorization'];
    }
  },

  /**
   * Get the current authenticated user
   * @returns {Promise<User>} Current user data
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/current_user');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {RegisterData} userData - User registration data
   * @returns {Promise<AuthResponse>} Registration response
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      // Ensure we have a CSRF token before registration
      await getCsrfToken();
      
      // Convert role string to number (0 for job_seeker, 1 for employer)
      const roleNumber = userData.role === 'employer' ? 1 : 0;
      
      // Format data for the API
      const formattedData = {
        user: {
          ...userData,
          name: userData.first_name + (userData.last_name ? ` ${userData.last_name}` : ''),
          role: roleNumber,
          // Ensure company_name is only included for employers
          ...(userData.role === 'employer' && userData.company_name 
            ? { company_name: userData.company_name } 
            : {})
        }
      };

      const response = await api.post<AuthResponse>('/register', formattedData);
      
      // Refresh CSRF token after registration
      await getCsrfToken();
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>} True if authenticated, false otherwise
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      await api.get('/check_auth');
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get stored user role from localStorage
   * @returns {'job_seeker' | 'employer' | null} User role or null if not set
   */
  getUserRole: (): 'job_seeker' | 'employer' | null => {
    const role = localStorage.getItem('user_role');
    return role === 'job_seeker' || role === 'employer' ? role : null;
  }
};

export default authService;
