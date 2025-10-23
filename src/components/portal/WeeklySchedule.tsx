import { ArrowLeft, MapPin, Clock, DollarSign, Users, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { ClassSession } from './TeacherRouter';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

interface WeeklyScheduleProps {
  onBack: () => void;
  onClassSelect: (classSession: ClassSession) => void;
}

export function WeeklySchedule({ onBack, onClassSelect }: WeeklyScheduleProps) {
  const getClassTypeBadge = (classType: ClassSession['classType']) => {
    const typeConfig = {
      'group': { label: 'Group Class', color: '#2D9596', bg: '#E6F7F4' },
      '1-on-1-in-person': { label: '1:1 In-Person', color: '#9333EA', bg: '#F3E8FF' },
      '1-on-1-virtual': { label: '1:1 Virtual', color: '#3B82F6', bg: '#DBEAFE' },
      'small-group': { label: 'Small Group', color: '#E67E50', bg: '#FED7AA' }
    };
    return typeConfig[classType];
  };

  // Sample weekly schedule data - Lindsay's full week
  const weeklyClasses: ClassSession[] = [
    // MONDAY, DEC 2
    {
      id: '1',
      topic: 'iPhone Basics for Beginners',
      date: 'Monday, Dec 2',
      time: '10:00 AM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      duration: '45 min',
      price: 15,
      expectedAttendance: 10,
      materialsNeeded: [
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'today',
      classType: 'group',
      studentName: null,
      customNotes: null
    },
    {
      id: '2',
      topic: 'FaceTime Help with Grandkids',
      date: 'Monday, Dec 2',
      time: '12:30 PM',
      venue: 'Virtual (Zoom)',
      address: 'https://zoom.us/j/example',
      duration: '1 hr',
      price: 40,
      expectedAttendance: 1,
      materialsNeeded: [
        'Zoom link ready',
        'Screen sharing prepared',
        'iPad for portal updates'
      ],
      status: 'upcoming',
      classType: '1-on-1-virtual',
      studentName: 'Margaret Santos',
      customNotes: 'Wants to learn how to do group FaceTime calls with all 4 grandchildren at once. Also needs help adding contacts.'
    },
    {
      id: '3',
      topic: 'Health Apps & Patient Portals',
      date: 'Monday, Dec 2',
      time: '2:00 PM',
      venue: "'Ilima at Leihano",
      address: '1130 N Nimitz Hwy, Honolulu, HI 96817',
      duration: '1.5 hrs',
      price: 25,
      expectedAttendance: 9,
      materialsNeeded: [
        'Sample patient portal screenshots',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming',
      classType: 'group',
      studentName: null,
      customNotes: null
    },

    // TUESDAY, DEC 3
    {
      id: '4',
      topic: 'Password Management Made Easy',
      date: 'Tuesday, Dec 3',
      time: '10:00 AM',
      venue: 'Hawaii State Library',
      address: '478 S King St, Honolulu, HI 96813',
      duration: '1 hr',
      price: 20,
      expectedAttendance: 12,
      materialsNeeded: [
        'Password manager demo account',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming',
      classType: 'group',
      studentName: null,
      customNotes: null
    },
    {
      id: '5',
      topic: 'Setting up MyChart on iPad',
      date: 'Tuesday, Dec 3',
      time: '1:00 PM',
      venue: 'Student Home',
      address: '1250 Nehoa St, Honolulu, HI 96822',
      duration: '1 hr',
      price: 50,
      expectedAttendance: 1,
      materialsNeeded: [
        'iPad/phone for portal updates'
      ],
      status: 'upcoming',
      classType: '1-on-1-in-person',
      studentName: 'Dorothy Chang',
      customNotes: 'First time using MyChart. Needs help creating account, viewing test results, and messaging her doctor.'
    },
    {
      id: '6',
      topic: 'Video Calling with Family',
      date: 'Tuesday, Dec 3',
      time: '3:00 PM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      duration: '45 min',
      price: 15,
      expectedAttendance: 8,
      materialsNeeded: [
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming',
      classType: 'group',
      studentName: null,
      customNotes: null
    },

    // WEDNESDAY, DEC 4
    {
      id: '7',
      topic: 'iPhone Photo Organization',
      date: 'Wednesday, Dec 4',
      time: '9:00 AM',
      venue: 'Arcadia Assisted Living',
      address: '1434 Punahou St, Honolulu, HI 96822',
      duration: '1.5 hrs',
      price: 60,
      expectedAttendance: 2,
      materialsNeeded: [
        'Follow-up QR cards',
        'iPad for demos and portal updates'
      ],
      status: 'upcoming',
      classType: 'small-group',
      studentName: 'Robert Tanaka & Patricia Kim',
      customNotes: 'Both have thousands of unorganized photos. Want to learn albums, sharing photos with family, and freeing up storage space.'
    },
    {
      id: '8',
      topic: 'Health Apps & Patient Portals',
      date: 'Wednesday, Dec 4',
      time: '11:00 AM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      duration: '1 hr',
      price: 20,
      expectedAttendance: 10,
      materialsNeeded: [
        'Sample patient portal screenshots',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming',
      classType: 'group',
      studentName: null,
      customNotes: null
    },
    {
      id: '9',
      topic: 'Email Management',
      date: 'Wednesday, Dec 4',
      time: '2:00 PM',
      venue: 'Virtual (Zoom)',
      address: 'https://zoom.us/j/example',
      duration: '1 hr',
      price: 40,
      expectedAttendance: 1,
      materialsNeeded: [
        'Zoom link ready',
        'Screen sharing prepared',
        'iPad for portal updates'
      ],
      status: 'upcoming',
      classType: '1-on-1-virtual',
      studentName: 'James Wong',
      customNotes: 'Inbox has 3,000+ emails. Needs help organizing into folders, unsubscribing from junk, and setting up filters.'
    },

    // THURSDAY, DEC 5
    {
      id: '10',
      topic: 'Video Calling with Family',
      date: 'Thursday, Dec 5',
      time: '10:00 AM',
      venue: 'Hawaii State Library',
      address: '478 S King St, Honolulu, HI 96813',
      duration: '45 min',
      price: 15,
      expectedAttendance: 7,
      materialsNeeded: [
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming',
      classType: 'group',
      studentName: null,
      customNotes: null
    },
    {
      id: '11',
      topic: 'Facebook Account Setup',
      date: 'Thursday, Dec 5',
      time: '12:30 PM',
      venue: 'Student Home',
      address: '789 Makiki St, Honolulu, HI 96814',
      duration: '1 hr',
      price: 50,
      expectedAttendance: 1,
      materialsNeeded: [
        'iPad/phone for portal updates'
      ],
      status: 'upcoming',
      classType: '1-on-1-in-person',
      studentName: 'Mary Nakamura',
      customNotes: 'Never used Facebook before. Wants to create account, find old friends from high school, and learn privacy settings.'
    },
    {
      id: '12',
      topic: 'iPhone Basics for Beginners',
      date: 'Thursday, Dec 5',
      time: '3:00 PM',
      venue: "'Ilima at Leihano",
      address: '1130 N Nimitz Hwy, Honolulu, HI 96817',
      duration: '1 hr',
      price: 20,
      expectedAttendance: 11,
      materialsNeeded: [
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming',
      classType: 'group',
      studentName: null,
      customNotes: null
    },

    // FRIDAY, DEC 6
    {
      id: '13',
      topic: 'Online Banking Help',
      date: 'Friday, Dec 6',
      time: '9:00 AM',
      venue: 'Student Home',
      address: '2542 Date St, Honolulu, HI 96826',
      duration: '1.5 hrs',
      price: 75,
      expectedAttendance: 2,
      materialsNeeded: [
        'Follow-up QR cards',
        'iPad for demos and portal updates'
      ],
      status: 'upcoming',
      classType: 'small-group',
      studentName: 'Thomas Martinez & Barbara Fernandez',
      customNotes: 'Both want to set up Bank of Hawaii mobile app, learn to deposit checks with camera, and pay bills online.'
    },
    {
      id: '14',
      topic: 'Password Management Made Easy',
      date: 'Friday, Dec 6',
      time: '11:00 AM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      duration: '1 hr',
      price: 20,
      expectedAttendance: 9,
      materialsNeeded: [
        'Password manager demo account',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming',
      classType: 'group',
      studentName: null,
      customNotes: null
    },
    {
      id: '15',
      topic: 'iPhone Calendar & Reminders',
      date: 'Friday, Dec 6',
      time: '2:00 PM',
      venue: 'Virtual (Zoom)',
      address: 'https://zoom.us/j/example',
      duration: '1 hr',
      price: 40,
      expectedAttendance: 1,
      materialsNeeded: [
        'Zoom link ready',
        'Screen sharing prepared',
        'iPad for portal updates'
      ],
      status: 'upcoming',
      classType: '1-on-1-virtual',
      studentName: 'William Lee',
      customNotes: 'Forgets doctor appointments. Wants to learn calendar app, set up medication reminders, and sync with wife\'s calendar.'
    }
  ];

  // Group classes by day
  const groupedClasses = weeklyClasses.reduce((acc, classItem) => {
    const day = classItem.date;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(classItem);
    return acc;
  }, {} as Record<string, ClassSession[]>);

  const openDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

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
            {/* Back Button & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[18px] hover:underline"
                style={{ color: '#2D9596' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
            </div>

            {/* Logo */}
            <img
              src={logoWithTagline}
              alt="Mālama Digital Care"
              className="h-12 w-auto hidden md:block"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Weekly Class Schedule
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            December 2-6, 2025 • {weeklyClasses.length} classes scheduled
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-8">
          {Object.entries(groupedClasses).map(([day, classes]) => (
            <div key={day}>
              {/* Day Header */}
              <div className="mb-4">
                <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>
                  {day}
                </h2>
                <div
                  className="h-1 w-24 mt-2 rounded-full"
                  style={{ background: '#E67E50' }}
                />
              </div>

              {/* Classes for this day */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="rounded-xl p-6 border-2 hover:shadow-lg transition-all"
                    style={{
                      background: '#FFFFFF',
                      borderColor: classItem.status === 'today' ? '#E67E50' : '#E5E7EB'
                    }}
                  >
                    {/* Class Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[22px] font-bold flex-1" style={{ color: '#265073' }}>
                          {classItem.topic}
                        </h3>
                        {classItem.status === 'today' && (
                          <span
                            className="px-3 py-1 rounded-full text-[12px] font-semibold ml-2 flex-shrink-0"
                            style={{
                              background: '#E67E50',
                              color: '#FFFFFF'
                            }}
                          >
                            Today
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-[13px] font-medium"
                          style={{
                            background: getClassTypeBadge(classItem.classType).bg,
                            color: getClassTypeBadge(classItem.classType).color
                          }}
                        >
                          {getClassTypeBadge(classItem.classType).label}
                        </span>
                        {classItem.studentName && (
                          <span className="text-[14px] font-medium" style={{ color: '#6B7280' }}>
                            • {classItem.studentName}
                          </span>
                        )}
                      </div>
                      {classItem.customNotes && (
                        <div className="mt-3 p-3 rounded-lg" style={{ background: '#FEF3C7', border: '1px solid #FCD34D' }}>
                          <p className="text-[13px]" style={{ color: '#92400E' }}>
                            📝 <strong>Custom Topic:</strong> {classItem.customNotes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-3 mb-4">
                      {/* Time & Duration */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#E6F7F4' }}
                        >
                          <Clock className="w-4 h-4" style={{ color: '#2D9596' }} />
                        </div>
                        <div>
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                            {classItem.time} • {classItem.duration}
                          </p>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#E6F7F4' }}
                        >
                          <MapPin className="w-4 h-4" style={{ color: '#2D9596' }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                            {classItem.venue}
                          </p>
                          <p className="text-[14px]" style={{ color: '#6B7280' }}>
                            {classItem.address}
                          </p>
                        </div>
                      </div>

                      {/* Attendance */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#E6F7F4' }}
                        >
                          <Users className="w-4 h-4" style={{ color: '#2D9596' }} />
                        </div>
                        <div>
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                            {classItem.expectedAttendance} students registered
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#E6F7F4' }}
                        >
                          <DollarSign className="w-4 h-4" style={{ color: '#2D9596' }} />
                        </div>
                        <div>
                          <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                            ${classItem.price} per student
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Materials Needed */}
                    <div
                      className="rounded-lg p-3 mb-4"
                      style={{ background: '#F9FAFB' }}
                    >
                      <p className="text-[14px] font-semibold mb-2" style={{ color: '#265073' }}>
                        Materials Needed:
                      </p>
                      <ul className="text-[14px] space-y-1" style={{ color: '#6B7280' }}>
                        {classItem.materialsNeeded.map((material, index) => (
                          <li key={index}>• {material}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => openDirections(classItem.address)}
                        variant="outline"
                        className="flex-1 h-11"
                        style={{
                          borderColor: '#E5E7EB',
                          color: '#2D9596'
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button
                        onClick={() => onClassSelect(classItem)}
                        className="flex-1 h-11"
                        style={{
                          background: '#2D9596',
                          color: '#FFFFFF'
                        }}
                      >
                        View Roster
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}