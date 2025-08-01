export const jobSeekerProfiles = [
  {
    id: 1,
    user_id: 1,
    title: 'Full Stack React Developer',
    bio: 'Experienced full-stack developer with 6+ years building scalable web applications. Specialized in React, Node.js, and cloud architecture. Delivered 50+ successful projects.',
    years_of_experience: 6,
    skills: 'React, Node.js, TypeScript, AWS, MongoDB, GraphQL',
    availability_status: 'Available',
    portfolio_url: 'https://sarahjohnson.dev',
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z'
  },
  {
    id: 2,
    user_id: 2,
    title: 'Python Backend Specialist',
    bio: 'Backend engineer focused on Python, Django, and machine learning integration. Strong experience in API development, database optimization, and cloud deployment.',
    years_of_experience: 4,
    skills: 'Python, Django, PostgreSQL, Docker, AWS, Redis',
    availability_status: 'Available in 1 week',
    portfolio_url: 'https://michaelchen.dev',
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z'
  },
  {
    id: 3,
    user_id: 3,
    title: 'UI/UX Developer',
    bio: 'Creative developer combining design and code. Expert in Vue.js, React, and modern CSS. Passionate about creating beautiful, user-friendly interfaces.',
    years_of_experience: 3,
    skills: 'Vue.js, React, CSS3, Figma, Tailwind, JavaScript',
    availability_status: 'Available',
    portfolio_url: 'https://emilyrodriguez.dev',
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z'
  },
  {
    id: 4,
    user_id: 4,
    title: 'Mobile App Developer',
    bio: 'Mobile development expert with React Native and Flutter. Built 20+ apps with millions of downloads. Specialized in performance optimization and user experience.',
    years_of_experience: 5,
    skills: 'React Native, Flutter, JavaScript, Dart, Firebase, iOS',
    availability_status: 'Available in 2 weeks',
    portfolio_url: 'https://davidkim.dev',
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z'
  },
  {
    id: 5,
    user_id: 5,
    title: 'DevOps Engineer',
    bio: 'DevOps specialist with expertise in cloud infrastructure, containerization, and CI/CD pipelines. Helped 100+ companies scale their applications efficiently.',
    years_of_experience: 7,
    skills: 'Docker, Kubernetes, AWS, Jenkins, Terraform, Linux',
    availability_status: 'Available',
    portfolio_url: 'https://lisathompson.dev',
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z'
  },
  {
    id: 6,
    user_id: 6,
    title: 'Blockchain Developer',
    bio: 'Blockchain and smart contract developer with deep knowledge of Ethereum, Solidity, and DeFi protocols. Built secure, audited smart contracts for various projects.',
    years_of_experience: 3,
    skills: 'Solidity, Web3.js, Ethereum, JavaScript, Node.js, React',
    availability_status: 'Available in 1 week',
    portfolio_url: 'https://alexmartinez.dev',
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z'
  }
];

// Helper function to get skills array from string
export const getSkillsArray = (skillsString: string): string[] => {
  return skillsString.split(',').map(skill => skill.trim());
};

// Helper function to get experience level based on years
export const getExperienceLevel = (years: number): string => {
  if (years < 2) return 'Entry Level';
  if (years < 5) return 'Intermediate';
  return 'Expert';
};

// For backward compatibility, keep the old name
export const developers = jobSeekerProfiles;