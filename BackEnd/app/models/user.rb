class User < ApplicationRecord
  has_one :job_seeker_profile, dependent: :destroy
  has_one :employer_profile, dependent: :destroy
  has_secure_password
  ROLES = { job_seeker: 0, employer: 1 }
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :role, presence: true
  validates :password, presence: true, length: { minimum: 6 }

  def job_seeker?
    role == ROLES[:job_seeker].to_s
  end
  
  def employer?
    role == ROLES[:employer].to_s
  end
end
