class JobSeekerProfile < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :bio, presence: true
  validates :years_of_experience, presence: true
  validates :skills, presence: true
  validates :location, presence: true
  validates :availability_status, presence: true
  validates :portfolio_url, presence: true
end
