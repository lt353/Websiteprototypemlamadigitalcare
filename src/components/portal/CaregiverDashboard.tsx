import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  ChevronRight,
  Phone,
  Mail,
  Shield,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

type CaregiverView = 'dashboard' | 'manage-seniors' | 'sessions' | 'resources' | 'settings';

interface CaregiverDashboardProps {
  currentView: CaregiverView;
  onNavigate: (view: string, data?: any) => void;
  onLogout: () => void;
}

export function CaregiverDashboard({ currentView, onNavigate, onLogout }: CaregiverDashboardProps) {
  const [activeView, setActiveView] = useState<CaregiverView>('dashboard');

  // Dynamic date helper functions
  const getDynamicDate = (daysOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDynamicDateTime = (daysOffset: number, time: string) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${dateStr} at ${time}`;
  };

  // Mock data for seniors being cared for
  const seniors = [
    {
      id: 1,
      name: 'Mary Johnson',
      relationship: 'Mother',
      nextSession: getDynamicDateTime(5, '2:00 PM'),
      nextSessionType: 'In-Home Visit',
      nextSessionCoverage: 'addon', // Already used October in-home session
      lastSession: getDynamicDate(-7),
      status: 'active',
      progress: 'Making great progress with email',
      upcomingTopics: 'Two-Factor Authentication, Calendar App'
    }
  ];

  const recentActivity = [
    { date: getDynamicDate(-7), senior: 'Mary Johnson', activity: 'Completed in-home session on email management', type: 'success' },
    { date: getDynamicDate(-11), senior: 'Mary Johnson', activity: 'Passed scam awareness quiz with 100%', type: 'success' },
    { date: getDynamicDate(-14), senior: 'Mary Johnson', activity: 'Completed virtual session (add-on)', type: 'success' },
    { date: getDynamicDate(-21), senior: 'Mary Johnson', activity: 'Completed virtual session on video calling', type: 'success' }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'manage-seniors', label: 'Manage Loved Ones', icon: Users },
    { id: 'resources', label: 'Learning Resources', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#F9FAFB' }}>
      {/* SIDEBAR - Hidden on Mobile */}
      <aside 
        className="hidden md:flex w-64 lg:w-72 flex-shrink-0 border-r"
        style={{ 
          background: '#265073',
          borderColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 lg:p-6 border-b flex flex-col items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="text-white text-[20px] lg:text-[24px] font-bold">
              Mālama Digital Care
            </div>
            <p className="text-[12px] lg:text-[14px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Caregiver Portal
            </p>
          </div>

          {/* Profile with Quick Actions */}
          <div className="p-4 lg:p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-[18px] lg:text-[20px] flex-shrink-0"
                style={{ background: '#2D9596' }}
              >
                👥
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate" style={{ color: '#FFFFFF', fontSize: '14px' }}>
                  Sarah Miller
                </p>
                <p className="truncate" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                  Caregiver Account
                </p>
              </div>
            </div>
            {/* Quick Action Buttons */}
            <div className="flex gap-2">
              
              <button
                onClick={onLogout}
                className="flex-1 flex items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 rounded-lg transition-all text-[12px] lg:text-[14px]"
                style={{ 
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 lg:p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-3 lg:px-4 py-3 mb-2 rounded-lg transition-all"
                  style={{
                    background: isActive ? '#2D9596' : 'transparent',
                    color: '#FFFFFF'
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[14px] lg:text-[16px] truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-3 lg:p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-all hover:bg-red-600"
              style={{
                background: '#DC2626',
                color: '#FFFFFF'
              }}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="text-[14px] lg:text-[16px] truncate">Log Out</span>
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-[12px] text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Mālama Digital Care © 2025
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Mobile Header with Logout */}
          <div className="md:hidden flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
            <div>
              <p className="font-semibold text-xl" style={{ color: '#265073' }}>Sarah Miller</p>
              <p className="text-base" style={{ color: '#6B7280' }}>Caregiver Account</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all"
              style={{ 
                background: '#DC2626',
                color: '#FFFFFF'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-base font-semibold">Log Out</span>
            </button>
          </div>

          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-[28px] md:text-[36px] font-bold mb-2 break-words" style={{ color: '#265073' }}>
              Caregiver Dashboard
            </h1>
            <p className="text-[16px] md:text-[18px] break-words" style={{ color: '#6B7280' }}>
              Supporting your loved ones on their digital journey
            </p>
          </div>

          {/* Seniors Overview Cards */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {seniors.map((senior) => (
              <Card key={senior.id} className="border-2 flex flex-col" style={{ borderColor: '#E5E7EB' }}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-[20px] md:text-[24px] break-words" style={{ color: '#265073' }}>
                        {senior.name}
                      </CardTitle>
                      <CardDescription className="text-[14px] md:text-[16px] mt-1">
                        {senior.relationship}
                      </CardDescription>
                    </div>
                    <Badge 
                      className="text-[13px] md:text-[14px] px-2 md:px-3 py-1 flex-shrink-0"
                      style={{ background: '#D1FAE5', color: '#065F46' }}
                    >
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col pt-0">
                  {/* Next Session */}
                  <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg" style={{ background: '#E6F7F4' }}>
                    <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#2D9596' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <p className="font-semibold text-[15px] md:text-[16px]" style={{ color: '#265073' }}>
                          Next Session
                        </p>
                        {senior.nextSessionCoverage === 'included' ? (
                          <Badge style={{ background: '#DBEAFE', color: '#1E40AF', fontSize: '12px', padding: '2px 8px' }}>
                            PLAN SESSION
                          </Badge>
                        ) : (
                          <Badge style={{ background: '#FEF3C7', color: '#92400E', fontSize: '12px', padding: '2px 8px' }}>
                            ADD-ON {senior.nextSessionType === 'In-Home Visit' ? '$72.25' : '$29.75'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[15px] md:text-[16px] break-words" style={{ color: '#6B7280' }}>
                        {senior.nextSession}
                      </p>
                      <p className="text-[14px] md:text-[14px] mt-1 break-words" style={{ color: '#6B7280' }}>
                        Topics: {senior.upcomingTopics}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#16A34A' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[15px] md:text-[16px]" style={{ color: '#265073' }}>
                        Recent Progress
                      </p>
                      <p className="text-[15px] md:text-[16px] break-words" style={{ color: '#6B7280' }}>
                        {senior.progress}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto">
                    <Button 
                      onClick={() => onNavigate('loved-one-details', { seniorName: senior.name })}
                      className="flex-1 text-[15px] md:text-[16px] whitespace-nowrap"
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                    >
                      View Details
                    </Button>
                    <Button 
                      onClick={() => onNavigate('book-session')}
                      variant="outline"
                      className="flex-1 text-[15px] md:text-[16px] whitespace-nowrap"
                      style={{ borderColor: '#2D9596', color: '#2D9596' }}
                    >
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('add-senior')}
            >
              <CardHeader className="pb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 flex-shrink-0" style={{ background: '#E6F7F4' }}>
                  <Users className="w-6 h-6" style={{ color: '#2D9596' }} />
                </div>
                <CardTitle className="text-[19px] md:text-[20px] mb-2 break-words" style={{ color: '#265073' }}>
                  Add Another Senior
                </CardTitle>
                <CardDescription className="text-[15px] md:text-[16px] break-words">
                  Register another loved one for support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('book-session')}
            >
              <CardHeader className="pb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 flex-shrink-0" style={{ background: '#E6F7F4' }}>
                  <Calendar className="w-6 h-6" style={{ color: '#2D9596' }} />
                </div>
                <CardTitle className="text-[19px] md:text-[20px] mb-2 break-words" style={{ color: '#265073' }}>
                  Schedule Session
                </CardTitle>
                <CardDescription className="text-[15px] md:text-[16px] break-words">
                  Book a new tech support session
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('resources')}
            >
              <CardHeader className="pb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 flex-shrink-0" style={{ background: '#E6F7F4' }}>
                  <BookOpen className="w-6 h-6" style={{ color: '#2D9596' }} />
                </div>
                <CardTitle className="text-[19px] md:text-[20px] mb-2 break-words" style={{ color: '#265073' }}>
                  Learning Resources
                </CardTitle>
                <CardDescription className="text-[15px] md:text-[16px] break-words">
                  Access guides and tutorials
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mb-6 lg:mb-8">
            <CardHeader>
              <CardTitle className="text-[20px] md:text-[24px]" style={{ color: '#265073' }}>
                Recent Activity
              </CardTitle>
              <CardDescription className="text-[14px] md:text-[16px]">
                Latest updates for your loved ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg border"
                    style={{ borderColor: '#E5E7EB' }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}
                      style={{ 
                        background: activity.type === 'success' ? '#D1FAE5' : '#E0F2FE'
                      }}
                    >
                      {activity.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                      ) : (
                        <AlertCircle className="w-5 h-5" style={{ color: '#0284C7' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[14px] md:text-[16px] break-words" style={{ color: '#265073' }}>
                        {activity.senior}
                      </p>
                      <p className="text-[14px] md:text-[16px] break-words" style={{ color: '#6B7280' }}>
                        {activity.activity}
                      </p>
                      <p className="text-[13px] md:text-[14px] mt-1" style={{ color: '#9CA3AF' }}>
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card style={{ background: '#E6F7F4', borderColor: '#2D9596' }}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2D9596' }}>
                  <Heart className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] md:text-[20px] font-bold mb-2 break-words" style={{ color: '#265073' }}>
                    Need Help Supporting Your Loved One?
                  </h3>
                  <p className="text-[14px] md:text-[16px] mb-4 break-words" style={{ color: '#6B7280' }}>
                    Our team is here to answer questions and provide guidance on how to best support your loved one's digital learning journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => window.open('tel:+18085555432', '_self')}
                      className="text-[14px] md:text-[16px] whitespace-nowrap w-full sm:w-auto justify-center"
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                    >
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      Call Us
                    </Button>
                    <Button
                      onClick={() => window.open('mailto:support@malamadigitalcare.com?subject=Support%20Request', '_self')}
                      variant="outline"
                      className="text-[14px] md:text-[16px] whitespace-nowrap w-full sm:w-auto justify-center"
                      style={{ borderColor: '#2D9596', color: '#2D9596' }}
                    >
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      Email Support
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* BOTTOM NAVIGATION BAR - Mobile Only */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-4"
        style={{ 
          background: '#FFFFFF', 
          borderColor: '#2D9596',
          boxShadow: '0 -4px 20px rgba(38, 80, 115, 0.15)'
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                  style={{
                    background: isActive ? '#E6F7F4' : 'transparent',
                    color: isActive ? '#2D9596' : '#6B7280'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[11px] font-medium text-center leading-tight">
                    {item.label === 'Manage Loved Ones' ? 'Manage' : item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}