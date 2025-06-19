
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Users, Target, Award, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About AI Resume Builder
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're on a mission to democratize career success by making professional resume creation accessible to everyone through the power of artificial intelligence.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                At AI Resume Builder, we believe that everyone deserves a chance to showcase their best professional self. 
                Traditional resume writing can be time-consuming, expensive, and often doesn't capture the full potential 
                of a candidate's experience. Our AI-powered platform levels the playing field by providing intelligent, 
                personalized resume creation tools that help job seekers present their qualifications in the most compelling way possible.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge AI technology to continuously improve and personalize the resume creation experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  Professional resume creation should be available to everyone, regardless of their background or budget.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We're committed to delivering the highest quality tools and support to help you succeed in your career journey.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Founded in 2024, AI Resume Builder was born from the frustration of watching talented individuals 
                struggle to effectively communicate their worth on paper. Our founding team, composed of HR professionals, 
                software engineers, and career coaches, recognized that traditional resume writing methods were outdated 
                and often ineffective in today's competitive job market.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By combining decades of recruitment experience with advanced artificial intelligence, we've created 
                a platform that not only makes resume creation faster and easier but also significantly more effective. 
                Today, we're proud to serve thousands of professionals worldwide, helping them land interviews and 
                advance their careers.
              </p>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who've already transformed their careers with AI Resume Builder.
            </p>
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/auth/signup">
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
