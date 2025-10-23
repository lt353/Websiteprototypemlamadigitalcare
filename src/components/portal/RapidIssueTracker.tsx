import { useState } from 'react';
import { Button } from '../ui/button';
import { X, Save, Undo2, Check, AlertCircle } from 'lucide-react';
import { Student, ClassSession } from './TeacherRouter';
import { getIssuesForClass } from './classIssuesData';

interface TrackedIssue {
  categoryId: string;
  categoryLabel: string;
  timestamp: Date;
}

interface StudentIssues {
  [studentId: string]: TrackedIssue[];
}

interface RapidIssueTrackerProps {
  classSession: ClassSession;
  students: Student[];
  studentIssues: StudentIssues;
  onUpdateIssues: (issues: StudentIssues) => void;
  onClose: () => void;
}

interface Action {
  type: 'add' | 'remove';
  studentId: string;
  issue: TrackedIssue;
}

export default function RapidIssueTracker({
  classSession,
  students,
  studentIssues,
  onUpdateIssues,
  onClose
}: RapidIssueTrackerProps) {
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [currentIssues, setCurrentIssues] = useState<StudentIssues>(studentIssues);
  const [undoStack, setUndoStack] = useState<Action[]>([]);
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const categories = getIssuesForClass(classSession.topic);

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const selectAll = () => {
    setSelectedStudentIds(students.map(s => s.id));
  };

  const clearAll = () => {
    setSelectedStudentIds([]);
    setActiveIssueId(null);
  };

  const trackIssue = (categoryId: string, categoryLabel: string) => {
    if (selectedStudentIds.length === 0) {
      // No students selected - set this as active issue for rapid clicking
      setActiveIssueId(categoryId);
      return;
    }

    // Track issue for all selected students
    const newIssue: TrackedIssue = {
      categoryId,
      categoryLabel,
      timestamp: new Date()
    };

    const actions: Action[] = [];
    const updated = { ...currentIssues };

    selectedStudentIds.forEach(studentId => {
      const studentIssues = updated[studentId] || [];
      const hasIssue = studentIssues.some(i => i.categoryId === categoryId);

      if (!hasIssue) {
        updated[studentId] = [...studentIssues, newIssue];
        actions.push({ type: 'add', studentId, issue: newIssue });
      }
    });

    setCurrentIssues(updated);
    setUndoStack([...actions, ...undoStack].slice(0, 10)); // Keep last 10 actions
    setSelectedStudentIds([]); // Clear selection after tracking
    setActiveIssueId(null);
  };

  const toggleIssueForStudent = (studentId: string, categoryId: string, categoryLabel: string) => {
    const studentIssues = currentIssues[studentId] || [];
    const hasIssue = studentIssues.some(i => i.categoryId === categoryId);
    const updated = { ...currentIssues };

    if (hasIssue) {
      // Remove issue
      const issue = studentIssues.find(i => i.categoryId === categoryId)!;
      updated[studentId] = studentIssues.filter(i => i.categoryId !== categoryId);
      setUndoStack([{ type: 'remove', studentId, issue }, ...undoStack].slice(0, 10));
    } else {
      // Add issue
      const newIssue: TrackedIssue = {
        categoryId,
        categoryLabel,
        timestamp: new Date()
      };
      updated[studentId] = [...studentIssues, newIssue];
      setUndoStack([{ type: 'add', studentId, issue: newIssue }, ...undoStack].slice(0, 10));
    }

    setCurrentIssues(updated);
  };

  const undo = () => {
    if (undoStack.length === 0) return;

    const [lastAction, ...remainingActions] = undoStack;
    const updated = { ...currentIssues };
    const studentIssues = updated[lastAction.studentId] || [];

    if (lastAction.type === 'add') {
      // Undo add: remove the issue
      updated[lastAction.studentId] = studentIssues.filter(
        i => i.categoryId !== lastAction.issue.categoryId
      );
    } else {
      // Undo remove: add the issue back
      updated[lastAction.studentId] = [...studentIssues, lastAction.issue];
    }

    setCurrentIssues(updated);
    setUndoStack(remainingActions);
  };

  const getIssueCount = (studentId: string) => {
    return (currentIssues[studentId] || []).length;
  };

  const hasIssue = (studentId: string, categoryId: string) => {
    const studentIssues = currentIssues[studentId] || [];
    return studentIssues.some(i => i.categoryId === categoryId);
  };

  const handleSaveAndClose = () => {
    onUpdateIssues(currentIssues);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#F9FAFB' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: 'linear-gradient(135deg, #2D9596 0%, #265073 100%)',
          borderColor: 'transparent'
        }}
      >
        <div>
          <h2 className="text-[24px] font-bold text-white">
            Quick Issue Tracking
          </h2>
          <p className="text-[14px] text-white/90">
            {classSession.topic} • Tap-tap-track workflow
          </p>
        </div>
        <div className="flex items-center gap-3">
          {undoStack.length > 0 && (
            <button
              onClick={undo}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Undo2 className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Undo</span>
            </button>
          )}
          <Button
            onClick={handleSaveAndClose}
            className="h-[44px] px-6"
            style={{ background: '#16A34A', color: '#FFFFFF' }}
          >
            <Save className="w-5 h-5 mr-2" />
            Save & Close
          </Button>
          <button
            onClick={handleSaveAndClose}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Student Selector (30%) */}
        <div className="w-[30%] border-r overflow-y-auto" style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold" style={{ color: '#265073' }}>
                Students ({students.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-[12px] px-2 py-1 rounded hover:bg-gray-100"
                  style={{ color: '#2D9596' }}
                >
                  ✓ All
                </button>
                <button
                  onClick={clearAll}
                  className="text-[12px] px-2 py-1 rounded hover:bg-gray-100"
                  style={{ color: '#6B7280' }}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {students.map((student) => {
                const issueCount = getIssueCount(student.id);
                const isSelected = selectedStudentIds.includes(student.id);

                return (
                  <button
                    key={student.id}
                    onClick={() => {
                      if (activeIssueId) {
                        // Rapid mode: clicking student when issue is active
                        const category = categories.find(c => c.id === activeIssueId);
                        if (category) {
                          toggleIssueForStudent(student.id, category.id, category.label);
                        }
                      } else {
                        // Normal mode: toggle selection
                        toggleStudentSelection(student.id);
                      }
                    }}
                    className="w-full p-3 rounded-lg border-2 text-left transition-all hover:shadow-md"
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

        {/* Right: Issue Categories (70%) */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-[20px] font-bold" style={{ color: '#265073' }}>
              Issue Categories for: {classSession.topic}
            </h3>
            <p className="text-[14px] mt-1" style={{ color: '#6B7280' }}>
              {selectedStudentIds.length > 0
                ? `${selectedStudentIds.length} student${selectedStudentIds.length !== 1 ? 's' : ''} selected → Click issue to track`
                : activeIssueId
                ? '🎯 Rapid mode active → Click students to mark this issue'
                : 'Select students first, then click issues OR click issue first, then tap students'}
            </p>
          </div>

          <div className="space-y-6">
            {categories.map((category) => {
              const isActive = activeIssueId === category.id;

              return (
                <div key={category.id}>
                  <h4
                    className="text-[16px] font-bold mb-3 flex items-center gap-2"
                    style={{ color: isActive ? '#2D9596' : '#265073' }}
                  >
                    {isActive && <AlertCircle className="w-5 h-5" style={{ color: '#2D9596' }} />}
                    {category.label}
                  </h4>
                  <button
                    onClick={() => trackIssue(category.id, category.label)}
                    className="w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md active:scale-98"
                    style={{
                      background: isActive ? '#E6F7F4' : '#FFFFFF',
                      borderColor: isActive ? '#2D9596' : '#E5E7EB'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[16px] font-medium"
                        style={{ color: isActive ? '#2D9596' : '#265073' }}
                      >
                        {category.label}
                      </span>
                      {isActive && (
                        <span className="text-[13px] font-bold" style={{ color: '#2D9596' }}>
                          Tap students →
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      {selectedStudentIds.length > 0 && !activeIssueId && (
        <div
          className="border-t px-6 py-4"
          style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold" style={{ color: '#265073' }}>
                Selected: {selectedStudentIds.map(id => students.find(s => s.id === id)?.name).join(', ')}
              </p>
              <p className="text-[12px]" style={{ color: '#6B7280' }}>
                Click any issue category above to track for these students
              </p>
            </div>
            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-lg border-2 transition-all"
              style={{
                borderColor: '#E5E7EB',
                color: '#6B7280'
              }}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {activeIssueId && (
        <div
          className="border-t px-6 py-4"
          style={{ background: '#E6F7F4', borderColor: '#2D9596' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-bold" style={{ color: '#2D9596' }}>
                🎯 Rapid Mode: {categories.find(c => c.id === activeIssueId)?.label}
              </p>
              <p className="text-[12px]" style={{ color: '#265073' }}>
                Now tap students on the left to quickly mark this issue
              </p>
            </div>
            <button
              onClick={() => setActiveIssueId(null)}
              className="px-4 py-2 rounded-lg transition-all"
              style={{
                background: '#2D9596',
                color: '#FFFFFF'
              }}
            >
              Exit Rapid Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Also export as named export for flexibility
export { RapidIssueTracker };
