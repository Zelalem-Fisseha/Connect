class RemoveResumeUrlFromJobSeekerProfiles < ActiveRecord::Migration[8.0]
  def change
    remove_column :job_seeker_profiles, :resume_url, :string
  end
end
