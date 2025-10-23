import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Alert, AlertDescription } from '../../ui/alert';
import { ArrowLeft, Clock, Users, CheckCircle2, AlertTriangle, DollarSign, Calendar } from 'lucide-react';

interface ScheduleWorkshopProps {
  onBack: () => void;
  onSuccess: (data: any) => void;
}

export function ScheduleWorkshop({ onBack, onSuccess }: ScheduleWorkshopProps) {
  const [step, setStep] = useState(1);
  const [workshopType, setWorkshopType] = useState('free');
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [expectedAttendance, setExpectedAttendance] = useState('');

  // Booking limits tracking
  const [bookingData] = useState({
    currentYear: 2025,
    currentQuarter: 4, // Q4: Oct-Dec
    yearlyBookings: 7, // Already booked 7 this year
    quarterlyBookings: {
      Q1: 2, // Jan-Mar: Used both
      Q2: 2, // Apr-Jun: Used both  
      Q3: 2, // Jul-Sep: Used both
      Q4: 1  // Oct-Dec: Used 1 of 2
    }
  });

  const MAX_FREE_PER_YEAR = 8;
  const MAX_FREE_PER_QUARTER = 2;
  const OVERAGE_FEE = 20;

  const remainingYearly = MAX_FREE_PER_YEAR - bookingData.yearlyBookings;
  const remainingQuarterly = MAX_FREE_PER_QUARTER - bookingData.quarterlyBookings[`Q${bookingData.currentQuarter}`];
  const canBookFree = remainingYearly > 0 && remainingQuarterly > 0;

  const getQuarterName = (q: number) => {
    const quarters: { [key: number]: string } = {
      1: 'Q1 (Jan-Mar)',
      2: 'Q2 (Apr-Jun)',
      3: 'Q3 (Jul-Sep)',
      4: 'Q4 (Oct-Dec)'
    };
    return quarters[q];
  };

  const freeWorkshops = [
    {
      id: 1,
      title: 'Spotting Scams & Staying Safe',
      duration: '90 minutes',
      capacity: '30 residents',
      description: 'Learn to identify common scams targeting seniors, including phone scams, email phishing, and social media fraud. Protect yourself and your loved ones with practical prevention strategies.',
      instructor: 'Tea Araki',
      topics: ['Phone scams', 'Email phishing', 'Social media fraud', 'Prevention strategies'],
      requirements: 'None - all levels welcome',
      type: 'free'
    },
    {
      id: 2,
      title: 'Recognizing Email & Text Scams',
      duration: '90 minutes',
      capacity: '25 residents',
      description: 'Deep dive into email and text message scams. Learn to spot suspicious links, verify sender authenticity, and protect your personal information from phishing attempts.',
      instructor: 'Tea Araki',
      topics: ['Phishing emails', 'Text scams', 'Link verification', 'Sender authentication'],
      requirements: 'Basic email knowledge helpful',
      type: 'free'
    },
    {
      id: 3,
      title: 'Phone Scam Tactics & Protection',
      duration: '90 minutes',
      capacity: '30 residents',
      description: 'Understand common phone scam techniques including IRS impersonators, tech support scams, and grandparent scams. Practice safe responses and learn when to hang up.',
      instructor: 'Keahi Nakamura',
      topics: ['IRS scams', 'Tech support fraud', 'Grandparent scams', 'Safe responses'],
      requirements: 'None - all levels welcome',
      type: 'free'
    },
    {
      id: 4,
      title: 'Social Media Safety & Scams',
      duration: '90 minutes',
      capacity: '20 residents',
      description: 'Navigate Facebook, Instagram, and other platforms safely. Recognize fake profiles, romance scams, and suspicious posts while maintaining privacy settings.',
      instructor: 'Keahi Nakamura',
      topics: ['Privacy settings', 'Fake profiles', 'Romance scams', 'Safe sharing'],
      requirements: 'Social media account recommended',
      type: 'free'
    },
  ];

  const paidClasses = [
    {
      id: 5,
      title: 'iPhone Basics for Beginners',
      duration: '45 minutes',
      capacity: '8-15 residents',
      pricing: '$15 per person (8-12 attendees) | $12 per person (13-15 attendees)',
      description: 'Master your iPhone fundamentals in this hands-on class. Learn essential navigation, settings, and daily tasks to build confidence with your device.',
      instructor: 'Tea Araki',
      topics: ['Home screen', 'Settings', 'Making calls', 'Text messages', 'Photos', 'App basics', 'Volume & brightness', 'Charging'],
      requirements: 'Bring your iPhone (any model)',
      materials: 'Large-print guide included',
      type: 'paid'
    },
    {
      id: 6,
      title: 'Video Calling with Family',
      duration: '45 minutes',
      capacity: '8-15 residents',
      pricing: '$15 per person (8-12 attendees) | $12 per person (13-15 attendees)',
      description: 'Connect face-to-face with loved ones using FaceTime and Zoom. Practice making calls, using features, and troubleshooting common issues.',
      instructor: 'Keahi Nakamura',
      topics: ['FaceTime basics', 'Zoom meetings', 'Camera & microphone', 'Screen sharing', 'Troubleshooting'],
      requirements: 'iPhone or iPad with camera',
      materials: 'Step-by-step guide with screenshots',
      type: 'paid'
    },
    {
      id: 7,
      title: 'Password Management Made Easy',
      duration: '90 minutes',
      capacity: '8-12 residents',
      pricing: '$25 per person (8-10 attendees) | $20 per person (11-12 attendees)',
      description: 'Create strong, memorable passwords and learn to use a password manager safely. Protect all your online accounts with confidence.',
      instructor: 'Tea Araki',
      topics: ['Strong passwords', 'Password managers', 'Two-factor authentication', 'Security questions', 'Account recovery'],
      requirements: 'Email account needed',
      materials: 'Password tracker worksheet',
      note: 'We never ask for your actual passwords - you keep them private!',
      type: 'paid'
    },
    {
      id: 8,
      title: 'Online Banking Basics',
      duration: '90 minutes',
      capacity: '8-15 residents',
      pricing: '$25 per person (8-12 attendees) | $20 per person (13-15 attendees)',
      description: 'Safely manage your finances online. Learn to check balances, pay bills, transfer money, and recognize banking security features.',
      instructor: 'Keahi Nakamura',
      topics: ['Logging in securely', 'Checking balances', 'Bill pay', 'Transfers', 'Mobile deposit', 'Security features'],
      requirements: 'Online banking account',
      materials: 'Banking security checklist',
      note: 'We use bank-level security and you maintain complete control of your accounts.',
      type: 'paid'
    },
  ];

  const allWorkshops = [...freeWorkshops, ...paidClasses];

  const handleWorkshopSelect = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setStep(2);
  };

  const handleSubmit = () => {
    onSuccess({
      workshop: selectedWorkshop,
      date,
      time,
      attendance: expectedAttendance,
      requiresPayment: selectedWorkshop.type === 'free' && !canBookFree,
      fee: selectedWorkshop.type === 'free' && !canBookFree ? OVERAGE_FEE : 0
    });
  };

  const handleBackToSelection = () => {
    setSelectedWorkshop(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-8">
        <button
          onClick={step === 1 ? onBack : handleBackToSelection}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          {step === 1 ? 'Back to Dashboard' : 'Back to Workshop Selection'}
        </button>

        {step === 1 ? (
          <>
            {/* STEP 1: Workshop Selection with Booking Limits */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
                Schedule a Workshop or Class
              </h1>
              <p className="text-[18px]" style={{ color: '#6B7280' }}>
                Choose from free workshops or paid classes for your community
              </p>
            </div>

            {/* Booking Limits Overview */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Annual Limit */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" style={{ color: '#2D9596' }} />
                      <span className="text-[16px] font-bold" style={{ color: '#265073' }}>
                        Annual Limit (2025)
                      </span>
                    </div>
                    <span className="text-[20px] font-bold" style={{ color: '#265073' }}>
                      {bookingData.yearlyBookings} / {MAX_FREE_PER_YEAR}
                    </span>
                  </div>
                  <div className="mt-2 w-full h-2 rounded-full" style={{ background: '#E5E7EB' }}>
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${(bookingData.yearlyBookings / MAX_FREE_PER_YEAR) * 100}%`,
                        background: bookingData.yearlyBookings >= MAX_FREE_PER_YEAR ? '#DC2626' : '#2D9596'
                      }}
                    />
                  </div>
                  <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                    {remainingYearly} free workshop{remainingYearly !== 1 ? 's' : ''} remaining this year
                  </p>
                </CardContent>
              </Card>

              {/* Quarterly Limit */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" style={{ color: '#2D9596' }} />
                      <span className="text-[16px] font-bold" style={{ color: '#265073' }}>
                        {getQuarterName(bookingData.currentQuarter)}
                      </span>
                    </div>
                    <span className="text-[20px] font-bold" style={{ color: '#265073' }}>
                      {bookingData.quarterlyBookings[`Q${bookingData.currentQuarter}`]} / {MAX_FREE_PER_QUARTER}
                    </span>
                  </div>
                  <div className="mt-2 w-full h-2 rounded-full" style={{ background: '#E5E7EB' }}>
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${(bookingData.quarterlyBookings[`Q${bookingData.currentQuarter}`] / MAX_FREE_PER_QUARTER) * 100}%`,
                        background: bookingData.quarterlyBookings[`Q${bookingData.currentQuarter}`] >= MAX_FREE_PER_QUARTER ? '#DC2626' : '#2D9596'
                      }}
                    />
                  </div>
                  <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                    {remainingQuarterly} free workshop{remainingQuarterly !== 1 ? 's' : ''} remaining this quarter
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Booking Status Alert */}
            {canBookFree ? (
              <Alert className="mb-6" style={{ background: '#D1FAE5', borderColor: '#10B981' }}>
                <CheckCircle2 className="h-5 w-5" style={{ color: '#059669' }} />
                <AlertDescription className="text-[16px]" style={{ color: '#065F46' }}>
                  <strong>You can book free workshops!</strong> You have {remainingQuarterly} free workshop{remainingQuarterly !== 1 ? 's' : ''} remaining this quarter and {remainingYearly} remaining this year.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mb-6" style={{ background: '#FEF3C7', borderColor: '#F59E0B' }}>
                <AlertTriangle className="h-5 w-5" style={{ color: '#D97706' }} />
                <AlertDescription className="text-[16px]" style={{ color: '#92400E' }}>
                  <strong>Free workshop limit reached.</strong> {' '}
                  {remainingYearly === 0 ? (
                    <>You've used all 8 free workshops for 2025. Additional workshops cost ${OVERAGE_FEE} per workshop.</>
                  ) : (
                    <>You've used both free workshops for {getQuarterName(bookingData.currentQuarter)}. Additional workshops this quarter cost ${OVERAGE_FEE} per workshop.</>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <Tabs value={workshopType} onValueChange={(value: any) => setWorkshopType(value)}>
              <TabsList className="mb-8">
                <TabsTrigger value="free" className="text-[18px] px-6 py-3">
                  Free Workshops {!canBookFree && `(+$${OVERAGE_FEE})`}
                </TabsTrigger>
                <TabsTrigger value="paid" className="text-[18px] px-6 py-3">
                  Paid Classes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="free">
                <div className="space-y-4">
                  {freeWorkshops.map((workshop) => (
                    <Card 
                      key={workshop.id}
                      className="cursor-pointer transition-all hover:shadow-lg"
                      style={{ borderColor: '#E5E7EB' }}
                      onClick={() => handleWorkshopSelect(workshop)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge style={{ 
                                background: canBookFree ? '#D1FAE5' : '#FEF3C7',
                                color: canBookFree ? '#065F46' : '#92400E'
                              }}>
                                {canBookFree ? 'FREE' : `$${OVERAGE_FEE}`}
                              </Badge>
                              <h3 className="text-[22px] font-bold" style={{ color: '#265073' }}>
                                {workshop.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-4 text-[14px] mb-2" style={{ color: '#6B7280' }}>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {workshop.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {workshop.capacity}
                              </span>
                            </div>
                            <p className="text-[14px]" style={{ color: '#4B5563' }}>
                              {workshop.description.substring(0, 120)}...
                            </p>
                          </div>
                        </div>
                        <Button 
                          className="w-full h-12"
                          style={{ 
                            background: canBookFree ? '#2D9596' : '#F59E0B',
                            color: '#FFFFFF' 
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWorkshopSelect(workshop);
                          }}
                        >
                          {canBookFree ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              Select Free Workshop
                            </>
                          ) : (
                            <>
                              <DollarSign className="w-5 h-5 mr-2" />
                              Book for ${OVERAGE_FEE}
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="paid">
                <div className="grid md:grid-cols-2 gap-6">
                  {paidClasses.map((classItem) => (
                    <Card 
                      key={classItem.id}
                      className="cursor-pointer transition-all hover:shadow-lg"
                      style={{ borderColor: '#E5E7EB' }}
                      onClick={() => handleWorkshopSelect(classItem)}
                    >
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <Badge style={{ background: '#E0F2FE', color: '#0284C7' }} className="mb-2">
                            Paid Class
                          </Badge>
                          <h3 className="text-[20px] font-bold mb-1" style={{ color: '#265073' }}>
                            {classItem.title}
                          </h3>
                          <p className="text-[14px] font-bold" style={{ color: '#F59E0B' }}>
                            {classItem.pricing}
                          </p>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-4 text-[14px] mb-2" style={{ color: '#6B7280' }}>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {classItem.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {classItem.capacity}
                            </span>
                          </div>
                          <p className="text-[14px]" style={{ color: '#4B5563' }}>
                            {classItem.description.substring(0, 120)}...
                          </p>
                        </div>
                        <Button 
                          className="w-full h-12"
                          style={{ background: '#2D9596', color: '#FFFFFF' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWorkshopSelect(classItem);
                          }}
                        >
                          Select This Class
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            {/* STEP 2: Details & Booking */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Badge style={{ 
                  background: selectedWorkshop?.type === 'free' 
                    ? (canBookFree ? '#D1FAE5' : '#FEF3C7')
                    : '#E0F2FE',
                  color: selectedWorkshop?.type === 'free' 
                    ? (canBookFree ? '#065F46' : '#92400E')
                    : '#0284C7'
                }}>
                  {selectedWorkshop?.type === 'free' 
                    ? (canBookFree ? 'FREE Workshop' : `$${OVERAGE_FEE} Workshop`)
                    : 'Paid Class'
                  }
                </Badge>
                <h1 className="text-2xl md:text-[36px] font-bold" style={{ color: '#265073' }}>
                  {selectedWorkshop?.title}
                </h1>
              </div>
              {selectedWorkshop?.type === 'free' && !canBookFree && (
                <Alert className="mt-4" style={{ background: '#FEF3C7', borderColor: '#F59E0B' }}>
                  <AlertTriangle className="h-5 w-5" style={{ color: '#D97706' }} />
                  <AlertDescription className="text-[14px]" style={{ color: '#92400E' }}>
                    This booking requires a ${OVERAGE_FEE} fee because you've reached your free workshop limit for this period.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Booking Form */}
              <div className="md:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-[24px]">Choose Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[18px]">Preferred Date</Label>
                      <Input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-14 text-[16px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[18px]">Preferred Time</Label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full h-14 text-[16px] px-4 border rounded-md"
                        style={{ borderColor: '#E5E7EB' }}
                      >
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[18px]">Expected Attendance</Label>
                      <Input 
                        type="number"
                        value={expectedAttendance}
                        onChange={(e) => setExpectedAttendance(e.target.value)}
                        placeholder="Number of residents"
                        className="h-14 text-[16px]"
                      />
                    </div>
                    <Button 
                      onClick={handleSubmit}
                      disabled={!date || !time || !expectedAttendance}
                      className="w-full h-14 text-[18px]"
                      style={{ 
                        background: (!date || !time || !expectedAttendance) ? '#9CA3AF' : '#2D9596',
                        color: '#FFFFFF'
                      }}
                    >
                      Confirm Workshop
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Details Sidebar */}
              <div>
                <Card style={{ position: 'sticky', top: '20px' }}>
                  <CardHeader>
                    <CardTitle className="text-[20px]">Workshop Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-[14px] font-bold mb-1" style={{ color: '#265073' }}>Instructor</p>
                      <p className="text-[16px]" style={{ color: '#4B5563' }}>{selectedWorkshop?.instructor}</p>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold mb-1" style={{ color: '#265073' }}>Duration</p>
                      <p className="text-[16px]" style={{ color: '#4B5563' }}>{selectedWorkshop?.duration}</p>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold mb-1" style={{ color: '#265073' }}>Capacity</p>
                      <p className="text-[16px]" style={{ color: '#4B5563' }}>{selectedWorkshop?.capacity}</p>
                    </div>
                    {selectedWorkshop?.pricing && (
                      <div>
                        <p className="text-[14px] font-bold mb-1" style={{ color: '#265073' }}>Pricing</p>
                        <p className="text-[14px]" style={{ color: '#F59E0B' }}>{selectedWorkshop?.pricing}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[14px] font-bold mb-2" style={{ color: '#265073' }}>Topics Covered</p>
                      <ul className="space-y-1">
                        {selectedWorkshop?.topics.map((topic: string, index: number) => (
                          <li key={index} className="text-[14px] flex items-start gap-2" style={{ color: '#4B5563' }}>
                            <span style={{ color: '#2D9596' }}>•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold mb-1" style={{ color: '#265073' }}>Requirements</p>
                      <p className="text-[14px]" style={{ color: '#4B5563' }}>{selectedWorkshop?.requirements}</p>
                    </div>
                    {selectedWorkshop?.materials && (
                      <div>
                        <p className="text-[14px] font-bold mb-1" style={{ color: '#265073' }}>Materials</p>
                        <p className="text-[14px]" style={{ color: '#4B5563' }}>{selectedWorkshop?.materials}</p>
                      </div>
                    )}
                    {selectedWorkshop?.note && (
                      <div className="p-3 rounded-lg" style={{ background: '#F0F9FF', borderColor: '#0284C7', border: '1px solid' }}>
                        <p className="text-[13px]" style={{ color: '#0C4A6E' }}>
                          <strong>Note:</strong> {selectedWorkshop?.note}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}