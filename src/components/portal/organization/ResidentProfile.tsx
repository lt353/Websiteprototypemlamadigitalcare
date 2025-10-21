import { useState } from 'react';
import { ArrowLeft, User, Calendar, CheckCircle2, Clock, TrendingUp, Phone, Mail, FileText, Award } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { toast } from 'sonner';

interface ResidentProfileProps {
  residentName?: string;
  onBack: () => void;
}

export function ResidentProfile({ residentName = 'Mary Johnson', onBack }: ResidentProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const residentData = {
    name: residentName,
    room: '204',
    joinedDate: 'August 2025',
    email: 'mary.johnson@email.com',
    phone: '(808) 555-0123',
    emergencyContact: 'Sarah Miller (Daughter)',
    emergencyPhone: '(808) 555-9876',
    status: 'active',
    plan: 'Included in facility subscription',
    sessionsCompleted: 8,
    skillsMastered: 15,
    currentStreak: 4,
    lastSession: 'November 20, 2025',
    nextSession: {
      date: 'December 5, 2025',
      time: '2:00 PM',
      topic: 'Email & Calendar Basics',
      type: 'Group Workshop'
    }
  };

  const progressStats = [
    { label: 'Sessions Completed', value: residentData.sessionsCompleted, total: 12, color: '#2D9596' },
    { label: 'Skills Mastered', value: residentData.skillsMastered, total: 20, color: '#16A34A' },
    { label: 'Current Streak', value: `${residentData.currentStreak} weeks`, icon: '🔥' }
  ];

  const skillsProgress = [
    { skill: 'Email Basics', progress: 100, status: 'completed' },
    { skill: 'Video Calling', progress: 100, status: 'completed' },
    { skill: 'Photo Management', progress: 100, status: 'completed' },
    { skill: 'Password Security', progress: 75, status: 'in-progress' },
    { skill: 'Calendar Management', progress: 50, status: 'in-progress' },
    { skill: 'Social Media Safety', progress: 0, status: 'not-started' }
  ];

  const sessionHistory = [
    {
      id: 1,
      date: 'November 20, 2025',
      topic: 'Scam Prevention Workshop',
      type: 'Group Workshop',
      duration: '90 minutes',
      instructor: 'Tea Araki',
      status: 'completed',
      attendance: 'present',
      rating: 5,
      notes: 'Very engaged! Asked excellent questions about identifying phishing emails.'
    },
    {
      id: 2,
      date: 'November 6, 2025',
      topic: 'iPhone Basics',
      type: 'Paid Class',
      duration: '45 minutes',
      instructor: 'Lindsay Trenton',
      status: 'completed',
      attendance: 'present',
      rating: 5,
      notes: 'Mastered taking and sharing photos with family members.'
    },
    {
      id: 3,
      date: 'October 15, 2025',
      topic: 'Video Calling Setup',
      type: 'One-on-One',
      duration: '60 minutes',
      instructor: 'Tea Araki',
      status: 'completed',
      attendance: 'present',
      rating: 5,
      notes: 'Successfully FaceTimed her daughter by the end of session!'
    },
    {
      id: 4,
      date: 'December 5, 2025',
      topic: 'Email & Calendar Basics',
      type: 'Group Workshop',
      duration: '90 minutes',
      instructor: 'Tea Araki',
      status: 'scheduled',
      attendance: 'registered'
    }
  ];

  const achievements = [
    { title: 'First Video Call', icon: '📹', date: 'Oct 15, 2025' },
    { title: 'Email Master', icon: '📧', date: 'Oct 22, 2025' },
    { title: 'Scam Spotter', icon: '🛡️', date: 'Nov 20, 2025' },
    { title: '4 Week Streak', icon: '🔥', date: 'Nov 24, 2025' }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Resident Progress
        </button>

        {/* Header */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center flex-shrink-0 text-[28px] sm:text-[36px]"
              style={{ background: '#E6F7F4', color: '#2D9596' }}
            >
              {residentData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h1 className="text-[28px] sm:text-[36px] font-bold" style={{ color: '#265073' }}>
                  {residentData.name}
                </h1>
                <Badge className="w-fit" style={{ background: '#D1FAE5', color: '#065F46' }}>Active</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[16px]" style={{ color: '#6B7280' }}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Room {residentData.room}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {residentData.joinedDate}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 text-[16px]"
              onClick={() => {
                const subject = encodeURIComponent(`Message to ${residentData.name}`);
                window.location.href = `mailto:${residentData.email}?subject=${subject}`;
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Resident
            </Button>
            <Button
              className="w-full sm:w-auto h-12 text-[16px]"
              onClick={() => window.location.href = `tel:${residentData.phone}`}
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {progressStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>{stat.label}</p>
                  {stat.icon && <span className="text-[24px]">{stat.icon}</span>}
                </div>
                {stat.total ? (
                  <>
                    <p className="text-[32px] font-bold mb-2" style={{ color: stat.color }}>
                      {stat.value}/{stat.total}
                    </p>
                    <Progress value={(stat.value / stat.total) * 100} className="h-2" />
                  </>
                ) : (
                  <p className="text-[32px] font-bold" style={{ color: '#F59E0B' }}>
                    {stat.value}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 w-full flex-wrap h-auto gap-2">
            <TabsTrigger value="overview" className="text-[14px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[120px]">Overview</TabsTrigger>
            <TabsTrigger value="sessions" className="text-[14px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[140px]">Session History</TabsTrigger>
            <TabsTrigger value="progress" className="text-[14px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[140px]">Skills Progress</TabsTrigger>
            <TabsTrigger value="contact" className="text-[14px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[120px]">Contact Info</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Next Session */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6" style={{ color: '#2D9596' }} />
                    <CardTitle className="text-[24px]">Next Session</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Topic</p>
                    <p className="text-[20px] font-bold" style={{ color: '#265073' }}>
                      {residentData.nextSession.topic}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-[16px]" style={{ color: '#6B7280' }}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {residentData.nextSession.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {residentData.nextSession.time}
                    </div>
                  </div>
                  <Badge variant="outline">{residentData.nextSession.type}</Badge>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6" style={{ color: '#16A34A' }} />
                    <CardTitle className="text-[24px]">Recent Activity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                    <span className="text-[16px]">Completed Scam Prevention Workshop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                    <span className="text-[16px]">Earned "Scam Spotter" badge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                    <span className="text-[16px]">Reached 4-week learning streak</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-6 h-6" style={{ color: '#F59E0B' }} />
                  <CardTitle className="text-[24px]">Achievements</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg text-center"
                      style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}
                    >
                      <div className="text-[48px] mb-2">{achievement.icon}</div>
                      <p className="font-bold text-[16px] mb-1" style={{ color: '#92400E' }}>
                        {achievement.title}
                      </p>
                      <p className="text-[12px]" style={{ color: '#92400E' }}>{achievement.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-6 h-6" style={{ color: '#2D9596' }} />
                  <CardTitle className="text-[24px]">Latest Instructor Notes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg" style={{ background: '#E6F7F4' }}>
                  <p className="text-[16px]" style={{ color: '#4B5563' }}>
                    "{sessionHistory[0].notes}"
                  </p>
                  <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                    — {sessionHistory[0].instructor}, {sessionHistory[0].date}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SESSIONS TAB */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                All Sessions
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  toast.success('Exporting session history to PDF...', {
                    description: 'PDF will open in a new window'
                  });
                  window.open('about:blank', '_blank');
                }}
              >
                Export Report
              </Button>
            </div>

            <div className="space-y-4">
              {sessionHistory.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            style={{
                              background: session.status === 'scheduled' ? '#E0F2FE' : '#D1FAE5',
                              color: session.status === 'scheduled' ? '#0284C7' : '#065F46'
                            }}
                          >
                            {session.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                          </Badge>
                          <span className="text-[18px] font-bold" style={{ color: '#265073' }}>
                            {session.date}
                          </span>
                        </div>
                        <p className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                          {session.topic}
                        </p>
                        <div className="flex items-center gap-4 text-[14px]" style={{ color: '#6B7280' }}>
                          <span>{session.type}</span>
                          <span>•</span>
                          <span>{session.duration}</span>
                          <span>•</span>
                          <span>Instructor: {session.instructor}</span>
                        </div>
                        {session.rating && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[14px]" style={{ color: '#6B7280' }}>Rating:</span>
                            <div className="flex">
                              {'⭐'.repeat(session.rating)}
                            </div>
                          </div>
                        )}
                        {session.notes && (
                          <div className="mt-3 p-3 rounded-lg" style={{ background: '#F9FAFB' }}>
                            <p className="text-[14px]" style={{ color: '#4B5563' }}>
                              <strong>Notes:</strong> {session.notes}
                            </p>
                          </div>
                        )}
                      </div>
                      {session.status === 'completed' && (
                        <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>
                          ✓ Present
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PROGRESS TAB */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Skills Mastery Progress</CardTitle>
                <CardDescription className="text-[16px]">
                  Track {residentData.name}'s learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillsProgress.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[18px] font-semibold" style={{ color: '#265073' }}>
                          {item.skill}
                        </span>
                        {item.status === 'completed' && (
                          <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                        )}
                        {item.status === 'in-progress' && (
                          <Clock className="w-5 h-5" style={{ color: '#F59E0B' }} />
                        )}
                      </div>
                      <span className="text-[16px] font-semibold" style={{ color: '#6B7280' }}>
                        {item.progress}%
                      </span>
                    </div>
                    <Progress value={item.progress} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Learning Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg" style={{ background: '#E6F7F4', border: '1px solid #9AD0C2' }}>
                    <p className="font-bold text-[16px] mb-1" style={{ color: '#265073' }}>
                      ✓ Ready for: Two-Factor Authentication
                    </p>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>
                      Based on password security progress, {residentData.name} is ready to learn about 2FA.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
                    <p className="font-bold text-[16px] mb-1" style={{ color: '#92400E' }}>
                      Continue practicing: Calendar Management
                    </p>
                    <p className="text-[14px]" style={{ color: '#92400E' }}>
                      Recommend another session to build confidence before moving to next skill.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTACT TAB */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Resident Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: '#2D9596' }} />
                    <div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Phone</p>
                      <a
                        href={`tel:${residentData.phone}`}
                        className="text-[18px] font-semibold hover:underline"
                        style={{ color: '#265073' }}
                      >
                        {residentData.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" style={{ color: '#2D9596' }} />
                    <div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Email</p>
                      <a
                        href={`mailto:${residentData.email}`}
                        className="text-[18px] font-semibold hover:underline"
                        style={{ color: '#265073' }}
                      >
                        {residentData.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" style={{ color: '#2D9596' }} />
                    <div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Room Number</p>
                      <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>
                        {residentData.room}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" style={{ color: '#2D9596' }} />
                    <div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Contact Name</p>
                      <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>
                        {residentData.emergencyContact}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: '#2D9596' }} />
                    <div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Phone</p>
                      <a
                        href={`tel:${residentData.emergencyPhone}`}
                        className="text-[18px] font-semibold hover:underline"
                        style={{ color: '#265073' }}
                      >
                        {residentData.emergencyPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Subscription Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>
                  <strong>Plan:</strong> {residentData.plan}
                </p>
                <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                  Enrolled since {residentData.joinedDate}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
