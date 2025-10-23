import { Home, Calendar, Users, Clock, MapPin, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

interface TeacherDashboardProps {
  currentView: string;
  onNavigate: (view: string, data?: any) => void;
  onLogout: () => void;
}

export function TeacherDashboard({ currentView, onNavigate, onLogout }: TeacherDashboardProps) {
  // Sample data for today's classes
  const todaysClasses = [
    {
      id: '1',
      topic: 'iPhone Basics for Beginners',
      time: '10:00 AM - 10:45 AM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      expectedAttendance: 10,
      status: 'upcoming' as const
    },
    {
      id: '2',
      topic: 'Video Calling with Family',
      time: '2:00 PM - 2:45 PM',
      venue: "'Ilima at Leihano",
      address: '1130 N Nimitz Hwy, Honolulu, HI 96817',
      expectedAttendance: 12,
      status: 'today' as const
    }
  ];

  // Weekly stats
  const weeklyStats = [
    { label: 'Classes This Week', value: '8', color: '#2D9596' },
    { label: 'Students Taught', value: '84', color: '#E67E50' },
    { label: 'Pending Follow-ups', value: '3', color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <img
              src={logoWithTagline}
              alt="Mālama Digital Care"
              className="h-12 w-auto"
            />

            {/* Teacher Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                  Lindsay, Tea & DJ
                </p>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>
                  Digital Care Guides
                </p>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="h-10 px-4"
                style={{
                  borderColor: '#E5E7EB',
                  color: '#6B7280'
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Aloha, Digital Care Guides!
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Here's what's happening today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {weeklyStats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl p-6 border-2"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E7EB'
              }}
            >
              <p className="text-[16px] mb-2" style={{ color: '#6B7280' }}>
                {stat.label}
              </p>
              <p className="text-[48px] font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Today's Classes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[28px] font-bold" style={{ color: '#265073' }}>
              Today's Classes
            </h2>
            <Button
              onClick={() => onNavigate('schedule')}
              className="h-12 px-6"
              style={{
                background: '#2D9596',
                color: '#FFFFFF'
              }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Full Schedule
            </Button>
          </div>

          {todaysClasses.length > 0 ? (
            <div className="space-y-4">
              {todaysClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="rounded-xl p-6 border-2 hover:shadow-lg transition-all cursor-pointer"
                  style={{
                    background: '#FFFFFF',
                    borderColor: classItem.status === 'today' ? '#E67E50' : '#E5E7EB'
                  }}
                  onClick={() => onNavigate('pre-class-prep', { classSession: {
                    id: classItem.id,
                    topic: classItem.topic,
                    date: new Date().toLocaleDateString(),
                    time: classItem.time,
                    venue: classItem.venue,
                    address: classItem.address,
                    duration: '45 min',
                    price: 15,
                    expectedAttendance: classItem.expectedAttendance,
                    materialsNeeded: [
                      'Follow-up QR cards',
                      'Laptop for projecting demos',
                      'iPad/phone for quick portal updates'
                    ],
                    status: classItem.status
                  }})}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Class Title */}
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-[24px] font-bold" style={{ color: '#265073' }}>
                          {classItem.topic}
                        </h3>
                        {classItem.status === 'today' && (
                          <span
                            className="px-3 py-1 rounded-full text-[14px] font-semibold"
                            style={{
                              background: '#E67E50',
                              color: '#FFFFFF'
                            }}
                          >
                            Happening Soon
                          </span>
                        )}
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Time */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#E6F7F4' }}
                          >
                            <Clock className="w-5 h-5" style={{ color: '#2D9596' }} />
                          </div>
                          <div>
                            <p className="text-[14px]" style={{ color: '#6B7280' }}>
                              Time
                            </p>
                            <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                              {classItem.time}
                            </p>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#E6F7F4' }}
                          >
                            <MapPin className="w-5 h-5" style={{ color: '#2D9596' }} />
                          </div>
                          <div>
                            <p className="text-[14px]" style={{ color: '#6B7280' }}>
                              Venue
                            </p>
                            <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                              {classItem.venue}
                            </p>
                          </div>
                        </div>

                        {/* Expected Attendance */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#E6F7F4' }}
                          >
                            <Users className="w-5 h-5" style={{ color: '#2D9596' }} />
                          </div>
                          <div>
                            <p className="text-[14px]" style={{ color: '#6B7280' }}>
                              Expected
                            </p>
                            <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                              {classItem.expectedAttendance} registered
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                        <p className="text-[14px] mb-2" style={{ color: '#6B7280' }}>
                          Full Address:
                        </p>
                        <p className="text-[16px] font-medium" style={{ color: '#265073' }}>
                          {classItem.address}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: '#9CA3AF' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl p-12 text-center"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E7EB',
                border: '2px dashed #E5E7EB'
              }}
            >
              <p className="text-[20px]" style={{ color: '#6B7280' }}>
                No classes scheduled for today. Enjoy your day off!
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('schedule')}
            className="rounded-xl p-6 text-left hover:shadow-lg transition-all border-2"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                  Weekly Schedule
                </h3>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>
                  View all upcoming classes and plan ahead
                </p>
              </div>
              <Calendar className="w-8 h-8" style={{ color: '#2D9596' }} />
            </div>
          </button>

          <div
            className="rounded-xl p-6 border-2"
            style={{
              background: '#F0FDFA',
              borderColor: '#2D9596'
            }}
          >
            <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
              Quick Tip
            </h3>
            <p className="text-[16px]" style={{ color: '#6B7280' }}>
              Remember to arrive 15 minutes early to set up materials and greet early arrivals.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden border-t z-40"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}
      >
        <div className="grid grid-cols-2 h-20">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex flex-col items-center justify-center gap-1"
            style={{
              background: currentView === 'dashboard' ? '#E6F7F4' : 'transparent',
              color: currentView === 'dashboard' ? '#2D9596' : '#6B7280'
            }}
          >
            <Home className="w-6 h-6" />
            <span className="text-[12px] font-medium">Home</span>
          </button>
          <button
            onClick={() => onNavigate('schedule')}
            className="flex flex-col items-center justify-center gap-1"
            style={{
              background: currentView === 'schedule' ? '#E6F7F4' : 'transparent',
              color: currentView === 'schedule' ? '#2D9596' : '#6B7280'
            }}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-[12px] font-medium">Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
}
