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
import { toast } from 'sonner@2.0.3';

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
      coverage: 'included' // included in plan
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
      coverage: 'included'
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
      coverage: 'included'
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
      coverage: 'included'
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
      coverage: 'addon' // this was an add-on session
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
      coverage: 'included'
    }
  ];

  const skills = [
    { name: 'Password Manager Setup', completed: true },
    { name: 'Email Organization', completed: true },
    { name: 'Scam Identification', completed: true },
    { name: 'Two-Factor Authentication', completed: false, inProgress: true },
    { name: 'Video Calling', completed: false, inProgress: false }
  ];

  const handleEditSession = () => {
    setEditSessionData({
      date: upcomingSessionDate,
      time: '2:00 PM',
      topics: 'Two-Factor Authentication, Calendar App',
      notes: ''
    });
    setShowEditSessionModal(true);
  };

  const handleSaveSessionEdit = () => {
    setShowEditSessionModal(false);
    toast.success(`✓ Session updated! ${seniorData.name} and Tea have been notified.`);
  };

  const handleCancelSession = () => {
    setShowCancelModal(false);
    setShowCancelConfirmation(true);
  };

  const handlePauseServices = () => {
    setShowPauseModal(false);
    setShowPauseConfirmation(true);
  };

  const printConfirmation = () => {
    window.print();
  };

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
          Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="flex items-start gap-6 mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-[32px] flex-shrink-0"
            style={{ background: '#E6F7F4' }}
          >
            👤
          </div>
          <div className="flex-1">
            <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
              {seniorData.name}&apos;s Profile
            </h1>
            <p className="text-[18px] mb-3" style={{ color: '#6B7280' }}>
              {seniorData.relationship} • Active since {seniorData.joinedDate}
            </p>
            <Badge style={{ background: '#D1FAE5', color: '#065F46', fontSize: '16px', padding: '6px 12px' }}>
              Active
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 w-full flex-wrap h-auto gap-2">
            <TabsTrigger value="overview" className="text-[18px] px-6 py-3 flex-1 min-w-[140px]">Overview</TabsTrigger>
            <TabsTrigger value="sessions" className="text-[18px] px-6 py-3 flex-1 min-w-[140px]">Sessions</TabsTrigger>
            <TabsTrigger value="progress" className="text-[18px] px-6 py-3 flex-1 min-w-[140px]">Progress</TabsTrigger>
            <TabsTrigger value="settings" className="text-[18px] px-6 py-3 flex-1 min-w-[140px]">Settings</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            {/* Current Status Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Next Session */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#E6F7F4' }}>
                    <Calendar className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                  <CardTitle className="text-[20px]">Next Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-[16px]" style={{ color: '#265073' }}>{seniorData.nextSession.date}</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>{seniorData.nextSession.time}</p>
                  </div>
                  <div>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>
                      <strong>Type:</strong> {seniorData.nextSession.type}
                    </p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>
                      <strong>Instructor:</strong> {seniorData.nextSession.instructor}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>
                      <strong>Topics:</strong> {seniorData.nextSession.topics}
                    </p>
                  </div>
                  <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>
                    Included in Plan
                  </Badge>
                  <div className="flex gap-2 pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleEditSession}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={onNavigateToReschedule}
                    >
                      Reschedule
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowCancelModal(true)}
                    style={{ borderColor: '#EF4444', color: '#EF4444' }}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Progress */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#E6F7F4' }}>
                    <CheckCircle2 className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                  <CardTitle className="text-[20px]">Recent Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>{seniorData.stats.sessionsCompleted}</p>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Sessions</p>
                    </div>
                    <div>
                      <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>{seniorData.stats.skillsMastered}</p>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Skills Mastered</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>
                      <strong>Last session:</strong> {seniorData.stats.lastSession}
                    </p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>
                      <strong>Current focus:</strong> {seniorData.stats.currentFocus}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => {
                      setActiveTab('progress');
                      setTimeout(() => {
                        document.getElementById('progress-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                  >
                    View Full Progress
                  </Button>
                </CardContent>
              </Card>

              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#E6F7F4' }}>
                    <Shield className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                  <CardTitle className="text-[20px]">Current Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-[18px]" style={{ color: '#265073' }}>{seniorData.currentPlan.name}</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>{seniorData.currentPlan.price}</p>
                  </div>
                  <div>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>
                      <strong>Status:</strong> {seniorData.currentPlan.status}
                    </p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>
                      <strong>Next billing:</strong> {seniorData.currentPlan.nextBilling}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={onNavigateToManagePlan}
                  >
                    Manage Plan
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditingContact ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" style={{ color: '#2D9596' }} />
                        <div>
                          <p className="text-[14px]" style={{ color: '#6B7280' }}>Phone</p>
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>{contactInfo.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5" style={{ color: '#2D9596' }} />
                        <div>
                          <p className="text-[14px]" style={{ color: '#6B7280' }}>Email</p>
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>{contactInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5" style={{ color: '#2D9596' }} />
                        <div>
                          <p className="text-[14px]" style={{ color: '#6B7280' }}>Address</p>
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                            {contactInfo.address}, {contactInfo.city}, {contactInfo.state} {contactInfo.zip}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" style={{ color: '#2D9596' }} />
                        <div>
                          <p className="text-[14px]" style={{ color: '#6B7280' }}>Emergency Contact</p>
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                            {contactInfo.emergencyName} ({contactInfo.emergencyPhone})
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsEditingContact(true)}
                    >
                      Edit Information
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Input
                        value={contactInfo.address}
                        onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Label>City</Label>
                        <Input
                          value={contactInfo.city}
                          onChange={(e) => setContactInfo({...contactInfo, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Input
                          value={contactInfo.state}
                          onChange={(e) => setContactInfo({...contactInfo, state: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>ZIP</Label>
                        <Input
                          value={contactInfo.zip}
                          onChange={(e) => setContactInfo({...contactInfo, zip: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Emergency Contact Name</Label>
                        <Input
                          value={contactInfo.emergencyName}
                          onChange={(e) => setContactInfo({...contactInfo, emergencyName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Emergency Phone</Label>
                        <Input
                          value={contactInfo.emergencyPhone}
                          onChange={(e) => setContactInfo({...contactInfo, emergencyPhone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        style={{ background: '#2D9596', color: '#FFFFFF' }}
                        onClick={() => {
                          setIsEditingContact(false);
                          toast.success('✓ Contact information updated');
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingContact(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">What You Can Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: 'View upcoming sessions', granted: true },
                    { label: 'Book and manage sessions', granted: true },
                    { label: 'View session summaries', granted: true },
                    { label: 'Access session recordings', granted: true },
                    { label: 'View detailed session notes', granted: false }
                  ].map((permission, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {permission.granted ? (
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: '#9CA3AF' }}></div>
                      )}
                      <span className="text-[16px]" style={{ color: permission.granted ? '#265073' : '#9CA3AF' }}>
                        {permission.label}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setShowAccessModal(true)}
                >
                  Request Additional Access
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={onNavigateToBooking}
                style={{ background: '#2D9596', color: '#FFFFFF', height: '56px', fontSize: '18px' }}
              >
                Book Session
              </Button>
              <Button
                variant="outline"
                style={{ height: '56px', fontSize: '18px' }}
                onClick={onNavigateToMessageInstructor || (() => toast.info('Message Instructor page coming soon!'))}
              >
                Message Instructor
              </Button>
              <Button
                variant="outline"
                style={{ height: '56px', fontSize: '18px' }}
                onClick={() => toast.info('Learning Resources feature available in main portal dashboard')}
              >
                View Learning Resources
              </Button>
            </div>
          </TabsContent>

          {/* SESSIONS TAB */}
          <TabsContent value="sessions" className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button 
                variant={sessionFilter === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setSessionFilter('upcoming')}
                className="text-[16px] h-12 flex-1 min-w-[140px]"
                style={sessionFilter === 'upcoming' ? { background: '#2D9596', color: '#FFFFFF' } : {}}
              >
                Upcoming ({sessions.filter(s => s.status === 'upcoming').length})
              </Button>
              <Button
                variant={sessionFilter === 'completed' ? 'default' : 'outline'}
                onClick={() => setSessionFilter('completed')}
                className="text-[16px] h-12 flex-1 min-w-[140px]"
                style={sessionFilter === 'completed' ? { background: '#2D9596', color: '#FFFFFF' } : {}}
              >
                Completed ({sessions.filter(s => s.status === 'completed').length})
              </Button>
              <Button
                variant={sessionFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSessionFilter('all')}
                className="text-[16px] h-12 flex-1 min-w-[100px]"
                style={sessionFilter === 'all' ? { background: '#2D9596', color: '#FFFFFF' } : {}}
              >
                All ({sessions.length})
              </Button>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              {sessions
                .filter(session => sessionFilter === 'all' || session.status === sessionFilter)
                .map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge style={{
                            background: session.status === 'upcoming' ? '#E0F2FE' : '#F3F4F6',
                            color: session.status === 'upcoming' ? '#0284C7' : '#6B7280'
                          }}>
                            {session.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          </Badge>
                          <Badge style={{
                            background: session.coverage === 'included' ? '#D1FAE5' : '#FEF3C7',
                            color: session.coverage === 'included' ? '#065F46' : '#92400E'
                          }}>
                            {session.coverage === 'included' ? 'Included in Plan' : 'Add-on (+15% Discount)'}
                          </Badge>
                          <span className="text-[18px] font-bold" style={{ color: '#265073' }}>
                            {session.date}
                          </span>
                        </div>
                        <p className="text-[16px] mb-2" style={{ color: '#6B7280' }}>
                          {session.time}
                        </p>
                        {session.status === 'upcoming' && (
                          <>
                            <p className="text-[16px]" style={{ color: '#6B7280' }}>
                              <strong>Type:</strong> {session.type}
                            </p>
                            <p className="text-[16px]" style={{ color: '#6B7280' }}>
                              <strong>Location:</strong> {session.location}
                            </p>
                          </>
                        )}
                        {session.type && session.status === 'completed' && (
                          <p className="text-[16px]" style={{ color: '#6B7280' }}>
                            <strong>Type:</strong> {session.type}
                          </p>
                        )}
                        <p className="text-[16px]" style={{ color: '#6B7280' }}>
                          <strong>Topics:</strong> {session.topics}
                        </p>
                        <p className="text-[16px]" style={{ color: '#6B7280' }}>
                          <strong>Instructor:</strong> {session.instructor}
                        </p>
                        {session.status === 'completed' && session.rating && (
                          <div className="mt-2">
                            <span className="text-[16px]" style={{ color: '#6B7280' }}>
                              Rating: {'⭐'.repeat(session.rating)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {session.status === 'upcoming' ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEditSession}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          <Button 
                            variant="outline" 
                            className="text-[16px] h-12 flex-1 min-w-[140px]"
                            onClick={onNavigateToReschedule}
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          <Button 
                            variant="outline" 
                            className="text-[16px] h-12 flex-1 min-w-[100px]"
                            onClick={() => setShowCancelModal(true)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          <Button 
                            variant="outline" 
                            className="text-[16px] h-12 flex-1 min-w-[140px]"
                            onClick={onNavigateToSessionDetails || (() => toast.info('Session details page coming soon!'))}
                          >
                            View Details
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                          <Button 
                            variant="outline" 
                            className="text-[16px] h-12 flex-1 min-w-[140px]"
                            onClick={onNavigateToSessionSummary || (() => toast.info('Session summary page coming soon!'))}
                          >
                            View Summary
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          <Button 
                            variant="outline" 
                            className="text-[16px] h-12 flex-1 min-w-[160px]"
                            onClick={() => toast.info('Video player coming soon!')}
                          >
                            Watch Recording
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          <Button 
                            variant="outline" 
                            className="text-[16px] h-12 flex-1 min-w-[160px]"
                            onClick={() => {
                              toast.success('✓ Downloading guide...');
                              // Trigger download
                            }}
                          >
                            Download Guide
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PROGRESS TAB */}
          <TabsContent value="progress" className="space-y-8" id="progress-section">
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Skills Progress</CardTitle>
                <CardDescription className="text-[16px]">Track {seniorData.name}&apos;s learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                      {skill.completed ? (
                        <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: '#16A34A' }} />
                      ) : skill.inProgress ? (
                        <Clock className="w-6 h-6 flex-shrink-0" style={{ color: '#F59E0B' }} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 flex-shrink-0" style={{ borderColor: '#E5E7EB' }}></div>
                      )}
                      <div className="flex-1">
                        <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>{skill.name}</p>
                        {skill.inProgress && (
                          <p className="text-[14px]" style={{ color: '#F59E0B' }}>In Progress</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Learning Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-[48px]">🔥</p>
                  <p className="text-[32px] font-bold" style={{ color: '#2D9596' }}>7 Day Streak</p>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>Keep up the great work!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Email me 3 days before sessions',
                  'Text me 1 day before sessions',
                  'Notify me when progress updates are posted'
                ].map((pref, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <label className="text-[16px]">{pref}</label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Account Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onNavigateToUpdatePayment || (() => toast.info('Payment method page coming soon!'))}
                >
                  Update Payment Method
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onNavigateToManagePlan}
                >
                  Change Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowPauseModal(true)}
                >
                  Pause Services
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => setShowRemoveModal(true)}
                >
                  Remove from My Care
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Session Dialog */}
        <Dialog open={showEditSessionModal} onOpenChange={setShowEditSessionModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[24px]" style={{ color: '#265073' }}>
                Edit Session Details
              </DialogTitle>
              <DialogDescription className="text-[16px]">
                Update the details for {seniorData.name}&apos;s upcoming session
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-[16px]">Date</Label>
                <Input
                  type="date"
                  defaultValue={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-[16px]">Time</Label>
                <select className="w-full h-12 px-4 rounded-lg border-2 mt-2" style={{ borderColor: '#E5E7EB' }}>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option selected>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              <div>
                <Label className="text-[16px]">Topics to Cover</Label>
                <Textarea
                  defaultValue="Two-Factor Authentication, Calendar App"
                  className="mt-2 min-h-[80px]"
                />
              </div>
              <div>
                <Label className="text-[16px]">Additional Notes for Instructor (Optional)</Label>
                <Textarea
                  placeholder="Any special requests or focus areas..."
                  className="mt-2 min-h-[60px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditSessionModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveSessionEdit}
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Session Modal */}
        <AlertDialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[24px]" style={{ color: '#265073' }}>
                Cancel this session?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[16px]">
                <div className="space-y-4 mt-4">
                  <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', borderLeft: '4px solid #F59E0B' }}>
                    <p className="font-semibold" style={{ color: '#92400E' }}>Session Details:</p>
                    <p style={{ color: '#92400E' }}>{upcomingSessionDate} at 2:00 PM</p>
                    <p style={{ color: '#92400E' }}>Two-Factor Authentication, Calendar App</p>
                    <p style={{ color: '#92400E' }}>In-home visit with Tea Araki</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold" style={{ color: '#265073' }}>Important Information:</p>
                    <ul className="space-y-1 text-[16px]" style={{ color: '#6B7280' }}>
                      <li>• Canceling less than 24 hours before = $20 late cancellation fee</li>
                      <li>• This session: 5 days away (no fee)</li>
                      <li>• {seniorData.name} will be notified immediately</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <label className="font-semibold" style={{ color: '#265073' }}>
                      Message to {seniorData.name} (optional):
                    </label>
                    <Textarea
                      value={cancelMessage}
                      onChange={(e) => setCancelMessage(e.target.value)}
                      defaultValue={`Hi Mom, I need to cancel your ${upcomingSessionDate} session. Let's reschedule soon!`}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', borderLeft: '4px solid #F59E0B' }}>
                <p className="font-semibold" style={{ color: '#92400E' }}>Session Details:</p>
                <p style={{ color: '#92400E' }}>December 1, 2025 at 2:00 PM</p>
                <p style={{ color: '#92400E' }}>Two-Factor Authentication, Calendar App</p>
                <p style={{ color: '#92400E' }}>In-home visit with Tea Araki</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#265073' }}>Important Information:</p>
                <ul className="space-y-1 text-[16px]" style={{ color: '#6B7280' }}>
                  <li>• Canceling less than 24 hours before = $20 late cancellation fee</li>
                  <li>• This session: 48 hours away (no fee)</li>
                  <li>• {seniorData.name} will be notified immediately</li>
                </ul>
              </div>

              <div className="space-y-2">
                <label className="font-semibold" style={{ color: '#265073' }}>
                  Message to {seniorData.name} (optional):
                </label>
                <Textarea
                  defaultValue={`Hi Mom, I need to cancel your December 1 session. Let's reschedule soon!`}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-[16px]">Never Mind</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancelSession}
                className="text-[16px]"
                style={{ background: '#DC2626', color: '#FFFFFF' }}
              >
                Cancel Session
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Cancel Confirmation Dialog with Print */}
        <Dialog open={showCancelConfirmation} onOpenChange={setShowCancelConfirmation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px] text-center" style={{ color: '#16A34A' }}>
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
                  <p><strong>Senior:</strong> {seniorData.name}</p>
                  <p><strong>Canceled Session:</strong> {upcomingSessionDate} at 2:00 PM</p>
                  <p><strong>Topics:</strong> Two-Factor Authentication, Calendar App</p>
                  <p><strong>Instructor Notified:</strong> Tea Araki</p>
                  <p><strong>Cancellation Fee:</strong> $0 (more than 24 hours notice)</p>
                  <p><strong>Confirmation #:</strong> CANC-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
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
        <AlertDialog open={showPauseModal} onOpenChange={setShowPauseModal}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[24px]" style={{ color: '#265073' }}>
                ⏸️ Pause Services for {seniorData.name}?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ background: '#E6F7F4', border: '1px solid #9AD0C2' }}>
                <p className="font-semibold mb-2" style={{ color: '#265073' }}>What Happens When You Pause:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span>No charges while paused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span>Current sessions will be honored</span>
                  </div>

                  <div>
                    <Label className="mb-2 block">Message to {seniorData.name} (Optional):</Label>
                    <Textarea
                      value={pauseMessage}
                      onChange={(e) => setPauseMessage(e.target.value)}
                      placeholder={`Let ${seniorData.name} know why you're pausing her services...`}
                      className="min-h-[80px]"
                    />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span>{seniorData.name} keeps access to learning resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span>You can resume anytime</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
                <p className="font-semibold mb-2" style={{ color: '#92400E' }}>Note:</p>
                <div className="space-y-1">
                  <p style={{ color: '#92400E' }}>⚠️ {seniorData.name} won't be able to book new sessions</p>
                  <p style={{ color: '#92400E' }}>⚠️ Scheduled future sessions will be canceled</p>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Message to {seniorData.name} (Optional):</Label>
                <Textarea 
                  placeholder={`Let ${seniorData.name} know why you're pausing her services...`}
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-[16px]">Never Mind</AlertDialogCancel>
              <AlertDialogAction
                onClick={handlePauseServices}
                className="text-[16px]"
                style={{ background: '#F59E0B', color: '#FFFFFF' }}
              >
                Pause Services
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Pause Confirmation Dialog with Print */}
        <Dialog open={showPauseConfirmation} onOpenChange={setShowPauseConfirmation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px] text-center" style={{ color: '#F59E0B' }}>
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

                  <div className="space-y-2">
                    <Label>Type "{seniorData.name}" to confirm:</Label>
                    <Input
                      value={removeConfirmName}
                      onChange={(e) => setRemoveConfirmName(e.target.value)}
                      placeholder={seniorData.name}
                    />
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

                  <div>
                    <Label className="mb-2 block">Why do you need this access?</Label>
                    <Textarea
                      placeholder={`Tell ${seniorData.name} why you'd like additional permissions. This helps her feel comfortable approving your request.`}
                      className="min-h-[100px]"
                    />
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
