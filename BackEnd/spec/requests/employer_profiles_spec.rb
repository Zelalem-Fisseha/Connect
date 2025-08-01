require 'rails_helper'

RSpec.describe "EmployerProfiles", type: :request do
  let!(:user) { create(:user, role: 1)}
  let!(:employer_profile) { create(:employer_profile, user: user)}
  describe "GET /users/user_id/employer_profiles"do
    it "returns the employer profile" do
      get user_employer_profile_path(user_id: user.id)
      expect(response).to have_http_status(:success)
      expect(response.body).to include(employer_profile.company_name)
      expect(response.body).to include(employer_profile.company_description)
      expect(response.body).to include(employer_profile.location)
      expect(response.body).to include(employer_profile.industry)
    end
  end
  describe "POST/users/user_id/employer_profiles" do
    it "creates a new employer profile" do
      post user_employer_profile_path(user_id: user.id), params: {
        employer_profile: {
          company_name: "Some Tech Solutions",
          company_description: "Innovative tech solutions provider",
          location: "Bole Atlas",
          industry: "SAS"
        }
      }
      expect(response).to have_http_status(:created)
      expect(response.body).to include("Some Tech Solutions")
      expect(response.body).to include("Innovative tech solutions provider")
      expect(response.body).to include("Bole Atlas")
      expect(response.body).to include("SAS")
    end
  end
  describe "PUT/users/:user_id/employer_profiles" do
    it "updates the employer profile" do
      put user_employer_profile_path(user_id: user.id), params: {
        employer_profile: {
          company_name: "Updated Tech Solutions",
          company_description: "Leading provider of innovative tech solutions",
          location: "Bole Atlas",
          industry: "SAS"
        }
      }
      expect(response).to have_http_status(:success)
      employer_profile.reload
      expect(employer_profile.company_name).to eq("Updated Tech Solutions")
      expect(employer_profile.company_description).to eq("Leading provider of innovative tech solutions")
      expect(employer_profile.location).to eq("Bole Atlas")
      expect(employer_profile.industry).to eq("SAS")
    end
  end
  describe "DELETE/users/:user_id/employer_profiles" do
    it "deletes the employer profile" do
      delete user_employer_profile_path(user_id: user.id)
      expect(response).to have_http_status(:no_content)
      expect(EmployerProfile.exists?(employer_profile.id)).to be_falsey
    end
  end
end
