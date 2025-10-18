import { useState } from 'react';
import { ArrowLeft, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface BookSessionCaregiverProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function BookSessionCaregiver({ onBack, onSuccess }: BookSessionCaregiverProps) {
  const [step, setStep] = useState(1);
  const [selectedSenior, setSelectedSenior] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [requestedTechnician, setRequestedTechnician] = useState('');

  const seniors = [
    { id: '1', name: 'Mary Johnson', relationship: 'Mother' },
    { id: '2', name: 'Robert Johnson', relationship: 'Father' }
  ];

  const sessionTypes = [
    { id: 'in-home', name: 'In-Home Session', price: '$85', duration: '90 min' },
    { id: 'virtual', name: 'Virtual Session', price: '$35', duration: '60 min' },
    { id: 'group', name: 'Small Group', price: '$120', duration: '90 min', note: 'For 2 people' }
  ];

  const topicOptions = [
    'Password management',
    'Scam identification',
    'Device organization',
    'Email help',
    'Video calling',
    'Photos and files',
    'Health apps',
    'Online banking'
  ];

  const handleTopicToggle = (topic: string) => {
    setTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    );
  };

  const handleSubmit = () => {
    onSuccess();
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Book a Session
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Schedule technology support for your loved one
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${s <= step ? 'text-white' : 'text-gray-400'}`}
                style={{ background: s <= step ? '#2D9596' : '#E5E7EB' }}
              >
                {s}
              </div>
              {s < 5 && <div className="h-1 flex-1 mx-2" style={{ background: s < step ? '#2D9596' : '#E5E7EB' }}></div>}
            </div>
          ))}
        </div>

        {/* STEP 1: Select Senior */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>Who needs help?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {seniors.map((senior) => (
                <Card 
                  key={senior.id}
                  className={`cursor-pointer transition-all ${selectedSenior === senior.id ? 'border-2' : ''}`}
                  style={{ borderColor: selectedSenior === senior.id ? '#2D9596' : '#E5E7EB' }}
                  onClick={() => setSelectedSenior(senior.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center text-[24px]" style={{ background: '#E6F7F4' }}>
                        👤
                      </div>
                      <div>
                        <p className="text-[20px] font-bold" style={{ color: '#265073' }}>{senior.name}</p>
                        <p className="text-[16px]" style={{ color: '#6B7280' }}>{senior.relationship}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button 
              onClick={() => setStep(2)}
              disabled={!selectedSenior}
              className="w-full h-14 text-[18px]"
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              Continue
            </Button>
          </div>
        )}

        {/* STEP 2: Session Type */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>Choose Session Type</h2>
            <div className="space-y-4">
              {sessionTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all ${sessionType === type.id ? 'border-2' : ''}`}
                  style={{ borderColor: sessionType === type.id ? '#2D9596' : '#E5E7EB' }}
                  onClick={() => setSessionType(type.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[20px] font-bold mb-1" style={{ color: '#265073' }}>{type.name}</p>
                        <p className="text-[16px]" style={{ color: '#6B7280' }}>{type.duration}</p>
                        {type.note && <p className="text-[14px]" style={{ color: '#6B7280' }}>{type.note}</p>}
                      </div>
                      <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>{type.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-14 text-[18px]">Back</Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!sessionType}
                className="flex-1 h-14 text-[18px]"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Topics */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>What do they need help with?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {topicOptions.map((topic) => (
                <div 
                  key={topic}
                  className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer"
                  style={{ borderColor: topics.includes(topic) ? '#2D9596' : '#E5E7EB' }}
                  onClick={() => handleTopicToggle(topic)}
                >
                  <input 
                    type="checkbox" 
                    checked={topics.includes(topic)}
                    onChange={() => {}}
                    className="w-5 h-5"
                  />
                  <span className="text-[16px]">{topic}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[16px] font-semibold mb-2" style={{ color: '#265073' }}>
                Tell us more (optional)
              </label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 border-2 rounded-lg text-[16px]"
                style={{ borderColor: '#E5E7EB', minHeight: '120px' }}
                placeholder="Any specific details about what they need help with..."
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1 h-14 text-[18px]">Back</Button>
              <Button 
                onClick={() => setStep(4)}
                className="flex-1 h-14 text-[18px]"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Date & Time */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>When works best?</h2>
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 border-2 rounded-lg text-[16px]"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Preferred Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {['Morning (9am-12pm)', 'Afternoon (12pm-4pm)', 'Evening (4pm-7pm)'].map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      onClick={() => setSelectedTime(time)}
                      className={selectedTime === time ? 'border-2' : ''}
                      style={{ borderColor: selectedTime === time ? '#2D9596' : undefined }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Request a Technician (Optional)</CardTitle>
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
            <div className="flex gap-4">
              <Button onClick={() => setStep(3)} variant="outline" className="flex-1 h-14 text-[18px]">Back</Button>
              <Button 
                onClick={() => setStep(5)}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 h-14 text-[18px]"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Confirmation */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>Review & Confirm</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>For</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                    {seniors.find(s => s.id === selectedSenior)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Session Type</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                    {sessionTypes.find(t => t.id === sessionType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Date & Time</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                    {selectedDate} • {selectedTime}
                  </p>
                </div>
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Topics</p>
                  <p className="text-[16px]" style={{ color: '#265073' }}>
                    {topics.join(', ') || 'To be discussed'}
                  </p>
                </div>
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Price</p>
                  <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>
                    {sessionTypes.find(t => t.id === sessionType)?.price}
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <label className="text-[16px]">Send confirmation to {seniors.find(s => s.id === selectedSenior)?.name}</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <label className="text-[16px]">Add to my calendar</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <label className="text-[16px]">Send me reminder</label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setStep(4)} variant="outline" className="flex-1 h-14 text-[18px]">Back</Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 h-14 text-[18px]"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
