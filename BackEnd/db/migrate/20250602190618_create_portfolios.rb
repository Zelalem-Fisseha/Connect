class CreatePortfolios < ActiveRecord::Migration[8.0]
  def change
    create_table :portfolios do |t|
      t.string :title
      t.string :description
      t.string :techstack
      t.string :projecturl
      t.string :min_price_point
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
