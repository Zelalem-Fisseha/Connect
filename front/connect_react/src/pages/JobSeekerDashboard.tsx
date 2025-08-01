import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { JobSeekerSidebar } from '@/components/JobSeekerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, DollarSign, Calendar, Star, MessageSquare, Eye, Filter, TrendingUp, Users, Briefcase, Loader2, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { UserMenu } from '@/components/UserMenu';
import { useUser } from '@/contexts/UserContext';
import { jobPostsApi, type JobPost } from '@/services/jobPostsApi';
import { applicationsApi, type Application } from '@/services/applicationsApi';
import { formatDistanceToNow } from 'date-fns';

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]); // Will be used when saved jobs functionality is implemented
  const [profileViews, setProfileViews] = useState(0); // Will need to be fetched from the backend
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const { toast } = useToast();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all jobs
        const jobsData = await jobPostsApi.getJobPosts();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
        
        // Fetch user's applications if authenticated
        if (user?.id) {
          try {
            const apps = await applicationsApi.getMyApplications(parseInt(user.id));
            setApplications(apps);
            
            // TODO: Fetch saved jobs when the feature is implemented
            // const saved = await savedJobsApi.getSavedJobs(parseInt(user.id));
            // setSavedJobs(saved);
            
            // TODO: Fetch profile views when the endpoint is available
            // const views = await profileApi.getProfileViews(parseInt(user.id));
            // setProfileViews(views);
          } catch (err) {
            console.error('Error fetching user data:', err);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load data. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast, user?.id]);

  // Filter jobs based on search and filters
  useEffect(() => {
    let result = [...jobs];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        job => job.description.toLowerCase().includes(term) ||
               job.location.toLowerCase().includes(term) ||
               job.required_skills.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(job => 
        job.required_skills.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    if (selectedLocation && selectedLocation !== 'All') {
      result = result.filter(job => 
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    setFilteredJobs(result);
  }, [jobs, searchTerm, selectedCategory, selectedLocation]);

  // Extract unique locations and skills for filters
  const locations = ['All', ...new Set(jobs.map(job => job.location))];
  const allSkills = jobs.flatMap(job => 
    job.required_skills.split(',').map(skill => skill.trim())
  );
  const uniqueSkills = ['All', ...new Set(allSkills)].filter(Boolean);

  const handleApplyClick = (jobId: number) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setSelectedJobId(jobId);
    setShowApplyDialog(true);
  };

  const handleSubmitApplication = async () => {
    if (!selectedJobId || !user?.id) {
      console.error('No job selected or user not authenticated');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setApplyError(null);
      
      const applicationData = {
        cover_letter: coverLetter,
        status: 0 // Pending
      };
      
      await applicationsApi.createApplication(
        parseInt(user.id),
        selectedJobId,
        applicationData
      );
      
      // Refresh applications to update the UI
      const apps = await applicationsApi.getMyApplications(parseInt(user.id));
      setApplications(apps);
      
      toast({
        title: 'Application submitted!',
        description: 'Your application has been sent to the employer.',
      });
      
      setShowApplyDialog(false);
      setCoverLetter('');
    } catch (err) {
      console.error('Error applying to job:', err);
      setApplyError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const hasAppliedToJob = (jobId: number) => {
    return applications.some(app => app.job_post_id === jobId);
  };

  const handleSaveJob = (jobId: number) => {
    // TODO: Implement save job functionality
    console.log('Saving job:', jobId);
    toast({
      title: "Job saved!",
      description: `Job has been added to your saved jobs.`,
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      <JobSeekerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center justify-between sticky top-0 z-10 gap-4 border-b bg-white px-8 py-6">
          <div className="flex items-center gap-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Next Opportunity</h1>
              <p className="text-gray-600 mt-1">Discover amazing projects and connect with top companies</p>
            </div>
          </div>
          <div className="ml-auto">
            <UserMenu />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="lg">
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages
            </Button>
            <Button size="lg" asChild>
              <Link to="/jobseeker/applications">
                <Briefcase className="h-5 w-5 mr-2" />
                My Applications
              </Link>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-8">
          {/* Stats Overview */}
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-lg">
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
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Applications</p>
                    <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Saved Jobs</p>
                    <p className="text-3xl font-bold text-gray-900">{savedJobs.length}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Profile Views</p>
                    <p className="text-3xl font-bold text-gray-900">{profileViews}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Eye className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search jobs, skills, or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueSkills.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredJobs.length} Jobs Found
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Sort by: Relevance</span>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredJobs.map((job) => {
                const skillsArray = job.required_skills.split(',').map(skill => skill.trim());
                const jobTypeLabel = 'Full-time';
                const salaryRange = `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`;
                
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" />
                              <AvatarFallback>
                                {job.location.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-1">Job Opportunity</CardTitle>
                              <CardDescription className="text-base">{job.location}</CardDescription>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSaveJob(job.id)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApplyClick(job.id)}
                              disabled={hasAppliedToJob(job.id)}
                            >
                              {hasAppliedToJob(job.id) ? 'Applied' : 'Apply'}
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-gray-700 mb-4 line-clamp-2">
                            {job.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-medium text-green-600">
                                {salaryRange}
                              </span>
                              <span className="text-sm text-gray-500">
                                {jobTypeLabel}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
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
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                            </div>
                            <Link to={`/job/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Apply for Job</DialogTitle>
            <DialogDescription>
              Submit your application for this position
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="coverLetter" className="text-sm font-medium">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="coverLetter"
                placeholder="Write a cover letter explaining why you're a good fit for this position..."
                className="min-h-[200px]"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
              />
              {applyError && (
                <p className="text-sm text-red-500">{applyError}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowApplyDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitApplication}
              disabled={isSubmitting || !coverLetter.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobSeekerDashboard;