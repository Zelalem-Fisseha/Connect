FactoryBot.define do
  factory :offer do
    job_post { nil }
    job_seeker_portfile { nil }
    employer_profile { nil }
    base_salary { 1 }
    benefits_description { "MyString" }
    status { 1 }
  end
end
