
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Heart, 
  Zap,
  Globe,
  Coffee,
  Award,
  BookOpen
} from 'lucide-react';

const Careers = () => {
  const openings = [
    {
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      department: 'Engineering',
      description: 'Build beautiful and intuitive user interfaces for our resume builder platform using React, TypeScript, and modern web technologies.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'UI/UX design sense']
    },
    {
      title: 'AI/ML Engineer',
      location: 'Remote',
      type: 'Full-time',
      salary: '$140k - $180k',
      department: 'AI/ML',
      description: 'Develop and improve our AI-powered resume analysis and suggestion algorithms using Python and modern ML frameworks.',
      requirements: ['ML/AI experience', 'Python expertise', 'NLP knowledge']
    },
    {
      title: 'Product Manager',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $170k',
      department: 'Product',
      description: 'Lead product strategy and roadmap for our career development tools, working closely with engineering and design teams.',
      requirements: ['Product management experience', 'Career services knowledge', 'Data-driven mindset']
    },
    {
      title: 'UX Designer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$110k - $140k',
      department: 'Design',
      description: 'Design intuitive and delightful user experiences for job seekers using our platform to create and optimize their resumes.',
      requirements: ['UX/UI design portfolio', 'Figma proficiency', 'User research experience']
    },
    {
      title: 'DevOps Engineer',
      location: 'Remote',
      type: 'Full-time',
      salary: '$125k - $155k',
      department: 'Engineering',
      description: 'Build and maintain our cloud infrastructure, ensuring scalability, security, and reliability of our platform.',
      requirements: ['AWS/GCP experience', 'Docker/Kubernetes', 'CI/CD expertise']
    },
    {
      title: 'Career Coach',
      location: 'Remote',
      type: 'Part-time',
      salary: '$50 - $75/hour',
      department: 'Customer Success',
      description: 'Provide personalized career coaching and resume feedback to our premium users, helping them achieve their career goals.',
      requirements: ['Career coaching certification', 'HR/Recruiting background', 'Communication skills']
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness stipend'
    },
    {
      icon: Zap,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours and unlimited PTO'
    },
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Top-tier salaries, equity, and performance bonuses'
    },
    {
      icon: BookOpen,
      title: 'Learning Budget',
      description: '$2,000 annual budget for courses, conferences, and skill development'
    },
    {
      icon: Coffee,
      title: 'Great Perks',
      description: 'Free lunch, snacks, and premium office spaces in major cities'
    },
    {
      icon: Award,
      title: 'Career Growth',
      description: 'Clear advancement paths and mentorship programs'
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
              Join Our Mission to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Transform Careers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the future of career development. Join our team of passionate individuals who are helping millions land their dream jobs.
            </p>
          </div>

          {/* Company Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Work With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Open Positions</h2>
            <div className="space-y-6">
              {openings.map((job, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {job.salary}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {job.department}
                          </Badge>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4 md:mt-0">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-16 px-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how you'd like to contribute.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Users className="w-5 h-5 mr-2" />
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
