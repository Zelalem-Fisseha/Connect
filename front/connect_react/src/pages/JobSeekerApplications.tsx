import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { JobSeekerSidebar } from '@/components/JobSeekerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Eye, 
  MessageSquare, 
  Calendar,
  Filter,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  AlertCircle,
  Star,
  ExternalLink
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobs, getJobTypeLabel, formatSalaryRange, getSkillsArray } from '@/data/jobs';
import { useToast } from '@/hooks/use-toast';

const JobSeekerApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  // Mock applications data - in real app this would come from API
  const applications = jobs.map((job, index) => {
    const skillsArray = getSkillsArray(job.required_skills);
    return {
      id: `app-${job.id}`,
      jobId: job.id,
      job: job,
      status: ['Applied', 'Under Review', 'Interview Scheduled', 'Hired', 'Rejected'][Math.floor(Math.random() * 5)],
      appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      proposal: `I'm excited to apply for this position. With my experience in ${skillsArray.slice(0, 2).join(', ')}, I believe I would be a great fit for this role. I have successfully delivered similar projects and am confident I can contribute to your team's success.`,
      coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in this position. With my background in ${skillsArray.slice(0, 3).join(', ')}, I am confident in my ability to make valuable contributions to your team.

My experience includes:
• ${skillsArray[0]}: 3+ years of hands-on development
• ${skillsArray[1]}: Building scalable applications
• ${skillsArray[2]}: Database design and optimization

I am particularly drawn to this opportunity because of your innovative approach to technology and commitment to excellence.

Thank you for considering my application. I look forward to discussing how my skills and experience can benefit your team.

Best regards,
John Doe`,
      employerResponse: Math.random() > 0.5 ? {
        message: "Thank you for your application. We're reviewing your profile and will get back to you within 3-5 business days.",
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        employer: 'TechCorp'
      } : null,
      interviewDetails: Math.random() > 0.7 ? {
        date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        time: '10:00 AM',
        type: 'Video Call',
        platform: 'Zoom',
        interviewer: 'Sarah Johnson',
        notes: 'Please prepare to discuss your technical experience and previous projects.'
      } : null
    };
  });

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Applied': return <ClockIcon className="h-4 w-4" />;
      case 'Under Review': return <AlertCircle className="h-4 w-4" />;
      case 'Interview Scheduled': return <Calendar className="h-4 w-4" />;
      case 'Hired': return <CheckCircle className="h-4 w-4" />;
      case 'Rejected': return <XCircle className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  const handleWithdrawApplication = (applicationId: string, jobDescription: string) => {
    console.log('Withdrawing application:', applicationId);
    toast({
      title: "Application Withdrawn",
      description: `Your application has been withdrawn.`,
    });
  };

  const handleViewJob = (jobId: string) => {
    console.log('Viewing job:', jobId);
  };

  const handleSendMessage = (employerName: string) => {
    console.log('Sending message to:', employerName);
    toast({
      title: "Message Sent",
      description: `Your message has been sent to the employer.`,
    });
  };

  const getApplicationStats = () => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === 'Applied').length;
    const underReview = applications.filter(app => app.status === 'Under Review').length;
    const interviews = applications.filter(app => app.status === 'Interview Scheduled').length;
    const hired = applications.filter(app => app.status === 'Hired').length;
    const rejected = applications.filter(app => app.status === 'Rejected').length;

    return { total, applied, underReview, interviews, hired, rejected };
  };

  const stats = getApplicationStats();

  return (
    <div className="flex min-h-screen w-full">
      <JobSeekerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">My Applications</h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search your applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Applied</p>
                    <p className="text-2xl font-bold">{stats.applied}</p>
                  </div>
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ClockIcon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reviewing</p>
                    <p className="text-2xl font-bold">{stats.underReview}</p>
                  </div>
                  <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interviews</p>
                    <p className="text-2xl font-bold">{stats.interviews}</p>
                  </div>
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hired</p>
                    <p className="text-2xl font-bold">{stats.hired}</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                  </div>
                  <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No applications found</h3>
                    <p className="mb-4">Try adjusting your search or filters</p>
                    <Link to="/jobseeker/dashboard">
                      <Button>Browse Jobs</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">Job Application</CardTitle>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{application.status}</span>
                            </Badge>
                          </div>
                          <CardDescription className="text-sm">
                            TechCorp • Applied on {application.appliedDate}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/job/${application.jobId}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Job
                            </Button>
                          </Link>
                          {application.status === 'Applied' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleWithdrawApplication(application.id, application.job.description)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Withdraw
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {application.job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          {formatSalaryRange(application.job.salary_min, application.job.salary_max)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          Deadline: {new Date(application.job.application_deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {application.appliedDate}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-wrap gap-2">
                          {getSkillsArray(application.job.required_skills).slice(0, 3).map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {getSkillsArray(application.job.required_skills).length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{getSkillsArray(application.job.required_skills).length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendMessage('TechCorp')}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>

                      {/* Proposal Preview */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Your Proposal</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {application.proposal}
                          </p>
                          <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                            Read full proposal
                          </Button>
                        </div>
                      </div>

                      {/* Employer Response */}
                      {application.employerResponse && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{application.employerResponse.employer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">{application.employerResponse.employer}</span>
                                <span className="text-xs text-gray-500">{application.employerResponse.date}</span>
                              </div>
                              <p className="text-sm text-gray-700">{application.employerResponse.message}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Interview Details */}
                      {application.interviewDetails && (
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <h4 className="text-sm font-medium mb-2 text-purple-800">Interview Scheduled</h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Date:</span> {application.interviewDetails.date}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span> {application.interviewDetails.time}
                            </div>
                            <div>
                              <span className="font-medium">Type:</span> {application.interviewDetails.type}
                            </div>
                            <div>
                              <span className="font-medium">Platform:</span> {application.interviewDetails.platform}
                            </div>
                            <div>
                              <span className="font-medium">Interviewer:</span> {application.interviewDetails.interviewer}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-purple-700">
                            <strong>Notes:</strong> {application.interviewDetails.notes}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default JobSeekerApplications; 