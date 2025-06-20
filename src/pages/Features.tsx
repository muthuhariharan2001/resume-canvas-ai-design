
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  FileText, 
  Download, 
  Eye, 
  Users, 
  Shield,
  Zap,
  Target,
  Award,
  BookOpen,
  Globe,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Resume Builder',
      description: 'Create professional resumes with AI assistance that suggests content, formats, and optimizations based on your industry.',
      color: 'text-blue-600'
    },
    {
      icon: FileText,
      title: 'Multiple Resume Templates',
      description: 'Choose from FAANG-optimized, Executive, Creative, and Professional resume templates designed by hiring experts.',
      color: 'text-purple-600'
    },
    {
      icon: Target,
      title: 'ATS Optimization',
      description: 'Built-in ATS (Applicant Tracking System) checker ensures your resume passes through automated screening systems.',
      color: 'text-green-600'
    },
    {
      icon: Eye,
      title: 'Real-time Preview',
      description: 'See your resume come to life with instant preview as you edit. No more guessing how it will look.',
      color: 'text-orange-600'
    },
    {
      icon: Download,
      title: 'Multiple Export Formats',
      description: 'Download your resume in PDF, Word, or share it directly online with a custom link.',
      color: 'text-red-600'
    },
    {
      icon: Award,
      title: 'Professional Scoring',
      description: 'Get detailed feedback on your resume with professional scoring across multiple criteria.',
      color: 'text-indigo-600'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share your resume with mentors, career coaches, or friends for feedback and suggestions.',
      color: 'text-pink-600'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data is encrypted and secure. We never share your information with third parties.',
      color: 'text-teal-600'
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Duplicate resumes, quick edit sections, and batch operations to save time on resume management.',
      color: 'text-yellow-600'
    },
    {
      icon: BookOpen,
      title: 'Career Resources',
      description: 'Access interview tips, salary guides, and career advice tailored to your industry.',
      color: 'text-cyan-600'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Create resumes in multiple languages and formats for international job applications.',
      color: 'text-emerald-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Edit and manage your resumes on any device - desktop, tablet, or mobile phone.',
      color: 'text-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Modern Job Seekers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, optimize, and manage professional resumes that get you hired.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover-lift">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-16 px-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Perfect Resume?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who've landed their dream jobs with our AI-powered resume builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link to="/builder">
                  <FileText className="w-5 h-5 mr-2" />
                  Start Building Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
