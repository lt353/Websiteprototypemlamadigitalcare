import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { TeacherDashboard } from './TeacherDashboard';
import { WeeklySchedule } from './WeeklySchedule';
import { PreClassPrep } from './PreClassPrep';

type TeacherView = 'dashboard' | 'schedule' | 'pre-class-prep';

interface TeacherRouterProps {
  onLogout: () => void;
}

export interface ClassSession {
  id: string;
  topic: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  duration: string;
  price: number;
  expectedAttendance: number;
  materialsNeeded: string[];
  status: 'upcoming' | 'today' | 'completed';
}

export interface Student {
  id: string;
  name: string;
  deviceType: 'iPhone' | 'Android' | 'iPad' | 'Other';
  status: 'new' | 'returning' | 'basic' | 'standard' | 'premium' | 'community' | 'walk-in';
  accessibilityNeeds: {
    vision: boolean;
    hearing: boolean;
    mobility: boolean;
  };
  email?: string;
  phone?: string;
}

export function TeacherRouter({ onLogout }: TeacherRouterProps) {
  const [currentView, setCurrentView] = useState<TeacherView>('dashboard');
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: string, data?: any) => {
    if (data?.classSession) {
      setSelectedClass(data.classSession);
    }
    setCurrentView(view as TeacherView);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedClass(null);
  };

  // Render current view
  switch (currentView) {
    case 'schedule':
      return (
        <WeeklySchedule
          onBack={handleBackToDashboard}
          onClassSelect={(classSession) => {
            setSelectedClass(classSession);
            setCurrentView('pre-class-prep');
          }}
        />
      );

    case 'pre-class-prep':
      return selectedClass ? (
        <PreClassPrep
          classSession={selectedClass}
          onBack={() => setCurrentView('schedule')}
          onStartClass={() => {
            toast.success('Class started!', {
              description: `${selectedClass.topic} is now in session`
            });
          }}
        />
      ) : null;

    case 'dashboard':
    default:
      return (
        <TeacherDashboard
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      );
  }
}