require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user) { create(:user) }

  describe "POST /login" do
    it "logs in a user with valid credentials" do
      post login_path, params: { email: user.email, password: 'password123' }
      expect(response).to have_http_status(:success)
      expect(response.body).to include("Logged in successfully")
    end

    it "returns an error with invalid credentials" do
      post login_path, params: { email: user.email, password: 'wrongpassword' }
      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to include("Invalid email or password")
    end
  end

  describe "DELETE /logout" do
    it "logs out the user" do
      delete logout_path
      expect(response).to have_http_status(:success)
      expect(response.body).to include("Logged out successfully")
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
    it "registers a new user" do
      user_attributes = {
        name: "New User",
        email: "new@email.com",
        password: "password123",
        role: 0
      }
      
      expect {
        post users_path, params: { user: user_attributes }
      }.to change(User, :count).by(1)
      
      expect(response).to have_http_status(:created)
      
      json_response = JSON.parse(response.body)
      expect(json_response['email']).to eq(user_attributes[:email])
      expect(json_response['name']).to eq(user_attributes[:name])
      expect(json_response['role']).to eq(0)
      
      new_user = User.find(json_response['id'])
      expect(new_user.authenticate(user_attributes[:password])).to be_truthy
    end
  end
end
