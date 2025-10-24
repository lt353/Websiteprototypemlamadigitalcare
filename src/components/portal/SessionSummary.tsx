import { useState } from 'react';
import { Button } from '../ui/button';
import { X, Sparkles, FileDown, Trash2, Save, Check } from 'lucide-react';
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

interface StudentNotes {
  [studentId: string]: string;
}

interface SessionSummaryProps {
  classSession: ClassSession;
  students: Student[];
  studentIssues: StudentIssues;
  onClose: () => void;
  onEndClass: () => void;
}

export default function SessionSummary({
  classSession,
  students,
  studentIssues: initialStudentIssues,
  onClose,
  onEndClass
}: SessionSummaryProps) {
  const [studentIssues, setStudentIssues] = useState<StudentIssues>(initialStudentIssues);
  const [studentNotes, setStudentNotes] = useState<StudentNotes>({});
  const [savedStudentNotes, setSavedStudentNotes] = useState<StudentNotes>({});
  const [classWideNotes, setClassWideNotes] = useState('');
  const [savedClassWideNotes, setSavedClassWideNotes] = useState('');
  const [exportedToAI, setExportedToAI] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const removeIssue = (studentId: string, issueIndex: number) => {
    const updated = { ...studentIssues };
    const issues = [...(updated[studentId] || [])];
    issues.splice(issueIndex, 1);
    updated[studentId] = issues;
    setStudentIssues(updated);
  };

  const updateStudentNote = (studentId: string, note: string) => {
    setStudentNotes(prev => ({
      ...prev,
      [studentId]: note
    }));
  };

  const saveStudentNote = (studentId: string) => {
    const note = studentNotes[studentId] || '';
    setSavedStudentNotes(prev => ({
      ...prev,
      [studentId]: note
    }));
  };

  const saveClassWideNotes = () => {
    setSavedClassWideNotes(classWideNotes);
  };

  const handleExportToAI = async () => {
    setIsExporting(true);

    // Prepare data for AI export
    const exportData = {
      sessionId: `session-${Date.now()}`,
      class: {
        topic: classSession.topic,
        date: classSession.date,
        time: classSession.time,
        venue: classSession.venue
      },
      classWideNotes: savedClassWideNotes,
      students: students.map(student => {
        const issues = studentIssues[student.id] || [];
        const notes = savedStudentNotes[student.id] || '';

        return {
          id: student.id,
          name: student.name,
          deviceType: student.deviceType,
          status: student.status,
          issues: issues.map(i => i.categoryLabel),
          personalizedNotes: notes,
          accessibilityNeeds: student.accessibilityNeeds
        };
      }),
      exportedAt: new Date().toISOString()
    };

    // Save to localStorage (session history)
    const existingSessions = JSON.parse(localStorage.getItem('teacherSessions') || '[]');
    existingSessions.unshift(exportData); // Add to beginning
    localStorage.setItem('teacherSessions', JSON.stringify(existingSessions));

    // Simulate AI API call (in real implementation, this would send to Claude API)
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('📤 Sending to AI for personalized page generation:', exportData);

    // In production, this would be:
    // await fetch('/api/generate-personalized-pages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(exportData)
    // });

    setIsExporting(false);
    setExportedToAI(true);
  };

  const getTotalIssues = () => {
    return Object.values(studentIssues).reduce((sum, issues) => sum + issues.length, 0);
  };

  const isStudentNoteSaved = (studentId: string) => {
    const current = studentNotes[studentId] || '';
    const saved = savedStudentNotes[studentId] || '';
    return current === saved && current.length > 0;
  };

  const hasStudentNoteChanged = (studentId: string) => {
    const current = studentNotes[studentId] || '';
    const saved = savedStudentNotes[studentId] || '';
    return current !== saved && current.length > 0;
  };

  const isClassWideNotesSaved = () => {
    return classWideNotes === savedClassWideNotes && classWideNotes.length > 0;
  };

  const hasClassWideNotesChanged = () => {
    return classWideNotes !== savedClassWideNotes && classWideNotes.length > 0;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-5 border-b flex-shrink-0"
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
                {classSession.date} • {classSession.time} • {getTotalIssues()} Issues Tracked
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
        <div className="flex-1 overflow-y-auto">
          {/* Class-Wide Notes */}
          <div className="px-6 py-6 border-b" style={{ background: '#F9FAFB', borderColor: '#E5E7EB' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[18px] font-bold" style={{ color: '#265073' }}>
                Class-Wide Notes
              </h3>
              <button
                onClick={saveClassWideNotes}
                disabled={!hasClassWideNotesChanged()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: isClassWideNotesSaved() ? '#10B981' : (hasClassWideNotesChanged() ? '#2D9596' : '#D1D5DB'),
                  color: '#FFFFFF',
                  cursor: hasClassWideNotesChanged() ? 'pointer' : 'default'
                }}
              >
                {isClassWideNotesSaved() ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-[14px] font-semibold">Saved</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span className="text-[14px] font-semibold">Save</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              value={classWideNotes}
              onChange={(e) => setClassWideNotes(e.target.value)}
              placeholder="Add general notes about this class session, overall themes, class atmosphere, etc."
              className="w-full p-4 rounded-lg border-2 focus:outline-none focus:border-[#2D9596] transition-colors"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E7EB',
                color: '#265073',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Student Details with Editing */}
          <div className="px-6 py-6">
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              Student-by-Student Review
            </h3>
            <p className="text-[14px] mb-4" style={{ color: '#6B7280' }}>
              Review tracked issues, remove any that were resolved, and add personalized notes for each student
            </p>

            <div className="space-y-4">
              {students.map((student) => {
                const issues = studentIssues[student.id] || [];
                const studentNote = studentNotes[student.id] || '';

                return (
                  <div
                    key={student.id}
                    className="p-5 rounded-xl border-2"
                    style={{
                      background: '#FFFFFF',
                      borderColor: issues.length > 0 ? '#E67E50' : '#E5E7EB'
                    }}
                  >
                    {/* Student Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-[18px] font-bold" style={{ color: '#265073' }}>
                          {student.name}
                        </h4>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>
                          {student.deviceType} • {student.status}
                        </p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-[14px] font-bold"
                        style={{
                          background: issues.length > 0 ? '#E67E50' : '#D1D5DB',
                          color: '#FFFFFF'
                        }}
                      >
                        {issues.length} issue{issues.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Tracked Issues */}
                    {issues.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[14px] font-semibold mb-2" style={{ color: '#265073' }}>
                          Tracked Issues:
                        </p>
                        <div className="space-y-2">
                          {issues.map((issue, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg"
                              style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
                            >
                              <span className="text-[14px]" style={{ color: '#265073' }}>
                                {issue.categoryLabel}
                              </span>
                              <button
                                onClick={() => removeIssue(student.id, index)}
                                className="p-1.5 rounded hover:bg-red-100 transition-colors"
                                title="Remove this issue"
                              >
                                <Trash2 className="w-4 h-4" style={{ color: '#EF4444' }} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Student Notes */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[14px] font-semibold" style={{ color: '#265073' }}>
                          Personalized Notes for {student.name.split(' ')[0]}:
                        </label>
                        <button
                          onClick={() => saveStudentNote(student.id)}
                          disabled={!hasStudentNoteChanged(student.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            background: isStudentNoteSaved(student.id) ? '#10B981' : (hasStudentNoteChanged(student.id) ? '#2D9596' : '#D1D5DB'),
                            color: '#FFFFFF',
                            cursor: hasStudentNoteChanged(student.id) ? 'pointer' : 'default'
                          }}
                        >
                          {isStudentNoteSaved(student.id) ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span className="text-[13px] font-semibold">Saved</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span className="text-[13px] font-semibold">Save</span>
                            </>
                          )}
                        </button>
                      </div>
                      <textarea
                        value={studentNote}
                        onChange={(e) => updateStudentNote(student.id, e.target.value)}
                        placeholder="Add specific notes about this student's progress, questions they had, follow-up needed, etc."
                        className="w-full p-3 rounded-lg border-2 focus:outline-none focus:border-[#2D9596] transition-colors"
                        style={{
                          background: '#FFFFFF',
                          borderColor: '#E5E7EB',
                          color: '#265073',
                          minHeight: '80px',
                          resize: 'vertical'
                        }}
                      />
                      {/* Show saved notes */}
                      {isStudentNoteSaved(student.id) && savedStudentNotes[student.id] && (
                        <div className="mt-3 p-3 rounded-lg" style={{ background: '#F0FDF4', border: '1px solid #10B981' }}>
                          <p className="text-[13px] font-semibold mb-1" style={{ color: '#10B981' }}>
                            ✓ Saved Notes:
                          </p>
                          <p className="text-[14px]" style={{ color: '#265073' }}>
                            {savedStudentNotes[student.id]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="sticky bottom-0 px-6 py-4 border-t flex-shrink-0"
          style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-[50px]"
            >
              ← Go Back to Add More Issues
            </Button>
            <Button
              onClick={handleExportToAI}
              disabled={exportedToAI || isExporting}
              className="flex-1 h-[50px]"
              style={{
                background: exportedToAI ? '#10B981' : (isExporting ? '#9CA3AF' : '#2D9596'),
                color: '#FFFFFF'
              }}
            >
              {exportedToAI ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Sent to AI Successfully
                </>
              ) : isExporting ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Sending to AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Send to AI for Page Generation
                </>
              )}
            </Button>
            <Button
              onClick={onEndClass}
              className="flex-1 h-[50px]"
              style={{
                background: '#E67E50',
                color: '#FFFFFF'
              }}
            >
              <FileDown className="w-5 h-5 mr-2" />
              End Class & Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
