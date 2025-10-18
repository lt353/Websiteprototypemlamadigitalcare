import { useState, useEffect } from 'react';
import { Shield, MessageCircle, Calendar, BookOpen, Clock, Settings, LogOut, Phone, CheckCircle, Menu, X, ChevronRight, Home, Mic } from 'lucide-react';
import logoNoTagline from 'figma:asset/b3896b1c25bf716df167396f2f85a96f4bc48a2a.png';
import { KupunaTalkMode } from './KupunaTalkMode';
import { ReadAloudButton } from './ReadAloudButton';

interface CustomerDashboardProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function CustomerDashboard({ currentView, onNavigate, onLogout }: CustomerDashboardProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showTalkMode, setShowTalkMode] = useState(false);

  const user = {
    name: 'Joyce',
    fullName: 'Joyce Lopez',
    plan: 'Standard Care'
  };

  // Define navigation items for bottom nav
  const mainNavItems = [
    { id: 'dashboard', icon: Home, label: 'Home', color: '#6366F1' },
    { id: 'scam-checker', icon: Shield, label: 'Scam Check', color: '#DC2626' },
    { id: 'tech-helper', icon: MessageCircle, label: 'Tech Help', color: '#2D9596' },
    { id: 'booking', icon: Calendar, label: 'Book', color: '#F59E0B' },
    { id: 'library', icon: BookOpen, label: 'Videos', color: '#6366F1' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      {/* SIMPLE TOP BAR */}
      <header 
        className="border-b sticky top-0 z-40"
        style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <img 
            src={logoNoTagline}
            alt="Mālama Digital Care"
            className="h-10 w-auto"
          />
          
          {/* Right side navigation - Always Visible */}
          <div className="flex items-center gap-3">
            {/* My Sessions Button */}
            <button
              onClick={() => onNavigate('sessions')}
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-xl transition-all border-3"
              style={{ 
                background: currentView === 'sessions' ? '#2D9596' : '#FFFFFF',
                color: currentView === 'sessions' ? '#FFFFFF' : '#2D9596',
                border: '3px solid #2D9596',
                minHeight: '56px'
              }}
              onMouseEnter={(e) => {
                if (currentView !== 'sessions') {
                  e.currentTarget.style.background = '#E5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== 'sessions') {
                  e.currentTarget.style.background = '#FFFFFF';
                }
              }}
            >
              <Clock className="w-6 h-6" />
              <span style={{ fontSize: '18px' }}>My Sessions</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={() => onNavigate('settings')}
              className="hidden md:flex items-center gap-2 px-5 py-3 rounded-xl transition-all border-3"
              style={{ 
                background: currentView === 'settings' ? '#2D9596' : '#FFFFFF',
                color: currentView === 'settings' ? '#FFFFFF' : '#2D9596',
                border: '3px solid #2D9596',
                minHeight: '56px'
              }}
              onMouseEnter={(e) => {
                if (currentView !== 'settings') {
                  e.currentTarget.style.background = '#E5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== 'settings') {
                  e.currentTarget.style.background = '#FFFFFF';
                }
              }}
            >
              <Settings className="w-6 h-6" />
              <span style={{ fontSize: '18px' }}>My Plan and Settings</span>
            </button>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-3 pl-3 border-l-2" style={{ borderColor: '#E5E7EB' }}>
              <div className="hidden lg:flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  <span className="font-bold">JL</span>
                </div>
                <div>
                  <p style={{ color: '#265073', fontSize: '16px' }}>{user.fullName}</p>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>{user.plan}</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all border-3"
                style={{ 
                  background: '#FFFFFF',
                  color: '#DC2626',
                  border: '3px solid #DC2626',
                  minHeight: '56px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FEE2E2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                title="Log Out"
              >
                <LogOut className="w-6 h-6" />
                <span style={{ fontSize: '18px' }}>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row - Shows Sessions & Settings on mobile */}
        <div className="md:hidden border-t px-4 py-3 flex gap-3" style={{ borderColor: '#E5E7EB' }}>
          <button
            onClick={() => onNavigate('sessions')}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all border-2"
            style={{ 
              background: currentView === 'sessions' ? '#2D9596' : '#F9FAFB',
              color: currentView === 'sessions' ? '#FFFFFF' : '#2D9596',
              borderColor: '#2D9596',
              minHeight: '64px'
            }}
          >
            <Clock className="w-6 h-6" />
            <span style={{ fontSize: '15px', fontWeight: '600' }}>Sessions</span>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all border-2"
            style={{ 
              background: currentView === 'settings' ? '#2D9596' : '#F9FAFB',
              color: currentView === 'settings' ? '#FFFFFF' : '#2D9596',
              borderColor: '#2D9596',
              minHeight: '64px'
            }}
          >
            <Settings className="w-6 h-6" />
            <span style={{ fontSize: '15px', fontWeight: '600' }}>Plan</span>
          </button>
        </div>
      </header>

      {/* LOGOUT CONFIRMATION DIALOG */}
      {showLogoutConfirm && (
        <>
          <div 
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-2xl border-4 shadow-2xl w-full max-w-md mx-4"
            style={{ background: '#FFFFFF', borderColor: '#DC2626' }}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: '#FEE2E2' }}
                >
                  <LogOut className="w-8 h-8" style={{ color: '#DC2626' }} />
                </div>
                <div>
                  <h3 style={{ color: '#265073', fontSize: '28px', lineHeight: '1.2' }}>
                    Log Out?
                  </h3>
                  <p style={{ fontSize: '18px', color: '#6B7280', marginTop: '4px' }}>
                    Are you sure you want to log out?
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
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
                  Stay Logged In
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    onLogout();
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
                  Yes, Log Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-8 pb-32">
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
                Thursday, Nov 28 at 2:00 PM
              </h2>
              <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#2D9596', marginBottom: '4px' }}>
                In-Home Visit with Tea Araki
              </p>
              <p style={{ fontSize: 'clamp(16px, 3vw, 18px)', color: '#6B7280' }}>
                Topics: Email Management, Two-Factor Authentication
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => onNavigate('sessions')}
              className="px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all border-3"
              style={{ 
                background: '#FFFFFF',
                color: '#2D9596',
                border: '3px solid #2D9596',
                fontSize: 'clamp(16px, 3.5vw, 20px)',
                minHeight: '56px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E5F5F5';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View Details
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
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <h3 style={{ color: '#265073', fontSize: 'clamp(20px, 4vw, 28px)', lineHeight: '1.2' }}>
                        Check if something is a scam
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-lg text-white whitespace-nowrap"
                        style={{ background: '#E67E50', fontSize: '13px' }}
                      >
                        MOST USED
                      </span>
                    </div>
                    <p style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', color: '#6B7280', lineHeight: '1.5' }}>
                      Paste a suspicious email, text message, or phone call to see if it's safe
                    </p>
                  </div>
                  <ChevronRight className="hidden md:block w-10 h-10 flex-shrink-0" style={{ color: '#DC2626' }} />
                </div>
              </button>
              <div className="mt-2 flex justify-center md:justify-end" style={{ marginTop: '8px' }}>
                <div className="max-[480px]:scale-90" style={{ transformOrigin: 'center' }}>
                  <ReadAloudButton text="You can check if an email or message is a scam by tapping here." />
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
                      Ask a technology question
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

        {/* ACHIEVEMENTS SECTION */}
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
                12
              </p>
              <p style={{ fontSize: '18px', color: '#6B7280' }}>
                Day Learning Streak
              </p>
            </div>
            <div className="text-center p-6 rounded-xl" style={{ background: '#FFFFFF' }}>
              <p style={{ fontSize: '48px', color: '#6366F1', marginBottom: '8px' }}>
                8
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
      </main>

      {/* FLOATING "TALK TO MĀLAMA" BUTTON */}
      <div 
        className="fixed z-50 max-[480px]:left-1/2 max-[480px]:-translate-x-1/2 flex flex-col items-center" 
        style={{ bottom: '168px', right: '24px' }}
      >
        {/* Compact Tooltip - Always Visible Above Microphone */}
        <div 
          className="rounded-lg text-center px-3 py-1.5"
          style={{
            background: 'rgba(45, 149, 150, 0.95)',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            maxWidth: '180px',
            lineHeight: '1.3',
            marginBottom: '10px',
            borderRadius: '8px'
          }}
        >
          Tap mic to talk
        </div>
        
        {/* Microphone Button - Responsive Size */}
        <button
          onClick={() => setShowTalkMode(true)}
          className="rounded-full transition-all block max-[480px]:w-[60px] max-[480px]:h-[60px]"
          style={{
            width: '80px',
            height: '80px',
            background: '#2D9596',
            boxShadow: '0 8px 24px rgba(45, 149, 150, 0.5)'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(45, 149, 150, 0.6)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 149, 150, 0.5)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 149, 150, 0.5)';
          }}
          title="Tap mic to talk"
        >
          <Mic className="max-[480px]:w-7 max-[480px]:h-7 w-10 h-10 mx-auto" style={{ color: '#FFFFFF' }} />
        </button>
      </div>

      {/* BOTTOM NAVIGATION BAR - Always Visible */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 border-t-4"
        style={{ 
          background: '#FFFFFF', 
          borderColor: '#2D9596',
          boxShadow: '0 -4px 20px rgba(38, 80, 115, 0.15)'
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="grid grid-cols-5 gap-2">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                  style={{
                    background: isActive ? item.color : 'transparent',
                    color: isActive ? '#FFFFFF' : item.color,
                    minHeight: '80px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#F9FAFB';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <Icon className="w-8 h-8 flex-shrink-0" />
                  <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2', textAlign: 'center' }}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div 
                      className="w-2 h-2 rounded-full mt-1"
                      style={{ background: '#FFFFFF' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* KUPUNA TALK MODE OVERLAY */}
      {showTalkMode && (
        <KupunaTalkMode onClose={() => setShowTalkMode(false)} />
      )}
    </div>
  );
}