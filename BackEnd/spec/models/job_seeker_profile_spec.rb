require 'rails_helper'

RSpec.describe JobSeekerProfile, type: :model do
  context "when invalid or incomplete arguments" do
    it "invalid if title is not provided" do
      job_seeker_profile = JobSeekerProfile.new(bio: "this is a bio", years_of_experience: 5, skills: "Ruby, Rails", location: "Addis Ababa", availability_status: "available", resume_url: "http://example.com/resume.pdf", portfolio_url: "http://example.com/portfolio")
      expect(job_seeker_profile).not_to be_valid
      expect(job_seeker_profile.errors[:title]).to include("can't be blank")
    end
    it "invalid if bio is not provided" do
      job_seeker_profile = JobSeekerProfile.new(title: "fullstack", years_of_experience: 5, skills: "Ruby, Rails", location: "Addis Ababa", availability_status: "available", resume_url: "http://example.com/resume.pdf", portfolio_url: "http://example.com/portfolio")
      expect(job_seeker_profile).not_to be_valid
      expect(job_seeker_profile.errors[:bio]).to include("can't be blank")
    end
    it "invalid if years_of_experience is not provided" do
      job_seeker_profile = JobSeekerProfile.new(title: "fullstack", bio: "this is a bio", skills: "Ruby, Rails", location: "Addis Ababa", availability_status: "available", resume_url: "http://example.com/resume.pdf", portfolio_url: "http://example.com/portfolio")
      expect(job_seeker_profile).not_to be_valid
      expect(job_seeker_profile.errors[:years_of_experience]).to include("can't be blank")
    end
    it "invalid if skills are not provided" do
      job_seeker_profile = JobSeekerProfile.new(title: "fullstack", bio: "this is a bio", years_of_experience: 5, location: "Addis Ababa", availability_status: "available", resume_url: "http://example.com/resume.pdf", portfolio_url: "http://example.com/portfolio")
      expect(job_seeker_profile).not_to be_valid
      expect(job_seeker_profile.errors[:skills]).to include("can't be blank")
    end
    it "invalid if location is not provided" do
      job_seeker_profile = JobSeekerProfile.new(title: "fullstack", bio: "this is a bio", years_of_experience: 5, skills: "Ruby, Rails", availability_status: "available", resume_url: "http://example.com/resume.pdf", portfolio_url: "http://example.com/portfolio")
      expect(job_seeker_profile).not_to be_valid
      expect(job_seeker_profile.errors[:location]).to include("can't be blank")
    end
    it "invalid if availability_status is not provided" do
      job_seeker_profile = JobSeekerProfile.new(title: "fullstack", bio: "this is a bio", years_of_experience: 5, skills: "Ruby, Rails", location: "Addis Ababa", resume_url: "http://example.com/resume.pdf", portfolio_url: "http://example.com/portfolio")
      expect(job_seeker_profile).not_to be_valid
      expect(job_seeker_profile.errors[:availability_status]).to include("can't be blank")
    end
    it "invalid if portfolio_url is not provided" do
      job_seeker_profile = JobSeekerProfile.new(title: "fullstack", bio: "this is a bio", years_of_experience: 5, skills: "Ruby, Rails", location: "Addis Ababa", availability_status: "available", resume_url: "http://example.com/resume.pdf")
      expect(job_seeker_profile).not_to be_valid
      expect(job_seeker_profile.errors[:portfolio_url]).to include("can't be blank")
    end
  end
  context "associations" do
    it{ should belong_to(:user) }
    it { should have_many(:offers) }
    it { should have_many(:applications) }
  end
end
