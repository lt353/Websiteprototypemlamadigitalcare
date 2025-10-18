import { useState } from 'react';
import { OrganizationDashboard } from '../OrganizationDashboard';
import { ScheduleWorkshop } from './ScheduleWorkshop';
import { WorkshopDetails } from './WorkshopDetails';
import { ResidentProgress } from './ResidentProgress';
import { ReportsBilling } from './ReportsBilling';
import { OrganizationSettings } from './OrganizationSettings';
import { ResidentProfile } from './ResidentProfile';
import { ManageAttendees } from './ManageAttendees';
import { UpdatePaymentOrg } from './UpdatePaymentOrg';
import { WorkshopConfirmation } from './WorkshopConfirmation';
import { EditWorkshop } from './EditWorkshop';

type OrgView = 
  | 'dashboard' 
  | 'schedule' 
  | 'workshop-details'
  | 'residents'
  | 'billing'
  | 'settings'
  | 'resident-profile'
  | 'manage-attendees'
  | 'update-payment'
  | 'analytics'
  | 'workshops'
  | 'workshop-confirmation'
  | 'edit-workshop';

interface OrganizationRouterProps {
  onLogout: () => void;
}

export function OrganizationRouter({ onLogout }: OrganizationRouterProps) {
  const [currentView, setCurrentView] = useState<OrgView>('dashboard');
  const [workshopData, setWorkshopData] = useState<any>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view as OrgView);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleWorkshopSuccess = (data: any) => {
    setWorkshopData({
      title: data.workshop.title,
      date: data.date,
      time: data.time === '10am' ? '10:00 AM - 11:30 AM' : data.time === '2pm' ? '2:00 PM - 3:30 PM' : '5:30 PM - 7:00 PM',
      duration: data.workshop.duration,
      attendance: data.attendance,
      type: data.workshop.type
    });
    setCurrentView('workshop-confirmation');
  };

  switch (currentView) {
    case 'schedule':
      return (
        <ScheduleWorkshop
          onBack={handleBackToDashboard}
          onSuccess={handleWorkshopSuccess}
        />
      );

    case 'workshop-details':
      return (
        <WorkshopDetails
          onBack={handleBackToDashboard}
          onNavigateToManageAttendees={() => setCurrentView('manage-attendees')}
          onNavigateToEdit={() => setCurrentView('edit-workshop')}
        />
      );

    case 'edit-workshop':
      return (
        <EditWorkshop
          onBack={() => setCurrentView('workshop-details')}
          onSave={() => setCurrentView('workshop-details')}
        />
      );

    case 'residents':
      return (
        <ResidentProgress
          onBack={handleBackToDashboard}
          onNavigateToResident={() => setCurrentView('resident-profile')}
        />
      );

    case 'billing':
      return (
        <ReportsBilling
          onBack={handleBackToDashboard}
        />
      );

    case 'settings':
      return (
        <OrganizationSettings
          onBack={handleBackToDashboard}
          onNavigateToUpdatePayment={() => setCurrentView('update-payment')}
        />
      );

    case 'resident-profile':
      return (
        <ResidentProfile
          onBack={() => setCurrentView('residents')}
        />
      );

    case 'manage-attendees':
      return (
        <ManageAttendees
          onBack={() => setCurrentView('workshop-details')}
        />
      );

    case 'update-payment':
      return (
        <UpdatePaymentOrg
          onBack={() => setCurrentView('settings')}
        />
      );

    case 'workshop-confirmation':
      return workshopData ? (
        <WorkshopConfirmation
          workshop={workshopData}
          onBack={handleBackToDashboard}
          onEnrollResidents={() => setCurrentView('manage-attendees')}
        />
      ) : null;

    case 'analytics':
    case 'workshops':
      // Placeholder views - navigate back to dashboard with toast
      setTimeout(() => {
        handleBackToDashboard();
      }, 100);
      return (
        <OrganizationDashboard
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      );

    case 'dashboard':
    default:
      return (
        <OrganizationDashboard
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      );
  }
}
