class CreateApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :applications do |t|
      t.references :job_post, null: false, foreign_key: true
      t.references :job_seeker_profiles, null: false, foreign_key: true
      t.string :cover_letter
      t.integer :status

      t.timestamps
    end
  end
end
