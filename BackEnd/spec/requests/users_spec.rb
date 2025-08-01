require 'rails_helper'

RSpec.describe "Users", type: :request do
  let(:user) { create(:user) }
  describe "GET/users/:id" do
    it "returns the user profile" do
      get user_path(user.id)
      expect(response).to have_http_status(:success)
      expect(response.body).to include(user.name)
      expect(response.body).to include(user.email)
    end
  end
  describe "POST/users" do
    it "creates a new user" do
      post users_path, params: { user: { name: "Tolesa", email: "Tolesa@gmail.com", role: 0, password: "123456" } }
      expect(response).to have_http_status(:created)
    end
  end

  describe "PUT/users/:id" do
    it "updates the user profile" do
      put user_path(user.id), params: { user: { name: "Amberberu", email: "Amberber@gmail.com", role: 1, password: "12345678" }   }
      expect(response).to have_http_status(:success)
      user.reload
      expect(user.name).to eq("Amberberu")
      expect(user.email).to eq("Amberber@gmail.com")
      expect(user.role).to eq(1)
      expect(user.authenticate("12345678")).to be_truthy
    end
  end
  describe "DELETE/users/:id" do
    it "deletes the user profile" do
      delete user_path(user.id)
      expect(response).to have_http_status(:no_content)
      expect(User.exists?(user.id)).to be_falsey
    end
  end
end
