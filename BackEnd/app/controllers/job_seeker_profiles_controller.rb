class JobSeekerProfilesController < ApplicationController
  before_action :set_user

  def show
    @job_seeker_profile = @user.job_seeker_profile

    if @job_seeker_profile
      render json: @job_seeker_profile
    else
      render json: { error: 'Job seeker profile not found' }, status: :not_found
    end
  end
  def create
    @job_seeker_profile = @user.build_job_seeker_profile(job_seeker_profile_params)

    if @job_seeker_profile.save
      render json: @job_seeker_profile,
       status: :created,
       location: user_job_seeker_profile_url(@user)

    else
      render json: @job_seeker_profile.errors, status: :unprocessable_entity
    end
  end
  def update
    @job_seeker_profile = @user.job_seeker_profile

    if @job_seeker_profile.update(job_seeker_profile_params)
      render json: @job_seeker_profile
    else
      render json: @job_seeker_profile.errors, status: :unprocessable_entity
    end
  end
  def destroy
    @job_seeker_profile = @user.job_seeker_profile

    if @job_seeker_profile
      @job_seeker_profile.destroy
      head :no_content
    else
      render json: { error: 'Job seeker profile not found' }, status: :not_found
    end
  end

  # GET /job_seeker_profiles/by_user/:user_id
  def by_user
    user = User.find(params[:user_id])
    @job_seeker_profile = user.job_seeker_profile

    if @job_seeker_profile
      render json: @job_seeker_profile
    else
      render json: { error: 'Job seeker profile not found for this user' }, status: :not_found
    end
  end
  private
  def set_user
    @user = User.find(params[:user_id])
  end
  def job_seeker_profile_params
    params.require(:job_seeker_profile).permit( :title,
    :bio,
    :years_of_experience,
    :skills,
    :availability_status,
    :portfolio_url)
  end
end
