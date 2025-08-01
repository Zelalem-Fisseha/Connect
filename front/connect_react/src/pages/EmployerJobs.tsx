import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { EmployerSidebar } from '@/components/EmployerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  MoreHorizontal,
  Briefcase
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Mock data based on db.json structure
interface JobPost {
  id: number;
  employer_profile_id: number;
  description: string;
  required_skills: string;
  salary_min: number;
  salary_max: number;
  job_type: number;
  location: string;
  application_deadline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const mockJobs: JobPost[] = [
  {
    id: 1,
    employer_profile_id: 1,
    description: "Looking for a full stack developer with experience in Rails and React.",
    required_skills: "Rails, React, JavaScript, PostgreSQL",
    salary_min: 50000,
    salary_max: 80000,
    job_type: 0,
    location: "Remote",
    application_deadline: "2025-09-01",
    is_active: true,
    created_at: "2025-08-01T00:00:00Z",
    updated_at: "2025-08-01T00:00:00Z"
  },
  {
    id: 2,
    employer_profile_id: 1,
    description: "Frontend developer needed for React application development.",
    required_skills: "React, TypeScript, CSS, HTML",
    salary_min: 45000,
    salary_max: 70000,
    job_type: 1,
    location: "New York",
    application_deadline: "2025-08-15",
    is_active: false,
    created_at: "2025-07-15T00:00:00Z",
    updated_at: "2025-07-15T00:00:00Z"
  }
];

const getJobTypeLabel = (jobType: number): string => {
  const jobTypes = {
    0: 'Full-time',
    1: 'Part-time',
    2: 'Contract',
    3: 'Freelance',
    4: 'Internship'
  };
  return jobTypes[jobType as keyof typeof jobTypes] || 'Unknown';
};

const formatSalaryRange = (min: number, max: number): string => {
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

const getSkillsArray = (skillsString: string): string[] => {
  return skillsString ? skillsString.split(',').map(skill => skill.trim()) : [];
};

const EmployerJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobs, setJobs] = useState<JobPost[]>(mockJobs);
  const { toast } = useToast();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && job.is_active) ||
                         (statusFilter === 'inactive' && !job.is_active);
    return matchesSearch && matchesStatus;
  });

  const handleEditJob = (jobId: number) => {
    console.log('Editing job:', jobId);
    toast({
      title: "Edit Job",
      description: "Redirecting to edit job page...",
    });
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "Job has been deleted successfully.",
    });
  };

  const handleViewApplications = (jobId: number) => {
    console.log('Viewing applications for job:', jobId);
    toast({
      title: "View Applications",
      description: "Opening applications for this job...",
    });
  };

  const handleToggleJobStatus = (jobId: number) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, is_active: !job.is_active } : job
    ));
    toast({
      title: "Job Status Updated",
      description: "Job status has been updated.",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      <EmployerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center justify-between sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">My Jobs</h1>
          </div>
          <Link to="/employer/post-job">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Overview */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                    <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {jobs.filter(job => job.is_active).length}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Eye className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => {
              const skillsArray = getSkillsArray(job.required_skills);
              const jobTypeLabel = getJobTypeLabel(job.job_type);
              const salaryRange = formatSalaryRange(job.salary_min, job.salary_max);

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge 
                                variant={job.is_active ? "default" : "secondary"}
                                className={job.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                              >
                                {job.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                              <Badge variant="outline">{jobTypeLabel}</Badge>
                            </div>
                            <p className="text-gray-900 font-medium mb-3 leading-relaxed">
                              {job.description}
                            </p>
                            
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{salaryRange}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {skillsArray.slice(0, 3).map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {skillsArray.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{skillsArray.length - 3} more
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewApplications(job.id)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Applications
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditJob(job.id)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleToggleJobStatus(job.id)}>
                                      {job.is_active ? 'Deactivate' : 'Activate'} Job
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleDeleteJob(job.id)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Job
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {filteredJobs.length === 0 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-16 text-center">
                  <div className="text-gray-500">
                    <Search className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                    <h3 className="text-2xl font-semibold mb-4">No jobs found</h3>
                    <p className="text-lg mb-8">Try adjusting your search criteria or post a new job</p>
                    <Link to="/employer/post-job">
                      <Button size="lg">
                        <Plus className="h-5 w-5 mr-2" />
                        Post New Job
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default EmployerJobs;
