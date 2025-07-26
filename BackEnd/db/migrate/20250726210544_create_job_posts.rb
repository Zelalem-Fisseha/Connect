class CreateJobPosts < ActiveRecord::Migration[8.0]
  def change
    create_table :job_posts do |t|
      t.references :employer_profile, null: false, foreign_key: true
      t.string :description
      t.string :required_skills
      t.integer :salary_min
      t.integer :salary_max
      t.integer :job_type
      t.string :location
      t.date :application_deadline
      t.boolean :is_active

      t.timestamps
    end
  end
end
