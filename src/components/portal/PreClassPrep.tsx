import { useState, useEffect } from 'react';
import { ArrowLeft, Smartphone, Tablet, Eye, Ear, User, Plus, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { ClassSession, Student } from './TeacherRouter';
import { WalkInRegistrationModal } from './WalkInRegistrationModal';
import getRosterForClass from './classRosters';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

interface PreClassPrepProps {
  classSession: ClassSession;
  onBack: () => void;
  onStartClass: (students: Student[]) => void;
}

export function PreClassPrep({ classSession, onBack, onStartClass }: PreClassPrepProps) {
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  // Load roster for this specific class
  useEffect(() => {
    const roster = getRosterForClass(classSession.id);
    setStudents(roster);
  }, [classSession.id]);

  // Get appropriate header text based on class type
  const getStudentListHeader = () => {
    if (classSession.classType === '1-on-1-in-person' || classSession.classType === '1-on-1-virtual') {
      return 'Student Information';
    } else if (classSession.classType === 'small-group') {
      return 'Participants';
    } else {
      return 'Student Roster';
    }
  };

  const handleAddWalkIn = (newStudent: Student) => {
    setStudents([...students, newStudent]);
    setShowWalkInModal(false);
  };

  const getStatusBadge = (status: Student['status']) => {
    const statusConfig = {
      'new': { label: 'New Student', color: '#3B82F6', bg: '#DBEAFE' },
      'returning': { label: 'Returning', color: '#16A34A', bg: '#DCFCE7' },
      'basic': { label: 'Basic Subscriber', color: '#0891B2', bg: '#CFFAFE' },
      'standard': { label: 'Standard Subscriber', color: '#0891B2', bg: '#CFFAFE' },
      'premium': { label: 'Premium Subscriber', color: '#E67E50', bg: '#FED7AA' },
      'community': { label: 'Community Member', color: '#9333EA', bg: '#F3E8FF' },
      'walk-in': { label: 'Walk-In', color: '#F59E0B', bg: '#FEF3C7' }
    };

    const config = statusConfig[status];
    return (
      <span
        className="px-3 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap"
        style={{
          background: config.bg,
          color: config.color
        }}
      >
        {config.label}
      </span>
    );
  };

  const getDeviceIcon = (deviceType: Student['deviceType']) => {
    const iconProps = { className: 'w-5 h-5', style: { color: '#2D9596' } };

    switch (deviceType) {
      case 'iPhone':
        return <Smartphone {...iconProps} />;
      case 'Android':
        return <Smartphone {...iconProps} />;
      case 'iPad':
        return <Tablet {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

  // Check if class can be started (e.g., within 15 minutes of start time)
  const canStartClass = true; // For demo purposes, always allow

  return (
    <>
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
              {/* Back Button */}
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[18px] hover:underline"
                style={{ color: '#2D9596' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Schedule
              </button>

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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 md:pb-8">
          {/* Class Info Header */}
          <div
            className="rounded-xl p-6 mb-8 border-2"
            style={{
              background: '#FFFFFF',
              borderColor: classSession.status === 'today' ? '#E67E50' : '#E5E7EB'
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-[32px] font-bold mb-2" style={{ color: '#265073' }}>
                  {classSession.topic}
                </h1>
                <div className="flex flex-wrap gap-4 text-[16px]" style={{ color: '#6B7280' }}>
                  <span>📅 {classSession.date}</span>
                  <span>⏰ {classSession.time}</span>
                  <span>📍 {classSession.venue}</span>
                </div>
              </div>
              {canStartClass && (
                <Button
                  onClick={() => onStartClass(students)}
                  className="h-14 px-8 whitespace-nowrap"
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF'
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Class
                </Button>
              )}
            </div>
          </div>

          {/* Custom Notes Section */}
          {classSession.customNotes && (
            <div className="mb-6 p-6 rounded-xl" style={{ background: '#FEF3C7', border: '2px solid #FCD34D' }}>
              <h3 className="text-[18px] font-bold mb-2" style={{ color: '#92400E' }}>
                📝 Custom Topic Notes
              </h3>
              <p className="text-[16px]" style={{ color: '#92400E' }}>
                {classSession.customNotes}
              </p>
            </div>
          )}

          {/* Student Roster */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                  {getStudentListHeader()}
                </h2>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>
                  {students.length} {students.length === 1 ? 'student' : 'students'} registered
                </p>
              </div>
            </div>

            {/* Student Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="rounded-xl p-5 border-2"
                  style={{
                    background: '#FFFFFF',
                    borderColor: '#E5E7EB'
                  }}
                >
                  {/* Student Name */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[20px] font-bold flex-1" style={{ color: '#265073' }}>
                      {student.name}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    {getStatusBadge(student.status)}
                  </div>

                  {/* Device Type */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#E6F7F4' }}
                    >
                      {getDeviceIcon(student.deviceType)}
                    </div>
                    <div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>
                        Device
                      </p>
                      <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                        {student.deviceType}
                      </p>
                    </div>
                  </div>

                  {/* Accessibility Icons */}
                  {(student.accessibilityNeeds.vision || student.accessibilityNeeds.hearing || student.accessibilityNeeds.mobility) && (
                    <div
                      className="rounded-lg p-3"
                      style={{ background: '#FEF3C7' }}
                    >
                      <p className="text-[13px] font-semibold mb-2" style={{ color: '#92400E' }}>
                        Accessibility Needs:
                      </p>
                      <div className="flex gap-3">
                        {student.accessibilityNeeds.vision && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" style={{ color: '#92400E' }} />
                            <span className="text-[13px]" style={{ color: '#92400E' }}>Vision</span>
                          </div>
                        )}
                        {student.accessibilityNeeds.hearing && (
                          <div className="flex items-center gap-1">
                            <Ear className="w-4 h-4" style={{ color: '#92400E' }} />
                            <span className="text-[13px]" style={{ color: '#92400E' }}>Hearing</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Floating Add Walk-In Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowWalkInModal(true)}
            className="w-16 h-16 md:w-auto md:h-14 md:px-6 rounded-full md:rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            style={{
              background: '#E67E50',
              color: '#FFFFFF'
            }}
          >
            <Plus className="w-6 h-6" />
            <span className="hidden md:inline text-[18px] font-semibold">
              Add Walk-In Student
            </span>
          </button>
        </div>
      </div>

      {/* Walk-In Registration Modal */}
      {showWalkInModal && (
        <WalkInRegistrationModal
          onClose={() => setShowWalkInModal(false)}
          onAddStudent={handleAddWalkIn}
        />
      )}
    </>
  );
}