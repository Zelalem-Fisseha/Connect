import axios from 'axios';
import api from './api';

const API_URL = 'http://localhost:3000';

export interface JobPost {
  id?: number;
  employer_profile_id?: number;
  description: string;
  required_skills: string[] | string;
  salary_min: number | string;
  salary_max: number | string;
  job_type: number;
  location: string;
  application_deadline: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Headers are automatically handled by the api instance

export const jobPostService = {
  // Create a new job post
  createJobPost: async (jobData: Omit<JobPost, 'id' | 'created_at' | 'updated_at' | 'employer_profile_id'>) => {
    try {
      const response = await api.post('/job_posts', { job_post: jobData });
      return response.data;
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  },

  // Get all job posts for the current employer
  getEmployerJobPosts: async () => {
    try {
      const response = await api.get('/job_posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching job posts:', error);
      throw error;
    }
  },

  // Get a single job post by ID
  getJobPostById: async (id: number) => {
    try {
      const response = await api.get(`/job_posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job post ${id}:`, error);
      throw error;
    }
  },

  // Update a job post
  updateJobPost: async (id: number, jobData: Partial<JobPost>) => {
    try {
      const response = await api.put(`/job_posts/${id}`, { job_post: jobData });
      return response.data;
    } catch (error) {
      console.error(`Error updating job post ${id}:`, error);
      throw error;
    }
  },

  // Delete a job post
  deleteJobPost: async (id: number) => {
    try {
      const response = await api.delete(`/job_posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting job post ${id}:`, error);
      throw error;
    }
  },

  // Toggle job post active status
  toggleJobPostStatus: async (id: number, isActive: boolean) => {
    try {
      const response = await api.patch(`/job_posts/${id}/toggle_status`, { is_active: isActive });
      return response.data;
    } catch (error) {
      console.error(`Error toggling job post ${id} status:`, error);
      throw error;
    }
  }
};

export default jobPostService;
