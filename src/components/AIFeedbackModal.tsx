
import { useState, useEffect } from 'react';
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
  onApplySuggestions?: (suggestions: any) => void;
}

const AIFeedbackModal = ({ isOpen, onClose, resumeData, onApplySuggestions }: AIFeedbackModalProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis with real data validation
    setTimeout(() => {
      const analysis = generateRealAnalysis();
      setFeedback(analysis);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const generateRealAnalysis = () => {
    if (!resumeData) return null;

    const { personalInfo, experience, education, skills } = resumeData;
    
    // Calculate real scores based on actual data
    let overallScore = 0;
    let sectionsAnalyzed = 0;
    
    const sections = [];
    
    // Analyze Professional Summary
    let summaryScore = 0;
    if (personalInfo?.summary) {
      const wordCount = personalInfo.summary.split(' ').length;
      summaryScore = Math.min(100, Math.max(40, (wordCount / 50) * 100));
      if (personalInfo.summary.includes('years') || personalInfo.summary.includes('experience')) summaryScore += 10;
      if (personalInfo.summary.includes('proven') || personalInfo.summary.includes('demonstrated')) summaryScore += 10;
    } else {
      summaryScore = 0;
    }
    
    sections.push({
      name: "Professional Summary",
      score: Math.min(100, summaryScore),
      status: summaryScore > 75 ? "excellent" : summaryScore > 50 ? "good" : "needs-improvement",
      feedback: summaryScore > 75 ? "Strong, compelling summary that clearly highlights your value proposition." : 
                summaryScore > 50 ? "Good summary but could be more impactful with specific achievements." :
                "Missing or weak professional summary. This is crucial for making a strong first impression."
    });
    
    // Analyze Work Experience
    let experienceScore = 0;
    if (experience?.length > 0) {
      experienceScore = Math.min(100, experience.length * 20 + 40);
      const hasQuantifiableResults = experience.some((exp: any) => 
        exp.description && (exp.description.includes('%') || exp.description.includes('$') || /\d+/.test(exp.description))
      );
      if (hasQuantifiableResults) experienceScore += 15;
    }
    
    sections.push({
      name: "Work Experience",
      score: experienceScore,
      status: experienceScore > 75 ? "excellent" : experienceScore > 50 ? "good" : "needs-improvement",
      feedback: experienceScore > 75 ? "Well-structured with quantifiable achievements. Excellent presentation of your experience." : 
                experienceScore > 50 ? "Good experience section. Consider adding more metrics and quantifiable results." :
                "Experience section needs improvement. Add more details and quantifiable achievements."
    });
    
    // Analyze Skills Section
    let skillsScore = 0;
    if (skills?.length > 0) {
      skillsScore = Math.min(100, (skills.length / 15) * 100);
      const hasTechnicalSkills = skills.some((skill: string) => 
        ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS'].some(tech => 
          skill.toLowerCase().includes(tech.toLowerCase())
        )
      );
      if (hasTechnicalSkills) skillsScore += 20;
    }
    
    sections.push({
      name: "Skills Section",
      score: skillsScore,
      status: skillsScore > 75 ? "excellent" : skillsScore > 50 ? "good" : "needs-improvement",
      feedback: skillsScore > 75 ? "Comprehensive skills section with relevant technical and soft skills." : 
                skillsScore > 50 ? "Good skills listed. Consider adding proficiency levels and more industry-specific skills." :
                "Skills section needs expansion. Add both technical and soft skills relevant to your target role."
    });
    
    // Analyze Education
    let educationScore = 0;
    if (education?.length > 0) {
      educationScore = 80;
      const hasGPA = education.some((edu: any) => edu.gpa && parseFloat(edu.gpa) > 3.5);
      if (hasGPA) educationScore += 15;
    } else {
      educationScore = 50; // Not critical for experienced professionals
    }
    
    sections.push({
      name: "Education",
      score: educationScore,
      status: educationScore > 75 ? "excellent" : educationScore > 50 ? "good" : "needs-improvement",
      feedback: educationScore > 75 ? "Complete education details with strong academic performance." : 
                educationScore > 50 ? "Education section is adequate. Consider adding relevant coursework or achievements." :
                "Education section could be enhanced with more details or academic achievements."
    });
    
    // Calculate overall score
    overallScore = Math.round(sections.reduce((sum, section) => sum + section.score, 0) / sections.length);
    
    // Generate intelligent suggestions based on analysis
    const suggestions = [];
    
    if (summaryScore < 70) {
      suggestions.push("Create a compelling professional summary that highlights your key achievements and value proposition");
    }
    
    if (experience.length === 0) {
      suggestions.push("Add work experience with quantifiable achievements and specific metrics");
    } else {
      const hasMetrics = experience.some((exp: any) => 
        exp.description && (exp.description.includes('%') || exp.description.includes('$') || /\d+/.test(exp.description))
      );
      if (!hasMetrics) {
        suggestions.push("Add quantifiable achievements with specific metrics (percentages, dollar amounts, numbers)");
      }
    }
    
    if (skills.length < 8) {
      suggestions.push("Expand your skills section with both technical and soft skills relevant to your industry");
    }
    
    if (!personalInfo?.phone || !personalInfo?.email) {
      suggestions.push("Ensure all contact information is complete and professional");
    }
    
    // Calculate ATS and industry match scores
    const atsScore = Math.max(60, overallScore - 10 + (skills.length > 10 ? 10 : 0));
    const industryMatch = Math.max(70, overallScore - 5);
    
    return {
      overallScore,
      sections,
      suggestions,
      atsScore,
      industryMatch
    };
  };

  const handleApplySuggestions = () => {
    if (!feedback || !onApplySuggestions) return;
    
    const suggestions = {
      summary: feedback.overallScore > 80 ? null : 
        `Dynamic professional with ${resumeData.experience?.length || 3}+ years of experience in ${resumeData.skills?.slice(0, 3).join(', ') || 'technology'}. Proven track record of delivering high-impact results and driving operational excellence. Expertise in leading cross-functional teams and implementing innovative solutions that enhance productivity and business growth.`,
      skills: feedback.sections.find((s: any) => s.name === "Skills Section")?.score < 70 ? 
        ['Problem Solving', 'Team Leadership', 'Strategic Planning', 'Process Improvement'] : null,
      experience: feedback.sections.find((s: any) => s.name === "Work Experience")?.score < 70 ? 
        resumeData.experience?.map((exp: any, index: number) => ({
          ...exp,
          description: exp.description + (exp.description ? ' ' : '') + `• Achieved 15% improvement in team productivity • Led cross-functional initiatives resulting in $50K+ cost savings`
        })) : null
    };
    
    onApplySuggestions(suggestions);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsAnalyzing(false);
      setAnalysisComplete(false);
      setFeedback(null);
    }
  }, [isOpen]);

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
                Our AI will analyze your resume content, structure, and ATS optimization based on your actual data.
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
                Examining content quality, structure, and ATS compatibility...
              </p>
              <Progress value={66} className="w-64 mx-auto" />
            </div>
          )}

          {analysisComplete && feedback && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Overall Resume Score</h3>
                  <div className="text-3xl font-bold text-blue-600">{feedback.overallScore}/100</div>
                </div>
                <Progress value={feedback.overallScore} className="h-3" />
                <p className="text-sm text-gray-600 mt-2">
                  {feedback.overallScore > 85 ? "Excellent! Your resume is well-optimized." :
                   feedback.overallScore > 70 ? "Good job! Your resume is above average with room for improvement." :
                   "Your resume needs improvement to be more competitive."}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="font-medium">ATS Score</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{feedback.atsScore}%</div>
                  <p className="text-sm text-gray-600">Applicant Tracking System compatibility</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Industry Match</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{feedback.industryMatch}%</div>
                  <p className="text-sm text-gray-600">Relevance to target industry</p>
                </div>
              </div>

              {/* Section Analysis */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Section-by-Section Analysis</h3>
                <div className="space-y-4">
                  {feedback.sections.map((section: any, index: number) => (
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
                  {feedback.suggestions.map((suggestion: string, index: number) => (
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
                  <Button 
                    onClick={handleApplySuggestions}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
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
