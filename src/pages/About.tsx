
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About Resume<span className="text-blue-600">AI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the way professionals create resumes by combining cutting-edge AI technology 
              with intuitive design to help you land your dream job.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At ResumeAI, we believe that everyone deserves the opportunity to present their best professional self. 
                Our mission is to democratize access to high-quality resume creation tools powered by artificial intelligence.
              </p>
              <p className="text-lg text-gray-600">
                We're not just building a resume builder - we're creating a platform that understands your career journey 
                and helps you articulate your value proposition in the most compelling way possible.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8">
                <Target className="w-24 h-24 text-blue-600 mx-auto" />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover-lift">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">User-Centric</h3>
                  <p className="text-gray-600">
                    Every feature we build is designed with our users in mind. Your success is our success.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover-lift">
                <CardContent className="p-8 text-center">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
                  <p className="text-gray-600">
                    We strive for excellence in everything we do, from our AI algorithms to our user experience.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover-lift">
                <CardContent className="p-8 text-center">
                  <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h3>
                  <p className="text-gray-600">
                    Professional resume creation should be accessible to everyone, regardless of background or experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-600 mb-6">
                    ResumeAI was born from a simple observation: despite the abundance of resume templates and builders, 
                    most people still struggle to create compelling resumes that truly represent their capabilities and achievements.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    Our founding team, comprised of former recruiters, HR professionals, and AI engineers, recognized that 
                    the missing piece wasn't just better templates or easier editing tools - it was intelligent guidance 
                    that could help users understand what makes a resume effective.
                  </p>
                  <p className="text-lg text-gray-600">
                    Today, we're proud to serve thousands of professionals worldwide, helping them craft resumes that 
                    get noticed by recruiters and hiring managers at top companies including Fortune 500 enterprises 
                    and innovative startups.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
              <div className="text-gray-600">Interview Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">120+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed their dream jobs with ResumeAI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
