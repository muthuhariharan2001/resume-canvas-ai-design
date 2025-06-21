
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
      const { data: resumesData, error: resumesError } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (resumesError) throw resumesError;

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
      
      loadUserData();
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
      
      loadUserData();
    } catch (error) {
      console.error('Error viewing resume:', error);
      toast({
        title: "View Failed",
        description: "There was an error opening your resume.",
        variant: "destructive",
      });
    }
  };

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
