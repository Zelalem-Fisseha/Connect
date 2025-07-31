class JobPost < ApplicationRecord
  has_many :offers
  has_many :applications
  belongs_to :employer_profile
  JobTypes= { full_time: 0, part_time: 1 }
  validates :description, presence: true
  validates :required_skills, presence: true
  validates :salary_max, presence: true, numericality: { only_integer: true, greater_than_or_equal_to:0 }
  validates :job_type, presence: true
  validates :location, presence: true
  validates :application_deadline, presence: true
  validates :is_active, presence:true ,inclusion: { in: [true, false]}
  validates :salary_min, presence:true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  def FullTime?
    job_type ==  JobTypes[:full_time]
  end
  def PartTime?
    job_type == JobTypes[:part_time]
  end
end
