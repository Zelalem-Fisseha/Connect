class User < ApplicationRecord
  has_secure_password
  validates :fullname, presence: true
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :bio, presence: true
  validates :password, presence:true, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

end
