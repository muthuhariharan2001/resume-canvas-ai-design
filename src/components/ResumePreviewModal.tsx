
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: any;
  onDownload: () => void;
  template?: string;
}

const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onDownload,
  template = 'professional'
}) => {
  // Enhanced sample data with all sections
  const getSampleData = () => ({
    personalInfo: {
      firstName: resumeData?.personalInfo?.firstName || 'John',
      lastName: resumeData?.personalInfo?.lastName || 'Doe',
      email: resumeData?.personalInfo?.email || 'john.doe@email.com',
      phone: resumeData?.personalInfo?.phone || '+1 (555) 123-4567',
      location: resumeData?.personalInfo?.location || 'New York, NY',
      website: resumeData?.personalInfo?.website || 'linkedin.com/in/johndoe',
      summary: resumeData?.personalInfo?.summary || 'Results-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams.'
    },
    experience: resumeData?.experience?.length > 0 ? resumeData.experience : [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        location: 'San Francisco, CA',
        startDate: '2020-01',
        endDate: 'Present',
        description: '• Led development of microservices architecture serving 100K+ users\n• Reduced system response time by 40% through database optimization\n• Mentored 5 junior developers and established code review processes'
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Austin, TX',
        startDate: '2018-06',
        endDate: '2019-12',
        description: '• Built responsive web applications using React and Node.js\n• Collaborated with design team to implement pixel-perfect UI components'
      }
    ],
    education: resumeData?.education?.length > 0 ? resumeData.education : [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        startDate: '2014-08',
        endDate: '2018-05',
        gpa: '3.8'
      }
    ],
    projects: resumeData?.projects?.length > 0 ? resumeData.projects : [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: '• Developed full-stack e-commerce platform with React and Express.js\n• Implemented secure payment processing and inventory management',
        technologies: 'React, Node.js, MongoDB, AWS',
        startDate: '2023-01',
        endDate: '2023-06'
      }
    ],
    skills: resumeData?.skills?.length > 0 ? resumeData.skills : [
      'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'Agile'
    ],
    references: resumeData?.resume_references || [
      {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Senior Engineering Manager',
        company: 'Tech Solutions Inc.',
        email: 'sarah.johnson@techsolutions.com',
        phone: '+1 (555) 987-6543'
      }
    ],
    activities: resumeData?.activities || [
      {
        id: 1,
        title: 'Open Source Contributor',
        organization: 'React Community',
        description: 'Active contributor to React ecosystem with 500+ GitHub stars',
        startDate: '2019-01',
        endDate: 'Present'
      }
    ]
  });

  const sampleData = getSampleData();

  // Template configurations
  const getTemplateConfig = () => {
    switch (template.toLowerCase()) {
      case 'faang':
        return {
          headerBg: 'bg-blue-900',
          headerText: 'text-white',
          accentColor: 'text-blue-600',
          borderColor: 'border-blue-200',
          sectionBg: 'bg-blue-50'
        };
      case 'creative':
        return {
          headerBg: 'bg-purple-800',
          headerText: 'text-white',
          accentColor: 'text-purple-600',
          borderColor: 'border-purple-200',
          sectionBg: 'bg-purple-50'
        };
      case 'executive':
        return {
          headerBg: 'bg-gray-800',
          headerText: 'text-white',
          accentColor: 'text-gray-600',
          borderColor: 'border-gray-300',
          sectionBg: 'bg-gray-50'
        };
      default: // professional
        return {
          headerBg: 'bg-gray-700',
          headerText: 'text-white',
          accentColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          sectionBg: 'bg-gray-50'
        };
    }
  };

  const templateConfig = getTemplateConfig();

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('resume-content');
      if (!element) return;

      // Use html2canvas with better options for color preservation
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
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

      pdf.save(`${sampleData.personalInfo.firstName}_${sampleData.personalInfo.lastName}_Resume.pdf`);
      onDownload();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Resume Preview - {template.charAt(0).toUpperCase() + template.slice(1)} Template</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={handleDownloadPDF} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div 
            id="resume-content" 
            className="max-w-[8.5in] mx-auto bg-white"
            style={{ 
              fontSize: '11px', 
              lineHeight: '1.4',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              minHeight: '11in'
            }}
          >
            
            {/* Header Section with Template Colors */}
            <div className={`${templateConfig.headerBg} ${templateConfig.headerText} p-6 text-center`}>
              <h1 className="text-2xl font-bold mb-2">
                {sampleData.personalInfo.firstName} {sampleData.personalInfo.lastName}
              </h1>
              <div className="flex justify-center items-center space-x-3 text-sm flex-wrap">
                <span>{sampleData.personalInfo.email}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.phone}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.location}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.website}</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Professional Summary */}
              <div>
                <h2 className={`text-sm font-bold ${templateConfig.accentColor} mb-3 uppercase tracking-wide pb-1 border-b ${templateConfig.borderColor}`}>
                  Professional Summary
                </h2>
                <p className="text-gray-700 text-xs leading-relaxed">
                  {sampleData.personalInfo.summary}
                </p>
              </div>

              {/* Experience Section */}
              <div>
                <h2 className={`text-sm font-bold ${templateConfig.accentColor} mb-3 uppercase tracking-wide pb-1 border-b ${templateConfig.borderColor}`}>
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {sampleData.experience.map((exp: any, index: number) => (
                    <div key={exp.id || index} className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                          <p className="text-gray-700 text-xs">{exp.company} • {exp.location}</p>
                        </div>
                        <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="text-xs text-gray-700">
                        {exp.description.split('\n').map((line: string, i: number) => (
                          <div key={i} className="mb-1">{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              {sampleData.projects.length > 0 && (
                <div>
                  <h2 className={`text-sm font-bold ${templateConfig.accentColor} mb-3 uppercase tracking-wide pb-1 border-b ${templateConfig.borderColor}`}>
                    Key Projects
                  </h2>
                  <div className="space-y-3">
                    {sampleData.projects.map((proj: any, index: number) => (
                      <div key={proj.id || index} className="mb-3">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900 text-xs">{proj.title}</h3>
                          <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                            {proj.startDate} - {proj.endDate}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          <strong>Technologies:</strong> {proj.technologies}
                        </p>
                        <div className="text-xs text-gray-700">
                          {proj.description.split('\n').map((line: string, i: number) => (
                            <div key={i} className="mb-1">{line}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                <div>
                  <h2 className={`text-sm font-bold ${templateConfig.accentColor} mb-3 uppercase tracking-wide pb-1 border-b ${templateConfig.borderColor}`}>
                    Education
                  </h2>
                  <div className="space-y-3">
                    {sampleData.education.map((edu: any, index: number) => (
                      <div key={edu.id || index} className="mb-3">
                        <h3 className="font-semibold text-gray-900 text-xs mb-1">{edu.degree}</h3>
                        <p className="text-gray-700 text-xs">{edu.school}</p>
                        <p className="text-gray-600 text-xs">{edu.location}</p>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>{edu.startDate} - {edu.endDate}</span>
                          {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Section - Fixed Alignment */}
                <div>
                  <h2 className={`text-sm font-bold ${templateConfig.accentColor} mb-3 uppercase tracking-wide pb-1 border-b ${templateConfig.borderColor}`}>
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {sampleData.skills.map((skill: string, index: number) => (
                      <div key={index} className={`${templateConfig.sectionBg} text-gray-700 px-2 py-1 rounded text-xs border text-center`}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activities Section */}
              {sampleData.activities.length > 0 && (
                <div>
                  <h2 className={`text-sm font-bold ${templateConfig.accentColor} mb-3 uppercase tracking-wide pb-1 border-b ${templateConfig.borderColor}`}>
                    Activities & Achievements
                  </h2>
                  <div className="space-y-3">
                    {sampleData.activities.map((activity: any, index: number) => (
                      <div key={activity.id || index} className="mb-3">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900 text-xs">{activity.title}</h3>
                          <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                            {activity.startDate} - {activity.endDate}
                          </span>
                        </div>
                        <p className="text-gray-700 text-xs">{activity.organization}</p>
                        <p className="text-xs text-gray-700">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References Section */}
              {sampleData.references.length > 0 && (
                <div>
                  <h2 className={`text-sm font-bold ${templateConfig.accentColor} mb-3 uppercase tracking-wide pb-1 border-b ${templateConfig.borderColor}`}>
                    References
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleData.references.map((ref: any, index: number) => (
                      <div key={ref.id || index} className={`${templateConfig.sectionBg} p-3 rounded border`}>
                        <h3 className="font-semibold text-gray-900 text-xs">{ref.name}</h3>
                        <p className="text-gray-700 text-xs">{ref.title}</p>
                        <p className="text-gray-600 text-xs">{ref.company}</p>
                        <p className="text-xs text-gray-600">{ref.email}</p>
                        <p className="text-xs text-gray-600">{ref.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewModal;
