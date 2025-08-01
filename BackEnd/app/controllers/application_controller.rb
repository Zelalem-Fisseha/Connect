class ApplicationController < ActionController::Base
  include ActionController::RequestForgeryProtection
  include ActionController::Cookies
  
  # Enable CSRF protection for all requests
  protect_from_forgery with: :null_session, prepend: true
  
  # Skip CSRF protection for the CSRF token endpoint and other public endpoints
  skip_before_action :verify_authenticity_token, if: :should_skip_csrf_verification?
  
  # Handle CSRF token verification for API requests
  before_action :verify_csrf_token, unless: :should_skip_csrf_verification?
  
  private
  
  def verify_csrf_token
    return if request.get? || request.head?
    
    # Skip CSRF verification for API token endpoints
    return if controller_name == 'sessions' && action_name == 'create'
    
    # Check CSRF token from header or params
    csrf_token = request.headers['X-CSRF-Token'] || params[request_forgery_protection_token]
    
    unless valid_authenticity_token?(session, csrf_token)
      logger.warn "CSRF token verification failed for #{request.path}"
      render json: { error: 'Invalid CSRF token' }, status: :unprocessable_entity
    end
  end
  
  # Add a method to get CSRF token for API clients
  def csrf_token
    token = form_authenticity_token
    
    # Set the CSRF token in the response headers
    response.set_header('X-CSRF-Token', token)
    
    render json: { 
      csrf_token: token,
      message: 'CSRF token generated successfully'
    }
  end
  
  # Handle CSRF token verification errors
  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    render json: { error: 'Invalid CSRF token' }, status: :unprocessable_entity
  end
  
  # Ensure CSRF token is included in responses
  after_action :set_csrf_cookie
  
  private
  
  def set_csrf_cookie
    # Skip for these endpoints
    return if ['/logout', '/login', '/register', '/csrf_token', '/current_user'].include?(request.path)
    
    # Get or generate a CSRF token
    token = form_authenticity_token
    
    # Set the cookie with secure attributes
    cookie_options = {
      value: token,
      secure: Rails.env.production?,
      same_site: :lax,
      httponly: true,
      expires: 2.weeks.from_now,
      path: '/'
    }
    
    cookies['CSRF-TOKEN'] = cookie_options
    
    # Also set the token in the response headers for API clients
    response.set_header('X-CSRF-Token', token) unless response.committed? || response.headers['X-CSRF-Token'].present?
  end
  
  def json_request?
    request.format.json? || 
    request.content_type&.include?('application/json') ||
    request.headers['Accept']&.include?('application/json')
  end
  
  def handle_unverified_request
    if json_request?
      render json: { error: 'Invalid CSRF token' }, status: :unprocessable_entity
    else
      super
    end
  end
  
  # Check if we should skip CSRF verification for the current request
  def should_skip_csrf_verification?
    # Skip CSRF for API requests (JSON format)
    return true if request.content_type == 'application/json'
    
    # Skip for safe HTTP methods and specific endpoints
    request.get? || 
    request.head? || 
    request.path == '/csrf_token' ||
    (controller_name == 'sessions' && action_name == 'create') ||
    (controller_name == 'users' && action_name == 'create') ||
    (controller_name == 'job_seeker_profiles' && %w[create update destroy].include?(action_name))
  end
  
  # Override the verify_authenticity_token method to handle JSON requests
  def verify_authenticity_token
    return if should_skip_csrf_verification?
    
    # For all other requests, verify the CSRF token
    unless verified_request?
      handle_unverified_request
    end
  end
  
  def html_request?
    request.format.html? || request.format == Mime[:html]
  end
end
