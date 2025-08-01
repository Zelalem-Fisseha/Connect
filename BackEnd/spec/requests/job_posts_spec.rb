require 'rails_helper'

RSpec.describe "JobPosts", type: :request do
  let!(:job_post) { create(:job_post) }
  describe "GET /job_posts" do
    it "returns a list of job posts" do
      get job_posts_path
      expect(response).to have_http_status(:success)
      expect(response.body).to include("Job Post List")
    end
  end
  describe "POST/job_posts" do
    it "creates a new job post" do
      post job_posts_path, params: {
        job_post: {
          description: "Software Engineer",
          required_skills: "Ruby, Rails, JavaScript",
          salary_min: 5000,
          salary_max: 10000,
          job_type: 0,
          location: "Addis Ababa",
          application_deadline: "2025-12-31",
          is_active: true
        }
      }
      expect(response).to have_http_status(:created)
      expect(response.body).to include("Software Engineer")
      expect(response.body).to include("Ruby, Rails, JavaScript")
      expect(response.body).to include("5000")
      expect(response.body).to include("10000")
      expect(response.body).to include("Addis Ababa")
    end
  end
  describe "GET /job_posts/:id" do
    it "returns a specific job post" do
      get job_post_path(job_post.id)
      expect(response).to have_http_status(:success)
      expect(response.body).to include(job_post.description)
      expect(response.body).to include(job_post.required_skills)
      expect(response.body).to include(job_post.salary_min.to_s)
      expect(response.body).to include(job_post.salary_max.to_s)
    end
  end
  describe "PATCH /job_posts/:id" do
    it "updates a job post" do
      put job_post_path(job_post.id), params: {
        job_post: {
          description: "Updated Software Engineer"
      }}
      expect(response).to have_http_status(:success)
      job_post.reload
      expect(job_post.description).to eq("Updated Software Engineer")
    end
  end
  describe "PUT/job_posts/:id" do
    it "updates a job post with full attributes" do
      put job_post_path(job_post.id), params: {
        job_post: {
          description: "Senior Software Engineer",
          required_skills: "Ruby, Rails, JavaScript, React, Node.js",
          salary_min: 7000,
          salary_max: 15000,
          job_type: 1,
          location: "Bole Atlas",
          application_deadline: "2025-10-31",
          is_active: true
        }
      }
      expect(response).to have_http_status(:success)
      job_post.reload
      expect(job_post.description).to eq("Senior Software Engineer")
      expect(job_post.required_skills).to eq("Ruby, Rails, JavaScript, React, Node.js")
      expect(job_post.salary_min).to eq(7000)
      expect(job_post.salary_max).to eq(15000)
      expect(job_post.location).to eq("Bole Atlas")
    end
  end
  describe "DELETE /job_posts/:id" do
    it "deletes a job post" do
      delete job_post_path(job_post.id)
      expect(response).to have_http_status(:no_content)
      expect(JobPost.exists?(job_post.id)).to be_falsey
    end
  end
end
