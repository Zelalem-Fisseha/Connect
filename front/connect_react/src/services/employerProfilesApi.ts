import apiClient from './api';
import { AxiosResponse } from 'axios';

// Types
export interface EmployerProfile {
  id: number;
  user_id: number;
  company_name: string;
  company_description: string;
  location: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEmployerProfileData {
  company_name: string;
  company_description: string;
  location: string;
  industry: string;
}

export interface UpdateEmployerProfileData extends Partial<CreateEmployerProfileData> {}

// Employer Profiles API Service
class EmployerProfilesApi {
  private readonly endpoint = '/employer_profiles';

  // Get all employer profiles
  async getEmployerProfiles(): Promise<EmployerProfile[]> {
    try {
      const response: AxiosResponse<EmployerProfile[]> = await apiClient.get(this.endpoint);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch employer profiles:', error);
      throw error;
    }
  }

  // Get a specific employer profile by ID
  async getEmployerProfile(id: number): Promise<EmployerProfile> {
    try {
      const response: AxiosResponse<EmployerProfile> = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch employer profile ${id}:`, error);
      throw error;
    }
  }

  // Get employer profile by user ID
  async getEmployerProfileByUserId(userId: number): Promise<EmployerProfile> {
    try {
      const response: AxiosResponse<EmployerProfile> = await apiClient.get(`${this.endpoint}?user_id=${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch employer profile for user ${userId}:`, error);
      throw error;
    }
  }

  // Create a new employer profile
  async createEmployerProfile(data: CreateEmployerProfileData): Promise<EmployerProfile> {
    try {
      const response: AxiosResponse<EmployerProfile> = await apiClient.post(this.endpoint, {
        employer_profile: data
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create employer profile:', error);
      throw error;
    }
  }

  // Update an existing employer profile
  async updateEmployerProfile(id: number, data: UpdateEmployerProfileData): Promise<EmployerProfile> {
    try {
      const response: AxiosResponse<EmployerProfile> = await apiClient.put(`${this.endpoint}/${id}`, {
        employer_profile: data
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to update employer profile ${id}:`, error);
      throw error;
    }
  }

  // Delete an employer profile
  async deleteEmployerProfile(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Failed to delete employer profile ${id}:`, error);
      throw error;
    }
  }
}

export const employerProfilesApi = new EmployerProfilesApi();
