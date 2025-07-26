FactoryBot.define do
  factory :employer_profile do
    user { nil }
    company_name { "MyString" }
    company_discription { "MyString" }
    location { "MyString" }
    industry { "MyString" }
  end
end
