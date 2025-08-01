class SessionsController < ApplicationController
  # cookie based authentication based on user role {enum: role: { job_seeker: 0, employer: 1 }}

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      session[:role] = user.role
      render json: { message: "Logged in successfully", role: user.role }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    session[:role] = nil
    render json: { message: "Logged out successfully" }, status: :ok
  end

  def current_user
    if session[:user_id]
      user = User.find(session[:user_id])
      render json: user.as_json(only: [ :id, :name, :email, :role ]), status: :ok
    else
      render json: { error: "No user logged in" }, status: :unauthorized
    end
  end

  private
  def session_params
    params.require(:session).permit(:email, :password)
  end
end
