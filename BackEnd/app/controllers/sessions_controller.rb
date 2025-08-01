class SessionsController < ApplicationController
  # Skip CSRF verification for destroy action (logout)
  skip_before_action :verify_authenticity_token, only: [:destroy]
  
  # cookie based authentication based on user role {enum: role: { job_seeker: 0, employer: 1 }}

  def create
    # CSRF verification is handled by ApplicationController's verify_csrf_token
    # which is called as a before_action for all non-GET requests
    
    # Parse JSON body if content-type is application/json
    json_params = request.content_type == 'application/json' ? JSON.parse(request.body.read) : params
    
    user = User.find_by(email: json_params['email'] || json_params[:email])

    if user&.authenticate(json_params['password'] || json_params[:password])
      # Regenerate session ID on login
      reset_session
      
      # Set session variables
      session[:user_id] = user.id
      session[:role] = user.role
      
      # Generate a new CSRF token
      csrf_token = form_authenticity_token
      
      # Set CSRF token in response headers
      response.set_header('X-CSRF-Token', csrf_token)
      
      # Prepare user data for response
      user_data = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
      
      # Add company_name if user is an employer
      if user.role == User::ROLES[:employer] && user.employer_profile.present?
        user_data[:company_name] = user.employer_profile.company_name
      end
      
      render json: { 
        message: "Logged in successfully",
        role: user.role,
        user: user_data,
        csrf_token: csrf_token
      }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    # Generate a new CSRF token before clearing the session
    csrf_token = form_authenticity_token
    
    # Clear the entire session
    reset_session
    
    # Set new CSRF token in response headers for the next request
    response.set_header('X-CSRF-Token', csrf_token)
    
    render json: { 
      message: "Logged out successfully",
      csrf_token: csrf_token
    }, status: :ok
  end

  # GET /csrf_token
  def csrf_token
    token = form_authenticity_token
    
    # Set the CSRF token in the response headers
    response.set_header('X-CSRF-Token', token)
    
    render json: { 
      csrf_token: token,
      message: 'CSRF token generated successfully'
    }
  end
  
  def current_user
    if session[:user_id]
      begin
        user = User.includes(:job_seeker_profile, :employer_profile).find(session[:user_id])
        Rails.logger.info "User found: #{user.inspect}"
        user_data = user.as_json(only: [:id, :name, :email, :role])
        
        # Check if user has any profile
        if user.job_seeker_profile
          user_data[:profile] = user.job_seeker_profile.as_json
          user_data[:profile_type] = 'job_seeker'
        elsif user.employer_profile
          user_data[:profile] = user.employer_profile.as_json
          user_data[:profile_type] = 'employer'
        else
          # No profile exists yet
          user_data[:profile] = nil
          user_data[:profile_type] = nil
        end
        
        Rails.logger.info "User data to be returned: #{user_data.inspect}"
        render json: user_data, status: :ok
      rescue ActiveRecord::RecordNotFound => e
        Rails.logger.error "User not found: #{e.message}"
        reset_session
        render json: { error: "User not found" }, status: :not_found
      end
    else
      render json: { error: "No user logged in" }, status: :unauthorized
    end
  end

  private
  
  def session_params
    params.require(:session).permit(:email, :password)
  end
end
