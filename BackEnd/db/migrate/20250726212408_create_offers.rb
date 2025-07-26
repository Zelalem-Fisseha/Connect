class CreateOffers < ActiveRecord::Migration[8.0]
  def change
    create_table :offers do |t|
      t.references :job_post, null: false, foreign_key: true
      t.references :job_seeker_profile, null: false, foreign_key: true
      t.references :employer_profile, null: false, foreign_key: true
      t.integer :base_salary
      t.string :benefits_description
      t.integer :status

      t.timestamps
    end
  end
end
