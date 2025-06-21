
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Edit, Trash2, Download, Plus } from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  personal_info: any;
  views: number;
  downloads: number;
}

interface ResumesListProps {
  resumes: Resume[];
  onView: (resumeId: string) => void;
  onDelete: (resumeId: string) => void;
}

const ResumesList = ({ resumes, onView, onDelete }: ResumesListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getStatusBadge = (resume: Resume) => {
    const hasPersonalInfo = resume.personal_info && 
      resume.personal_info.firstName && 
      resume.personal_info.lastName;
    
    return hasPersonalInfo ? 
      <Badge className="bg-green-100 text-green-800">Completed</Badge> :
      <Badge variant="secondary">Draft</Badge>;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Your Resumes</CardTitle>
        <CardDescription>
          Manage and edit your created resumes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume to get started</p>
            <Button asChild>
              <Link to="/builder">
                <Plus className="w-4 h-4 mr-2" />
                Create Resume
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded border-2 border-gray-200 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{resume.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Professional template</span>
                      {getStatusBadge(resume)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Last modified {formatDate(resume.updated_at)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{resume.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{resume.downloads || 0}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover-lift"
                      onClick={() => onView(resume.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover-lift" asChild>
                      <Link to={`/builder?id=${resume.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover-lift text-red-600 hover:text-red-700"
                      onClick={() => onDelete(resume.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumesList;
