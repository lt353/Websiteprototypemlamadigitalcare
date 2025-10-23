import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Smartphone,
  Tablet,
  X,
  ChevronLeft,
  Eye,
  Ear,
  Accessibility,
  AlertCircle,
  Zap
} from 'lucide-react';
import { Student, ClassSession } from './TeacherRouter';
import { FastIssueTracker } from './FastIssueTracker';
import { SessionSummary } from './SessionSummary';

interface ActiveClassViewProps {
  classSession: ClassSession;
  students: Student[];
  onBack: () => void;
  onEndClass: () => void;
}

interface TrackedIssue {
  categoryId: string;
  categoryLabel: string;
  timestamp: Date;
  notes?: string;
}

interface StudentIssues {
  [studentId: string]: TrackedIssue[];
}

export function ActiveClassView({
  classSession,
  students,
  onBack,
  onEndClass
}: ActiveClassViewProps) {
  const [studentIssues, setStudentIssues] = useState<StudentIssues>({});
  const [showSummary, setShowSummary] = useState(false);
  const [showFastTracker, setShowFastTracker] = useState(false);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'iPhone':
        return Smartphone;
      case 'Android':
        return Smartphone;
      case 'iPad':
        return Tablet;
      default:
        return Smartphone;
    }
  };

  const getStatusBadge = (status: Student['status']) => {
    const statusConfig = {
      'new': { label: 'New', color: '#3B82F6', bg: '#DBEAFE' },
      'returning': { label: 'Returning', color: '#16A34A', bg: '#DCFCE7' },
      'basic': { label: 'Basic', color: '#0891B2', bg: '#CFFAFE' },
      'standard': { label: 'Standard', color: '#0891B2', bg: '#CFFAFE' },
      'premium': { label: 'Premium', color: '#E67E50', bg: '#FED7AA' },
      'community': { label: 'Community', color: '#9333EA', bg: '#F3E8FF' },
      'walk-in': { label: 'Walk-In', color: '#F59E0B', bg: '#FEF3C7' }
    };
    return statusConfig[status] || statusConfig['new'];
  };

  const getIssueCount = (studentId: string) => {
    return studentIssues[studentId]?.length || 0;
  };

  const handleEndClass = () => {
    setShowSummary(true);
  };

  const handleUpdateIssues = (updatedIssues: StudentIssues) => {
    setStudentIssues(updatedIssues);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" style={{ color: '#265073' }} />
              </button>
              <div>
                <h1 className="text-[24px] font-bold" style={{ color: '#265073' }}>
                  {classSession.topic}
                </h1>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>
                  In Progress • {students.length} Students
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowFastTracker(true)}
                className="h-[50px] px-6"
                style={{
                  background: '#2D9596',
                  color: '#FFFFFF'
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                Quick Track Issues
              </Button>
              <Button
                onClick={() => setShowSummary(true)}
                variant="outline"
                className="h-[50px] px-6"
              >
                View Summary
              </Button>
              <Button
                onClick={handleEndClass}
                className="h-[50px] px-6"
                style={{
                  background: '#E67E50',
                  color: '#FFFFFF'
                }}
              >
                End Class
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {students.map((student) => {
            const DeviceIcon = getDeviceIcon(student.deviceType);
            const statusBadge = getStatusBadge(student.status);
            const issueCount = getIssueCount(student.id);
            const hasAccessibilityNeeds = Object.values(student.accessibilityNeeds).some(need => need);

            return (
              <div
                key={student.id}
                className="p-6 rounded-xl border-2 text-left transition-all hover:shadow-md"
                style={{
                  background: '#FFFFFF',
                  borderColor: '#E5E7EB'
                }}
              >
                {/* Student Name */}
                <h3 className="text-[22px] font-bold mb-3" style={{ color: '#265073' }}>
                  {student.name}
                </h3>

                {/* Device Type */}
                <div className="flex items-center gap-2 mb-3">
                  <DeviceIcon className="w-5 h-5" style={{ color: '#6B7280' }} />
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>
                    {student.deviceType}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[14px] font-medium"
                    style={{
                      background: statusBadge.bg,
                      color: statusBadge.color
                    }}
                  >
                    {statusBadge.label}
                  </span>
                </div>

                {/* Accessibility Needs */}
                {hasAccessibilityNeeds && (
                  <div className="flex items-center gap-2 mb-3">
                    {student.accessibilityNeeds.vision && (
                      <div
                        className="p-1.5 rounded-lg"
                        style={{ background: '#FEF3C7' }}
                        title="Vision assistance"
                      >
                        <Eye className="w-4 h-4" style={{ color: '#F59E0B' }} />
                      </div>
                    )}
                    {student.accessibilityNeeds.hearing && (
                      <div
                        className="p-1.5 rounded-lg"
                        style={{ background: '#DBEAFE' }}
                        title="Hearing assistance"
                      >
                        <Ear className="w-4 h-4" style={{ color: '#3B82F6' }} />
                      </div>
                    )}
                    {student.accessibilityNeeds.mobility && (
                      <div
                        className="p-1.5 rounded-lg"
                        style={{ background: '#DCFCE7' }}
                        title="Mobility assistance"
                      >
                        <Accessibility className="w-4 h-4" style={{ color: '#16A34A' }} />
                      </div>
                    )}
                  </div>
                )}

                {/* Issue Counter */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{
                    background: issueCount > 0 ? '#E6F7F4' : '#F3F4F6',
                    border: `1px solid ${issueCount > 0 ? '#2D9596' : '#E5E7EB'}`
                  }}
                >
                  <AlertCircle
                    className="w-5 h-5"
                    style={{ color: issueCount > 0 ? '#2D9596' : '#9CA3AF' }}
                  />
                  <span
                    className="text-[16px] font-medium"
                    style={{ color: issueCount > 0 ? '#2D9596' : '#6B7280' }}
                  >
                    {issueCount === 0 && 'No issues tracked'}
                    {issueCount === 1 && '1 issue tracked'}
                    {issueCount > 1 && `${issueCount} issues tracked`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fast Issue Tracker */}
      {showFastTracker && (
        <FastIssueTracker
          classSession={classSession}
          students={students}
          studentIssues={studentIssues}
          onUpdateIssues={handleUpdateIssues}
          onClose={() => setShowFastTracker(false)}
        />
      )}

      {/* Session Summary Overlay */}
      {showSummary && (
        <SessionSummary
          classSession={classSession}
          students={students}
          studentIssues={studentIssues}
          onClose={() => setShowSummary(false)}
          onEndClass={onEndClass}
        />
      )}
    </div>
  );
}
