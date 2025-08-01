class JobSeekerApplicationsController < ApplicationController
  before_action :set_job_seeker_profile
  
  # GET /job_seeker_profiles/:job_seeker_profile_id/applications
  def index
    @applications = @job_seeker_profile.applications
      .includes(:job_post)
      .order(created_at: :desc)
    
    render json: @applications.as_json(include: { 
      job_post: { 
        only: [:id, :title, :description, :location, :salary_min, :salary_max, :job_type, :is_active, :created_at]
      }
    })
  end

  private

  def set_job_seeker_profile
    @job_seeker_profile = JobSeekerProfile.find(params[:job_seeker_profile_id])
  end
end
