require 'rails_helper'

RSpec.describe "Applications", type: :request do
  let!(:job_post) { create(:job_post) }
  let!(:job_seeker_profile) { create(:job_seeker_profile) }
  let!(:application) { create(:application, job_post: job_post, job_seeker_profile: job_seeker_profile )}
  describe "GET /job_posts/:job_post_id/applications" do
    it "returns a list of applications for a job post" do
      get job_post_applications_path(job_post_id: job_post.id)
      expect(response).to have_http_status(:success)
      expect(response.body).to include(application.cover_letter)
      expect(response.body).to include(job_seeker_profile.title)
    end
  end
  describe "POST /job_posts/:job_post_id/applications" do
    it "creates a new application for a job post" do
      post job_post_applications_path(job_post_id: job_post.id), params: {
        application: {
          job_seeker_profile_id: job_seeker_profile.id,
          cover_letter: "I am very interested in this position.",
          status: 0
        }
      }
      expect(response).to have_http_status(:created)
      expect(response.body).to include("I am very interested in this position.")
      expect(response.body).to include("0")
      
    end
  end
end
