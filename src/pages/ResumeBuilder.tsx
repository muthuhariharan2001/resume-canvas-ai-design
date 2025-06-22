
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast"
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import ResumePreviewModal from '@/components/ResumePreviewModal';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  });
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resume_references, setReferences] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const { toast } = useToast()

  useEffect(() => {
    const fetchResumeData = async () => {
      if (user) {
        try {
          // Use maybeSingle() instead of single() to handle cases where no data exists
          const { data, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) {
            console.error('Error fetching resume data:', error);
            return;
          }

          if (data) {
            setPersonalInfo((data.personal_info as any) || personalInfo);
            setExperience((data.experience as any[]) || []);
            setEducation((data.education as any[]) || []);
            setProjects((data.projects as any[]) || []);
            setSkills((data.skills as string[]) || []);
            setReferences((data.resume_references as any[]) || []);
            setActivities((data.activities as any[]) || []);
          }
        } catch (error) {
          console.error('Error fetching resume data:', error);
        }
      }
    };

    fetchResumeData();
  }, [user]);

  const handleInputChange = (section, field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addSectionItem = (section, newItem) => {
    switch (section) {
      case 'experience':
        setExperience(prev => [...prev, { id: uuidv4(), ...newItem }]);
        break;
      case 'education':
        setEducation(prev => [...prev, { id: uuidv4(), ...newItem }]);
        break;
      case 'projects':
        setProjects(prev => [...prev, { id: uuidv4(), ...newItem }]);
        break;
      case 'skills':
        if (newItem.skill && newItem.skill.trim()) {
          const newSkills = newItem.skill.split(',').map(s => s.trim()).filter(s => s.length > 0);
          setSkills(prev => [...new Set([...prev, ...newSkills])]);
        }
        break;
      case 'references':
        setReferences(prev => [...prev, { id: uuidv4(), ...newItem }]);
        break;
      case 'activities':
        setActivities(prev => [...prev, { id: uuidv4(), ...newItem }]);
        break;
      default:
        break;
    }
  };

  const updateSectionItem = (section, id, updatedItem) => {
    switch (section) {
      case 'experience':
        setExperience(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
        break;
      case 'education':
        setEducation(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
        break;
      case 'projects':
        setProjects(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
        break;
      case 'references':
        setReferences(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
        break;
      case 'activities':
        setActivities(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
        break;
      default:
        break;
    }
  };

  const deleteSectionItem = (section, id) => {
    switch (section) {
      case 'experience':
        setExperience(prev => prev.filter(item => item.id !== id));
        break;
      case 'education':
        setEducation(prev => prev.filter(item => item.id !== id));
        break;
      case 'projects':
        setProjects(prev => prev.filter(item => item.id !== id));
        break;
      case 'references':
        setReferences(prev => prev.filter(item => item.id !== id));
        break;
      case 'activities':
        setActivities(prev => prev.filter(item => item.id !== id));
        break;
      case 'skills':
        setSkills(prev => prev.filter((_, index) => index !== id));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "You must be logged in to save a resume.",
        description: "Please log in or sign up to continue.",
        variant: "destructive",
      })
      return;
    }

    try {
      // First, check if a resume already exists for this user
      const { data: existingResume } = await supabase
        .from('resumes')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      let result;
      
      if (existingResume) {
        // Update existing resume
        result = await supabase
          .from('resumes')
          .update({
            personal_info: personalInfo,
            experience,
            education,
            projects,
            skills,
            resume_references,
            activities,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      } else {
        // Insert new resume
        result = await supabase
          .from('resumes')
          .insert([{
            user_id: user.id,
            personal_info: personalInfo,
            experience,
            education,
            projects,
            skills,
            resume_references,
            activities,
            updated_at: new Date().toISOString()
          }]);
      }

      if (result.error) {
        console.error('Error saving resume:', result.error);
        toast({
          title: "Error saving resume",
          description: "Please try again.",
          variant: "destructive",
        })
      } else {
        console.log('Resume saved successfully!', result.data);
        setShowSuccess(true);
        toast({
          title: "Resume saved successfully!",
        })
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Unexpected error",
        description: "Please check the console for more details.",
        variant: "destructive",
      })
    }
  };

  const handleDownload = () => {
    console.log('Downloading resume...');
  };

  const getDisplayData = () => ({
    personalInfo,
    experience,
    education,
    projects,
    skills,
    resume_references,
    activities
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-2 text-gray-600">Create your professional resume with our easy-to-use builder</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="professional">Professional</option>
                    <option value="faang">FAANG</option>
                    <option value="executive">Executive</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>

                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        type="text"
                        id="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        type="text"
                        id="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        value={personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        type="tel"
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        type="text"
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        type="url"
                        id="website"
                        value={personalInfo.website}
                        onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      value={personalInfo.summary}
                      onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
                  {experience.map((exp) => (
                    <div key={exp.id} className="mb-4 p-4 border rounded-md">
                      <Input
                        type="text"
                        placeholder="Title"
                        value={exp.title || ''}
                        onChange={(e) => updateSectionItem('experience', exp.id, { title: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Company"
                        value={exp.company || ''}
                        onChange={(e) => updateSectionItem('experience', exp.id, { company: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Location"
                        value={exp.location || ''}
                        onChange={(e) => updateSectionItem('experience', exp.id, { location: e.target.value })}
                        className="mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <Input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate || ''}
                          onChange={(e) => updateSectionItem('experience', exp.id, { startDate: e.target.value })}
                        />
                        <Input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate || ''}
                          onChange={(e) => updateSectionItem('experience', exp.id, { endDate: e.target.value })}
                        />
                      </div>
                      <Textarea
                        placeholder="Description"
                        value={exp.description || ''}
                        onChange={(e) => updateSectionItem('experience', exp.id, { description: e.target.value })}
                        className="mb-2"
                      />
                      <Button type="button" variant="destructive" size="sm" onClick={() => deleteSectionItem('experience', exp.id)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => addSectionItem('experience', { title: '', company: '', location: '', startDate: '', endDate: '', description: '' })}
                  >
                    Add Experience
                  </Button>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-4 p-4 border rounded-md">
                      <Input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree || ''}
                        onChange={(e) => updateSectionItem('education', edu.id, { degree: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="School"
                        value={edu.school || ''}
                        onChange={(e) => updateSectionItem('education', edu.id, { school: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Location"
                        value={edu.location || ''}
                        onChange={(e) => updateSectionItem('education', edu.id, { location: e.target.value })}
                        className="mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <Input
                          type="text"
                          placeholder="Start Date"
                          value={edu.startDate || ''}
                          onChange={(e) => updateSectionItem('education', edu.id, { startDate: e.target.value })}
                        />
                        <Input
                          type="text"
                          placeholder="End Date"
                          value={edu.endDate || ''}
                          onChange={(e) => updateSectionItem('education', edu.id, { endDate: e.target.value })}
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="GPA"
                        value={edu.gpa || ''}
                        onChange={(e) => updateSectionItem('education', edu.id, { gpa: e.target.value })}
                        className="mb-2"
                      />
                      <Button type="button" variant="destructive" size="sm" onClick={() => deleteSectionItem('education', edu.id)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => addSectionItem('education', { degree: '', school: '', location: '', startDate: '', endDate: '', gpa: '' })}
                  >
                    Add Education
                  </Button>
                </div>

                {/* Projects */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
                  {projects.map((project) => (
                    <div key={project.id} className="mb-4 p-4 border rounded-md">
                      <Input
                        type="text"
                        placeholder="Title"
                        value={project.title || ''}
                        onChange={(e) => updateSectionItem('projects', project.id, { title: e.target.value })}
                        className="mb-2"
                      />
                      <Textarea
                        placeholder="Description"
                        value={project.description || ''}
                        onChange={(e) => updateSectionItem('projects', project.id, { description: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Technologies"
                        value={project.technologies || ''}
                        onChange={(e) => updateSectionItem('projects', project.id, { technologies: e.target.value })}
                        className="mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <Input
                          type="text"
                          placeholder="Start Date"
                          value={project.startDate || ''}
                          onChange={(e) => updateSectionItem('projects', project.id, { startDate: e.target.value })}
                        />
                        <Input
                          type="text"
                          placeholder="End Date"
                          value={project.endDate || ''}
                          onChange={(e) => updateSectionItem('projects', project.id, { endDate: e.target.value })}
                        />
                      </div>
                      <Button type="button" variant="destructive" size="sm" onClick={() => deleteSectionItem('projects', project.id)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => addSectionItem('projects', { title: '', description: '', technologies: '', startDate: '', endDate: '' })}
                  >
                    Add Project
                  </Button>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Add skills separated by commas"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = e.target.value.trim();
                          if (value) {
                            addSectionItem('skills', { skill: value });
                            e.target.value = '';
                          }
                        }
                      }}
                      className="mb-2"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={(e) => {
                        const input = e.target.parentElement.querySelector('input');
                        const value = input.value.trim();
                        if (value) {
                          addSectionItem('skills', { skill: value });
                          input.value = '';
                        }
                      }}
                    >
                      Add Skills
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                        {skill}
                        <button
                          type="button"
                          onClick={() => deleteSectionItem('skills', index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* References */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">References</h2>
                  {resume_references.map((reference) => (
                    <div key={reference.id} className="mb-4 p-4 border rounded-md">
                      <Input
                        type="text"
                        placeholder="Name"
                        value={reference.name || ''}
                        onChange={(e) => updateSectionItem('references', reference.id, { name: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Title"
                        value={reference.title || ''}
                        onChange={(e) => updateSectionItem('references', reference.id, { title: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Company"
                        value={reference.company || ''}
                        onChange={(e) => updateSectionItem('references', reference.id, { company: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={reference.email || ''}
                        onChange={(e) => updateSectionItem('references', reference.id, { email: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        value={reference.phone || ''}
                        onChange={(e) => updateSectionItem('references', reference.id, { phone: e.target.value })}
                        className="mb-2"
                      />
                      <Button type="button" variant="destructive" size="sm" onClick={() => deleteSectionItem('references', reference.id)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => addSectionItem('references', { name: '', title: '', company: '', email: '', phone: '' })}
                  >
                    Add Reference
                  </Button>
                </div>

                {/* Activities */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Activities & Achievements</h2>
                  {activities.map((activity) => (
                    <div key={activity.id} className="mb-4 p-4 border rounded-md">
                      <Input
                        type="text"
                        placeholder="Title"
                        value={activity.title || ''}
                        onChange={(e) => updateSectionItem('activities', activity.id, { title: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Organization"
                        value={activity.organization || ''}
                        onChange={(e) => updateSectionItem('activities', activity.id, { organization: e.target.value })}
                        className="mb-2"
                      />
                      <Textarea
                        placeholder="Description"
                        value={activity.description || ''}
                        onChange={(e) => updateSectionItem('activities', activity.id, { description: e.target.value })}
                        className="mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <Input
                          type="text"
                          placeholder="Start Date"
                          value={activity.startDate || ''}
                          onChange={(e) => updateSectionItem('activities', activity.id, { startDate: e.target.value })}
                        />
                        <Input
                          type="text"
                          placeholder="End Date"
                          value={activity.endDate || ''}
                          onChange={(e) => updateSectionItem('activities', activity.id, { endDate: e.target.value })}
                        />
                      </div>
                      <Button type="button" variant="destructive" size="sm" onClick={() => deleteSectionItem('activities', activity.id)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => addSectionItem('activities', { title: '', organization: '', description: '', startDate: '', endDate: '' })}
                  >
                    Add Activity
                  </Button>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Preview Resume
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save Resume
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Live Preview - {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template
              </h3>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 h-96 overflow-y-auto">
                <div className="text-center text-gray-500 text-sm mb-4">
                  Live preview with {selectedTemplate} template
                </div>
                <div className="scale-50 origin-top-left transform w-[200%] h-[200%]">
                  <ResumePreviewModal
                    isOpen={false}
                    onClose={() => {}}
                    resumeData={getDisplayData()}
                    onDownload={() => {}}
                    template={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <ResumePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        resumeData={getDisplayData()}
        onDownload={handleDownload}
        template={selectedTemplate}
      />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          Resume saved successfully!
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
