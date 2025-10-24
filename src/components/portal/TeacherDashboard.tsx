import { Home, Calendar, Users, Clock, MapPin, LogOut, ChevronRight, History, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

interface TeacherDashboardProps {
  currentView: string;
  onNavigate: (view: string, data?: any) => void;
  onLogout: () => void;
}

export function TeacherDashboard({ currentView, onNavigate, onLogout }: TeacherDashboardProps) {
  // Helper to check if a class time has passed
  const isClassCompleted = (timeStr: string) => {
    const now = new Date();
    const [timeRange] = timeStr.split(' - ');
    const [time, period] = timeRange.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;

    const classTime = new Date(now);
    classTime.setHours(hour24, minutes || 0, 0, 0);

    return now > classTime;
  };

  // Sample data for today's classes with dynamic statuses
  const allTodaysClasses = [
    {
      id: '1',
      topic: 'iPhone Basics for Beginners',
      time: '10:00 AM - 10:45 AM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      expectedAttendance: 10,
      classType: 'group' as const,
      studentName: null,
      customNotes: null
    },
    {
      id: '2',
      topic: 'FaceTime Help with Grandkids',
      time: '12:30 PM - 1:30 PM',
      venue: 'Virtual (Zoom)',
      address: 'https://zoom.us/j/example',
      expectedAttendance: 1,
      classType: '1-on-1-virtual' as const,
      studentName: 'Margaret Santos',
      customNotes: 'Wants to learn how to do group FaceTime calls with all 4 grandchildren at once'
    },
    {
      id: '3',
      topic: 'Health Apps & Patient Portals',
      time: '2:00 PM - 3:30 PM',
      venue: "'Ilima at Leihano",
      address: '1130 N Nimitz Hwy, Honolulu, HI 96817',
      expectedAttendance: 9,
      classType: 'group' as const,
      studentName: null,
      customNotes: null
    }
  ];

  // Add status based on time
  const todaysClasses = allTodaysClasses.map(c => ({
    ...c,
    status: isClassCompleted(c.time) ? 'completed' as const : 'upcoming' as const
  }));

  // Sort: upcoming first, then completed
  const sortedClasses = [...todaysClasses].sort((a, b) => {
    if (a.status === 'upcoming' && b.status === 'completed') return -1;
    if (a.status === 'completed' && b.status === 'upcoming') return 1;
    return 0;
  });

  // Calculate class type breakdown for this week
  const classTypeBreakdown = {
    group: 8,
    '1-on-1-virtual': 3,
    '1-on-1-in-person': 2,
    'small-group': 2
  };

  const classTypeLabels = {
    group: { label: 'Group Classes', color: '#2D9596', bg: '#E6F7F4' },
    '1-on-1-virtual': { label: '1:1 Virtual', color: '#3B82F6', bg: '#DBEAFE' },
    '1-on-1-in-person': { label: '1:1 In-Person', color: '#9333EA', bg: '#F3E8FF' },
    'small-group': { label: 'Small Group', color: '#E67E50', bg: '#FED7AA' }
  };

  // Weekly stats - using sample data for demo
  const weeklyStats = [
    { label: 'Classes This Week', value: '15', color: '#2D9596', subtext: '8 Group, 3 Virtual, 2 In-Person, 2 Small Group' },
    { label: 'Total Student Sessions', value: '92', color: '#E67E50', subtext: 'Some students attend multiple classes' }
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
              <Button
                onClick={() => onNavigate('past-sessions')}
                variant="outline"
                className="h-10 px-4"
                style={{
                  borderColor: '#E5E7EB',
                  color: '#265073'
                }}
              >
                <History className="w-4 h-4 mr-2" />
                Past Sessions
              </Button>
              <div className="hidden sm:block text-right">
                <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                  Lindsay
                </p>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>
                  Digital Care Guide
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
            Aloha, Lindsay!
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Here's your schedule for today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              {stat.subtext && (
                <p className="text-[14px] mt-2" style={{ color: '#9CA3AF' }}>
                  {stat.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Class Type Breakdown */}
        <div className="mb-8">
          <h2 className="text-[22px] font-bold mb-4" style={{ color: '#265073' }}>
            This Week's Class Mix
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(classTypeBreakdown).map(([type, count]) => {
              const config = classTypeLabels[type as keyof typeof classTypeLabels];
              return (
                <div
                  key={type}
                  className="rounded-xl p-4 border-2"
                  style={{
                    background: config.bg,
                    borderColor: config.color
                  }}
                >
                  <p className="text-[28px] font-bold" style={{ color: config.color }}>
                    {count}
                  </p>
                  <p className="text-[14px] font-medium" style={{ color: '#265073' }}>
                    {config.label}
                  </p>
                </div>
              );
            })}
          </div>
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

          {sortedClasses.length > 0 ? (
            <div className="space-y-4">
              {sortedClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="rounded-xl p-6 border-2 hover:shadow-lg transition-all cursor-pointer"
                  style={{
                    background: classItem.status === 'completed' ? '#F9FAFB' : '#FFFFFF',
                    borderColor: classItem.status === 'completed' ? '#10B981' : '#E5E7EB',
                    opacity: classItem.status === 'completed' ? 0.8 : 1
                  }}
                  onClick={() => {
                    if (classItem.status === 'upcoming') {
                      onNavigate('pre-class-prep', { classSession: {
                        id: classItem.id,
                        topic: classItem.topic,
                        date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
                        time: classItem.time.split(' - ')[0],
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
                      }});
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Class Title */}
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-[24px] font-bold" style={{ color: '#265073' }}>
                          {classItem.topic}
                        </h3>
                        {classItem.status === 'completed' && (
                          <span
                            className="px-3 py-1 rounded-full text-[14px] font-semibold flex items-center gap-2"
                            style={{
                              background: '#10B981',
                              color: '#FFFFFF'
                            }}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Completed
                          </span>
                        )}
                        {classItem.status === 'upcoming' && (
                          <span
                            className="px-3 py-1 rounded-full text-[14px] font-semibold"
                            style={{
                              background: '#E67E50',
                              color: '#FFFFFF'
                            }}
                          >
                            Upcoming
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
                              {classItem.expectedAttendance} {classItem.expectedAttendance === 1 ? 'student' : 'students'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Student name for 1:1 */}
                      {classItem.studentName && (
                        <div className="mt-4 p-3 rounded-lg" style={{ background: '#E6F7F4' }}>
                          <p className="text-[14px] font-medium" style={{ color: '#2D9596' }}>
                            Student: {classItem.studentName}
                          </p>
                          {classItem.customNotes && (
                            <p className="text-[14px] mt-1" style={{ color: '#6B7280' }}>
                              {classItem.customNotes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: '#D1D5DB' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl p-12 text-center border-2"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E7EB'
              }}
            >
              <p className="text-[18px]" style={{ color: '#9CA3AF' }}>
                No classes scheduled for today. Enjoy your day off!
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('schedule')}
            className="rounded-xl p-6 border-2 hover:shadow-lg transition-all text-left"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB'
            }}
          >
            <Calendar className="w-8 h-8 mb-3" style={{ color: '#2D9596' }} />
            <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
              View Full Schedule
            </h3>
            <p className="text-[16px]" style={{ color: '#6B7280' }}>
              See all your classes for the week
            </p>
          </button>

          <button
            onClick={() => onNavigate('walk-in')}
            className="rounded-xl p-6 border-2 hover:shadow-lg transition-all text-left"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB'
            }}
          >
            <Users className="w-8 h-8 mb-3" style={{ color: '#E67E50' }} />
            <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
              Register Walk-In Student
            </h3>
            <p className="text-[16px]" style={{ color: '#6B7280' }}>
              Quick registration for spontaneous learners
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}
