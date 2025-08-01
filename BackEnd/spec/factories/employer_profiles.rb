FactoryBot.define do
  factory :employer_profile do
    association :user, factory: :user
    company_name {Faker::Company.name}
    company_description { Faker::Lorem.paragraph }
    location { Faker::Address.city }
    industry { Faker::Company.industry }
  end
end
