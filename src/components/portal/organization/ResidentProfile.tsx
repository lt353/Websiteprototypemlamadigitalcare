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

// Helper function to get resident data based on name
function getResidentData(name: string) {
  const residentProfiles: Record<string, any> = {
    'Margaret Liu': {
      room: '204', joinedDate: 'June 2025', email: 'margaret.liu@email.com', phone: '(808) 555-0201',
      emergencyContact: 'David Liu (Son)', emergencyPhone: '(808) 555-0202',
      plan: 'Basic ($39/mo)', sessionsCompleted: 6, skillsMastered: 12, currentStreak: 3,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 75, status: 'in-progress' },
        { skill: 'Photo Management', progress: 50, status: 'in-progress' }
      ],
      sessionHistory: [
        { id: 1, date: 'November 20, 2025', topic: 'Scam Prevention Workshop', type: 'Group Workshop', duration: '90 minutes', instructor: 'Tea Araki', status: 'completed', attendance: 'present', rating: 5, notes: 'Excellent participant! Shared personal experience with phone scam attempt and helped others identify warning signs.' },
        { id: 2, date: 'November 6, 2025', topic: 'Email Safety', type: 'One-on-One', duration: '45 minutes', instructor: 'Lindsay Trenton', status: 'completed', attendance: 'present', rating: 5, notes: 'Quick learner. Now confidently identifies spam emails and knows how to report them.' },
        { id: 3, date: 'December 5, 2025', topic: 'Email & Calendar Basics', type: 'Group Workshop', duration: '90 minutes', instructor: 'Tea Araki', status: 'scheduled', attendance: 'registered' }
      ]
    },
    'Robert Kim': {
      room: '312', joinedDate: 'March 2025', email: 'robert.kim@email.com', phone: '(808) 555-0301',
      emergencyContact: 'Jennifer Kim (Daughter)', emergencyPhone: '(808) 555-0302',
      plan: 'Premium ($149/mo)', sessionsCompleted: 8, skillsMastered: 15, currentStreak: 5,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Calendar Management', progress: 80, status: 'in-progress' }
      ],
      sessionHistory: [
        { id: 1, date: 'November 20, 2025', topic: 'Scam Prevention Workshop', type: 'Group Workshop', duration: '90 minutes', instructor: 'Tea Araki', status: 'completed', attendance: 'present', rating: 5, notes: 'Very tech-savvy! Already uses two-factor authentication and helped demonstrate best practices to the group.' },
        { id: 2, date: 'November 12, 2025', topic: 'Calendar Management', type: 'One-on-One', duration: '60 minutes', instructor: 'Tea Araki', status: 'completed', attendance: 'present', rating: 5, notes: 'Setting up shared calendars with family. Excited to coordinate schedules more easily.' },
        { id: 3, date: 'October 28, 2025', topic: 'Video Calling Mastery', type: 'One-on-One', duration: '45 minutes', instructor: 'Lindsay Trenton', status: 'completed', attendance: 'present', rating: 5, notes: 'Now uses FaceTime, Zoom, and Google Meet confidently. Regular video calls with grandchildren!' }
      ]
    },
    'Helen Martinez': {
      room: '108', joinedDate: 'July 2025', email: 'helen.martinez@email.com', phone: '(808) 555-0108',
      emergencyContact: 'Carlos Martinez (Son)', emergencyPhone: '(808) 555-0109',
      plan: 'Workshop Only', sessionsCompleted: 5, skillsMastered: 9, currentStreak: 2,
      lastSession: 'Nov 20', skills: [
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 60, status: 'in-progress' }
      ]
    },
    'Dorothy Santos': {
      room: '215', joinedDate: 'October 2025', email: 'dorothy.santos@email.com', phone: '(808) 555-0215',
      emergencyContact: 'Maria Santos (Daughter)', emergencyPhone: '(808) 555-0216',
      plan: 'Workshop Only', sessionsCompleted: 3, skillsMastered: 6, currentStreak: 1,
      lastSession: 'Nov 12', skills: [
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 50, status: 'in-progress' }
      ]
    },
    'Frank Wong': {
      room: '401', joinedDate: 'May 2025', email: 'frank.wong@email.com', phone: '(808) 555-0401',
      emergencyContact: 'Lisa Wong (Daughter)', emergencyPhone: '(808) 555-0403',
      plan: 'Standard ($79/mo)', sessionsCompleted: 7, skillsMastered: 13, currentStreak: 4,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Password Security', progress: 70, status: 'in-progress' }
      ]
    },
    'Alice Chen': {
      room: '118', joinedDate: 'February 2025', email: 'alice.chen@email.com', phone: '(808) 555-0118',
      emergencyContact: 'Michael Chen (Son)', emergencyPhone: '(808) 555-0119',
      plan: 'Premium ($149/mo)', sessionsCompleted: 9, skillsMastered: 16, currentStreak: 6,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Calendar Management', progress: 100, status: 'completed' },
        { skill: 'Social Media Safety', progress: 75, status: 'in-progress' }
      ]
    },
    'Mary Johnson': {
      room: '401', joinedDate: 'August 2025', email: 'mary.johnson@email.com', phone: '(808) 555-0123',
      emergencyContact: 'Sarah Miller (Daughter)', emergencyPhone: '(808) 555-9876',
      plan: 'Basic ($39/mo)', sessionsCompleted: 10, skillsMastered: 18, currentStreak: 4,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Photo Management', progress: 100, status: 'completed' },
        { skill: 'Password Security', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Calendar Management', progress: 85, status: 'in-progress' }
      ],
      sessionHistory: [
        { id: 1, date: 'November 20, 2025', topic: 'Scam Prevention Workshop', type: 'Group Workshop', duration: '90 minutes', instructor: 'Tea Araki', status: 'completed', attendance: 'present', rating: 5, notes: 'Very engaged! Asked excellent questions about identifying phishing emails and shared tips with the group.' },
        { id: 2, date: 'November 6, 2025', topic: 'iPhone Basics', type: 'Paid Class', duration: '45 minutes', instructor: 'Lindsay Trenton', status: 'completed', attendance: 'present', rating: 5, notes: 'Mastered taking and sharing photos with family members. Now confidently uses the camera app!' },
        { id: 3, date: 'October 15, 2025', topic: 'Video Calling Setup', type: 'One-on-One', duration: '60 minutes', instructor: 'Tea Araki', status: 'completed', attendance: 'present', rating: 5, notes: 'Successfully FaceTimed her daughter by the end of session! So excited to see grandchildren regularly.' },
        { id: 4, date: 'December 5, 2025', topic: 'Email & Calendar Basics', type: 'Group Workshop', duration: '90 minutes', instructor: 'Tea Araki', status: 'scheduled', attendance: 'registered' }
      ]
    },
    'George Nakamura': {
      room: '325', joinedDate: 'August 2025', email: 'george.nakamura@email.com', phone: '(808) 555-0325',
      emergencyContact: 'Ken Nakamura (Son)', emergencyPhone: '(808) 555-0326',
      plan: 'Workshop Only', sessionsCompleted: 4, skillsMastered: 8, currentStreak: 2,
      lastSession: 'Nov 20', skills: [
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 70, status: 'in-progress' },
        { skill: 'Video Calling', progress: 40, status: 'in-progress' }
      ]
    },
    'Betty Yamamoto': {
      room: '209', joinedDate: 'June 2025', email: 'betty.yamamoto@email.com', phone: '(808) 555-0209',
      emergencyContact: 'Tom Yamamoto (Son)', emergencyPhone: '(808) 555-0210',
      plan: 'Standard ($79/mo)', sessionsCompleted: 6, skillsMastered: 11, currentStreak: 3,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 80, status: 'in-progress' },
        { skill: 'Calendar Management', progress: 50, status: 'in-progress' }
      ]
    },
    'Thomas Park': {
      room: '418', joinedDate: 'July 2025', email: 'thomas.park@email.com', phone: '(808) 555-0418',
      emergencyContact: 'Susan Park (Daughter)', emergencyPhone: '(808) 555-0419',
      plan: 'Workshop Only', sessionsCompleted: 5, skillsMastered: 10, currentStreak: 3,
      lastSession: 'Nov 20', skills: [
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 60, status: 'in-progress' }
      ]
    },
    'Patricia Lee': {
      room: '209', joinedDate: 'April 2025', email: 'patricia.lee@email.com', phone: '(808) 555-0299',
      emergencyContact: 'James Lee (Son)', emergencyPhone: '(808) 555-0298',
      plan: 'Premium ($149/mo)', sessionsCompleted: 8, skillsMastered: 14, currentStreak: 5,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Photo Management', progress: 100, status: 'completed' },
        { skill: 'Calendar Management', progress: 70, status: 'in-progress' }
      ]
    },
    'William Chen': {
      room: '305', joinedDate: 'May 2025', email: 'william.chen@email.com', phone: '(808) 555-0305',
      emergencyContact: 'Amy Chen (Daughter)', emergencyPhone: '(808) 555-0306',
      plan: 'Standard ($79/mo)', sessionsCompleted: 7, skillsMastered: 12, currentStreak: 4,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Password Security', progress: 65, status: 'in-progress' }
      ]
    },
    'Richard Silva': {
      room: '122', joinedDate: 'October 2025', email: 'richard.silva@email.com', phone: '(808) 555-0122',
      emergencyContact: 'Maria Silva (Daughter)', emergencyPhone: '(808) 555-0123',
      plan: 'Workshop Only', sessionsCompleted: 3, skillsMastered: 5, currentStreak: 1,
      lastSession: 'Nov 20', skills: [
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 40, status: 'in-progress' }
      ]
    },
    'Linda Fujimoto': {
      room: '233', joinedDate: 'September 2025', email: 'linda.fujimoto@email.com', phone: '(808) 555-0233',
      emergencyContact: 'John Fujimoto (Son)', emergencyPhone: '(808) 555-0234',
      plan: 'Basic ($39/mo)', sessionsCompleted: 6, skillsMastered: 11, currentStreak: 3,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 75, status: 'in-progress' }
      ]
    },
    'Charles Brown': {
      room: '156', joinedDate: 'January 2025', email: 'charles.brown@email.com', phone: '(808) 555-0156',
      emergencyContact: 'Laura Brown (Daughter)', emergencyPhone: '(808) 555-0157',
      plan: 'Premium ($149/mo)', sessionsCompleted: 9, skillsMastered: 16, currentStreak: 6,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Calendar Management', progress: 100, status: 'completed' },
        { skill: 'Photo Management', progress: 90, status: 'in-progress' }
      ]
    },
    'Susan Lee': {
      room: '289', joinedDate: 'July 2025', email: 'susan.lee@email.com', phone: '(808) 555-0289',
      emergencyContact: 'Peter Lee (Son)', emergencyPhone: '(808) 555-0290',
      plan: 'Workshop Only', sessionsCompleted: 5, skillsMastered: 9, currentStreak: 2,
      lastSession: 'Nov 20', skills: [
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 55, status: 'in-progress' }
      ]
    },
    'Daniel Kato': {
      room: '331', joinedDate: 'November 2025', email: 'daniel.kato@email.com', phone: '(808) 555-0331',
      emergencyContact: 'Emily Kato (Daughter)', emergencyPhone: '(808) 555-0332',
      plan: 'Workshop Only', sessionsCompleted: 2, skillsMastered: 4, currentStreak: 1,
      lastSession: 'Nov 8', skills: [
        { skill: 'Email Basics', progress: 60, status: 'in-progress' },
        { skill: 'Scam Prevention', progress: 30, status: 'in-progress' }
      ]
    },
    'Nancy Wong': {
      room: '412', joinedDate: 'May 2025', email: 'nancy.wong@email.com', phone: '(808) 555-0412',
      emergencyContact: 'Robert Wong (Son)', emergencyPhone: '(808) 555-0413',
      plan: 'Standard ($79/mo)', sessionsCompleted: 7, skillsMastered: 13, currentStreak: 4,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Calendar Management', progress: 70, status: 'in-progress' }
      ]
    },
    'Steven Park': {
      room: '367', joinedDate: 'August 2025', email: 'steven.park@email.com', phone: '(808) 555-0367',
      emergencyContact: 'Michelle Park (Daughter)', emergencyPhone: '(808) 555-0368',
      plan: 'Workshop Only', sessionsCompleted: 4, skillsMastered: 7, currentStreak: 2,
      lastSession: 'Nov 20', skills: [
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 65, status: 'in-progress' },
        { skill: 'Video Calling', progress: 45, status: 'in-progress' }
      ]
    },
    'Carol Kim': {
      room: '198', joinedDate: 'March 2025', email: 'carol.kim@email.com', phone: '(808) 555-0198',
      emergencyContact: 'Daniel Kim (Son)', emergencyPhone: '(808) 555-0199',
      plan: 'Premium ($149/mo)', sessionsCompleted: 8, skillsMastered: 15, currentStreak: 5,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Photo Management', progress: 100, status: 'completed' },
        { skill: 'Password Security', progress: 80, status: 'in-progress' }
      ]
    },
    'Mark Tanaka': {
      room: '421', joinedDate: 'June 2025', email: 'mark.tanaka@email.com', phone: '(808) 555-0421',
      emergencyContact: 'Lisa Tanaka (Daughter)', emergencyPhone: '(808) 555-0422',
      plan: 'Standard ($79/mo)', sessionsCompleted: 6, skillsMastered: 11, currentStreak: 3,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 90, status: 'in-progress' },
        { skill: 'Calendar Management', progress: 50, status: 'in-progress' }
      ]
    },
    'Ruth Nakamura': {
      room: '134', joinedDate: 'July 2025', email: 'ruth.nakamura@email.com', phone: '(808) 555-0134',
      emergencyContact: 'Brian Nakamura (Son)', emergencyPhone: '(808) 555-0135',
      plan: 'Workshop Only', sessionsCompleted: 5, skillsMastered: 10, currentStreak: 3,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 70, status: 'in-progress' }
      ]
    },
    'James Watanabe': {
      room: '278', joinedDate: 'April 2025', email: 'james.watanabe@email.com', phone: '(808) 555-0278',
      emergencyContact: 'Karen Watanabe (Daughter)', emergencyPhone: '(808) 555-0279',
      plan: 'Premium ($149/mo)', sessionsCompleted: 7, skillsMastered: 14, currentStreak: 4,
      lastSession: 'Nov 20', skills: [
        { skill: 'Email Basics', progress: 100, status: 'completed' },
        { skill: 'Video Calling', progress: 100, status: 'completed' },
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Calendar Management', progress: 100, status: 'completed' },
        { skill: 'Password Security', progress: 60, status: 'in-progress' }
      ]
    },
    'Barbara Yamamoto': {
      room: '156', joinedDate: 'October 2025', email: 'barbara.yamamoto@email.com', phone: '(808) 555-0166',
      emergencyContact: 'Steven Yamamoto (Son)', emergencyPhone: '(808) 555-0167',
      plan: 'Workshop Only', sessionsCompleted: 4, skillsMastered: 8, currentStreak: 2,
      lastSession: 'Nov 20', skills: [
        { skill: 'Scam Prevention', progress: 100, status: 'completed' },
        { skill: 'Email Basics', progress: 70, status: 'in-progress' },
        { skill: 'Video Calling', progress: 50, status: 'in-progress' }
      ]
    },
    'David Rodriguez': { plan: 'Workshop Only' },
    'Jennifer Tanaka': { plan: 'Standard ($79/mo)' },
    'Michael Santos': { plan: 'Workshop Only' },
    'Elizabeth Kim': { plan: 'Premium ($149/mo)' },
    'Joseph Lee': { plan: 'Workshop Only' },
    'Sarah Wong': { plan: 'Standard ($79/mo)' },
    'Christopher Chen': { plan: 'Workshop Only' },
    'Karen Nakamura': { plan: 'Basic ($39/mo)' },
    'Matthew Park': { plan: 'Workshop Only' },
    'Jessica Martinez': { plan: 'Premium ($149/mo)' },
    'Andrew Liu': { plan: 'Workshop Only' },
    'Michelle Fujimoto': { plan: 'Standard ($79/mo)' },
    'Daniel Brown': { plan: 'Workshop Only' },
    'Lisa Yamamoto': { plan: 'Standard ($79/mo)' },
    'Kevin Silva': { plan: 'Premium ($149/mo)' },
    'Amanda Kato': { plan: 'Workshop Only' },
    'Ryan Watanabe': { plan: 'Basic ($39/mo)' },
    'Emily Rodriguez': { plan: 'Standard ($79/mo)' },
  };

  // Default data for residents not in detailed list
  const defaultData = {
    room: '100', joinedDate: 'September 2025',
    email: name.toLowerCase().replace(/ /g, '.') + '@email.com',
    phone: '(808) 555-0100',
    emergencyContact: 'Family Member', emergencyPhone: '(808) 555-0101',
    plan: 'Workshop Only', sessionsCompleted: 5, skillsMastered: 10, currentStreak: 2,
    lastSession: 'Nov 18', skills: [
      { skill: 'Email Basics', progress: 100, status: 'completed' },
      { skill: 'Video Calling', progress: 75, status: 'in-progress' },
      { skill: 'Scam Prevention', progress: 50, status: 'in-progress' }
    ],
    sessionHistory: [
      { id: 1, date: 'November 18, 2025', topic: 'Tech Basics', type: 'Group Workshop', duration: '60 minutes', instructor: 'Tea Araki', status: 'completed', attendance: 'present', rating: 4, notes: 'Good progress on foundational skills. Eager to learn more about staying safe online.' },
      { id: 2, date: 'December 5, 2025', topic: 'Email & Calendar Basics', type: 'Group Workshop', duration: '90 minutes', instructor: 'Tea Araki', status: 'scheduled', attendance: 'registered' }
    ]
  };

  return { ...defaultData, ...residentProfiles[name] };
}

export function ResidentProfile({ residentName = 'Mary Johnson', onBack }: ResidentProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const profileData = getResidentData(residentName);

  const residentData = {
    name: residentName,
    ...profileData,
    status: 'active',
    nextSession: {
      date: 'December 5, 2025',
      time: '10:00 AM',
      topic: 'Email & Calendar Basics',
      type: 'Group Workshop'
    }
  };

  const progressStats = [
    { label: 'Sessions Completed', value: residentData.sessionsCompleted, total: 12, color: '#2D9596' },
    { label: 'Skills Mastered', value: residentData.skillsMastered, total: 20, color: '#16A34A' },
    { label: 'Current Streak', value: `${residentData.currentStreak} weeks`, icon: '🔥' }
  ];

  const skillsProgress = profileData.skills;
  const sessionHistory = profileData.sessionHistory;

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
          className="flex items-center gap-2 mb-6 hover:underline active:scale-95 transition-transform"
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
              className="w-full sm:w-auto h-12 text-[16px] active:scale-95 transition-transform"
              onClick={() => {
                const subject = encodeURIComponent(`Message to ${residentData.name}`);
                window.location.href = `mailto:${residentData.email}?subject=${subject}`;
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Resident
            </Button>
            <Button
              className="w-full sm:w-auto h-12 text-[16px] active:scale-95 transition-transform"
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
            <TabsTrigger value="overview" className="text-[15px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[120px]">Overview</TabsTrigger>
            <TabsTrigger value="sessions" className="text-[15px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[140px]">Session History</TabsTrigger>
            <TabsTrigger value="progress" className="text-[15px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[140px]">Skills Progress</TabsTrigger>
            <TabsTrigger value="contact" className="text-[15px] sm:text-[16px] px-4 sm:px-6 py-3 flex-1 min-w-[120px]">Contact Info</TabsTrigger>
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
                className="active:scale-95 transition-transform"
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
