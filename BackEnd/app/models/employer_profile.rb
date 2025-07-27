class EmployerProfile < ApplicationRecord
  belongs_to :user
  validates :company_name, presence: true
  validates :company_description, presence: true
  validates :location, presence: true
  validates :industry, presence: true
end
