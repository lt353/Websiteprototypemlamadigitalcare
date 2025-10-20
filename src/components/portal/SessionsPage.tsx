import { useState } from 'react';
import { Calendar, MapPin, Video, User, X, Check, Plus, Edit3, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface SessionsPageProps {
  onBack: () => void;
  onNavigateToBooking?: () => void;
  onRescheduleSuccess: (rescheduleData: any) => void;
  onCancelSuccess: () => void;
  upcomingSession: {
    date: string;
    time: string;
    type: string;
    technician: string;
    topics: string;
  };
}

// Helper function to get relative date
const getRelativeDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Helper function to format date for display
const formatLongDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// Helper function to get short date format
const formatShortDate = (date: Date) => {
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate().toString(),
    year: date.getFullYear().toString()
  };
};

export function SessionsPage({ onBack, onNavigateToBooking, onRescheduleSuccess, onCancelSuccess, upcomingSession }: SessionsPageProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('9:00 AM');
  
  // Edit session state
  const [editTopics, setEditTopics] = useState<string[]>(['Email Management', 'Scam Discussion']);
  const [newTopic, setNewTopic] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Suggested topic options
  const suggestedTopics = [
    'iPhone/iPad Basics',
    'Email Management',
    'Video Calling (FaceTime, Zoom)',
    'Photo Organization',
    'Text Messaging',
    'Scam Prevention',
    'Social Media (Facebook, Instagram)',
    'Online Banking',
    'Calendar & Reminders',
    'App Store & Downloads',
    'Settings & Accessibility',
    'Password Management',
    'Cloud Storage (iCloud, Google Drive)',
    'Web Browsing & Search',
    'Online Shopping Safety',
    'Video Streaming (Netflix, YouTube)',
    'Voice Assistants (Siri, Alexa)',
    'Smart Home Devices',
    'Health Apps & Monitoring',
    'Transportation Apps (Uber, Lyft)'
  ];

  // Dynamic upcoming session date (2 days from today)
  const upcomingDate = getRelativeDate(2);
  const upcomingShortDate = formatShortDate(upcomingDate);
  const upcomingLongDate = formatLongDate(upcomingDate);

  // Realistic 2-month timeline for Standard plan (1 in-person OR 3 virtual per month)
  // Michele has been adding extra sessions, showing value and justifying Premium consideration
  const completedSessions = [
    {
      id: 1,
      date: formatLongDate(getRelativeDate(-7)), // 1 week ago
      dateShort: formatShortDate(getRelativeDate(-7)),
      type: 'Virtual Session',
      technician: 'Lindsay Trenton',
      duration: '60 minutes',
      topics: 'Email Organization, Spam Filters',
      rating: 5,
      isPlanSession: true, // Part of plan (October virtual track - 1 of 3)
      notes: 'Helped Michele set up email folders and filters to better manage her inbox. Reviewed her spam folder settings and practiced identifying suspicious emails. She\'s much more organized now!'
    },
    {
      id: 2,
      date: formatLongDate(getRelativeDate(-21)), // 3 weeks ago
      dateShort: formatShortDate(getRelativeDate(-21)),
      type: 'In-Home Session',
      technician: 'Tea Araki',
      duration: '90 minutes',
      topics: 'iPhone Photo Organization, iCloud Setup',
      rating: 5,
      isPlanSession: false, // Add-on (already used Sept in-home on Sept 8)
      price: 72.25, // 15% discount applied ($85 → $72.25)
      originalPrice: 85,
      notes: 'Helped Michele organize her photo library into albums by family members and events. Set up iCloud Photo sharing with her daughter in California so they can easily share family photos back and forth.'
    },
    {
      id: 3,
      date: formatLongDate(getRelativeDate(-28)), // 4 weeks ago
      dateShort: formatShortDate(getRelativeDate(-28)),
      type: 'Virtual Session',
      technician: 'DJ Sable',
      duration: '60 minutes',
      topics: 'Zoom Basics for Book Club',
      rating: 5,
      isPlanSession: false, // Add-on
      price: 29.75, // 15% discount applied ($35 → $29.75)
      originalPrice: 35,
      notes: 'Walked through joining Zoom meetings, using mute/unmute, turning camera on/off, and screen sharing basics. Michele can now confidently join her book club\'s virtual meetings each week.'
    },
    {
      id: 4,
      date: formatLongDate(getRelativeDate(-42)), // 6 weeks ago
      dateShort: formatShortDate(getRelativeDate(-42)),
      type: 'In-Home Session',
      technician: 'Tea Araki',
      duration: '90 minutes',
      topics: 'iPhone Basics, Essential Apps',
      rating: 5,
      isPlanSession: true, // Part of plan (Month 1)
      notes: 'First regular session after Michele signed up! Covered iPhone navigation, Siri basics, adjusting settings for comfortable text size. Went through her most-used apps and organized her home screen logically.'
    },
    {
      id: 5,
      date: formatLongDate(getRelativeDate(-56)), // 8 weeks ago
      dateShort: formatShortDate(getRelativeDate(-56)),
      type: 'In-Home Session',
      technician: 'Tea Araki',
      duration: '90 minutes',
      topics: 'Initial Consultation & Needs Assessment',
      rating: 5,
      isPlanSession: false, // Initial consultation (before signing up)
      isDiscountedAssessment: true, // 20% off first assessment
      originalPrice: 85,
      discountedPrice: 68,
      discountPercent: 20,
      notes: 'First meeting with Michele! Got to know her tech goals and concerns. Assessed her comfort level with iPhone and computer. Created a personalized learning plan focusing on: staying safe from scams, communicating with family, and organizing photos. Michele signed up for our Standard plan after this session!'
    }
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-[22px] font-medium hover:underline"
          style={{ color: '#2D9596' }}
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-[40px] font-bold mb-2" style={{ color: '#265073' }}>
          My Sessions
        </h1>
        <p className="text-[22px] mb-4" style={{ color: '#4B5563' }}>
          Your learning journey with Mālama
        </p>

        {/* Plan Info Banner */}
        <div className="mb-6 p-4 rounded-lg border-2" style={{ 
          background: '#F0FDFA', 
          borderColor: '#2D9596' 
        }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[14px] font-bold mb-1" style={{ color: '#2D9596' }}>
                CURRENT PLAN: STANDARD
              </p>
              <p className="text-[14px]" style={{ color: '#4B5563' }}>
                1 in-person OR 3 virtual sessions per month • Extra sessions available as add-ons
              </p>
            </div>
            <button
              onClick={() => {
                // In real implementation, navigate to plan upgrade page
                alert('In the live version, this would show plan comparison and upgrade options.');
              }}
              className="px-4 py-2 rounded-lg font-bold text-[14px] transition-all active:scale-95"
              style={{
                background: '#F59E0B',
                color: '#FFFFFF',
              }}
            >
              View Premium Plan
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2" style={{ borderColor: '#D1D5DB' }}>
          <button
            onClick={() => setActiveTab('upcoming')}
            className="px-6 py-3 text-[18px] font-bold border-b-4 active:scale-95 transition-all"
            style={{
              borderColor: activeTab === 'upcoming' ? '#2D9596' : 'transparent',
              color: activeTab === 'upcoming' ? '#2D9596' : '#4B5563'
            }}
          >
            Upcoming (1)
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className="px-6 py-3 text-[18px] font-medium active:scale-95 transition-all"
            style={{
              borderColor: activeTab === 'completed' ? '#2D9596' : 'transparent',
              color: activeTab === 'completed' ? '#2D9596' : '#4B5563'
            }}
          >
            Completed ({completedSessions.length})
          </button>
        </div>

        {activeTab === 'upcoming' ? (
          /* Upcoming Session Card - Dynamic Date */
          <div className="bg-white rounded-xl border-2 p-6 mb-6" style={{ borderColor: '#2D9596' }}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 text-center">
                <div className="text-[14px] font-bold mb-1" style={{ color: '#4B5563' }}>{upcomingShortDate.month}</div>
                <div className="text-[36px] font-bold" style={{ color: '#2D9596' }}>{upcomingShortDate.day}</div>
                <div className="text-[14px]" style={{ color: '#4B5563' }}>{upcomingShortDate.year}</div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[14px] font-bold" style={{ background: '#DBEAFE', color: '#2D9596' }}>
                    UPCOMING
                  </span>
                  <span className="px-3 py-1 rounded-full text-[14px] font-bold" style={{ background: '#FEE2E2', color: '#EF4444' }}>
                    In 2 days
                  </span>
                  <span className="px-3 py-1 rounded-full text-[14px] font-bold flex items-center gap-1" style={{ background: '#D1FAE5', color: '#065F46' }}>
                    <Check className="w-3 h-3" />
                    INCLUDED IN PLAN
                  </span>
                </div>

                <h3 className="text-[24px] font-bold mb-2" style={{ color: '#265073' }}>
                  Virtual Session
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <User className="w-5 h-5" />
                    <span>with Tea Araki</span>
                  </div>
                  <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <Calendar className="w-5 h-5" />
                    <span>{upcomingLongDate} at 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <Video className="w-5 h-5" />
                    <span>Online via video call</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[16px] font-bold mb-2" style={{ color: '#265073' }}>Topics:</p>
                  <p className="text-[16px]" style={{ color: '#4B5563' }}>Email Management, Scam Discussion</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => {
                      setEditTopics(['Email Management', 'Scam Discussion']);
                      setAdditionalNotes('');
                      setShowEditDialog(true);
                    }}
                    variant="outline"
                    className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                    style={{ borderColor: '#2D9596', color: '#2D9596' }}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Session
                  </Button>
                  <Button
                    onClick={() => setShowRescheduleDialog(true)}
                    variant="outline"
                    className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                    style={{ borderColor: '#F59E0B', color: '#F59E0B' }}
                  >
                    Reschedule
                  </Button>
                  <Button
                    onClick={() => setShowCancelDialog(true)}
                    variant="outline"
                    className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                    style={{ borderColor: '#DC2626', color: '#DC2626' }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Completed Sessions */
          <div className="space-y-6">
            {completedSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl border-2 p-6" style={{ borderColor: '#D1D5DB' }}>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-[14px] font-bold mb-1" style={{ color: '#4B5563' }}>{session.dateShort.month}</div>
                    <div className="text-[36px] font-bold" style={{ color: '#16A34A' }}>{session.dateShort.day}</div>
                    <div className="text-[14px]" style={{ color: '#4B5563' }}>{session.dateShort.year}</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-[14px] font-bold" style={{ background: '#D1FAE5', color: '#16A34A' }}>
                        COMPLETED
                      </span>
                      {session.isPlanSession ? (
                        <span className="px-3 py-1 rounded-full text-[14px] font-bold flex items-center gap-1" style={{ background: '#DBEAFE', color: '#1E40AF' }}>
                          <Check className="w-3 h-3" />
                          PLAN SESSION
                        </span>
                      ) : session.isDiscountedAssessment ? (
                        <span className="px-3 py-1 rounded-full text-[14px] font-bold flex items-center gap-1" style={{ background: '#D1FAE5', color: '#065F46' }}>
                          ✓ {session.discountPercent}% OFF
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[14px] font-bold flex items-center gap-1" style={{ background: '#FEF3C7', color: '#92400E' }}>
                          <Plus className="w-3 h-3" />
                          ADD-ON ${session.price}
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        {[...Array(session.rating)].map((_, i) => (
                          <span key={i} className="text-[#F59E0B] text-[18px]">★</span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-[24px] font-bold mb-2" style={{ color: '#265073' }}>
                      {session.type}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <User className="w-5 h-5" />
                        <span>with {session.technician}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <Calendar className="w-5 h-5" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        {session.type === 'Virtual Session' ? (
                          <>
                            <Video className="w-5 h-5" />
                            <span>Online ({session.duration})</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-5 h-5" />
                            <span>At your home ({session.duration})</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-[16px] font-bold mb-2" style={{ color: '#265073' }}>Topics Covered:</p>
                      <p className="text-[16px]" style={{ color: '#4B5563' }}>{session.topics}</p>
                    </div>

                    {/* Pricing Info for Add-ons and Discounted Sessions */}
                    {(session.isDiscountedAssessment || (!session.isPlanSession && session.price)) && (
                      <div className="mb-4 p-3 rounded-lg" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                        <p className="text-[14px] font-bold mb-1" style={{ color: '#265073' }}>
                          {session.isDiscountedAssessment ? 'Discounted Assessment Pricing:' : 'Add-on Session Cost:'}
                        </p>
                        {session.isDiscountedAssessment ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] line-through" style={{ color: '#9CA3AF' }}>
                              ${session.originalPrice}
                            </span>
                            <span className="text-[20px] font-bold" style={{ color: '#065F46' }}>
                              ${session.discountedPrice}
                            </span>
                            <span className="px-2 py-1 rounded text-[12px] font-bold" style={{ background: '#D1FAE5', color: '#065F46' }}>
                              SAVE ${session.originalPrice - session.discountedPrice}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            {session.originalPrice && (
                              <span className="text-[16px] line-through" style={{ color: '#9CA3AF' }}>
                                ${session.originalPrice}
                              </span>
                            )}
                            <span className="text-[20px] font-bold" style={{ color: '#065F46' }}>
                              ${session.price}
                            </span>
                            {session.originalPrice && (
                              <span className="px-2 py-1 rounded text-[12px] font-bold" style={{ background: '#D1FAE5', color: '#065F46' }}>
                                15% OFF (SAVE ${(session.originalPrice - session.price).toFixed(2)})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => {
                          setSelectedSession(session);
                          setShowNotesDialog(true);
                        }}
                        variant="outline"
                        className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                        style={{ borderColor: '#265073', color: '#265073' }}
                      >
                        View Notes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Session Usage Summary */}
            <div className="mt-8 p-6 rounded-xl border-2" style={{ 
              background: '#FFFBEB',
              borderColor: '#F59E0B'
            }}>
              <h3 className="text-[20px] font-bold mb-4" style={{ color: '#92400E' }}>
                Your Session Usage (Past 2 Months)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px]" style={{ color: '#78350F' }}>
                    Plan Sessions Used:
                  </span>
                  <span className="text-[18px] font-bold" style={{ color: '#92400E' }}>
                    1 in-home + 1 virtual
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px]" style={{ color: '#78350F' }}>
                    Add-On Sessions:
                  </span>
                  <span className="text-[18px] font-bold" style={{ color: '#92400E' }}>
                    1 virtual ($29.75) + 1 in-home ($72.25) = $102 with 15% discount
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px]" style={{ color: '#78350F' }}>
                    Initial Assessment (20% off):
                  </span>
                  <span className="text-[18px] font-bold" style={{ color: '#065F46' }}>
                    $68 (saved $17)
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t-2" style={{ borderColor: '#FCD34D' }}>
                  <span className="text-[16px]" style={{ color: '#78350F' }}>
                    Total Sessions:
                  </span>
                  <span className="text-[18px] font-bold" style={{ color: '#92400E' }}>
                    5 completed + 1 upcoming
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[16px]" style={{ color: '#78350F' }}>
                    Total Paid (Add-ons):
                  </span>
                  <span className="text-[18px] font-bold" style={{ color: '#92400E' }}>
                    $170 ($68 + $102)
                  </span>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg" style={{ background: '#FFFFFF' }}>
                <p className="text-[14px] mb-2" style={{ color: '#78350F' }}>
                  💡 <strong>Considering Premium?</strong>
                </p>
                <p className="text-[14px] mb-3" style={{ color: '#6B7280' }}>
                  You've added 2 extra sessions ($102 with member discount) plus the discounted assessment ($68). With Premium, you get more sessions included and could save on future add-ons!
                </p>
                <button
                  onClick={() => {
                    alert('In the live version, this would show detailed plan comparison and upgrade options.');
                  }}
                  className="w-full h-12 rounded-lg font-bold text-[16px] transition-all active:scale-95"
                  style={{
                    background: '#F59E0B',
                    color: '#FFFFFF',
                  }}
                >
                  Compare Plans & Upgrade
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Dialog */}
        <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>Reschedule Session</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Choose a new date and time for your session with Tea Araki
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="mb-6 p-4 rounded-lg" style={{ background: '#FEF3C7' }}>
                <p className="text-[14px]" style={{ color: '#92400E' }}>
                  <strong>Current appointment:</strong> {upcomingLongDate} at 2:00 PM
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[18px] font-bold block mb-2" style={{ color: '#265073' }}>
                    New Date
                  </label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full h-14 px-4 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#E5E7EB' }}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="text-[18px] font-bold block mb-2" style={{ color: '#265073' }}>
                    New Time
                  </label>
                  <select
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full h-14 px-4 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#E5E7EB' }}
                  >
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="text-[18px] font-bold block mb-2" style={{ color: '#265073' }}>
                    Reason for Rescheduling (Optional)
                  </label>
                  <textarea
                    className="w-full h-20 px-4 py-3 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#D1D5DB' }}
                    placeholder="Let us know if there's anything we should prepare..."
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg mb-4" style={{ background: '#F0FDFA' }}>
                <p className="text-[14px]" style={{ color: '#065F46' }}>
                  <strong>Note:</strong> We'll call you within 2 hours to confirm your new appointment time.
                </p>
              </div>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowRescheduleDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onRescheduleSuccess({
                    date: new Date(rescheduleDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    time: rescheduleTime
                  });
                  setShowRescheduleDialog(false);
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#F59E0B', color: '#FFFFFF' }}
              >
                Submit Reschedule Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#EF4444' }}>Cancel Session</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Are you sure you want to cancel your session on {upcomingLongDate}?
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                You can reschedule for another time instead of canceling completely.
              </p>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowCancelDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Keep Session
              </Button>
              <Button
                onClick={() => {
                  onCancelSuccess();
                  setShowCancelDialog(false);
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#DC2626', color: '#FFFFFF' }}
              >
                Yes, Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Session Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>
                Edit Session Details
              </DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Update the topics and notes for your upcoming session with Tea Araki
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              {/* Current Session Info */}
              <div className="p-4 rounded-lg" style={{ background: '#F0FDFA', border: '2px solid #2D9596' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5" style={{ color: '#2D9596' }} />
                  <p className="text-[16px] font-bold" style={{ color: '#265073' }}>
                    {upcomingLongDate} at 2:00 PM
                  </p>
                </div>
                <p className="text-[14px]" style={{ color: '#4B5563' }}>
                  Virtual Session (60 minutes)
                </p>
              </div>

              {/* Topics Section */}
              <div>
                <label className="text-[18px] font-bold block mb-3" style={{ color: '#265073' }}>
                  Session Topics
                </label>
                <p className="text-[14px] mb-3" style={{ color: '#6B7280' }}>
                  What would you like to learn or discuss in this session?
                </p>
                
                {/* Current Topics List */}
                {editTopics.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-[14px] font-bold mb-2" style={{ color: '#2D9596' }}>
                      Selected Topics:
                    </p>
                    {editTopics.map((topic, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border-2"
                        style={{ borderColor: '#E5E7EB', background: '#F0FDFA' }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                          <span className="text-[16px]" style={{ color: '#265073' }}>{topic}</span>
                        </div>
                        <button
                          onClick={() => {
                            const newTopics = editTopics.filter((_, i) => i !== index);
                            setEditTopics(newTopics);
                            toast.success('Topic removed');
                          }}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors active:scale-95"
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Topic Selection */}
                <div className="mb-4">
                  <p className="text-[14px] font-bold mb-2" style={{ color: '#265073' }}>
                    Quick Add - Choose from common topics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTopics.filter(topic => !editTopics.includes(topic)).slice(0, 8).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setEditTopics([...editTopics, topic]);
                          toast.success(`Added "${topic}"`);
                        }}
                        className="px-3 py-2 rounded-lg border-2 text-[14px] font-medium transition-all active:scale-95 hover:shadow-md"
                        style={{ 
                          borderColor: '#2D9596', 
                          color: '#2D9596',
                          background: '#FFFFFF'
                        }}
                      >
                        + {topic}
                      </button>
                    ))}
                  </div>
                  {suggestedTopics.filter(topic => !editTopics.includes(topic)).length > 8 && (
                    <button
                      onClick={() => {
                        // Show all topics in a scrollable area
                      }}
                      className="mt-2 text-[14px] underline"
                      style={{ color: '#2D9596' }}
                    >
                      See all {suggestedTopics.length} topic options →
                    </button>
                  )}
                </div>

                {/* Custom Topic Input */}
                <div>
                  <p className="text-[14px] font-bold mb-2" style={{ color: '#265073' }}>
                    Or add your own topic:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="Type a custom topic..."
                      className="flex-1 h-12 px-4 rounded-lg border-2 text-[16px]"
                      style={{ borderColor: '#E5E7EB' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newTopic.trim()) {
                          setEditTopics([...editTopics, newTopic.trim()]);
                          setNewTopic('');
                          toast.success('Topic added!');
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (newTopic.trim()) {
                          setEditTopics([...editTopics, newTopic.trim()]);
                          setNewTopic('');
                          toast.success('Topic added!');
                        }
                      }}
                      disabled={!newTopic.trim()}
                      className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Notes Section */}
              <div>
                <label className="text-[18px] font-bold block mb-3" style={{ color: '#265073' }}>
                  Additional Notes or Questions
                </label>
                <p className="text-[14px] mb-3" style={{ color: '#6B7280' }}>
                  Share any specific questions, concerns, or things you'd like your technician to know before the session
                </p>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-lg border-2 text-[16px]"
                  style={{ borderColor: '#E5E7EB' }}
                  placeholder="Example: I'm having trouble with my email app crashing. Also, my grandson showed me how to use FaceTime but I forgot the steps..."
                />
                <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                  {additionalNotes.length} / 500 characters
                </p>
              </div>

              {/* Help Box */}
              <div className="p-4 rounded-lg" style={{ background: '#EFF6FF', border: '2px solid #3B82F6' }}>
                <p className="text-[16px] font-bold mb-2" style={{ color: '#1E40AF' }}>
                  💡 Tips for a Great Session
                </p>
                <ul className="space-y-1 text-[14px]" style={{ color: '#1E3A8A' }}>
                  <li>• Be specific about what you want to learn</li>
                  <li>• Mention any devices or apps you'll be using</li>
                  <li>• Share what you've already tried if you're troubleshooting</li>
                  <li>• Your technician will review these notes before your session</li>
                </ul>
              </div>
            </div>

            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowEditDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowEditDialog(false);
                  toast.success('✓ Session details updated! Your technician has been notified.', {
                    duration: 4000,
                  });
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform flex items-center gap-2"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                <Check className="w-5 h-5" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Notes Dialog */}
        <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>Session Notes</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                {selectedSession?.date} - {selectedSession?.technician}
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="mb-4">
                <p className="text-[18px] font-bold mb-2" style={{ color: '#265073' }}>Topics Covered:</p>
                <p className="text-[16px]" style={{ color: '#4B5563' }}>{selectedSession?.topics}</p>
              </div>
              <div>
                <p className="text-[18px] font-bold mb-2" style={{ color: '#265073' }}>Session Summary:</p>
                <p className="text-[16px] leading-relaxed" style={{ color: '#4B5563' }}>{selectedSession?.notes}</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setShowNotesDialog(false)}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}




