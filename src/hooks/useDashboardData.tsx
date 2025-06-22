
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useDashboardData = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalDownloads: 0,
    totalViews: 0,
    lastMonthResumes: 0,
    successRate: 0
  });
  const [recentResumes, setRecentResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch resumes with proper error handling
      const { data: resumes, error: resumesError } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (resumesError) {
        console.error('Error fetching resumes:', resumesError);
        return;
      }

      const resumeData = resumes || [];
      
      // Calculate stats
      const totalResumes = resumeData.length;
      const totalDownloads = resumeData.reduce((sum, resume) => sum + (resume.downloads || 0), 0);
      const totalViews = resumeData.reduce((sum, resume) => sum + (resume.views || 0), 0);
      
      // Calculate last month resumes
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const lastMonthResumes = resumeData.filter(resume => 
        new Date(resume.created_at) >= lastMonth
      ).length;

      // Calculate success rate based on engagement (views + downloads)
      const totalEngagement = totalViews + totalDownloads;
      const successRate = totalResumes > 0 ? Math.round((totalEngagement / (totalResumes * 10)) * 100) : 0;

      setStats({
        totalResumes,
        totalDownloads,
        totalViews,
        lastMonthResumes,
        successRate: Math.min(successRate, 100) // Cap at 100%
      });

      // Set recent resumes (limit to 5)
      setRecentResumes(resumeData.slice(0, 5));
      setLastRefresh(new Date());
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();

      // Set up real-time subscription
      const channel = supabase
        .channel('dashboard-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'resumes',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('Real-time update received:', payload);
            // Refresh data when any change occurs
            setTimeout(() => {
              fetchDashboardData();
            }, 500); // Small delay to ensure data consistency
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    stats,
    recentResumes,
    loading,
    lastRefresh,
    refreshData
  };
};
