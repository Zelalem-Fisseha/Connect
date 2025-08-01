import apiClient from './axios';
import { AxiosResponse } from 'axios';

// Types
export interface JobPost {
  id: number;
  employer_profile_id: number;
  description: string;
  required_skills: string;
  salary_min: number;
  salary_max: number;
  job_type: number;
  location: string;
  application_deadline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateJobPostData {
  description: string;
  required_skills: string;
  salary_min: number;
  salary_max: number;
  job_type: number;
  location: string;
  application_deadline: string;
  is_active: boolean;
}

export interface UpdateJobPostData extends Partial<CreateJobPostData> {}

// Job Posts API Service
class JobPostsApi {
  private readonly endpoint = '/job_posts';

  // Get all job posts for the current employer
  async getJobPosts(): Promise<JobPost[]> {
    try {
      const response: AxiosResponse<JobPost[]> = await apiClient.get(this.endpoint);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch job posts:', error);
      throw error;
    }
  }

  // Get a specific job post by ID
  async getJobPost(id: number): Promise<JobPost> {
    try {
      const response: AxiosResponse<JobPost> = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch job post ${id}:`, error);
      throw error;
    }
  }

  // Create a new job post
  async createJobPost(data: CreateJobPostData): Promise<JobPost> {
    try {
      const response: AxiosResponse<JobPost> = await apiClient.post(this.endpoint, {
        job_post: data
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create job post:', error);
      throw error;
    }
  }

  // Update an existing job post
  async updateJobPost(id: number, data: UpdateJobPostData): Promise<JobPost> {
    try {
      const response: AxiosResponse<JobPost> = await apiClient.put(`${this.endpoint}/${id}`, {
        job_post: data
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to update job post ${id}:`, error);
      throw error;
    }
  }

  // Delete a job post
  async deleteJobPost(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Failed to delete job post ${id}:`, error);
      throw error;
    }
  }

  // Toggle job post active status
  async toggleJobPostStatus(id: number): Promise<JobPost> {
    try {
      const response: AxiosResponse<JobPost> = await apiClient.patch(`${this.endpoint}/${id}/toggle_status`);
      return response.data;
    } catch (error) {
      console.error(`Failed to toggle job post ${id} status:`, error);
      throw error;
    }
  }

  // Get job posts by employer profile ID
  async getJobPostsByEmployer(employerProfileId: number): Promise<JobPost[]> {
    try {
      const response: AxiosResponse<JobPost[]> = await apiClient.get(`${this.endpoint}?employer_profile_id=${employerProfileId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch job posts for employer ${employerProfileId}:`, error);
      throw error;
    }
  }
}

export const jobPostsApi = new JobPostsApi();

// Helper functions for job type mapping
export const getJobTypeLabel = (jobType: number): string => {
  const jobTypes = {
    0: 'Full-time',
    1: 'Part-time',
    2: 'Contract',
    3: 'Freelance',
    4: 'Internship'
  };
  return jobTypes[jobType as keyof typeof jobTypes] || 'Unknown';
};

export const getJobTypeValue = (label: string): number => {
  const jobTypes = {
    'Full-time': 0,
    'Part-time': 1,
    'Contract': 2,
    'Freelance': 3,
    'Internship': 4
  };
  return jobTypes[label as keyof typeof jobTypes] || 0;
};

export const formatSalaryRange = (min: number, max: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  } else if (min) {
    return `From ${formatter.format(min)}`;
  } else if (max) {
    return `Up to ${formatter.format(max)}`;
  }
  return 'Salary not specified';
};

export const getSkillsArray = (skillsString: string): string[] => {
  return skillsString ? skillsString.split(',').map(skill => skill.trim()) : [];
};

export const formatSkillsString = (skillsArray: string[]): string => {
  return skillsArray.join(', ');
};
