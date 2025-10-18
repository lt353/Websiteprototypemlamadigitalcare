import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';

interface ResidentProgressProps {
  onBack: () => void;
  onNavigateToResident?: (name: string) => void;
}

export function ResidentProgress({ onBack, onNavigateToResident }: ResidentProgressProps) {
  const residents = [
    { name: 'Mary Smith', unit: '#204', sessions: 5, skills: 8, lastAttended: 'Nov 15' },
    { name: 'John Doe', unit: '#156', sessions: 2, skills: 3, lastAttended: 'Oct 20' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-8">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 hover:underline" style={{ color: '#2D9596' }}>
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-[36px] font-bold mb-8" style={{ color: '#265073' }}>Resident Progress</h1>
        <div className="space-y-4">
          {residents.map((r, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-[20px] font-bold" style={{ color: '#265073' }}>{r.name} • {r.unit}</p>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>
                    {r.sessions} sessions • {r.skills} skills • Last: {r.lastAttended}
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={onNavigateToResident ? () => onNavigateToResident(r.name) : undefined}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
