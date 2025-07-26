FactoryBot.define do
  factory :application do
    job_post { nil }
    job_seeker { nil }
    cover_letter { "MyString" }
    status { 1 }
  end
end
