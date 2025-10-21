import { ArrowLeft, Calendar, Clock, CheckCircle2, Star, FileText, Download, Play, MessageSquare } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { toast } from 'sonner';

interface SessionSummaryProps {
  seniorName: string;
  onBack: () => void;
  onWatchRecording?: () => void;
  onDownloadGuide?: () => void;
}

export function SessionSummary({ seniorName, onBack, onWatchRecording, onDownloadGuide }: SessionSummaryProps) {
  const sessionData = {
    date: 'November 15, 2025',
    time: '2:00 PM - 3:30 PM',
    duration: '90 minutes',
    type: 'In-Home Visit',
    instructor: 'Tea Araki',
    rating: 5,
    coverage: 'included', // This was part of the plan
    topics: [
      {
        title: 'Password Management',
        completed: true,
        confidence: 90,
        notes: `${seniorName} did excellent work setting up her password manager! She successfully:\n• Installed 1Password on her iPhone\n• Created a strong master password (she chose a meaningful Hawaiian phrase)\n• Saved 8 important passwords\n• Practiced auto-filling passwords in Safari\n\nShe was hesitant at first but by the end was excited about not having to remember so many passwords!`
      },
      {
        title: 'Account Security',
        completed: true,
        confidence: 75,
        notes: `We covered the basics of keeping accounts safe:\n• Recognizing phishing emails (she spotted 3 out of 4!)\n• Checking for "https" in website URLs\n• Understanding what information is safe to share\n• When to call for help\n\n${seniorName} asked great questions about email scams. Recommend following up on this topic.`
      }
    ],
    achievements: [
      'Set up password manager successfully',
      'Saved 8 passwords without assistance',
      'Identified phishing email warning signs',
      'Asked thoughtful security questions'
    ],
    homework: [
      {
        task: 'Add 3 more passwords to your password manager this week',
        priority: 'Easy',
        completed: false
      },
      {
        task: 'Practice logging into email using password manager',
        priority: 'Easy',
        completed: false
      },
      {
        task: 'Call if you receive any suspicious emails',
        priority: 'Important',
        completed: false
      }
    ],
    nextSteps: [
      'Next session: Two-Factor Authentication (Dec 1)',
      'Will build on password manager foundation',
      'Bring any suspicious emails to discuss'
    ],
    instructorNotes: {
      overall: `${seniorName} was a wonderful student today! She came prepared with questions and was eager to learn. Her initial hesitation about technology quickly turned to confidence once she realized the password manager would make her life easier, not harder.\n\nWhat impressed me most: She took handwritten notes throughout the session and asked to practice each step multiple times until she felt comfortable. This shows great dedication to learning!`,
      concerns: 'None - progressing well',
      strengths: 'Excellent note-taking, asks clarifying questions, patient with herself when learning',
      recommendations: 'Ready to move on to 2FA. Would benefit from periodic check-ins on password manager usage.'
    },
    hasRecording: true,
    hasGuide: true
  };

  const handleDownload = () => {
    if (onDownloadGuide) {
      onDownloadGuide();
    } else {
      toast.success('✓ Downloading session guide...');
    }
  };

  const handleWatchVideo = () => {
    if (onWatchRecording) {
      onWatchRecording();
    } else {
      toast.info('Video player opening...');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Sessions
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>Completed</Badge>
            {sessionData.coverage === 'included' ? (
              <Badge style={{ background: '#DBEAFE', color: '#1E40AF' }}>
                PLAN SESSION
              </Badge>
            ) : (
              <Badge style={{ background: '#FEF3C7', color: '#92400E' }}>
                ADD-ON {sessionData.type === 'In-Home Visit' ? '$72.25' : '$29.75'}
              </Badge>
            )}
            <h1 className="text-[36px] font-bold" style={{ color: '#265073' }}>
              Session Summary
            </h1>
          </div>
          <div className="flex items-center gap-6 text-[16px]" style={{ color: '#6B7280' }}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{sessionData.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{sessionData.time}</span>
            </div>
          </div>
        </div>

        {/* Overall Performance */}
        <Card className="mb-6" style={{ background: '#E6F7F4', borderColor: '#9AD0C2' }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2D9596' }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: '#FFFFFF' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-[24px] font-bold mb-2" style={{ color: '#265073' }}>
                  Excellent Session!
                </h3>
                <p className="text-[18px] mb-3" style={{ color: '#4B5563' }}>
                  {seniorName} completed all session goals and is ready for the next topic
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>Session Rating:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5"
                        style={{ color: '#F59E0B', fill: i < sessionData.rating ? '#F59E0B' : 'none' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {(sessionData.hasRecording || sessionData.hasGuide) && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {sessionData.hasRecording && (
              <Button
                onClick={handleWatchVideo}
                className="h-16 text-[18px]"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Session Recording
              </Button>
            )}
            {sessionData.hasGuide && (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="h-16 text-[18px]"
                style={{ borderColor: '#2D9596', color: '#2D9596' }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Practice Guide
              </Button>
            )}
          </div>
        )}

        {/* Topics Covered */}
        <div className="mb-6">
          <h2 className="text-[28px] font-bold mb-4" style={{ color: '#265073' }}>
            Topics Covered
          </h2>
          
          <div className="space-y-4">
            {sessionData.topics.map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-[22px]">{topic.title}</CardTitle>
                    <CheckCircle2 className="w-6 h-6" style={{ color: '#16A34A' }} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px]" style={{ color: '#6B7280' }}>
                        Confidence Level: {topic.confidence}%
                      </span>
                    </div>
                    <Progress value={topic.confidence} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                    <div className="flex items-start gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#2D9596' }} />
                      <p className="font-bold text-[16px]" style={{ color: '#265073' }}>
                        Instructor Notes from Tea:
                      </p>
                    </div>
                    <p className="text-[16px] whitespace-pre-line" style={{ color: '#4B5563' }}>
                      {topic.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">🎉 Achievements Unlocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {sessionData.achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: '#D1FAE5' }}
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#16A34A' }} />
                  <span className="text-[16px]" style={{ color: '#065F46' }}>{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Practice Homework */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Practice Before Next Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessionData.homework.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg border-2"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <input type="checkbox" className="w-5 h-5 mt-1" />
                  <div className="flex-1">
                    <p className="text-[18px] font-bold" style={{ color: '#265073' }}>{item.task}</p>
                    <Badge 
                      className="mt-2"
                      style={{ 
                        background: item.priority === 'Important' ? '#FEF3C7' : '#E0F2FE',
                        color: item.priority === 'Important' ? '#92400E' : '#075985'
                      }}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {sessionData.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                  <span className="text-[#2D9596] font-bold">→</span>
                  {step}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Instructor's Overall Notes */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" style={{ color: '#2D9596' }} />
              <CardTitle className="text-[24px]">Instructor's Overall Notes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-bold text-[16px] mb-2" style={{ color: '#265073' }}>Overall Assessment:</p>
              <p className="text-[16px] whitespace-pre-line" style={{ color: '#4B5563' }}>
                {sessionData.instructorNotes.overall}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg" style={{ background: '#D1FAE5' }}>
                <p className="font-bold text-[16px] mb-2" style={{ color: '#065F46' }}>Strengths:</p>
                <p className="text-[14px]" style={{ color: '#065F46' }}>
                  {sessionData.instructorNotes.strengths}
                </p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ background: '#E0F2FE' }}>
                <p className="font-bold text-[16px] mb-2" style={{ color: '#075985' }}>Recommendations:</p>
                <p className="text-[14px]" style={{ color: '#075985' }}>
                  {sessionData.instructorNotes.recommendations}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button
          onClick={onBack}
          className="w-full h-16 text-[18px] font-bold"
          style={{ background: '#2D9596', color: '#FFFFFF' }}
        >
          Back to Session History
        </Button>
      </div>
    </div>
  );
}
