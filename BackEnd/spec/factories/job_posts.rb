FactoryBot.define do
  factory :job_post do
    association :employer_profile, factory: :employer_profile
    description { Faker::Job.title }
    required_skills { Faker::ProgrammingLanguage.name + ", " + Faker::ProgrammingLanguage.name }
    salary_min { Faker::Number.between(from: 1000, to: 5000) }
    salary_max { Faker::Number.between(from: 6000, to: 20000) }
    job_type { [0, 1].sample }
    location { Faker::Address.city }
    application_deadline { Faker::Date.forward(days: 30) }
    is_active { true }
  end
end
