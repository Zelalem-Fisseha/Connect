class Offer < ApplicationRecord
  belongs_to :job_post
  belongs_to :job_seeker_portfile
  belongs_to :employer_profile
end
