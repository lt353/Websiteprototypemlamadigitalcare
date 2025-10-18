import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Users, Clock, List, AlertCircle, DollarSign } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';

interface ScheduleWorkshopProps {
  onBack: () => void;
  onSuccess: (workshopData: any) => void;
}

export function ScheduleWorkshop({ onBack, onSuccess }: ScheduleWorkshopProps) {
  const [step, setStep] = useState(1);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [workshopType, setWorkshopType] = useState<'free' | 'paid'>('free');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [expectedAttendance, setExpectedAttendance] = useState('');

  const freeWorkshops = [
    { 
      id: 'scams', 
      title: 'Spotting Scams & Staying Safe', 
      duration: '90 minutes',
      price: 'FREE',
      difficulty: 'Beginner',
      capacity: '30 residents',
      minEnrollment: 'No minimum',
      description: 'Learn to identify common scams targeting seniors, including phone scams, email phishing, and fake tech support.',
      topics: ['Phone scams', 'Email phishing', 'Fake tech support', 'Social engineering tactics'],
      prerequisites: 'None',
      bestFor: ['All residents', 'Those concerned about security', 'Anyone who gets suspicious calls/emails', 'Family members of seniors'],
      materials: ['Notebook for taking notes', 'Examples of suspicious messages (optional)', 'Reading glasses if needed'],
      takeHome: ['Scam warning signs checklist (large print)', 'Phone scam script examples', 'What to do if scammed guide', 'Important phone numbers card'],
      instructor: 'Tea Araki',
      type: 'free'
    },
    { 
      id: 'email-scams', 
      title: 'Recognizing Email & Text Scams', 
      duration: '90 minutes',
      price: 'FREE',
      difficulty: 'Beginner',
      capacity: '25 residents',
      minEnrollment: 'No minimum',
      description: 'Deep dive into email and text message scams with real examples and hands-on practice identifying red flags.',
      topics: ['Phishing emails', 'Suspicious links', 'Fake invoices', 'Urgent requests'],
      prerequisites: 'Email account (we can help set one up)',
      bestFor: ['Residents who use email', 'Those receiving suspicious messages', 'Anyone wanting to verify email safety', 'Caregivers of email users'],
      materials: ['Email access on phone/tablet/laptop', 'Examples of suspicious emails', 'Notebook for notes'],
      takeHome: ['Email scam identification guide', 'Safe link checking instructions', 'Report phishing guide', 'Email security checklist'],
      instructor: 'Tea Araki',
      type: 'free'
    },
    { 
      id: 'phone-scams', 
      title: 'Phone Scam Tactics & Protection', 
      duration: '90 minutes',
      price: 'FREE',
      difficulty: 'Beginner',
      capacity: '30 residents',
      minEnrollment: 'No minimum',
      description: 'Understand how phone scammers operate and learn strategies to protect yourself and your information.',
      topics: ['IRS scams', 'Social Security scams', 'Tech support scams', 'Grandparent scams'],
      prerequisites: 'None',
      bestFor: ['Anyone who answers their phone', 'Those receiving suspicious calls', 'Residents concerned about phone fraud', 'All senior residents'],
      materials: ['Phone for practice scenarios', 'List of legitimate phone numbers', 'Notebook for notes'],
      takeHome: ['Phone scam warning signs', 'Script for handling suspicious calls', 'Who to call if scammed', 'Caller ID tips'],
      instructor: 'Tea Araki',
      type: 'free'
    },
    { 
      id: 'social-media', 
      title: 'Social Media Safety & Scams', 
      duration: '90 minutes',
      price: 'FREE',
      difficulty: 'Beginner',
      capacity: '20 residents',
      minEnrollment: 'No minimum',
      description: 'Stay safe on Facebook, Instagram, and other social platforms. Learn privacy settings and how to spot fake profiles.',
      topics: ['Privacy settings', 'Fake friend requests', 'Marketplace scams', 'Quiz scams'],
      prerequisites: 'Facebook or social media account',
      bestFor: ['Facebook users', 'Those connecting with family online', 'Residents on social media', 'Anyone sharing photos online'],
      materials: ['Phone/tablet with social media app', 'Login information', 'Notebook for notes'],
      takeHome: ['Privacy settings guide', 'Fake profile warning signs', 'Safe sharing guidelines', 'Family connection tips'],
      instructor: 'Lindsay Trenton',
      type: 'free'
    },
  ];

  const paidClasses = [
    { 
      id: 'iphone', 
      title: 'iPhone Basics', 
      duration: '45 minutes', 
      price: '$15/person',
      difficulty: 'Beginner',
      capacity: '8-15 residents',
      minEnrollment: '8 residents',
      description: 'Master the fundamentals of using an iPhone with confidence. This hands-on class covers everything from basic navigation to essential features, perfect for first-time iPhone users or those wanting to feel more comfortable with their device.',
      topics: ['Navigating the iPhone home screen and apps', 'Making and receiving phone calls', 'Sending text messages and iMessages', 'Taking, viewing, and sharing photos', 'Managing apps and notifications', 'Using Siri voice assistant', 'Adjusting basic settings (volume, brightness, Wi-Fi)', 'Troubleshooting common issues'],
      prerequisites: 'None',
      bestFor: ['Residents new to iPhones', 'Those switching from other phones', 'Seniors wanting basic phone skills', 'Anyone feeling overwhelmed by their device'],
      materials: ['iPhone (any model)', 'Charger', 'Apple ID login (we can help create one)', 'Notebook for notes'],
      takeHome: ['iPhone quick reference guide (large print)', 'Common gestures cheat sheet', 'Troubleshooting tips card', 'List of helpful built-in apps'],
      instructor: 'Lindsay Trenton',
      pricing: '• $15/resident (1-9 residents)\n• $12/resident (10-14 residents - 20% discount)\n• $10/resident (15 residents - 33% discount)',
      type: 'paid'
    },
    { 
      id: 'video-calling', 
      title: 'Video Calling Basics', 
      duration: '45 minutes', 
      price: '$15/person',
      difficulty: 'Beginner',
      capacity: '8-15 residents',
      minEnrollment: '8 residents',
      description: 'Learn to connect face-to-face with family and friends using video calling. This class teaches FaceTime and Zoom basics, helping you stay connected with loved ones near and far through the power of video technology.',
      topics: ['Setting up FaceTime on iPhone/iPad', 'Making your first video call', 'Using Zoom for group calls', 'Managing camera and microphone', 'Best practices for lighting and positioning', 'Adding contacts for easy calling', 'Troubleshooting video/audio issues', 'Screen sharing basics'],
      prerequisites: 'Basic familiarity with smartphone or tablet (iPhone Basics class helpful but not required)',
      bestFor: ['Residents wanting to see grandchildren', 'Those with family on other islands/mainland', 'Seniors tired of phone-only conversations', 'Anyone wanting face-to-face connection'],
      materials: ['iPhone, iPad, or laptop with camera', 'Device fully charged', 'Wi-Fi password (we\'ll help connect)', 'List of family contacts to practice with'],
      takeHome: ['Video calling setup guide', 'Troubleshooting checklist', 'Lighting and positioning tips', 'Contact management instructions'],
      instructor: 'DJ',
      pricing: '• $15/resident (1-9 residents)\n• $12/resident (10-14 residents)\n• $10/resident (15 residents)',
      type: 'paid'
    },
    { 
      id: 'password', 
      title: 'Password Management & Security', 
      duration: '90 minutes', 
      price: '$25/person',
      difficulty: 'Intermediate',
      capacity: '8-12 residents',
      minEnrollment: '8 residents',
      description: 'Take control of your online security with password management tools and best practices. Learn how to create, store, and organize passwords safely so you never get locked out of important accounts again.',
      topics: ['Why password managers are safe and necessary', 'How password managers work', 'Setting up a password manager (LastPass or 1Password)', 'Creating strong, unique passwords', 'Organizing passwords by category', 'Using your password manager on multiple devices', 'Secure password recovery methods', 'Introduction to two-factor authentication', 'What to do if you forget your master password'],
      prerequisites: 'Comfortable using computer, tablet, or smartphone. Active email account. Basic understanding of online accounts.',
      bestFor: ['Residents with many online accounts', 'Those who forget passwords frequently', 'Seniors concerned about account security', 'Anyone using the same password everywhere (not safe!)'],
      materials: ['Laptop, tablet, or smartphone', 'List of important accounts to organize', 'Email access for setup', 'Notebook for notes'],
      takeHome: ['Password manager setup guide', 'Password strength guidelines', 'Account recovery worksheet', 'Security best practices checklist', 'Emergency access instructions'],
      instructor: 'Tea Araki',
      pricing: '• $25/resident (1-9 residents)\n• $22/resident (10-11 residents)\n• $20/resident (12 residents)',
      note: 'This is a longer class (90 min) with hands-on setup time for each resident.',
      type: 'paid'
    },
    { 
      id: 'banking', 
      title: 'Online Banking Basics', 
      duration: '60 minutes', 
      price: '$20/person',
      difficulty: 'Beginner to Intermediate',
      capacity: '8-15 residents',
      minEnrollment: '8 residents',
      description: 'Learn to manage your finances online safely and confidently. This class covers how to access your bank accounts, check balances, transfer money, and recognize banking scams—all from the comfort of your home.',
      topics: ['Accessing your bank\'s website or mobile app', 'Checking account balances and transaction history', 'Transferring money between accounts', 'Setting up bill pay and automatic payments', 'Viewing and downloading statements', 'Recognizing banking scams and phishing', 'Protecting your login information', 'What to do if something looks wrong', 'Contacting your bank securely'],
      prerequisites: 'Active bank account with online banking available. Basic computer or smartphone skills. Password Management class recommended.',
      bestFor: ['Residents wanting convenience of online banking', 'Those tired of going to bank branches', 'Seniors wanting to monitor finances independently', 'Anyone concerned about banking security'],
      materials: ['Laptop or tablet (preferred over phone for learning)', 'Bank account number and routing number', 'Online banking login (or we\'ll help you set it up)', 'Bank\'s customer service number', 'Notebook for notes'],
      takeHome: ['Online banking quick reference guide', 'Security checklist', 'Scam warning signs guide', 'Bank contact information card', 'Transaction monitoring tips'],
      instructor: 'Lindsay Trenton',
      pricing: '• $20/resident (1-9 residents)\n• $18/resident (10-14 residents)\n• $15/resident (15 residents)',
      note: 'Important: We never ask for your password, PIN, or full account numbers during class. You maintain complete control of your accounts at all times.',
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
      attendance: expectedAttendance
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
            {/* STEP 1: Workshop Selection */}
            <div className="mb-8">
              <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
                Schedule a Workshop or Class
              </h1>
              <p className="text-[18px]" style={{ color: '#6B7280' }}>
                Choose from free workshops or paid classes for your community
              </p>
            </div>

            <Tabs value={workshopType} onValueChange={(value: any) => setWorkshopType(value)}>
              <TabsList className="mb-8">
                <TabsTrigger value="free" className="text-[18px] px-6 py-3">
                  Free Workshops
                </TabsTrigger>
                <TabsTrigger value="paid" className="text-[18px] px-6 py-3">
                  Paid Classes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="free">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
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
                              <p className="text-[22px] font-bold mb-2" style={{ color: '#265073' }}>
                                {workshop.title}
                              </p>
                              <div className="flex items-center gap-4 text-[14px] mb-2" style={{ color: '#6B7280' }}>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {workshop.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  Max {workshop.capacity.split(' ')[0]}
                                </div>
                              </div>
                              <p className="text-[16px] mb-3" style={{ color: '#4B5563' }}>
                                {workshop.description}
                              </p>
                            </div>
                            <Badge className="text-[16px] px-3 py-1 ml-4" style={{ background: '#D1FAE5', color: '#065F46' }}>
                              FREE
                            </Badge>
                          </div>
                          <Button 
                            className="w-full h-12"
                            style={{ background: '#2D9596', color: '#FFFFFF' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWorkshopSelect(workshop);
                            }}
                          >
                            Select This Workshop
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Details Sidebar */}
                  <div className="md:col-span-1">
                    <Card className="sticky top-8" style={{ borderColor: '#E5E7EB' }}>
                      <CardContent className="p-6 text-center">
                        <p className="text-[16px]" style={{ color: '#6B7280' }}>
                          Click any workshop to see full details and schedule
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paid">
                <div className="grid md:grid-cols-2 gap-6">
                  {paidClasses.map((classItem) => (
                    <Card 
                      key={classItem.id} 
                      className="cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => handleWorkshopSelect(classItem)}
                    >
                      <CardContent className="p-6">
                        <div className="mb-3">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-[20px] font-bold" style={{ color: '#265073' }}>
                              {classItem.title}
                            </p>
                            <Badge style={{ background: '#E0F2FE', color: '#0284C7' }}>
                              {classItem.price}
                            </Badge>
                          </div>
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
            {/* STEP 2: Details & Booking (NO TABS) */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Badge style={{ background: selectedWorkshop?.type === 'free' ? '#D1FAE5' : '#E0F2FE', color: selectedWorkshop?.type === 'free' ? '#065F46' : '#0284C7' }}>
                  {selectedWorkshop?.type === 'free' ? 'FREE Workshop' : 'Paid Class'}
                </Badge>
                <h1 className="text-[36px] font-bold" style={{ color: '#265073' }}>
                  {selectedWorkshop?.title}
                </h1>
              </div>
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
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="h-14 text-[16px]">
                          <SelectValue placeholder="Select time..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10am">10:00 AM - 11:30 AM</SelectItem>
                          <SelectItem value="2pm">2:00 PM - 3:30 PM</SelectItem>
                          <SelectItem value="530pm">5:30 PM - 7:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[18px]">Expected Attendance</Label>
                      <Input 
                        type="number"
                        max={selectedWorkshop?.capacity.split('-')[1]?.split(' ')[0] || '30'}
                        value={expectedAttendance}
                        onChange={(e) => setExpectedAttendance(e.target.value)}
                        placeholder={`Max ${selectedWorkshop?.capacity}`}
                        className="h-14 text-[16px]"
                      />
                      {selectedWorkshop?.minEnrollment !== 'No minimum' && (
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>
                          Minimum enrollment: {selectedWorkshop?.minEnrollment}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleBackToSelection} 
                    variant="outline" 
                    className="flex-1 h-16 text-[18px]"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!date || !time || !expectedAttendance}
                    className="flex-1 h-16 text-[18px]"
                    style={{ 
                      background: (!date || !time || !expectedAttendance) ? '#9CA3AF' : '#2D9596', 
                      color: '#FFFFFF',
                      cursor: (!date || !time || !expectedAttendance) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Confirm {selectedWorkshop?.type === 'free' ? 'Workshop' : 'Class'}
                  </Button>
                </div>
              </div>

              {/* Full Details Panel */}
              <div className="md:col-span-1">
                <Card className="sticky top-8" style={{ borderColor: '#2D9596', borderWidth: '2px' }}>
                  <CardHeader style={{ background: '#E6F7F4' }}>
                    <CardTitle className="text-[20px]">
                      {selectedWorkshop?.type === 'free' ? 'Workshop' : 'Class'} Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="font-bold text-[14px] mb-1" style={{ color: '#265073' }}>Description:</p>
                      <p className="text-[14px]" style={{ color: '#4B5563' }}>{selectedWorkshop?.description}</p>
                    </div>

                    <div>
                      <p className="font-bold text-[14px] mb-2 flex items-center gap-2" style={{ color: '#265073' }}>
                        <List className="w-4 h-4" />
                        Topics Covered:
                      </p>
                      <ul className="space-y-1">
                        {selectedWorkshop?.topics.map((topic: string, i: number) => (
                          <li key={i} className="text-[14px] flex items-start gap-2" style={{ color: '#4B5563' }}>
                            <span style={{ color: '#2D9596' }}>•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedWorkshop?.bestFor && (
                      <div>
                        <p className="font-bold text-[14px] mb-2" style={{ color: '#265073' }}>Best For:</p>
                        <ul className="space-y-1">
                          {selectedWorkshop.bestFor.slice(0, 3).map((item: string, i: number) => (
                            <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: '#4B5563' }}>
                              <span style={{ color: '#2D9596' }}>•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-[14px] mb-2 flex items-center gap-2" style={{ color: '#265073' }}>
                        <AlertCircle className="w-4 h-4" />
                        Prerequisites:
                      </p>
                      <p className="text-[14px]" style={{ color: '#4B5563' }}>{selectedWorkshop?.prerequisites}</p>
                    </div>

                    {selectedWorkshop?.type === 'paid' && (
                      <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                        <p className="font-bold text-[14px] mb-2 flex items-center gap-2" style={{ color: '#265073' }}>
                          <DollarSign className="w-4 h-4" />
                          Pricing:
                        </p>
                        <div className="text-[13px] whitespace-pre-line" style={{ color: '#4B5563' }}>
                          {selectedWorkshop?.pricing}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                      <div className="flex items-center justify-between text-[14px] mb-2">
                        <span style={{ color: '#6B7280' }}>Duration:</span>
                        <span className="font-bold" style={{ color: '#265073' }}>{selectedWorkshop?.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-[14px] mb-2">
                        <span style={{ color: '#6B7280' }}>Capacity:</span>
                        <span className="font-bold" style={{ color: '#265073' }}>{selectedWorkshop?.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between text-[14px]">
                        <span style={{ color: '#6B7280' }}>Instructor:</span>
                        <span className="font-bold" style={{ color: '#265073' }}>{selectedWorkshop?.instructor}</span>
                      </div>
                    </div>
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
