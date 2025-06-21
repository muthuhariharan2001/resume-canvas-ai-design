import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: any;
  onDownload: () => void;
}

const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onDownload
}) => {
  // Static sample data for preview when user data is empty
  const getSampleData = () => ({
    personalInfo: {
      firstName: resumeData?.personalInfo?.firstName || 'John',
      lastName: resumeData?.personalInfo?.lastName || 'Doe',
      email: resumeData?.personalInfo?.email || 'john.doe@email.com',
      phone: resumeData?.personalInfo?.phone || '+1 (555) 123-4567',
      location: resumeData?.personalInfo?.location || 'New York, NY',
      website: resumeData?.personalInfo?.website || 'linkedin.com/in/johndoe',
      summary: resumeData?.personalInfo?.summary || 'Results-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams. Expertise in React, Node.js, and cloud technologies with a passion for creating efficient solutions that drive business growth.'
    },
    experience: resumeData?.experience?.length > 0 ? resumeData.experience : [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        location: 'San Francisco, CA',
        startDate: '2020-01',
        endDate: 'Present',
        description: '• Led development of microservices architecture serving 100K+ users\n• Reduced system response time by 40% through database optimization\n• Mentored 5 junior developers and established code review processes\n• Implemented CI/CD pipelines reducing deployment time by 60%'
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Austin, TX',
        startDate: '2018-06',
        endDate: '2019-12',
        description: '• Built responsive web applications using React and Node.js\n• Collaborated with design team to implement pixel-perfect UI components\n• Integrated third-party APIs and payment processing systems\n• Achieved 98% uptime for production applications'
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
        description: '• Developed full-stack e-commerce platform with React and Express.js\n• Implemented secure payment processing and inventory management\n• Deployed on AWS with auto-scaling capabilities',
        technologies: 'React, Node.js, MongoDB, AWS',
        startDate: '2023-01',
        endDate: '2023-06'
      }
    ],
    skills: resumeData?.skills?.length > 0 ? resumeData.skills : [
      'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'Agile'
    ]
  });

  const sampleData = getSampleData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Resume Preview</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={onDownload} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        {/* Enhanced Professional Resume Layout */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div 
            id="resume-content" 
            className="p-6 space-y-4 max-w-[8.5in] mx-auto print-friendly" 
            style={{ 
              fontSize: '11px', 
              lineHeight: '1.4',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            
            {/* Header Section - Fixed spacing */}
            <div className="text-center pb-4 mb-4" style={{ borderBottom: '2px solid #374151' }}>
              <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ marginBottom: '8px' }}>
                {sampleData.personalInfo.firstName} {sampleData.personalInfo.lastName}
              </h1>
              <div className="flex justify-center items-center space-x-3 text-sm text-gray-600 flex-wrap">
                <span>{sampleData.personalInfo.email}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.phone}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.location}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.website}</span>
              </div>
            </div>

            {/* Professional Summary - Fixed underline spacing */}
            <div className="mb-4">
              <h2 
                className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1" 
                style={{ 
                  borderBottom: '1px solid #d1d5db',
                  marginBottom: '12px',
                  paddingBottom: '4px'
                }}
              >
                Professional Summary
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed" style={{ lineHeight: '1.5' }}>
                {sampleData.personalInfo.summary}
              </p>
            </div>

            {/* Experience Section - Fixed formatting */}
            <div className="mb-4">
              <h2 
                className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1" 
                style={{ 
                  borderBottom: '1px solid #d1d5db',
                  marginBottom: '12px',
                  paddingBottom: '4px'
                }}
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {sampleData.experience.slice(0, 2).map((exp: any, index: number) => (
                  <div key={exp.id || index} className="mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                        <p className="text-gray-700 text-xs">{exp.company} • {exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700" style={{ lineHeight: '1.4' }}>
                      {exp.description.split('\n').map((line: string, i: number) => (
                        <div key={i} className="mb-1">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section - Enhanced */}
            {sampleData.projects.length > 0 && (
              <div className="mb-4">
                <h2 
                  className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1" 
                  style={{ 
                    borderBottom: '1px solid #d1d5db',
                    marginBottom: '12px',
                    paddingBottom: '4px'
                  }}
                >
                  Key Projects
                </h2>
                <div className="space-y-3">
                  {sampleData.projects.slice(0, 2).map((proj: any, index: number) => (
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
                      <div className="text-xs text-gray-700" style={{ lineHeight: '1.4' }}>
                        {proj.description.split('\n').map((line: string, i: number) => (
                          <div key={i} className="mb-1">{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Two-column layout for Education and Skills - Improved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education Section */}
              <div>
                <h2 
                  className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1" 
                  style={{ 
                    borderBottom: '1px solid #d1d5db',
                    marginBottom: '12px',
                    paddingBottom: '4px'
                  }}
                >
                  Education
                </h2>
                <div className="space-y-3">
                  {sampleData.education.slice(0, 2).map((edu: any, index: number) => (
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

              {/* Skills Section - Better formatting */}
              <div>
                <h2 
                  className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1" 
                  style={{ 
                    borderBottom: '1px solid #d1d5db',
                    marginBottom: '12px',
                    paddingBottom: '4px'
                  }}
                >
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {sampleData.skills.slice(0, 12).map((skill: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border"
                      style={{ 
                        fontSize: '10px',
                        padding: '3px 6px',
                        marginBottom: '3px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add print-specific styles - Fixed */}
        <style>
          {`
            @media print {
              .print-friendly {
                font-size: 10px !important;
                line-height: 1.3 !important;
              }
              .print-friendly h1 {
                font-size: 18px !important;
                margin-bottom: 6px !important;
              }
              .print-friendly h2 {
                font-size: 12px !important;
                margin-bottom: 8px !important;
                border-bottom: 1px solid #000 !important;
                padding-bottom: 2px !important;
              }
              .print-friendly h3 {
                font-size: 11px !important;
              }
            }
          `}
        </style>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewModal;
