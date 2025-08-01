import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  Code,
  Users,
  User,
  Building,
  ArrowRight,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/authService';
import { User as UserType } from '@/types/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const { setUserType, setUser } = useUser();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  });

  const validateForm = () => {
    const newErrors = { ...errors };
    
    // Reset errors
    Object.keys(newErrors).forEach(key => {
      newErrors[key as keyof typeof newErrors] = '';
    });
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (activeTab === 'jobseeker' && !formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (activeTab === 'employer' && !formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare user data based on role
      const userRole = activeTab === 'jobseeker' ? 'job_seeker' : 'employer';
      
      const userData = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: userRole,
        first_name: formData.firstName,
        last_name: formData.lastName,
        ...(activeTab === 'employer' && { company_name: formData.company })
      };

      // Call the registration service
      await authService.register(userData);
      
      // After successful registration, log the user in
      await authService.login(formData.email, formData.password);
      
      // Get user data
      const userDataResponse = await authService.getCurrentUser();
      
      // Update user context
      const displayRole = activeTab as 'jobseeker' | 'employer';
      setUserType(displayRole);
      setUser({
        id: userDataResponse.id.toString(),
        name: displayRole === 'jobseeker' 
          ? `${formData.firstName} ${formData.lastName}`.trim()
          : formData.company || 'Company',
        email: userDataResponse.email,
        type: displayRole
      });
      
      toast({
        title: "Account created successfully!",
        description: `Welcome to DevHire Pro as a ${displayRole === 'jobseeker' ? 'Job Seeker' : 'Employer'}.`,
      });
      
      // Redirect based on user role
      const redirectPath = displayRole === 'jobseeker' ? '/jobseeker/onboarding' : '/employer/onboarding';
      navigate(redirectPath);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle error message
      let errorMessage = 'Failed to create an account. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    toast({
      title: `${provider} Sign Up`,
      description: `${provider} sign up functionality would be implemented here.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Code className="h-10 w-10 text-blue-600" />
                  <h1 className="text-4xl font-bold text-gray-900">Connect</h1>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Create your account</h2>
                <p className="text-lg text-gray-600">Choose your account type and get started</p>
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

                  {/* Account Type Info */}
                  <div className="bg-blue-50 p-6 rounded-xl mb-8">
                    <div className="flex items-start gap-4">
                      {activeTab === 'jobseeker' ? (
                        <>
                          <Users className="h-6 w-6 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-lg mb-2">Job Seeker Account</h4>
                            <p className="text-blue-700 leading-relaxed">
                              Find remote jobs, showcase your skills, and connect with employers worldwide.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Building className="h-6 w-6 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-lg mb-2">Employer Account</h4>
                            <p className="text-blue-700 leading-relaxed">
                              Post jobs, find talented developers, and build your dream team.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Social Sign Up */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialSignUp('Google')}
                      className="h-12 gap-3 text-base"
                    >
                      <Chrome className="h-5 w-5" />
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialSignUp('GitHub')}
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
                      <span className="bg-white px-4 text-gray-500">Or sign up with email</span>
                    </div>
                  </div>

                  {/* Sign Up Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-base font-medium">
                          {activeTab === 'jobseeker' ? 'First Name' : 'Contact Name'} *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="firstName"
                            placeholder={activeTab === 'jobseeker' ? 'First name' : 'Your name'}
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={`h-12 pl-12 text-base ${errors.firstName ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>
                      <div className={`space-y-2 ${activeTab === 'employer' ? 'opacity-50' : ''}`}>
                        <Label htmlFor="lastName" className="text-base font-medium">
                          Last Name {activeTab === 'jobseeker' && '*'}
                        </Label>
                        <div className="relative">
                          <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={`h-12 pl-12 text-base ${errors.lastName ? 'border-red-500' : ''}`}
                            disabled={activeTab === 'employer'}
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
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

                    {/* Company Field (Employer Only) */}
                    {activeTab === 'employer' && (
                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-base font-medium">Company Name *</Label>
                        <div className="relative">
                          <Building className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="company"
                            placeholder="Enter company name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className={`h-12 pl-12 text-base ${errors.company ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.company && (
                          <p className="text-sm text-red-500">{errors.company}</p>
                        )}
                      </div>
                    )}

                    {/* Password Field */}
                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-base font-medium">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
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
                      <p className="text-sm text-gray-500">
                        Must be at least 8 characters with uppercase, lowercase, and number
                      </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword" className="text-base font-medium">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`h-12 pl-12 pr-12 text-base ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Terms Agreement */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                          className="rounded border-gray-300 h-5 w-5 mt-1"
                        />
                        <div>
                          <Label htmlFor="agreeToTerms" className="text-base">
                            I agree to the{' '}
                            <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                          </Label>
                          {errors.agreeToTerms && (
                            <p className="text-sm text-red-500 mt-1">{errors.agreeToTerms}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full h-12 gap-3 text-base" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Sign In Link */}
                  <div className="text-center mt-8">
                    <p className="text-base text-gray-600">
                      Already have an account?{' '}
                      <Link to="/signin" className="text-blue-600 hover:underline font-medium">
                        Sign in
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
              <h2 className="text-4xl font-bold mb-8">Start Your Journey Today</h2>
              <p className="text-xl mb-12 leading-relaxed">
                Join thousands of developers and companies already using Connect to build amazing projects together.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Global Opportunities</h3>
                    <p className="text-blue-100">Access projects and talent from around the world</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                    <p className="text-blue-100">Verified users and secure payment protection</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
                    <p className="text-blue-100">Get started in minutes with our streamlined process</p>
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

export default SignUp;
