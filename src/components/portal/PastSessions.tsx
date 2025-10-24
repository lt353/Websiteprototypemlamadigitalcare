import { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Calendar, Users, FileText, Trash2, Send } from 'lucide-react';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

interface PastSessionsProps {
  onBack: () => void;
}

export function PastSessions({ onBack }: PastSessionsProps) {
  const [sessions, setSessions] = useState(() => {
    return JSON.parse(localStorage.getItem('teacherSessions') || '[]');
  });

  const deleteSession = (sessionId: string) => {
    const updated = sessions.filter((s: any) => s.sessionId !== sessionId);
    setSessions(updated);
    localStorage.setItem('teacherSessions', JSON.stringify(updated));
  };

  const resendToStudent = (session: any, studentId: string) => {
    alert(`Re-sending personalized materials to student ${studentId}`);
    // In production, would call API to regenerate and send materials
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
            <img
              src={logoWithTagline}
              alt="Mālama Digital Care"
              className="h-12 w-auto"
            />
            <Button
              onClick={onBack}
              variant="outline"
              className="h-10 px-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Past Class Sessions
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            View saved sessions and send additional materials to students
          </p>
        </div>

        {sessions.length > 0 ? (
          <div className="space-y-6">
            {sessions.map((session: any) => (
              <div
                key={session.sessionId}
                className="rounded-xl p-6 border-2"
                style={{
                  background: '#FFFFFF',
                  borderColor: '#E5E7EB'
                }}
              >
                {/* Session Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>
                      {session.class?.topic}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: '#6B7280' }} />
                        <span className="text-[14px]" style={{ color: '#6B7280' }}>
                          {session.class?.date} • {session.class?.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: '#6B7280' }} />
                        <span className="text-[14px]" style={{ color: '#6B7280' }}>
                          {session.students?.length || 0} students
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSession(session.sessionId)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete session"
                  >
                    <Trash2 className="w-5 h-5" style={{ color: '#EF4444' }} />
                  </button>
                </div>

                {/* Class-Wide Notes */}
                {session.classWideNotes && (
                  <div className="mb-4 p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                    <p className="text-[14px] font-semibold mb-2" style={{ color: '#265073' }}>
                      Class-Wide Notes:
                    </p>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>
                      {session.classWideNotes}
                    </p>
                  </div>
                )}

                {/* Students */}
                <div className="space-y-3">
                  {session.students?.map((student: any) => {
                    const hasContent = student.issues?.length > 0 || student.personalizedNotes;

                    return (
                      <div
                        key={student.id}
                        className="p-4 rounded-lg border"
                        style={{
                          background: hasContent ? '#FEF3C7' : '#F9FAFB',
                          borderColor: hasContent ? '#FCD34D' : '#E5E7EB'
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-[16px] font-bold mb-2" style={{ color: '#265073' }}>
                              {student.name}
                            </h4>

                            {student.issues?.length > 0 && (
                              <div className="mb-2">
                                <p className="text-[13px] font-semibold mb-1" style={{ color: '#6B7280' }}>
                                  Issues Tracked:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {student.issues.map((issue: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 rounded text-[12px]"
                                      style={{
                                        background: '#E67E50',
                                        color: '#FFFFFF'
                                      }}
                                    >
                                      {issue}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {student.personalizedNotes && (
                              <div className="mt-2 p-2 rounded" style={{ background: '#FFFFFF' }}>
                                <p className="text-[13px] font-semibold mb-1" style={{ color: '#265073' }}>
                                  Notes:
                                </p>
                                <p className="text-[13px]" style={{ color: '#6B7280' }}>
                                  {student.personalizedNotes}
                                </p>
                              </div>
                            )}
                          </div>

                          {hasContent && (
                            <button
                              onClick={() => resendToStudent(session, student.id)}
                              className="ml-4 px-3 py-2 rounded-lg transition-all"
                              style={{
                                background: '#2D9596',
                                color: '#FFFFFF'
                              }}
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl p-12 text-center border-2"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB'
            }}
          >
            <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#D1D5DB' }} />
            <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
              No Past Sessions Yet
            </h3>
            <p className="text-[16px]" style={{ color: '#6B7280' }}>
              Complete a class and export to AI to see sessions here
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
