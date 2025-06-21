import React from 'react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import DashboardStats from '@/components/DashboardStats';
import RecentActivity from '@/components/RecentActivity';
import ResumesList from '@/components/ResumesList';
import TemplatesGrid from '@/components/TemplatesGrid';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, recentResumes, loading, lastRefresh, refreshData } = useDashboardData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with refresh button */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-600">Welcome back, {user?.email}</p>
              <p className="text-sm text-gray-500">Last updated: {lastRefresh.toLocaleTimeString()}</p>
            </div>
            <Button 
              onClick={refreshData} 
              variant="outline" 
              size="sm"
              className="ml-4"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Stats */}
              <DashboardStats stats={stats} />

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentActivity />
                <ResumesList resumes={recentResumes} />
              </div>

              {/* Templates */}
              <TemplatesGrid />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
