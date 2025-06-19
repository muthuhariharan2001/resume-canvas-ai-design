
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  FileText,
  Award,
  Target,
  Lightbulb
} from 'lucide-react';

interface AIFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData?: any;
}

const AIFeedbackModal = ({ isOpen, onClose, resumeData }: AIFeedbackModalProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const mockFeedback = {
    overallScore: 85,
    sections: [
      {
        name: "Professional Summary",
        score: 90,
        status: "excellent",
        feedback: "Strong, compelling summary that clearly highlights your value proposition."
      },
      {
        name: "Work Experience",
        score: 88,
        status: "good",
        feedback: "Well-structured with quantifiable achievements. Consider adding more metrics."
      },
      {
        name: "Skills Section",
        score: 75,
        status: "needs-improvement",
        feedback: "Good technical skills listed. Add soft skills and proficiency levels."
      },
      {
        name: "Education",
        score: 82,
        status: "good",
        feedback: "Complete education details. Consider adding relevant coursework."
      }
    ],
    suggestions: [
      "Add more quantifiable achievements with specific metrics",
      "Include relevant keywords for your target industry",
      "Consider adding a projects section to showcase your work",
      "Optimize formatting for ATS compatibility"
    ],
    atsScore: 78,
    industryMatch: 85
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span>AI Resume Analysis</span>
          </DialogTitle>
          <DialogDescription>
            Get instant feedback and suggestions to improve your resume
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!analysisComplete && !isAnalyzing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ready to Analyze Your Resume</h3>
              <p className="text-gray-600 mb-6">
                Our AI will analyze your resume and provide detailed feedback on content, structure, and ATS optimization.
              </p>
              <Button 
                onClick={handleAnalyze}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start AI Analysis
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Sparkles className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyzing Your Resume...</h3>
              <p className="text-gray-600 mb-4">
                Please wait while our AI examines your resume content and structure.
              </p>
              <Progress value={66} className="w-64 mx-auto" />
            </div>
          )}

          {analysisComplete && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Overall Resume Score</h3>
                  <div className="text-3xl font-bold text-blue-600">{mockFeedback.overallScore}/100</div>
                </div>
                <Progress value={mockFeedback.overallScore} className="h-3" />
                <p className="text-sm text-gray-600 mt-2">
                  Great job! Your resume is above average with room for improvement.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="font-medium">ATS Score</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{mockFeedback.atsScore}%</div>
                  <p className="text-sm text-gray-600">Applicant Tracking System compatibility</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Industry Match</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{mockFeedback.industryMatch}%</div>
                  <p className="text-sm text-gray-600">Relevance to target industry</p>
                </div>
              </div>

              {/* Section Analysis */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Section-by-Section Analysis</h3>
                <div className="space-y-4">
                  {mockFeedback.sections.map((section, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{section.name}</span>
                          {section.status === 'excellent' && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {section.status === 'good' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                          {section.status === 'needs-improvement' && <AlertCircle className="w-4 h-4 text-orange-600" />}
                        </div>
                        <Badge 
                          variant={section.status === 'excellent' ? 'default' : section.status === 'good' ? 'secondary' : 'outline'}
                          className={
                            section.status === 'excellent' ? 'bg-green-100 text-green-800' :
                            section.status === 'good' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }
                        >
                          {section.score}/100
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{section.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span>AI Suggestions</span>
                </h3>
                <div className="space-y-3">
                  {mockFeedback.suggestions.map((suggestion, index) => (
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
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    <Award className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Apply Suggestions
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIFeedbackModal;
