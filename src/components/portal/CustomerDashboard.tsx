import { useState } from 'react';
import { Shield, MessageCircle, Calendar, BookOpen, Phone, CheckCircle, ChevronRight, Video, Edit3, AlertCircle } from 'lucide-react';
import { KupunaPortalLayout } from './KupunaPortalLayout';
import { ReadAloudButton } from './ReadAloudButton';

interface CustomerDashboardProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

// Helper function to get relative date
const getRelativeDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Helper function to format date for display
const formatDateDisplay = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
  });
};

// Helper function to get "in X days" text
const getDaysUntilText = (daysFromNow: number) => {
  if (daysFromNow === 0) return 'Today';
  if (daysFromNow === 1) return 'Tomorrow';
  return `In ${daysFromNow} days`;
};

export function CustomerDashboard({ currentView, onNavigate, onLogout }: CustomerDashboardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const user = {
    name: 'Michelle'
  };

  // Dynamic upcoming session - 2 days from today
  const upcomingSessionDate = getRelativeDate(2);
  const upcomingSessionTime = '2:00 PM';

  return (
    <KupunaPortalLayout 
      currentView={currentView} 
      onNavigate={onNavigate} 
      onLogout={onLogout}
    >
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* WARM WELCOME */}
        <div className="mb-10">
          <h1 className="mb-3" style={{ color: '#265073', fontSize: 'clamp(32px, 8vw, 48px)', lineHeight: '1.1' }}>
            Aloha, {user.name}! 👋
          </h1>
          <p style={{ fontSize: 'clamp(18px, 4vw, 24px)', color: '#6B7280', lineHeight: '1.5' }}>
            What would you like help with today?
          </p>
        </div>

        {/* UPCOMING SESSION BANNER (if exists) */}
        <div 
          className="rounded-2xl p-6 md:p-8 mb-10 border-4"
          style={{ 
            background: 'linear-gradient(135deg, #F1FADA 0%, #E5F5F5 100%)',
            borderColor: '#2D9596'
          }}
        >
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#16A34A' }}
            >
              <Calendar className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                YOUR NEXT SESSION
              </p>
              <h2 style={{ color: '#265073', fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.2', marginBottom: '8px' }}>
                {getDaysUntilText(2)} at {upcomingSessionTime}
              </h2>
              <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#2D9596', marginBottom: '4px' }}>
                Virtual Session with Tea Araki
              </p>
              <p style={{ fontSize: 'clamp(16px, 3vw, 18px)', color: '#6B7280' }}>
                Topics: Email Management, Scam Discussion
              </p>
            </div>
          </div>
          
          {/* Join Virtual Session Button - Prominent Primary CTA */}
          <div className="mt-6">
            <button
              onClick={() => onNavigate('video-prejoin')}
              className="w-full flex items-center justify-center gap-3 py-3 transition-all"
              style={{ 
                background: '#2D9596',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 'bold',
                height: '48px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(45, 149, 150, 0.25)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#257D7E';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 149, 150, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2D9596';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 149, 150, 0.25)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(45, 149, 150, 0.3)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 149, 150, 0.35)';
              }}
            >
              <Video className="w-5 h-5" />
              <span>Join Virtual Session</span>
            </button>
          </div>

          {/* Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => onNavigate('sessions')}
              className="flex-1 px-6 py-3 rounded-lg transition-all border-2 flex items-center justify-center gap-2"
              style={{ 
                background: '#FFFFFF',
                color: '#2D9596',
                borderColor: '#2D9596',
                fontSize: '16px',
                fontWeight: '600',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F0FDFA';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Edit3 className="w-5 h-5" />
              Edit Topics
            </button>
            <button
              onClick={() => onNavigate('sessions')}
              className="flex-1 px-6 py-3 rounded-lg transition-all border-2 flex items-center justify-center gap-2"
              style={{ 
                background: '#FFFFFF',
                color: '#F59E0B',
                borderColor: '#F59E0B',
                fontSize: '16px',
                fontWeight: '600',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFBEB';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Reschedule
            </button>
            <button
              onClick={() => setShowCancelDialog(true)}
              className="flex-1 px-6 py-3 rounded-lg transition-all border-2 flex items-center justify-center gap-2"
              style={{
                background: '#FFFFFF',
                color: '#DC2626',
                borderColor: '#DC2626',
                fontSize: '16px',
                fontWeight: '600',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEF2F2';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* MAIN ACTIONS - BIG & BOLD */}
        <div className="mb-10">
          <h2 style={{ color: '#265073', fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: '24px' }}>
            I want to...
          </h2>
          
          <div className="space-y-6">
            {/* Scam Checker - Most Important */}
            <div>
              <button
                onClick={() => onNavigate('scam-checker')}
                className="w-full rounded-2xl border-4 transition-all text-left"
                style={{ 
                  background: '#FFFFFF',
                  borderColor: '#DC2626',
                  boxShadow: '0 4px 20px rgba(220, 38, 38, 0.15)',
                  padding: 'clamp(16px, 4vw, 32px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(220, 38, 38, 0.25)';
                  e.currentTarget.style.background = '#FEF2F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(220, 38, 38, 0.15)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div 
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#FEE2E2' }}
                  >
                    <Shield className="w-8 h-8 md:w-12 md:h-12" style={{ color: '#DC2626' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 style={{ color: '#265073', fontSize: 'clamp(20px, 4vw, 28px)', lineHeight: '1.2', marginBottom: '8px' }}>
                      Check if something is a scam
                    </h3>
                    <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#6B7280', lineHeight: '1.5' }}>
                      Let Kōkua analyze suspicious messages, emails, or calls
                    </p>
                  </div>
                  <ChevronRight className="hidden md:block w-10 h-10 flex-shrink-0" style={{ color: '#DC2626' }} />
                </div>
              </button>
              <div className="mt-2 flex justify-center md:justify-end" style={{ marginTop: '8px' }}>
                <div className="max-[480px]:scale-90" style={{ transformOrigin: 'center' }}>
                  <ReadAloudButton text="Check if a message, email, or call is a scam by tapping here. Kōkua will help you stay safe." />
                </div>
              </div>
            </div>

            {/* Tech Helper */}
            <div>
              <button
                onClick={() => onNavigate('tech-helper')}
                className="w-full rounded-2xl border-4 transition-all text-left"
                style={{ 
                  background: '#FFFFFF',
                  borderColor: '#2D9596',
                  boxShadow: '0 4px 20px rgba(45, 149, 150, 0.15)',
                  padding: 'clamp(16px, 4vw, 32px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(45, 149, 150, 0.25)';
                  e.currentTarget.style.background = '#F0FDFA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(45, 149, 150, 0.15)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div 
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E6F7F4' }}
                  >
                    <MessageCircle className="w-8 h-8 md:w-12 md:h-12" style={{ color: '#2D9596' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 style={{ color: '#265073', fontSize: 'clamp(20px, 4vw, 28px)', lineHeight: '1.2', marginBottom: '8px' }}>
                      Get tech help from Alaka'i
                    </h3>
                    <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#6B7280', lineHeight: '1.5' }}>
                      Get instant help with your phone, computer, or apps
                    </p>
                  </div>
                  <ChevronRight className="hidden md:block w-10 h-10 flex-shrink-0" style={{ color: '#2D9596' }} />
                </div>
              </button>
              <div className="mt-2 flex justify-center md:justify-end" style={{ marginTop: '8px' }}>
                <div className="max-[480px]:scale-90" style={{ transformOrigin: 'center' }}>
                  <ReadAloudButton text="Get instant help with your phone, computer, or apps by tapping here." />
                </div>
              </div>
            </div>

            {/* Book Session */}
            <div>
              <button
                onClick={() => onNavigate('booking')}
                className="w-full rounded-2xl border-4 transition-all text-left"
                style={{ 
                  background: '#FFFFFF',
                  borderColor: '#F59E0B',
                  boxShadow: '0 4px 20px rgba(245, 158, 11, 0.15)',
                  padding: 'clamp(16px, 4vw, 32px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(245, 158, 11, 0.25)';
                  e.currentTarget.style.background = '#FFFBEB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.15)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div 
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#FEF3C7' }}
                  >
                    <Calendar className="w-8 h-8 md:w-12 md:h-12" style={{ color: '#F59E0B' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 style={{ color: '#265073', fontSize: 'clamp(20px, 4vw, 28px)', lineHeight: '1.2', marginBottom: '8px' }}>
                      Schedule a new session
                    </h3>
                    <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#6B7280', lineHeight: '1.5' }}>
                      Book a time for one-on-one help at your home or online
                    </p>
                  </div>
                  <ChevronRight className="hidden md:block w-10 h-10 flex-shrink-0" style={{ color: '#F59E0B' }} />
                </div>
              </button>
              <div className="mt-2 flex justify-center md:justify-end" style={{ marginTop: '8px' }}>
                <div className="max-[480px]:scale-90" style={{ transformOrigin: 'center' }}>
                  <ReadAloudButton text="Book a time for one-on-one help at your home or online by tapping here." />
                </div>
              </div>
            </div>

            {/* Learning Library */}
            <div>
              <button
                onClick={() => onNavigate('library')}
                className="w-full rounded-2xl border-4 transition-all text-left"
                style={{ 
                  background: '#FFFFFF',
                  borderColor: '#6366F1',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)',
                  padding: 'clamp(16px, 4vw, 32px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.25)';
                  e.currentTarget.style.background = '#EEF2FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.15)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div 
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E0E7FF' }}
                  >
                    <BookOpen className="w-8 h-8 md:w-12 md:h-12" style={{ color: '#6366F1' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 style={{ color: '#265073', fontSize: 'clamp(20px, 4vw, 28px)', lineHeight: '1.2', marginBottom: '8px' }}>
                      Watch learning videos
                    </h3>
                    <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#6B7280', lineHeight: '1.5' }}>
                      Short tutorials on phones, email, photos, and more
                    </p>
                  </div>
                  <ChevronRight className="hidden md:block w-10 h-10 flex-shrink-0" style={{ color: '#6366F1' }} />
                </div>
              </button>
              <div className="mt-2 flex justify-center md:justify-end" style={{ marginTop: '8px' }}>
                <div className="max-[480px]:scale-90" style={{ transformOrigin: 'center' }}>
                  <ReadAloudButton text="Watch short tutorial videos on phones, email, photos, and more by tapping here." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS SECTION - Updated for Michelle's 2-month journey */}
        <div 
          className="rounded-2xl p-6 md:p-8 border-2"
          style={{ 
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            borderColor: '#F59E0B'
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div 
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center"
              style={{ background: '#F59E0B' }}
            >
              <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h3 style={{ color: '#265073', fontSize: 'clamp(22px, 4vw, 28px)', lineHeight: '1.2' }}>
                You're doing great!
              </h3>
              <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#6B7280' }}>
                Keep up the excellent progress
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl" style={{ background: '#FFFFFF' }}>
              <p style={{ fontSize: '48px', color: '#16A34A', marginBottom: '8px' }}>
                5
              </p>
              <p style={{ fontSize: '18px', color: '#6B7280' }}>
                Sessions Completed
              </p>
            </div>
            <div className="text-center p-6 rounded-xl" style={{ background: '#FFFFFF' }}>
              <p style={{ fontSize: '48px', color: '#F59E0B', marginBottom: '8px' }}>
                14
              </p>
              <p style={{ fontSize: '18px', color: '#6B7280' }}>
                Day Learning Streak
              </p>
            </div>
            <div className="text-center p-6 rounded-xl" style={{ background: '#FFFFFF' }}>
              <p style={{ fontSize: '48px', color: '#6366F1', marginBottom: '8px' }}>
                11
              </p>
              <p style={{ fontSize: '18px', color: '#6B7280' }}>
                Videos Watched
              </p>
            </div>
          </div>
        </div>

        {/* NEED HELP? - Always Visible */}
        <div 
          className="mt-10 rounded-2xl p-6 md:p-8 text-center border-4"
          style={{ 
            background: '#E6F7F4',
            borderColor: '#2D9596'
          }}
        >
          <Phone className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4" style={{ color: '#2D9596' }} />
          <h3 style={{ color: '#265073', fontSize: 'clamp(22px, 4vw, 28px)', marginBottom: '12px' }}>
            Need immediate help?
          </h3>
          <p style={{ fontSize: 'clamp(18px, 4vw, 22px)', color: '#2D9596', marginBottom: '16px' }}>
            Call us at (808) 555-HELP
          </p>
          <p style={{ fontSize: 'clamp(16px, 3vw, 18px)', color: '#6B7280' }}>
            We're here Monday-Sunday, 8am-10pm
          </p>
        </div>
      </div>

      {/* CANCEL SESSION CONFIRMATION DIALOG */}
      {showCancelDialog && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowCancelDialog(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-2xl border-4 shadow-2xl w-full max-w-md mx-4"
            style={{ background: '#FFFFFF', borderColor: '#F59E0B' }}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: '#FEF3C7' }}
                >
                  <AlertCircle className="w-8 h-8" style={{ color: '#F59E0B' }} />
                </div>
                <div>
                  <h3 style={{ color: '#265073', fontSize: '28px', lineHeight: '1.2' }}>
                    Cancel Session?
                  </h3>
                  <p style={{ fontSize: '18px', color: '#6B7280', marginTop: '4px' }}>
                    Are you sure you want to cancel?
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 rounded-lg" style={{ background: '#FEF3C7' }}>
                <p style={{ fontSize: '16px', color: '#92400E', lineHeight: '1.5' }}>
                  This will cancel your upcoming session on <strong>{getDaysUntilText(2)} at {upcomingSessionTime}</strong> with Tea Araki.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelDialog(false)}
                  className="flex-1 px-6 py-4 rounded-xl transition-all border-3"
                  style={{
                    background: '#FFFFFF',
                    color: '#2D9596',
                    border: '3px solid #2D9596',
                    fontSize: '20px',
                    minHeight: '64px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#E5F5F5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                >
                  Keep Session
                </button>
                <button
                  onClick={() => {
                    setShowCancelDialog(false);
                    onNavigate('sessions');
                  }}
                  className="flex-1 px-6 py-4 rounded-xl transition-all"
                  style={{
                    background: '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '20px',
                    minHeight: '64px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#B91C1C';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#DC2626';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Yes, Cancel Session
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </KupunaPortalLayout>
  );
}