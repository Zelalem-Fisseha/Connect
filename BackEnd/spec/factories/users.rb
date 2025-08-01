FactoryBot.define do
  factory :user do
    name {Faker::Name.name}
    email { Faker::Internet.unique.email }
    role { 0 }
    password { "password123" }
  end
end
