class RenameJobSeekerProfilesIdInApplications < ActiveRecord::Migration[8.0]
  def change
    rename_column :applications, :job_seeker_profiles_id, :job_seeker_profile_id
  end
end
