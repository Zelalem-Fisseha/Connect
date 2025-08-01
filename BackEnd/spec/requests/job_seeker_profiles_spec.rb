require 'rails_helper'

RSpec.describe "JobSeekerProfiles", type: :request do
  let!(:user) { create(:user, role: 0) }
  let!(:job_seeker_profile) { create(:job_seeker_profile) }
  describe "GET /users/user_id/job_seeker_profile" do
    it "returns the job seeker profile" do
      get user_job_seeker_profile_path(user_id: user.id)
      expect(response).to have_http_status(:success)
      expect(response.body).to include(job_seeker_profile.title)
      expect(response.body).to include(job_seeker_profile.bio)
      expect(response.body).to include(job_seeker_profile.years_of_experience.to_s)
      expect(response.body).to include(job_seeker_profile.skills)
      expect(response.body).to include(job_seeker_profile.availability_status)
      expect(response.body).to include(job_seeker_profile.portfolio_url)
    end
  end
  describe "POST /users/user_id/job_seeker_profile" do
    it "creates a new job seeker profile" do
      post user_job_seeker_profile_path(user_id: user.id), params: {
        job_seeker_profile: {
          title: "Software Engineer",
          bio: "Experienced in Ruby on Rails",
          years_of_experience: 5,
          skills: "Ruby, Rails, JavaScript",
          availability_status: "available",
          portfolio_url: "http://example.com/portfolio"
        }
      }
      expect(response).to have_http_status(:created)
      expect(response.body).to include("Software Engineer")
      expect(response.body).to include("Experienced in Ruby on Rails")
      expect(response.body).to include("5")
      expect(response.body).to include("Ruby, Rails, JavaScript")
      expect(response.body).to include("available")
      expect(response.body).to include("http://example.com/portfolio")
    end
  end

  describe "PATCH /users/:user_id/job_seeker_profile" do
    it "updates the job seeker profile" do
      put user_job_seeker_profile_path(user_id: user.id), params: {
        job_seeker_profile: {
          title: "Senior Software Engineer"
        }
      }
      expect(response).to have_http_status(:success)
      job_seeker_profile.reload
      expect(job_seeker_profile.title).to eq("Senior Software Engineer")
      expect(job_seeker_profile.bio).to eq("Expert in Ruby on Rails and React")
      expect(job_seeker_profile.years_of_experience).to eq(7)
      expect(job_seeker_profile.skills).to eq("Ruby, Rails, React, JavaScript")
      expect(job_seeker_profile.availability_status).to eq("looking for opportunities")
      expect(job_seeker_profile.portfolio_url).to eq("http://example.com/new_portfolio")
    end
  end
  describe "PUT/users/:user_id/job_seeker_profile" do
    it "updates the job seeker profile" do
      put user_job_seeker_profile_path(user_id: user.id), params: {
        job_seeker_profile: {
          title: "Senior Software Engineer",
          bio: "Expert in Ruby on Rails and React",
          years_of_experience: 7,
          skills: "Ruby, Rails, React, JavaScript",
          availability_status: "looking for opportunities",
          portfolio_url: "http://example.com/new_portfolio"
        }
      }
      expect(response).to have_http_status(:success)
      job_seeker_profile.reload
      expect(job_seeker_profile.title).to eq("Senior Software Engineer")
      expect(job_seeker_profile.bio).to eq("Expert in Ruby on Rails and React")
      expect(job_seeker_profile.years_of_experience).to eq(7)
      expect(job_seeker_profile.skills).to eq("Ruby, Rails, React, JavaScript")
      expect(job_seeker_profile.availability_status).to eq("looking for opportunities")
      expect(job_seeker_profile.portfolio_url).to eq("http://example.com/new_portfolio")
    end
  end
  describe "DELETE /users/:user_id/job_seeker_profile" do
    it "deletes the job seeker profile" do
      delete user_job_seeker_profile_path(user_id: user.id)
      expect(response).to have_http_status(:no_content)
      expect(JobSeekerProfile.exists?(job_seeker_profile.id)).to be_falsey
    end
  end
end
