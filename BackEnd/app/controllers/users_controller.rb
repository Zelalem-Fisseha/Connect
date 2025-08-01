class UsersController < ApplicationController
  # Don't set user for create action
  before_action :set_user, only: [:show, :update, :destroy], except: [:create]
  
  # We want CSRF verification for registration to prevent CSRF attacks
  # The verify_authenticity_token method is overridden in ApplicationController
  # to properly handle JSON API requests

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/:id
  def show
    render json: @user
  end

  # POST /register
  def create
    # Parse JSON body if content-type is application/json
    json_params = request.content_type == 'application/json' ? JSON.parse(request.body.read) : params
    user_params = json_params['user'] || json_params[:user] || {}
    
    # Log the incoming parameters for debugging
    Rails.logger.info "Registration params: #{user_params.inspect}"
    
    @user = User.new(
      name: user_params[:name] || user_params['name'],
      email: user_params[:email] || user_params['email'],
      password: user_params[:password] || user_params['password'],
      password_confirmation: user_params[:password_confirmation] || user_params['password_confirmation'],
      role: user_params[:role] || user_params['role'] || 0
    )

    if @user.save
      # Log in the user after successful registration
      reset_session # Clear any existing session data
      session[:user_id] = @user.id
      session[:role] = @user.role
      
      # Generate a new CSRF token for the new session
      csrf_token = form_authenticity_token
      
      # Set the CSRF token in the response headers
      response.set_header('X-CSRF-Token', csrf_token)
      
      render json: { 
        id: @user.id,
        name: @user.name,
        email: @user.email,
        role: @user.role,
        message: 'Registration successful',
        csrf_token: csrf_token
      }, status: :created
    else
      Rails.logger.error "Registration failed: #{@user.errors.full_messages}"
      render json: { 
        error: 'Registration failed',
        errors: @user.errors.full_messages 
      }, status: :unprocessable_entity
    end
  rescue JSON::ParserError => e
    Rails.logger.error "JSON parse error: #{e.message}"
    render json: { error: 'Invalid JSON format' }, status: :bad_request
  end
  
  # PATCH/PUT /users/:id
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :role)
  end
end
