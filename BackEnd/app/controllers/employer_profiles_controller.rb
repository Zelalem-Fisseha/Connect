class EmployerProfilesController < ApplicationController
  before_action :set_user
  def show
    logger.info "[EmployerProfiles] Fetching employer profile for user_id: #{@user.id}"
    
    begin
      @employer_profile = @user.employer_profile

      if @employer_profile
        logger.info "[EmployerProfiles] Found employer profile: #{@employer_profile.id} for user: #{@user.id}"
        render json: @employer_profile.as_json(only: [
          :id,
          :user_id,
          :company_name,
          :company_description,
          :industry,
          :location,
          :created_at,
          :updated_at
        ])
      else
        logger.error "[EmployerProfiles] No employer profile found for user_id: #{@user.id}"
        render json: { error: 'Employer profile not found' }, status: :not_found
      end
    rescue => e
      logger.error "[EmployerProfiles] Error fetching employer profile for user_id: #{@user.id}. Error: #{e.message}"
      logger.error e.backtrace.join("\n")
      render json: { error: 'Internal server error' }, status: :internal_server_error
    end
  end
  def create
    @employer_profile = @user.build_employer_profile(employer_profile_params)

    if @employer_profile.save
      render json: @employer_profile,
       status: :created,
       location: user_employer_profile_url(@user)

    else
      render json: @employer_profile.errors, status: :unprocessable_entity
    end
  end
  def update
    @employer_profile = @user.employer_profile

    if @employer_profile.update(employer_profile_params)
      render json: @employer_profile
    else
      render json: @employer_profile.errors, status: :unprocessable_entity
    end
  end
  def destroy
    @employer_profile = @user.employer_profile

    if @employer_profile
      @employer_profile.destroy
      head :no_content
    else
      render json: { error: 'Employer profile not found' }, status: :not_found
    end
  end
  private

  def set_user
    begin
      user_id = params[:user_id]
      logger.info "[EmployerProfiles] Looking up user with id: #{user_id}"
      
      @user = User.find(user_id)
      
      unless @user.employer?
        logger.warn "[EmployerProfiles] User #{user_id} is not an employer (role: #{@user.role})"
      end
      
      @user
    rescue ActiveRecord::RecordNotFound => e
      logger.error "[EmployerProfiles] User not found with id: #{user_id}"
      render json: { error: 'User not found' }, status: :not_found
    rescue => e
      logger.error "[EmployerProfiles] Error looking up user #{user_id}: #{e.message}"
      logger.error e.backtrace.join("\n")
      render json: { error: 'Internal server error' }, status: :internal_server_error
    end
  end
  def employer_profile_params
    params.require(:employer_profile).permit(
      :company_name,
      :company_description,
      :industry,
      :location,
    )
  end
end
