import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { EmployerSidebar } from '@/components/EmployerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Star, MessageSquare, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserMenu } from '@/components/UserMenu';
import jobSeekerService, { JobSeekerProfile } from '@/services/jobSeekerService';

// Helper function to get skills array from string
const getSkillsArray = (skillsString: string): string[] => {
  if (!skillsString) return [];
  return skillsString.split(',').map(skill => skill.trim());
};

// Helper function to get experience level based on years
const getExperienceLevel = (years: number): string => {
  if (years < 1) return 'Entry Level';
  if (years < 3) return 'Junior';
  if (years < 5) return 'Mid Level';
  return 'Senior';
};

const EmployerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [jobSeekers, setJobSeekers] = useState<JobSeekerProfile[]>([]);
  const { toast } = useToast();

  // Fetch job seeker profiles on component mount
  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        setIsLoading(true);
        const profiles = await jobSeekerService.getAllProfiles();
        setJobSeekers(profiles);
      } catch (error) {
        console.error('Error fetching job seekers:', error);
        toast({
          title: 'Error',
          description: 'Failed to load job seeker profiles. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobSeekers();
  }, [toast]);

  // Extract unique skills from all job seekers
  const allSkills = Array.from(
    new Set(
      jobSeekers.flatMap(dev => 
        getSkillsArray(dev.skills)
      )
    )
  ).sort();

  // Filter job seekers based on search term and selected skill
  const filteredDevelopers = jobSeekers.filter(dev => {
    const skillsArray = getSkillsArray(dev.skills);
    const matchesSearch = searchTerm === '' || 
      dev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skillsArray.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesSkill = !selectedSkill || skillsArray.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  const handleContact = (developerId: string, developerName: string) => {
    console.log('Contacting developer:', developerId);
    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${developerName}.`,
    });
  };

  const handleHire = (developerId: string, developerName: string) => {
    console.log('Hiring developer:', developerId);
    toast({
      title: "Hire request sent!",
      description: `Your hire request has been sent to ${developerName}.`,
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      <EmployerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <SidebarTrigger />
          <div className="ml-auto">
            <UserMenu />
          </div>
          <h1 className="text-2xl font-semibold">Find Talent</h1>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for developers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedSkill === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSkill('')}
              >
                All Skills
              </Button>
              {allSkills.map(skill => (
                <Button
                  key={skill}
                  variant={selectedSkill === skill ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>

          {/* Developer Profiles */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2">Loading job seekers...</span>
            </div>
          ) : filteredDevelopers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm || selectedSkill 
                  ? 'No job seekers match your search criteria.'
                  : 'No job seekers available at the moment.'}
              </p>
              {(searchTerm || selectedSkill) && (
                <Button 
                  variant="ghost" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkill('');
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevelopers.map((developer) => (
                <motion.div
                  key={developer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                      <div className="absolute -bottom-8 left-4">
                        <Avatar className="h-16 w-16 border-4 border-white">
                          <AvatarImage 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(developer.user?.name || developer.title)}&background=random`} 
                            alt={developer.title} 
                          />
                          <AvatarFallback>
                            {developer.user?.name?.charAt(0) || developer.title.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <CardHeader className="pt-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {developer.user?.name || 'Anonymous Developer'}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {getExperienceLevel(developer.years_of_experience)} • {developer.years_of_experience} {developer.years_of_experience === 1 ? 'year' : 'years'} experience
                          </CardDescription>
                        </div>
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm font-medium text-gray-700">
                            {developer.years_of_experience > 3 ? '4.8' : '4.2'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-medium text-sm">{developer.title}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Remote • {developer.availability_status || 'Available'}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {developer.bio || 'No bio available.'}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getSkillsArray(developer.skills).slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {getSkillsArray(developer.skills).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{getSkillsArray(developer.skills).length - 3} more
                          </Badge>
                        )}
                        {getSkillsArray(developer.skills).length === 0 && (
                          <span className="text-xs text-gray-500">No skills listed</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/developers/${developer.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Link>
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleContact(developer.id.toString(), developer.user?.name || 'the developer')}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleHire(developer.id.toString(), developer.user?.name || 'the developer')}
                          >
                            Hire Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </SidebarInset>
    </div>
  );
};

export default EmployerDashboard;