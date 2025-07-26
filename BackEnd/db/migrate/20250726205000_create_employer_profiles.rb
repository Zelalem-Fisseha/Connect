class CreateEmployerProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :employer_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :company_name
      t.string :company_description
      t.string :location
      t.string :industry

      t.timestamps
    end
  end
end
