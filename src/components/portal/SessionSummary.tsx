import { Button } from '../ui/button';
import { X, Download, Share2, AlertCircle, Users, Clock } from 'lucide-react';
import { Student, ClassSession } from './TeacherRouter';

interface TrackedIssue {
  categoryId: string;
  categoryLabel: string;
  timestamp: Date;
  notes?: string;
}

interface StudentIssues {
  [studentId: string]: TrackedIssue[];
}

interface SessionSummaryProps {
  classSession: ClassSession;
  students: Student[];
  studentIssues: StudentIssues;
  onClose: () => void;
  onEndClass: () => void;
}

export function SessionSummary({
  classSession,
  students,
  studentIssues,
  onClose,
  onEndClass
}: SessionSummaryProps) {
  // Calculate statistics
  const totalIssues = Object.values(studentIssues).reduce(
    (sum, issues) => sum + issues.length,
    0
  );
  const studentsWithIssues = Object.keys(studentIssues).filter(
    (id) => studentIssues[id].length > 0
  ).length;

  // Group issues by category
  const issuesByCategory: { [key: string]: number } = {};
  Object.values(studentIssues).forEach((issues) => {
    issues.forEach((issue) => {
      issuesByCategory[issue.categoryLabel] =
        (issuesByCategory[issue.categoryLabel] || 0) + 1;
    });
  });

  const topIssues = Object.entries(issuesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Device breakdown
  const deviceCounts: { [key: string]: number } = {};
  students.forEach((student) => {
    deviceCounts[student.deviceType] = (deviceCounts[student.deviceType] || 0) + 1;
  });

  const handleGenerateResources = () => {
    // This will be implemented in the next component
    alert('Generate Resources feature coming next!');
  };

  const handleExportData = () => {
    // Export session data as JSON
    const sessionData = {
      class: classSession.topic,
      date: classSession.date,
      time: classSession.time,
      venue: classSession.venue,
      totalStudents: students.length,
      totalIssues,
      studentsWithIssues,
      students: students.map((student) => ({
        name: student.name,
        deviceType: student.deviceType,
        status: student.status,
        issues: studentIssues[student.id] || []
      })),
      issuesByCategory
    };

    const blob = new Blob([JSON.stringify(sessionData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${classSession.topic.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-5 border-b"
          style={{
            background: 'linear-gradient(135deg, #2D9596 0%, #265073 100%)',
            borderColor: 'transparent'
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[28px] font-bold text-white mb-2">
                Class Session Summary
              </h2>
              <p className="text-[16px] text-white/90">
                {classSession.topic}
              </p>
              <p className="text-[14px] text-white/75 mt-1">
                {classSession.date} • {classSession.time}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Key Stats */}
          <div className="px-6 py-6" style={{ background: '#F9FAFB' }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className="p-4 rounded-xl"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5" style={{ color: '#2D9596' }} />
                  <span className="text-[14px] font-medium" style={{ color: '#6B7280' }}>
                    Total Students
                  </span>
                </div>
                <p className="text-[32px] font-bold" style={{ color: '#265073' }}>
                  {students.length}
                </p>
              </div>

              <div
                className="p-4 rounded-xl"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5" style={{ color: '#E67E50' }} />
                  <span className="text-[14px] font-medium" style={{ color: '#6B7280' }}>
                    Total Issues Tracked
                  </span>
                </div>
                <p className="text-[32px] font-bold" style={{ color: '#265073' }}>
                  {totalIssues}
                </p>
              </div>

              <div
                className="p-4 rounded-xl"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5" style={{ color: '#9333EA' }} />
                  <span className="text-[14px] font-medium" style={{ color: '#6B7280' }}>
                    Students with Issues
                  </span>
                </div>
                <p className="text-[32px] font-bold" style={{ color: '#265073' }}>
                  {studentsWithIssues}
                </p>
              </div>
            </div>
          </div>

          {/* Top Issues */}
          <div className="px-6 py-6">
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              Most Common Issues
            </h3>
            <div className="space-y-3">
              {topIssues.length > 0 ? (
                topIssues.map(([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
                  >
                    <span className="text-[16px] font-medium" style={{ color: '#265073' }}>
                      {category}
                    </span>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${Math.max(60, (count / totalIssues) * 200)}px`,
                          background: '#2D9596'
                        }}
                      />
                      <span
                        className="text-[16px] font-bold min-w-[40px] text-right"
                        style={{ color: '#2D9596' }}
                      >
                        {count}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[16px] text-center py-8" style={{ color: '#9CA3AF' }}>
                  No issues tracked this session
                </p>
              )}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="px-6 py-6" style={{ background: '#F9FAFB' }}>
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              Device Types
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(deviceCounts).map(([device, count]) => (
                <div
                  key={device}
                  className="p-4 rounded-lg text-center"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                >
                  <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>
                    {count}
                  </p>
                  <p className="text-[14px] mt-1" style={{ color: '#6B7280' }}>
                    {device}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Details */}
          <div className="px-6 py-6">
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              Student Details
            </h3>
            <div className="space-y-2">
              {students.map((student) => {
                const issues = studentIssues[student.id] || [];
                return (
                  <div
                    key={student.id}
                    className="p-4 rounded-lg"
                    style={{
                      background: issues.length > 0 ? '#FEF3C7' : '#F9FAFB',
                      border: `1px solid ${issues.length > 0 ? '#FCD34D' : '#E5E7EB'}`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[16px] font-medium" style={{ color: '#265073' }}>
                          {student.name}
                        </span>
                        <span className="text-[14px] ml-3" style={{ color: '#6B7280' }}>
                          {student.deviceType}
                        </span>
                      </div>
                      <span
                        className="text-[14px] font-medium"
                        style={{ color: issues.length > 0 ? '#F59E0B' : '#9CA3AF' }}
                      >
                        {issues.length} issue{issues.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="sticky bottom-0 px-6 py-4 border-t"
          style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="flex-1 h-[50px]"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Data
            </Button>
            <Button
              onClick={handleGenerateResources}
              className="flex-1 h-[50px]"
              style={{
                background: '#2D9596',
                color: '#FFFFFF'
              }}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Generate Resources
            </Button>
            <Button
              onClick={onEndClass}
              className="flex-1 h-[50px]"
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
  );
}