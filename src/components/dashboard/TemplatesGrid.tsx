
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const TemplatesGrid = () => {
  const templates = [
    {
      name: 'Professional',
      description: 'Clean and professional design perfect for corporate roles',
      gradient: 'from-blue-50 to-purple-50'
    },
    {
      name: 'FAANG',
      description: 'Optimized for top tech companies like Google, Apple, Facebook',
      gradient: 'from-green-50 to-blue-50'
    },
    {
      name: 'Executive',
      description: 'Perfect for senior leadership and executive positions',
      gradient: 'from-gray-50 to-slate-50'
    },
    {
      name: 'Creative',
      description: 'Stand out with creative design for design and marketing roles',
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      name: 'Modern',
      description: 'Contemporary design with clean lines and modern typography',
      gradient: 'from-teal-50 to-cyan-50'
    },
    {
      name: 'Minimal',
      description: 'Simple and elegant design that focuses on content',
      gradient: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template, index) => (
        <Card key={index} className="hover-lift border-0 shadow-lg cursor-pointer group">
          <CardContent className="p-0">
            <div className={`h-48 bg-gradient-to-br ${template.gradient} rounded-t-lg flex items-center justify-center border-b`}>
              <FileText className="w-16 h-16 text-blue-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <Button size="sm" className="w-full hover-lift" asChild>
                <Link to={`/builder?template=${template.name.toLowerCase()}`}>
                  Use Template
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TemplatesGrid;
