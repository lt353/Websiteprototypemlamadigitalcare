import { ArrowLeft, MapPin, Clock, DollarSign, Users, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { ClassSession } from './TeacherRouter';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

interface WeeklyScheduleProps {
  onBack: () => void;
  onClassSelect: (classSession: ClassSession) => void;
}

export function WeeklySchedule({ onBack, onClassSelect }: WeeklyScheduleProps) {
  // Sample weekly schedule data
  const weeklyClasses: ClassSession[] = [
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
      status: 'today'
    },
    {
      id: '2',
      topic: 'Video Calling with Family',
      date: 'Monday, Dec 2',
      time: '2:00 PM',
      venue: "'Ilima at Leihano",
      address: '1130 N Nimitz Hwy, Honolulu, HI 96817',
      duration: '45 min',
      price: 15,
      expectedAttendance: 12,
      materialsNeeded: [
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming'
    },
    {
      id: '3',
      topic: 'Password Management Made Easy',
      date: 'Tuesday, Dec 3',
      time: '1:00 PM',
      venue: 'Hawaii State Library',
      address: '478 S King St, Honolulu, HI 96813',
      duration: '1.5 hrs',
      price: 25,
      expectedAttendance: 8,
      materialsNeeded: [
        'Password manager demo account',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming'
    },
    {
      id: '4',
      topic: 'Health Apps & Patient Portals',
      date: 'Wednesday, Dec 4',
      time: '10:30 AM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      duration: '1.5 hrs',
      price: 25,
      expectedAttendance: 10,
      materialsNeeded: [
        'Sample patient portal screenshots',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming'
    },
    {
      id: '5',
      topic: 'iPhone Basics for Beginners',
      date: 'Thursday, Dec 5',
      time: '9:30 AM',
      venue: "'Ilima at Leihano",
      address: '1130 N Nimitz Hwy, Honolulu, HI 96817',
      duration: '45 min',
      price: 15,
      expectedAttendance: 11,
      materialsNeeded: [
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming'
    },
    {
      id: '6',
      topic: 'Video Calling with Family',
      date: 'Thursday, Dec 5',
      time: '3:00 PM',
      venue: 'Hawaii State Library',
      address: '478 S King St, Honolulu, HI 96813',
      duration: '45 min',
      price: 15,
      expectedAttendance: 9,
      materialsNeeded: [
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming'
    },
    {
      id: '7',
      topic: 'Avoiding Online Scams',
      date: 'Friday, Dec 6',
      time: '11:00 AM',
      venue: 'Lanakila Senior Center',
      address: '1640 Lanakila Ave, Honolulu, HI 96817',
      duration: '1 hr',
      price: 20,
      expectedAttendance: 12,
      materialsNeeded: [
        'Scam example screenshots',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming'
    },
    {
      id: '8',
      topic: 'Social Media Safety',
      date: 'Friday, Dec 6',
      time: '2:30 PM',
      venue: "'Ilima at Leihano",
      address: '1130 N Nimitz Hwy, Honolulu, HI 96817',
      duration: '1 hr',
      price: 20,
      expectedAttendance: 10,
      materialsNeeded: [
        'Privacy settings guides',
        'Follow-up QR cards',
        'Laptop for projecting demos',
        'iPad/phone for quick portal updates'
      ],
      status: 'upcoming'
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
