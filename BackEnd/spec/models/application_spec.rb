require 'rails_helper'

RSpec.describe Application, type: :model do
  context "when invalid or incomplete arguments" do
    it "invalid if cover_letter is not provided"do
    application=Application.new(status:0)
      expect(application).not_to be_valid
      expect(application.errors[:cover_letter]).to include("can't be blank")
    end
    it "invalid if status is not provided"do
      application=Application.new(cover_letter:"hello this my cover letter")
      expect(application).not_to be_valid
      expect(application.errors[:status]).to include("can't be blank")
    end
  end
  context "associations" do
    it { should belong_to(:job_post) }
    it { should belong_to(:job_seeker_profile) }
    
  end
end
