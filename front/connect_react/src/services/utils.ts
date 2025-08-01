// Utility functions for API data formatting and processing

// Job type mappings
export const JOB_TYPES = {
  0: 'Full-time',
  1: 'Part-time', 
  2: 'Contract',
  3: 'Freelance',
  4: 'Internship'
} as const;

export const JOB_TYPE_VALUES = {
  'Full-time': 0,
  'Part-time': 1,
  'Contract': 2,
  'Freelance': 3,
  'Internship': 4
} as const;

// Helper function to get job type label
export const getJobTypeLabel = (jobType: number): string => {
  return JOB_TYPES[jobType as keyof typeof JOB_TYPES] || 'Unknown';
};

// Helper function to get job type value from label
export const getJobTypeValue = (label: string): number => {
  return JOB_TYPE_VALUES[label as keyof typeof JOB_TYPE_VALUES] || 0;
};

// Helper function to format salary range
export const formatSalaryRange = (min: number, max: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  } else if (min) {
    return `From ${formatter.format(min)}`;
  } else if (max) {
    return `Up to ${formatter.format(max)}`;
  }
  return 'Salary not specified';
};

// Helper function to get skills array from string
export const getSkillsArray = (skillsString: string): string[] => {
  return skillsString ? skillsString.split(',').map(skill => skill.trim()) : [];
};

// Helper function to format skills array to string
export const formatSkillsString = (skillsArray: string[]): string => {
  return skillsArray.join(', ');
};

// Helper function to format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to format date for form inputs (YYYY-MM-DD)
export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Helper function to check if a date is in the past
export const isDatePast = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Helper function to get days until deadline
export const getDaysUntilDeadline = (deadlineString: string): number => {
  const deadline = new Date(deadlineString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);
  
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Helper function to get deadline status
export const getDeadlineStatus = (deadlineString: string): 'expired' | 'urgent' | 'normal' => {
  const daysUntil = getDaysUntilDeadline(deadlineString);
  
  if (daysUntil < 0) return 'expired';
  if (daysUntil <= 3) return 'urgent';
  return 'normal';
};
