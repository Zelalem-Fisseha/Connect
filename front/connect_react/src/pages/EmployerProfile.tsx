import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { EmployerSidebar } from '@/components/EmployerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, MapPin, Users, Calendar, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmployerProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    company_name: 'TechCorp',
    company_description: 'Leading software company.',
    location: 'New York',
    industry: 'Software'
  });

  const handleSave = () => {
    console.log('Saving company profile:', profile);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your company profile has been successfully updated.",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      <EmployerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center justify-between sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">Company Profile</h1>
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
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" />
                      <AvatarFallback>TS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-3">
                          <Input
                            value={profile.company_name}
                            onChange={(e) => setProfile({...profile, company_name: e.target.value})}
                            className="text-xl font-bold"
                            placeholder="Company Name"
                          />
                          <Input
                            value={profile.industry}
                            onChange={(e) => setProfile({...profile, industry: e.target.value})}
                            placeholder="Industry"
                          />
                          <Input
                            value={profile.location}
                            onChange={(e) => setProfile({...profile, location: e.target.value})}
                            placeholder="Location"
                          />
                        </div>
                      ) : (
                        <>
                          <CardTitle className="text-2xl">{profile.company_name}</CardTitle>
                          <CardDescription className="text-lg">{profile.industry}</CardDescription>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{profile.location}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Company Description</label>
                    {isEditing ? (
                      <Textarea
                        value={profile.company_description}
                        onChange={(e) => setProfile({...profile, company_description: e.target.value})}
                        className="mt-1"
                        rows={4}
                        placeholder="Describe your company..."
                      />
                    ) : (
                      <p className="mt-1 text-gray-600">{profile.company_description}</p>
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

export default EmployerProfile;