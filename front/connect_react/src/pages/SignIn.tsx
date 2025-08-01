import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  Code,
  Users,
  ArrowRight,
  CheckCircle,
  Building,
  Globe,
  Shield
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/authService';
import { User } from '@/types/auth';

const SignIn = () => {
  const navigate = useNavigate();
  const { setUserType, setUser } = useUser();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the login service
      await authService.login(formData.email, formData.password);
      
      // Get user data after successful login
      const userData = await authService.getCurrentUser();
      
      // Update user context
      const userRole = activeTab === 'jobseeker' ? 'jobseeker' : 'employer';
      setUserType(userRole);
      setUser({
        id: userData.id.toString(),
        name: userRole === 'jobseeker' 
          ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim()
          : userData.company_name || 'Company',
        email: userData.email,
        type: userRole
      });
      
      toast({
        title: "Welcome back!",
        description: `Successfully signed in as ${userRole === 'jobseeker' ? 'Job Seeker' : 'Employer'}.`,
      });
      
      // Redirect based on user role
      const redirectPath = userRole === 'jobseeker' ? '/jobseeker/dashboard' : '/employer/dashboard';
      navigate(redirectPath);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error messages from the API if available
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in. Please try again.';
      
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      // For OAuth, you would typically redirect to the provider's auth URL
      // This is a placeholder for the actual OAuth flow
      toast({
        title: `Redirecting to ${provider}...`,
        description: 'Please complete the authentication process in the new window.',
      });
      
      // Example OAuth flow (implementation depends on your backend)
      // window.location.href = `/auth/${provider.toLowerCase()}`;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Error",
        description: `Failed to connect with ${provider}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const handleDemoLogin = (type: 'jobseeker' | 'employer') => {
    setUserType(type);
    setUser({
      id: '1',
      name: type === 'jobseeker' ? 'John Doe' : 'TechStart Inc.',
      email: 'demo@example.com',
      type: type
    });
    
    toast({
      title: "Demo Login",
      description: `Signed in as ${type === 'jobseeker' ? 'Job Seeker' : 'Employer'} (Demo Mode).`,
    });
    
    navigate(type === 'jobseeker' ? '/jobseeker/dashboard' : '/employer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md lg:max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Code className="h-10 w-10 text-blue-600" />
                  <h1 className="text-4xl font-bold text-gray-900">DevHire Pro</h1>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome back</h2>
                <p className="text-lg text-gray-600">Sign in to your account to continue</p>
              </div>

              {/* Main Card */}
              <Card className="shadow-2xl border-0">
                <CardContent className="p-8 lg:p-12">
                  {/* User Type Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
                    <TabsList className="grid w-full grid-cols-2 h-14">
                      <TabsTrigger value="jobseeker" className="flex items-center gap-3 text-base">
                        <Users className="h-5 w-5" />
                        Job Seeker
                      </TabsTrigger>
                      <TabsTrigger value="employer" className="flex items-center gap-3 text-base">
                        <Building className="h-5 w-5" />
                        Employer
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Demo Login Buttons */}
                  <div className="space-y-3 mb-8">
                    <Button 
                      variant="outline" 
                      className="w-full h-12 gap-3 text-base"
                      onClick={() => handleDemoLogin('jobseeker')}
                    >
                      <CheckCircle className="h-5 w-5" />
                      Demo as Job Seeker
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-12 gap-3 text-base"
                      onClick={() => handleDemoLogin('employer')}
                    >
                      <CheckCircle className="h-5 w-5" />
                      Demo as Employer
                    </Button>
                  </div>

                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-sm uppercase">
                      <span className="bg-white px-4 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('Google')}
                      className="h-12 gap-3 text-base"
                    >
                      <Chrome className="h-5 w-5" />
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('GitHub')}
                      className="h-12 gap-3 text-base"
                    >
                      <Github className="h-5 w-5" />
                      GitHub
                    </Button>
                  </div>

                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-sm uppercase">
                      <span className="bg-white px-4 text-gray-500">Or sign in with email</span>
                    </div>
                  </div>

                  {/* Sign In Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`h-12 pl-12 text-base ${errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-base font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className={`h-12 pl-12 pr-12 text-base ${errors.password ? 'border-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={formData.rememberMe}
                          onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                          className="rounded border-gray-300 h-5 w-5"
                        />
                        <Label htmlFor="rememberMe" className="text-base">Remember me</Label>
                      </div>
                      <Link to="/forgot-password" className="text-base text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 gap-3 text-base" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center mt-8">
                    <p className="text-base text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-16">
          <div className="flex flex-col justify-center text-white">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold mb-8">Join the Future of Work</h2>
              <p className="text-xl mb-12 leading-relaxed">
                Connect with top developers and companies worldwide. Build amazing projects together.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                    <p className="text-blue-100">Access developers and opportunities from around the world</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Secure & Verified</h3>
                    <p className="text-blue-100">All users are verified with secure payment protection</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Code className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Projects</h3>
                    <p className="text-blue-100">Curated projects and skilled developers for the best results</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 