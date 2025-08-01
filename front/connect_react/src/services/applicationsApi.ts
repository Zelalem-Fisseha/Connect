import apiClient from './api';
import { AxiosResponse } from 'axios';

// Types for job seeker profile
export interface JobSeekerProfile {
  id: number;
  user_id: number;
  title: string;
  bio: string;
  years_of_experience: number;
  skills: string;
  availability_status: string;
  portfolio_url?: string;
  created_at: string;
  updated_at: string;
}

// Types
export interface Application {
  id: number;
  job_post_id: number;
  job_seeker_profile_id: number;
  cover_letter: string;
  status: number;
  created_at: string;
  updated_at: string;
  job_post?: {
    id: number;
    description: string;
    location: string;
    salary_min: number;
    salary_max: number;
    job_type: number;
    is_active: boolean;
    created_at: string;
  };
}

export interface JobSeekerProfileRef {
  id: number;
}

export interface CreateApplicationData {
  job_seeker_profile: JobSeekerProfileRef;
  cover_letter: string;
  status?: number;
}

// Helper function to get job seeker profile by user ID
const getJobSeekerProfile = async (userId: number): Promise<JobSeekerProfile> => {
  try {
    const response = await apiClient.get<JobSeekerProfile>(`/job_seeker_profiles/by_user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch job seeker profile:', error);
    throw error;
  }
};

// Applications API Service
class ApplicationsApi {
  // Get all applications for the current user (job seeker)
  async getMyApplications(userId: number): Promise<Application[]> {
    try {
      // First get the user's job seeker profile
      const profile = await getJobSeekerProfile(userId);
      
      // Then fetch applications for this profile
      const response: AxiosResponse<Application[]> = await apiClient.get(
        `/job_seeker_profiles/${profile.id}/applications`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      throw error;
    }
  }

  // Submit a new application for a job post
  async createApplication(userId: number, jobPostId: number, data: Omit<CreateApplicationData, 'job_seeker_profile'>): Promise<Application> {
    try {
      // First, get the job seeker profile for this user
      const profile = await getJobSeekerProfile(userId);
      
      // Then submit the application with the profile ID
      const response: AxiosResponse<Application> = await apiClient.post(
        `/job_posts/${jobPostId}/applications`,
        {
          application: {
            job_seeker_profile_id: profile.id,
            ...data
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to submit application:', error);
      throw error;
    }
  }

  // Get application status as text
  getStatusText(status: number): string {
    const statusMap: Record<number, string> = {
      0: 'Pending',
      1: 'Under Review',
      2: 'Shortlisted',
      3: 'Rejected',
      4: 'Hired'
    };
    return statusMap[status] || 'Unknown';
  }

  // Get status badge variant based on status
  getStatusVariant(status: number): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' {
    const variantMap: Record<number, 'default' | 'secondary' | 'destructive' | 'outline' | 'success'> = {
      0: 'secondary',
      1: 'default',
      2: 'outline',
      3: 'destructive',
      4: 'success'
    };
    return variantMap[status] || 'secondary';
  }
}

export const applicationsApi = new ApplicationsApi();
