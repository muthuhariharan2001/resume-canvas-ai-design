
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Star, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Templates = () => {
  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and professional design perfect for corporate roles',
      category: 'Corporate',
      rating: 4.9,
      downloads: '50K+',
      preview: 'bg-gradient-to-br from-blue-50 to-blue-100',
      popular: true,
      features: ['ATS-Friendly', 'Clean Layout', 'Easy to Read']
    },
    {
      id: 'faang',
      name: 'FAANG Tech',
      description: 'Optimized for top tech companies like Google, Apple, Facebook',
      category: 'Technology',
      rating: 4.8,
      downloads: '35K+',
      preview: 'bg-gradient-to-br from-purple-50 to-purple-100',
      popular: true,
      features: ['Tech-Optimized', 'Skills Focus', 'Modern Design']
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Sophisticated design for senior leadership positions',
      category: 'Leadership',
      rating: 4.7,
      downloads: '25K+',
      preview: 'bg-gradient-to-br from-gray-50 to-gray-100',
      popular: false,
      features: ['Leadership Focus', 'Premium Look', 'Results-Driven']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Stand out with this creative design for design and marketing roles',
      category: 'Design',
      rating: 4.6,
      downloads: '20K+',
      preview: 'bg-gradient-to-br from-pink-50 to-pink-100',
      popular: false,
      features: ['Visual Appeal', 'Creative Layout', 'Portfolio Ready']
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design that works well for various industries',
      category: 'General',
      rating: 4.5,
      downloads: '30K+',
      preview: 'bg-gradient-to-br from-green-50 to-green-100',
      popular: false,
      features: ['Versatile', 'Modern Style', 'Industry Neutral']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Less is more - perfect for those who prefer simplicity',
      category: 'Minimalist',
      rating: 4.4,
      downloads: '18K+',
      preview: 'bg-gradient-to-br from-slate-50 to-slate-100',
      popular: false,
      features: ['Clean & Simple', 'Distraction-Free', 'Timeless']
    }
  ];

  const categories = ['All', 'Corporate', 'Technology', 'Leadership', 'Design', 'General', 'Minimalist'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional <span className="text-blue-600">Resume Templates</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed, ATS-friendly resume templates. 
              Each template is crafted to help you stand out to recruiters and hiring managers.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                className="hover-lift"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {templates.map((template) => (
              <Card key={template.id} className="border-0 shadow-lg hover-lift group cursor-pointer">
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className={`h-64 ${template.preview} rounded-t-lg flex items-center justify-center border-b relative overflow-hidden`}>
                    {template.popular && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    <FileText className="w-20 h-20 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-3">
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/builder?template=${template.id}`}>
                            Use Template
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {template.rating}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {template.downloads}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full hover-lift" asChild>
                      <Link to={`/builder?template=${template.id}`}>
                        Use This Template
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Choose Our Templates?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">ATS-Optimized</h3>
                <p className="text-gray-600">
                  All templates are designed to pass through Applicant Tracking Systems used by major companies.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Recruiter-Approved</h3>
                <p className="text-gray-600">
                  Developed with input from hiring managers and recruiters at top companies worldwide.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Download</h3>
                <p className="text-gray-600">
                  Download your resume in multiple formats including PDF, Word, and plain text.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Create Your Perfect Resume?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose a template above and start building your professional resume in minutes.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <Link to="/builder">
                Start Building Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
