import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { EmployerSidebar } from '@/components/EmployerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Star, MessageSquare, Eye } from 'lucide-react';
import { jobSeekerProfiles, getSkillsArray } from '@/data/developers';
import { useToast } from '@/hooks/use-toast';
import { UserMenu } from '@/components/UserMenu';

const EmployerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const { toast } = useToast();

  const skills = ['React', 'Node.js', 'Python', 'TypeScript', 'Vue.js', 'Angular', 'PHP', 'Java'];

  const filteredDevelopers = jobSeekerProfiles.filter(dev => {
    const skillsArray = getSkillsArray(dev.skills);
    return dev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           skillsArray.some(skill => searchTerm.toLowerCase().includes(skill.toLowerCase())) ||
           (selectedSkill && skillsArray.includes(selectedSkill));
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
              {skills.map(skill => (
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer, index) => (
              <motion.div
                key={developer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150" alt={developer.title} />
                      <AvatarFallback>{developer.title.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{developer.title}</CardTitle>
                    <CardDescription className="text-base">
                      {developer.years_of_experience} years experience
                    </CardDescription>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{developer.availability_status}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">4.8</span>
                          <span className="text-sm text-gray-500">(24 reviews)</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          ${Math.floor(50 + developer.years_of_experience * 5)}/hour
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {developer.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {getSkillsArray(developer.skills).slice(0, 4).map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {getSkillsArray(developer.skills).length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{getSkillsArray(developer.skills).length - 4} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleContact(developer.id.toString(), developer.title)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleHire(developer.id.toString(), developer.title)}
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
        </main>
      </SidebarInset>
    </div>
  );
};

export default EmployerDashboard;