class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :role, presence: true
  validates :password_digest,presence:true, length: { minimum: 6 }
end
