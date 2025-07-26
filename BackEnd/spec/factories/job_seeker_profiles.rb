FactoryBot.define do
  factory :job_seeker_profile do
    user { nil }
    title { "MyString" }
    bio { "MyText" }
    years_of_experience { 1 }
    skills { "MyText" }
    location { "MyString" }
    availability_status { "MyString" }
    resume_url { "MyString" }
    portfolio_url { "MyString" }
  end
end
