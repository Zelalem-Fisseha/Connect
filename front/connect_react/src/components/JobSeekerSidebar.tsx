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
import { Code, Search, User, MessageSquare, Briefcase, Settings } from 'lucide-react';

export function JobSeekerSidebar() {
  const location = useLocation();
  
  const menuItems = [
    { title: 'Find Jobs', icon: Search, href: '/jobseeker/dashboard' },
    { title: 'My Profile', icon: User, href: '/jobseeker/profile' },
    { title: 'My Applications', icon: Briefcase, href: '/jobseeker/applications' },
    { title: 'Messages', icon: MessageSquare, href: '/messages' },
    { title: 'Settings', icon: Settings, href: '/jobseeker/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-3">
          <Code className="text-blue-500" size={32} />
          <div>
            <h1 className="text-xl font-bold">DevHire Pro</h1>
            <p className="text-sm text-muted-foreground">Job Seeker</p>
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