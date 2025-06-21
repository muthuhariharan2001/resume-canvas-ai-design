
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ResumesList from '@/components/dashboard/ResumesList';
import TemplatesGrid from '@/components/dashboard/TemplatesGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { resumes, stats, loading, deleteResume, viewResume } = useDashboardData();

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
                <p className="mt-2 text-gray-600">Welcome back! Manage your resumes and track your success</p>
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
          <DashboardStats stats={stats} />

          {/* Main Content */}
          <Tabs defaultValue="resumes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="resumes">My Resumes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="resumes" className="space-y-6">
              <ResumesList 
                resumes={resumes} 
                onView={viewResume}
                onDelete={deleteResume}
              />
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <TemplatesGrid />
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
                        <p className="text-sm text-gray-400 mt-2">
                          {stats.totalViews > 0 || stats.totalDownloads > 0 
                            ? `You have ${stats.totalViews} views and ${stats.totalDownloads} downloads`
                            : 'Start sharing your resume to see data'
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <RecentActivity resumes={resumes} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
