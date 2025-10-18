import { useState } from 'react';
import { ArrowLeft, Calendar, Users, Download, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface WorkshopDetailsProps {
  onBack: () => void;
  onNavigateToManageAttendees?: () => void;
  onNavigateToEdit?: () => void;
}

export function WorkshopDetails({ onBack, onNavigateToManageAttendees, onNavigateToEdit }: WorkshopDetailsProps) {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    newDate: '',
    newTime: '',
    customTime: false,
    customStartTime: '',
    customDuration: '90',
    reason: '',
    otherReason: '',
    message: `Hello,\n\nThe Scam Prevention Workshop has been rescheduled to:\n\nNew Date: [Date will be inserted]\nNew Time: [Time will be inserted]\nLocation: Same location (Community Room)\n\nWe apologize for any inconvenience. We look forward to seeing you at the rescheduled workshop!\n\nIf you can no longer attend, please let us know.\n\nMahalo,\nSunset Senior Living Activities Team`
  });
  const [cancelData, setCancelData] = useState({
    reason: '',
    otherReason: '',
    confirmText: '',
    message: `Dear Residents,\n\nWe're sorry to inform you that the Scam Prevention Workshop scheduled for November 30 at 2:00 PM has been canceled.\n\n[Reason will be inserted if provided]\n\nWe will schedule a similar workshop soon and notify you of the new date. Thank you for your understanding.\n\nIf you have questions, please contact our activities team.\n\nMahalo,\nSunset Senior Living`
  });
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const workshop = {
    title: 'Scam Prevention Workshop',
    date: 'November 30, 2025',
    time: '2:00 PM - 3:30 PM',
    status: 'confirmed',
    instructor: 'Tea Araki',
    location: 'Sunset Senior Living - Community Room',
    attendees: 24,
    capacity: 30
  };

  const attendees = [
    { name: 'Margaret Liu', unit: 'Room 204', status: 'Confirmed' },
    { name: 'Robert Kim', unit: 'Room 312', status: 'Confirmed' },
    { name: 'Helen Martinez', unit: 'Room 108', status: 'Confirmed' },
    { name: 'Dorothy Santos', unit: 'Room 215', status: 'Pending' },
    { name: 'Frank Wong', unit: 'Room 401', status: 'Confirmed' },
    { name: 'Alice Chen', unit: 'Room 118', status: 'Confirmed' },
    { name: 'George Nakamura', unit: 'Room 325', status: 'Confirmed' },
    { name: 'Betty Yamamoto', unit: 'Room 209', status: 'Confirmed' },
    { name: 'Thomas Park', unit: 'Room 418', status: 'Confirmed' },
    { name: 'Patricia Lee', unit: 'Room 209', status: 'Confirmed' },
    { name: 'William Chen', unit: 'Room 305', status: 'Confirmed' },
    { name: 'Mary Johnson', unit: 'Room 401', status: 'Confirmed' },
    { name: 'Richard Silva', unit: 'Room 122', status: 'Confirmed' },
    { name: 'Linda Fujimoto', unit: 'Room 233', status: 'Confirmed' },
    { name: 'Charles Brown', unit: 'Room 156', status: 'Confirmed' },
    { name: 'Susan Lee', unit: 'Room 289', status: 'Confirmed' },
    { name: 'Daniel Kato', unit: 'Room 331', status: 'Pending' },
    { name: 'Nancy Wong', unit: 'Room 412', status: 'Confirmed' },
    { name: 'Steven Park', unit: 'Room 367', status: 'Confirmed' },
    { name: 'Carol Kim', unit: 'Room 198', status: 'Confirmed' },
    { name: 'Mark Tanaka', unit: 'Room 421', status: 'Confirmed' },
    { name: 'Ruth Nakamura', unit: 'Room 134', status: 'Confirmed' },
    { name: 'James Watanabe', unit: 'Room 278', status: 'Confirmed' },
    { name: 'Barbara Yamamoto', unit: 'Room 156', status: 'Confirmed' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Workshops
        </button>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
              {workshop.title}
            </h1>
            <p className="text-[18px]" style={{ color: '#6B7280' }}>
              {workshop.date} • {workshop.time}
            </p>
          </div>
          <Badge style={{ background: '#D1FAE5', color: '#065F46', fontSize: '16px', padding: '8px 16px' }}>
            Confirmed
          </Badge>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview" className="text-[18px] px-6 py-3">Overview</TabsTrigger>
            <TabsTrigger value="attendees" className="text-[18px] px-6 py-3">Attendees</TabsTrigger>
            <TabsTrigger value="materials" className="text-[18px] px-6 py-3">Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Workshop Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Instructor</p>
                    <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>{workshop.instructor}</p>
                  </div>
                  <div>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Location</p>
                    <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>{workshop.location}</p>
                  </div>
                  <div>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Duration</p>
                    <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>90 minutes</p>
                  </div>
                  <div>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Type</p>
                    <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>Free Community Workshop</p>
                  </div>
                </div>

                <div>
                  <p className="text-[14px] mb-2" style={{ color: '#6B7280' }}>Registration</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[16px]">{workshop.attendees}/{workshop.capacity} registered</span>
                    <span className="text-[16px] font-semibold">{Math.round((workshop.attendees / workshop.capacity) * 100)}% Full</span>
                  </div>
                  <Progress value={(workshop.attendees / workshop.capacity) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={onNavigateToEdit}
              >
                Edit Workshop
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowRescheduleModal(true)}
              >
                Reschedule
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Flyer
              </Button>
              <Button 
                variant="destructive"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Workshop
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="attendees">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[24px]">Registered Attendees</CardTitle>
                  <Button 
                    style={{ background: '#2D9596', color: '#FFFFFF' }}
                    onClick={onNavigateToManageAttendees}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Manage Attendees
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendees.map((attendee, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                      <div>
                        <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>{attendee.name}</p>
                        <p className="text-[16px]" style={{ color: '#6B7280' }}>{attendee.unit}</p>
                      </div>
                      <div className="flex gap-3">
                        <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>{attendee.status}</Badge>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle className="text-[24px]">Downloadable Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Workshop Flyer (PDF)',
                  'Promotional Email Template',
                  'Attendee Sign-in Sheet',
                  'Evaluation Form Template'
                ].map((material, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                    <span className="text-[16px]">{material}</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reschedule Modal */}
        <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>
                Reschedule Workshop
              </DialogTitle>
              <DialogDescription className="text-[16px]">
                Current Schedule: {workshop.title} - {workshop.date} at {workshop.time}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
                <p className="text-[14px]" style={{ color: '#92400E' }}>
                  <strong>This workshop has 24 registered residents.</strong><br />
                  All will be notified of any time change.
                </p>
              </div>

              <div>
                <Label htmlFor="newDate" className="text-[18px] mb-2 block">Choose New Date</Label>
                <Input
                  id="newDate"
                  type="date"
                  value={rescheduleData.newDate}
                  onChange={(e) => {
                    setRescheduleData({ ...rescheduleData, newDate: e.target.value });
                    setAvailabilityChecked(false);
                  }}
                  className="h-14 text-[16px]"
                />
              </div>

              <div>
                <Label className="text-[18px] mb-3 block">Choose New Time</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="time-10am"
                      name="time"
                      checked={!rescheduleData.customTime && rescheduleData.newTime === '10am'}
                      onChange={() => {
                        setRescheduleData({ ...rescheduleData, newTime: '10am', customTime: false });
                        setAvailabilityChecked(false);
                      }}
                      className="w-5 h-5"
                    />
                    <Label htmlFor="time-10am" className="text-[16px] cursor-pointer">
                      10:00 AM - 11:30 AM (90 minutes)
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="time-2pm"
                      name="time"
                      checked={!rescheduleData.customTime && rescheduleData.newTime === '2pm'}
                      onChange={() => {
                        setRescheduleData({ ...rescheduleData, newTime: '2pm', customTime: false });
                        setAvailabilityChecked(false);
                      }}
                      className="w-5 h-5"
                    />
                    <Label htmlFor="time-2pm" className="text-[16px] cursor-pointer">
                      2:00 PM - 3:30 PM (90 minutes)
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      id="time-custom"
                      name="time"
                      checked={rescheduleData.customTime}
                      onChange={() => {
                        setRescheduleData({ ...rescheduleData, customTime: true });
                        setAvailabilityChecked(false);
                      }}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="time-custom" className="text-[16px] cursor-pointer">Custom time:</Label>
                      {rescheduleData.customTime && (
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            type="time"
                            value={rescheduleData.customStartTime}
                            onChange={(e) => setRescheduleData({ ...rescheduleData, customStartTime: e.target.value })}
                            className="h-12 text-[16px]"
                          />
                          <Select 
                            value={rescheduleData.customDuration} 
                            onValueChange={(value) => setRescheduleData({ ...rescheduleData, customDuration: value })}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="60">60 min</SelectItem>
                              <SelectItem value="90">90 min</SelectItem>
                              <SelectItem value="120">120 min</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-[16px]">Instructor Availability:</Label>
                  {!availabilityChecked ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setAvailabilityChecked(true);
                        toast.success('✓ Tea Araki is available');
                      }}
                      disabled={!rescheduleData.newDate || (!rescheduleData.newTime && !rescheduleData.customTime)}
                    >
                      Check Availability
                    </Button>
                  ) : (
                    <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>
                      ✓ Tea Araki is available
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-[18px] mb-3 block">Reason for Reschedule (Optional but helpful)</Label>
                <div className="space-y-2">
                  {['instructor', 'facility', 'holiday', 'feedback', 'other'].map((reason) => (
                    <div key={reason} className="flex items-center gap-3">
                      <Checkbox
                        id={`reason-${reason}`}
                        checked={rescheduleData.reason === reason}
                        onCheckedChange={(checked) => {
                          if (checked) setRescheduleData({ ...rescheduleData, reason });
                        }}
                      />
                      <Label htmlFor={`reason-${reason}`} className="text-[14px] cursor-pointer">
                        {reason === 'instructor' && 'Instructor unavailable on original date'}
                        {reason === 'facility' && 'Facility conflict'}
                        {reason === 'holiday' && 'Holiday/Special event conflict'}
                        {reason === 'feedback' && 'Resident feedback/request'}
                        {reason === 'other' && 'Other'}
                      </Label>
                    </div>
                  ))}
                  {rescheduleData.reason === 'other' && (
                    <Input
                      placeholder="Please specify..."
                      value={rescheduleData.otherReason}
                      onChange={(e) => setRescheduleData({ ...rescheduleData, otherReason: e.target.value })}
                      className="h-12 text-[16px] ml-7"
                    />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="rescheduleMessage" className="text-[18px] mb-2 block">
                  Notification to Residents
                </Label>
                <Textarea
                  id="rescheduleMessage"
                  value={rescheduleData.message}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, message: e.target.value })}
                  className="min-h-[150px] text-[14px]"
                />
                <p className="text-[13px] mt-2" style={{ color: '#6B7280' }}>
                  All 24 registered residents will receive this message
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 h-14 text-[18px]"
                >
                  Keep Original Time
                </Button>
                <Button
                  onClick={() => {
                    if (!availabilityChecked) {
                      toast.error('Please check instructor availability first');
                      return;
                    }
                    toast.success('✓ Workshop rescheduled! All residents notified.');
                    setShowRescheduleModal(false);
                  }}
                  disabled={!rescheduleData.newDate || (!rescheduleData.newTime && !rescheduleData.customTime) || !availabilityChecked}
                  className="flex-1 h-14 text-[18px]"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  Confirm Reschedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cancel Modal */}
        <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8" style={{ color: '#DC2626' }} />
                <DialogTitle className="text-[28px]" style={{ color: '#DC2626' }}>
                  Cancel This Workshop?
                </DialogTitle>
              </div>
              <DialogDescription className="text-[16px]">
                {workshop.title} - {workshop.date} at {workshop.time}<br />
                Instructor: {workshop.instructor}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="p-4 rounded-lg" style={{ background: '#FEE2E2', border: '2px solid #DC2626' }}>
                <p className="text-[16px] font-bold mb-2" style={{ color: '#991B1B' }}>
                  This will affect 24 registered residents.
                </p>
                <div className="space-y-2 text-[14px]" style={{ color: '#7F1D1D' }}>
                  <p className="flex items-start gap-2">
                    <span className="text-[#DC2626]">❌</span>
                    All 24 residents will be notified immediately
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#DC2626]">❌</span>
                    Workshop removed from your schedule
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#DC2626]">❌</span>
                    Tea Araki's time slot will be released
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#DC2626]">❌</span>
                    <strong>This action CANNOT be undone</strong>
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(220, 38, 38, 0.3)' }}>
                  <p className="flex items-start gap-2 text-[14px]" style={{ color: '#065F46' }}>
                    <span>✓</span>
                    Residents can register for future sessions
                  </p>
                  <p className="flex items-start gap-2 text-[14px]" style={{ color: '#065F46' }}>
                    <span>✓</span>
                    No impact on partnership agreement
                  </p>
                  <p className="flex items-start gap-2 text-[14px]" style={{ color: '#065F46' }}>
                    <span>✓</span>
                    No cancellation fees
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-[18px] mb-3 block">
                  Reason for Cancellation <span style={{ color: '#DC2626' }}>*</span>
                </Label>
                <div className="space-y-2">
                  {['instructor-unavailable', 'facility-unavailable', 'holiday', 'reschedule', 'no-longer-needed', 'other'].map((reason) => (
                    <div key={reason} className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={`cancel-reason-${reason}`}
                        name="cancel-reason"
                        checked={cancelData.reason === reason}
                        onChange={() => setCancelData({ ...cancelData, reason })}
                        className="w-5 h-5"
                      />
                      <Label htmlFor={`cancel-reason-${reason}`} className="text-[14px] cursor-pointer">
                        {reason === 'instructor-unavailable' && 'Instructor unavailable'}
                        {reason === 'facility-unavailable' && 'Facility not available'}
                        {reason === 'holiday' && 'Holiday/Event conflict'}
                        {reason === 'reschedule' && 'Rescheduling to different date'}
                        {reason === 'no-longer-needed' && 'Workshop no longer needed'}
                        {reason === 'other' && 'Other'}
                      </Label>
                    </div>
                  ))}
                  {cancelData.reason === 'other' && (
                    <Input
                      placeholder="Please specify..."
                      value={cancelData.otherReason}
                      onChange={(e) => setCancelData({ ...cancelData, otherReason: e.target.value })}
                      className="h-12 text-[16px] ml-7"
                    />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="cancelMessage" className="text-[18px] mb-2 block">
                  Notification to Residents
                </Label>
                <Textarea
                  id="cancelMessage"
                  value={cancelData.message}
                  onChange={(e) => setCancelData({ ...cancelData, message: e.target.value })}
                  className="min-h-[150px] text-[14px]"
                />
              </div>

              <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
                <Label htmlFor="confirmText" className="text-[16px] mb-2 block font-bold" style={{ color: '#92400E' }}>
                  Type "CANCEL WORKSHOP" to confirm:
                </Label>
                <Input
                  id="confirmText"
                  value={cancelData.confirmText}
                  onChange={(e) => setCancelData({ ...cancelData, confirmText: e.target.value })}
                  placeholder="CANCEL WORKSHOP"
                  className="h-14 text-[18px]"
                  style={{ 
                    borderColor: cancelData.confirmText === 'CANCEL WORKSHOP' ? '#16A34A' : '#F59E0B',
                    background: '#FFFFFF'
                  }}
                />
                <p className="text-[13px] mt-2" style={{ color: '#92400E' }}>
                  This text must be typed exactly to enable cancellation
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 h-14 text-[18px]"
                >
                  Keep Workshop
                </Button>
                <Button
                  onClick={() => {
                    if (!cancelData.reason) {
                      toast.error('Please select a cancellation reason');
                      return;
                    }
                    toast.success('✓ Workshop canceled. All residents notified.');
                    setShowCancelModal(false);
                    setTimeout(() => onBack(), 2000);
                  }}
                  disabled={cancelData.confirmText !== 'CANCEL WORKSHOP' || !cancelData.reason}
                  className="flex-1 h-14 text-[18px]"
                  style={{ 
                    background: cancelData.confirmText === 'CANCEL WORKSHOP' ? '#DC2626' : '#9CA3AF',
                    color: '#FFFFFF',
                    cursor: cancelData.confirmText === 'CANCEL WORKSHOP' ? 'pointer' : 'not-allowed'
                  }}
                >
                  Cancel Workshop
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
