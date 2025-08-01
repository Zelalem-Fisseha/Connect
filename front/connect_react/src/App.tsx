import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "@/pages/Index";
import JobSeekerDashboard from "@/pages/JobSeekerDashboard";
import EmployerDashboard from "@/pages/EmployerDashboard";
import JobSeekerProfile from "@/pages/JobSeekerProfile";
import EmployerProfile from "@/pages/EmployerProfile";
import JobDetails from "@/pages/JobDetails";
import PostJob from "@/pages/PostJob";
import EmployerJobs from "@/pages/EmployerJobs";
import JobSeekerSettings from "@/pages/JobSeekerSettings";
import JobSeekerApplications from "@/pages/JobSeekerApplications";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";
import AuthGuard from "@/components/AuthGuard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <UserProvider>
              <SidebarProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/jobseeker/dashboard" element={
                    <AuthGuard requiredUserType="jobseeker">
                      <JobSeekerDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/jobseeker/settings" element={
                    <AuthGuard requiredUserType="jobseeker">
                      <JobSeekerSettings />
                    </AuthGuard>
                  } />
                  <Route path="/jobseeker/applications" element={
                    <AuthGuard requiredUserType="jobseeker">
                      <JobSeekerApplications />
                    </AuthGuard>
                  } />
                  <Route path="/employer/dashboard" element={
                    <AuthGuard requiredUserType="employer">
                      <EmployerDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/employer/post-job" element={
                    <AuthGuard requiredUserType="employer">
                      <PostJob />
                    </AuthGuard>
                  } />
                  <Route path="/employer/jobs" element={
                    <AuthGuard requiredUserType="employer">
                      <EmployerJobs />
                    </AuthGuard>
                  } />
                  <Route path="/jobseeker/profile" element={
                    <AuthGuard requiredUserType="jobseeker">
                      <JobSeekerProfile />
                    </AuthGuard>
                  } />
                  <Route path="/employer/profile" element={
                    <AuthGuard requiredUserType="employer">
                      <EmployerProfile />
                    </AuthGuard>
                  } />
                  <Route path="/job/:id" element={
                    <AuthGuard>
                      <JobDetails />
                    </AuthGuard>
                  } />
                  <Route path="/messages" element={
                    <AuthGuard>
                      <Messages />
                    </AuthGuard>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SidebarProvider>
            </UserProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;