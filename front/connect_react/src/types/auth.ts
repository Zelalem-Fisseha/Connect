// Types for authentication

export interface User {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  role?: 'job_seeker' | 'employer';
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  password_confirmation: string;
  role: 'job_seeker' | 'employer';
  first_name?: string;
  last_name?: string;
  company_name?: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  access_token?: string;
  refresh_token?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}
