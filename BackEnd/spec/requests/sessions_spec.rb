require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user) { create(:user) }
  let(:valid_attributes) { { email: user.email, password: 'password123' } }
  
  # Helper method to log response details
  def log_response_details(response, prefix = "")
    puts "\n#{prefix} Response Status: #{response.status}"
    puts "#{prefix} Response Headers: #{response.headers.to_h.reject { |k,v| k.start_with?('X-') }.inspect}"
    puts "#{prefix} Response Body: #{response.body}"
    puts "#{prefix} Session: #{session.to_hash}"
    puts "#{prefix} CSRF Token in response: #{response.headers['X-CSRF-Token']}"
  end
  
  # Helper method to get CSRF token
  def get_csrf_token
    get csrf_token_path
    puts "\nCSRF Token Request - Status: #{response.status}"
    puts "CSRF Token Response Headers: #{response.headers.to_h.reject { |k,v| k.start_with?('X-') }.inspect}"
    puts "CSRF Token in response: #{response.parsed_body}"
    response.parsed_body['csrf_token']
  end
  
  # Helper to get CSRF token and set headers
  def auth_headers
    csrf_token = get_csrf_token
    headers = {
      'Accept' => 'application/json',
      'Content-Type' => 'application/json'
    }
    headers['X-CSRF-Token'] = csrf_token if csrf_token
    puts "\nAuth Headers: #{headers}"
    headers
  end

  describe "CSRF Protection" do
    it "returns a CSRF token" do
      puts "\n#{'='*50}"
      puts "TEST: returns a CSRF token"
      puts "#{'='*50}"
      
      get csrf_token_path
      expect(response).to have_http_status(:ok)
      
      # Check both the header and the response body for the token
      expect(response.headers['X-CSRF-Token']).to be_present
      response_body = JSON.parse(response.body)
      expect(response_body).to have_key('csrf_token')
      expect(response_body['csrf_token']).to be_present
      
      # Verify the token in the header matches the one in the body
      expect(response.headers['X-CSRF-Token']).to eq(response_body['csrf_token'])
      
      puts "Status: #{response.status}"
      puts "CSRF Token (Header): #{response.headers['X-CSRF-Token']&.first(10)}..."
      puts "CSRF Token (Body): #{response_body['csrf_token']&.first(10)}..."
      puts "#{'='*50}\n"
    end
    
    it "rejects requests with invalid CSRF token for non-GET requests" do
      puts "\n#{'='*50}"
      puts "TEST: rejects requests with invalid CSRF token"
      puts "#{'='*50}"
      
      # Create a test user
      user = User.create!(
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
        name: 'Test User'
      )
      
      # Make a request with an invalid token
      post login_path, 
           params: { 
             email: 'test@example.com', 
             password: 'password' 
           }.to_json,
           headers: { 
             'Content-Type' => 'application/json',
             'Accept' => 'application/json',
             'X-CSRF-Token' => 'invalid_token' 
           }
      
      puts "Status: #{response.status}"
      puts "Response: #{response.body}"
      puts "#{'='*50}\n"
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include('error' => 'Invalid CSRF token')
    end
    
    it "accepts requests with valid CSRF token for non-GET requests" do
      puts "\n=== Testing valid CSRF token acceptance ==="
      
      # First get a valid CSRF token to use in the request
      get csrf_token_path
      csrf_token = response.parsed_body['csrf_token']
      puts "Obtained CSRF token: #{csrf_token}"
      
      # Test with valid CSRF token
      post login_path, 
           params: valid_attributes.to_json,
           headers: { 
             'Accept' => 'application/json',
             'Content-Type' => 'application/json',
             'X-CSRF-Token' => csrf_token
           }
      
      log_response_details(response, "Valid CSRF Test: ")
      
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['message']).to include('Logged in successfully')
    end
  end

  describe "POST /login" do
    it "logs in a user with valid credentials and sets session" do
      post login_path, 
           params: valid_attributes.to_json,
           headers: auth_headers
      
      expect(response).to have_http_status(:success)
      expect(response.parsed_body['message']).to eq('Logged in successfully')
      expect(response.parsed_body['role']).to eq(user.role)
      
      # Verify session is set
      get current_user_path, headers: auth_headers
      expect(response).to have_http_status(:success)
      expect(response.parsed_body['email']).to eq(user.email)
    end

    it "returns an error with invalid credentials" do
      post login_path, 
           params: { email: user.email, password: 'wrongpassword' }.to_json,
           headers: auth_headers
      expect(response).to have_http_status(:unauthorized)
      expect(response.parsed_body['error']).to include('Invalid email or password')
    end
  end

  describe "DELETE /logout" do
    it "logs out the user and clears the session" do
      # First log in
      post login_path, 
           params: valid_attributes.to_json,
           headers: auth_headers
      
      # Verify session is set
      get current_user_path, headers: auth_headers
      expect(response).to have_http_status(:success)
      
      # Log out with CSRF token from the login response
      csrf_token = response.headers['X-CSRF-Token']
      
      delete logout_path, 
             headers: auth_headers.merge('X-CSRF-Token' => csrf_token)
      
      expect(response).to have_http_status(:success)
      expect(response.parsed_body['message']).to eq('Logged out successfully')
      
      # Verify session is cleared
      get current_user_path, headers: auth_headers
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /current_user" do
    it "returns the current user if logged in" do
      user = create(:user)  # Explicitly create the user to ensure it's a model object
      post login_path, params: { email: user.email, password: 'password123' }
      
      get current_user_path
      
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq(user.name)
      expect(json_response['email']).to eq(user.email)
    end

    it "returns an error if no user is logged in" do
      get current_user_path
      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to include("No user logged in")
    end
  end

  describe "POST /register" do
    let(:valid_user_params) do
      {
        user: {
          name: 'New User',
          email: "test_#{SecureRandom.hex(4)}@example.com",
          password: 'password123',
          password_confirmation: 'password123',
          role: 0
        }
      }
    end
    
    before do
      # Clear the test database before each test
      User.destroy_all
    end
    
    it "registers a new user with CSRF protection" do
      puts "\n#{'='*50}"
      puts "TEST: registers a new user with CSRF protection"
      puts "#{'='*50}"
      
      # First, get a CSRF token
      get csrf_token_path
      csrf_token = JSON.parse(response.body)['csrf_token']
      expect(csrf_token).to be_present
      
      # Log the token for debugging
      puts "Obtained CSRF token: #{csrf_token.first(10)}..."
      puts "Sending registration request with email: #{valid_user_params[:user][:email]}"
      
      # Then use it for the registration request
      expect {
        post register_path,
             params: valid_user_params.to_json,
             headers: { 
               'Content-Type' => 'application/json',
               'Accept' => 'application/json',
               'X-CSRF-Token' => csrf_token 
             }
      }.to change(User, :count).by(1)
      
      expect(response).to have_http_status(:created)
      response_body = JSON.parse(response.body)
      
      puts "Status: #{response.status}"
      puts "Response: #{response_body.except('csrf_token')}"
      puts "CSRF Token in response: #{response_body['csrf_token'].present? ? 'Present' : 'Missing'}"
      puts "CSRF Token in headers: #{response.headers['X-CSRF-Token'].present? ? 'Present' : 'Missing'}"
      puts "#{'='*50}\n"
      
      expect(response_body).to include('email' => valid_user_params[:user][:email])
      expect(response_body).to have_key('csrf_token')
      expect(response.headers['X-CSRF-Token']).to be_present
    end
    
    it "fails without CSRF token" do
      puts "\n#{'='*50}"
      puts "TEST: fails without CSRF token"
      puts "#{'='*50}"
      
      # Make the request without any CSRF token
      expect {
        post register_path,
             params: valid_user_params.to_json,
             headers: { 
               'Content-Type' => 'application/json',
               'Accept' => 'application/json'
             }
      }.not_to change(User, :count)
      
      response_body = JSON.parse(response.body) rescue {}
      
      puts "Status: #{response.status}"
      puts "Response: #{response_body}"
      if response_body['error']
        puts "Error: #{response_body['error']}"
      end
      puts "CSRF Token in headers: #{response.headers['X-CSRF-Token'].present? ? 'Present' : 'Missing'}"
      puts "#{'='*50}\n"
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response_body).to include('error' => 'Invalid CSRF token')
    end
  end
  
  describe "Session Security" do
    it "maintains session after login" do
      # Log in
      post login_path, 
           params: valid_attributes.to_json,
           headers: auth_headers
      
      expect(response).to have_http_status(:success)
      
      # Get the CSRF token from the login response
      csrf_token = response.parsed_body['csrf_token']
      
      # Verify session is maintained with the new CSRF token
      get current_user_path, 
           headers: auth_headers.merge('X-CSRF-Token' => csrf_token)
      
      expect(response).to have_http_status(:success)
      expect(response.parsed_body['email']).to eq(user.email)
      
      # Verify session expires after logout
      delete logout_path, 
             headers: auth_headers.merge('X-CSRF-Token' => csrf_token)
      
      expect(response).to have_http_status(:success)
      
      # Verify session is no longer valid
      get current_user_path, 
           headers: auth_headers.merge('X-CSRF-Token' => csrf_token)
      expect(response).to have_http_status(:unauthorized)
    end
    
    it "requires authentication for protected endpoints" do
      # Try to access a protected endpoint without authentication
      get current_user_path, headers: auth_headers
      
      # Should be unauthorized without a valid session
      expect(response).to have_http_status(:unauthorized)
      
      # Log in to get a valid session
      post login_path, 
           params: valid_attributes.to_json,
           headers: auth_headers
      
      csrf_token = response.parsed_body['csrf_token']
      
      # Now the request should be authorized
      get current_user_path, 
           headers: auth_headers.merge('X-CSRF-Token' => csrf_token)
      expect(response).to have_http_status(:success)
    end
    
    it "provides a new CSRF token with each response" do
      # Initial request to get a CSRF token
      get csrf_token_path
      first_token = response.parsed_body['csrf_token']
      
      # Make a request that changes state (login)
      post login_path,
           params: valid_attributes.to_json,
           headers: auth_headers.merge('X-CSRF-Token' => first_token)
      
      # Should get a new CSRF token in the response
      new_token = response.parsed_body['csrf_token']
      expect(new_token).to be_present
      expect(new_token).not_to eq(first_token)
      
      # The new token should be valid for the next request
      get current_user_path,
           headers: auth_headers.merge('X-CSRF-Token' => new_token)
      
      expect(response).to have_http_status(:success)
    end
  end
end
