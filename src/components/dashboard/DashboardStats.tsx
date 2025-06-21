
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Eye, Download, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalResumes: number;
  totalViews: number;
  totalDownloads: number;
  successRate: number;
}

interface DashboardStatsProps {
  stats: DashboardStats;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statsConfig = [
    {
      title: 'Total Resumes',
      value: stats.totalResumes.toString(),
      change: stats.totalResumes > 0 ? `${stats.totalResumes} created` : 'Create your first resume',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toString(),
      change: stats.totalViews > 0 ? `${stats.totalViews} profile views` : 'Share to get views',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Downloads',
      value: stats.totalDownloads.toString(),
      change: stats.totalDownloads > 0 ? `${stats.totalDownloads} PDF downloads` : 'Export your resume',
      icon: Download,
      color: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      change: stats.successRate > 0 ? 'Based on engagement' : 'Start sharing your resume',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
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
  );
};

export default DashboardStats;
