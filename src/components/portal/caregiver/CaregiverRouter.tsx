import { useState } from 'react';
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
    alert('✓ Session Booked Successfully!\n\nConfirmation sent to your loved one and you.');
    setCurrentView('dashboard');
  };

  const handleAddSeniorSuccess = () => {
    alert('✓ Loved One Added Successfully!\n\nWe\'ll send them a confirmation and permission request.');
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
              alert('Session canceled');
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
          onWatchRecording={() => alert('Video player opening...')}
          onDownloadGuide={() => alert('Downloading guide...')}
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
        />
      );

    case 'resources':
      return (
        <LearningResourcesCaregiver
          onBack={handleBackToDashboard}
        />
      );

    case 'settings':
      return (
        <CaregiverSettings
          onBack={handleBackToDashboard}
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
