class EmployerProfilesController < ApplicationController
  before_action :set_user
  def show
    @employer_profile = @user.employer_profile

    if @employer_profile
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
      render json: { error: 'Employer profile not found' }, status: :not_found
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
    @user = User.find(params[:user_id])
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
