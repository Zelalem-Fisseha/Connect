FactoryBot.define do
  factory :job_post do
    employer_profile { nil }
    description { "MyString" }
    required_skills { "MyString" }
    salary_min { 1 }
    salary_max { 1 }
    job_type { 1 }
    location { "MyString" }
    application_deadline { "2025-07-27" }
    is_active { false }
  end
end
