import { Home, Users, BookOpen, Settings } from 'lucide-react';

interface CaregiverBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function CaregiverBottomNav({ currentView, onNavigate }: CaregiverBottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'manage-seniors', icon: Users, label: 'Manage' },
    { id: 'resources', icon: BookOpen, label: 'Resources' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 border-t-4 md:hidden"
      style={{ 
        background: '#FFFFFF', 
        borderColor: '#2D9596',
        boxShadow: '0 -4px 20px rgba(38, 80, 115, 0.15)'
      }}
    >
      <div className="grid grid-cols-4 gap-2 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center py-3 px-3 rounded-lg transition-all active:scale-95 transition-transform"
              style={{
                background: isActive ? '#E6F7F4' : 'transparent',
                color: isActive ? '#2D9596' : '#6B7280',
                minHeight: '68px'
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
              <Icon 
                className="w-6 h-6 mb-1" 
                style={{ 
                  strokeWidth: isActive ? 2.5 : 2 
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}