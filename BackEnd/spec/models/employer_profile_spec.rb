require 'rails_helper'

RSpec.describe EmployerProfile, type: :model do
  context "when invalid or incomplete arguments" do
    it "invalid if company_name is not provided"do
      employer_profile = EmployerProfile.new( company_description: "abebe's solution is Ai compony", location: "Addis Ababa", industry: "AiTechnology")
      expect(employer_profile).not_to be_valid
      expect(employer_profile.errors[:company_name]).to include("can't be blank")
    end
    it "invalid if company_description is not provided" do
      employer_profile = EmployerProfile.new(company_name: "Abebe's Solutions", location: "Addis Ababa", industry: "AiTechnology")
      expect(employer_profile).not_to be_valid
      expect(employer_profile.errors[:company_description]).to include("can't be blank")
    end
    it "invalid if location is not provided" do
      employer_profile = EmployerProfile.new(company_name: "Abebe's Solutions", company_description: "abebe's solution is Ai compony", industry: "AiTechnology")
      expect(employer_profile).not_to be_valid
      expect(employer_profile.errors[:location]).to include("can't be blank")
    end
    it "invalid if industry is not provided" do
      employer_profile = EmployerProfile.new(company_name: "Abebe's Solutions", company_description: "abebe's solution is Ai compony", location: "Addis Ababa")
      expect(employer_profile).not_to be_valid
      expect(employer_profile.errors[:industry]).to include("can't be blank")
    end
  end
end
