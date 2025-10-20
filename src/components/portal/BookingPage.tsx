import { useState } from 'react';
import { Calendar, Home, Video, Users, ArrowRight, Check, Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Badge } from '../ui/badge';

interface BookingPageProps {
  onBack: () => void;
  onBookingSuccess: (bookingData: any) => void;
}

type ServiceType = 'in-home' | 'virtual' | 'group' | null;

export function BookingPage({ onBack, onBookingSuccess }: BookingPageProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('9:00 AM');
  const [bookingTopics, setBookingTopics] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // User has Standard Care plan - assume they have 1 in-home OR 3 virtual sessions in plan
  const hasActivePlan = true; // User has subscription
  const subscriberDiscount = 0.15; // 15% discount for add-ons

  const handleBookService = (service: ServiceType) => {
    setSelectedService(service);
    setShowConfirmation(true);
  };

  const services = [
    {
      id: 'in-home' as ServiceType,
      icon: Home,
      title: 'In-Home 1:1 Session',
      duration: '90 minutes in your home',
      price: 85,
      priceDisplay: '$85',
      discountedPrice: 72.25,
      discountedPriceDisplay: '$72.25',
      description: 'Perfect for: Setup, detailed learning, hands-on help',
      color: '#DBEAFE',
      includedInPlan: true // First in-home is included in Standard Care
    },
    {
      id: 'virtual' as ServiceType,
      icon: Video,
      title: 'Virtual Session',
      duration: '60 minutes video call',
      price: 35,
      priceDisplay: '$35',
      discountedPrice: 29.75,
      discountedPriceDisplay: '$29.75',
      description: 'Perfect for: Quick questions, check-ins, follow-ups',
      color: '#E0E7FF',
      includedInPlan: true // Up to 3 virtual included in Standard Care
    },
    {
      id: 'group' as ServiceType,
      icon: Users,
      title: 'Small Group',
      duration: '90 minutes with 2-3 people',
      price: 120,
      priceDisplay: '$120',
      discountedPrice: 102,
      discountedPriceDisplay: '$102',
      description: 'Perfect for: Learning with friends, couples',
      color: '#F3E8FF',
      includedInPlan: false // Small group is always an add-on
    }
  ];

  const handleConfirmBooking = () => {
    const service = services.find(s => s.id === selectedService);
    const bookingData = {
      type: service?.title || '',
      date: new Date(bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: bookingTime,
      topics: bookingTopics,
      technician: selectedTechnician || 'No preference',
      price: service?.includedInPlan ? 'Included in Plan' : service?.discountedPriceDisplay,
      originalPrice: service?.priceDisplay,
      isAddon: !service?.includedInPlan,
      confirmationNumber: 'BOOK-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    setConfirmedBooking(bookingData);
    setShowConfirmation(false);
    setShowSuccess(true);
    onBookingSuccess(bookingData);
  };

  const printConfirmation = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-[18px] hover:underline active:scale-95 transition-transform"
          style={{ color: '#2D9596' }}
        >
          ← Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-[40px] font-bold mb-4" style={{ color: '#265073' }}>
            Book Your Session
          </h1>
          <p className="text-[22px]" style={{ color: '#4B5563' }}>
            Choose the type of help you need
          </p>
          {hasActivePlan && (
            <div className="mt-4 inline-block px-6 py-3 rounded-lg" style={{ background: '#D1FAE5' }}>
              <p className="text-[16px] font-bold" style={{ color: '#065F46' }}>
                ✓ You have an active Standard Care plan
              </p>
            </div>
          )}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service) => {
            const Icon = service.icon;
            const isIncluded = hasActivePlan && service.includedInPlan;
            const isAddOn = hasActivePlan && !service.includedInPlan;

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-8 border-2 hover:shadow-lg transition-all cursor-pointer relative"
                style={{ borderColor: '#D1D5DB' }}
              >
                {isIncluded && (
                  <Badge
                    className="absolute top-4 right-4"
                    style={{ background: '#D1FAE5', color: '#065F46', fontSize: '14px', padding: '6px 12px' }}
                  >
                    Included in Plan
                  </Badge>
                )}

                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ background: service.color }}>
                  <Icon className="w-8 h-8" style={{ color: '#2D9596' }} />
                </div>
                <h3 className="text-[24px] font-bold mb-3 text-center" style={{ color: '#265073' }}>
                  {service.title}
                </h3>
                <p className="text-[16px] text-center mb-4" style={{ color: '#4B5563' }}>
                  {service.duration}
                </p>

                {/* Pricing */}
                <div className="text-center mb-4">
                  {isIncluded ? (
                    <p className="text-[24px] font-bold" style={{ color: '#16A34A' }}>
                      Included
                    </p>
                  ) : isAddOn ? (
                    <div>
                      <p className="text-[18px] line-through mb-1" style={{ color: '#9CA3AF' }}>
                        {service.priceDisplay}
                      </p>
                      <p className="text-[28px] font-bold" style={{ color: '#2D9596' }}>
                        {service.discountedPriceDisplay}
                      </p>
                      <p className="text-[14px]" style={{ color: '#16A34A' }}>
                        Save 15% as subscriber
                      </p>
                    </div>
                  ) : (
                    <p className="text-[28px] font-bold" style={{ color: '#2D9596' }}>
                      {service.priceDisplay}
                    </p>
                  )}
                </div>

                <p className="text-[14px] text-center mb-6" style={{ color: '#4B5563' }}>
                  {service.description}
                </p>
                <Button
                  onClick={() => handleBookService(service.id)}
                  className="w-full h-14 text-[18px] font-bold active:scale-95 transition-transform"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  Select & Book
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center p-6 rounded-lg" style={{ background: '#F0FDFA' }}>
          <p className="text-[16px] mb-2" style={{ color: '#265073' }}>
            <strong>Need help choosing?</strong>
          </p>
          <p className="text-[16px]" style={{ color: '#4B5563' }}>
            Call us at{' '}
            <a href="tel:8085551234" className="font-bold" style={{ color: '#2D9596' }}>
              (808) 555-1234
            </a>
            {' '}and we'll help you pick the perfect option!
          </p>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>
                Book Your {services.find(s => s.id === selectedService)?.title}
              </DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Choose your preferred date and time
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="mb-6 p-4 rounded-lg" style={{ background: '#F0FDFA' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: '#10B981' }} />
                    <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                      Selected: {services.find(s => s.id === selectedService)?.title}
                    </p>
                  </div>
                  {services.find(s => s.id === selectedService)?.includedInPlan && hasActivePlan ? (
                    <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>
                      Included in Plan
                    </Badge>
                  ) : (
                    <Badge style={{ background: '#FEF3C7', color: '#92400E' }}>
                      Add-on (15% off)
                    </Badge>
                  )}
                </div>
                <p className="text-[16px]" style={{ color: '#4B5563' }}>
                  {services.find(s => s.id === selectedService)?.duration}
                </p>
                {services.find(s => s.id === selectedService)?.includedInPlan && hasActivePlan ? (
                  <p className="text-[18px] font-bold mt-2" style={{ color: '#16A34A' }}>
                    No charge - Included in your plan
                  </p>
                ) : (
                  <div className="mt-2">
                    <p className="text-[14px] line-through" style={{ color: '#9CA3AF' }}>
                      Original: {services.find(s => s.id === selectedService)?.priceDisplay}
                    </p>
                    <p className="text-[18px] font-bold" style={{ color: '#2D9596' }}>
                      Your price: {services.find(s => s.id === selectedService)?.discountedPriceDisplay}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[18px] font-bold block mb-2" style={{ color: '#265073' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full h-14 px-4 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#E5E7EB' }}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="text-[18px] font-bold block mb-2" style={{ color: '#265073' }}>
                    Preferred Time
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full h-14 px-4 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#E5E7EB' }}
                  >
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="text-[18px] font-bold block mb-2" style={{ color: '#265073' }}>
                    What do you need help with? (Optional)
                  </label>
                  <textarea
                    value={bookingTopics}
                    onChange={(e) => setBookingTopics(e.target.value)}
                    className="w-full h-24 px-4 py-3 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#E5E7EB' }}
                    placeholder="e.g., Setting up email, Learning to video call, etc."
                  />
                </div>

                <div>
                  <label className="text-[18px] font-bold block mb-2" style={{ color: '#265073' }}>
                    Request a Technician (Optional)
                  </label>
                  <select
                    value={selectedTechnician}
                    onChange={(e) => setSelectedTechnician(e.target.value)}
                    className="w-full h-14 px-4 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#E5E7EB' }}
                  >
                    <option value="">No preference</option>
                    <option value="DJ Sable">DJ Sable</option>
                    <option value="Tea Araki">Tea Araki</option>
                    <option value="Lindsay Trenton">Lindsay Trenton</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-lg mb-4" style={{ background: '#FEF3C7' }}>
                <p className="text-[14px]" style={{ color: '#92400E' }}>
                  <strong>Note:</strong> Our team will call you within 24 hours to confirm your appointment time.
                </p>
              </div>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowConfirmation(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmBooking}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform flex items-center gap-2"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
                disabled={!bookingDate}
              >
                Confirm Booking
                <ArrowRight className="w-5 h-5" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Confirmation Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px] text-center" style={{ color: '#16A34A' }}>
                ✓ Booking Confirmed!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="text-center">
                <p className="text-[18px] mb-4" style={{ color: '#265073' }}>
                  Your session has been successfully booked.
                </p>
              </div>

              <div className="p-6 rounded-lg border-2" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>Booking Summary</h3>
                <div className="space-y-2 text-[16px]">
                  <p><strong>Session Type:</strong> {confirmedBooking?.type}</p>
                  <p><strong>Date:</strong> {confirmedBooking?.date}</p>
                  <p><strong>Time:</strong> {confirmedBooking?.time}</p>
                  {confirmedBooking?.topics && (
                    <p><strong>Topics:</strong> {confirmedBooking?.topics}</p>
                  )}
                  <p><strong>Technician:</strong> {confirmedBooking?.technician}</p>
                  {confirmedBooking?.isAddon ? (
                    <>
                      <p><strong>Original Price:</strong> <span className="line-through">{confirmedBooking?.originalPrice}</span></p>
                      <p><strong>Your Price:</strong> <span style={{ color: '#16A34A', fontWeight: 'bold' }}>{confirmedBooking?.price}</span> (15% subscriber discount)</p>
                    </>
                  ) : (
                    <p><strong>Price:</strong> <span style={{ color: '#16A34A', fontWeight: 'bold' }}>{confirmedBooking?.price}</span></p>
                  )}
                  <p><strong>Confirmation #:</strong> {confirmedBooking?.confirmationNumber}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: '#E6F7F4', border: '1px solid #2D9596' }}>
                <h4 className="font-bold mb-2" style={{ color: '#265073' }}>What Happens Next:</h4>
                <ul className="space-y-1 text-[14px]">
                  <li>✓ Confirmation email sent to your inbox</li>
                  <li>✓ Our team will call you within 24 hours to confirm</li>
                  <li>✓ You'll receive a reminder 24 hours before your session</li>
                  <li>✓ You can reschedule or cancel anytime from your dashboard</li>
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
                    setShowSuccess(false);
                    onBack();
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
