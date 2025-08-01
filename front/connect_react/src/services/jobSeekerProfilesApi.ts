import api from './api';

export interface JobSeekerProfile {
  id: number;
  user_id: number;
  title: string;
  bio: string;
  years_of_experience: number;
  skills: string;
  availability_status: 'available' | 'not_available' | 'open_to_offers';
  portfolio_url?: string;
  created_at: string;
  updated_at: string;
}

interface CreateJobSeekerProfileParams {
  title: string;
  bio: string;
  years_of_experience: number;
  skills: string;
  availability_status: 'available' | 'not_available' | 'open_to_offers';
  portfolio_url?: string;
}

type UpdateJobSeekerProfileParams = Partial<CreateJobSeekerProfileParams>;

export const jobSeekerProfilesApi = {
  /**
   * Get the current user's job seeker profile
   * GET /users/:user_id/job_seeker_profile
   */
  getProfile: async (userId: number): Promise<JobSeekerProfile> => {
    const response = await api.get(`/users/${userId}/job_seeker_profile`);
    return response.data;
  },

  /**
   * Create a new job seeker profile
   * POST /users/:user_id/job_seeker_profile
   */
  createProfile: async (
    userId: number, 
    profileData: CreateJobSeekerProfileParams
  ): Promise<JobSeekerProfile> => {
    const response = await api.post(
      `/users/${userId}/job_seeker_profile`, 
      { job_seeker_profile: profileData },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  /**
   * Update an existing job seeker profile
   * PATCH /users/:user_id/job_seeker_profile
   */
  updateProfile: async (
    userId: number,
    profileData: UpdateJobSeekerProfileParams
  ): Promise<JobSeekerProfile> => {
    const response = await api.patch(
      `/users/${userId}/job_seeker_profile`,
      { job_seeker_profile: profileData },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  /**
   * Delete a job seeker profile
   * DELETE /users/:user_id/job_seeker_profile
   */
  deleteProfile: async (userId: number): Promise<void> => {
    await api.delete(`/users/${userId}/job_seeker_profile`, {
      withCredentials: true
    });
  }
};
