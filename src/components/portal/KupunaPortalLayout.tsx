import { useState, useRef, useEffect } from 'react';
import { Clock, Settings, LogOut, Home, Shield, MessageCircle, Calendar, BookOpen, Mic } from 'lucide-react';
import logoNoTagline from 'figma:asset/b3896b1c25bf716df167396f2f85a96f4bc48a2a.png';
import { KupunaTalkMode } from './KupunaTalkMode';

interface KupunaPortalLayoutProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function KupunaPortalLayout({ 
  currentView, 
  onNavigate, 
  onLogout,
  children 
}: KupunaPortalLayoutProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showTalkMode, setShowTalkMode] = useState(false);
  const [hideMicButton, setHideMicButton] = useState(false);

  const user = {
    name: 'Michelle',
    fullName: 'Michelle Blair',
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

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Hide mic button when scrolled near bottom to avoid covering "Need help?" card
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Hide button when within 400px of bottom
      setHideMicButton(scrollPosition > documentHeight - 400);
    };

    window.addEventListener('scroll', handleScroll);
    // Check on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      {/* TOP BAR - ALWAYS VISIBLE */}
      <header 
        className="border-b sticky top-0 z-40"
        style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <img 
            src={logoNoTagline}
            alt="Mālama Digital Care"
            className="h-10 w-auto cursor-pointer"
            onClick={() => onNavigate('dashboard')}
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
                  <span className="font-bold">MB</span>
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
      <main className="pb-32">
        {children}
      </main>

      {/* FLOATING "TALK TO MĀLAMA" BUTTON - Hides when scrolled near bottom */}
      {!hideMicButton && (
        <div 
          className="fixed z-50 max-[480px]:left-1/2 max-[480px]:-translate-x-1/2 flex flex-col items-center transition-opacity duration-300" 
          style={{ bottom: '168px', right: '24px', opacity: hideMicButton ? 0 : 1 }}
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
      )}

      {/* BOTTOM NAVIGATION BAR - ALWAYS VISIBLE */}
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
