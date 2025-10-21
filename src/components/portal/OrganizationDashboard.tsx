import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut,
  Building2,
  TrendingUp,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Mail,
  Phone,
  Download,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';
import logoNoTagline from 'figma:asset/b3896b1c25bf716df167396f2f85a96f4bc48a2a.png';

type OrganizationView = 'dashboard' | 'workshops' | 'residents' | 'reports' | 'settings';

interface OrganizationDashboardProps {
  currentView: OrganizationView;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function OrganizationDashboard({ currentView, onNavigate, onLogout }: OrganizationDashboardProps) {
  const [activeView, setActiveView] = useState<OrganizationView>('dashboard');

  // Mock data for organization
  const upcomingWorkshops = [
    {
      id: 1,
      title: 'Scam Prevention Workshop',
      date: 'November 30, 2025',
      time: '2:00 PM - 3:30 PM',
      attendees: 24,
      capacity: 30,
      instructor: 'Tea Araki',
      type: 'Free Community Workshop',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Email & Calendar Basics',
      date: 'December 5, 2025',
      time: '10:00 AM - 11:30 AM',
      attendees: 18,
      capacity: 25,
      instructor: 'Lindsay Trenton',
      type: 'Paid Class',
      status: 'confirmed'
    }
  ];

  const stats = [
    { label: 'Active Residents Enrolled', value: '42', change: '+8 this month', trend: 'up' },
    { label: 'Workshops This Month', value: '6', change: '2 upcoming', trend: 'neutral' },
    { label: 'Completion Rate', value: '94%', change: '+5% from last month', trend: 'up' },
    { label: 'Average Satisfaction', value: '4.8/5', change: 'Excellent feedback', trend: 'up' }
  ];

  const recentActivity = [
    { date: 'Nov 20, 2025', activity: 'Scam Prevention Workshop completed - 28 attendees', type: 'success' },
    { date: 'Nov 15, 2025', activity: 'Monthly report generated and sent', type: 'info' },
    { date: 'Nov 12, 2025', activity: '5 new residents enrolled in Email Basics class', type: 'success' },
    { date: 'Nov 8, 2025', activity: 'December workshop schedule confirmed', type: 'info' }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'residents', label: 'Resident Progress', icon: Users },
    { id: 'billing', label: 'Reports & Billing', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#F9FAFB' }}>
      {/* SIDEBAR - Hidden on Mobile */}
      <aside 
        className="hidden md:flex w-72 flex-shrink-0 border-r"
        style={{ 
          background: '#265073',
          borderColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b flex flex-col items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <img 
              src={logoNoTagline}
              alt="Mālama Digital Care"
              className="h-12 w-auto"
            />
            <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Organization Portal
            </p>
          </div>

          {/* Organization Profile with Quick Actions */}
          <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-[20px]"
                style={{ background: '#2D9596' }}
              >
                🏢
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ color: '#FFFFFF', fontSize: '16px' }}>
                  Sunset Senior Living
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  Organization Account
                </p>
              </div>
            </div>
            {/* Quick Action Buttons */}
            <div className="flex gap-2">
             
              <button
                onClick={onLogout}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all text-[14px] active:scale-95 transition-transform"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all active:scale-95 transition-transform"
                  style={{
                    background: isActive ? '#2D9596' : 'transparent',
                    color: '#FFFFFF'
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span style={{ fontSize: '16px' }}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-red-600 active:scale-95 transition-transform"
              style={{
                background: '#DC2626',
                color: '#FFFFFF'
              }}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span style={{ fontSize: '16px' }}>Log Out</span>
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
              <p className="font-semibold text-xl" style={{ color: '#265073' }}>Sunset Senior Living</p>
              <p className="text-base" style={{ color: '#6B7280' }}>Organization Portal</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all active:scale-95 transition-transform"
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
              Organization Dashboard
            </h1>
            <p className="text-[16px] md:text-[18px] break-words" style={{ color: '#6B7280' }}>
              Welcome back! Here&apos;s what&apos;s happening with your community programs.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-all hover:shadow-lg"
                onClick={() => {
                  if (index === 0) onNavigate('residents'); // Active Residents
                  else if (index === 1) onNavigate('workshops'); // Workshops
                  else if (index === 2 || index === 3) onNavigate('analytics'); // Completion/Satisfaction
                }}
              >
                <CardHeader className="pb-3 p-3 md:p-6">
                  <CardDescription className="text-[14px] md:text-[14px]">{stat.label}</CardDescription>
                  <CardTitle className="text-[26px] md:text-[32px]" style={{ color: '#265073' }}>
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="flex items-center gap-2">
                    {stat.trend === 'up' && (
                      <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#16A34A' }} />
                    )}
                    <p className="text-[13px] md:text-[14px] leading-tight" style={{ color: stat.trend === 'up' ? '#16A34A' : '#6B7280' }}>
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mālama Subscription Breakdown */}
          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <CardTitle className="text-[21px] md:text-[24px]" style={{ color: '#265073' }}>
                Mālama Digital Care Subscriptions
              </CardTitle>
              <CardDescription className="text-[15px] md:text-[16px]">
                Resident enrollment across all Mālama plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg" style={{ background: '#F0FDFA', border: '2px solid #2D9596' }}>
                  <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Total Mālama Plans</p>
                  <p className="text-[28px] font-bold" style={{ color: '#2D9596' }}>24</p>
                  <p className="text-[13px]" style={{ color: '#6B7280' }}>57% of residents</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: '#FEF3C7' }}>
                  <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Premium</p>
                  <p className="text-[24px] font-bold" style={{ color: '#F59E0B' }}>9</p>
                  <p className="text-[13px]" style={{ color: '#6B7280' }}>$149/month</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: '#DBEAFE' }}>
                  <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Standard</p>
                  <p className="text-[24px] font-bold" style={{ color: '#2563EB' }}>10</p>
                  <p className="text-[13px]" style={{ color: '#6B7280' }}>$79/month</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: '#F3F4F6' }}>
                  <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Basic</p>
                  <p className="text-[24px] font-bold" style={{ color: '#4B5563' }}>5</p>
                  <p className="text-[13px]" style={{ color: '#6B7280' }}>$39/month</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg" style={{ background: '#FEE2E2' }}>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>
                  <strong style={{ color: '#DC2626' }}>18 residents</strong> attending workshops only (no Mālama subscription)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Workshops */}
          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-[21px] md:text-[24px]" style={{ color: '#265073' }}>
                    Upcoming Workshops
                  </CardTitle>
                  <CardDescription className="text-[15px] md:text-[16px]">
                    Scheduled classes and events for your community
                  </CardDescription>
                </div>
                <Button
                  onClick={() => onNavigate('schedule')}
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                  className="w-full sm:w-auto text-[15px] md:text-[16px] active:scale-95 transition-transform"
                >
                  Schedule New Workshop
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingWorkshops.map((workshop) => (
                  <div 
                    key={workshop.id}
                    className="p-4 md:p-6 rounded-lg border-2"
                    style={{ borderColor: '#E5E7EB', background: '#FFFFFF' }}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="text-[19px] md:text-[20px] font-bold break-words" style={{ color: '#265073' }}>
                            {workshop.title}
                          </h3>
                          <Badge 
                            className="text-[13px] md:text-[14px] self-start"
                            style={{ 
                              background: workshop.type === 'Free Community Workshop' ? '#D1FAE5' : '#E0F2FE',
                              color: workshop.type === 'Free Community Workshop' ? '#065F46' : '#0284C7'
                            }}
                          >
                            {workshop.type}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-[15px] md:text-[16px]" style={{ color: '#6B7280' }}>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="break-words">{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span className="break-words">{workshop.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span className="break-words">{workshop.attendees}/{workshop.capacity} registered</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className="text-[12px] md:text-[14px] self-start sm:self-auto"
                        style={{ background: '#D1FAE5', color: '#065F46' }}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px]" style={{ color: '#6B7280' }}>Registration</span>
                        <span className="text-[14px] font-semibold" style={{ color: '#265073' }}>
                          {Math.round((workshop.attendees / workshop.capacity) * 100)}% Full
                        </span>
                      </div>
                      <Progress 
                        value={(workshop.attendees / workshop.capacity) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] flex-shrink-0"
                          style={{ background: '#E6F7F4', color: '#2D9596' }}
                        >
                          {workshop.instructor.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-[14px] md:text-[16px] break-words" style={{ color: '#6B7280' }}>
                          Instructor: {workshop.instructor}
                        </span>
                      </div>
                      <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          onClick={() => onNavigate('workshop-details')}
                          className="flex-1 sm:flex-none h-10 px-4 text-[14px] active:scale-95 transition-transform"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onNavigate('manage-attendees')}
                          className="flex-1 sm:flex-none h-10 px-4 text-[14px] active:scale-95 transition-transform"
                        >
                          Manage Attendees
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('billing')}
            >
              <CardHeader className="pb-4 md:pb-6 p-4 md:p-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#E6F7F4' }}>
                  <Download className="w-6 h-6" style={{ color: '#2D9596' }} />
                </div>
                <CardTitle className="text-[18px] md:text-[20px] mb-2" style={{ color: '#265073' }}>
                  Download Reports
                </CardTitle>
                <CardDescription className="text-[14px] md:text-[16px]">
                  Get monthly attendance and progress reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('residents')}
            >
              <CardHeader className="pb-4 md:pb-6 p-4 md:p-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#E6F7F4' }}>
                  <Users className="w-6 h-6" style={{ color: '#2D9596' }} />
                </div>
                <CardTitle className="text-[18px] md:text-[20px] mb-2" style={{ color: '#265073' }}>
                  Enroll Residents
                </CardTitle>
                <CardDescription className="text-[14px] md:text-[16px]">
                  Register residents for upcoming classes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('billing')}
            >
              <CardHeader className="pb-4 md:pb-6 p-4 md:p-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#E6F7F4' }}>
                  <DollarSign className="w-6 h-6" style={{ color: '#2D9596' }} />
                </div>
                <CardTitle className="text-[18px] md:text-[20px] mb-2" style={{ color: '#265073' }}>
                  View Billing
                </CardTitle>
                <CardDescription className="text-[14px] md:text-[16px]">
                  Review invoices and payment history
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <CardTitle className="text-[20px] md:text-[24px]" style={{ color: '#265073' }}>
                Recent Activity
              </CardTitle>
              <CardDescription className="text-[14px] md:text-[16px]">
                Latest updates for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg cursor-pointer hover:bg-white transition-colors"
                    style={{ background: '#F9FAFB' }}
                    onClick={() => toast.info(activity.activity, {
                      description: `Activity on ${activity.date}`
                    })}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: activity.type === 'success' ? '#D1FAE5' : '#E0F2FE'
                      }}
                    >
                      {activity.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                      ) : (
                        <FileText className="w-5 h-5" style={{ color: '#0284C7' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] md:text-[16px] font-semibold break-words" style={{ color: '#265073' }}>
                        {activity.activity}
                      </p>
                      <p className="text-[13px] md:text-[14px] mt-1" style={{ color: '#9CA3AF' }}>
                        {activity.date}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: '#9CA3AF' }} />
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
                  <Building2 className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] md:text-[20px] font-bold mb-2 break-words" style={{ color: '#265073' }}>
                    Partnership Support
                  </h3>
                  <p className="text-[14px] md:text-[16px] mb-4 break-words" style={{ color: '#6B7280' }}>
                    Need to customize your program or have questions about billing? Our partnership team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                      onClick={() => window.location.href = 'tel:+18085558324'}
                      className="w-full sm:w-auto text-[14px] md:text-[16px] active:scale-95 transition-transform"
                    >
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      Call Partnership Team
                    </Button>
                    <Button
                      variant="outline"
                      style={{ borderColor: '#2D9596', color: '#2D9596' }}
                      onClick={() => {
                        window.location.href = 'mailto:support@malamadigital.com?subject=Support Request - Organization&body=Hi Mālama Digital Care Team,%0D%0A%0D%0AOrganization: Sunset Senior Living%0D%0A%0D%0APlease describe your question or issue:%0D%0A';
                      }}
                      className="w-full sm:w-auto text-[14px] md:text-[16px] active:scale-95 transition-transform"
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
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all active:scale-95 transition-transform"
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
                    {item.label === 'Reports & Billing' ? 'Reports' : item.label === 'Resident Progress' ? 'Residents' : item.label}
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
