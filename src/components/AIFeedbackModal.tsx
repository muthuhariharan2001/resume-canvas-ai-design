
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CheckCircle, AlertTriangle, TrendingUp, X } from 'lucide-react';

interface AIFeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIFeedbackModal = ({ open, onOpenChange }: AIFeedbackModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const feedback = {
    score: 85,
    level: 'Good',
    improvements: [
      {
        type: 'critical',
        title: 'Add Quantified Achievements',
        description: 'Include specific numbers and metrics in your experience descriptions to showcase impact.',
        examples: ['Increased sales by 25%', 'Managed team of 8 developers', 'Reduced processing time by 40%']
      },
      {
        type: 'warning',
        title: 'Optimize for ATS',
        description: 'Use more industry-standard keywords to improve ATS compatibility.',
        examples: ['Add "agile methodology"', 'Include "cross-functional collaboration"', 'Mention specific technologies']
      },
      {
        type: 'suggestion',
        title: 'Enhance Skills Section',
        description: 'Consider organizing skills by category and adding proficiency levels.',
        examples: ['Technical Skills', 'Soft Skills', 'Languages', 'Certifications']
      }
    ],
    strengths: [
      'Clear professional summary that highlights key expertise',
      'Consistent formatting and professional appearance',
      'Relevant work experience with good progression',
      'Appropriate length for experience level'
    ]
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'suggestion':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'suggestion':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span>AI Resume Analysis</span>
          </DialogTitle>
          <DialogDescription>
            Comprehensive analysis and suggestions to improve your resume
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-6 h-full">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-200 pr-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('improvements')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'improvements'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Improvements
              </button>
              <button
                onClick={() => setActiveTab('strengths')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'strengths'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Strengths
              </button>
              <button
                onClick={() => setActiveTab('ats')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'ats'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                ATS Score
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-blue-600">{feedback.score}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Resume Score: {feedback.level}</h3>
                  <p className="text-gray-600 mt-2">Your resume shows good potential with room for improvement</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{feedback.improvements.filter(i => i.type === 'critical').length}</div>
                      <div className="text-sm text-gray-600">Critical Issues</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">{feedback.improvements.filter(i => i.type === 'warning').length}</div>
                      <div className="text-sm text-gray-600">Warnings</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{feedback.strengths.length}</div>
                      <div className="text-sm text-gray-600">Strengths</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Quick Wins</h4>
                    <ul className="space-y-2">
                      {feedback.improvements.slice(0, 3).map((improvement, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>{improvement.title}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'improvements' && (
              <div className="space-y-4">
                {feedback.improvements.map((improvement, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        {getIconForType(improvement.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{improvement.title}</h4>
                            <Badge variant={getBadgeVariant(improvement.type)} className="text-xs">
                              {improvement.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{improvement.description}</p>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Examples:</h5>
                            <ul className="space-y-1">
                              {improvement.examples.map((example, exIndex) => (
                                <li key={exIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'strengths' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">What You're Doing Right</h3>
                {feedback.strengths.map((strength, index) => (
                    <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-gray-700">{strength}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'ats' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ATS Compatibility Score</h3>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <span className="text-xl font-bold text-green-600">92%</span>
                  </div>
                  <p className="text-gray-600">Your resume is well-optimized for Applicant Tracking Systems</p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Keyword Optimization</span>
                        <span className="text-sm text-green-600">Good</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Format Compatibility</span>
                        <span className="text-sm text-green-600">Excellent</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Section Headers</span>
                        <span className="text-sm text-green-600">Perfect</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Apply Suggestions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIFeedbackModal;
