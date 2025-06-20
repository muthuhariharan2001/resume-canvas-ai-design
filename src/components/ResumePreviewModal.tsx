
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
        
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {resumeData.personalInfo?.firstName} {resumeData.personalInfo?.lastName}
              </h1>
              <div className="mt-2 space-y-1 text-gray-600">
                {resumeData.personalInfo?.email && <p>{resumeData.personalInfo.email}</p>}
                {resumeData.personalInfo?.phone && <p>{resumeData.personalInfo.phone}</p>}
                {resumeData.personalInfo?.location && <p>{resumeData.personalInfo.location}</p>}
                {resumeData.personalInfo?.website && <p>{resumeData.personalInfo.website}</p>}
              </div>
            </div>

            {/* Summary */}
            {resumeData.personalInfo?.summary && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Experience</h2>
                {resumeData.experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{exp.company} • {exp.location}</p>
                    <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {resumeData.projects?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Projects</h2>
                {resumeData.projects.map((proj: any, index: number) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900">{proj.title}</h3>
                      <span className="text-sm text-gray-500">{proj.startDate} - {proj.endDate}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{proj.technologies}</p>
                    <p className="text-gray-700 whitespace-pre-line">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
                {resumeData.education.map((edu: any, index: number) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school} • {edu.location}</p>
                    <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && <p className="text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill: string, index: number) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewModal;
