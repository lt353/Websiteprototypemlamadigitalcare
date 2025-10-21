import { useState } from 'react';
import { ArrowLeft, UserPlus, Mail, Phone, CheckCircle2, X, Search } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';

interface ManageAttendeesProps {
  workshopTitle?: string;
  onBack: () => void;
}

export function ManageAttendees({ workshopTitle = 'Scam Prevention Workshop', onBack }: ManageAttendeesProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // All 42 residents at Sunset Senior Living
  const allResidents = [
    // Workshop attendees (24 enrolled)
    { id: '1', name: 'Margaret Liu', room: 'Room 204', email: 'margaret.liu@email.com', phone: '(808) 555-0201', enrolled: true, attended: true },
    { id: '2', name: 'Robert Kim', room: 'Room 312', email: 'robert.kim@email.com', phone: '(808) 555-0301', enrolled: true, attended: true },
    { id: '3', name: 'Helen Martinez', room: 'Room 108', email: 'helen.martinez@email.com', phone: '(808) 555-0108', enrolled: true, attended: true },
    { id: '4', name: 'Dorothy Santos', room: 'Room 215', email: 'dorothy.santos@email.com', phone: '(808) 555-0215', enrolled: true, attended: false },
    { id: '5', name: 'Frank Wong', room: 'Room 401', email: 'frank.wong@email.com', phone: '(808) 555-0401', enrolled: true, attended: true },
    { id: '6', name: 'Alice Chen', room: 'Room 118', email: 'alice.chen@email.com', phone: '(808) 555-0118', enrolled: true, attended: true },
    { id: '7', name: 'George Nakamura', room: 'Room 325', email: 'george.nakamura@email.com', phone: '(808) 555-0325', enrolled: true, attended: true },
    { id: '8', name: 'Betty Yamamoto', room: 'Room 209', email: 'betty.yamamoto@email.com', phone: '(808) 555-0209', enrolled: true, attended: true },
    { id: '9', name: 'Thomas Park', room: 'Room 418', email: 'thomas.park@email.com', phone: '(808) 555-0418', enrolled: true, attended: true },
    { id: '10', name: 'Patricia Lee', room: 'Room 209', email: 'patricia.lee@email.com', phone: '(808) 555-0299', enrolled: true, attended: true },
    { id: '11', name: 'William Chen', room: 'Room 305', email: 'william.chen@email.com', phone: '(808) 555-0305', enrolled: true, attended: true },
    { id: '12', name: 'Mary Johnson', room: 'Room 401', email: 'mary.johnson@email.com', phone: '(808) 555-0123', enrolled: true, attended: true },
    { id: '13', name: 'Richard Silva', room: 'Room 122', email: 'richard.silva@email.com', phone: '(808) 555-0122', enrolled: true, attended: true },
    { id: '14', name: 'Linda Fujimoto', room: 'Room 233', email: 'linda.fujimoto@email.com', phone: '(808) 555-0233', enrolled: true, attended: true },
    { id: '15', name: 'Charles Brown', room: 'Room 156', email: 'charles.brown@email.com', phone: '(808) 555-0156', enrolled: true, attended: true },
    { id: '16', name: 'Susan Lee', room: 'Room 289', email: 'susan.lee@email.com', phone: '(808) 555-0289', enrolled: true, attended: true },
    { id: '17', name: 'Daniel Kato', room: 'Room 331', email: 'daniel.kato@email.com', phone: '(808) 555-0331', enrolled: true, attended: false },
    { id: '18', name: 'Nancy Wong', room: 'Room 412', email: 'nancy.wong@email.com', phone: '(808) 555-0412', enrolled: true, attended: true },
    { id: '19', name: 'Steven Park', room: 'Room 367', email: 'steven.park@email.com', phone: '(808) 555-0367', enrolled: true, attended: true },
    { id: '20', name: 'Carol Kim', room: 'Room 198', email: 'carol.kim@email.com', phone: '(808) 555-0198', enrolled: true, attended: true },
    { id: '21', name: 'Mark Tanaka', room: 'Room 421', email: 'mark.tanaka@email.com', phone: '(808) 555-0421', enrolled: true, attended: true },
    { id: '22', name: 'Ruth Nakamura', room: 'Room 134', email: 'ruth.nakamura@email.com', phone: '(808) 555-0134', enrolled: true, attended: true },
    { id: '23', name: 'James Watanabe', room: 'Room 278', email: 'james.watanabe@email.com', phone: '(808) 555-0278', enrolled: true, attended: true },
    { id: '24', name: 'Barbara Yamamoto', room: 'Room 156', email: 'barbara.yamamoto@email.com', phone: '(808) 555-0166', enrolled: true, attended: true },

    // Additional residents (not enrolled - 18 residents)
    { id: '25', name: 'David Rodriguez', room: 'Room 145', email: 'david.rodriguez@email.com', phone: '(808) 555-0145', enrolled: false, attended: false },
    { id: '26', name: 'Jennifer Tanaka', room: 'Room 267', email: 'jennifer.tanaka@email.com', phone: '(808) 555-0267', enrolled: false, attended: false },
    { id: '27', name: 'Michael Santos', room: 'Room 334', email: 'michael.santos@email.com', phone: '(808) 555-0334', enrolled: false, attended: false },
    { id: '28', name: 'Elizabeth Kim', room: 'Room 189', email: 'elizabeth.kim@email.com', phone: '(808) 555-0189', enrolled: false, attended: false },
    { id: '29', name: 'Joseph Lee', room: 'Room 423', email: 'joseph.lee@email.com', phone: '(808) 555-0423', enrolled: false, attended: false },
    { id: '30', name: 'Sarah Wong', room: 'Room 256', email: 'sarah.wong@email.com', phone: '(808) 555-0256', enrolled: false, attended: false },
    { id: '31', name: 'Christopher Chen', room: 'Room 378', email: 'christopher.chen@email.com', phone: '(808) 555-0378', enrolled: false, attended: false },
    { id: '32', name: 'Karen Nakamura', room: 'Room 212', email: 'karen.nakamura@email.com', phone: '(808) 555-0212', enrolled: false, attended: false },
    { id: '33', name: 'Matthew Park', room: 'Room 345', email: 'matthew.park@email.com', phone: '(808) 555-0345', enrolled: false, attended: false },
    { id: '34', name: 'Jessica Martinez', room: 'Room 167', email: 'jessica.martinez@email.com', phone: '(808) 555-0167', enrolled: false, attended: false },
    { id: '35', name: 'Andrew Liu', room: 'Room 289', email: 'andrew.liu@email.com', phone: '(808) 555-0289', enrolled: false, attended: false },
    { id: '36', name: 'Michelle Fujimoto', room: 'Room 401', email: 'michelle.fujimoto@email.com', phone: '(808) 555-0401', enrolled: false, attended: false },
    { id: '37', name: 'Daniel Brown', room: 'Room 223', email: 'daniel.brown@email.com', phone: '(808) 555-0223', enrolled: false, attended: false },
    { id: '38', name: 'Lisa Yamamoto', room: 'Room 356', email: 'lisa.yamamoto@email.com', phone: '(808) 555-0356', enrolled: false, attended: false },
    { id: '39', name: 'Kevin Silva', room: 'Room 178', email: 'kevin.silva@email.com', phone: '(808) 555-0178', enrolled: false, attended: false },
    { id: '40', name: 'Amanda Kato', room: 'Room 412', email: 'amanda.kato@email.com', phone: '(808) 555-0412', enrolled: false, attended: false },
    { id: '41', name: 'Ryan Watanabe', room: 'Room 234', email: 'ryan.watanabe@email.com', phone: '(808) 555-0234', enrolled: false, attended: false },
    { id: '42', name: 'Emily Rodriguez', room: 'Room 389', email: 'emily.rodriguez@email.com', phone: '(808) 555-0389', enrolled: false, attended: false },
  ];

  // Initialize with the 24 enrolled residents (IDs 1-24)
  const [selectedResidents, setSelectedResidents] = useState<string[]>(
    allResidents.filter(r => r.enrolled).map(r => r.id)
  );

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
          <h1 className="text-2xl md:text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Manage Attendees
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            {workshopTitle} • November 30, 2025 at 2:00 PM
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
                onClick={() => {
                  const enrolledResidents = allResidents.filter(r => selectedResidents.includes(r.id));
                  const attendedCount = enrolledResidents.filter(r => r.attended).length;
                  toast.success(`Attendance: ${attendedCount}/${enrolledResidents.length} attended`, {
                    description: 'Navigate to Workshop Details to view full attendance records'
                  });
                }}
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-[24px]">All Residents</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-[16px] h-12"
                  onClick={() => setSelectedResidents(allResidents.map(r => r.id))}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-[16px] h-12"
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
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg border-2 transition-all"
                  style={{
                    borderColor: selectedResidents.includes(resident.id) ? '#2D9596' : '#E5E7EB',
                    background: selectedResidents.includes(resident.id) ? '#E6F7F4' : '#FFFFFF'
                  }}
                >
                  <div className="flex items-start gap-3 w-full sm:flex-1">
                    <Checkbox
                      id={`resident-${resident.id}`}
                      checked={selectedResidents.includes(resident.id)}
                      onCheckedChange={() => handleToggleResident(resident.id)}
                      className="w-5 h-5 mt-1"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <p className="text-[18px] font-bold mb-2" style={{ color: '#265073' }}>
                          {resident.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-[12px]">
                            Room {resident.room}
                          </Badge>
                          {resident.attended && (
                            <Badge className="text-[12px] whitespace-nowrap" style={{ background: '#D1FAE5', color: '#065F46' }}>
                              ✓ Attended
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 text-[14px]" style={{ color: '#6B7280' }}>
                        <div className="flex items-center gap-1 break-all">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="break-all">{resident.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          {resident.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedResidents.includes(resident.id) ? (
                    <Button
                      variant="ghost"
                      className="w-full sm:w-auto h-12 text-[16px]"
                      onClick={() => handleToggleResident(resident.id)}
                      style={{ color: '#DC2626' }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-12 text-[16px]"
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
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:flex-1 h-16 text-[18px] font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="w-full sm:flex-1 h-16 text-[16px] sm:text-[18px] font-bold"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Save Changes ({enrolledCount} enrolled)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
