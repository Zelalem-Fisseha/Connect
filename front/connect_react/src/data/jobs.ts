export const jobs = [
  {
    id: 1,
    employer_profile_id: 1,
    description: 'We need an experienced React developer to build a modern web application with Node.js backend. The project involves creating a user dashboard, API integration, and responsive design.',
    required_skills: 'React, Node.js, TypeScript, MongoDB',
    salary_min: 50000,
    salary_max: 80000,
    job_type: 0,
    location: 'Remote',
    application_deadline: '2025-09-01',
    is_active: true,
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z'
  },
  {
    id: 2,
    employer_profile_id: 1,
    description: 'Looking for a Python expert to develop REST APIs and integrate with machine learning models. Experience with Django/Flask and AWS is required.',
    required_skills: 'Python, Django, AWS, PostgreSQL',
    salary_min: 60000,
    salary_max: 90000,
    job_type: 1,
    location: 'New York, NY',
    application_deadline: '2025-09-15',
    is_active: true,
    created_at: '2025-08-02T00:00:00Z',
    updated_at: '2025-08-02T00:00:00Z'
  },
  {
    id: 3,
    employer_profile_id: 1,
    description: 'Create a beautiful, interactive website using Vue.js. Must have experience with animations, responsive design, and modern CSS frameworks.',
    required_skills: 'Vue.js, JavaScript, CSS3, Tailwind',
    salary_min: 45000,
    salary_max: 70000,
    job_type: 2,
    location: 'San Francisco, CA',
    application_deadline: '2025-08-30',
    is_active: true,
    created_at: '2025-08-03T00:00:00Z',
    updated_at: '2025-08-03T00:00:00Z'
  },
  {
    id: 4,
    employer_profile_id: 1,
    description: 'Develop a cross-platform mobile application using React Native. The app will include user authentication, real-time messaging, and payment integration.',
    required_skills: 'React Native, JavaScript, Firebase, Stripe',
    salary_min: 55000,
    salary_max: 85000,
    job_type: 3,
    location: 'Remote',
    application_deadline: '2025-09-20',
    is_active: true,
    created_at: '2025-08-04T00:00:00Z',
    updated_at: '2025-08-04T00:00:00Z'
  },
  {
    id: 5,
    employer_profile_id: 1,
    description: 'Set up CI/CD pipelines, containerize applications, and manage cloud infrastructure. Experience with Docker, Kubernetes, and AWS is essential.',
    required_skills: 'Docker, Kubernetes, AWS, Jenkins',
    salary_min: 70000,
    salary_max: 110000,
    job_type: 0,
    location: 'Austin, TX',
    application_deadline: '2025-09-10',
    is_active: true,
    created_at: '2025-08-05T00:00:00Z',
    updated_at: '2025-08-05T00:00:00Z'
  }
];

// Helper function to get job type label
export const getJobTypeLabel = (jobType: number): string => {
  switch (jobType) {
    case 0: return 'Full-time';
    case 1: return 'Part-time';
    case 2: return 'Contract';
    case 3: return 'Freelance';
    default: return 'Unknown';
  }
};

// Helper function to format salary range
export const formatSalaryRange = (min: number, max: number): string => {
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
};

// Helper function to get skills array from string
export const getSkillsArray = (skillsString: string): string[] => {
  return skillsString.split(',').map(skill => skill.trim());
};