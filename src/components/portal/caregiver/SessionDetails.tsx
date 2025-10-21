import { ArrowLeft, Calendar, Clock, MapPin, User, BookOpen, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

// Session pricing constants (15% member discount applied)
const SESSION_PRICES = {
  IN_HOME: {
    regular: 85,
    discounted: 72.25,
  },
  VIRTUAL: {
    regular: 35,
    discounted: 29.75,
  },
} as const;

interface SessionDetailsProps {
  seniorName: string;
  onBack: () => void;
  onReschedule: () => void;
  onCancel: () => void;
}

export function SessionDetails({ seniorName, onBack, onReschedule, onCancel }: SessionDetailsProps) {
  const sessionData = {
    date: 'December 1, 2025',
    time: '2:00 PM - 3:30 PM',
    duration: '90 minutes',
    type: 'In-Home Visit',
    location: '123 Main St, Kailua, HI 96734',
    coverage: 'addon', // This session is an add-on (based on LovedOneDetails data)
    instructor: {
      name: 'Tea Araki',
      title: 'Senior Technology Instructor',
      phone: '(808) 555-TECH',
      email: 'tea@malamadigital.care'
    },
    topics: [
      {
        title: 'Two-Factor Authentication (2FA)',
        description: 'Learn how to set up and use 2FA to protect your accounts from hackers',
        duration: '45 minutes',
        skills: [
          'Understanding what 2FA is and why it\'s important',
          'Setting up 2FA on email account',
          'Using authentication apps (Google Authenticator)',
          'Backup codes and recovery options'
        ]
      },
      {
        title: 'Calendar App Basics',
        description: 'Master your iPhone/iPad calendar to stay organized',
        duration: '45 minutes',
        skills: [
          'Creating and editing events',
          'Setting reminders for appointments',
          'Color-coding different types of events',
          'Sharing calendar with family members'
        ]
      }
    ],
    whatToBring: [
      'iPhone or iPad (fully charged)',
      'Any email passwords you want to secure',
      'List of upcoming appointments to add to calendar',
      'Reading glasses if needed'
    ],
    preparation: [
      'Tea will arrive 5 minutes early to set up',
      'No need to prepare anything - we\'ll guide you step by step',
      'Have a glass of water ready if you\'d like',
      'Feel free to take breaks anytime'
    ]
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
            <Badge style={{ background: '#E0F2FE', color: '#0284C7' }}>Upcoming</Badge>
            {sessionData.coverage === 'included' ? (
              <Badge style={{ background: '#DBEAFE', color: '#1E40AF' }}>
                PLAN SESSION
              </Badge>
            ) : (
              <Badge style={{ background: '#FEF3C7', color: '#92400E' }}>
                ADD-ON ${sessionData.type === 'In-Home Visit' ? SESSION_PRICES.IN_HOME.discounted : SESSION_PRICES.VIRTUAL.discounted}
              </Badge>
            )}
            <h1 className="text-[36px] font-bold" style={{ color: '#265073' }}>
              Session Details
            </h1>
          </div>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Everything {seniorName} will learn in this session
          </p>
        </div>

        {/* Session Overview Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Session Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 flex-shrink-0" style={{ color: '#2D9596' }} />
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Date</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>{sessionData.date}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 flex-shrink-0" style={{ color: '#2D9596' }} />
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Time</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>{sessionData.time}</p>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>({sessionData.duration})</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 flex-shrink-0" style={{ color: '#2D9596' }} />
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Location</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>{sessionData.type}</p>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>{sessionData.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-6 h-6 flex-shrink-0" style={{ color: '#2D9596' }} />
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Instructor</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>{sessionData.instructor.name}</p>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>{sessionData.instructor.title}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What They'll Learn */}
        <div className="mb-6">
          <h2 className="text-[28px] font-bold mb-4" style={{ color: '#265073' }}>
            What {seniorName} Will Learn
          </h2>
          
          <div className="space-y-4">
            {sessionData.topics.map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-6 h-6" style={{ color: '#2D9596' }} />
                        <CardTitle className="text-[22px]">{topic.title}</CardTitle>
                      </div>
                      <p className="text-[16px]" style={{ color: '#6B7280' }}>{topic.description}</p>
                    </div>
                    <Badge variant="outline" className="text-[14px]">{topic.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-[16px] mb-3" style={{ color: '#265073' }}>Skills Covered:</p>
                  <div className="space-y-2">
                    {topic.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What to Bring / Preparation */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[20px]">What to Have Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionData.whatToBring.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <span className="text-[#2D9596]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[20px]">What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionData.preparation.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <span className="text-[#2D9596]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact Instructor */}
        <Card className="mb-6" style={{ background: '#E6F7F4', borderColor: '#9AD0C2' }}>
          <CardContent className="p-6">
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              Questions? Contact {sessionData.instructor.name}
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <a 
                href={`tel:${sessionData.instructor.phone}`}
                className="flex items-center gap-3 text-[16px]"
                style={{ color: '#2D9596' }}
              >
                <Phone className="w-5 h-5" />
                <span className="font-bold">{sessionData.instructor.phone}</span>
              </a>
              <a 
                href={`mailto:${sessionData.instructor.email}`}
                className="flex items-center gap-3 text-[16px]"
                style={{ color: '#2D9596' }}
              >
                <Mail className="w-5 h-5" />
                <span className="font-bold">{sessionData.instructor.email}</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            variant="outline"
            onClick={onReschedule}
            className="flex-1 h-14 text-[18px]"
          >
            Reschedule Session
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-14 text-[18px]"
            style={{ borderColor: '#DC2626', color: '#DC2626' }}
          >
            Cancel Session
          </Button>
          <Button
            onClick={onBack}
            className="flex-1 h-14 text-[18px]"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            Back to Sessions
          </Button>
        </div>
      </div>
    </div>
  );
}
