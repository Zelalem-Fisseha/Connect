import React from 'react';
import { motion } from 'framer-motion';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { JobSeekerSidebar } from '@/components/JobSeekerSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { EmployerSidebar } from '@/components/EmployerSidebar';

const Messages = () => {
  const { userType } = useUser();
  const SidebarComponent = userType === 'jobseeker' ? JobSeekerSidebar : EmployerSidebar;

  return (
    <div className="flex min-h-screen w-full">
      <SidebarComponent />
      <SidebarInset className="flex-1 w-full min-w-0">
        <header className="flex items-center sticky top-0 z-10 gap-4 border-b bg-white px-6 py-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-semibold">Messages</h1>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-96 text-center">
                <CardContent className="pt-16 pb-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-6"
                  >
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-semibold text-gray-800 mb-2"
                  >
                    Messages
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-gray-600"
                  >
                    Coming Soon
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-gray-500 mt-2"
                  >
                    We're working on bringing you an amazing messaging experience.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default Messages;