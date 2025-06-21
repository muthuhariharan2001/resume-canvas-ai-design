
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface RecentActivityProps {
  resumes: Resume[];
}

const RecentActivity = ({ resumes }: RecentActivityProps) => {
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

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest resume activities</CardDescription>
      </CardHeader>
      <CardContent>
        {resumes.length > 0 ? (
          <div className="space-y-4">
            {resumes.slice(0, 4).map((resume) => (
              <div key={resume.id} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Updated</span> {resume.title}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(resume.updated_at)}</p>
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
  );
};

export default RecentActivity;
