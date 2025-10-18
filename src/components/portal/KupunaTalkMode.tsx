import { useState, useRef } from 'react';
import { Mic, Video, X, CheckCircle } from 'lucide-react';

interface KupunaTalkModeProps {
  onClose: () => void;
}

export function KupunaTalkMode({ onClose }: KupunaTalkModeProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video' | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = (type: 'audio' | 'video') => {
    setRecordingType(type);
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    // Auto-stop after 2 minutes
    setTimeout(() => {
      stopRecording();
    }, 120000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setRecordingComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (recordingComplete) {
    return (
      <div 
        className="fixed inset-0 z-[60]"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      >
        <div className="fixed inset-0 flex items-center justify-center p-6 max-h-screen overflow-y-auto" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
          <div 
            className="w-full max-w-2xl rounded-3xl text-center my-auto"
            style={{ 
              background: '#FFFFFF',
              padding: 'clamp(32px, 5vw, 48px)',
              maxHeight: '90vh'
            }}
          >
            <div 
              className="rounded-full mx-auto flex items-center justify-center max-[480px]:w-24 max-[480px]:h-24 max-[480px]:mb-6"
              style={{ 
                background: '#DCFCE7',
                width: '128px',
                height: '128px',
                marginBottom: '32px'
              }}
            >
              <CheckCircle className="max-[480px]:w-16 max-[480px]:h-16 w-20 h-20" style={{ color: '#16A34A' }} />
            </div>

            <h2 className="max-[480px]:text-[28px]" style={{ color: '#265073', fontSize: '40px', lineHeight: '1.2', marginBottom: '16px' }}>
              Mahalo! We received your message
            </h2>
            
            <p className="max-[480px]:text-[18px]" style={{ fontSize: '24px', color: '#6B7280', lineHeight: '1.5', marginBottom: '40px' }}>
              A Digital Care Guide will contact you soon to help with your problem.
            </p>

            <button
              onClick={onClose}
              className="px-12 py-6 rounded-2xl transition-all max-[480px]:px-8 max-[480px]:py-5 max-[480px]:text-[20px]"
              style={{ 
                background: '#2D9596',
                color: '#FFFFFF',
                fontSize: '24px',
                minHeight: '80px',
                minWidth: '280px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#258B8C';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2D9596';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[60]"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-4 rounded-full transition-all z-10"
        style={{ 
          background: '#FFFFFF',
          color: '#265073'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F3F4F6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
        }}
      >
        <X className="w-8 h-8" />
      </button>

      <div className="fixed inset-0 flex items-center justify-center p-6 max-h-screen overflow-y-auto" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
        <div 
          className="w-full max-w-3xl rounded-3xl text-center my-auto"
          style={{ 
            background: '#FFFFFF',
            padding: 'clamp(24px, 5vw, 48px)',
            maxHeight: '90vh'
          }}
        >
          {!isRecording && !recordingType ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="max-[480px]:text-[32px]" style={{ color: '#265073', fontSize: '48px', lineHeight: '1.2', marginBottom: '16px' }}>
                Tell us what's wrong
              </h1>
              
              <p className="max-[480px]:text-[18px]" style={{ fontSize: '28px', color: '#6B7280', lineHeight: '1.5', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                You can say things like "I can't open my email" or "I think I got a scam text."
              </p>

              {/* Large Microphone Button */}
              <div className="flex flex-col items-center" style={{ marginBottom: '32px', marginTop: '8px' }}>
                <button
                  onClick={() => startRecording('audio')}
                  className="rounded-full transition-all relative max-[480px]:w-[120px] max-[480px]:h-[120px]"
                  style={{ 
                    background: '#4DB8A8',
                    width: '200px',
                    height: '200px',
                    boxShadow: '0 8px 32px rgba(77, 184, 168, 0.4)',
                    marginBottom: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 12px 48px rgba(77, 184, 168, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(77, 184, 168, 0.4)';
                  }}
                >
                  <Mic className="max-[480px]:w-16 max-[480px]:h-16 w-24 h-24 mx-auto" style={{ color: '#FFFFFF' }} />
                </button>

                <div 
                  className="px-4 py-2 rounded-lg max-[480px]:px-3 max-[480px]:py-1.5"
                  style={{ 
                    maxWidth: '180px',
                    background: 'rgba(45, 149, 150, 0.95)',
                  }}
                >
                  <p 
                    className="text-center"
                    style={{ 
                      fontSize: '14px', 
                      color: '#FFFFFF', 
                      fontWeight: '600',
                      lineHeight: '1.3'
                    }}
                  >
                    Tap mic to talk
                  </p>
                </div>
              </div>

              {/* Video Option */}
              <button
                onClick={() => startRecording('video')}
                className="flex items-center gap-3 mx-auto px-8 py-5 rounded-2xl transition-all border-3 max-[480px]:px-6 max-[480px]:py-4"
                style={{ 
                  background: '#FFFFFF',
                  color: '#6366F1',
                  border: '3px solid #6366F1',
                  fontSize: '22px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#EEF2FF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Video className="w-7 h-7 max-[480px]:w-6 max-[480px]:h-6" />
                <span className="max-[480px]:text-[16px]">Record a short video instead</span>
              </button>
            </div>
          ) : isRecording ? (
            <div className="flex flex-col items-center justify-center">
              <div style={{ marginBottom: '32px' }}>
                {/* Animated pulse */}
                <div className="relative mx-auto max-[480px]:w-[160px] max-[480px]:h-[160px]" style={{ width: '240px', height: '240px' }}>
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ 
                      background: '#4DB8A8',
                      opacity: 0.3
                    }}
                  />
                  <div 
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{ background: '#4DB8A8' }}
                  >
                    {recordingType === 'audio' ? (
                      <Mic className="max-[480px]:w-20 max-[480px]:h-20 w-28 h-28" style={{ color: '#FFFFFF' }} />
                    ) : (
                      <Video className="max-[480px]:w-20 max-[480px]:h-20 w-28 h-28" style={{ color: '#FFFFFF' }} />
                    )}
                  </div>
                </div>
              </div>

              <h2 className="max-[480px]:text-[28px]" style={{ color: '#265073', fontSize: '40px', lineHeight: '1.2', marginBottom: '16px' }}>
                Listening...
              </h2>

              <p className="max-[480px]:text-[24px]" style={{ fontSize: '32px', color: '#2D9596', marginBottom: '32px', fontWeight: '600' }}>
                {formatTime(recordingTime)}
              </p>

              <p className="max-[480px]:text-[18px]" style={{ fontSize: '24px', color: '#6B7280', marginBottom: '32px' }}>
                {recordingType === 'audio' 
                  ? 'Speak clearly and tell us what you need help with'
                  : 'Show us the problem on your screen or device'}
              </p>

              <button
                onClick={stopRecording}
                className="px-12 py-6 rounded-2xl transition-all max-[480px]:px-8 max-[480px]:py-5 max-[480px]:text-[20px]"
                style={{ 
                  background: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  minHeight: '80px',
                  minWidth: '280px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#B91C1C';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#DC2626';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Stop Recording
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
