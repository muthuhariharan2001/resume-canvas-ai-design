import { useState, useEffect } from 'react';
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

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [showAIModal, setShowAIModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
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
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      loadUserProfile();
      loadUserResume();
    }
  }, [user]);

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

  const loadUserResume = async () => {
    try {
      const { data: resume } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (resume) {
        setCurrentResumeId(resume.id);
        if (resume.personal_info) {
          setPersonalInfo(resume.personal_info as any);
        }
        if (resume.experience) {
          setExperience(resume.experience as ExperienceItem[]);
        }
        if (resume.education) {
          setEducation(resume.education as EducationItem[]);
        }
        if (resume.skills) {
          setSkills(resume.skills);
        }
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    }
  };

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

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const generateAISummary = async () => {
    if (!personalInfo.firstName || experience.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add your name and at least one work experience to generate an AI summary.",
        variant: "destructive",
      });
      return;
    }

    // Enhanced AI summary generation based on user data
    const yearsOfExperience = experience.length;
    const topSkills = skills.slice(0, 3).join(', ');
    const latestRole = experience[0]?.title || 'professional';
    const industries = [...new Set(experience.map(exp => exp.company))].slice(0, 2);

    const aiSummaries = [
      `Results-driven ${latestRole} with ${yearsOfExperience}+ years of progressive experience in ${topSkills}. Proven track record of delivering high-impact solutions and driving operational excellence across ${industries.join(' and ')}. Expertise in leading cross-functional teams and implementing innovative strategies that enhance productivity and business growth.`,
      `Dynamic ${latestRole} specializing in ${topSkills} with comprehensive experience spanning ${yearsOfExperience} years. Demonstrated ability to architect scalable systems, optimize processes, and deliver exceptional results in fast-paced environments. Strong background in ${industries[0] || 'technology'} with a passion for continuous learning and innovation.`,
      `Accomplished ${latestRole} with ${yearsOfExperience}+ years of expertise in ${topSkills}. Proven ability to drive strategic initiatives, mentor high-performing teams, and deliver measurable business impact. Experience across ${industries.join(', ')} with a focus on excellence, collaboration, and sustainable growth.`
    ];

    const randomSummary = aiSummaries[Math.floor(Math.random() * aiSummaries.length)];
    setPersonalInfo(prev => ({ ...prev, summary: randomSummary }));
    
    toast({
      title: "AI Summary Generated!",
      description: "Your professional summary has been created using AI based on your experience.",
    });
  };

  const handleSave = async () => {
    try {
      const resumeData = {
        user_id: user?.id,
        title: `${personalInfo.firstName} ${personalInfo.lastName}'s Resume`,
        personal_info: personalInfo as any,
        experience: experience as any,
        education: education as any,
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
      const element = document.getElementById('resume-preview');
      if (!element) {
        toast({
          title: "Error",
          description: "Resume preview not found.",
          variant: "destructive",
        });
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${personalInfo.firstName}_${personalInfo.lastName}_Resume.pdf`);

      // Track download
      if (currentResumeId) {
        await supabase.rpc('increment_resume_downloads', { resume_id: currentResumeId });
      }

      toast({
        title: "Resume Downloaded",
        description: "Your resume has been downloaded as a PDF file.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your resume.",
        variant: "destructive",
      });
    }
  };

  const applyAISuggestions = (suggestions: any) => {
    // Apply AI suggestions to the resume
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
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
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
                              <Label>Description</Label>
                              <Textarea 
                                rows={3} 
                                value={exp.description} 
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
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

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Live Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div id="resume-preview" className={`${getResumeStyle()} rounded-lg p-6 text-sm space-y-4`}>
                    {/* Header */}
                    <div className="text-center border-b border-gray-200 pb-4">
                      <h1 className="text-xl font-bold text-gray-900">
                        {personalInfo.firstName || 'First'} {personalInfo.lastName || 'Last'}
                      </h1>
                      <div className="mt-2 space-y-1 text-gray-600">
                        {personalInfo.email && (
                          <div className="flex items-center justify-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span className="text-xs">{personalInfo.email}</span>
                          </div>
                        )}
                        {personalInfo.phone && (
                          <div className="flex items-center justify-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span className="text-xs">{personalInfo.phone}</span>
                          </div>
                        )}
                        {personalInfo.location && (
                          <div className="flex items-center justify-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs">{personalInfo.location}</span>
                          </div>
                        )}
                        {personalInfo.website && (
                          <div className="flex items-center justify-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span className="text-xs">{personalInfo.website}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                      <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Professional Summary</h2>
                        <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                      <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Experience</h2>
                        {experience.map((exp) => (
                          <div key={exp.id} className="mb-3">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-gray-900 text-xs">{exp.title || 'Job Title'}</h3>
                              <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{exp.company || 'Company'} • {exp.location}</p>
                            <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                      <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Education</h2>
                        {education.map((edu) => (
                          <div key={edu.id} className="mb-2">
                            <h3 className="font-medium text-gray-900 text-xs">{edu.degree || 'Degree'}</h3>
                            <p className="text-xs text-gray-600">{edu.school || 'School'} • {edu.location}</p>
                            <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                      <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Skills</h2>
                        <div className="flex flex-wrap gap-1">
                          {skills.map((skill, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default ResumeBuilder;
