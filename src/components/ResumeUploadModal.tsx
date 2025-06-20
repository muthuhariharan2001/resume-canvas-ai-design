
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AnalysisResult {
  atsScore: number;
  overallScore: number;
  sections: {
    formatting: number;
    keywords: number;
    experience: number;
    skills: number;
  };
  suggestions: string[];
  detectedSections: {
    hasContactInfo: boolean;
    hasSummary: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
  };
}

const ResumeUploadModal = ({ isOpen, onClose }: ResumeUploadModalProps) => {
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.type.includes('document')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploading(false);
          setAnalyzing(true);
          analyzeResume();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const analyzeResume = async () => {
    // Simulate AI analysis of uploaded resume
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        atsScore: Math.floor(Math.random() * 30) + 60, // 60-90
        overallScore: Math.floor(Math.random() * 25) + 70, // 70-95
        sections: {
          formatting: Math.floor(Math.random() * 20) + 75,
          keywords: Math.floor(Math.random() * 25) + 65,
          experience: Math.floor(Math.random() * 20) + 80,
          skills: Math.floor(Math.random() * 30) + 60,
        },
        suggestions: [
          "Add more quantifiable achievements with specific metrics",
          "Include relevant industry keywords for better ATS compatibility",
          "Improve formatting consistency throughout the document",
          "Add technical skills section with proficiency levels"
        ],
        detectedSections: {
          hasContactInfo: true,
          hasSummary: Math.random() > 0.3,
          hasExperience: true,
          hasEducation: Math.random() > 0.2,
          hasSkills: Math.random() > 0.4,
        }
      };

      setAnalysisResult(mockAnalysis);
      setAnalyzing(false);
    }, 3000);
  };

  const resetModal = () => {
    setUploading(false);
    setAnalyzing(false);
    setUploadProgress(0);
    setAnalysisResult(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-blue-600" />
            <span>Upload & Analyze Resume</span>
          </DialogTitle>
          <DialogDescription>
            Upload your current resume to get AI-powered analysis and ATS score
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!uploading && !analyzing && !analysisResult && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-gray-600 mb-6">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="w-full"
              />
            </div>
          )}

          {uploading && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Uploading Resume...</h3>
              <Progress value={uploadProgress} className="w-64 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyzing Resume...</h3>
              <p className="text-gray-600 mb-4">
                Our AI is analyzing your resume content, formatting, and ATS compatibility
              </p>
              <Progress value={66} className="w-64 mx-auto" />
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6">
              {/* Overall Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">ATS Score</span>
                    <div className="text-2xl font-bold text-blue-600">{analysisResult.atsScore}%</div>
                  </div>
                  <Progress value={analysisResult.atsScore} className="h-2" />
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Overall Score</span>
                    <div className="text-2xl font-bold text-green-600">{analysisResult.overallScore}%</div>
                  </div>
                  <Progress value={analysisResult.overallScore} className="h-2" />
                </div>
              </div>

              {/* Section Analysis */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Section Analysis</h3>
                <div className="space-y-3">
                  {Object.entries(analysisResult.sections).map(([section, score]) => (
                    <div key={section} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={score} className="w-20 h-2" />
                        <span className="text-sm font-medium">{score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Sections */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Detected Sections</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(analysisResult.detectedSections).map(([section, detected]) => (
                    <div key={section} className="flex items-center space-x-2">
                      {detected ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                      )}
                      <span className="text-sm capitalize">
                        {section.replace(/([A-Z])/g, ' $1').replace(/^has/, '').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
                <div className="space-y-2">
                  {analysisResult.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-yellow-800">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Improve My Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadModal;
