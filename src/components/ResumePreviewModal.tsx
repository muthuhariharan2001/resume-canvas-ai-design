
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
        
        {/* Professional Resume Layout - Single Page Optimized */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div id="resume-content" className="p-6 space-y-4 max-w-[8.5in] mx-auto" style={{ fontSize: '11px', lineHeight: '1.3' }}>
            
            {/* Header Section */}
            <div className="text-center border-b-2 border-gray-300 pb-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {sampleData.personalInfo.firstName} {sampleData.personalInfo.lastName}
              </h1>
              <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 flex-wrap">
                <span>{sampleData.personalInfo.email}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.phone}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.location}</span>
                <span>•</span>
                <span>{sampleData.personalInfo.website}</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed">
                {sampleData.personalInfo.summary}
              </p>
            </div>

            {/* Experience Section */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-3">
                {sampleData.experience.slice(0, 2).map((exp: any, index: number) => (
                  <div key={exp.id || index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                        <p className="text-gray-700 text-xs">{exp.company} • {exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700 ml-0">
                      {exp.description.split('\n').map((line: string, i: number) => (
                        <div key={i} className="mb-0.5">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            {sampleData.projects.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">
                  Key Projects
                </h2>
                <div className="space-y-2">
                  {sampleData.projects.slice(0, 2).map((proj: any, index: number) => (
                    <div key={proj.id || index}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900 text-xs">{proj.title}</h3>
                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          {proj.startDate} - {proj.endDate}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1"><strong>Technologies:</strong> {proj.technologies}</p>
                      <div className="text-xs text-gray-700">
                        {proj.description.split('\n').map((line: string, i: number) => (
                          <div key={i} className="mb-0.5">{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Two-column layout for Education and Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Education Section */}
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">
                  Education
                </h2>
                <div className="space-y-2">
                  {sampleData.education.slice(0, 2).map((edu: any, index: number) => (
                    <div key={edu.id || index}>
                      <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
                      <p className="text-gray-700 text-xs">{edu.school}</p>
                      <p className="text-gray-600 text-xs">{edu.location}</p>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{edu.startDate} - {edu.endDate}</span>
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                  {sampleData.skills.slice(0, 12).map((skill: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewModal;
