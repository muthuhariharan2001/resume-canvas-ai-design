
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/Navigation';
import { 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Save,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    website: 'johndoe.dev',
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.'
  });

  const [experience, setExperience] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%.'
    }
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California',
      location: 'Berkeley, CA',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8'
    }
  ]);

  const [skills] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'
  ]);

  const handleSave = () => {
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleAIFeedback = () => {
    toast({
      title: "AI Analysis Complete",
      description: "Your resume has been analyzed. Check the feedback panel for suggestions.",
    });
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
                <Button variant="outline" onClick={handleSave} className="hover-lift">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="hover-lift">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-lift">
                  <Download className="w-4 h-4 mr-2" />
                  Download
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAIFeedback}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                    AI Feedback
                  </Button>
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
                        <Label htmlFor="summary">Professional Summary</Label>
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
                        <Button size="sm" className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>

                      {experience.map((exp) => (
                        <Card key={exp.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Experience {exp.id}</Badge>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Input value={exp.title} />
                              </div>
                              <div className="space-y-2">
                                <Label>Company</Label>
                                <Input value={exp.company} />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input value={exp.location} />
                              </div>
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="month" value={exp.startDate} />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input value={exp.endDate} />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea rows={3} value={exp.description} />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Education</h3>
                        <Button size="sm" className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </div>

                      {education.map((edu) => (
                        <Card key={edu.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Education {edu.id}</Badge>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input value={edu.degree} />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>School</Label>
                                <Input value={edu.school} />
                              </div>
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input value={edu.location} />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="month" value={edu.startDate} />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input type="month" value={edu.endDate} />
                              </div>
                              <div className="space-y-2">
                                <Label>GPA (Optional)</Label>
                                <Input value={edu.gpa} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Skills</h3>
                        <Button size="sm" className="hover-lift">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Skill
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                            {skill}
                            <button className="ml-2 text-gray-500 hover:text-red-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label>Add New Skill</Label>
                        <div className="flex gap-2">
                          <Input placeholder="e.g., JavaScript, Project Management" />
                          <Button size="sm">Add</Button>
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
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm space-y-4">
                    {/* Header */}
                    <div className="text-center border-b border-gray-200 pb-4">
                      <h1 className="text-xl font-bold text-gray-900">
                        {personalInfo.firstName} {personalInfo.lastName}
                      </h1>
                      <div className="mt-2 space-y-1 text-gray-600">
                        <div className="flex items-center justify-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs">{personalInfo.email}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span className="text-xs">{personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{personalInfo.location}</span>
                        </div>
                        {personalInfo.website && (
                          <div className="flex items-center justify-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span className="text-xs">{personalInfo.website}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h2 className="font-semibold text-gray-900 mb-2">Professional Summary</h2>
                      <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h2 className="font-semibold text-gray-900 mb-2">Experience</h2>
                      {experience.map((exp) => (
                        <div key={exp.id} className="mb-3">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-gray-900 text-xs">{exp.title}</h3>
                            <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{exp.company} • {exp.location}</p>
                          <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Education */}
                    <div>
                      <h2 className="font-semibold text-gray-900 mb-2">Education</h2>
                      {education.map((edu) => (
                        <div key={edu.id} className="mb-2">
                          <h3 className="font-medium text-gray-900 text-xs">{edu.degree}</h3>
                          <p className="text-xs text-gray-600">{edu.school} • {edu.location}</p>
                          <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                          {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
