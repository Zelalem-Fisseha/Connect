import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { EmployerSidebar } from "@/components/EmployerSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, DollarSign, MapPin, Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jobPostService, { JobPost } from "@/services/jobPostService";
import { useUser } from "@/contexts/UserContext";
import api from "@/services/api";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobData, setJobData] = useState<
    Omit<
      JobPost,
      | "id"
      | "created_at"
      | "updated_at"
      | "employer_profile_id"
      | "required_skills"
    > & { required_skills: string[] }
  >({
    description: "",
    required_skills: [],
    salary_min: "",
    salary_max: "",
    job_type: 0,
    location: "Remote",
    application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    is_active: true,
  });
  const [newSkill, setNewSkill] = useState("");

  // Get employer profile ID from either nested profile or root level
  const employerProfileId = user?.profile?.id || 
    (user && 'id' in user ? user.id : undefined);

  const skillSuggestions = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "Vue.js",
    "Angular",
    "PHP",
    "Java",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
  ];

  const addSkill = (skill: string) => {
    if (skill && !jobData.required_skills.includes(skill)) {
      setJobData({
        ...jobData,
        required_skills: [...jobData.required_skills, skill],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setJobData({
      ...jobData,
      required_skills: jobData.required_skills.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  useEffect(() => {
    if (user) {
      // Check if user has an employer profile
      if (user.type === 'employer' || user.role === 1) {
        // Check for both nested profile and direct profile properties
        const hasProfile = (
          (user.profile?.id) || 
          ('company_name' in user && user.company_name) // Check for direct profile properties
        );

        if (!hasProfile) {
          toast({
            title: "Profile Required",
            description: "Please complete your employer profile before posting a job.",
            variant: "destructive",
          });
          navigate("/employer/profile");
          return;
        }
        setIsLoading(false);
      } else {
        // Redirect to appropriate dashboard if not an employer
        toast({
          title: "Access Denied",
          description: "Only employers can post jobs.",
          variant: "destructive",
        });
        navigate("/jobseeker/dashboard");
      }
    }
  }, [user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employerProfileId) {
      toast({
        title: "Error",
        description:
          "No employer profile found. Please complete your employer profile first.",
        variant: "destructive",
      });
      navigate("/employer/profile");
      return;
    }

    if (jobData.required_skills.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one required skill.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const jobPostData = {
      employer_profile_id: employerProfileId,
      description: jobData.description,
      required_skills: jobData.required_skills.join(","),
      salary_min: Number(jobData.salary_min) || 0,
      salary_max: Number(jobData.salary_max) || 0,
      job_type: Number(jobData.job_type) || 0,
      location: jobData.location,
      application_deadline: jobData.application_deadline,
      is_active: jobData.is_active,
    };

    try {
      setIsSubmitting(true);
      await jobPostService.createJobPost(jobPostData);

      toast({
        title: "Job posted successfully!",
        description: "Your job posting is now live and visible to developers.",
      });

      // Navigate to the employer's job posts page
      navigate("/employer/jobs");
    } catch (error) {
      console.error("Error posting job:", error);
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <EmployerSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Post a New Job</h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description *
                      </label>
                      <Textarea
                        placeholder="Describe the job requirements, responsibilities, and what you're looking for..."
                        rows={6}
                        value={jobData.description}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            description: e.target.value,
                          })
                        }
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
                          onChange={(e) =>
                            setJobData({ ...jobData, location: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Type
                        </label>
                        <Select
                          value={jobData.job_type.toString()}
                          onValueChange={(value) =>
                            setJobData({
                              ...jobData,
                              job_type: parseInt(value, 10),
                            })
                          }
                        >
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
                          onChange={(e) =>
                            setJobData({
                              ...jobData,
                              salary_min: e.target.value,
                            })
                          }
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
                          onChange={(e) =>
                            setJobData({
                              ...jobData,
                              salary_max: e.target.value,
                            })
                          }
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
                          onChange={(e) =>
                            setJobData({
                              ...jobData,
                              application_deadline: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addSkill(newSkill))
                        }
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
                      {jobData.required_skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="gap-1"
                        >
                          {skill}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeSkill(skill)}
                          />
                        </Badge>
                      ))}
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      Suggested skills:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions
                        .filter(
                          (skill) => !jobData.required_skills.includes(skill)
                        )
                        .map((skill) => (
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

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Posting..." : "Post Job"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/employer/dashboard")}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
