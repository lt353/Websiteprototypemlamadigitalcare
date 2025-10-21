import { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';

interface RescheduleSessionProps {
  seniorName: string;
  currentDate: string;
  currentTime: string;
  instructor: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function RescheduleSession({ 
  seniorName, 
  currentDate, 
  currentTime, 
  instructor,
  onBack, 
  onSuccess 
}: RescheduleSessionProps) {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [requestedTechnician, setRequestedTechnician] = useState('');

  const availableSlots = [
    { date: 'Dec 3, 2025', time: '2:00 PM', available: true },
    { date: 'Dec 5, 2025', time: '10:00 AM', available: true },
    { date: 'Dec 5, 2025', time: '2:00 PM', available: true },
    { date: 'Dec 8, 2025', time: '10:00 AM', available: true },
    { date: 'Dec 8, 2025', time: '2:00 PM', available: true },
  ];

  const handleSubmit = () => {
    onSuccess();
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-2xl md:text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Reschedule {seniorName}&apos;s Session
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Current appointment: {currentDate} at {currentTime} with {instructor}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Why do you need to reschedule?</CardTitle>
              <p className="text-[16px]" style={{ color: '#6B7280' }}>Optional</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'Conflict with another appointment',
                `${seniorName} isn't feeling well`,
                'Transportation issue',
                'Need more time to prepare',
                'Other reason'
              ].map((option) => (
                <div key={option} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="reason"
                    value={option}
                    checked={reason === option}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-5 h-5"
                  />
                  <label className="text-[16px]">{option}</label>
                </div>
              ))}

              <div className="space-y-2 pt-4">
                <Label>Tell us more (optional)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px] text-[16px]"
                  placeholder="Any additional details..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Choose a new date and time</CardTitle>
              <p className="text-[16px]" style={{ color: '#6B7280' }}>
                Available time slots with {instructor}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableSlots.map((slot) => (
                  <button
                    key={`${slot.date}-${slot.time}`}
                    onClick={() => {
                      setSelectedDate(slot.date);
                      setSelectedTime(slot.time);
                    }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedDate === slot.date && selectedTime === slot.time
                        ? 'border-[#2D9596] bg-[#E6F7F4]'
                        : 'border-[#E5E7EB] hover:border-[#9AD0C2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>
                          {slot.date}
                        </p>
                        <p className="text-[16px]" style={{ color: '#6B7280' }}>
                          {slot.time}
                        </p>
                      </div>
                      {selectedDate === slot.date && selectedTime === slot.time && (
                        <CheckCircle2 className="w-6 h-6" style={{ color: '#2D9596' }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Request a Technician (Optional)</CardTitle>
              <p className="text-[16px]" style={{ color: '#6B7280' }}>
                Would you like to request a specific technician?
              </p>
            </CardHeader>
            <CardContent>
              <select
                value={requestedTechnician}
                onChange={(e) => setRequestedTechnician(e.target.value)}
                className="w-full h-14 px-4 rounded-lg border-2 text-[18px]"
                style={{ borderColor: '#E5E7EB' }}
              >
                <option value="">No preference</option>
                <option value="DJ Sable">DJ Sable</option>
                <option value="Tea Araki">Tea Araki</option>
                <option value="Lindsay Trenton">Lindsay Trenton</option>
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Current Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>Topic</p>
                <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                  Two-Factor Authentication, Calendar App
                </p>
              </div>
              <div>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>Type</p>
                <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                  In-home visit (90 minutes)
                </p>
              </div>
              <div>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>Location</p>
                <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                  {seniorName}&apos;s home - 123 Aloha St, Honolulu, HI
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 h-14 text-[18px]"
            >
              Never Mind
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 h-14 text-[18px]"
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
