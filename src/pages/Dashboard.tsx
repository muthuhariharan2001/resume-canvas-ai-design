import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  Users,
  Clock,
  Star,
  MoreHorizontal
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  personal_info: any;
}

interface DashboardStats {
  totalResumes: number;
  totalViews: number;
  totalDownloads: number;
  successRate: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    totalViews: 0,
    totalDownloads: 0,
    successRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load user resumes
      const { data: resumesData, error: resumesError } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false });

      if (resumesError) throw resumesError;

      setResumes(resumesData || []);

      // Calculate stats from actual data
      const totalResumes = resumesData?.length || 0;
      const totalViews = resumesData?.reduce((sum, resume) => sum + (resume.views || 0), 0) || 0;
      const totalDownloads = resumesData?.reduce((sum, resume) => sum + (resume.downloads || 0), 0) || 0;
      
      // Calculate success rate based on engagement
      const successRate = totalResumes > 0 ? 
        Math.min(100, Math.round(((totalViews + totalDownloads * 2) / totalResumes) * 2)) : 0;

      setStats({
        totalResumes,
        totalViews,
        totalDownloads,
        successRate
      });

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (resumeId: string) => {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setResumes(prev => prev.filter(resume => resume.id !== resumeId));
      toast({
        title: "Resume Deleted",
        description: "Your resume has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting your resume.",
        variant: "destructive",
      });
    }
  };

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

  const statsConfig = [
    {
      title: 'Total Resumes',
      value: stats.totalResumes.toString(),
      change: `+${stats.totalResumes > 0 ? '1' : '0'} this month`,
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toString(),
      change: stats.totalViews > 0 ? '+12% this week' : 'No views yet',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Downloads',
      value: stats.totalDownloads.toString(),
      change: stats.totalDownloads > 0 ? '+5 this week' : 'No downloads yet',
      icon: Download,
      color: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      change: stats.successRate > 0 ? '+3% improvement' : 'Start sharing your resume',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const getStatusBadge = (resume: Resume) => {
    const hasPersonalInfo = resume.personal_info && 
      resume.personal_info.firstName && 
      resume.personal_info.lastName;
    
    return hasPersonalInfo ? 
      <Badge className="bg-green-100 text-green-800">Completed</Badge> :
      <Badge variant="secondary">Draft</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage your resumes and track your success</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-lift" asChild>
                  <Link to="/builder">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Resume
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsConfig.map((stat, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="resumes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="resumes">My Resumes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="resumes" className="space-y-6">
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
                                <span>{(resume as any).views || 0}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Download className="w-4 h-4" />
                                <span>{(resume as any).downloads || 0}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="hover-lift">
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
                                onClick={() => deleteResume(resume.id)}
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
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Professional', 'FAANG', 'Executive', 'Creative', 'Modern', 'Minimal'].map((template, index) => (
                  <Card key={index} className="hover-lift border-0 shadow-lg cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center border-b">
                        <FileText className="w-16 h-16 text-blue-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{template}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {template === 'FAANG' ? 'Optimized for top tech companies' :
                           template === 'Executive' ? 'Perfect for senior leadership roles' :
                           template === 'Creative' ? 'Stand out with creative design' :
                           `Perfect for ${template.toLowerCase()} roles`}
                        </p>
                        <Button size="sm" className="w-full hover-lift" asChild>
                          <Link to={`/builder?template=${template.toLowerCase()}`}>
                            Use Template
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Resume Performance</CardTitle>
                    <CardDescription>Views and downloads over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>Analytics chart will be displayed here</p>
                        <p className="text-sm text-gray-400 mt-2">Start sharing your resume to see data</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest resume activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {resumes.length > 0 ? (
                      <div className="space-y-4">
                        {resumes.slice(0, 4).map((resume, index) => (
                          <div key={resume.id} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">
                                <span className="font-medium">Created</span> {resume.title}
                              </p>
                              <p className="text-xs text-gray-500">{formatDate(resume.created_at)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No activity yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
