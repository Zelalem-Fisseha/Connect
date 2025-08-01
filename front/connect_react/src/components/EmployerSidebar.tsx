import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Code, Users, Plus, MessageSquare, Briefcase, Settings } from 'lucide-react';

export function EmployerSidebar() {
  const location = useLocation();
  
  const menuItems = [
    { title: 'Find Talent', icon: Users, href: '/employer/dashboard' },
    { title: 'Post Job', icon: Plus, href: '/employer/post-job' },
    { title: 'My Jobs', icon: Briefcase, href: '/employer/jobs' },
    { title: 'Messages', icon: MessageSquare, href: '/messages' },
    { title: 'Company Profile', icon: Users, href: '/employer/profile' },
    { title: 'Settings', icon: Settings, href: '/employer/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-3">
          <Code className="text-purple-500" size={32} />
          <div>
            <h1 className="text-xl font-bold">DevHire Pro</h1>
            <p className="text-sm text-muted-foreground">Employer</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}