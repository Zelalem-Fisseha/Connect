import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { JobSeekerSidebar } from '@/components/JobSeekerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, ExternalLink, User, Briefcase, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const JobSeekerProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    title: 'Frontend Developer',
    bio: 'Passionate about building clean UIs.',
    years_of_experience: 3,
    skills: 'React, JavaScript, CSS',
    availability_status: 'Available',
    portfolio_url: 'https://github.com'
  });

  const handleSave = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const getSkillsArray = (skillsString: string): string[] => {
    return skillsString ? skillsString.split(',').map(skill => skill.trim()) : [];
  };

  const formatSkillsString = (skillsArray: string[]): string => {
    return skillsArray.join(', ');
  };

  return (
    <div className="flex min-h-screen w-full">
      <JobSeekerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center justify-between sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">My Profile</h1>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                      <AvatarFallback>FD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{profile.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{profile.years_of_experience} years experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <Badge 
                            variant={profile.availability_status === 'Available' ? 'default' : 'secondary'}
                            className={profile.availability_status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                          >
                            {profile.availability_status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Title */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    {isEditing ? (
                      <Input
                        value={profile.title}
                        onChange={(e) => setProfile({...profile, title: e.target.value})}
                        className="mt-1"
                        placeholder="e.g. Frontend Developer"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.title}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    {isEditing ? (
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="mt-1"
                        rows={4}
                        placeholder="Tell us about yourself and your passion..."
                      />
                    ) : (
                      <p className="mt-1 text-gray-600">{profile.bio}</p>
                    )}
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Years of Experience</label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={profile.years_of_experience}
                        onChange={(e) => setProfile({...profile, years_of_experience: parseInt(e.target.value) || 0})}
                        className="mt-1"
                        min="0"
                        max="50"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.years_of_experience} years</p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Skills</label>
                    {isEditing ? (
                      <Textarea
                        value={profile.skills}
                        onChange={(e) => setProfile({...profile, skills: e.target.value})}
                        className="mt-1"
                        rows={2}
                        placeholder="React, JavaScript, CSS, HTML, TypeScript (comma-separated)"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {getSkillsArray(profile.skills).map(skill => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Availability Status */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Availability Status</label>
                    {isEditing ? (
                      <Select 
                        value={profile.availability_status} 
                        onValueChange={(value) => setProfile({...profile, availability_status: value})}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Busy">Busy</SelectItem>
                          <SelectItem value="Not Available">Not Available</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="mt-1">
                        <Badge 
                          variant={profile.availability_status === 'Available' ? 'default' : 'secondary'}
                          className={profile.availability_status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {profile.availability_status}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Portfolio URL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Portfolio URL</label>
                    {isEditing ? (
                      <Input
                        value={profile.portfolio_url}
                        onChange={(e) => setProfile({...profile, portfolio_url: e.target.value})}
                        className="mt-1"
                        placeholder="https://github.com/username or https://portfolio.com"
                      />
                    ) : (
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