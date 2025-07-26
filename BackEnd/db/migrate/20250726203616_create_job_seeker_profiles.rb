class CreateJobSeekerProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :job_seeker_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :bio
      t.integer :years_of_experience
      t.text :skills
      t.string :location
      t.string :availability_status, default: 'available'
      t.string :resume_url
      t.string :portfolio_url

      t.timestamps
    end
  end
end
