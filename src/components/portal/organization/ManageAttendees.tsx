import { useState } from 'react';
import { ArrowLeft, UserPlus, Mail, Phone, CheckCircle2, X, Search } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner@2.0.3';

interface ManageAttendeesProps {
  workshopTitle?: string;
  onBack: () => void;
}

export function ManageAttendees({ workshopTitle = 'Scam Prevention Workshop', onBack }: ManageAttendeesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResidents, setSelectedResidents] = useState<string[]>(['1', '3', '5']);

  const allResidents = [
    { id: '1', name: 'Mary Johnson', room: '204', email: 'mary.j@email.com', phone: '(808) 555-0123', enrolled: true, attended: true },
    { id: '2', name: 'Robert Chen', room: '312', email: 'robert.c@email.com', phone: '(808) 555-0124', enrolled: false, attended: false },
    { id: '3', name: 'Patricia Williams', room: '108', email: 'patricia.w@email.com', phone: '(808) 555-0125', enrolled: true, attended: true },
    { id: '4', name: 'James Martinez', room: '215', email: 'james.m@email.com', phone: '(808) 555-0126', enrolled: false, attended: false },
    { id: '5', name: 'Linda Davis', room: '403', email: 'linda.d@email.com', phone: '(808) 555-0127', enrolled: true, attended: false },
    { id: '6', name: 'Michael Brown', room: '301', email: 'michael.b@email.com', phone: '(808) 555-0128', enrolled: false, attended: false },
    { id: '7', name: 'Barbara Garcia', room: '209', email: 'barbara.g@email.com', phone: '(808) 555-0129', enrolled: false, attended: false },
    { id: '8', name: 'William Rodriguez', room: '156', email: 'william.r@email.com', phone: '(808) 555-0130', enrolled: false, attended: false },
  ];

  const filteredResidents = allResidents.filter(resident =>
    resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resident.room.includes(searchQuery)
  );

  const enrolledCount = selectedResidents.length;
  const maxCapacity = 30;

  const handleToggleResident = (id: string) => {
    if (selectedResidents.includes(id)) {
      setSelectedResidents(selectedResidents.filter(rid => rid !== id));
    } else {
      if (enrolledCount < maxCapacity) {
        setSelectedResidents([...selectedResidents, id]);
      } else {
        toast.error('Workshop is at maximum capacity (30 residents)');
      }
    }
  };

  const handleSendReminders = () => {
    toast.success(`✓ Reminder emails sent to ${enrolledCount} residents`);
  };

  const handleExportList = () => {
    toast.success('✓ Attendee list exported to CSV');
  };

  const handleSaveChanges = () => {
    toast.success(`✓ ${enrolledCount} residents enrolled in workshop`);
    setTimeout(() => onBack(), 1500);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Workshop Details
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Manage Attendees
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            {workshopTitle} • December 5, 2025 at 2:00 PM
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Enrolled</p>
              <p className="text-[32px] font-bold" style={{ color: '#2D9596' }}>
                {enrolledCount}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Capacity</p>
              <p className="text-[32px] font-bold" style={{ color: '#265073' }}>
                {maxCapacity}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Available Spots</p>
              <p className="text-[32px] font-bold" style={{ color: enrolledCount >= maxCapacity ? '#DC2626' : '#16A34A' }}>
                {maxCapacity - enrolledCount}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-[14px] mb-1" style={{ color: '#6B7280' }}>Fill Rate</p>
              <p className="text-[32px] font-bold" style={{ color: '#265073' }}>
                {Math.round((enrolledCount / maxCapacity) * 100)}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleSendReminders}
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Reminder to All ({enrolledCount})
              </Button>
              <Button
                variant="outline"
                onClick={handleExportList}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Export Attendee List
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.info('Attendance tracking page coming soon!')}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark Attendance
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <Input
                  placeholder="Search by name or room number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-10 text-[16px]"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Residents List */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[24px]">All Residents</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedResidents(allResidents.map(r => r.id))}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedResidents([])}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredResidents.map((resident) => (
                <div
                  key={resident.id}
                  className="flex items-center gap-4 p-4 rounded-lg border-2 transition-all"
                  style={{
                    borderColor: selectedResidents.includes(resident.id) ? '#2D9596' : '#E5E7EB',
                    background: selectedResidents.includes(resident.id) ? '#E6F7F4' : '#FFFFFF'
                  }}
                >
                  <Checkbox
                    id={`resident-${resident.id}`}
                    checked={selectedResidents.includes(resident.id)}
                    onCheckedChange={() => handleToggleResident(resident.id)}
                    className="w-5 h-5"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                        {resident.name}
                      </p>
                      <Badge variant="outline" className="text-[12px]">
                        Room {resident.room}
                      </Badge>
                      {resident.attended && (
                        <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>
                          ✓ Attended Last
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[14px]" style={{ color: '#6B7280' }}>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {resident.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {resident.phone}
                      </div>
                    </div>
                  </div>

                  {selectedResidents.includes(resident.id) ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleResident(resident.id)}
                      style={{ color: '#DC2626' }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleResident(resident.id)}
                      disabled={enrolledCount >= maxCapacity}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {filteredResidents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[18px]" style={{ color: '#6B7280' }}>
                  No residents found matching "{searchQuery}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-16 text-[18px] font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="flex-1 h-16 text-[18px] font-bold"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Save Changes ({enrolledCount} enrolled)
          </Button>
        </div>
      </div>
    </div>
  );
}
