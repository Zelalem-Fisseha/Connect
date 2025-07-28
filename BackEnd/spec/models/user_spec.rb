require 'rails_helper'

RSpec.describe User, type: :model do
  context "when invalid or incomplete arguments" do
    it "invalid if email is not provided" do
      user = User.new(name: "abebe", role: 1, password: "password123")
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("can't be blank")
    end
    it "invalid if name is not provided" do
      user = User.new(email: "abebe@gmail.com", role: 1, password: "password123")
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end
    it "invalid if password is not provided" do
      user = User.new(name: "abebe", email: "abebe@gmail.com", role: 1)
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("can't be blank")
    end
    it "invalid if email format is incorrect" do
      user = User.new(name: "abebe", email: "abebe.com", role: 1, password: "password123")
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("is invalid")
    end
    it "invalid if password_digest is too short" do
      user = User.new(name: "abebe", email: "abebe@gmail.com", role: 1, password: "12345")
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
    end
    it "invalid if email is not unique" do
      userone=User.create(name: "abebe", email:"abebe@gmail.com",role:1, password: "password123")
      usertwo = User.new(name: "abebe", email:"abebe@gmail.com",role:1, password: "password123")
      expect(usertwo).not_to be_valid
      expect(usertwo.errors[:email]).to include("has already been taken")
    end
    it "invalid if email is not in the right format" do
      user = User.new(name: "abebe", email: "abebe", role: 1, password: "password123")
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("is invalid")
    end
  end
  context "associations" do
    it { should have_many(:job_seeker_profiles).dependent(:destroy) }
    it { should have_many(:employer_profiles).dependent(:destroy) }
  end
end
