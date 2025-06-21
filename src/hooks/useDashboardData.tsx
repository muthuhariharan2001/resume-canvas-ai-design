
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  personal_info: any;
  views: number;
  downloads: number;
}

interface DashboardStats {
  totalResumes: number;
  totalViews: number;
  totalDownloads: number;
  successRate: number;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    totalViews: 0,
    totalDownloads: 0,
    successRate: 0
  });
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      console.log('Loading user data for user:', user.id);
      
      const { data: resumesData, error: resumesError } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (resumesError) {
        console.error('Error loading resumes:', resumesError);
        throw resumesError;
      }

      console.log('Loaded resumes data:', resumesData);
      setResumes(resumesData || []);

      const totalResumes = resumesData?.length || 0;
      const totalViews = resumesData?.reduce((sum, resume) => sum + (resume.views || 0), 0) || 0;
      const totalDownloads = resumesData?.reduce((sum, resume) => sum + (resume.downloads || 0), 0) || 0;
      
      const successRate = totalResumes > 0 ? 
        Math.min(100, Math.round(((totalViews + totalDownloads * 2) / totalResumes) * 10)) : 0;

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
      console.log('Deleting resume:', resumeId);
      
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Update local state immediately
      setResumes(prev => prev.filter(resume => resume.id !== resumeId));
      toast({
        title: "Resume Deleted",
        description: "Your resume has been deleted successfully.",
      });
      
      // Refresh data to ensure consistency
      await loadUserData();
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting your resume.",
        variant: "destructive",
      });
    }
  };

  const viewResume = async (resumeId: string) => {
    try {
      console.log('Viewing resume:', resumeId);
      
      const { data: currentResume } = await supabase
        .from('resumes')
        .select('views')
        .eq('id', resumeId)
        .single();

      await supabase
        .from('resumes')
        .update({ 
          views: (currentResume?.views || 0) + 1 
        })
        .eq('id', resumeId);

      window.open(`/builder?id=${resumeId}&mode=preview`, '_blank');
      
      // Refresh data after view count update
      await loadUserData();
    } catch (error) {
      console.error('Error viewing resume:', error);
      toast({
        title: "View Failed",
        description: "There was an error opening your resume.",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscription for resumes
  useEffect(() => {
    if (!user) return;

    console.log('Setting up real-time subscription for user:', user.id);

    const subscription = supabase
      .channel('resumes_changes')
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
          loadUserData();
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(subscription);
    };
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  return {
    resumes,
    stats,
    loading,
    deleteResume,
    viewResume,
    refreshData: loadUserData
  };
};
