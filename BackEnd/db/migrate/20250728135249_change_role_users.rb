class ChangeRoleUsers < ActiveRecord::Migration[8.0]
  def change
    change_column :users, :role, :integer, null: false, default: 0
  end
end
