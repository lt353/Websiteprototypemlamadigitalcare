import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { ContactPage } from './components/ContactPage';
import { WorkshopsPage } from './components/WorkshopsPage';
import { PartnersPage } from './components/PartnersPage';
import { CareersPage } from './components/CareersPage';
import { LoginPage } from './components/portal/LoginPage';
import { RegisterPage } from './components/portal/RegisterPage';
import { CustomerDashboard } from './components/portal/CustomerDashboard';
import { KupunaPortalLayout } from './components/portal/KupunaPortalLayout';
import { CaregiverRouter } from './components/portal/caregiver/CaregiverRouter';
import { OrganizationRouter } from './components/portal/organization/OrganizationRouter';
import { TeacherRouter } from './components/portal/TeacherRouter';
import { TeacherLoginPage } from './components/portal/TeacherLoginPage';
import { ScamCheckerPage } from './components/portal/ScamCheckerPage';
import { ProgressDashboard } from './components/portal/ProgressDashboard';
import { MobileDemoRouter } from './components/mobile-demo/MobileDemoRouter';
import { TechHelperPage } from './components/portal/TechHelperPage';
import { BookingPage } from './components/portal/BookingPage';
import { LearningLibraryPage } from './components/portal/LearningLibraryPage';
import { SessionsPage } from './components/portal/SessionsPage';
import { SettingsPage } from './components/portal/SettingsPage';
import { SuccessPage } from './components/portal/SuccessPage';
import { VideoPreJoinScreen } from './components/portal/VideoPreJoinScreen';
import { VideoCallScreen } from './components/portal/VideoCallScreen';
import { PostSessionScreen } from './components/portal/PostSessionScreen';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'about' | 'services' | 'contact' | 'workshops' | 'partners' | 'careers' | 'login' | 'register' | 'portal' | 'teacher-login' | 'mobile-demo';
type PortalView = 'dashboard' | 'scam-checker' | 'tech-helper' | 'booking' | 'library' | 'sessions' | 'settings' | 'success' | 'video-prejoin' | 'video-call' | 'post-session';
type UserType = 'kupuna' | 'caregiver' | 'organization' | 'teacher';

interface SuccessData {
  type: 'booking' | 'reschedule' | 'cancel' | 'subscription' | 'payment';
  title: string;
  message: string;
  details?: Array<{ label: string; value: string }>;
  coverageInfo?: {
    isCovered: boolean;
    additionalCost: number;
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [portalView, setPortalView] = useState<PortalView>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>('kupuna');
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  
  // App state
  const [upcomingSession, setUpcomingSession] = useState({
    date: 'November 28, 2025',
    time: '2:00 PM',
    type: 'In-Home Session',
    technician: 'Tea Araki',
    topics: 'Email Management, Two-Factor Authentication'
  });
  const [currentPlan, setCurrentPlan] = useState('Standard Care');
  const [isPaused, setIsPaused] = useState(false);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      if (['home', 'about', 'services', 'contact', 'workshops', 'partners', 'careers', 'login', 'register', 'portal', 'teacher-login', 'mobile-demo'].includes(hash)) {
        setCurrentPage(hash as Page);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top when portal view changes (for pages not wrapped in KupunaPortalLayout)
  useEffect(() => {
    if (isLoggedIn && currentPage === 'portal') {
      window.scrollTo(0, 0);
    }
  }, [portalView]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const handleLogin = (selectedUserType?: UserType) => {
    setIsLoggedIn(true);
    if (selectedUserType) {
      setUserType(selectedUserType);
    }
    handleNavigate('portal');
  };

  const handleTeacherLogin = () => {
    setIsLoggedIn(true);
    setUserType('teacher');
    handleNavigate('portal');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleNavigate('home');
  };

  const handlePortalNavigate = (view: PortalView) => {
    setPortalView(view);
  };

  const showSuccess = (data: SuccessData) => {
    setSuccessData(data);
    setPortalView('success');
  };

  const handleBookingSuccess = (bookingData: any) => {
    showSuccess({
      type: 'booking',
      title: 'Session Booked Successfully!',
      message: 'We\'ll call you within 24 hours to confirm your appointment',
      details: [
        { label: 'Session Type', value: bookingData.type },
        { label: 'Preferred Date', value: bookingData.date },
        { label: 'Preferred Time', value: bookingData.time },
        { label: 'Topics', value: bookingData.topics || 'To be discussed' },
        { label: 'Confirmation', value: 'We will call you to confirm' }
      ],
      coverageInfo: bookingData.isCovered !== undefined ? {
        isCovered: bookingData.isCovered,
        additionalCost: bookingData.additionalCost
      } : undefined
    });
  };

  const handleRescheduleSuccess = (rescheduleData: any) => {
    setUpcomingSession({
      ...upcomingSession,
      date: rescheduleData.date,
      time: rescheduleData.time
    });
    showSuccess({
      type: 'reschedule',
      title: 'Reschedule Request Submitted!',
      message: 'We\'ll call you within 2 hours to confirm your new appointment time',
      details: [
        { label: 'New Date', value: rescheduleData.date },
        { label: 'New Time', value: rescheduleData.time },
        { label: 'Session Type', value: upcomingSession.type },
        { label: 'Technician', value: upcomingSession.technician }
      ]
    });
  };

  const handleCancelSuccess = () => {
    setUpcomingSession({ ...upcomingSession, date: '', time: '', type: 'No upcoming sessions', technician: '', topics: '' });
    showSuccess({
      type: 'cancel',
      title: 'Session Canceled',
      message: 'Your session has been canceled. You can book a new one anytime!',
      details: [
        { label: 'Canceled Session', value: `${upcomingSession.type} on ${upcomingSession.date}` },
        { label: 'Status', value: 'Canceled' }
      ]
    });
  };

  const handleSubscriptionChange = (action: string, plan?: string) => {
    if (action === 'upgrade' || action === 'downgrade') {
      setCurrentPlan(plan || currentPlan);
      showSuccess({
        type: 'subscription',
        title: action === 'upgrade' ? 'Plan Upgraded!' : 'Plan Downgrade Scheduled',
        message: action === 'upgrade' 
          ? 'Your new plan is active immediately' 
          : 'Your plan will change on your next billing date (December 1, 2025)',
        details: [
          { label: 'New Plan', value: plan || '' },
          { label: 'Effective Date', value: action === 'upgrade' ? 'Immediately' : 'December 1, 2025' }
        ]
      });
    } else if (action === 'pause') {
      setIsPaused(true);
      showSuccess({
        type: 'subscription',
        title: 'Subscription Paused',
        message: 'Your subscription has been paused. No charges during pause period.',
        details: [
          { label: 'Status', value: 'Paused' },
          { label: 'Resume Date', value: 'Anytime within 3 months' }
        ]
      });
    } else if (action === 'cancel') {
      showSuccess({
        type: 'subscription',
        title: 'Subscription Canceled',
        message: 'Your access continues until December 1, 2025',
        details: [
          { label: 'Status', value: 'Canceled' },
          { label: 'Access Until', value: 'December 1, 2025' }
        ]
      });
    }
  };

  const handlePaymentUpdate = () => {
    showSuccess({
      type: 'payment',
      title: 'Payment Method Updated!',
      message: 'Your billing information has been updated successfully',
      details: [
        { label: 'Status', value: 'Payment method updated' },
        { label: 'Next Billing Date', value: 'December 1, 2025' }
      ]
    });
  };

  // Marketing site pages (with header/footer)
  const renderMarketingSite = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'workshops':
        return <WorkshopsPage onNavigate={handleNavigate} />;
      case 'partners':
        return <PartnersPage onNavigate={handleNavigate} />;
      case 'careers':
        return <CareersPage onNavigate={handleNavigate} />;
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => handleNavigate('register')}
            onNavigate={handleNavigate}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onRegister={handleLogin}
            onNavigateToLogin={() => handleNavigate('login')}
            onNavigate={handleNavigate}
          />
        );
      case 'teacher-login':
        return (
          <TeacherLoginPage
            onLogin={handleTeacherLogin}
          />
        );
      case 'mobile-demo':
        return <MobileDemoRouter />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Portal pages (no header/footer, different layout)
  const renderPortalView = () => {
    // For caregiver and organization, show their specific dashboards
    if (userType === 'caregiver') {
      return (
        <CaregiverRouter
          onLogout={handleLogout}
        />
      );
    }

    if (userType === 'organization') {
      return (
        <OrganizationRouter
          onLogout={handleLogout}
        />
      );
    }

    if (userType === 'teacher') {
      return (
        <TeacherRouter
          onLogout={handleLogout}
        />
      );
    }

    // For kupuna (seniors), show full portal with all features
    // Wrap all pages in KupunaPortalLayout except dashboard which already has it
    const renderKupunaPage = () => {
      switch (portalView) {
        case 'success':
          return successData ? (
            <SuccessPage
              type={successData.type}
              title={successData.title}
              message={successData.message}
              details={successData.details}
              coverageInfo={successData.coverageInfo}
              onContinue={() => handlePortalNavigate('dashboard')}
            />
          ) : null;

          case 'progress':
  return (
    <ProgressDashboard
      userName="Michele"
      onNavigateToLearning={() => handlePortalNavigate('booking')}
      onBack={() => handlePortalNavigate('dashboard')}
    />
  );
        case 'scam-checker':
          return (
            <ScamCheckerPage 
              onBack={() => handlePortalNavigate('dashboard')}
              onNavigateToSessions={() => handlePortalNavigate('sessions')}
              onNavigateToBooking={(context) => {
                handlePortalNavigate('booking');
              }}
            />
          );
        case 'tech-helper':
          return (
            <TechHelperPage 
              onBack={() => handlePortalNavigate('dashboard')}
              onNavigateToBooking={(context) => {
                handlePortalNavigate('booking');
              }}
            />
          );
        case 'booking':
          return (
            <BookingPage 
              onBack={() => handlePortalNavigate('dashboard')} 
              onBookingSuccess={handleBookingSuccess}
             
            />
          );
        case 'library':
          return <LearningLibraryPage onBack={() => handlePortalNavigate('dashboard')} />;
        case 'sessions':
          return (
            <SessionsPage 
              onBack={() => handlePortalNavigate('dashboard')} 
              onNavigateToBooking={() => handlePortalNavigate('booking')}
              onRescheduleSuccess={handleRescheduleSuccess}
              onCancelSuccess={handleCancelSuccess}
              upcomingSession={upcomingSession}
            />
          );
        case 'settings':
          return (
            <SettingsPage 
              onBack={() => handlePortalNavigate('dashboard')}
              onSubscriptionChange={handleSubscriptionChange}
              onPaymentUpdate={handlePaymentUpdate}
              currentPlan={currentPlan}
              isPaused={isPaused}
            />
          );
        case 'video-prejoin':
          return (
            <VideoPreJoinScreen
              instructorName="Tea Araki"
              sessionDate="Nov 28"
              sessionTime="2:00 PM"
              onJoin={() => handlePortalNavigate('video-call')}
              onCancel={() => handlePortalNavigate('dashboard')}
            />
          );
        case 'video-call':
          return (
            <VideoCallScreen
              instructorName="Tea Araki"
              sessionDate="Nov 28"
              sessionTime="2:00 PM"
              onLeaveCall={() => handlePortalNavigate('post-session')}
            />
          );
        case 'post-session':
          return (
            <PostSessionScreen
              instructorName="Tea Araki"
              sessionDate="Nov 28"
              sessionTime="2:00 PM"
              sessionDuration="45 minutes"
              onReturnToDashboard={() => handlePortalNavigate('dashboard')}
            />
          );
        case 'dashboard':
        default:
          return (
            <CustomerDashboard
              currentView={portalView}
              onNavigate={handlePortalNavigate}
              onLogout={handleLogout}
            />
          );
      }
    };

    // Dashboard, video-prejoin, video-call, and post-session handle their own layout
    if (portalView === 'dashboard' || portalView === 'video-prejoin' || portalView === 'video-call' || portalView === 'post-session') {
      return renderKupunaPage();
    }

    // Wrap all other pages in the persistent layout
    return (
      <KupunaPortalLayout
        currentView={portalView}
        onNavigate={handlePortalNavigate}
        onLogout={handleLogout}
      >
        {renderKupunaPage()}
      </KupunaPortalLayout>
    );
  };

  // Auth pages and mobile demo don't show header/footer
  if (currentPage === 'login' || currentPage === 'register' || currentPage === 'teacher-login' || currentPage === 'mobile-demo') {
    return (
      <div className="min-h-screen">
        {renderMarketingSite()}
        <Toaster position="top-center" />
      </div>
    );
  }

  // Portal pages show completely different layout
  if (currentPage === 'portal' && isLoggedIn) {
    return (
      <div className="min-h-screen">
        {renderPortalView()}
        <Toaster position="top-center" />
      </div>
    );
  }

  // Marketing site pages show header/footer
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderMarketingSite()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <Toaster position="top-center" />
    </div>
  );
}