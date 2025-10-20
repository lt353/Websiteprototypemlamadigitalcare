import { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  PhoneOff, 
  User,
  MessageSquare,
  X
} from 'lucide-react';

interface VideoCallScreenProps {
  instructorName?: string;
  sessionDate?: string;
  sessionTime?: string;
  onLeaveCall: () => void;
}

export function VideoCallScreen({
  instructorName = 'Tea Araki',
  sessionDate = 'Nov 28',
  sessionTime = '2:00 PM',
  onLeaveCall
}: VideoCallScreenProps) {
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Timer for session duration
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLeaveCall = () => {
    if (confirm('Are you sure you want to leave this session?')) {
      onLeaveCall();
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: '#F9FAFB' }}>
      {/* Top Bar */}
      <div 
        className="flex items-center justify-between px-6"
        style={{ 
          height: '60px',
          background: '#2D3748',
          borderBottom: '1px solid #1A202C'
        }}
      >
        <h1 style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: '600' }}>
          Session with {instructorName}
        </h1>
        <div style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: '600' }}>
          {formatTime(sessionDuration)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid Area */}
        <div className="flex-1 p-4">
          <div className="h-full grid grid-rows-2 gap-4">
            {/* Instructor Video - Large Top Section */}
            <div className="row-span-1">
              <div 
                className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: '#2D3748' }}
              >
                {/* Placeholder for instructor video */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ background: '#4A5568' }}
                  >
                    <User className="w-20 h-20" style={{ color: '#A0AEC0' }} />
                  </div>
                  <p style={{ color: '#A0AEC0', fontSize: '20px', fontWeight: '600' }}>
                    {instructorName}
                  </p>
                </div>

                {/* Name Label Overlay */}
                <div 
                  className="absolute bottom-0 left-0 right-0 px-4 py-3"
                  style={{ 
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600' }}>
                      {instructorName} (Instructor)
                    </span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#10B981' }}
                      />
                      <span style={{ color: '#FFFFFF', fontSize: '14px' }}>
                        Speaking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Participant Video and Empty Tiles */}
            <div className="row-span-1 grid grid-cols-3 gap-4">
              {/* Empty Tile 1 */}
              <div 
                className="rounded-lg overflow-hidden"
                style={{ background: '#1A202C' }}
              />

              {/* Empty Tile 2 */}
              <div 
                className="rounded-lg overflow-hidden"
                style={{ background: '#1A202C' }}
              />

              {/* Participant Video (Self) */}
              <div 
                className="relative rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: '#2D3748' }}
              >
                {isCameraEnabled ? (
                  <>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: '#4A5568' }}
                      >
                        <User className="w-10 h-10" style={{ color: '#A0AEC0' }} />
                      </div>
                      <p style={{ color: '#A0AEC0', fontSize: '14px' }}>
                        You
                      </p>
                    </div>
                    {/* Name Label */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 px-3 py-2"
                      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
                    >
                      <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>
                        You
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <VideoOff className="w-12 h-12" style={{ color: '#DC2626' }} />
                      <p style={{ color: '#A0AEC0', fontSize: '14px' }}>
                        Camera Off
                      </p>
                    </div>
                  </>
                )}

                {/* Mic muted indicator */}
                {!isMicEnabled && (
                  <div 
                    className="absolute top-2 right-2 p-2 rounded-full"
                    style={{ background: '#DC2626' }}
                  >
                    <MicOff className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel - Session Notes */}
        {showNotes && (
          <div 
            className="flex flex-col border-l"
            style={{ 
              width: '320px',
              background: '#F9FAFB',
              borderColor: '#E5E7EB'
            }}
          >
            {/* Notes Header */}
            <div 
              className="flex items-center justify-between px-4 border-b"
              style={{ 
                height: '60px',
                borderColor: '#E5E7EB'
              }}
            >
              <h2 style={{ fontSize: '18px', color: '#265073', fontWeight: '700' }}>
                Session Notes
              </h2>
              <button
                onClick={() => setShowNotes(false)}
                className="p-2 rounded-lg transition-all"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E5E7EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X className="w-5 h-5" style={{ color: '#6B7280' }} />
              </button>
            </div>

            {/* Notes Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Session Info */}
                <div 
                  className="p-4 rounded-lg"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                >
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                    Session Topics:
                  </p>
                  <ul className="space-y-2">
                    <li style={{ fontSize: '16px', color: '#265073' }}>
                      • Email Management
                    </li>
                    <li style={{ fontSize: '16px', color: '#265073' }}>
                      • Two-Factor Authentication
                    </li>
                  </ul>
                </div>

                {/* Quick Notes */}
                <div>
                  <label 
                    htmlFor="notes"
                    style={{ 
                      fontSize: '14px', 
                      color: '#6B7280',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    Your Notes:
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Type your notes here..."
                    className="w-full p-3 rounded-lg resize-none"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      fontSize: '16px',
                      color: '#265073',
                      minHeight: '200px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div 
        className="flex items-center justify-center px-6"
        style={{ 
          height: '80px',
          background: '#FFFFFF',
          borderTop: '1px solid #E5E7EB',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-center gap-4">
          {/* Microphone Button */}
          <button
            onClick={() => setIsMicEnabled(!isMicEnabled)}
            className="rounded-full flex items-center justify-center transition-all"
            style={{
              width: '56px',
              height: '56px',
              background: isMicEnabled ? '#2D9596' : '#F3F4F6',
              border: isMicEnabled ? 'none' : '2px solid #E5E7EB'
            }}
            onMouseEnter={(e) => {
              if (isMicEnabled) {
                e.currentTarget.style.background = '#257D7E';
              } else {
                e.currentTarget.style.background = '#E5E7EB';
              }
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isMicEnabled ? '#2D9596' : '#F3F4F6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title={isMicEnabled ? 'Mute' : 'Unmute'}
          >
            {isMicEnabled ? (
              <Mic className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            ) : (
              <MicOff className="w-6 h-6" style={{ color: '#6B7280' }} />
            )}
          </button>

          {/* Camera Button */}
          <button
            onClick={() => setIsCameraEnabled(!isCameraEnabled)}
            className="rounded-full flex items-center justify-center transition-all"
            style={{
              width: '56px',
              height: '56px',
              background: isCameraEnabled ? '#2D9596' : '#F3F4F6',
              border: isCameraEnabled ? 'none' : '2px solid #E5E7EB'
            }}
            onMouseEnter={(e) => {
              if (isCameraEnabled) {
                e.currentTarget.style.background = '#257D7E';
              } else {
                e.currentTarget.style.background = '#E5E7EB';
              }
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isCameraEnabled ? '#2D9596' : '#F3F4F6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title={isCameraEnabled ? 'Turn off camera' : 'Turn on camera'}
          >
            {isCameraEnabled ? (
              <Video className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            ) : (
              <VideoOff className="w-6 h-6" style={{ color: '#6B7280' }} />
            )}
          </button>

          {/* Screen Share Button */}
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className="rounded-full flex items-center justify-center transition-all"
            style={{
              width: '56px',
              height: '56px',
              background: isScreenSharing ? '#2D9596' : '#F3F4F6',
              border: isScreenSharing ? 'none' : '2px solid #E5E7EB'
            }}
            onMouseEnter={(e) => {
              if (isScreenSharing) {
                e.currentTarget.style.background = '#257D7E';
              } else {
                e.currentTarget.style.background = '#E5E7EB';
              }
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isScreenSharing ? '#2D9596' : '#F3F4F6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
          >
            <Monitor 
              className="w-6 h-6" 
              style={{ color: isScreenSharing ? '#FFFFFF' : '#6B7280' }} 
            />
          </button>

          {/* Session Notes Toggle Button */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="rounded-full flex items-center justify-center transition-all"
            style={{
              width: '56px',
              height: '56px',
              background: showNotes ? '#2D9596' : '#F3F4F6',
              border: showNotes ? 'none' : '2px solid #E5E7EB'
            }}
            onMouseEnter={(e) => {
              if (showNotes) {
                e.currentTarget.style.background = '#257D7E';
              } else {
                e.currentTarget.style.background = '#E5E7EB';
              }
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = showNotes ? '#2D9596' : '#F3F4F6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title="Session notes"
          >
            <MessageSquare 
              className="w-6 h-6" 
              style={{ color: showNotes ? '#FFFFFF' : '#6B7280' }} 
            />
          </button>

          {/* Divider */}
          <div 
            style={{ 
              width: '1px',
              height: '40px',
              background: '#E5E7EB',
              margin: '0 8px'
            }}
          />

          {/* Leave Call Button */}
          <button
            onClick={handleLeaveCall}
            className="rounded-full flex items-center justify-center transition-all"
            style={{
              width: '56px',
              height: '56px',
              background: '#DC2626',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#B91C1C';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#DC2626';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            title="Leave session"
          >
            <PhoneOff className="w-6 h-6" style={{ color: '#FFFFFF' }} />
          </button>
        </div>
      </div>

      {/* Screen Share Indicator */}
      {isScreenSharing && (
        <div 
          className="fixed top-20 left-1/2 px-6 py-3 rounded-lg flex items-center gap-3"
          style={{ 
            transform: 'translateX(-50%)',
            background: '#2D9596',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 50
          }}
        >
          <Monitor className="w-5 h-5" style={{ color: '#FFFFFF' }} />
          <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>
            You are sharing your screen
          </span>
          <button
            onClick={() => setIsScreenSharing(false)}
            className="ml-2 px-3 py-1 rounded transition-all"
            style={{ 
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
}
