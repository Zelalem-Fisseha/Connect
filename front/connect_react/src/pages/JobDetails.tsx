import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MapPin, Calendar, DollarSign, Briefcase, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { jobPostsApi, type JobPost } from '@/services/jobPostsApi';
import { applicationsApi, type CreateApplicationData } from '@/services/applicationsApi';
import { useUser } from '@/contexts/UserContext';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [job, setJob] = useState<JobPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const jobData = await jobPostsApi.getJobPost(parseInt(id));
        setJob(jobData);
        
        // Check if user has already applied
        if (user?.id) {
          const applications = await applicationsApi.getMyApplications(parseInt(user.id));
          const hasAppliedToJob = applications.some(app => app.job_post_id === parseInt(id));
          setHasApplied(hasAppliedToJob);
        }
      } catch (err) {
        console.error('Error fetching job or applications:', err);
        setError('Failed to load job details. Please try again later.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load job details.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndApplications();
  }, [id, toast, user?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error || 'Job Not Found'}
          </h1>
          <Button onClick={() => navigate('/jobseeker/dashboard')}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setShowApplyDialog(true);
  };

  const handleSubmitApplication = async () => {
    if (!job) {
      console.error('No job data');
      return;
    }
    if (!user?.id) {
      console.error('User not authenticated');
      setApplyError('Please sign in to apply for this job.');
      return;
    }
    
    try {
      console.log('Starting application submission');
      setIsSubmitting(true);
      setApplyError(null);
      
      const applicationData = {
        cover_letter: coverLetter,
        status: 0 // Pending
      };
      
      console.log('Sending application data:', { jobId: job.id, userId: user.id, applicationData });
      const response = await applicationsApi.createApplication(
        parseInt(user.id),
        job.id,
        applicationData
      );
      console.log('Application submitted successfully:', response);
      
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
  
  const handleSaveJob = () => {
    // TODO: Implement save job functionality
    toast({
      title: 'Job saved!',
      description: 'This job has been added to your saved jobs.',
    });
  };

  const skillsArray = job.required_skills.split(',').map(skill => skill.trim());
  const jobTypeLabel = 'Full-time'; // TODO: Map job_type to label if needed
  const salaryRange = `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/jobseeker/dashboard')}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl mb-2">Job Opportunity</CardTitle>
                    <CardDescription className="text-lg">
                      {job.location} • {jobTypeLabel}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Posted {formatDistanceToNow(new Date(job.created_at))} ago
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {salaryRange}
                  </div>
                  <div className="text-sm text-gray-500">
                    Annual Salary
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Job Description */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {job.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillsArray.map(skill => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Job Details</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>Salary: {salaryRange}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span>Type: {jobTypeLabel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>Location: {job.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>About the Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" />
                      <AvatarFallback>TC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">TechCorp</h3>
                      <div className="text-sm text-gray-500">
                        Leading software company
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    We are a fast-growing tech startup focused on building innovative web applications. 
                    Our team is passionate about creating solutions that make a real impact in the industry.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Apply Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this job</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {salaryRange}
                      </div>
                      <div className="text-sm text-gray-500">
                        Annual Salary
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleApplyClick} 
                      className="w-full" 
                      size="lg"
                      disabled={!isAuthenticated || hasApplied}
                    >
                      {hasApplied ? 'Applied' : isAuthenticated ? 'Apply Now' : 'Sign In to Apply'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleSaveJob}
                    >
                      Save Job
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job Type:</span>
                      <span className="font-medium">{jobTypeLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium">{new Date(job.application_deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">{job.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Apply for {job?.description.substring(0, 50)}...</DialogTitle>
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

export default JobDetails;