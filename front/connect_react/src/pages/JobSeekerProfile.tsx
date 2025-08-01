import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { JobSeekerSidebar } from '@/components/JobSeekerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobSeekerProfilesApi, type JobSeekerProfile } from '@/services/jobSeekerProfilesApi';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, ExternalLink, User, Briefcase, Clock, Loader2, Pencil, Save } from 'lucide-react';

type AvailabilityStatus = 'available' | 'not_available' | 'open_to_offers';

interface ProfileFormData {
  title: string;
  bio: string;
  years_of_experience: number;
  skills: string;
  availability_status: AvailabilityStatus;
  portfolio_url: string;
}

const JobSeekerProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [hasProfile, setHasProfile] = useState(false);

  // Initialize form state
  const [formData, setFormData] = useState<ProfileFormData>({
    title: '',
    bio: '',
    years_of_experience: 0,
    skills: '',
    availability_status: 'available',
    portfolio_url: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const data = await jobSeekerProfilesApi.getProfile(user.id);
        setProfile(data);
        setHasProfile(true);
        setIsEditing(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 404) {
          // Profile doesn't exist yet
          setHasProfile(false);
          setIsEditing(true);
          toast({
            title: 'Create Your Profile',
            description: 'Please complete your profile to continue',
            variant: 'default',
          });
        } else {
          console.error('Error fetching profile:', error);
          toast({
            title: 'Error',
            description: 'Failed to load profile',
            variant: 'destructive',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [toast, user?.id]);

  useEffect(() => {
    if (profile) {
      setFormData({
        title: profile.title || '',
        bio: profile.bio || '',
        years_of_experience: profile.years_of_experience || 0,
        skills: profile.skills || '',
        availability_status: profile.availability_status as AvailabilityStatus || 'available',
        portfolio_url: profile.portfolio_url || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);

      if (hasProfile && profile) {
        // Update existing profile
        const updatedProfile = await jobSeekerProfilesApi.updateProfile(user.id, formData);
        setProfile(updatedProfile);
        setHasProfile(true);
        toast({
          title: 'Success!',
          description: 'Your profile has been updated.',
        });
      } else {
        // Create new profile
        const newProfile = await jobSeekerProfilesApi.createProfile(user.id, formData);
        setProfile(newProfile);
        setHasProfile(true);
        toast({
          title: 'Profile Created!',
          description: 'Your profile has been created successfully.',
        });
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSkillsArray = (skillsString: string): string[] => {
    if (!skillsString) return [];
    return skillsString
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  };

  // Handle input changes for the profile form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => {
      if (name === 'years_of_experience') {
        return {
          ...prev,
          years_of_experience: parseInt(value) || 0
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // Handle select changes with proper type checking
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      if (name === 'availability_status') {
        // Type guard to ensure value is a valid AvailabilityStatus
        if (value === 'available' || value === 'not_available' || value === 'open_to_offers') {
          return {
            ...prev,
            availability_status: value as AvailabilityStatus
          };
        }
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const formatSkillsString = (skillsArray: string[]): string => {
    return skillsArray.join(', ');
  };

  if (isLoading && !profile) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <JobSeekerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-bold">
                {hasProfile ? 'My Profile' : 'Create Your Profile'}
              </h1>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {!isEditing && hasProfile ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto"
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                ) : (
                  <>
                    {hasProfile && (
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button 
                      onClick={handleSave} 
                      disabled={isLoading}
                      className="w-full sm:w-auto"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      {hasProfile ? 'Save Changes' : 'Create Profile'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <Card className="w-full">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="w-full sm:w-auto flex justify-center sm:block">
                      <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                        <AvatarFallback>FD</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 w-full">
                      <CardTitle className="text-xl sm:text-2xl text-center sm:text-left">
                        {isEditing ? (
                          <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Job Title"
                            className="text-xl sm:text-2xl font-semibold p-0 border-0 shadow-none focus-visible:ring-0 text-center sm:text-left"
                          />
                        ) : (
                          profile?.title || 'Your Profile'
                        )}
                      </CardTitle>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                name="years_of_experience"
                                value={formData.years_of_experience}
                                onChange={handleInputChange}
                                className="w-20"
                                min="0"
                              />
                              <span className="text-sm text-gray-500 whitespace-nowrap">years</span>
                            </div>
                          ) : (
                            <span className="text-gray-600">
                              {profile?.years_of_experience || 0} years experience
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          {isEditing ? (
                            <Select
                              value={formData.availability_status}
                              onValueChange={(value) => handleSelectChange('availability_status', value)}
                            >
                              <SelectTrigger className="w-full sm:w-40">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="not_available">Not Available</SelectItem>
                                <SelectItem value="open_to_offers">Open to Offers</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge 
                              variant={profile?.availability_status === 'available' ? 'default' : 'secondary'}
                              className={`whitespace-nowrap ${profile?.availability_status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                            >
                              {profile?.availability_status.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    {isEditing ? (
                      <Input
                        value={formData.title}
                        onChange={handleInputChange}
                        name="title"
                        className="w-full"
                        placeholder="e.g. Frontend Developer"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.title || 'Not specified'}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    {isEditing ? (
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={4}
                        placeholder="Tell us about yourself and your passion..."
                      />
                    ) : (
                      <p className="mt-1 text-gray-600 whitespace-pre-line">
                        {profile?.bio || 'No bio provided'}
                      </p>
                    )}
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Years of Experience</label>
                    {isEditing ? (
                      <Input
                        type="number"
                        name="years_of_experience"
                        value={formData.years_of_experience}
                        onChange={handleInputChange}
                        className="mt-1"
                        min="0"
                        max="50"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile?.years_of_experience} years</p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Skills</label>
                    {isEditing ? (
                      <Textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={2}
                        placeholder="React, JavaScript, CSS, HTML, TypeScript (comma-separated)"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile?.skills ? (
                          getSkillsArray(profile.skills).map(skill => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500">No skills added yet</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Availability Status */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Availability Status</label>
                    {isEditing ? (
                      <Select 
                        value={formData.availability_status}
                        onValueChange={(value) => handleSelectChange('availability_status', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select availability status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="not_available">Not Available</SelectItem>
                          <SelectItem value="open_to_offers">Open to Offers</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="mt-1">
                        <Badge 
                          variant={profile.availability_status === 'available' ? 'default' : 'secondary'}
                          className={profile.availability_status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {profile.availability_status === 'available' ? 'Available' : 
                           profile.availability_status === 'not_available' ? 'Not Available' : 'Open to Offers'}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Portfolio URL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Portfolio URL</label>
                    {isEditing ? (
                      <Input
                        name="portfolio_url"
                        value={formData.portfolio_url}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="https://github.com/username or https://portfolio.com"
                      />
                    ) : profile?.portfolio_url ? (
                      <div className="mt-1">
                        <a 
                          href={profile.portfolio_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {profile.portfolio_url}
                        </a>
                      </div>
                    ) : (
                      <p className="mt-1 text-gray-500">No portfolio link provided</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default JobSeekerProfile;