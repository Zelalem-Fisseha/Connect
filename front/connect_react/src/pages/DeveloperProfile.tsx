import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Mail, Link2, Briefcase, Clock, Star, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jobSeekerService from '@/services/jobSeekerService';
import { JobSeekerProfile } from '@/services/jobSeekerService';

const DeveloperProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await jobSeekerService.getProfileById(parseInt(id));
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load developer profile. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/employer/dashboard">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-500 mb-6">The requested developer profile could not be found.</p>
          <Button asChild>
            <Link to="/employer/dashboard">Browse Developers</Link>
          </Button>
        </div>
      </div>
    );
  }

  const experienceLevel = (years: number): string => {
    if (years < 1) return 'Entry Level';
    if (years < 3) return 'Junior';
    if (years < 5) return 'Mid Level';
    return 'Senior';
  };

  const getSkillsArray = (skillsString: string): string[] => {
    if (!skillsString) return [];
    return skillsString.split(',').map(skill => skill.trim());
  };

  const skills = getSkillsArray(profile.skills);

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/employer/dashboard">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user?.name || profile.title)}&background=random`} 
                  alt={profile.user?.name || 'Developer'}
                />
                <AvatarFallback>
                  {profile.user?.name?.charAt(0) || profile.title.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{profile.user?.name || 'Anonymous Developer'}</CardTitle>
              <CardDescription className="text-lg">{profile.title}</CardDescription>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                <MapPin className="h-4 w-4" />
                <span>Remote • {profile.availability_status || 'Available'}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Briefcase className="h-4 w-4" />
                <span>{experienceLevel(profile.years_of_experience)} • {profile.years_of_experience} {profile.years_of_experience === 1 ? 'year' : 'years'} experience</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 mt-2">
                <Star className="h-4 w-4 fill-current" />
                <span>{profile.years_of_experience > 3 ? '4.8' : '4.2'} (24 reviews)</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {profile.portfolio_url && (
                <div className="flex items-center">
                  <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                  <a 
                    href={profile.portfolio_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {profile.portfolio_url.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              
              {profile.user?.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <a 
                    href={`mailto:${profile.user.email}`}
                    className="text-gray-600 hover:underline text-sm"
                  >
                    {profile.user.email}
                  </a>
                </div>
              )}
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No skills listed</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">
                {profile.bio || 'No bio available.'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{profile.title}</h3>
                  <p className="text-sm text-gray-500">
                    {experienceLevel(profile.years_of_experience)} • {profile.years_of_experience}+ years
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    {profile.bio || 'No additional experience details provided.'}
                  </p>
                </div>
                
                {/* This is a placeholder - in a real app, you'd have actual experience entries */}
                <div className="border-t pt-4">
                  <h3 className="font-medium">Previous Experience</h3>
                  <p className="text-sm text-gray-500">
                    {profile.years_of_experience > 2 ? '3+ years' : '1-2 years'} in related roles
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Experienced in various projects and technologies related to {profile.title.toLowerCase()}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4 justify-end">
            <Button variant="outline" size="lg" asChild>
              <a href={`mailto:${profile.user?.email || ''}`}>
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </a>
            </Button>
            <Button size="lg" asChild>
              <Link to={`/employer/dashboard?hire=${profile.id}`}>
                <Briefcase className="h-4 w-4 mr-2" />
                Hire Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
