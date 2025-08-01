FactoryBot.define do
  factory :job_seeker_profile do
    association :user, factory: :user
    title { Faker::Job.title }
    bio { Faker::Lorem.paragraph }
    years_of_experience { rand(1..10) }
    skills { "Ruby on rails and java " }
    availability_status { ["available", "unavailable", "looking for opportunities"].sample }
    portfolio_url { Faker::Internet.url(host: 'example.com', path: '/portfolio') }
  end
end
