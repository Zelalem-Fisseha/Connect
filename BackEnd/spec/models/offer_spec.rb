require 'rails_helper'

RSpec.describe Offer, type: :model do
  context "when invalid or incomplete arguments" do
    it "invalid if base_salary is not provided" do
      offer = Offer.new(job_post_id: 1, job_seeker_profile_id: 1, employer_profile_id: 1, benefits_description: "Health insurance", status: "pending")
      expect(offer).not_to be_valid
      expect(offer.errors[:base_salary]).to include("can't be blank")
    end

    it "invalid if benefits_description is not provided" do
      offer = Offer.new(job_post_id: 1, job_seeker_profile_id: 1, employer_profile_id: 1, base_salary: 5000, status: "pending")
      expect(offer).not_to be_valid
      expect(offer.errors[:benefits_description]).to include("can't be blank")
    end

    it "invalid if status is not provided" do
      offer = Offer.new(job_post_id: 1, job_seeker_profile_id: 1, employer_profile_id: 1, base_salary: 5000, benefits_description: "Health insurance")
      expect(offer).not_to be_valid
      expect(offer.errors[:status]).to include("can't be blank")
    end
  end
  context "associations" do
    it { should belong_to(:job_post) }
    it { should belong_to(:job_seeker_profile) }
    it { should belong_to(:employer_profile) }
  end
end
