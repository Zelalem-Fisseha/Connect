class Application < ApplicationRecord
  belongs_to :job_post
  belongs_to :job_seeker
end
