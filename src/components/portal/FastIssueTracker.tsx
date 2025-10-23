import { useState } from 'react';
import { Button } from '../ui/button';
import { X, Save, Edit3, Check } from 'lucide-react';
import { Student, ClassSession } from './TeacherRouter';
import { getIssuesForClass } from './classIssuesData';

interface TrackedIssue {
  categoryId: string;
  categoryLabel: string;
  timestamp: Date;
  notes?: string;
}

interface StudentIssues {
  [studentId: string]: TrackedIssue[];
}

interface FastIssueTrackerProps {
  classSession: ClassSession;
  students: Student[];
  studentIssues: StudentIssues;
  onUpdateIssues: (issues: StudentIssues) => void;
  onClose: () => void;
}

export function FastIssueTracker({
  classSession,
  students,
  studentIssues,
  onUpdateIssues,
  onClose
}: FastIssueTrackerProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [currentIssues, setCurrentIssues] = useState<StudentIssues>(studentIssues);
  const [editingNotes, setEditingNotes] = useState<{ studentId: string; categoryId: string } | null>(null);
  const [noteText, setNoteText] = useState('');

  const categories = getIssuesForClass(classSession.topic);

  const handleToggleIssue = (studentId: string, categoryId: string, categoryLabel: string) => {
    const studentCurrentIssues = currentIssues[studentId] || [];
    const existingIssueIndex = studentCurrentIssues.findIndex(issue => issue.categoryId === categoryId);

    if (existingIssueIndex >= 0) {
      // Remove issue
      const updatedIssues = [...studentCurrentIssues];
      updatedIssues.splice(existingIssueIndex, 1);
      setCurrentIssues({
        ...currentIssues,
        [studentId]: updatedIssues
      });
    } else {
      // Add issue
      const newIssue: TrackedIssue = {
        categoryId,
        categoryLabel,
        timestamp: new Date(),
        notes: ''
      };
      setCurrentIssues({
        ...currentIssues,
        [studentId]: [...studentCurrentIssues, newIssue]
      });
    }
  };

  const handleSaveNote = (studentId: string, categoryId: string) => {
    const studentCurrentIssues = currentIssues[studentId] || [];
    const updatedIssues = studentCurrentIssues.map(issue =>
      issue.categoryId === categoryId ? { ...issue, notes: noteText } : issue
    );
    setCurrentIssues({
      ...currentIssues,
      [studentId]: updatedIssues
    });
    setEditingNotes(null);
    setNoteText('');
  };

  const handleStartEditNote = (studentId: string, categoryId: string) => {
    const studentCurrentIssues = currentIssues[studentId] || [];
    const issue = studentCurrentIssues.find(i => i.categoryId === categoryId);
    setNoteText(issue?.notes || '');
    setEditingNotes({ studentId, categoryId });
  };

  const handleSaveAndClose = () => {
    onUpdateIssues(currentIssues);
    onClose();
  };

  const getIssueCount = (studentId: string) => {
    return (currentIssues[studentId] || []).length;
  };

  const hasIssue = (studentId: string, categoryId: string) => {
    const studentCurrentIssues = currentIssues[studentId] || [];
    return studentCurrentIssues.some(issue => issue.categoryId === categoryId);
  };

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSaveAndClose();
      }}
    >
      <div
        className="w-full max-w-7xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ background: '#FFFFFF' }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
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
              Select student → Click issue categories
            </p>
          </div>
          <div className="flex items-center gap-3">
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
          {/* Left: Student List */}
          <div
            className="w-80 border-r overflow-y-auto"
            style={{ background: '#F9FAFB', borderColor: '#E5E7EB' }}
          >
            <div className="p-4">
              <h3 className="text-[18px] font-bold mb-4" style={{ color: '#265073' }}>
                Students ({students.length})
              </h3>
              <div className="space-y-2">
                {students.map((student) => {
                  const issueCount = getIssueCount(student.id);
                  const isSelected = selectedStudentId === student.id;

                  return (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className="w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md"
                      style={{
                        background: isSelected ? '#E6F7F4' : '#FFFFFF',
                        borderColor: isSelected ? '#2D9596' : '#E5E7EB'
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[16px] font-semibold"
                          style={{ color: isSelected ? '#2D9596' : '#265073' }}
                        >
                          {student.name}
                        </span>
                        {issueCount > 0 && (
                          <span
                            className="px-2 py-1 rounded-full text-[12px] font-bold"
                            style={{
                              background: isSelected ? '#2D9596' : '#E67E50',
                              color: '#FFFFFF'
                            }}
                          >
                            {issueCount}
                          </span>
                        )}
                      </div>
                      <span className="text-[13px]" style={{ color: '#6B7280' }}>
                        {student.deviceType}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Issue Categories */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedStudent ? (
              <>
                <div className="mb-6">
                  <h3 className="text-[24px] font-bold" style={{ color: '#265073' }}>
                    {selectedStudent.name}
                  </h3>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>
                    Click categories to toggle • {getIssueCount(selectedStudent.id)} issues tracked
                  </p>
                </div>

                <div className="space-y-3">
                  {categories.map((category) => {
                    const isTracked = hasIssue(selectedStudent.id, category.id);
                    const issue = (currentIssues[selectedStudent.id] || []).find(
                      i => i.categoryId === category.id
                    );
                    const isEditingThis = editingNotes?.studentId === selectedStudent.id &&
                                        editingNotes?.categoryId === category.id;

                    return (
                      <div
                        key={category.id}
                        className="rounded-lg border-2"
                        style={{
                          background: isTracked ? '#E6F7F4' : '#FFFFFF',
                          borderColor: isTracked ? '#2D9596' : '#E5E7EB'
                        }}
                      >
                        <button
                          onClick={() =>
                            handleToggleIssue(selectedStudent.id, category.id, category.label)
                          }
                          className="w-full flex items-center justify-between p-4 text-left transition-all hover:shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0"
                              style={{
                                background: isTracked ? '#2D9596' : '#FFFFFF',
                                borderColor: isTracked ? '#2D9596' : '#D1D5DB'
                              }}
                            >
                              {isTracked && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span
                              className="text-[17px] font-medium"
                              style={{ color: isTracked ? '#2D9596' : '#265073' }}
                            >
                              {category.label}
                            </span>
                          </div>
                          {isTracked && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartEditNote(selectedStudent.id, category.id);
                              }}
                              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                            >
                              <Edit3 className="w-4 h-4" style={{ color: '#2D9596' }} />
                            </button>
                          )}
                        </button>

                        {/* Notes Section */}
                        {isTracked && (
                          <div className="px-4 pb-4">
                            {isEditingThis ? (
                              <div className="space-y-2">
                                <textarea
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  placeholder="Add notes about this issue..."
                                  className="w-full p-3 rounded-lg border text-[14px]"
                                  style={{
                                    borderColor: '#E5E7EB',
                                    minHeight: '80px'
                                  }}
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleSaveNote(selectedStudent.id, category.id)}
                                    className="h-[36px] px-4"
                                    style={{ background: '#2D9596', color: '#FFFFFF' }}
                                  >
                                    Save Note
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setEditingNotes(null);
                                      setNoteText('');
                                    }}
                                    variant="outline"
                                    className="h-[36px] px-4"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : issue?.notes ? (
                              <div className="p-3 rounded-lg" style={{ background: '#F9FAFB' }}>
                                <p className="text-[14px]" style={{ color: '#265073' }}>
                                  {issue.notes}
                                </p>
                              </div>
                            ) : (
                              <p className="text-[13px] italic" style={{ color: '#9CA3AF' }}>
                                No notes yet. Click the edit icon to add notes.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: '#F3F4F6' }}
                  >
                    <span className="text-[48px]">👈</span>
                  </div>
                  <p className="text-[18px] font-medium" style={{ color: '#6B7280' }}>
                    Select a student to start tracking issues
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
