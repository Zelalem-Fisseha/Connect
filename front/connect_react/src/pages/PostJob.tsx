import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { EmployerSidebar } from '@/components/EmployerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, DollarSign, MapPin, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobData, setJobData] = useState({
    description: '',
    required_skills: [] as string[],
    salary_min: '',
    salary_max: '',
    job_type: '',
    location: '',
    application_deadline: '',
    is_active: true
  });
  const [newSkill, setNewSkill] = useState('');

  const skillSuggestions = [
    'React', 'Node.js', 'Python', 'TypeScript', 'Vue.js', 'Angular', 
    'PHP', 'Java', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'
  ];

  const addSkill = (skill: string) => {
    if (skill && !jobData.required_skills.includes(skill)) {
      setJobData({
        ...jobData,
        required_skills: [...jobData.required_skills, skill]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setJobData({
      ...jobData,
      required_skills: jobData.required_skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!jobData.description.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in the job description.",
        variant: "destructive",
      });
      return;
    }

    console.log('Posting job:', jobData);
    toast({
      title: "Job posted successfully!",
      description: "Your job posting is now live and visible to developers.",
    });
    navigate('/employer/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full">
      <EmployerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-semibold">Post a New Job</h1>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Description *
                        </label>
                        <Textarea
                          placeholder="Describe the job requirements, responsibilities, and what you're looking for..."
                          rows={6}
                          value={jobData.description}
                          onChange={(e) => setJobData({...jobData, description: e.target.value})}
                          required
                          maxLength={2000}
                        />
                        <div className="text-sm text-gray-500 mt-1 text-right">
                          {jobData.description.length}/2000 characters
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            Location
                          </label>
                          <Input
                            placeholder="e.g. Remote, New York, NY"
                            value={jobData.location}
                            onChange={(e) => setJobData({...jobData, location: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Type
                          </label>
                          <Select onValueChange={(value) => setJobData({...jobData, job_type: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Full-time</SelectItem>
                              <SelectItem value="1">Part-time</SelectItem>
                              <SelectItem value="2">Contract</SelectItem>
                              <SelectItem value="3">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <DollarSign className="inline h-4 w-4 mr-1" />
                            Minimum Salary
                          </label>
                          <Input
                            type="number"
                            placeholder="e.g. 50000"
                            value={jobData.salary_min}
                            onChange={(e) => setJobData({...jobData, salary_min: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <DollarSign className="inline h-4 w-4 mr-1" />
                            Maximum Salary
                          </label>
                          <Input
                            type="number"
                            placeholder="e.g. 80000"
                            value={jobData.salary_max}
                            onChange={(e) => setJobData({...jobData, salary_max: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="inline h-4 w-4 mr-1" />
                            Application Deadline
                          </label>
                          <Input
                            type="date"
                            value={jobData.application_deadline}
                            onChange={(e) => setJobData({...jobData, application_deadline: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Skills
                      </label>
                      <div className="flex gap-2 mb-3">
                        <Input
                          placeholder="Add a skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
                        />
                        <Button
                          type="button"
                          onClick={() => addSkill(newSkill)}
                          className="gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {jobData.required_skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600 mb-2">Suggested skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {skillSuggestions
                          .filter(skill => !jobData.required_skills.includes(skill))
                          .map(skill => (
                            <Button
                              key={skill}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addSkill(skill)}
                            >
                              {skill}
                            </Button>
                          ))}
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-6">
                      <Button type="submit" className="flex-1">
                        Post Job
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/employer/dashboard')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default PostJob;