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
import { Search, MapPin, DollarSign, Calendar, Star, MessageSquare, Eye, Filter, TrendingUp, Users, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobs, getJobTypeLabel, formatSalaryRange, getSkillsArray } from '@/data/jobs';
import { useToast } from '@/hooks/use-toast';

const JobSeekerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const { toast } = useToast();

  const categories = ['All', 'Web Development', 'Mobile Development', 'Backend Development', 'Frontend Development', 'Full Stack Development', 'DevOps', 'UI/UX'];
  const locations = ['All', 'Remote', 'New York', 'San Francisco', 'Austin', 'London', 'Berlin'];

  const filteredJobs = jobs.filter(job => {
    const skillsArray = getSkillsArray(job.required_skills);
    const matchesSearch = job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || skillsArray.some(skill => 
      selectedCategory.toLowerCase().includes(skill.toLowerCase())
    );
    const matchesLocation = selectedLocation === '' || selectedLocation === 'All' || 
                           job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleApply = (jobId: number, jobDescription: string) => {
    console.log('Applying for job:', jobId);
    toast({
      title: "Application submitted!",
      description: `Your application has been submitted successfully.`,
    });
  };

  const handleSaveJob = (jobId: number, jobDescription: string) => {
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
          <div className="flex items-center gap-4">
            <Button variant="outline" size="lg">
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages
            </Button>
            <Button size="lg">
              <Briefcase className="h-5 w-5 mr-2" />
              My Applications
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
                    <p className="text-3xl font-bold text-gray-900">12</p>
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
                    <p className="text-3xl font-bold text-gray-900">8</p>
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
                    <p className="text-3xl font-bold text-gray-900">156</p>
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
                  {categories.map(category => (
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
                const skillsArray = getSkillsArray(job.required_skills);
                const jobTypeLabel = getJobTypeLabel(job.job_type);
                const salaryRange = formatSalaryRange(job.salary_min, job.salary_max);
                
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
                              onClick={() => handleSaveJob(job.id, job.description)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApply(job.id, job.description)}
                            >
                              Apply
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
    </div>
  );
};

export default JobSeekerDashboard;