FactoryBot.define do
  factory :offer do
    association :job_post
    association :job_seeker_profile
    association :employer_profile
    base_salary { Faker::Number.between(from: 5000, to: 20000) }
    benefits_description { Faker::Lorem.sentence }
    status { [0, 1, 2].sample } 
  end
end