import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmployerSidebar } from '@/components/EmployerSidebar';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import jobPostService, { JobPost } from '@/services/jobPostService';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

export const EmployerJobPosts = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get employer profile ID from either nested profile or root level
  const employerProfileId = user?.profile?.id || 
    (user && 'id' in user ? user.id : undefined);

  useEffect(() => {
    const fetchJobPosts = async () => {
      if (!employerProfileId) {
        toast({
          title: "Error",
          description: "No employer profile found.",
          variant: "destructive",
        });
        navigate("/employer/profile");
        return;
      }

      try {
        setIsLoading(true);
        // Get job posts for the current employer
        const response = await jobPostService.getEmployerJobPosts();
        // The backend should return only the current employer's job posts
        setJobPosts(response);
      } catch (error) {
        console.error("Error fetching job posts:", error);
        toast({
          title: "Error",
          description: "Failed to load job posts. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosts();
  }, [employerProfileId, navigate, toast]);

  const handleViewDetails = (jobId: number) => {
    navigate(`/employer/jobs/${jobId}`);
  };

  const handleCreateNew = () => {
    navigate("/employer/post-job");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading job posts...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <EmployerSidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Job Posts</h1>
          <Button onClick={handleCreateNew}>
            Post New Job
          </Button>
        </div>

        {jobPosts.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                You haven't posted any jobs yet. Click the button above to create your first job post.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobPosts.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        {job.description ? 
                          (job.description.length > 50 ? job.description.substring(0, 50) + '...' : job.description) : 
                          'Untitled Job'}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Posted on {formatDate(job.created_at)}
                        {job.location && ` • ${job.location}`}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={job.is_active ? 'default' : 'secondary'}
                      className="ml-4"
                    >
                      {job.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  {job.required_skills && job.required_skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {typeof job.required_skills === 'string' ? (
                        job.required_skills.split(',').map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill.trim()}
                          </Badge>
                        ))
                      ) : (
                        // Handle case where required_skills is an array
                        job.required_skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {typeof skill === 'string' ? skill.trim() : 'Skill'}
                          </Badge>
                        ))
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-foreground line-clamp-2 mb-4">
                    {job.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {job.salary_min && (
                        <span>${job.salary_min.toLocaleString()}</span>
                      )}
                      {job.salary_max && (
                        <span> - ${job.salary_max.toLocaleString()}</span>
                      )}
                      {job.job_type !== undefined && (
                        <span> • {getJobTypeLabel(job.job_type)}</span>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewDetails(job.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get job type label
const getJobTypeLabel = (type: number): string => {
  const types = [
    'Full-time',
    'Part-time',
    'Contract',
    'Temporary',
    'Internship',
    'Remote'
  ];
  return types[type] || 'Full-time';
};

export default EmployerJobPosts;
