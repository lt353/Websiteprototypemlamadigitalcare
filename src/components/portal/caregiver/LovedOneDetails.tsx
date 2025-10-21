import { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Phone, Mail, MapPin, Shield, Clock, Users, Edit, Printer } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { toast } from 'sonner';

interface LovedOneDetailsProps {
  seniorName: string;
  onBack: () => void;
  onNavigateToBooking: () => void;
  onNavigateToReschedule: () => void;
  onNavigateToManagePlan: () => void;
  onNavigateToUpdatePayment?: () => void;
  onNavigateToSessionDetails?: () => void;
  onNavigateToSessionSummary?: () => void;
  onNavigateToMessageInstructor?: () => void;
}

export function LovedOneDetails({ seniorName, onBack, onNavigateToBooking, onNavigateToReschedule, onNavigateToManagePlan, onNavigateToUpdatePayment, onNavigateToSessionDetails, onNavigateToSessionSummary, onNavigateToMessageInstructor }: LovedOneDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showPauseConfirmation, setShowPauseConfirmation] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditSessionModal, setShowEditSessionModal] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [sessionFilter, setSessionFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [removeConfirmName, setRemoveConfirmName] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const [pauseMessage, setPauseMessage] = useState('');
  const [editSessionData, setEditSessionData] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState({
    phone: '(808) 555-0123',
    email: 'mary.johnson@email.com',
    emergencyName: 'Sarah Miller',
    emergencyPhone: '(808) 555-9876',
    address: '123 Aloha Street',
    city: 'Honolulu',
    state: 'HI',
    zip: '96814'
  });

  // Helper function for dynamic dates
  const getDynamicDate = (daysOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getShortDate = (daysOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate().toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    };
  };

  // Calculate next billing date (1st of next month)
  const getNextBillingDate = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const upcomingSessionDate = getDynamicDate(5);
  const lastSessionDate = getDynamicDate(-7);

  // Mock data for the senior
  const seniorData = {
    name: seniorName,
    relationship: 'Mother',
    joinedDate: 'Nov 2025',
    status: 'active',
    phone: '(808) 555-1234',
    email: 'mary.johnson@email.com',
    address: '123 Main St, Kailua, HI 96734',
    emergencyContact: 'You (Sarah Miller)',
    nextSession: {
      date: upcomingSessionDate,
      time: '2:00 PM HST',
      type: 'In-Home Visit',
      instructor: 'Tea Araki',
      topics: 'Two-Factor Authentication, Calendar App'
    },
    stats: {
      sessionsCompleted: 5,
      skillsMastered: 12,
      lastSession: lastSessionDate,
      currentFocus: 'Password Management'
    },
    currentPlan: {
      name: 'Standard Care',
      price: '$79/month',
      status: 'Active',
      nextBilling: getNextBillingDate()
    }
  };

  const sessions = [
    {
      id: 1,
      status: 'upcoming',
      date: getDynamicDate(5),
      dateShort: getShortDate(5),
      time: '2:00 PM - 3:30 PM',
      type: 'In-Home Visit',
      instructor: 'Tea Araki',
      topics: 'Two-Factor Authentication, Calendar App',
      location: '123 Main St, Kailua',
      coverage: 'addon' // add-on (already used Oct in-home on Oct 13)
    },
    {
      id: 2,
      status: 'completed',
      date: getDynamicDate(-7),
      dateShort: getShortDate(-7),
      time: '2:00 PM - 3:30 PM',
      type: 'In-Home Visit',
      topics: 'Password Management, Account Security',
      instructor: 'Tea Araki',
      duration: '90 minutes',
      rating: 5,
      coverage: 'included' // included (1 of 1 Oct in-home)
    },
    {
      id: 3,
      status: 'completed',
      date: getDynamicDate(-14),
      dateShort: getShortDate(-14),
      time: '10:00 AM - 11:00 AM',
      type: 'Virtual Session',
      topics: 'Email Organization, Spam Recognition',
      instructor: 'Lindsay Trenton',
      duration: '60 minutes',
      rating: 5,
      coverage: 'addon' // add-on (not the chosen track for Oct)
    },
    {
      id: 4,
      status: 'completed',
      date: getDynamicDate(-21),
      dateShort: getShortDate(-21),
      time: '3:00 PM - 4:00 PM',
      type: 'Virtual Session',
      topics: 'Zoom Basics, Video Calling',
      instructor: 'DJ Sable',
      duration: '60 minutes',
      rating: 5,
      coverage: 'included' // included (2 of 3 Sept virtual)
    },
    {
      id: 5,
      status: 'completed',
      date: getDynamicDate(-28),
      dateShort: getShortDate(-28),
      time: '2:00 PM - 3:30 PM',
      type: 'In-Home Visit',
      topics: 'iPhone Basics, Photo Organization',
      instructor: 'Tea Araki',
      duration: '90 minutes',
      rating: 5,
      coverage: 'addon' // add-on (not the chosen track for Sept)
    },
    {
      id: 6,
      status: 'completed',
      date: getDynamicDate(-35),
      dateShort: getShortDate(-35),
      time: '1:00 PM - 2:00 PM',
      type: 'Virtual Session',
      topics: 'Facebook Privacy Settings',
      instructor: 'Lindsay Trenton',
      duration: '60 minutes',
      rating: 4,
      coverage: 'included' // included (1 of 3 Sept virtual)
    }
  ];

  const skills = [
    { name: 'Password Manager Setup', completed: true },
    { name: 'Email Organization', completed: true },
    { name: 'Scam Identification', completed: true },
    { name: 'Two-Factor Authentication', completed: false, inProgress: true },
    { name: 'Video Calling', completed: false, inProgress: false }
  ];

  const filterSessions = (filter: 'all' | 'upcoming' | 'completed') => {
    if (filter === 'all') return sessions;
    return sessions.filter(session => session.status === filter);
  };

  const printConfirmation = () => {
    window.print();
  };

  const handleContactSave = () => {
    setIsEditingContact(false);
    toast.success('Contact information updated successfully');
  };

  const handleEditSession = (session: any) => {
    setEditSessionData(session);
    setShowEditSessionModal(true);
  };

  const handleSaveSessionEdit = () => {
    toast.success('Session updated successfully');
    setShowEditSessionModal(false);
    setEditSessionData(null);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[32px] font-bold mb-2" style={{ color: '#265073' }}>
                {seniorData.name}'s Care Dashboard
              </h1>
              <div className="flex items-center gap-3 text-[16px]">
                <Badge
                  className="text-[14px]"
                  style={{ background: '#D1FAE5', color: '#065F46', border: '1px solid #059669' }}
                >
                  Active Member
                </Badge>
                <span style={{ color: '#6B7280' }}>
                  Joined {seniorData.joinedDate} • {seniorData.relationship}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="progress">Learning Progress</TabsTrigger>
            <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Next Session Card */}
            <Card>
              <CardHeader>
                <CardTitle>Next Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" style={{ color: '#2D9596' }} />
                      <span className="text-[18px] font-semibold">{seniorData.nextSession.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" style={{ color: '#6B7280' }} />
                      <span>{seniorData.nextSession.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" style={{ color: '#6B7280' }} />
                      <span>{seniorData.nextSession.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" style={{ color: '#6B7280' }} />
                      <span>With {seniorData.nextSession.instructor}</span>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-1" style={{ color: '#265073' }}>Topics:</p>
                      <p style={{ color: '#6B7280' }}>{seniorData.nextSession.topics}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => onNavigateToSessionDetails?.()}
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={onNavigateToReschedule}
                      variant="outline"
                    >
                      Reschedule
                    </Button>
                    <Button
                      onClick={() => setShowCancelModal(true)}
                      variant="outline"
                      style={{ borderColor: '#DC2626', color: '#DC2626' }}
                    >
                      Cancel Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-[32px] font-bold" style={{ color: '#2D9596' }}>
                      {seniorData.stats.sessionsCompleted}
                    </div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>Sessions Completed</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-[32px] font-bold" style={{ color: '#2D9596' }}>
                      {seniorData.stats.skillsMastered}
                    </div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>Skills Mastered</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-[14px] font-bold" style={{ color: '#265073' }}>
                      {seniorData.stats.lastSession}
                    </div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>Last Session</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-[14px] font-bold" style={{ color: '#265073' }}>
                      {seniorData.stats.currentFocus}
                    </div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>Current Focus</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={onNavigateToBooking}
                    variant="outline"
                    className="h-auto py-4"
                  >
                    <div className="text-center">
                      <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: '#2D9596' }} />
                      <div className="text-sm">Book Session</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => onNavigateToMessageInstructor?.()}
                    variant="outline"
                    className="h-auto py-4"
                  >
                    <div className="text-center">
                      <Mail className="w-6 h-6 mx-auto mb-2" style={{ color: '#2D9596' }} />
                      <div className="text-sm">Message Instructor</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('progress')}
                    variant="outline"
                    className="h-auto py-4"
                  >
                    <div className="text-center">
                      <CheckCircle2 className="w-6 h-6 mx-auto mb-2" style={{ color: '#2D9596' }} />
                      <div className="text-sm">View Progress</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('billing')}
                    variant="outline"
                    className="h-auto py-4"
                  >
                    <div className="text-center">
                      <Shield className="w-6 h-6 mx-auto mb-2" style={{ color: '#2D9596' }} />
                      <div className="text-sm">Manage Plan</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.slice(1, 4).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <div className="font-semibold" style={{ color: '#265073' }}>{session.topics}</div>
                        <div className="text-sm" style={{ color: '#6B7280' }}>
                          {session.date} • {session.time} • {session.instructor}
                        </div>
                      </div>
                      <Button
                        onClick={() => onNavigateToSessionSummary?.()}
                        variant="outline"
                        size="sm"
                      >
                        View Summary
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setActiveTab('sessions')}
                  variant="link"
                  className="w-full mt-4"
                  style={{ color: '#2D9596' }}
                >
                  View All Sessions →
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Session History</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSessionFilter('all')}
                      variant={sessionFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      onClick={() => setSessionFilter('upcoming')}
                      variant={sessionFilter === 'upcoming' ? 'default' : 'outline'}
                      size="sm"
                    >
                      Upcoming
                    </Button>
                    <Button
                      onClick={() => setSessionFilter('completed')}
                      variant={sessionFilter === 'completed' ? 'default' : 'outline'}
                      size="sm"
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterSessions(sessionFilter).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-start gap-4 p-4 rounded-lg border"
                    >
                      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 min-w-[80px]">
                        <div className="text-xs font-semibold" style={{ color: '#6B7280' }}>
                          {session.dateShort.month}
                        </div>
                        <div className="text-2xl font-bold" style={{ color: '#265073' }}>
                          {session.dateShort.day}
                        </div>
                        <div className="text-xs" style={{ color: '#6B7280' }}>
                          {session.dateShort.year}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-lg" style={{ color: '#265073' }}>
                              {session.topics}
                            </div>
                            <div className="text-sm" style={{ color: '#6B7280' }}>
                              {session.time} • {session.type}
                            </div>
                          </div>
                          <Badge
                            className={session.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                          >
                            {session.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          </Badge>
                        </div>
                        <div className="text-sm" style={{ color: '#6B7280' }}>
                          <span className="font-semibold">Instructor:</span> {session.instructor}
                        </div>
                        {session.location && (
                          <div className="text-sm" style={{ color: '#6B7280' }}>
                            <span className="font-semibold">Location:</span> {session.location}
                          </div>
                        )}
                        {session.duration && (
                          <div className="text-sm" style={{ color: '#6B7280' }}>
                            <span className="font-semibold">Duration:</span> {session.duration}
                          </div>
                        )}
                        {session.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < session.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          {session.status === 'upcoming' ? (
                            <>
                              <Button
                                onClick={() => handleEditSession(session)}
                                variant="outline"
                                size="sm"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => setShowCancelModal(true)}
                                variant="outline"
                                size="sm"
                                style={{ borderColor: '#DC2626', color: '#DC2626' }}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() => onNavigateToSessionSummary?.()}
                              variant="outline"
                              size="sm"
                            >
                              View Summary
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={onNavigateToBooking}
                style={{ background: '#2D9596', color: '#FFFFFF' }}
                size="lg"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book New Session
              </Button>
            </div>
          </TabsContent>

          {/* Learning Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Progress</CardTitle>
                <CardDescription>Track {seniorData.name}'s learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        {skill.completed ? (
                          <CheckCircle2 className="w-6 h-6" style={{ color: '#16A34A' }} />
                        ) : skill.inProgress ? (
                          <Clock className="w-6 h-6" style={{ color: '#F59E0B' }} />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: '#D1D5DB' }} />
                        )}
                        <span className="font-medium" style={{ color: '#265073' }}>{skill.name}</span>
                      </div>
                      <Badge
                        className={
                          skill.completed
                            ? 'bg-green-100 text-green-800'
                            : skill.inProgress
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {skill.completed ? 'Completed' : skill.inProgress ? 'In Progress' : 'Not Started'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#D1FAE5' }}>
                    <div className="text-2xl">🎉</div>
                    <div>
                      <div className="font-semibold" style={{ color: '#065F46' }}>
                        Mastered Password Management
                      </div>
                      <div className="text-sm" style={{ color: '#059669' }}>
                        {lastSessionDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#D1FAE5' }}>
                    <div className="text-2xl">⭐</div>
                    <div>
                      <div className="font-semibold" style={{ color: '#065F46' }}>
                        5-Star Session Rating
                      </div>
                      <div className="text-sm" style={{ color: '#059669' }}>
                        Last 4 sessions
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing & Plan Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#265073' }}>
                      {seniorData.currentPlan.name}
                    </h3>
                    <div className="text-3xl font-bold mb-4" style={{ color: '#2D9596' }}>
                      {seniorData.currentPlan.price}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                        <span>1 in-home visit (90 min) OR 3 virtual sessions per month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                        <span>Email/phone support (same-day response)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                        <span>Learning library access & custom guides</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                        <span>15% discount on add-on sessions</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={onNavigateToManagePlan}
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                    >
                      Change Plan
                    </Button>
                    <Button
                      onClick={() => setShowPauseModal(true)}
                      variant="outline"
                    >
                      Pause Services
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-semibold" style={{ color: '#265073' }}>Payment Method</div>
                      <div className="text-sm" style={{ color: '#6B7280' }}>Visa ending in 4242</div>
                    </div>
                    <Button
                      onClick={() => onNavigateToUpdatePayment?.()}
                      variant="outline"
                      size="sm"
                    >
                      Update
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-semibold" style={{ color: '#265073' }}>Next Billing Date</div>
                      <div className="text-sm" style={{ color: '#6B7280' }}>{seniorData.currentPlan.nextBilling}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-semibold" style={{ color: '#265073' }}>Plan Status</div>
                      <div className="text-sm" style={{ color: '#16A34A' }}>{seniorData.currentPlan.status}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contact Information</CardTitle>
                  {!isEditingContact ? (
                    <Button
                      onClick={() => setIsEditingContact(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIsEditingContact(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleContactSave}
                        style={{ background: '#2D9596', color: '#FFFFFF' }}
                        size="sm"
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Phone Number</Label>
                      {isEditingContact ? (
                        <Input
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        />
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" style={{ color: '#6B7280' }} />
                          <span>{contactInfo.phone}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      {isEditingContact ? (
                        <Input
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        />
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" style={{ color: '#6B7280' }} />
                          <span>{contactInfo.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Home Address</Label>
                    {isEditingContact ? (
                      <div className="space-y-2 mt-2">
                        <Input
                          value={contactInfo.address}
                          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                          placeholder="Street Address"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            value={contactInfo.city}
                            onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                            placeholder="City"
                          />
                          <Input
                            value={contactInfo.state}
                            onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })}
                            placeholder="State"
                          />
                          <Input
                            value={contactInfo.zip}
                            onChange={(e) => setContactInfo({ ...contactInfo, zip: e.target.value })}
                            placeholder="ZIP"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#6B7280' }} />
                        <span>{contactInfo.address}, {contactInfo.city}, {contactInfo.state} {contactInfo.zip}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#265073' }}>
                      Emergency Contact
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        {isEditingContact ? (
                          <Input
                            value={contactInfo.emergencyName}
                            onChange={(e) => setContactInfo({ ...contactInfo, emergencyName: e.target.value })}
                          />
                        ) : (
                          <div className="mt-2">{contactInfo.emergencyName}</div>
                        )}
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        {isEditingContact ? (
                          <Input
                            value={contactInfo.emergencyPhone}
                            onChange={(e) => setContactInfo({ ...contactInfo, emergencyPhone: e.target.value })}
                          />
                        ) : (
                          <div className="mt-2">{contactInfo.emergencyPhone}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-semibold" style={{ color: '#265073' }}>Access Permissions</div>
                      <div className="text-sm" style={{ color: '#6B7280' }}>
                        You have view-only access to {seniorData.name}'s account
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowAccessModal(true)}
                      variant="outline"
                      size="sm"
                    >
                      Request More Access
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-semibold" style={{ color: '#265073' }}>Notification Preferences</div>
                      <div className="text-sm" style={{ color: '#6B7280' }}>
                        Manage how you receive updates
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#DC2626' }}>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: '#DC2626' }}>
                    <div>
                      <div className="font-semibold" style={{ color: '#DC2626' }}>Pause Services</div>
                      <div className="text-sm" style={{ color: '#6B7280' }}>
                        Temporarily pause all services for {seniorData.name}
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowPauseModal(true)}
                      variant="outline"
                      size="sm"
                      style={{ borderColor: '#DC2626', color: '#DC2626' }}
                    >
                      Pause
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: '#DC2626' }}>
                    <div>
                      <div className="font-semibold" style={{ color: '#DC2626' }}>Remove from Care</div>
                      <div className="text-sm" style={{ color: '#6B7280' }}>
                        Remove {seniorData.name} from your care dashboard
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowRemoveModal(true)}
                      variant="outline"
                      size="sm"
                      style={{ borderColor: '#DC2626', color: '#DC2626' }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Cancel Session Modal */}
        <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[24px]" style={{ color: '#265073' }}>
                Cancel Session
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this session?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg border-2" style={{ borderColor: '#E5E7EB' }}>
                <div className="font-semibold mb-2" style={{ color: '#265073' }}>Session Details:</div>
                <div className="space-y-1 text-sm">
                  <p><strong>Date:</strong> {seniorData.nextSession.date}</p>
                  <p><strong>Time:</strong> {seniorData.nextSession.time}</p>
                  <p><strong>Type:</strong> {seniorData.nextSession.type}</p>
                  <p><strong>Instructor:</strong> {seniorData.nextSession.instructor}</p>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Reason for cancellation (optional):</Label>
                <Textarea
                  value={cancelMessage}
                  onChange={(e) => setCancelMessage(e.target.value)}
                  placeholder="Let us know why you're canceling..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="p-3 rounded-lg" style={{ background: '#FEF3C7' }}>
                <p className="text-sm">
                  <strong>Note:</strong> Cancellations made less than 24 hours before the session may not be eligible for a refund.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelMessage('');
                }}
                variant="outline"
              >
                Keep Session
              </Button>
              <Button
                onClick={() => {
                  setShowCancelModal(false);
                  setShowCancelConfirmation(true);
                  setCancelMessage('');
                }}
                style={{ background: '#DC2626', color: '#FFFFFF' }}
              >
                Yes, Cancel Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Confirmation Modal */}
        <Dialog open={showCancelConfirmation} onOpenChange={setShowCancelConfirmation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[24px]" style={{ color: '#16A34A' }}>
                ✓ Session Canceled
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="text-center">
                <p className="text-[18px] mb-4" style={{ color: '#265073' }}>
                  The session has been successfully canceled.
                </p>
              </div>

              <div className="p-6 rounded-lg border-2" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>Cancellation Summary</h3>
                <div className="space-y-2 text-[16px]">
                  <p><strong>Original Date:</strong> {seniorData.nextSession.date}</p>
                  <p><strong>Time:</strong> {seniorData.nextSession.time}</p>
                  <p><strong>Senior:</strong> {seniorData.name}</p>
                  <p><strong>Status:</strong> Canceled</p>
                  <p><strong>Confirmation #:</strong> CANCEL-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={printConfirmation}
                  variant="outline"
                  className="flex-1"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Confirmation
                </Button>
                <Button
                  onClick={onNavigateToBooking}
                  variant="outline"
                  className="flex-1"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book New Session
                </Button>
                <Button
                  onClick={() => setShowCancelConfirmation(false)}
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Pause Services Modal */}
        <Dialog open={showPauseModal} onOpenChange={setShowPauseModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[24px]" style={{ color: '#265073' }}>
                Pause Services for {seniorData.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}>
                <p className="font-semibold mb-2" style={{ color: '#92400E' }}>What happens when you pause?</p>
                <ul className="space-y-1 text-sm" style={{ color: '#92400E' }}>
                  <li>• All scheduled sessions will be canceled</li>
                  <li>• Billing will be paused immediately</li>
                  <li>• You can resume services anytime</li>
                  <li>• Progress and history will be preserved</li>
                </ul>
              </div>

              <div>
                <Label className="mb-2 block">Reason for pausing (optional):</Label>
                <Textarea
                  value={pauseMessage}
                  onChange={(e) => setPauseMessage(e.target.value)}
                  placeholder="Let us know why you're pausing services..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setShowPauseModal(false);
                  setPauseMessage('');
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowPauseModal(false);
                  setShowPauseConfirmation(true);
                  setPauseMessage('');
                }}
                style={{ background: '#F59E0B', color: '#FFFFFF' }}
              >
                Pause Services
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Pause Confirmation Modal */}
        <Dialog open={showPauseConfirmation} onOpenChange={setShowPauseConfirmation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[24px]" style={{ color: '#16A34A' }}>
                ⏸️ Services Paused
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="text-center">
                <p className="text-[18px] mb-4" style={{ color: '#265073' }}>
                  Services for {seniorData.name} have been paused. You can resume anytime.
                </p>
              </div>

              <div className="p-6 rounded-lg border-2" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>Pause Summary</h3>
                <div className="space-y-2 text-[16px]">
                  <p><strong>Senior:</strong> {seniorData.name}</p>
                  <p><strong>Status:</strong> Services Paused</p>
                  <p><strong>Effective Date:</strong> {getDynamicDate(0)}</p>
                  <p><strong>Next Charge:</strong> None while paused</p>
                  <p><strong>Resume:</strong> Available anytime from Settings</p>
                  <p><strong>Confirmation #:</strong> PAUSE-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={printConfirmation}
                  variant="outline"
                  className="flex-1"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Confirmation
                </Button>
                <Button
                  onClick={() => setShowPauseConfirmation(false)}
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Remove from Care Modal */}
        <AlertDialog open={showRemoveModal} onOpenChange={setShowRemoveModal}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[24px]" style={{ color: '#DC2626' }}>
                ⚠️ Remove {seniorData.name} from Your Care?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ background: '#FEE2E2', border: '2px solid #DC2626' }}>
                <p className="font-bold" style={{ color: '#DC2626' }}>This is a permanent action that cannot be undone.</p>
              </div>

              <div>
                <p className="font-semibold mb-2" style={{ color: '#265073' }}>What Will Happen:</p>
                <div className="space-y-2">
                  <p style={{ color: '#DC2626' }}>❌ You'll lose access to {seniorData.name}'s dashboard</p>
                  <p style={{ color: '#DC2626' }}>❌ You can't view her progress or sessions</p>
                  <p style={{ color: '#DC2626' }}>❌ You can't book sessions for her</p>
                  <p style={{ color: '#DC2626' }}>❌ You can't manage her billing</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2" style={{ color: '#265073' }}>Note:</p>
                <div className="space-y-1">
                  <p>✓ {seniorData.name}'s account remains active</p>
                  <p>✓ {seniorData.name} can re-invite you later if needed</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type "{seniorData.name}" to confirm:</Label>
                <Input
                  value={removeConfirmName}
                  onChange={(e) => setRemoveConfirmName(e.target.value)}
                  placeholder={seniorData.name}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="text-[16px]"
                onClick={() => setRemoveConfirmName('')}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (removeConfirmName === seniorData.name) {
                    setShowRemoveModal(false);
                    setRemoveConfirmName('');
                    toast.success(`${seniorData.name} has been removed from your care dashboard.`);
                    setTimeout(() => onBack(), 1500);
                  }
                }}
                disabled={removeConfirmName !== seniorData.name}
                className="text-[16px]"
                style={{ background: '#DC2626', color: '#FFFFFF', opacity: removeConfirmName !== seniorData.name ? 0.5 : 1 }}
              >
                Remove from Care
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Request Additional Access Modal */}
        <AlertDialog open={showAccessModal} onOpenChange={setShowAccessModal}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[24px]" style={{ color: '#265073' }}>
                Request Additional Access
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-3" style={{ color: '#265073' }}>Current Access Level:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span>View learning progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span>View session history</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span>Book sessions</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3" style={{ color: '#265073' }}>Request Access To:</p>
                <div className="space-y-3">
                  {[
                    'Manage billing and payment methods',
                    'Download learning resources on behalf of ' + seniorData.name,
                    'Cancel sessions without approval',
                    'Update profile information',
                    'View detailed session notes'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Checkbox id={`access-${i}`} />
                      <label htmlFor={`access-${i}`} className="text-[16px]">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Why do you need this access?</Label>
                <Textarea
                  placeholder={`Tell ${seniorData.name} why you'd like additional permissions. This helps her feel comfortable approving your request.`}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-[16px]">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setShowAccessModal(false);
                  toast.success(`✓ Request sent to ${seniorData.name}. She'll review it and respond shortly.`);
                }}
                className="text-[16px]"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Send Request to {seniorData.name}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
