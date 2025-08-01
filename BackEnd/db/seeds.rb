# Clear existing data
puts "Cleaning database..."
Application.destroy_all
Offer.destroy_all
JobPost.destroy_all
EmployerProfile.destroy_all
JobSeekerProfile.destroy_all
User.destroy_all

puts "Creating users..."

# Create Admin User
admin = User.create!(
  name: "Admin User",
  email: "admin@example.com",
  password: "password",
  password_confirmation: "password",
  role: 2 # admin
)

# Create Employer Users and Profiles
employer1 = User.create!(
  name: "John TechLead",
  email: "john@techcorp.com",
  password: "password",
  password_confirmation: "password",
  role: 1 # employer
)

employer_profile1 = EmployerProfile.create!(
  user: employer1,
  company_name: "TechCorp Solutions",
  company_description: "Leading technology solutions provider specializing in enterprise software.",
  location: "San Francisco, CA",
  industry: "Information Technology"
)

employer2 = User.create!(
  name: "Sarah Johnson",
  email: "sarah@designhub.com",
  password: "password",
  password_confirmation: "password",
  role: 1 # employer
)

employer_profile2 = EmployerProfile.create!(
  user: employer2,
  company_name: "DesignHub Creative",
  company_description: "Award-winning design agency focused on user experience and digital products.",
  location: "New York, NY",
  industry: "Design & Creative"
)

# Create Job Seeker Users and Profiles
job_seeker1 = User.create!(
  name: "Alex Chen",
  email: "alex@example.com",
  password: "password",
  password_confirmation: "password",
  role: 0 # job_seeker
)

job_seeker_profile1 = JobSeekerProfile.create!(
  user: job_seeker1,
  title: "Senior Software Engineer",
  bio: "Full-stack developer with 5+ years of experience in Ruby on Rails and React.",
  years_of_experience: 5,
  skills: "Ruby on Rails, JavaScript, React, PostgreSQL, AWS",
  availability_status: "Available for full-time positions",
  portfolio_url: "https://alexchen.dev"
)

job_seeker2 = User.create!(
  name: "Maria Garcia",
  email: "maria@example.com",
  password: "password",
  password_confirmation: "password",
  role: 0 # job_seeker
)

job_seeker_profile2 = JobSeekerProfile.create!(
  user: job_seeker2,
  title: "UX/UI Designer",
  bio: "Passionate about creating intuitive user experiences with 4 years of industry experience.",
  years_of_experience: 4,
  skills: "Figma, Sketch, User Research, Prototyping, UI/UX Design",
  availability_status: "Available for freelance work",
  portfolio_url: "https://mariagarcia.design"
)

puts "Creating job posts..."

# Create Job Posts
job_post1 = JobPost.create!(
  employer_profile: employer_profile1,
  description: "We are looking for a skilled Ruby on Rails developer to join our team. You'll be working on building and maintaining our core product.",
  required_skills: "Ruby on Rails, JavaScript, PostgreSQL, REST APIs, TDD",
  salary_min: 90000,
  salary_max: 130000,
  job_type: 0, # full_time
  location: "San Francisco, CA (Hybrid)",
  application_deadline: Date.today + 30,
  is_active: true
)

job_post2 = JobPost.create!(
  employer_profile: employer_profile1,
  description: "Join our frontend team to build beautiful, responsive user interfaces using React and TypeScript.",
  required_skills: "React, TypeScript, CSS, Redux, Jest",
  salary_min: 85000,
  salary_max: 125000,
  job_type: 1, # part_time
  location: "Remote",
  application_deadline: Date.today + 45,
  is_active: true
)

job_post3 = JobPost.create!(
  employer_profile: employer_profile2,
  description: "We're seeking a talented UX/UI Designer to help us create amazing digital experiences for our clients.",
  required_skills: "Figma, User Research, Prototyping, UI/UX Design",
  salary_min: 75000,
  salary_max: 110000,
  job_type: 2, # contract
  location: "New York, NY (On-site)",
  application_deadline: Date.today + 21,
  is_active: true
)

puts "Creating applications..."

# Create Applications
application1 = Application.create!(
  job_post: job_post1,
  job_seeker_profile: job_seeker_profile1,
  cover_letter: "I'm excited to apply for the Senior Ruby on Rails Developer position. With my 5+ years of experience...",
  status: 0 # applied
)

application2 = Application.create!(
  job_post: job_post3,
  job_seeker_profile: job_seeker_profile2,
  cover_letter: "I'm interested in the UX/UI Designer position at DesignHub Creative. My experience aligns well with your requirements...",
  status: 1 # reviewed
)

puts "Creating offers..."

# Create Offers
offer1 = Offer.create!(
  job_post: job_post3,
  job_seeker_profile: job_seeker_profile2,
  employer_profile: employer_profile2,
  base_salary: 95000,
  benefits_description: "Health insurance, 401(k) matching, flexible work hours, professional development budget",
  status: 0 # pending
)

puts "Seeding completed successfully!"
puts "Created #{User.count} users"
puts "Created #{EmployerProfile.count} employer profiles"
puts "Created #{JobSeekerProfile.count} job seeker profiles"
puts "Created #{JobPost.count} job posts"
puts "Created #{Application.count} applications"
puts "Created #{Offer.count} offers"
