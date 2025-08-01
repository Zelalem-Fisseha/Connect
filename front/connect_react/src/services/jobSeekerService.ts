import api from './api';

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
  user: {
    id: number;
    name: string;
    email: string;
  };
}

/**
 * Service for handling job seeker profile related operations
 */
const jobSeekerService = {
  /**
   * Fetch all job seeker profiles
   * @returns {Promise<JobSeekerProfile[]>} Array of job seeker profiles
   */
  async getAllProfiles(): Promise<JobSeekerProfile[]> {
    try {
      const response = await api.get<JobSeekerProfile[]>('/job_seeker_profiles');
      return response.data;
    } catch (error) {
      console.error('Error fetching job seeker profiles:', error);
      throw error;
    }
  },

  /**
   * Fetch a single job seeker profile by ID
   * @param {number} id Profile ID
   * @returns {Promise<JobSeekerProfile>} Job seeker profile
   */
  async getProfileById(id: number): Promise<JobSeekerProfile> {
    try {
      const response = await api.get<JobSeekerProfile>(`/job_seeker_profiles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job seeker profile with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Search job seeker profiles by skills or title
   * @param {string} query Search query
   * @returns {Promise<JobSeekerProfile[]>} Filtered job seeker profiles
   */
  async searchProfiles(query: string): Promise<JobSeekerProfile[]> {
    try {
      const profiles = await this.getAllProfiles();
      const lowerQuery = query.toLowerCase();
      
      return profiles.filter(profile => 
        (profile.title?.toLowerCase().includes(lowerQuery) ||
        profile.skills?.toLowerCase().includes(lowerQuery)) ?? false
      );
    } catch (error) {
      console.error('Error searching job seeker profiles:', error);
      throw error;
    }
  },
};

export default jobSeekerService;
