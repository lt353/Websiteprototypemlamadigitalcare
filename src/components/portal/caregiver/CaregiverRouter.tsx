import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CaregiverDashboard } from '../CaregiverDashboard';
import { LovedOneDetails } from './LovedOneDetails';
import { BookSessionCaregiver } from './BookSessionCaregiver';
import { AddAnotherSenior } from './AddAnotherSenior';
import { ManageLovedOnes } from './ManageLovedOnes';
import { LearningResourcesCaregiver } from './LearningResourcesCaregiver';
import { CaregiverSettings } from './CaregiverSettings';
import { RescheduleSession } from './RescheduleSession';
import { RescheduleSuccess } from './RescheduleSuccess';
import { ManagePlan } from './ManagePlan';
import { UpdatePayment } from './UpdatePayment';
import { SessionDetails } from './SessionDetails';
import { SessionSummary } from './SessionSummary';
import { MessageInstructor } from './MessageInstructor';

type CaregiverView = 
  | 'dashboard' 
  | 'loved-one-details' 
  | 'book-session' 
  | 'add-senior'
  | 'manage-seniors'
  | 'resources'
  | 'settings'
  | 'reschedule'
  | 'reschedule-success'
  | 'manage-plan'
  | 'update-payment'
  | 'session-details'
  | 'session-summary'
  | 'message-instructor';

interface CaregiverRouterProps {
  onLogout: () => void;
}

export function CaregiverRouter({ onLogout }: CaregiverRouterProps) {
  const [currentView, setCurrentView] = useState<CaregiverView>('dashboard');
  const [selectedSenior, setSelectedSenior] = useState('Mary Johnson');
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: string, data?: any) => {
    if (data?.seniorName) {
      setSelectedSenior(data.seniorName);
    }
    setCurrentView(view as CaregiverView);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBookingSuccess = () => {
    toast.success('✓ Session Booked Successfully!', {
      description: 'Confirmation sent to your loved one and you.'
    });
    setCurrentView('dashboard');
  };

  const handleAddSeniorSuccess = () => {
    toast.success('✓ Loved One Added Successfully!', {
      description: 'We\'ll send them a confirmation and permission request.'
    });
    setCurrentView('dashboard');
  };

  const handleRescheduleSuccess = () => {
    setRescheduleData({ date: 'Dec 5, 2025', time: '2:00 PM' });
    setCurrentView('reschedule-success');
  };

  // Render current view
  switch (currentView) {
    case 'reschedule':
      return (
        <RescheduleSession
          seniorName={selectedSenior}
          currentDate="December 1, 2025"
          currentTime="2:00 PM"
          instructor="Tea Araki"
          onBack={() => setCurrentView('loved-one-details')}
          onSuccess={handleRescheduleSuccess}
        />
      );

    case 'reschedule-success':
      return (
        <RescheduleSuccess
          seniorName={selectedSenior}
          newDate={rescheduleData.date}
          newTime={rescheduleData.time}
          instructor="Tea Araki"
          onBackToDashboard={handleBackToDashboard}
        />
      );

    case 'manage-plan':
      return (
        <ManagePlan
          seniorName={selectedSenior}
          onBack={() => setCurrentView('loved-one-details')}
        />
      );

    case 'update-payment':
      return (
        <UpdatePayment
          onBack={() => setCurrentView('loved-one-details')}
        />
      );

    case 'session-details':
      return (
        <SessionDetails
          seniorName={selectedSenior}
          onBack={() => setCurrentView('loved-one-details')}
          onReschedule={() => setCurrentView('reschedule')}
          onCancel={() => {
            if (confirm('Are you sure you want to cancel this session?')) {
              toast.success('✓ Session canceled', {
                description: 'Cancellation confirmation has been sent to you and the instructor.'
              });
              setCurrentView('loved-one-details');
            }
          }}
        />
      );

    case 'session-summary':
      return (
        <SessionSummary
          seniorName={selectedSenior}
          onBack={() => setCurrentView('loved-one-details')}
          onWatchRecording={() => {
            toast.success('Opening session recording...', {
              description: 'Video player will open in a new window'
            });
            // In a real app, this would open a video player with the session recording
            window.open('about:blank', '_blank');
          }}
          onDownloadGuide={() => {
            toast.success('Downloading session guide...', {
              description: 'PDF will open in a new window for printing or saving'
            });
            // In a real app, this would download the actual PDF
            const link = document.createElement('a');
            link.href = 'data:application/pdf;base64,';
            link.download = 'session-guide.pdf';
            // Note: In production, this would be a real PDF URL
          }}
        />
      );

    case 'message-instructor':
      return (
        <MessageInstructor
          seniorName={selectedSenior}
          onBack={() => setCurrentView('loved-one-details')}
        />
      );
  
    case 'loved-one-details':
    case 'loved-one-details':
      return (
        <LovedOneDetails
          seniorName={selectedSenior}
          onBack={handleBackToDashboard}
          onNavigateToBooking={() => setCurrentView('book-session')}
          onNavigateToReschedule={() => setCurrentView('reschedule')}
          onNavigateToManagePlan={() => setCurrentView('manage-plan')}
          onNavigateToUpdatePayment={() => setCurrentView('update-payment')}
          onNavigateToSessionDetails={() => setCurrentView('session-details')}
          onNavigateToSessionSummary={() => setCurrentView('session-summary')}
          onNavigateToMessageInstructor={() => setCurrentView('message-instructor')}
        />
      );

    case 'book-session':
      return (
        <BookSessionCaregiver
          onBack={handleBackToDashboard}
          onSuccess={handleBookingSuccess}
        />
      );

    case 'add-senior':
      return (
        <AddAnotherSenior
          onBack={handleBackToDashboard}
          onSuccess={handleAddSeniorSuccess}
        />
      );

    case 'manage-seniors':
      return (
        <ManageLovedOnes
          onBack={handleBackToDashboard}
          onViewDetails={(seniorName) => {
            setSelectedSenior(seniorName);
            setCurrentView('loved-one-details');
          }}
          onAddSenior={() => setCurrentView('add-senior')}
          onNavigate={handleNavigate}
        />
      );

    case 'resources':
      return (
        <LearningResourcesCaregiver
          onBack={handleBackToDashboard}
          onNavigate={handleNavigate}
        />
      );

    case 'settings':
      return (
        <CaregiverSettings
          onBack={handleBackToDashboard}
          onNavigate={handleNavigate}
        />
      );

    case 'dashboard':
    default:
      return (
        <CaregiverDashboard
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      );
  }
}