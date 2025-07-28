class User < ApplicationRecord
  has_many :job_seeker_profiles, dependent: :destroy
  has_many :employer_profiles, dependent: :destroy
  has_secure_password
  ROLES = { job_seeker: 0, employer: 1 }
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :role, presence: true
  validates :password,presence:true, length: { minimum: 6 }

  def job_seeker
    role == ROLES[:job_seeker]
  end
  def employer
    role == ROLES[:employer]
  end
end
