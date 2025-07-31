class RemoveLocationFromJobSeekerProfiles < ActiveRecord::Migration[8.0]
  def change
    remove_column :job_seeker_profiles, :location, :string
  end
end
