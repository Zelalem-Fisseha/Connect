class Application < ApplicationRecord
  belongs_to :job_post
  belongs_to :job_seeker_profile

  Statuses = { pending: 0, accepted: 1, rejected: 2 }
  validates :cover_letter, presence: true
  validates :status, presence: true
  def pending?
    status==Statuses[:pending]
  end
  def accepted?
    status==Statuses[:accepted]
  end
  def rejected?
    status==Statuses[:rejected]
  end
end
