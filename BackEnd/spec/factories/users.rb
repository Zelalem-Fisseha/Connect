FactoryBot.define do
  factory :user do
    name { "MyString" }
    email { "MyString" }
    role { 1 }
    password_digest { "MyString" }
  end
end
