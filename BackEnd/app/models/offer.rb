class Offer < ApplicationRecord
  belongs_to :job_post
  belongs_to :job_seeker_profile
  belongs_to :employer_profile
  validates :base_salary, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :benefits_description, presence: true
  validates :status, presence: true, inclusion: { in: %w[pending accepted rejected] }
end
