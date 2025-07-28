require 'rails_helper'

RSpec.describe JobPost, type: :model do
  context "when invalid or incomplete arguments" do
    it "invalid if description is not provided"do
      job_postone = JobPost.new(required_skills:"java,springboot",salary_min:150000,salary_max:200000,location:"Addis Ababa",job_type:"fulltime",application_deadline:"2023-12-31",is_active:true)
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:description]).to include("can't be blank")
    end
    it "invalid if required_skills are not provided" do
      job_postone = JobPost.new(description:"We are looking for a fullstack developer",salary_min:150000,salary_max:200000,location:"Addis Ababa",job_type:"fulltime",application_deadline:"2023-12-31",is_active:true)
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:required_skills]).to include("can't be blank")
    end
    it "invalid if salary_min is not provided" do
      job_postone = JobPost.new(description:"We are looking for a fullstack developer",required_skills:"java,springboot",salary_max:200000,location:"Addis Ababa",job_type:"fulltime",application_deadline:"2023-12-31",is_active:true)
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:salary_min]).to include("can't be blank")
    end
    it "invalid if salary_max is not provided" do
      job_postone = JobPost.new(description:"We are looking for a fullstack developer",required_skills:"java,springboot",salary_min:150000,location:"Addis Ababa",job_type:"fulltime",application_deadline:"2023-12-31",is_active:true)
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:salary_max]).to include("can't be blank")
    end
    it "invalid if job_type is not provided" do
      job_postone = JobPost.new(description:"We are looking for a fullstack developer",required_skills:"java,springboot",salary_min:150000,salary_max:200000,location:"Addis Ababa",application_deadline:"2023-12-31",is_active:true)
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:job_type]).to include("can't be blank")
    end
    it "invalid if location is not provided" do
      job_postone = JobPost.new(description:"We are looking for a fullstack developer",required_skills:"java,springboot",salary_min:150000,salary_max:200000,job_type:"fulltime",application_deadline:"2023-12-31",is_active:true)
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:location]).to include("can't be blank")
    end
    it "invalid if application_deadline is not provided" do
      job_postone = JobPost.new(description:"We are looking for a fullstack developer",required_skills:"java,springboot",salary_min:150000,salary_max:200000,location:"Addis Ababa",job_type:"fulltime",is_active:true)
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:application_deadline]).to include("can't be blank")
    end
    it "invalid if is_active is not provided" do
      job_postone = JobPost.new(description:"We are looking for a fullstack developer",required_skills:"java,springboot",salary_min:150000,salary_max:200000,location:"Addis Ababa",job_type:"fulltime",application_deadline:"2023-12-31")
      expect(job_postone).not_to be_valid
      expect(job_postone.errors[:is_active]).to include("can't be blank")
    end
  end
  context "associations" do
    it{ should belong_to(:employer_profile) }
    it { should have_many(:offers) }
    it { should have_many(:applications) }
  end
  
end
