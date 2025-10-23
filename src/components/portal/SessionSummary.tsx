import { useState } from 'react';
import { Button } from '../ui/button';
import { X, Sparkles, FileDown, Trash2, Save, Plus } from 'lucide-react';
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

export function SessionSummary({
  classSession,
  students,
  studentIssues: initialStudentIssues,
  onClose,
  onEndClass
}: SessionSummaryProps) {
  const [studentIssues, setStudentIssues] = useState<StudentIssues>(initialStudentIssues);
  const [studentNotes, setStudentNotes] = useState<StudentNotes>({});
  const [classWideNotes, setClassWideNotes] = useState('');
  const [exportedToAI, setExportedToAI] = useState(false);

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

  const handleExportToAI = () => {
    // Prepare data for AI export
    const exportData = {
      class: {
        topic: classSession.topic,
        date: classSession.date,
        time: classSession.time,
        venue: classSession.venue
      },
      classWideNotes,
      students: students.map(student => {
        const issues = studentIssues[student.id] || [];
        const notes = studentNotes[student.id] || '';

        return {
          name: student.name,
          deviceType: student.deviceType,
          status: student.status,
          issues: issues.map(i => i.categoryLabel),
          personalizedNotes: notes,
          accessibilityNeeds: student.accessibilityNeeds
        };
      })
    };

    // In real implementation, this would send to AI API
    console.log('Exporting to AI:', exportData);

    // Download as JSON for now
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-export-${classSession.topic.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    setExportedToAI(true);
  };

  const getTotalIssues = () => {
    return Object.values(studentIssues).reduce((sum, issues) => sum + issues.length, 0);
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
            <h3 className="text-[18px] font-bold mb-3" style={{ color: '#265073' }}>
              Class-Wide Notes
            </h3>
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
                      <label className="text-[14px] font-semibold mb-2 block" style={{ color: '#265073' }}>
                        Personalized Notes for {student.name.split(' ')[0]}:
                      </label>
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
              onClick={handleExportToAI}
              disabled={exportedToAI}
              className="flex-1 h-[50px]"
              style={{
                background: exportedToAI ? '#10B981' : '#2D9596',
                color: '#FFFFFF'
              }}
            >
              {exportedToAI ? (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Exported to AI
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Export to AI
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
              End Class
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
