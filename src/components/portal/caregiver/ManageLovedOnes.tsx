import { ArrowLeft, Plus, MoreVertical } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CaregiverBottomNav } from './CaregiverBottomNav';

interface ManageLovedOnesProps {
  onBack: () => void;
  onViewDetails: (seniorName: string) => void;
  onAddSenior: () => void;
  onNavigate?: (view: string) => void;
}

export function ManageLovedOnes({ onBack, onViewDetails, onAddSenior, onNavigate }: ManageLovedOnesProps) {
  const seniors = [
    {
      name: 'Mary Johnson',
      relationship: 'Mother',
      status: 'active',
      nextSession: 'Dec 1, 2025',
      plan: 'Standard Care',
      sessionsCompleted: 5,
      skillsMastered: 12
    },
    {
      name: 'Robert Johnson',
      relationship: 'Father',
      status: 'active',
      nextSession: 'Dec 2, 2025',
      plan: 'Standard Care',
      sessionsCompleted: 3,
      skillsMastered: 8
    }
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-[36px]" style={{ color: '#265073' }}>
              Manage Loved Ones
            </h1>
            <p className="text-base md:text-[18px]" style={{ color: '#6B7280' }}>
              All the seniors you&apos;re supporting
            </p>
          </div>
          <Button
            onClick={onAddSenior}
            className="h-12 md:h-14 text-base md:text-[18px] w-full md:w-auto whitespace-nowrap"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <Plus className="w-5 h-5 mr-2 flex-shrink-0" />
            Add Another Senior
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {seniors.map((senior) => (
            <Card key={senior.name} className="border-2" style={{ borderColor: '#E5E7EB' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-[24px]"
                      style={{ background: '#E6F7F4' }}
                    >
                      👤
                    </div>
                    <div>
                      <CardTitle className="text-[24px]">{senior.name}</CardTitle>
                      <p className="text-[16px]" style={{ color: '#6B7280' }}>{senior.relationship}</p>
                    </div>
                  </div>
                  <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                  <div>
                    <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>{senior.sessionsCompleted}</p>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Sessions</p>
                  </div>
                  <div>
                    <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>{senior.skillsMastered}</p>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Skills</p>
                  </div>
                </div>

                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Next Session</p>
                  <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>{senior.nextSession}</p>
                </div>

                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Current Plan</p>
                  <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>{senior.plan}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button 
                    onClick={() => onViewDetails(senior.name)}
                    variant="outline"
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="outline"
                  >
                    Book Session
                  </Button>
                </div>

                <Button variant="ghost" className="w-full justify-center">
                  <MoreVertical className="w-5 h-5 mr-2" />
                  More Options
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      {onNavigate && (
        <CaregiverBottomNav currentView="manage-seniors" onNavigate={onNavigate} />
      )}
    </div>
  );
}
