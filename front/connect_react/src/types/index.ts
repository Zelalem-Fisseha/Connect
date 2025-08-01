export interface User {
  id: number;
  email: string;
  role: 'job_seeker' | 'employer' | 'admin';
  created_at: string;
  updated_at: string;
  job_seeker_profile?: JobSeekerProfile;
  employer_profile?: EmployerProfile;
}

export interface JobSeekerProfile {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country: string;
  bio?: string;
  skills: string[];
  experience_years: number;
  education_level: string;
  resume_url?: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployerProfile {
  id: number;
  user_id: number;
  company_name: string;
  company_description?: string;
  company_website?: string;
  company_logo_url?: string;
  company_size?: string;
  industry?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface JobPost {
  id: number;
  employer_profile_id: number;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  job_type: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'internship';
  salary_min: number;
  salary_max: number;
  salary_type: 'yearly' | 'monthly' | 'hourly';
  is_remote: boolean;
  status: 'draft' | 'published' | 'closed' | 'archived';
  application_deadline: string;
  created_at: string;
  updated_at: string;
  employer_profile?: EmployerProfile;
}

export interface Application {
  id: number;
  job_post_id: number;
  job_seeker_profile_id: number;
  cover_letter: string;
  status: number;
  created_at: string;
  updated_at: string;
  job_post?: JobPost;
  job_seeker_profile?: JobSeekerProfile;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
