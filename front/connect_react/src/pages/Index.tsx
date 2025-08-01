import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Users, Search, MessageSquare, Star, ArrowRight, CheckCircle, TrendingUp, Globe, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Code className="h-10 w-10 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">DevHire Pro</h1>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/signin" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign In
              </Link>
              <Link to="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
            </nav>
            <div className="lg:hidden flex items-center gap-4">
              <Link to="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Connect Developers with
                <span className="text-blue-600 block"> Dream Projects</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
                The premier platform for developers to find freelance opportunities and for companies to hire top-tier development talent worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/signup">
                  <Button size="lg" className="text-lg px-8 py-6 h-auto">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                    Browse Jobs
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>10,000+ Developers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>5,000+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>98% Success Rate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <Search className="h-8 w-8 text-blue-600 mb-3" />
                      <CardTitle className="text-lg">For Developers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Premium projects
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Direct client contact
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Flexible schedules
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <Users className="h-8 w-8 text-purple-600 mb-3" />
                      <CardTitle className="text-lg">For Employers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Top talent pool
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Verified skills
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Fast hiring
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose DevHire Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for modern development teams and freelancers who demand excellence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-8">
                <CardHeader className="text-center pb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Global Talent Pool</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    Access developers from around the world with diverse skills and experience levels. 
                    Find the perfect match for your project requirements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-8">
                <CardHeader className="text-center pb-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Verified & Secure</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    All developers are verified with background checks and skill assessments. 
                    Secure payment protection for both parties.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-8">
                <CardHeader className="text-center pb-6">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Fast & Efficient</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    Streamlined hiring process with AI-powered matching. 
                    Get started with your project in days, not weeks.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Active Developers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">5,000+</div>
              <div className="text-blue-100">Completed Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Join thousands of developers and companies already using DevHire Pro to build amazing projects together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-10 py-6 h-auto">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 h-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Code className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold">DevHire Pro</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting developers with opportunities worldwide. Build your career or find the perfect talent for your project.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Developers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/signup" className="hover:text-white transition-colors">Find Jobs</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Create Profile</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Browse Projects</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/signup" className="hover:text-white transition-colors">Post Jobs</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Find Talent</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Hire Developers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DevHire Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;