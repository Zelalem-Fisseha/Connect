import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { JobSeekerSidebar } from '@/components/JobSeekerSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Mail, 
  Globe, 
  DollarSign,
  MapPin,
  Save,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JobSeekerSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    bio: 'Experienced full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    website: 'https://johndoe.dev',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    proposalUpdates: true,
    messageNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
    pushNotifications: true,
    browserNotifications: true
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    showOnlineStatus: true,
    allowJobRecommendations: true
  });

  // Job Preferences
  const [jobPreferences, setJobPreferences] = useState({
    preferredJobTypes: ['Full-time', 'Contract'],
    minSalary: '80000',
    maxSalary: '150000',
    preferredLocations: ['Remote', 'San Francisco', 'New York'],
    workExperience: '3-5 years',
    skills: ['React', 'Node.js', 'TypeScript', 'Python'],
    availability: 'Immediately'
  });

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    deleteAccount: false
  });

  const handleSaveProfile = () => {
    console.log('Saving profile settings:', profileSettings);
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    console.log('Saving notification settings:', notificationSettings);
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSavePrivacy = () => {
    console.log('Saving privacy settings:', privacySettings);
    toast({
      title: "Privacy Updated",
      description: "Your privacy settings have been saved successfully.",
    });
  };

  const handleSaveJobPreferences = () => {
    console.log('Saving job preferences:', jobPreferences);
    toast({
      title: "Job Preferences Updated",
      description: "Your job preferences have been saved successfully.",
    });
  };

  const handleChangePassword = () => {
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
    console.log('Changing password...');
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    setAccountSettings({
      ...accountSettings,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted.",
      variant: "destructive",
    });
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      <JobSeekerSidebar />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="jobs" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Job Preferences
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Account
                </TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and contact details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileSettings.firstName}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            firstName: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileSettings.lastName}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            lastName: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileSettings.email}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            email: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileSettings.phone}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            phone: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileSettings.location}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            location: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select 
                          value={profileSettings.timezone}
                          onValueChange={(value) => setProfileSettings({
                            ...profileSettings,
                            timezone: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="Europe/London">London</SelectItem>
                            <SelectItem value="Europe/Paris">Paris</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
                        value={profileSettings.bio}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          bio: e.target.value
                        })}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileSettings.website}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            website: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={profileSettings.github}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            github: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={profileSettings.linkedin}
                          onChange={(e) => setProfileSettings({
                            ...profileSettings,
                            linkedin: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveProfile} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Profile
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how and when you want to be notified.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="jobAlerts">Job Alerts</Label>
                          <p className="text-sm text-gray-600">Get notified about new job opportunities</p>
                        </div>
                        <Switch
                          id="jobAlerts"
                          checked={notificationSettings.jobAlerts}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            jobAlerts: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="proposalUpdates">Proposal Updates</Label>
                          <p className="text-sm text-gray-600">Notifications about your job proposals</p>
                        </div>
                        <Switch
                          id="proposalUpdates"
                          checked={notificationSettings.proposalUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            proposalUpdates: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="messageNotifications">Message Notifications</Label>
                          <p className="text-sm text-gray-600">Notifications for new messages</p>
                        </div>
                        <Switch
                          id="messageNotifications"
                          checked={notificationSettings.messageNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            messageNotifications: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                          <p className="text-sm text-gray-600">Receive a weekly summary of activities</p>
                        </div>
                        <Switch
                          id="weeklyDigest"
                          checked={notificationSettings.weeklyDigest}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            weeklyDigest: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="pushNotifications">Push Notifications</Label>
                          <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                        </div>
                        <Switch
                          id="pushNotifications"
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: checked
                          })}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveNotifications} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Notifications
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy & Visibility
                    </CardTitle>
                    <CardDescription>
                      Control who can see your profile and information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select 
                        value={privacySettings.profileVisibility}
                        onValueChange={(value) => setPrivacySettings({
                          ...privacySettings,
                          profileVisibility: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can view</SelectItem>
                          <SelectItem value="employers">Employers Only</SelectItem>
                          <SelectItem value="private">Private - Invite Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showEmail">Show Email Address</Label>
                          <p className="text-sm text-gray-600">Display your email on your profile</p>
                        </div>
                        <Switch
                          id="showEmail"
                          checked={privacySettings.showEmail}
                          onCheckedChange={(checked) => setPrivacySettings({
                            ...privacySettings,
                            showEmail: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showPhone">Show Phone Number</Label>
                          <p className="text-sm text-gray-600">Display your phone on your profile</p>
                        </div>
                        <Switch
                          id="showPhone"
                          checked={privacySettings.showPhone}
                          onCheckedChange={(checked) => setPrivacySettings({
                            ...privacySettings,
                            showPhone: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showLocation">Show Location</Label>
                          <p className="text-sm text-gray-600">Display your location on your profile</p>
                        </div>
                        <Switch
                          id="showLocation"
                          checked={privacySettings.showLocation}
                          onCheckedChange={(checked) => setPrivacySettings({
                            ...privacySettings,
                            showLocation: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allowMessages">Allow Messages</Label>
                          <p className="text-sm text-gray-600">Allow employers to message you</p>
                        </div>
                        <Switch
                          id="allowMessages"
                          checked={privacySettings.allowMessages}
                          onCheckedChange={(checked) => setPrivacySettings({
                            ...privacySettings,
                            allowMessages: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showOnlineStatus">Show Online Status</Label>
                          <p className="text-sm text-gray-600">Display when you're online</p>
                        </div>
                        <Switch
                          id="showOnlineStatus"
                          checked={privacySettings.showOnlineStatus}
                          onCheckedChange={(checked) => setPrivacySettings({
                            ...privacySettings,
                            showOnlineStatus: checked
                          })}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSavePrivacy} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Privacy Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Job Preferences */}
              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Job Preferences
                    </CardTitle>
                    <CardDescription>
                      Set your job preferences to get better recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="jobTypes">Preferred Job Types</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map(type => (
                          <Badge
                            key={type}
                            variant={jobPreferences.preferredJobTypes.includes(type) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              const updated = jobPreferences.preferredJobTypes.includes(type)
                                ? jobPreferences.preferredJobTypes.filter(t => t !== type)
                                : [...jobPreferences.preferredJobTypes, type];
                              setJobPreferences({
                                ...jobPreferences,
                                preferredJobTypes: updated
                              });
                            }}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minSalary">Minimum Salary ($)</Label>
                        <Input
                          id="minSalary"
                          type="number"
                          value={jobPreferences.minSalary}
                          onChange={(e) => setJobPreferences({
                            ...jobPreferences,
                            minSalary: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxSalary">Maximum Salary ($)</Label>
                        <Input
                          id="maxSalary"
                          type="number"
                          value={jobPreferences.maxSalary}
                          onChange={(e) => setJobPreferences({
                            ...jobPreferences,
                            maxSalary: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="workExperience">Work Experience</Label>
                      <Select 
                        value={jobPreferences.workExperience}
                        onValueChange={(value) => setJobPreferences({
                          ...jobPreferences,
                          workExperience: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1 years">0-1 years</SelectItem>
                          <SelectItem value="1-3 years">1-3 years</SelectItem>
                          <SelectItem value="3-5 years">3-5 years</SelectItem>
                          <SelectItem value="5-10 years">5-10 years</SelectItem>
                          <SelectItem value="10+ years">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Select 
                        value={jobPreferences.availability}
                        onValueChange={(value) => setJobPreferences({
                          ...jobPreferences,
                          availability: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediately">Immediately</SelectItem>
                          <SelectItem value="2 weeks">2 weeks</SelectItem>
                          <SelectItem value="1 month">1 month</SelectItem>
                          <SelectItem value="3 months">3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleSaveJobPreferences} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Job Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Settings */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={accountSettings.currentPassword}
                          onChange={(e) => setAccountSettings({
                            ...accountSettings,
                            currentPassword: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={accountSettings.newPassword}
                          onChange={(e) => setAccountSettings({
                            ...accountSettings,
                            newPassword: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={accountSettings.confirmPassword}
                          onChange={(e) => setAccountSettings({
                            ...accountSettings,
                            confirmPassword: e.target.value
                          })}
                        />
                      </div>
                      <Button onClick={handleChangePassword} className="gap-2">
                        <Save className="h-4 w-4" />
                        Change Password
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                        <Switch
                          id="twoFactorAuth"
                          checked={accountSettings.twoFactorAuth}
                          onCheckedChange={(checked) => setAccountSettings({
                            ...accountSettings,
                            twoFactorAuth: checked
                          })}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="exportData">Export Data</Label>
                          <p className="text-sm text-gray-600">Download your data</p>
                        </div>
                        <Button variant="outline" onClick={handleExportData} className="gap-2">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="deleteAccount">Delete Account</Label>
                          <p className="text-sm text-red-600">This action cannot be undone</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default JobSeekerSettings; 