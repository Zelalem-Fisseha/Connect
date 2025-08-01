class ApplicationsController < ApplicationController
  before_action :set_job_post
  
  def index
     @applications = @job_post.applications.includes(:job_seeker_profile)
    render json: @applications.as_json(include: { job_seeker_profile: { only: :title } })
  end
  
  def create
    @application = @job_post.applications.build(application_params)
    if @application.save
      render json: @application, status: :created
    else
      render json: @application.errors, status: :unprocessable_entity
    end
  end
  private
  def set_job_post
    @job_post = JobPost.find(params[:job_post_id])
  end
  def application_params
    params.require(:application).permit(
      :job_seeker_profile_id,
      :cover_letter,
      :status
    )
  end
end
