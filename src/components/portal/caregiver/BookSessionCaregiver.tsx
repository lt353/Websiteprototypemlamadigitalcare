import { useState } from 'react';
import { ArrowLeft, Calendar, DollarSign, CheckCircle2, Printer } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';

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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // User has Standard Care plan with 15% discount on add-ons
  const hasActivePlan = true;
  const subscriberDiscount = 0.15;

  const seniors = [
    { id: '1', name: 'Mary Johnson', relationship: 'Mother' },
    { id: '2', name: 'Robert Johnson', relationship: 'Father' }
  ];

  const sessionTypes = [
    {
      id: 'in-home',
      name: 'In-Home Session',
      price: 85,
      priceDisplay: '$85',
      discountedPrice: 72.25,
      discountedPriceDisplay: '$72.25',
      duration: '90 min',
      includedInPlan: true // Included in Standard Care
    },
    {
      id: 'virtual',
      name: 'Virtual Session',
      price: 35,
      priceDisplay: '$35',
      discountedPrice: 29.75,
      discountedPriceDisplay: '$29.75',
      duration: '60 min',
      includedInPlan: true // Up to 3 virtual included in Standard Care
    },
    {
      id: 'group',
      name: 'Small Group',
      price: 120,
      priceDisplay: '$120',
      discountedPrice: 102,
      discountedPriceDisplay: '$102',
      duration: '90 min',
      note: 'For 2 people',
      includedInPlan: false // Always an add-on
    }
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
    const confirmNum = 'BOOK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setConfirmationNumber(confirmNum);
    setShowSuccessDialog(true);
  };

  const printConfirmation = () => {
    window.print();
  };

  const getSelectedSessionType = () => sessionTypes.find(t => t.id === sessionType);
  const getSelectedSenior = () => seniors.find(s => s.id === selectedSenior);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
          {hasActivePlan && (
            <div className="mt-4 inline-block px-6 py-3 rounded-lg" style={{ background: '#D1FAE5' }}>
              <p className="text-[16px] font-bold" style={{ color: '#065F46' }}>
                ✓ Standard Care plan active - 15% discount on add-ons
              </p>
            </div>
          )}
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
              {sessionTypes.map((type) => {
                const isIncluded = hasActivePlan && type.includedInPlan;
                const isAddOn = hasActivePlan && !type.includedInPlan;

                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all relative ${sessionType === type.id ? 'border-2' : ''}`}
                    style={{ borderColor: sessionType === type.id ? '#2D9596' : '#E5E7EB' }}
                    onClick={() => setSessionType(type.id)}
                  >
                    {isIncluded && (
                      <Badge
                        className="absolute top-4 right-4"
                        style={{ background: '#D1FAE5', color: '#065F46' }}
                      >
                        Included in Plan
                      </Badge>
                    )}
                    {isAddOn && (
                      <Badge
                        className="absolute top-4 right-4"
                        style={{ background: '#FEF3C7', color: '#92400E' }}
                      >
                        Add-on (15% off)
                      </Badge>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-[20px] font-bold mb-1" style={{ color: '#265073' }}>{type.name}</p>
                          <p className="text-[16px]" style={{ color: '#6B7280' }}>{type.duration}</p>
                          {type.note && <p className="text-[14px]" style={{ color: '#6B7280' }}>{type.note}</p>}
                        </div>
                        <div className="text-right">
                          {isIncluded ? (
                            <p className="text-[24px] font-bold" style={{ color: '#16A34A' }}>Included</p>
                          ) : isAddOn ? (
                            <div>
                              <p className="text-[16px] line-through" style={{ color: '#9CA3AF' }}>{type.priceDisplay}</p>
                              <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>{type.discountedPriceDisplay}</p>
                              <p className="text-[12px]" style={{ color: '#16A34A' }}>Save 15%</p>
                            </div>
                          ) : (
                            <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>{type.priceDisplay}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
                  min={new Date().toISOString().split('T')[0]}
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
                    {getSelectedSenior()?.name}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Session Type</p>
                      <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                        {getSelectedSessionType()?.name}
                      </p>
                    </div>
                    {getSelectedSessionType()?.includedInPlan ? (
                      <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>
                        Included in Plan
                      </Badge>
                    ) : (
                      <Badge style={{ background: '#FEF3C7', color: '#92400E' }}>
                        Add-on (15% off)
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Date & Time</p>
                  <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                    {formatDate(selectedDate)} • {selectedTime}
                  </p>
                </div>
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Topics</p>
                  <p className="text-[16px]" style={{ color: '#265073' }}>
                    {topics.length > 0 ? topics.join(', ') : 'To be discussed'}
                  </p>
                </div>
                {requestedTechnician && (
                  <div>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Requested Technician</p>
                    <p className="text-[16px]" style={{ color: '#265073' }}>{requestedTechnician}</p>
                  </div>
                )}
                <div>
                  <p className="text-[14px]" style={{ color: '#6B7280' }}>Price</p>
                  {getSelectedSessionType()?.includedInPlan ? (
                    <p className="text-[24px] font-bold" style={{ color: '#16A34A' }}>Included in Plan</p>
                  ) : (
                    <div>
                      <p className="text-[16px] line-through" style={{ color: '#9CA3AF' }}>
                        Original: {getSelectedSessionType()?.priceDisplay}
                      </p>
                      <p className="text-[24px] font-bold" style={{ color: '#2D9596' }}>
                        Your price: {getSelectedSessionType()?.discountedPriceDisplay}
                      </p>
                      <p className="text-[14px]" style={{ color: '#16A34A' }}>15% subscriber discount applied</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <label className="text-[16px]">Send confirmation to {getSelectedSenior()?.name}</label>
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

        {/* Success Confirmation Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px] text-center" style={{ color: '#16A34A' }}>
                ✓ Booking Confirmed!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="text-center">
                <p className="text-[18px] mb-4" style={{ color: '#265073' }}>
                  Session successfully booked for {getSelectedSenior()?.name}
                </p>
              </div>

              <div className="p-6 rounded-lg border-2" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>Booking Summary</h3>
                <div className="space-y-2 text-[16px]">
                  <p><strong>For:</strong> {getSelectedSenior()?.name}</p>
                  <p><strong>Session Type:</strong> {getSelectedSessionType()?.name}</p>
                  <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  {topics.length > 0 && (
                    <p><strong>Topics:</strong> {topics.join(', ')}</p>
                  )}
                  {requestedTechnician && (
                    <p><strong>Technician:</strong> {requestedTechnician}</p>
                  )}
                  {getSelectedSessionType()?.includedInPlan ? (
                    <p><strong>Price:</strong> <span style={{ color: '#16A34A', fontWeight: 'bold' }}>Included in Plan</span></p>
                  ) : (
                    <>
                      <p><strong>Original Price:</strong> <span className="line-through">{getSelectedSessionType()?.priceDisplay}</span></p>
                      <p><strong>Your Price:</strong> <span style={{ color: '#16A34A', fontWeight: 'bold' }}>{getSelectedSessionType()?.discountedPriceDisplay}</span> (15% subscriber discount)</p>
                    </>
                  )}
                  <p><strong>Confirmation #:</strong> {confirmationNumber}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: '#E6F7F4', border: '1px solid #2D9596' }}>
                <h4 className="font-bold mb-2" style={{ color: '#265073' }}>What Happens Next:</h4>
                <ul className="space-y-1 text-[14px]">
                  <li>✓ Confirmation emails sent to you and {getSelectedSenior()?.name}</li>
                  <li>✓ Our team will call {getSelectedSenior()?.name} within 24 hours to confirm</li>
                  <li>✓ You'll both receive reminders 24 hours before the session</li>
                  <li>✓ You can reschedule or cancel anytime from the dashboard</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={printConfirmation}
                  variant="outline"
                  className="flex-1"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Confirmation
                </Button>
                <Button
                  onClick={() => {
                    setShowSuccessDialog(false);
                    onSuccess();
                  }}
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
