import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';

interface ResidentProgressProps {
  onBack: () => void;
  onNavigateToResident?: (name: string) => void;
}

export function ResidentProgress({ onBack, onNavigateToResident }: ResidentProgressProps) {
  const residents = [
    // Scam Prevention Workshop attendees
    { name: 'Margaret Liu', unit: 'Room 204', sessions: 6, skills: 12, lastAttended: 'Nov 20', plan: 'Basic ($39/mo)' },
    { name: 'Robert Kim', unit: 'Room 312', sessions: 8, skills: 15, lastAttended: 'Nov 20', plan: 'Premium ($149/mo)' },
    { name: 'Helen Martinez', unit: 'Room 108', sessions: 5, skills: 9, lastAttended: 'Nov 20', plan: 'Workshop Only' },
    { name: 'Dorothy Santos', unit: 'Room 215', sessions: 3, skills: 6, lastAttended: 'Nov 12', plan: 'Workshop Only' },
    { name: 'Frank Wong', unit: 'Room 401', sessions: 7, skills: 13, lastAttended: 'Nov 20', plan: 'Standard ($79/mo)' },
    { name: 'Alice Chen', unit: 'Room 118', sessions: 9, skills: 16, lastAttended: 'Nov 20', plan: 'Premium ($149/mo)' },
    { name: 'George Nakamura', unit: 'Room 325', sessions: 4, skills: 8, lastAttended: 'Nov 20', plan: 'Workshop Only' },
    { name: 'Betty Yamamoto', unit: 'Room 209', sessions: 6, skills: 11, lastAttended: 'Nov 20', plan: 'Standard ($79/mo)' },
    { name: 'Thomas Park', unit: 'Room 418', sessions: 5, skills: 10, lastAttended: 'Nov 20', plan: 'Workshop Only' },
    { name: 'Patricia Lee', unit: 'Room 209', sessions: 8, skills: 14, lastAttended: 'Nov 20', plan: 'Premium ($149/mo)' },
    { name: 'William Chen', unit: 'Room 305', sessions: 7, skills: 12, lastAttended: 'Nov 20', plan: 'Standard ($79/mo)' },
    { name: 'Mary Johnson', unit: 'Room 401', sessions: 10, skills: 18, lastAttended: 'Nov 20', plan: 'Basic ($39/mo)' },
    { name: 'Richard Silva', unit: 'Room 122', sessions: 3, skills: 5, lastAttended: 'Nov 20', plan: 'Workshop Only' },
    { name: 'Linda Fujimoto', unit: 'Room 233', sessions: 6, skills: 11, lastAttended: 'Nov 20', plan: 'Basic ($39/mo)' },
    { name: 'Charles Brown', unit: 'Room 156', sessions: 9, skills: 16, lastAttended: 'Nov 20', plan: 'Premium ($149/mo)' },
    { name: 'Susan Lee', unit: 'Room 289', sessions: 5, skills: 9, lastAttended: 'Nov 20', plan: 'Workshop Only' },
    { name: 'Daniel Kato', unit: 'Room 331', sessions: 2, skills: 4, lastAttended: 'Nov 8', plan: 'Workshop Only' },
    { name: 'Nancy Wong', unit: 'Room 412', sessions: 7, skills: 13, lastAttended: 'Nov 20', plan: 'Standard ($79/mo)' },
    { name: 'Steven Park', unit: 'Room 367', sessions: 4, skills: 7, lastAttended: 'Nov 20', plan: 'Workshop Only' },
    { name: 'Carol Kim', unit: 'Room 198', sessions: 8, skills: 15, lastAttended: 'Nov 20', plan: 'Premium ($149/mo)' },
    { name: 'Mark Tanaka', unit: 'Room 421', sessions: 6, skills: 11, lastAttended: 'Nov 20', plan: 'Standard ($79/mo)' },
    { name: 'Ruth Nakamura', unit: 'Room 134', sessions: 5, skills: 10, lastAttended: 'Nov 20', plan: 'Workshop Only' },
    { name: 'James Watanabe', unit: 'Room 278', sessions: 7, skills: 14, lastAttended: 'Nov 20', plan: 'Premium ($149/mo)' },
    { name: 'Barbara Yamamoto', unit: 'Room 156', sessions: 4, skills: 8, lastAttended: 'Nov 20', plan: 'Workshop Only' },

    // Additional active residents (total 42)
    { name: 'David Rodriguez', unit: 'Room 145', sessions: 5, skills: 9, lastAttended: 'Nov 18', plan: 'Workshop Only' },
    { name: 'Jennifer Tanaka', unit: 'Room 267', sessions: 6, skills: 12, lastAttended: 'Nov 18', plan: 'Standard ($79/mo)' },
    { name: 'Michael Santos', unit: 'Room 334', sessions: 4, skills: 7, lastAttended: 'Nov 15', plan: 'Workshop Only' },
    { name: 'Elizabeth Kim', unit: 'Room 189', sessions: 8, skills: 15, lastAttended: 'Nov 18', plan: 'Premium ($149/mo)' },
    { name: 'Joseph Lee', unit: 'Room 423', sessions: 3, skills: 6, lastAttended: 'Nov 12', plan: 'Workshop Only' },
    { name: 'Sarah Wong', unit: 'Room 256', sessions: 7, skills: 13, lastAttended: 'Nov 18', plan: 'Standard ($79/mo)' },
    { name: 'Christopher Chen', unit: 'Room 378', sessions: 5, skills: 10, lastAttended: 'Nov 15', plan: 'Workshop Only' },
    { name: 'Karen Nakamura', unit: 'Room 212', sessions: 6, skills: 11, lastAttended: 'Nov 18', plan: 'Basic ($39/mo)' },
    { name: 'Matthew Park', unit: 'Room 345', sessions: 4, skills: 8, lastAttended: 'Nov 18', plan: 'Workshop Only' },
    { name: 'Jessica Martinez', unit: 'Room 167', sessions: 9, skills: 16, lastAttended: 'Nov 18', plan: 'Premium ($149/mo)' },
    { name: 'Andrew Liu', unit: 'Room 289', sessions: 5, skills: 9, lastAttended: 'Nov 15', plan: 'Workshop Only' },
    { name: 'Michelle Fujimoto', unit: 'Room 401', sessions: 7, skills: 14, lastAttended: 'Nov 18', plan: 'Standard ($79/mo)' },
    { name: 'Daniel Brown', unit: 'Room 223', sessions: 3, skills: 5, lastAttended: 'Nov 12', plan: 'Workshop Only' },
    { name: 'Lisa Yamamoto', unit: 'Room 356', sessions: 6, skills: 12, lastAttended: 'Nov 18', plan: 'Standard ($79/mo)' },
    { name: 'Kevin Silva', unit: 'Room 178', sessions: 8, skills: 15, lastAttended: 'Nov 18', plan: 'Premium ($149/mo)' },
    { name: 'Amanda Kato', unit: 'Room 412', sessions: 4, skills: 7, lastAttended: 'Nov 15', plan: 'Workshop Only' },
    { name: 'Ryan Watanabe', unit: 'Room 234', sessions: 5, skills: 10, lastAttended: 'Nov 18', plan: 'Basic ($39/mo)' },
    { name: 'Emily Rodriguez', unit: 'Room 389', sessions: 7, skills: 13, lastAttended: 'Nov 18', plan: 'Standard ($79/mo)' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-8">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 hover:underline active:scale-95 transition-transform" style={{ color: '#2D9596' }}>
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-[36px] font-bold mb-8" style={{ color: '#265073' }}>Resident Progress</h1>
        <div className="space-y-4">
          {residents.map((r, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-[20px] font-bold" style={{ color: '#265073' }}>{r.name} • {r.unit}</p>
                  </div>
                  <p className="text-[16px] mb-1" style={{ color: '#6B7280' }}>
                    {r.sessions} sessions • {r.skills} skills • Last: {r.lastAttended}
                  </p>
                  <p className="text-[14px]" style={{ color: '#9CA3AF' }}>
                    Plan: {r.plan}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 text-[16px] whitespace-nowrap active:scale-95 transition-transform"
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