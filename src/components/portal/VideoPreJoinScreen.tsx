import { useState } from 'react';
import { Video, Mic, MicOff, Camera, CameraOff, User } from 'lucide-react';

interface VideoPreJoinScreenProps {
  instructorName?: string;
  sessionDate?: string;
  sessionTime?: string;
  onJoin: () => void;
  onCancel: () => void;
}

export function VideoPreJoinScreen({
  instructorName = 'Tea Araki',
  sessionDate = 'Nov 28',
  sessionTime = '2:00 PM',
  onJoin,
  onCancel
}: VideoPreJoinScreenProps) {
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: '#F9FAFB' }}
    >
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 
            className="mb-3"
            style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#265073',
              lineHeight: '1.2'
            }}
          >
            Joining Your Session with {instructorName}
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280' }}>
            Virtual Session • {sessionDate}, {sessionTime}
          </p>
        </div>

        {/* Video Preview Area */}
        <div 
          className="relative mb-6 flex items-center justify-center"
          style={{
            width: '100%',
            maxWidth: '640px',
            height: '480px',
            margin: '0 auto',
            background: '#2D3748',
            borderRadius: '12px',
            border: '2px solid #E5E7EB',
            overflow: 'hidden'
          }}
        >
          {/* Placeholder - in production this would show actual video feed */}
          <div className="flex flex-col items-center justify-center gap-4">
            {isCameraEnabled ? (
              <>
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center"
                  style={{ background: '#4A5568' }}
                >
                  <User className="w-20 h-20" style={{ color: '#A0AEC0' }} />
                </div>
                <p style={{ color: '#A0AEC0', fontSize: '18px' }}>
                  Camera Preview
                </p>
              </>
            ) : (
              <>
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center"
                  style={{ background: '#4A5568' }}
                >
                  <CameraOff className="w-20 h-20" style={{ color: '#A0AEC0' }} />
                </div>
                <p style={{ color: '#A0AEC0', fontSize: '18px' }}>
                  Camera is off
                </p>
              </>
            )}
          </div>

          {/* Camera status indicator */}
          {!isCameraEnabled && (
            <div 
              className="absolute top-4 left-4 px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ background: 'rgba(0, 0, 0, 0.6)' }}
            >
              <CameraOff className="w-5 h-5" style={{ color: '#FFFFFF' }} />
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>
                Camera Off
              </span>
            </div>
          )}

          {/* Microphone status indicator */}
          {!isMicEnabled && (
            <div 
              className="absolute top-4 right-4 px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ background: 'rgba(220, 38, 38, 0.9)' }}
            >
              <MicOff className="w-5 h-5" style={{ color: '#FFFFFF' }} />
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>
                Muted
              </span>
            </div>
          )}
        </div>

        {/* Device Controls */}
        <div className="flex gap-4 mb-8 justify-center max-w-md mx-auto">
          {/* Microphone Toggle */}
          <button
            onClick={() => setIsMicEnabled(!isMicEnabled)}
            className="flex-1 flex flex-col items-center justify-center gap-2 py-4 px-6 rounded-lg transition-all"
            style={{
              background: '#FFFFFF',
              border: isMicEnabled ? '2px solid #2D9596' : '2px solid #E5E7EB',
              height: '48px',
              minHeight: '80px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isMicEnabled ? (
              <Mic className="w-6 h-6" style={{ color: '#2D9596' }} />
            ) : (
              <MicOff className="w-6 h-6" style={{ color: '#DC2626' }} />
            )}
            <span 
              style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: isMicEnabled ? '#2D9596' : '#6B7280'
              }}
            >
              Microphone
            </span>
            <span 
              style={{ 
                fontSize: '13px',
                color: '#9CA3AF'
              }}
            >
              {isMicEnabled ? 'On' : 'Off'}
            </span>
          </button>

          {/* Camera Toggle */}
          <button
            onClick={() => setIsCameraEnabled(!isCameraEnabled)}
            className="flex-1 flex flex-col items-center justify-center gap-2 py-4 px-6 rounded-lg transition-all"
            style={{
              background: '#FFFFFF',
              border: isCameraEnabled ? '2px solid #2D9596' : '2px solid #E5E7EB',
              height: '48px',
              minHeight: '80px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isCameraEnabled ? (
              <Camera className="w-6 h-6" style={{ color: '#2D9596' }} />
            ) : (
              <CameraOff className="w-6 h-6" style={{ color: '#DC2626' }} />
            )}
            <span 
              style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: isCameraEnabled ? '#2D9596' : '#6B7280'
              }}
            >
              Camera
            </span>
            <span 
              style={{ 
                fontSize: '13px',
                color: '#9CA3AF'
              }}
            >
              {isCameraEnabled ? 'On' : 'Off'}
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          {/* Primary Join Button */}
          <button
            onClick={onJoin}
            className="w-full flex items-center justify-center gap-3 transition-all"
            style={{
              background: '#2D9596',
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 'bold',
              height: '56px',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(45, 149, 150, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#257D7E';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 149, 150, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2D9596';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 149, 150, 0.3)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 149, 150, 0.3)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 149, 150, 0.4)';
            }}
          >
            <Video className="w-6 h-6" />
            <span>Join Session</span>
          </button>

          {/* Secondary Cancel Button */}
          <button
            onClick={onCancel}
            className="w-full transition-all"
            style={{
              background: 'transparent',
              color: '#6B7280',
              fontSize: '16px',
              fontWeight: '600',
              height: '48px',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#265073';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6B7280';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            Cancel
          </button>
        </div>

        {/* Helpful Tips for Seniors */}
        <div 
          className="mt-8 p-6 rounded-xl max-w-md mx-auto"
          style={{ background: '#E6F7F4', border: '2px solid #2D9596' }}
        >
          <h3 
            className="mb-3"
            style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#265073' 
            }}
          >
            Before You Join:
          </h3>
          <ul className="space-y-2" style={{ color: '#6B7280', fontSize: '16px' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: '#2D9596', fontWeight: 'bold' }}>✓</span>
              <span>Make sure your microphone and camera are working</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#2D9596', fontWeight: 'bold' }}>✓</span>
              <span>Find a quiet, well-lit space</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#2D9596', fontWeight: 'bold' }}>✓</span>
              <span>Have your questions or topics ready</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
