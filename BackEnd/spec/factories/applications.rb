FactoryBot.define do
  factory :application do
    association :job_post
    association :job_seeker_profile
    cover_letter { Faker::Lorem.paragraph }
    status { [0, 1, 2].sample }
  end
end
