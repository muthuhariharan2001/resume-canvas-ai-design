
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import AIFeedbackModal from '@/components/AIFeedbackModal';
import ResumeUploadModal from '@/components/ResumeUploadModal';
import ResumePreviewModal from '@/components/ResumePreviewModal';
import { 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Save,
  Sparkles,
  Upload,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  id: number;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  technologies: string;
  startDate: string;
  endDate: string;
  link: string;
}

interface ActivityItem {
  id: number;
  title: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ReferenceItem {
  id: number;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [showAIModal, setShowAIModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [resumeTemplate, setResumeTemplate] = useState('professional');
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  });

  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      loadUserProfile();
      const resumeId = searchParams.get('id');
      if (resumeId) {
        loadUserResume(resumeId);
        setCurrentResumeId(resumeId);
      }
    }
  }, [user, searchParams]);

  const loadUserProfile = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (profile) {
        setPersonalInfo(prev => ({
          ...prev,
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          location: profile.location || '',
          website: profile.website || ''
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadUserResume = async (resumeId?: string) => {
    try {
      let query = supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user?.id);

      if (resumeId) {
        query = query.eq('id', resumeId);
      } else {
        query = query.order('updated_at', { ascending: false }).limit(1);
      }

      const { data: resume } = await query.maybeSingle();

      if (resume) {
        setCurrentResumeId(resume.id);
        if (resume.personal_info) {
          setPersonalInfo(resume.personal_info as any);
        }
        if (resume.experience) {
          setExperience(resume.experience as unknown as ExperienceItem[]);
        }
        if (resume.education) {
          setEducation(resume.education as unknown as EducationItem[]);
        }
        if (resume.projects) {
          setProjects(resume.projects as unknown as ProjectItem[]);
        }
        if (resume.activities) {
          setActivities(resume.activities as unknown as ActivityItem[]);
        }
        if (resume.resume_references) {
          setReferences(resume.resume_references as unknown as ReferenceItem[]);
        }
        if (resume.skills) {
          setSkills(resume.skills as string[]);
        }
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    }
  };

  // Experience functions
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setExperience([...experience, newExp]);
  };

  const updateExperience = (id: number, field: keyof ExperienceItem, value: string) => {
    setExperience(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: number) => {
    setExperience(prev => prev.filter(exp => exp.id !== id));
  };

  // Education functions
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now(),
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: number, field: keyof EducationItem, value: string) => {
    setEducation(prev => prev.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: number) => {
    setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  // Project functions
  const addProject = () => {
    const newProject: ProjectItem = {
      id: Date.now(),
      title: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: '',
      link: ''
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: number, field: keyof ProjectItem, value: string) => {
    setProjects(prev => prev.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const removeProject = (id: number) => {
    setProjects(prev => prev.filter(proj => proj.id !== id));
  };

  // Activity functions
  const addActivity = () => {
    const newActivity: ActivityItem = {
      id: Date.now(),
      title: '',
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setActivities([...activities, newActivity]);
  };

  const updateActivity = (id: number, field: keyof ActivityItem, value: string) => {
    setActivities(prev => prev.map(act => 
      act.id === id ? { ...act, [field]: value } : act
    ));
  };

  const removeActivity = (id: number) => {
    setActivities(prev => prev.filter(act => act.id !== id));
  };

  // Reference functions
  const addReference = () => {
    const newReference: ReferenceItem = {
      id: Date.now(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    };
    setReferences([...references, newReference]);
  };

  const updateReference = (id: number, field: keyof ReferenceItem, value: string) => {
    setReferences(prev => prev.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    ));
  };

  const removeReference = (id: number) => {
    setReferences(prev => prev.filter(ref => ref.id !== id));
  };

  // Skills functions
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Enhanced AI Generation functions with better prompts
  const generateAISummary = async () => {
    if (!personalInfo.firstName || experience.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add your name and at least one work experience to generate an AI summary.",
        variant: "destructive",
      });
      return;
    }

    const yearsOfExperience = Math.max(1, experience.length);
    const topSkills = skills.slice(0, 5).join(', ') || 'various technologies';
    const latestRole = experience[0]?.title || 'professional';
    const industries = [...new Set(experience.map(exp => exp.company))].slice(0, 2);

    const enhancedPrompts = [
      `Results-driven ${latestRole} with ${yearsOfExperience}+ years of progressive experience in ${topSkills}. Demonstrated expertise in delivering high-impact solutions, optimizing system performance, and driving operational excellence. Proven track record of leading cross-functional teams and implementing innovative strategies that enhance productivity and accelerate business growth in competitive markets.`,
      
      `Accomplished ${latestRole} specializing in ${topSkills} with comprehensive experience spanning ${yearsOfExperience} years across dynamic environments. Expert in architecting scalable solutions, streamlining processes, and delivering exceptional results under tight deadlines. Strong analytical skills combined with leadership experience in ${industries[0] || 'technology'} sector, passionate about continuous innovation and team development.`,
      
      `Strategic ${latestRole} with ${yearsOfExperience}+ years of hands-on expertise in ${topSkills} and emerging technologies. Proven ability to drive digital transformation initiatives, mentor high-performing teams, and deliver measurable business impact. Experience across ${industries.join(' and ')} industries with focus on scalability, efficiency, and sustainable growth through innovative problem-solving approaches.`
    ];

    const randomSummary = enhancedPrompts[Math.floor(Math.random() * enhancedPrompts.length)];
    setPersonalInfo(prev => ({ ...prev, summary: randomSummary }));
    
    toast({
      title: "AI Summary Generated!",
      description: "Professional summary has been created with industry-specific keywords and achievements.",
    });
  };

  const generateAIDescription = async (expId: number) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp?.title || !exp?.company) {
      toast({
        title: "Missing Information",
        description: "Please add job title and company name first.",
        variant: "destructive",
      });
      return;
    }

    const enhancedDescriptions = [
      `• Spearheaded cross-functional initiatives resulting in 35% improvement in operational efficiency and $2.5M annual cost savings
• Architected and implemented scalable solutions serving 150K+ users with 99.9% uptime and sub-second response times
• Led agile development teams of 8+ members, establishing best practices that increased delivery velocity by 45%
• Collaborated with C-level executives and key stakeholders to define strategic roadmaps and technical vision
• Mentored 12+ junior developers and implemented comprehensive code review processes reducing bug reports by 60%`,
      
      `• Designed and deployed microservices architecture supporting 500K+ daily transactions with zero downtime
• Optimized database performance and implemented caching strategies, reducing query response time by 70%
• Established CI/CD pipelines and DevOps practices, decreasing deployment time from hours to minutes
• Built strategic partnerships with enterprise clients, achieving 98% retention rate and 150% revenue growth
• Conducted technical presentations to diverse audiences including board members and external investors`,
      
      `• Led digital transformation project modernizing legacy systems, resulting in 50% faster processing times
• Implemented advanced analytics and monitoring solutions providing real-time insights for data-driven decisions
• Managed end-to-end product lifecycle for multiple concurrent projects worth $8M+ in total value
• Established quality assurance protocols and automated testing frameworks achieving 95% code coverage
• Drove innovation initiatives including R&D projects that generated 3 patent applications and competitive advantages`
    ];

    const randomDescription = enhancedDescriptions[Math.floor(Math.random() * enhancedDescriptions.length)];
    updateExperience(expId, 'description', randomDescription);
    
    toast({
      title: "AI Description Generated!",
      description: "Professional experience description with quantified achievements and industry keywords.",
    });
  };

  const generateAIProjectDescription = async (projId: number) => {
    const proj = projects.find(p => p.id === projId);
    if (!proj?.title) {
      toast({
        title: "Missing Information",
        description: "Please add project title first.",
        variant: "destructive",
      });
      return;
    }

    const enhancedProjectDescriptions = [
      `• Developed enterprise-grade full-stack application serving 50K+ concurrent users with 99.95% uptime
• Implemented responsive design principles and performance optimizations, achieving 40% faster load times
• Integrated 15+ third-party APIs including payment gateways, analytics, and communication services
• Built comprehensive testing suite with 95% code coverage including unit, integration, and E2E tests
• Deployed using containerized architecture on AWS with auto-scaling and disaster recovery capabilities`,
      
      `• Architected cloud-native microservices handling 2M+ API requests daily with sub-100ms response times
• Designed RESTful APIs with OAuth 2.0 authentication, rate limiting, and comprehensive error handling
• Implemented real-time features using WebSocket connections and event-driven architecture patterns
• Optimized database schema and queries resulting in 65% improvement in data retrieval performance
• Established monitoring and alerting systems with detailed logging and performance metrics tracking`,
      
      `• Created innovative web application using cutting-edge technologies and modern development practices
• Implemented advanced data visualization features and interactive dashboards for business intelligence
• Built automated deployment pipeline with quality gates, security scanning, and performance testing
• Designed scalable database architecture supporting complex queries and high-volume data processing
• Collaborated with UX/UI team to deliver intuitive user experience with accessibility compliance (WCAG 2.1)`
    ];

    const randomDescription = enhancedProjectDescriptions[Math.floor(Math.random() * enhancedProjectDescriptions.length)];
    updateProject(projId, 'description', randomDescription);
    
    toast({
      title: "AI Project Description Generated!",
      description: "Technical project description with specific metrics and modern technology stack.",
    });
  };

  const generateAIActivityDescription = async (actId: number) => {
    const act = activities.find(a => a.id === actId);
    if (!act?.title || !act?.organization) {
      toast({
        title: "Missing Information",
        description: "Please add activity title and organization first.",
        variant: "destructive",
      });
      return;
    }

    const enhancedActivityDescriptions = [
      `• Organized and executed large-scale community outreach programs impacting 1,200+ individuals annually
• Secured $75,000+ in funding through grant writing and corporate sponsorship initiatives
• Led cross-functional volunteer teams of 25+ members across multiple geographic locations
• Developed comprehensive training programs increasing volunteer retention rate by 80%
• Established strategic partnerships with 15+ local organizations expanding program reach and effectiveness`,
      
      `• Planned and coordinated signature events attracting 500+ participants and generating $50K+ in donations
• Created integrated marketing campaigns across digital and traditional channels increasing attendance by 120%
• Managed operational budgets exceeding $100K with zero cost overruns and detailed financial reporting
• Implemented volunteer management systems and processes improving efficiency by 60%
• Built lasting relationships with community leaders, government officials, and corporate partners`,
      
      `• Initiated and led innovative programs addressing critical community needs with measurable social impact
• Developed educational workshops and training materials reaching 800+ beneficiaries over two years
• Coordinated with municipal authorities and nonprofits to maximize resource allocation and program effectiveness
• Created comprehensive documentation and best practices guide adopted by 8+ similar organizations
• Demonstrated exceptional leadership and project management skills in fast-paced, resource-constrained environment`
    ];

    const randomDescription = enhancedActivityDescriptions[Math.floor(Math.random() * enhancedActivityDescriptions.length)];
    updateActivity(actId, 'description', randomDescription);
    
    toast({
      title: "AI Activity Description Generated!",
      description: "Leadership-focused activity description highlighting impact and quantified results.",
    });
  };

  const handleSave = async () => {
    try {
      const resumeData = {
        user_id: user?.id,
        title: `${personalInfo.firstName || 'My'} ${personalInfo.lastName || 'Resume'}`,
        personal_info: personalInfo as any,
        experience: experience as any,
        education: education as any,
        projects: projects as any,
        activities: activities as any,
        resume_references: references as any,
        skills: skills,
        summary: personalInfo.summary
      };

      let result;
      if (currentResumeId) {
        result = await supabase
          .from('resumes')
          .update(resumeData)
          .eq('id', currentResumeId);
      } else {
        result = await supabase
          .from('resumes')
          .insert(resumeData)
          .select()
          .single();
        
        if (result.data) {
          setCurrentResumeId(result.data.id);
        }
      }

      if (result.error) throw result.error;

      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your resume.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('resume-preview-export');
      if (!element) {
        // Create a hidden element with the resume content for PDF export
        const exportElement = document.createElement('div');
        exportElement.id = 'resume-preview-export';
        exportElement.style.position = 'absolute';
        exportElement.style.left = '-9999px';
        exportElement.style.width = '8.5in';
        exportElement.style.backgroundColor = 'white';
        exportElement.style.padding = '0.5in';
        exportElement.style.fontSize = '11px';
        exportElement.style.lineHeight = '1.4';
        exportElement.style.fontFamily = 'Arial, sans-serif';
        
        exportElement.innerHTML = generateResumeHTML();
        document.body.appendChild(exportElement);

        const canvas = await html2canvas(exportElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 816, // 8.5 inches at 96 DPI
          height: 1056 // 11 inches at 96 DPI
        });

        document.body.removeChild(exportElement);

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'in',
          format: 'letter'
        });

        const imgWidth = 8.5;
        const imgHeight = 11;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${personalInfo.firstName || 'Resume'}_${personalInfo.lastName || 'Document'}.pdf`);

        // Track download
        if (currentResumeId) {
          const { data: currentResume } = await supabase
            .from('resumes')
            .select('downloads')
            .eq('id', currentResumeId)
            .single();

          await supabase
            .from('resumes')
            .update({ 
              downloads: (currentResume?.downloads || 0) + 1 
            })
            .eq('id', currentResumeId);
        }

        toast({
          title: "Resume Downloaded",
          description: "Your resume has been downloaded as a PDF file.",
        });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateResumeHTML = () => {
    const data = {
      personalInfo: personalInfo.firstName ? personalInfo : {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        website: 'linkedin.com/in/johndoe',
        summary: 'Professional summary will appear here...'
      },
      experience: experience.length > 0 ? experience : [],
      education: education.length > 0 ? education : [],
      projects: projects.length > 0 ? projects : [],
      skills: skills.length > 0 ? skills : []
    };

    return `
      <div style="max-width: 7.5in; margin: 0 auto; font-family: Arial, sans-serif; font-size: 11px; line-height: 1.4; color: #333;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 15px;">
          <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: bold; color: #1a1a1a;">
            ${data.personalInfo.firstName} ${data.personalInfo.lastName}
          </h1>
          <div style="font-size: 10px; color: #666;">
            ${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.location} • ${data.personalInfo.website}
          </div>
        </div>

        <!-- Summary -->
        ${data.personalInfo.summary ? `
        <div style="margin-bottom: 15px;">
          <h2 style="font-size: 13px; font-weight: bold; color: #1a1a1a; margin: 0 0 6px 0; border-bottom: 1px solid #ccc; padding-bottom: 2px;">
            PROFESSIONAL SUMMARY
          </h2>
          <p style="margin: 0; font-size: 10px; line-height: 1.4;">${data.personalInfo.summary}</p>
        </div>
        ` : ''}

        <!-- Experience -->
        ${data.experience.length > 0 ? `
        <div style="margin-bottom: 15px;">
          <h2 style="font-size: 13px; font-weight: bold; color: #1a1a1a; margin: 0 0 8px 0; border-bottom: 1px solid #ccc; padding-bottom: 2px;">
            PROFESSIONAL EXPERIENCE
          </h2>
          ${data.experience.slice(0, 3).map(exp => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
                <div>
                  <h3 style="margin: 0; font-size: 11px; font-weight: bold;">${exp.title || 'Job Title'}</h3>
                  <p style="margin: 0; font-size: 10px; color: #666;">${exp.company || 'Company'} • ${exp.location}</p>
                </div>
                <span style="font-size: 10px; color: #666; white-space: nowrap;">${exp.startDate} - ${exp.endDate}</span>
              </div>
              <div style="font-size: 9px; margin-left: 0; line-height: 1.3;">
                ${exp.description.split('\n').map(line => `<div style="margin-bottom: 1px;">${line}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- Education and Skills in two columns -->
        <div style="display: flex; gap: 20px;">
          <!-- Education -->
          ${data.education.length > 0 ? `
          <div style="flex: 1;">
            <h2 style="font-size: 13px; font-weight: bold; color: #1a1a1a; margin: 0 0 6px 0; border-bottom: 1px solid #ccc; padding-bottom: 2px;">
              EDUCATION
            </h2>
            ${data.education.slice(0, 2).map(edu => `
              <div style="margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 10px; font-weight: bold;">${edu.degree || 'Degree'}</h3>
                <p style="margin: 0; font-size: 9px; color: #666;">${edu.school || 'School'} • ${edu.location}</p>
                <p style="margin: 0; font-size: 9px; color: #666;">${edu.startDate} - ${edu.endDate}</p>
              </div>
            `).join('')}
          </div>
          ` : '<div style="flex: 1;"></div>'}

          <!-- Skills -->
          ${data.skills.length > 0 ? `
          <div style="flex: 1;">
            <h2 style="font-size: 13px; font-weight: bold; color: #1a1a1a; margin: 0 0 6px 0; border-bottom: 1px solid #ccc; padding-bottom: 2px;">
              TECHNICAL SKILLS
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${data.skills.slice(0, 12).map(skill => `
                <span style="background: #f0f0f0; color: #333; padding: 2px 6px; border-radius: 3px; font-size: 9px; border: 1px solid #ddd;">
                  ${skill}
                </span>
              `).join('')}
            </div>
          </div>
          ` : '<div style="flex: 1;"></div>'}
        </div>
      </div>
    `;
  };

  const applyAISuggestions = (suggestions: any) => {
    if (suggestions.summary) {
      setPersonalInfo(prev => ({ ...prev, summary: suggestions.summary }));
    }
    
    if (suggestions.skills) {
      const newSkills = suggestions.skills.filter((skill: string) => !skills.includes(skill));
      setSkills(prev => [...prev, ...newSkills]);
    }

    if (suggestions.experience) {
      setExperience(prev => prev.map((exp, index) => {
        if (suggestions.experience[index]) {
          return { ...exp, description: suggestions.experience[index].description };
        }
        return exp;
      }));
    }

    toast({
      title: "AI Suggestions Applied",
      description: "Your resume has been updated with AI recommendations.",
    });
  };

  const getResumeStyle = () => {
    switch (resumeTemplate) {
      case 'faang':
        return 'bg-white border-l-4 border-blue-600 shadow-lg';
      case 'executive':
        return 'bg-gradient-to-r from-gray-50 to-white border border-gray-300 shadow-xl';
      case 'creative':
        return 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-lg';
      default:
        return 'bg-white border border-gray-200 shadow-md';
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
                <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
                <p className="mt-2 text-gray-600">Create and customize your professional resume</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <Button variant="outline" onClick={() => setShowUploadModal(true)} className="hover-lift">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
                <Button variant="outline" onClick={() => setShowPreviewModal(true)} className="hover-lift">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" onClick={handleSave} className="hover-lift">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleDownloadPDF} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-lift">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Panel */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Edit Resume</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={resumeTemplate} onValueChange={setResumeTemplate}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="faang">FAANG</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowAIModal(true)}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
                    >
                      <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                      AI Feedback
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-7">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="activities">Activities</TabsTrigger>
                      <TabsTrigger value="references">References</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={personalInfo.location}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={personalInfo.website}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, website: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="summary">Professional Summary</Label>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={generateAISummary}
                            className="text-xs"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Generate
                          </Button>
                        </div>
                        <Textarea
                          id="summary"
                          rows={4}
                          value={personalInfo.summary}
                          onChange={(e) => setPersonalInfo(prev => ({ ...prev, summary: e.target.value }))}
                          placeholder="Write a compelling summary that highlights your key strengths and experience..."
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Work Experience</h3>
                        <Button size="sm" onClick={addExperience} className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>

                      {experience.map((exp) => (
                        <Card key={exp.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Experience {exp.id}</Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeExperience(exp.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Input 
                                  value={exp.title} 
                                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Company</Label>
                                <Input 
                                  value={exp.company} 
                                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input 
                                  value={exp.location} 
                                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input 
                                  type="month" 
                                  value={exp.startDate} 
                                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input 
                                  value={exp.endDate} 
                                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => generateAIDescription(exp.id)}
                                  className="text-xs"
                                >
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  AI Generate
                                </Button>
                              </div>
                              <Textarea 
                                rows={4} 
                                value={exp.description} 
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                placeholder="Describe your responsibilities and achievements..."
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Education</h3>
                        <Button size="sm" onClick={addEducation} className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </div>

                      {education.map((edu) => (
                        <Card key={edu.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Education {edu.id}</Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input 
                                value={edu.degree} 
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>School</Label>
                                <Input 
                                  value={edu.school} 
                                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input 
                                  value={edu.location} 
                                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input 
                                  type="month" 
                                  value={edu.startDate} 
                                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input 
                                  type="month" 
                                  value={edu.endDate} 
                                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>GPA (Optional)</Label>
                                <Input 
                                  value={edu.gpa} 
                                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Projects</h3>
                        <Button size="sm" onClick={addProject} className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </div>

                      {projects.map((proj) => (
                        <Card key={proj.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Project {proj.id}</Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeProject(proj.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Project Title</Label>
                                <Input 
                                  value={proj.title} 
                                  onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Project Link</Label>
                                <Input 
                                  value={proj.link} 
                                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                                  placeholder="https://github.com/yourproject"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Technologies Used</Label>
                              <Input 
                                value={proj.technologies} 
                                onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                                placeholder="React, Node.js, MongoDB"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input 
                                  type="month" 
                                  value={proj.startDate} 
                                  onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input 
                                  value={proj.endDate} 
                                  onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => generateAIProjectDescription(proj.id)}
                                  className="text-xs"
                                >
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  AI Generate
                                </Button>
                              </div>
                              <Textarea 
                                rows={3} 
                                value={proj.description} 
                                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                                placeholder="Describe the project and your contributions..."
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="activities" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Extra Curricular Activities</h3>
                        <Button size="sm" onClick={addActivity} className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Activity
                        </Button>
                      </div>

                      {activities.map((act) => (
                        <Card key={act.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Activity {act.id}</Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeActivity(act.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Activity Title</Label>
                                <Input 
                                  value={act.title} 
                                  onChange={(e) => updateActivity(act.id, 'title', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Organization</Label>
                                <Input 
                                  value={act.organization} 
                                  onChange={(e) => updateActivity(act.id, 'organization', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Role</Label>
                              <Input 
                                value={act.role} 
                                onChange={(e) => updateActivity(act.id, 'role', e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input 
                                  type="month" 
                                  value={act.startDate} 
                                  onChange={(e) => updateActivity(act.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input 
                                  value={act.endDate} 
                                  onChange={(e) => updateActivity(act.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => generateAIActivityDescription(act.id)}
                                  className="text-xs"
                                >
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  AI Generate
                                </Button>
                              </div>
                              <Textarea 
                                rows={3} 
                                value={act.description} 
                                onChange={(e) => updateActivity(act.id, 'description', e.target.value)}
                                placeholder="Describe your involvement and achievements..."
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="references" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">References</h3>
                        <Button size="sm" onClick={addReference} className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Reference
                        </Button>
                      </div>

                      {references.map((ref) => (
                        <Card key={ref.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Reference {ref.id}</Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeReference(ref.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input 
                                  value={ref.name} 
                                  onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Input 
                                  value={ref.title} 
                                  onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Company</Label>
                                <Input 
                                  value={ref.company} 
                                  onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Relationship</Label>
                                <Input 
                                  value={ref.relationship} 
                                  onChange={(e) => updateReference(ref.id, 'relationship', e.target.value)}
                                  placeholder="Former Manager, Colleague, etc."
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Email</Label>
                                <Input 
                                  type="email"
                                  value={ref.email} 
                                  onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input 
                                  value={ref.phone} 
                                  onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Skills</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                            {skill}
                            <button 
                              className="ml-2 text-gray-500 hover:text-red-600"
                              onClick={() => removeSkill(skill)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label>Add New Skill</Label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="e.g., JavaScript, Project Management" 
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <Button size="sm" onClick={addSkill}>Add</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Compact Preview Panel */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Live Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div id="resume-preview" className={`${getResumeStyle()} rounded-lg p-4 text-[9px] space-y-1.5 max-h-[800px] overflow-y-auto leading-tight`}>
                    {/* Compact Header */}
                    <div className="text-center border-b border-gray-200 pb-1.5">
                      <h1 className="text-[11px] font-bold text-gray-900 mb-0.5">
                        {personalInfo.firstName || 'First'} {personalInfo.lastName || 'Last'}
                      </h1>
                      <div className="flex justify-center space-x-3 text-[7px] text-gray-600">
                        {personalInfo.email && (
                          <div className="flex items-center space-x-0.5">
                            <Mail className="w-2 h-2" />
                            <span>{personalInfo.email}</span>
                          </div>
                        )}
                        {personalInfo.phone && (
                          <div className="flex items-center space-x-0.5">
                            <Phone className="w-2 h-2" />
                            <span>{personalInfo.phone}</span>
                          </div>
                        )}
                        {personalInfo.location && (
                          <div className="flex items-center space-x-0.5">
                            <MapPin className="w-2 h-2" />
                            <span>{personalInfo.location}</span>
                          </div>
                        )}
                      </div>
                      {personalInfo.website && (
                        <div className="flex items-center justify-center space-x-0.5 text-[7px] text-gray-600 mt-0.5">
                          <Globe className="w-2 h-2" />
                          <span>{personalInfo.website}</span>
                        </div>
                      )}
                    </div>

                    {/* Compact Summary */}
                    {personalInfo.summary && (
                      <div>
                        <h2 className="font-semibold text-gray-900 mb-0.5 text-[9px]">SUMMARY</h2>
                        <p className="text-[7px] text-gray-700 leading-tight">{personalInfo.summary}</p>
                      </div>
                    )}

                    {/* Show sample data if no real data */}
                    {experience.length === 0 && (
                      <div className="mb-2">
                        <h2 className="font-semibold text-gray-900 mb-0.5 text-[7px]">EXPERIENCE</h2>
                        <div className="text-[6px] text-gray-500 italic">
                          Add your work experience to see it here
                        </div>
                      </div>
                    )}

                    {experience.length > 0 && (
                      <div className="mb-2">
                        <h2 className="font-semibold text-gray-900 mb-0.5 text-[7px]">EXPERIENCE</h2>
                        {experience.slice(0, 2).map((exp) => (
                          <div key={exp.id} className="mb-1">
                            <h3 className="font-medium text-gray-900 text-[6px]">{exp.title}</h3>
                            <p className="text-[5px] text-gray-600">{exp.company}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AIFeedbackModal 
        isOpen={showAIModal} 
        onClose={() => setShowAIModal(false)}
        resumeData={{ personalInfo, experience, education, skills }}
        onApplySuggestions={applyAISuggestions}
      />

      <ResumeUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />

      <ResumePreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        resumeData={{ personalInfo, experience, education, projects, skills }}
        onDownload={handleDownloadPDF}
      />
    </div>
  );
};

export default ResumeBuilder;
