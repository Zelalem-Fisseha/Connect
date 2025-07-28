class JobPost < ApplicationRecord
  has_many :offers
  has_many :applications
  belongs_to :employer_profile
  validates :description, presence: true
  validates :required_skills, presence: true
  validates :salary_max, presence: true, numericality: { only_integer: true, greater_than_or_equal_to:0 }
  validates :job_type, presence: true
  validates :location, presence: true
  validates :application_deadline, presence: true
  validates :is_active, presence:true ,inclusion: { in: [true, false]}
  validates :salary_min, presence:true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
