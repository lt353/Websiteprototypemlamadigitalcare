import { useState } from 'react';
import { Calendar, MapPin, Video, User, X, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';

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

export function SessionsPage({ onBack, onNavigateToBooking, onRescheduleSuccess, onCancelSuccess, upcomingSession }: SessionsPageProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('9:00 AM');

  const completedSessions = [
    {
      id: 1,
      date: 'November 21, 2025',
      dateShort: { month: 'NOV', day: '21', year: '2025' },
      type: 'Virtual Session',
      technician: 'Lindsay Trenton',
      duration: '60 minutes',
      topics: 'Password Management, Browser Security',
      rating: 5,
      notes: 'We set up a password manager (LastPass) and organized Joyce\'s most important accounts. Reviewed how to identify secure websites and enable two-factor authentication on her email.'
    },
    {
      id: 2,
      date: 'November 14, 2025',
      dateShort: { month: 'NOV', day: '14', year: '2025' },
      type: 'In-Home Session',
      technician: 'Tea Araki',
      duration: '90 minutes',
      topics: 'iPhone Basics, Photo Organization',
      rating: 5,
      notes: 'Helped Joyce organize her photo library into albums by family members and events. Set up iCloud Photo sharing with her daughter in California.'
    },
    {
      id: 3,
      date: 'November 7, 2025',
      dateShort: { month: 'NOV', day: '07', year: '2025' },
      type: 'Virtual Session',
      technician: 'DJ Sable',
      duration: '60 minutes',
      topics: 'Zoom Video Calling',
      rating: 5,
      notes: 'Walked through joining Zoom meetings, using mute/unmute, turning camera on/off, and screen sharing basics for her book club meetings.'
    },
    {
      id: 4,
      date: 'October 30, 2025',
      dateShort: { month: 'OCT', day: '30', year: '2025' },
      type: 'In-Home Session',
      technician: 'Lindsay Trenton',
      duration: '90 minutes',
      topics: 'Email Basics, Spam Recognition',
      rating: 5,
      notes: 'Set up email folders and filters. Practiced identifying phishing emails. Created a system for managing daily emails without feeling overwhelmed.'
    },
    {
      id: 5,
      date: 'October 23, 2025',
      dateShort: { month: 'OCT', day: '23', year: '2025' },
      type: 'Virtual Session',
      technician: 'Tea Araki',
      duration: '60 minutes',
      topics: 'Facebook Basics, Privacy Settings',
      rating: 4,
      notes: 'Reviewed Facebook privacy settings and how to control who sees posts. Practiced sharing photos with family and responding to comments.'
    }
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-[18px] hover:underline"
          style={{ color: '#2D9596' }}
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-[40px] font-bold mb-2" style={{ color: '#265073' }}>
          My Sessions
        </h1>
        <p className="text-[22px] mb-8" style={{ color: '#4B5563' }}>
          Your learning journey
        </p>

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
          /* Upcoming Session Card */
          <div className="bg-white rounded-xl border-2 p-6 mb-6" style={{ borderColor: '#2D9596' }}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 text-center">
                <div className="text-[14px] font-bold mb-1" style={{ color: '#4B5563' }}>NOV</div>
                <div className="text-[36px] font-bold" style={{ color: '#2D9596' }}>28</div>
                <div className="text-[14px]" style={{ color: '#4B5563' }}>2025</div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[14px] font-bold" style={{ background: '#DBEAFE', color: '#2D9596' }}>
                    UPCOMING
                  </span>
                  <span className="px-3 py-1 rounded-full text-[14px] font-bold" style={{ background: '#FEE2E2', color: '#EF4444' }}>
                    In 3 days
                  </span>
                </div>

                <h3 className="text-[24px] font-bold mb-2" style={{ color: '#265073' }}>
                  In-Home Session
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <User className="w-5 h-5" />
                    <span>with Tea Araki</span>
                  </div>
                  <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <Calendar className="w-5 h-5" />
                    <span>November 28, 2025 at 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                    <MapPin className="w-5 h-5" />
                    <span>At your home</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[16px] font-bold mb-2" style={{ color: '#265073' }}>Topics:</p>
                  <p className="text-[16px]" style={{ color: '#4B5563' }}>Email Management, Two-Factor Authentication</p>
                </div>

                <div className="flex flex-wrap gap-3">
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
                    style={{ borderColor: '#EF4444', color: '#EF4444' }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Completed Sessions List */
          <div className="space-y-6">
            {completedSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl border-2 p-6" style={{ borderColor: '#D1D5DB' }}>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-[14px] font-bold mb-1" style={{ color: '#4B5563' }}>{session.dateShort.month}</div>
                    <div className="text-[36px] font-bold" style={{ color: '#10B981' }}>{session.dateShort.day}</div>
                    <div className="text-[14px]" style={{ color: '#4B5563' }}>{session.dateShort.year}</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-[14px] font-bold" style={{ background: '#D1FAE5', color: '#10B981' }}>
                        COMPLETED
                      </span>
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
                        {session.type.includes('Virtual') ? <Video className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                        <span>{session.duration}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-[16px] font-bold mb-1" style={{ color: '#265073' }}>Topics:</p>
                      <p className="text-[16px]" style={{ color: '#4B5563' }}>{session.topics}</p>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[28px]" style={{ color: i < session.rating ? '#2D9596' : '#D1D5DB' }}>★</span>
                      ))}
                      <span className="ml-2 text-[16px]" style={{ color: '#4B5563' }}>{session.rating}.0</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={onNavigateToBooking}
                        className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                        style={{ background: '#2D9596', color: '#FFFFFF' }}
                      >
                        Book Again
                      </Button>
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
                  <strong>Current appointment:</strong> November 28, 2025 at 2:00 PM
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
                Are you sure you want to cancel your session on November 28, 2025?
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
