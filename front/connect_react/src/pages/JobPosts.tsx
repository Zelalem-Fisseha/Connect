import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { EmployerSidebar } from '@/components/EmployerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Briefcase, MapPin, Clock, DollarSign, Search, Filter, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jobPostService, { JobPost } from '@/services/jobPostService';
import { formatDistanceToNow } from 'date-fns';

type JobPostWithId = JobPost & { id: number };

const JobPosts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobPosts, setJobPosts] = useState<JobPostWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    status: 'active',
  });

  // Fetch job posts on component mount
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        setIsLoading(true);
        const data = await jobPostService.getEmployerJobPosts();
        setJobPosts(data);
      } catch (error) {
        console.error('Error fetching job posts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load job posts. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosts();
  }, [toast]);

  // Handle job post status toggle
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await jobPostService.toggleJobPostStatus(id, !currentStatus);
      setJobPosts(jobPosts.map(post => 
        post.id === id ? { ...post, is_active: !currentStatus } : post
      ));
      toast({
        title: 'Success',
        description: `Job post has been ${!currentStatus ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      console.error('Error updating job post status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update job post status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle job post deletion
  const handleDeleteJob = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job post? This action cannot be undone.')) {
      try {
        await jobPostService.deleteJobPost(id);
        setJobPosts(jobPosts.filter(post => post.id !== id));
        toast({
          title: 'Success',
          description: 'Job post has been deleted.',
        });
      } catch (error) {
        console.error('Error deleting job post:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete job post. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  // Filter job posts based on search and filters
  const filteredJobPosts = jobPosts.filter(post => {
    const skillsString = Array.isArray(post.required_skills) 
      ? post.required_skills.join(' ') 
      : post.required_skills || '';
        
    const matchesSearch = 
      (post.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      skillsString.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJobType = filters.jobType ? 
      post.job_type === parseInt(filters.jobType) : true;
    
    const matchesStatus = 
      (filters.status === 'active' && post.is_active) ||
      (filters.status === 'inactive' && !post.is_active) ||
      filters.status === 'all';
    
    return matchesSearch && matchesJobType && matchesStatus;
  });

  // Get job type label
  const getJobTypeLabel = (type: number) => {
    const types = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
    return types[type] || 'Unknown';
  };

  // Get status badge
  const getStatusBadge = (isActive: boolean) => (
    <Badge variant={isActive ? 'default' : 'outline'} className="ml-2">
      {isActive ? 'Active' : 'Inactive'}
    </Badge>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <EmployerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center justify-between sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">Job Posts</h1>
          </div>
          <Button asChild>
            <Link to="/employer/post-job">
              <Plus className="h-4 w-4 mr-2" />
              Post a Job
            </Link>
          </Button>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search jobs by title, description, or skills..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              <Select
                value={filters.jobType}
                onValueChange={(value) => setFilters({...filters, jobType: value})}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Job Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Job Types</SelectItem>
                  <SelectItem value="0">Full-time</SelectItem>
                  <SelectItem value="1">Part-time</SelectItem>
                  <SelectItem value="2">Contract</SelectItem>
                  <SelectItem value="3">Freelance</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({...filters, status: value})}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              {(filters.jobType || filters.status !== 'all' || searchTerm) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      jobType: '',
                      status: 'active',
                    });
                  }}
                  className="ml-2"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Job Posts List */}
          {filteredJobPosts.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No job posts found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filters.jobType || filters.status !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating a new job post.'}
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/employer/post-job">
                    <Plus className="h-4 w-4 mr-2" />
                    Post a Job
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobPosts.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {getJobTypeLabel(job.job_type)} Developer
                            {getStatusBadge(job.is_active)}
                          </CardTitle>
                          <CardDescription className="mt-1 flex items-center">
                            <Briefcase className="h-4 w-4 mr-1.5 text-muted-foreground" />
                            {getJobTypeLabel(Number(job.job_type))}
                            <span className="mx-2">•</span>
                            <MapPin className="h-4 w-4 mr-1.5 text-muted-foreground" />
                            {job.location || 'Remote'}
                            <span className="mx-2">•</span>
                            <DollarSign className="h-4 w-4 mr-1.5 text-muted-foreground" />
                            ${job.salary_min?.toLocaleString()}
                            {job.salary_max && ` - $${job.salary_max.toLocaleString()}`}
                          </CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="inline h-4 w-4 mr-1" />
                          {formatDistanceToNow(new Date(job.created_at || ''), { addSuffix: true })}
                        </div>
                      </div>
                      
                      {job.required_skills && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {typeof job.required_skills === 'string' 
                            ? job.required_skills.split(',').map((skill, i) => (
                                <Badge key={i} variant="secondary">
                                  {skill.trim()}
                                </Badge>
                              ))
                            : job.required_skills.map((skill, i) => (
                                <Badge key={i} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {job.description}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="border-t bg-gray-50 px-6 py-3 flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {job.application_deadline && (
                          <>
                            <span className="font-medium">Deadline:</span>{' '}
                            {new Date(job.application_deadline).toLocaleDateString()}
                          </>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant={job.is_active ? 'outline' : 'secondary'}
                          size="sm"
                          onClick={() => handleToggleStatus(job.id, job.is_active)}
                        >
                          {job.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/employer/jobs/${job.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/employer/post-job/${job.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </SidebarInset>
    </div>
  );
};

export default JobPosts;
