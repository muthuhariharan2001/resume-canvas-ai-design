
import { useState } from 'react';
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

const Dashboard = () => {
  const [resumes] = useState([
    {
      id: 1,
      title: 'Software Engineer Resume',
      template: 'Professional',
      lastModified: '2 hours ago',
      status: 'completed',
      views: 24,
      downloads: 8
    },
    {
      id: 2,
      title: 'Marketing Manager CV',
      template: 'Modern',
      lastModified: '1 day ago',
      status: 'draft',
      views: 12,
      downloads: 3
    },
    {
      id: 3,
      title: 'Data Analyst Resume',
      template: 'Creative',
      lastModified: '3 days ago',
      status: 'completed',
      views: 18,
      downloads: 5
    }
  ]);

  const stats = [
    {
      title: 'Total Resumes',
      value: '3',
      change: '+1 this month',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Total Views',
      value: '54',
      change: '+12% this week',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Downloads',
      value: '16',
      change: '+5 this week',
      icon: Download,
      color: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: '87%',
      change: '+3% improvement',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

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
            {stats.map((stat, index) => (
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
                              <span className="text-sm text-gray-500">{resume.template} template</span>
                              {getStatusBadge(resume.status)}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Last modified {resume.lastModified}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{resume.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>{resume.downloads}</span>
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
                            <Button variant="ghost" size="sm" className="hover-lift text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Professional', 'Modern', 'Creative', 'Executive', 'Minimal', 'Bold'].map((template, index) => (
                  <Card key={index} className="hover-lift border-0 shadow-lg cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center border-b">
                        <FileText className="w-16 h-16 text-blue-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{template}</h3>
                        <p className="text-sm text-gray-600 mb-4">Perfect for {template.toLowerCase()} roles</p>
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
                    <div className="space-y-4">
                      {[
                        { action: 'Downloaded', resume: 'Software Engineer Resume', time: '2 hours ago' },
                        { action: 'Viewed', resume: 'Marketing Manager CV', time: '5 hours ago' },
                        { action: 'Updated', resume: 'Data Analyst Resume', time: '1 day ago' },
                        { action: 'Created', resume: 'Software Engineer Resume', time: '3 days ago' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{activity.action}</span> {activity.resume}
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
