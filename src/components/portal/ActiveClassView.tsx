import { useState } from 'react';
import { Button } from '../ui/button';
import {
  X,
  ChevronLeft,
  Check,
  Save,
  FileText
} from 'lucide-react';
import { Student, ClassSession } from './TeacherRouter';
import { getIssuesForClass } from './classIssuesData';
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
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [studentIssues, setStudentIssues] = useState<StudentIssues>({});
  const [showSummary, setShowSummary] = useState(false);

  // Get categorized issue options for this class
  const issueCategories = getIssuesForClass(classSession.topic);

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleIssueSelection = (issue: string) => {
    setSelectedIssues(prev =>
      prev.includes(issue)
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const trackSelected = () => {
    if (selectedStudentIds.length === 0 || selectedIssues.length === 0) {
      return;
    }

    const updated = { ...studentIssues };

    selectedStudentIds.forEach(studentId => {
      const currentIssues = updated[studentId] || [];

      selectedIssues.forEach(issueLabel => {
        // Check if this issue is already tracked
        const alreadyTracked = currentIssues.some(i => i.categoryLabel === issueLabel);

        if (!alreadyTracked) {
          const newIssue: TrackedIssue = {
            categoryId: issueLabel.toLowerCase().replace(/\s+/g, '-'),
            categoryLabel: issueLabel,
            timestamp: new Date()
          };
          currentIssues.push(newIssue);
        }
      });

      updated[studentId] = currentIssues;
    });

    setStudentIssues(updated);
    // Clear selections after tracking
    setSelectedStudentIds([]);
    setSelectedIssues([]);
  };

  const getIssueCount = (studentId: string) => {
    return (studentIssues[studentId] || []).length;
  };

  const getTotalTrackedCount = () => {
    return Object.values(studentIssues).reduce((sum, issues) => sum + issues.length, 0);
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: '#F9FAFB' }}>
      {/* Header */}
      <div
        className="border-b"
        style={{
          background: 'linear-gradient(135deg, #2D9596 0%, #265073 100%)',
          borderColor: 'transparent'
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-[24px] font-bold text-white">
                  {classSession.topic}
                </h1>
                <p className="text-[14px] text-white/90">
                  In Progress • {students.length} Students • {getTotalTrackedCount()} Issues Tracked
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSummary(true)}
                className="h-[50px] px-6"
                style={{
                  background: '#FFFFFF',
                  color: '#265073'
                }}
              >
                <FileText className="w-5 h-5 mr-2" />
                Go to Summary
              </Button>
              <Button
                onClick={onEndClass}
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

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Students (25%) */}
        <div className="w-[25%] border-r overflow-y-auto" style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}>
          <div className="p-4">
            <h3 className="text-[18px] font-bold mb-4" style={{ color: '#265073' }}>
              Students
            </h3>

            <div className="space-y-2">
              {students.map((student) => {
                const issueCount = getIssueCount(student.id);
                const isSelected = selectedStudentIds.includes(student.id);

                return (
                  <button
                    key={student.id}
                    onClick={() => toggleStudentSelection(student.id)}
                    className="w-full p-3 rounded-lg border-2 text-left transition-all"
                    style={{
                      background: isSelected ? '#E6F7F4' : '#FFFFFF',
                      borderColor: isSelected ? '#2D9596' : (issueCount > 0 ? '#E67E50' : '#E5E7EB')
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isSelected ? '#2D9596' : '#FFFFFF',
                              borderColor: isSelected ? '#2D9596' : '#D1D5DB'
                            }}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span
                            className="text-[15px] font-semibold"
                            style={{ color: '#265073' }}
                          >
                            {student.name}
                          </span>
                        </div>
                        <span className="text-[12px] ml-7" style={{ color: '#6B7280' }}>
                          {student.deviceType}
                        </span>
                      </div>
                      {issueCount > 0 && (
                        <div
                          className="px-2 py-1 rounded-full text-[12px] font-bold"
                          style={{
                            background: '#E67E50',
                            color: '#FFFFFF'
                          }}
                        >
                          {issueCount}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Issues (75%) */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-[20px] font-bold" style={{ color: '#265073' }}>
              Common Issues & Topics
            </h3>
            <p className="text-[14px] mt-1" style={{ color: '#6B7280' }}>
              Select one or more issues, then select students, then click Track
            </p>
          </div>

          {/* Categorized Issues */}
          <div className="space-y-6">
            {issueCategories.map((category) => {
              // Flatten all sub-issues for this category
              const allSubIssues = Object.values(category.subIssues).flat();

              return (
                <div key={category.id}>
                  {/* Category Header */}
                  <h4
                    className="text-[16px] font-bold mb-3 pb-2 border-b-2"
                    style={{
                      color: '#265073',
                      borderColor: '#2D9596'
                    }}
                  >
                    {category.label}
                  </h4>

                  {/* Issue Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    {allSubIssues.map((issue, index) => {
                      const isSelected = selectedIssues.includes(issue);

                      return (
                        <button
                          key={`${category.id}-${index}`}
                          onClick={() => toggleIssueSelection(issue)}
                          className="p-3 rounded-lg border-2 text-left transition-all hover:shadow-md"
                          style={{
                            background: isSelected ? '#E6F7F4' : '#FFFFFF',
                            borderColor: isSelected ? '#2D9596' : '#E5E7EB'
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[13px] font-medium"
                              style={{ color: isSelected ? '#2D9596' : '#265073' }}
                            >
                              {issue}
                            </span>
                            {isSelected && (
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
                                style={{ background: '#2D9596' }}
                              >
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      {(selectedStudentIds.length > 0 || selectedIssues.length > 0) && (
        <div
          className="border-t px-6 py-4"
          style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold" style={{ color: '#265073' }}>
                {selectedIssues.length > 0 && `${selectedIssues.length} issue${selectedIssues.length !== 1 ? 's' : ''} selected`}
                {selectedIssues.length > 0 && selectedStudentIds.length > 0 && ' • '}
                {selectedStudentIds.length > 0 && `${selectedStudentIds.length} student${selectedStudentIds.length !== 1 ? 's' : ''} selected`}
              </p>
              <p className="text-[12px]" style={{ color: '#6B7280' }}>
                {selectedIssues.length === 0 && 'Select issues from the right →'}
                {selectedIssues.length > 0 && selectedStudentIds.length === 0 && 'Now select students from the left ←'}
                {selectedIssues.length > 0 && selectedStudentIds.length > 0 && 'Ready to track!'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedStudentIds([]);
                  setSelectedIssues([]);
                }}
                className="px-4 py-2 rounded-lg border-2 transition-all"
                style={{
                  borderColor: '#E5E7EB',
                  color: '#6B7280'
                }}
              >
                Clear Selection
              </button>
              <Button
                onClick={trackSelected}
                disabled={selectedStudentIds.length === 0 || selectedIssues.length === 0}
                className="h-[44px] px-6"
                style={{
                  background: selectedStudentIds.length > 0 && selectedIssues.length > 0 ? '#2D9596' : '#D1D5DB',
                  color: '#FFFFFF'
                }}
              >
                <Save className="w-5 h-5 mr-2" />
                Track Selected
              </Button>
            </div>
          </div>
        </div>
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
