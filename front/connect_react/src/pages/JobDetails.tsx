import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { jobs, getJobTypeLabel, formatSalaryRange, getSkillsArray } from '@/data/jobs';
import { useToast } from '@/hooks/use-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const job = jobs.find(j => j.id === parseInt(id || '0'));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Button onClick={() => navigate('/jobseeker/dashboard')}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    console.log('Applying to job:', job.id);
    toast({
      title: "Application submitted!",
      description: "Your application has been sent to the employer.",
    });
  };

  const skillsArray = getSkillsArray(job.required_skills);
  const jobTypeLabel = getJobTypeLabel(job.job_type);
  const salaryRange = formatSalaryRange(job.salary_min, job.salary_max);

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
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{jobTypeLabel}</span>
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
                    
                    <Button onClick={handleApply} className="w-full" size="lg">
                      Submit Application
                    </Button>
                    
                    <Button variant="outline" className="w-full">
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
    </div>
  );
};

export default JobDetails;