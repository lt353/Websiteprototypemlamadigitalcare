import { useState } from 'react';
import { Calendar, Home, Video, Users, ArrowRight, Check, CheckCircle2, AlertCircle, CreditCard, TrendingUp, Info, Percent, Gift, Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface BookingPageProps {
  onBack: () => void;
  onBookingSuccess: (bookingData: any) => void;
}

type ServiceType = 'in-home' | 'virtual' | 'group' | null;
type PlanTrack = 'in-home' | 'virtual' | null;

// Standard Care Plan data
const standardCarePlan = {
  planName: 'Standard Care Plan',
  monthlyPrice: '$79/month',
  renewalDate: 'November 15, 2025',
  addOnDiscount: 15, // 15% member discount on all add-ons
  firstAssessmentDiscount: 20, // 20% off first assessment
  
  // User's selected track for this month
  selectedTrack: 'virtual' as PlanTrack, // User chose virtual this month
  
  // Track usage
  inHomeTrack: {
    included: 1,
    used: 0,
    remaining: 1
  },
  virtualTrack: {
    included: 3,
    used: 1,
    remaining: 2
  }
};

// Pricing for all session types
const pricing = {
  inHome: {
    regular: 85,
    description: '90 minutes in your home',
    details: 'Perfect for: Device setup, detailed learning, hands-on help'
  },
  virtual: {
    regular: 35,
    description: '60 minutes video call',
    details: 'Perfect for: Quick questions, check-ins, follow-ups'
  },
  group: {
    regular: 120,
    description: '90 minutes with 2-3 people',
    details: 'Perfect for: Learning with friends, couples sessions'
  }
};

export function BookingPage({ onBack, onBookingSuccess }: BookingPageProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCoverageReview, setShowCoverageReview] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showTrackChangeDialog, setShowTrackChangeDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('9:00 AM');
  const [bookingTopics, setBookingTopics] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // User has Standard Care plan - assume they have 1 in-home OR 3 virtual sessions in plan
  const hasActivePlan = true; // User has subscription
  const subscriberDiscount = 0.15; // 15% discount for add-ons

  // Calculate if session is covered and pricing
  const getSessionInfo = (serviceType: ServiceType) => {
    if (!serviceType) return null;

    let isCovered = false;
    let remainingAfterBooking = 0;
    let currentRemaining = 0;

    // Determine coverage based on selected track
    if (serviceType === 'in-home') {
      if (standardCarePlan.selectedTrack === 'in-home') {
        isCovered = standardCarePlan.inHomeTrack.remaining > 0;
        currentRemaining = standardCarePlan.inHomeTrack.remaining;
        remainingAfterBooking = currentRemaining - 1;
      }
    } else if (serviceType === 'virtual') {
      if (standardCarePlan.selectedTrack === 'virtual') {
        isCovered = standardCarePlan.virtualTrack.remaining > 0;
        currentRemaining = standardCarePlan.virtualTrack.remaining;
        remainingAfterBooking = currentRemaining - 1;
      }
    }
    // Group sessions are never covered
    
    const basePrice = serviceType === 'in-home' ? pricing.inHome.regular 
                    : serviceType === 'virtual' ? pricing.virtual.regular 
                    : pricing.group.regular;
    
    const discountedPrice = Math.round(basePrice * (1 - standardCarePlan.addOnDiscount / 100));
    const savings = basePrice - discountedPrice;

    return {
      isCovered,
      basePrice,
      discountedPrice,
      savings,
      currentRemaining,
      remainingAfterBooking,
      isGroup: serviceType === 'group'
    };
  };

  const handleServiceSelection = (service: ServiceType) => {
    setSelectedService(service);
  };

  const handleContinue = () => {
    if (!selectedService) {
      toast.error('Please select a session type');
      return;
    }
    setShowCoverageReview(true);
  };

  // Get track display name
  const getTrackDisplayName = () => {
    if (standardCarePlan.selectedTrack === 'in-home') {
      return 'in-home visits';
    } else if (standardCarePlan.selectedTrack === 'virtual') {
      return 'virtual sessions';
    }
    return 'sessions';
  };

  const handleConfirmBooking = () => {
    const sessionInfo = getSessionInfo(selectedService);
    const serviceTitle = selectedService === 'in-home' ? 'In-Home Visit'
                        : selectedService === 'virtual' ? 'Virtual Session'
                        : 'Group Session';

    const bookingData = {
      type: serviceTitle,
      date: new Date(bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: bookingTime,
      topics: bookingTopics,
      technician: selectedTechnician || 'No preference',
      price: sessionInfo?.isCovered ? 'Included in Plan' : `$${sessionInfo?.discountedPrice}`,
      originalPrice: `$${sessionInfo?.price}`,
      isAddon: !sessionInfo?.isCovered,
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
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-[22px] font-medium hover:underline"
          style={{ color: '#2D9596' }}
        >
          ← Back to Dashboard
        </button>

        <div className="text-center mb-8">
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

        {/* Current Plan Overview with Track Selection */}
        <Card className="mb-8 border-2" style={{ borderColor: '#2D9596', background: '#F0FDFA' }}>
          <CardHeader>
            <CardTitle className="text-[24px] flex items-center gap-2" style={{ color: '#265073' }}>
              <CheckCircle2 className="w-6 h-6" style={{ color: '#2D9596' }} />
              Your {standardCarePlan.planName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Track Status Display */}
            <div className="mb-4 p-4 rounded-lg border-2" style={{ 
              background: '#E6F7F4',
              borderColor: '#2D9596'
            }}>
              {/* Mobile-friendly stacked layout */}
              <div className="space-y-4">
                <div className="flex-1">
                  <p className="text-[14px] font-bold mb-3" style={{ color: '#265073' }}>
                    YOUR MONTHLY FORMAT:
                  </p>
                  {standardCarePlan.selectedTrack === 'in-home' ? (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2D9596' }}>
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                          1 In-Home Visit
                        </p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>
                          {standardCarePlan.inHomeTrack.remaining} of {standardCarePlan.inHomeTrack.included} remaining this month
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2D9596' }}>
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[18px] font-bold" style={{ color: '#265073' }}>
                          3 Virtual Sessions
                        </p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>
                          {standardCarePlan.virtualTrack.remaining} of {standardCarePlan.virtualTrack.included} remaining this month
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Change Format Button - Full width on mobile, auto on desktop */}
                <Button
                  onClick={() => setShowTrackChangeDialog(true)}
                  variant="outline"
                  className="w-full md:w-auto h-12 px-6 text-[16px] border-2 active:scale-95 transition-transform"
                  style={{ borderColor: '#2D9596', color: '#2D9596' }}
                >
                  Change Format
                </Button>
              </div>
              
              {/* Info box */}
              <div className="mt-4 flex items-start gap-2 p-3 rounded" style={{ background: '#FFFFFF' }}>
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#2D9596' }} />
                <p className="text-[13px] md:text-[12px]" style={{ color: '#4B5563' }}>
                  You selected {getTrackDisplayName()} this month. Changes take effect next billing cycle on <strong>{standardCarePlan.renewalDate}</strong>
                </p>
              </div>
            </div>

            {/* Plan Benefits Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-[14px]" style={{ color: '#265073' }}>
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                <span>15% off all add-ons</span>
              </div>
              <div className="flex items-center gap-2 text-[14px]" style={{ color: '#265073' }}>
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2 text-[14px]" style={{ color: '#265073' }}>
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                <span>Learning resources</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Session Types Display */}
        <div className="mb-8">
          <h2 className="text-[24px] font-bold mb-4" style={{ color: '#265073' }}>
            Available Session Types
          </h2>
          <p className="text-[16px] mb-6" style={{ color: '#6B7280' }}>
            Select the session format that works best for you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* In-Home Visit Card */}
            {(() => {
              const info = getSessionInfo('in-home');
              return (
                <div
                  onClick={() => handleServiceSelection('in-home')}
                  className={`relative rounded-xl p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedService === 'in-home' ? 'ring-4' : ''
                  }`}
                  style={{
                    borderColor: selectedService === 'in-home' ? '#2D9596' : '#D1D5DB',
                    background: selectedService === 'in-home' ? '#F0FDFA' : '#FFFFFF',
                    ringColor: selectedService === 'in-home' ? 'rgba(45, 149, 150, 0.2)' : 'transparent'
                  }}
                >
                  {/* Coverage Badge */}
                  <div className="absolute top-4 right-4">
                    {info?.isCovered ? (
                      <Badge className="text-[12px] px-2 py-1" style={{ background: '#10B981', color: '#FFFFFF' }}>
                        FREE WITH PLAN
                      </Badge>
                    ) : (
                      <Badge className="text-[12px] px-2 py-1" style={{ background: '#F59E0B', color: '#FFFFFF' }}>
                        ADD-ON
                      </Badge>
                    )}
                  </div>

                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto" 
                    style={{ background: '#DBEAFE' }}>
                    <Home className="w-7 h-7" style={{ color: '#2D9596' }} />
                  </div>

                  <h3 className="text-[22px] font-bold text-center mb-2" style={{ color: '#265073' }}>
                    In-Home Visit
                  </h3>

                  <p className="text-[14px] text-center mb-3" style={{ color: '#6B7280' }}>
                    {pricing.inHome.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="text-center mb-4">
                    {info?.isCovered ? (
                      <>
                        <div className="text-[32px] font-bold" style={{ color: '#10B981' }}>
                          $0
                        </div>
                        <div className="text-[14px] line-through" style={{ color: '#9CA3AF' }}>
                          (Regular: ${pricing.inHome.regular})
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-[18px] line-through" style={{ color: '#9CA3AF' }}>
                            ${pricing.inHome.regular}
                          </span>
                          <span className="text-[32px] font-bold" style={{ color: '#2D9596' }}>
                            ${info?.discountedPrice}
                          </span>
                        </div>
                        <div className="text-[12px] font-bold" style={{ color: '#10B981' }}>
                          Save ${info?.savings} (15% member discount)
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-[12px] text-center mb-4 px-2" style={{ color: '#4B5563' }}>
                    {pricing.inHome.details}
                  </p>

                  {/* Status Message */}
                  {selectedService === 'in-home' && (
                    <div className="mt-4 p-3 rounded-lg text-center" style={{
                      background: info?.isCovered ? '#ECFDF5' : '#FFFBEB',
                      border: `2px solid ${info?.isCovered ? '#10B981' : '#F59E0B'}`
                    }}>
                      {info?.isCovered ? (
                        <p className="text-[14px] font-bold" style={{ color: '#065F46' }}>
                          ✓ Free with your plan
                          <br />
                          <span className="text-[12px]" style={{ color: '#047857' }}>
                            {info.remainingAfterBooking} remaining after
                          </span>
                        </p>
                      ) : (
                        <p className="text-[14px] font-bold" style={{ color: '#92400E' }}>
                          {standardCarePlan.selectedTrack === 'virtual' 
                            ? '💡 Switch to in-home format next month to include this'
                            : 'Add-on session'
                          }
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <div 
                      className={`w-full h-12 rounded-lg flex items-center justify-center font-bold text-[16px] transition-all ${
                        selectedService === 'in-home' ? 'active:scale-95' : ''
                      }`}
                      style={{
                        background: selectedService === 'in-home' ? '#2D9596' : '#F3F4F6',
                        color: selectedService === 'in-home' ? '#FFFFFF' : '#6B7280'
                      }}
                    >
                      {selectedService === 'in-home' ? '✓ Selected' : 'Select'}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Virtual Session Card */}
            {(() => {
              const info = getSessionInfo('virtual');
              return (
                <div
                  onClick={() => handleServiceSelection('virtual')}
                  className={`relative rounded-xl p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedService === 'virtual' ? 'ring-4' : ''
                  }`}
                  style={{
                    borderColor: selectedService === 'virtual' ? '#2D9596' : '#D1D5DB',
                    background: selectedService === 'virtual' ? '#F0FDFA' : '#FFFFFF',
                    ringColor: selectedService === 'virtual' ? 'rgba(45, 149, 150, 0.2)' : 'transparent'
                  }}
                >
                  {/* Coverage Badge */}
                  <div className="absolute top-4 right-4">
                    {info?.isCovered ? (
                      <Badge className="text-[12px] px-2 py-1" style={{ background: '#10B981', color: '#FFFFFF' }}>
                        FREE WITH PLAN
                      </Badge>
                    ) : (
                      <Badge className="text-[12px] px-2 py-1" style={{ background: '#F59E0B', color: '#FFFFFF' }}>
                        ADD-ON
                      </Badge>
                    )}
                  </div>

                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto" 
                    style={{ background: '#E0E7FF' }}>
                    <Video className="w-7 h-7" style={{ color: '#2D9596' }} />
                  </div>

                  <h3 className="text-[22px] font-bold text-center mb-2" style={{ color: '#265073' }}>
                    Virtual Session
                  </h3>

                  <p className="text-[14px] text-center mb-3" style={{ color: '#6B7280' }}>
                    {pricing.virtual.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="text-center mb-4">
                    {info?.isCovered ? (
                      <>
                        <div className="text-[32px] font-bold" style={{ color: '#10B981' }}>
                          $0
                        </div>
                        <div className="text-[14px] line-through" style={{ color: '#9CA3AF' }}>
                          (Regular: ${pricing.virtual.regular})
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-[18px] line-through" style={{ color: '#9CA3AF' }}>
                            ${pricing.virtual.regular}
                          </span>
                          <span className="text-[32px] font-bold" style={{ color: '#2D9596' }}>
                            ${info?.discountedPrice}
                          </span>
                        </div>
                        <div className="text-[12px] font-bold" style={{ color: '#10B981' }}>
                          Save ${info?.savings} (15% member discount)
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-[12px] text-center mb-4 px-2" style={{ color: '#4B5563' }}>
                    {pricing.virtual.details}
                  </p>

                  {/* Status Message */}
                  {selectedService === 'virtual' && (
                    <div className="mt-4 p-3 rounded-lg text-center" style={{
                      background: info?.isCovered ? '#ECFDF5' : '#FFFBEB',
                      border: `2px solid ${info?.isCovered ? '#10B981' : '#F59E0B'}`
                    }}>
                      {info?.isCovered ? (
                        <p className="text-[14px] font-bold" style={{ color: '#065F46' }}>
                          ✓ Free with your plan
                          <br />
                          <span className="text-[12px]" style={{ color: '#047857' }}>
                            {info.remainingAfterBooking} remaining after
                          </span>
                        </p>
                      ) : (
                        <p className="text-[14px] font-bold" style={{ color: '#92400E' }}>
                          {standardCarePlan.selectedTrack === 'in-home' 
                            ? '💡 Switch to virtual format next month to include this'
                            : 'Add-on session'
                          }
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <div 
                      className={`w-full h-12 rounded-lg flex items-center justify-center font-bold text-[16px] transition-all ${
                        selectedService === 'virtual' ? 'active:scale-95' : ''
                      }`}
                      style={{
                        background: selectedService === 'virtual' ? '#2D9596' : '#F3F4F6',
                        color: selectedService === 'virtual' ? '#FFFFFF' : '#6B7280'
                      }}
                    >
                      {selectedService === 'virtual' ? '✓ Selected' : 'Select'}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Group Session Card - Always Add-on */}
            {(() => {
              const info = getSessionInfo('group');
              return (
                <div
                  onClick={() => handleServiceSelection('group')}
                  className={`relative rounded-xl p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedService === 'group' ? 'ring-4' : ''
                  }`}
                  style={{
                    borderColor: selectedService === 'group' ? '#2D9596' : '#D1D5DB',
                    background: selectedService === 'group' ? '#F0FDFA' : '#FFFFFF',
                    ringColor: selectedService === 'group' ? 'rgba(45, 149, 150, 0.2)' : 'transparent'
                  }}
                >
                  {/* Always Add-on Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="text-[12px] px-2 py-1" style={{ background: '#F59E0B', color: '#FFFFFF' }}>
                      ADD-ON
                    </Badge>
                  </div>

                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto" 
                    style={{ background: '#F3E8FF' }}>
                    <Users className="w-7 h-7" style={{ color: '#2D9596' }} />
                  </div>

                  <h3 className="text-[22px] font-bold text-center mb-2" style={{ color: '#265073' }}>
                    Group Session
                  </h3>

                  <p className="text-[14px] text-center mb-3" style={{ color: '#6B7280' }}>
                    {pricing.group.description}
                  </p>

                  {/* Pricing Display - Always with discount */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[18px] line-through" style={{ color: '#9CA3AF' }}>
                        ${pricing.group.regular}
                      </span>
                      <span className="text-[32px] font-bold" style={{ color: '#2D9596' }}>
                        ${info?.discountedPrice}
                      </span>
                    </div>
                    <div className="text-[12px] font-bold" style={{ color: '#10B981' }}>
                      Save ${info?.savings} (15% member discount)
                    </div>
                  </div>

                  <p className="text-[12px] text-center mb-4 px-2" style={{ color: '#4B5563' }}>
                    {pricing.group.details}
                  </p>

                  {/* Always show as add-on */}
                  {selectedService === 'group' && (
                    <div className="mt-4 p-3 rounded-lg text-center" style={{
                      background: '#FFFBEB',
                      border: '2px solid #F59E0B'
                    }}>
                      <p className="text-[14px] font-bold" style={{ color: '#92400E' }}>
                        Add-on session
                        <br />
                        <span className="text-[12px]" style={{ color: '#B45309' }}>
                          (Never included in plan)
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="mt-4">
                    <div 
                      className={`w-full h-12 rounded-lg flex items-center justify-center font-bold text-[16px] transition-all ${
                        selectedService === 'group' ? 'active:scale-95' : ''
                      }`}
                      style={{
                        background: selectedService === 'group' ? '#2D9596' : '#F3F4F6',
                        color: selectedService === 'group' ? '#FFFFFF' : '#6B7280'
                      }}
                    >
                      {selectedService === 'group' ? '✓ Selected' : 'Select'}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="mt-6">
            <Button
              onClick={handleContinue}
              disabled={!selectedService}
              className="w-full h-14 text-[18px] font-bold active:scale-95 transition-transform"
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              Continue to Booking Details
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Help Section */}
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

        {/* Booking Review Dialog */}
        <Dialog open={showCoverageReview} onOpenChange={setShowCoverageReview}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[32px] mb-2" style={{ color: '#265073' }}>
                Booking Summary
              </DialogTitle>
              <DialogDescription className="text-[18px]" style={{ color: '#4B5563' }}>
                Review your session details before confirming
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              {/* Booking Details Form */}
              <Card className="border-2" style={{ borderColor: '#E5E7EB' }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-[24px]" style={{ color: '#265073' }}>
                    Session Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[18px]" style={{ color: '#265073' }}>Session Type:</span>
                    <span className="text-[18px] font-bold" style={{ color: '#265073' }}>
                      {selectedService === 'in-home' ? 'In-Home Visit' 
                        : selectedService === 'virtual' ? 'Virtual Session'
                        : 'Group Session'}
                    </span>
                  </div>
                  {selectedTechnician && (
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: '#F0FDFA' }}>
                      <span className="text-[16px]" style={{ color: '#265073' }}>Preferred Technician:</span>
                      <span className="text-[16px] font-bold" style={{ color: '#2D9596' }}>
                        {selectedTechnician === 'tea-araki' ? 'Tea Araki'
                          : selectedTechnician === 'dj-sable' ? 'DJ Sable'
                          : 'Lindsay Trenton'}
                      </span>
                    </div>
                  )}
                  <div>
                    <label className="text-[18px] block mb-2" style={{ color: '#265073' }}>
                      Select Date:
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full h-12 px-4 rounded-lg border-2 text-[16px]"
                      style={{ borderColor: '#E5E7EB' }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="text-[18px] block mb-2" style={{ color: '#265073' }}>
                      Select Time:
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full h-12 px-4 rounded-lg border-2 text-[16px]"
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
                    <label className="text-[18px] block mb-2" style={{ color: '#265073' }}>
                      What would you like help with?
                    </label>
                    <textarea
                      value={bookingTopics}
                      onChange={(e) => setBookingTopics(e.target.value)}
                      className="w-full h-24 px-4 py-3 rounded-lg border-2 text-[16px]"
                      style={{ borderColor: '#E5E7EB' }}
                      placeholder="e.g., iPhone setup, email questions, video calling..."
                    />
                  </div>
                  <div>
                    <label className="text-[18px] block mb-2" style={{ color: '#265073' }}>
                      Preferred Technician <span className="text-[14px]" style={{ color: '#6B7280' }}>(Optional)</span>
                    </label>
                    <select
                      value={selectedTechnician}
                      onChange={(e) => setSelectedTechnician(e.target.value)}
                      className="w-full h-12 px-4 rounded-lg border-2 text-[16px]"
                      style={{ borderColor: '#E5E7EB', color: '#265073' }}
                    >
                      <option value="">No preference - we'll match you with the best fit</option>
                      <option value="tea-araki">Tea Araki</option>
                      <option value="dj-sable">DJ Sable</option>
                      <option value="lindsay-trenton">Lindsay Trenton</option>
                    </select>
                    <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                      💡 All our technicians are trained to work with kūpuna and provide patient, compassionate support
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              {(() => {
                const info = getSessionInfo(selectedService);
                if (!info) return null;

                return (
                  <>
                    <Card className="border-2" style={{ 
                      borderColor: info.isCovered ? '#10B981' : '#F59E0B',
                      background: info.isCovered ? '#ECFDF5' : '#FFFBEB'
                    }}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                            style={{ background: info.isCovered ? '#10B981' : '#F59E0B' }}>
                            {info.isCovered ? (
                              <CheckCircle2 className="w-7 h-7 text-white" />
                            ) : (
                              <Percent className="w-7 h-7 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            {info.isCovered ? (
                              <>
                                <h3 className="text-[24px] font-bold mb-2" style={{ color: '#065F46' }}>
                                  ✓ Covered by Your Plan
                                </h3>
                                <p className="text-[18px] mb-4" style={{ color: '#047857' }}>
                                  This session is included in your {getTrackDisplayName()} plan. No payment needed!
                                </p>
                                <div className="p-4 rounded-lg" style={{ background: '#D1FAE5' }}>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[18px]" style={{ color: '#065F46' }}>Plan Covered:</span>
                                      <span className="text-xl md:text-[28px] font-bold" style={{ color: '#065F46' }}>$0</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[14px]" style={{ color: '#047857' }}>
                                      <span>Remaining after booking:</span>
                                      <span className="font-bold">{info.remainingAfterBooking} sessions</span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <h3 className="text-[24px] font-bold mb-2" style={{ color: '#92400E' }}>
                                  Add-on with Member Discount
                                </h3>
                                <p className="text-[18px] mb-4" style={{ color: '#B45309' }}>
                                  {info.isGroup 
                                    ? 'Group sessions are always add-ons, but you get 15% off as a member!'
                                    : `You've used all your ${getTrackDisplayName()} for this month, but you get 15% off as a member!`
                                  }
                                </p>
                                <div className="p-4 rounded-lg mb-4" style={{ background: '#FEF3C7' }}>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[18px]" style={{ color: '#92400E' }}>Regular Price:</span>
                                      <span className="text-[20px] line-through" style={{ color: '#9CA3AF' }}>
                                        ${info.basePrice}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[18px]" style={{ color: '#92400E' }}>Member Discount (15%):</span>
                                      <span className="text-[20px] font-bold" style={{ color: '#10B981' }}>
                                        -${info.savings}
                                      </span>
                                    </div>
                                    <div className="h-px" style={{ background: '#D97706' }}></div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[20px] font-bold" style={{ color: '#92400E' }}>You Pay Today:</span>
                                      <span className="text-[32px] font-bold" style={{ color: '#92400E' }}>
                                        ${info.discountedPrice}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: '#E0F2F1' }}>
                                  <Info className="w-5 h-5 flex-shrink-0" style={{ color: '#2D9596' }} />
                                  <p className="text-[14px]" style={{ color: '#265073' }}>
                                    Your plan resets on <strong>{standardCarePlan.renewalDate}</strong>
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Upgrade suggestion if using add-ons */}
                    {!info.isCovered && !info.isGroup && (
                      <Card className="border-2" style={{ borderColor: '#2D9596', background: '#E6F7F4' }}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                              style={{ background: '#2D9596' }}>
                              <TrendingUp className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-[24px] font-bold mb-2" style={{ color: '#265073' }}>
                                💡 Upgrade to Premium?
                              </h3>
                              <p className="text-[18px] mb-3" style={{ color: '#4B5563' }}>
                                With Premium, you get 2 in-home visits OR 6 virtual sessions per month. Based on your usage, you could save money!
                              </p>
                              <div className="p-3 rounded-lg mb-4" style={{ background: '#FFFFFF' }}>
                                <p className="text-[14px] mb-2" style={{ color: '#265073' }}>
                                  <strong>Potential Savings:</strong>
                                </p>
                                <div className="space-y-1 text-[14px]" style={{ color: '#4B5563' }}>
                                  <div>Standard + 2 add-ons: $79 + ${info.discountedPrice * 2} = ${79 + (info.discountedPrice * 2)}/month</div>
                                  <div className="font-bold" style={{ color: '#10B981' }}>Premium: $149/month - Save ${(79 + (info.discountedPrice * 2)) - 149}!</div>
                                </div>
                              </div>
                              <Button
                                onClick={() => {
                                  setShowCoverageReview(false);
                                  setShowUpgradeDialog(true);
                                }}
                                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                                style={{ background: '#2D9596', color: '#FFFFFF' }}
                              >
                                <TrendingUp className="w-5 h-5 mr-2" />
                                View Premium Plan
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                );
              })()}
            </div>

            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowCoverageReview(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  const info = getSessionInfo(selectedService);
                  onBookingSuccess({
                    service: selectedService,
                    date: bookingDate,
                    time: bookingTime,
                    topics: bookingTopics,
                    technician: selectedTechnician,
                    cost: info?.isCovered ? 0 : info?.discountedPrice,
                    isCovered: info?.isCovered
                  });
                  setShowCoverageReview(false);
                  toast.success('Booking confirmed! Check your email for details.');
                }}
                disabled={!bookingDate}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Track Change Dialog */}
        <Dialog open={showTrackChangeDialog} onOpenChange={setShowTrackChangeDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-[28px] mb-2" style={{ color: '#265073' }}>
                Change Monthly Format
              </DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Choose how you want to use your Standard Care Plan
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-4">
              <div className="p-4 rounded-lg" style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                  <div>
                    <p className="text-[16px] font-bold mb-1" style={{ color: '#92400E' }}>
                      Important: Format changes take effect next billing cycle
                    </p>
                    <p className="text-[14px]" style={{ color: '#B45309' }}>
                      You're currently using {getTrackDisplayName()}. Any format change will start on {standardCarePlan.renewalDate}.
                    </p>
                  </div>
                </div>
              </div>

              <RadioGroup defaultValue={standardCarePlan.selectedTrack || ''}>
                <div className="space-y-4">
                  <label className="flex items-start p-4 rounded-xl border-2 cursor-pointer hover:bg-gray-50" style={{ borderColor: '#D1D5DB' }}>
                    <RadioGroupItem value="in-home" id="track-in-home" className="mt-1" />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Home className="w-5 h-5" style={{ color: '#2D9596' }} />
                        <Label htmlFor="track-in-home" className="text-[18px] font-bold cursor-pointer" style={{ color: '#265073' }}>
                          1 In-Home Visit per Month
                        </Label>
                      </div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>
                        Best for hands-on help, device setup, and detailed learning sessions
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 rounded-xl border-2 cursor-pointer hover:bg-gray-50" style={{ borderColor: '#D1D5DB' }}>
                    <RadioGroupItem value="virtual" id="track-virtual" className="mt-1" />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5" style={{ color: '#2D9596' }} />
                        <Label htmlFor="track-virtual" className="text-[18px] font-bold cursor-pointer" style={{ color: '#265073' }}>
                          3 Virtual Sessions per Month
                        </Label>
                      </div>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>
                        Best for frequent check-ins, quick questions, and ongoing support
                      </p>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowTrackChangeDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast.success('Format change scheduled for next billing cycle!');
                  setShowTrackChangeDialog(false);
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upgrade Plan Dialog */}
        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[32px] mb-2" style={{ color: '#265073' }}>
                Upgrade to Premium Care Plan
              </DialogTitle>
              <DialogDescription className="text-[18px]" style={{ color: '#4B5563' }}>
                Get more sessions and flexibility with Premium
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-6">
              {/* Plan Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Standard Plan */}
                <Card className="border-2" style={{ borderColor: '#D1D5DB' }}>
                  <CardHeader>
                    <CardTitle className="text-[24px]" style={{ color: '#265073' }}>
                      Standard Plan
                    </CardTitle>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>Your current plan</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-[36px] font-bold mb-4" style={{ color: '#2D9596' }}>
                      $79<span className="text-[18px]">/month</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>1 in-home visit per month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>OR 3 virtual sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>15% off add-ons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>Priority support</span>
                      </div>
                      
                      {/* First Assessment Discount */}
                      <div className="mt-4 p-3 rounded-lg border-2" style={{ background: '#ECFDF5', borderColor: '#10B981' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="text-[12px]" style={{ background: '#065F46', color: '#FFFFFF' }}>
                            30% OFF
                          </Badge>
                          <span className="text-[14px] font-bold" style={{ color: '#065F46' }}>
                            First Assessment
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] line-through" style={{ color: '#9CA3AF' }}>
                            $150
                          </span>
                          <span className="text-[20px] font-bold" style={{ color: '#065F46' }}>
                            $105
                          </span>
                        </div>
                        <p className="text-[12px] mt-1" style={{ color: '#047857' }}>
                          New members save $45
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="border-2 relative overflow-hidden" style={{ borderColor: '#2D9596', background: '#F0FDFA' }}>
                  <div className="absolute top-4 right-4">
                    <Badge className="text-[14px] px-3 py-1" style={{ background: '#2D9596', color: '#FFFFFF' }}>
                      BEST VALUE
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[24px]" style={{ color: '#265073' }}>
                      Premium Plan
                    </CardTitle>
                    <p className="text-[14px]" style={{ color: '#6B7280' }}>For active users</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-[36px] font-bold mb-4" style={{ color: '#2D9596' }}>
                      $149<span className="text-[18px]">/month</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px] font-bold" style={{ color: '#265073' }}>2 in-home visits per month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px] font-bold" style={{ color: '#265073' }}>OR 6 virtual sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>15% off add-ons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>Priority support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-[16px]" style={{ color: '#4B5563' }}>Free learning resources</span>
                      </div>

                      {/* First Assessment Discount */}
                      <div className="mt-4 p-3 rounded-lg border-2" style={{ background: '#ECFDF5', borderColor: '#10B981' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="text-[12px]" style={{ background: '#065F46', color: '#FFFFFF' }}>
                            30% OFF
                          </Badge>
                          <span className="text-[14px] font-bold" style={{ color: '#065F46' }}>
                            First Assessment
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] line-through" style={{ color: '#9CA3AF' }}>
                            $150
                          </span>
                          <span className="text-[20px] font-bold" style={{ color: '#065F46' }}>
                            $105
                          </span>
                        </div>
                        <p className="text-[12px] mt-1" style={{ color: '#047857' }}>
                          Your first assessment creates your personalized plan
                        </p>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-6 h-14 text-[18px] font-bold active:scale-95 transition-transform"
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                      onClick={() => {
                        toast.success('Redirecting to upgrade...');
                        setShowUpgradeDialog(false);
                      }}
                    >
                      Upgrade to Premium
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() => setShowUpgradeDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Maybe Later
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Confirmation Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-[28px] text-center" style={{ color: '#16A34A' }}>
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
