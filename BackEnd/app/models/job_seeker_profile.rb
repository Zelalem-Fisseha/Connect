class JobSeekerProfile < ApplicationRecord
  has_many :offers
  has_many :applications
  belongs_to :user
  validates :title, presence: true
  validates :bio, presence: true
  validates :years_of_experience, presence: true
  validates :skills, presence: true
  validates :availability_status, presence: true
  validates :portfolio_url, presence: true
end