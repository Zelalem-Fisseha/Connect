import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

// Types
import type { Application, JobPost } from "@/types";

// Services
import { applicationsApi } from "@/services/applicationsApi";

// Icons
import {
  Search,
  Filter,
  Eye,
  XCircle,
  Calendar,
  MapPin,
  DollarSign,
  MessageSquare,
  Briefcase,
  CheckCircle,
  Clock as ClockIcon,
  AlertCircle,
  Star,
  ExternalLink,
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { JobSeekerSidebar } from "@/components/JobSeekerSidebar";

// Helper function to convert skills string to array
const getSkillsArray = (skills?: string): string[] => {
  if (!skills) return [];
  try {
    return JSON.parse(skills);
  } catch (e) {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }
};

// Helper function to get status badge variant
const getStatusVariant = (status: number) => {
  switch (status) {
    case 0:
      return "outline";
    case 1:
      return "default";
    case 2:
      return "secondary";
    case 3:
      return "destructive";
    default:
      return "outline";
  }
};

// Helper function to get status text
const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Applied";
    case 1:
      return "In Review";
    case 2:
      return "Interview";
    case 3:
      return "Rejected";
    case 4:
      return "Hired";
    default:
      return "Unknown";
  }
};

const JobSeekerApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await applicationsApi.getMyApplications(parseInt(user.id));
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Failed to load applications. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load applications.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [user, toast]);

  // Filter applications based on search term and status
  const filteredApplications = applications.filter((app) => {
    const job = app.job_post;
    if (!job) return false;

    const matchesSearch =
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || app.status.toString() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Get application statistics
  const getApplicationStats = () => {
    const stats = {
      total: applications.length,
      applied: applications.filter((app) => app.status === 0).length,
      inReview: applications.filter((app) => app.status === 1).length,
      interview: applications.filter((app) => app.status === 2).length,
      rejected: applications.filter((app) => app.status === 3).length,
      hired: applications.filter((app) => app.status === 4).length,
    };

    return stats;
  };

  const stats = getApplicationStats();

  // Handle application withdrawal
  const handleWithdrawApplication = async (applicationId: string) => {
    try {
      await applicationsApi.withdrawApplication(applicationId);
      setApplications(applications.filter((app) => app.id !== applicationId));
      toast({
        title: "Success",
        description: "Application withdrawn successfully.",
      });
    } catch (err) {
      console.error("Failed to withdraw application:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to withdraw application. Please try again.",
      });
    }
  };

  // Handle view job details
  const handleViewJob = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  // Handle send message to employer
  const handleSendMessage = (employerId: string) => {
    // TODO: Implement messaging functionality
    console.log("Messaging employer:", employerId);
    toast({
      title: "Coming Soon",
      description: "Messaging feature will be available soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <JobSeekerSidebar />

      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="sticky top-0 z-10 border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-semibold">My Applications</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Applications</CardDescription>
                <CardTitle className="text-3xl">{stats.total}</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>In Review</CardDescription>
                <CardTitle className="text-3xl">{stats.inReview}</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Interview Stage</CardDescription>
                <CardTitle className="text-3xl">{stats.interview}</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Hired</CardDescription>
                <CardTitle className="text-3xl">{stats.hired}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by job title, company, or location..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="w-full md:w-64">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Applications</SelectItem>
                    <SelectItem value="0">Applied</SelectItem>
                    <SelectItem value="1">In Review</SelectItem>
                    <SelectItem value="2">Interview</SelectItem>
                    <SelectItem value="3">Rejected</SelectItem>
                    <SelectItem value="4">Hired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No applications found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "You haven't applied to any jobs yet."}
                  </p>
                  {!searchTerm && statusFilter === "all" && (
                    <Button asChild>
                      <Link to="/jobs">Browse Jobs</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12 mt-1">
                            <AvatarImage
                              src={
                                application.job_post?.employer_profile?.logo_url
                              }
                              alt={
                                application.job_post?.employer_profile
                                  ?.company_name
                              }
                            />
                            <AvatarFallback>
                              {application.job_post?.title?.[0]?.toUpperCase() ||
                                "J"}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <h3 className="font-medium text-lg">
                              {application.job_post?.title ||
                                "Job Title Not Available"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {application.job_post?.employer_profile
                                ?.company_name || "Company Name Not Available"}
                            </p>
                            <div className="mt-1">
                              <Badge
                                variant={getStatusVariant(application.status)}
                              >
                                {getStatusText(application.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleViewJob(application.job_post_id.toString())
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Job
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleSendMessage(
                                application.job_post?.employer_profile_id?.toString() ||
                                  ""
                              )
                            }
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {application.job_post?.location && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{application.job_post.location}</span>
                          </div>
                        )}

                        {application.job_post?.salary_min &&
                          application.job_post?.salary_max && (
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                              <span>
                                $
                                {application.job_post.salary_min.toLocaleString()}{" "}
                                - $
                                {application.job_post.salary_max.toLocaleString()}
                              </span>
                            </div>
                          )}

                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            Applied{" "}
                            {formatDistanceToNow(
                              new Date(application.created_at),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() =>
                              handleWithdrawApplication(
                                application.id.toString()
                              )
                            }
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Withdraw
                          </Button>
                        </div>
                      </div>

                      {application.cover_letter && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-medium mb-2">
                            Your Cover Letter
                          </h4>
                          <p className="text-sm text-gray-600 whitespace-pre-line">
                            {application.cover_letter.length > 300
                              ? `${application.cover_letter.substring(
                                  0,
                                  300
                                )}...`
                              : application.cover_letter}
                          </p>
                        </div>
                      )}

                      {application.job_post?.required_skills && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-medium mb-2">
                            Required Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {getSkillsArray(
                              application.job_post.required_skills
                            ).map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {application.interview_details && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-800 mb-2">
                            <CheckCircle className="h-4 w-4 inline-block mr-1" />
                            Interview Scheduled
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Date:</span>{" "}
                              {new Date(
                                application.interview_details.scheduled_at
                              ).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span>{" "}
                              {new Date(
                                application.interview_details.scheduled_at
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            {application.interview_details.location && (
                              <div>
                                <span className="font-medium">Location:</span>{" "}
                                {application.interview_details.location}
                              </div>
                            )}
                            {application.interview_details.notes && (
                              <div className="md:col-span-2">
                                <span className="font-medium">Notes:</span>{" "}
                                {application.interview_details.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="bg-gray-50 px-6 py-3 border-t">
                      <div className="flex items-center justify-between w-full text-sm text-gray-500">
                        <span>Application ID: {application.id}</span>
                        <div className="flex items-center space-x-4">
                          <span>
                            Last updated:{" "}
                            {formatDistanceToNow(
                              new Date(application.updated_at),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>
                      </div>
                    </CardFooter>
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
