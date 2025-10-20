import { ArrowLeft, BookOpen, Download, Video, FileText, AlertCircle, Phone, HelpCircle, Printer, Play, Clock, Award } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { CaregiverBottomNav } from './CaregiverBottomNav';

interface LearningResourcesCaregiverProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export function LearningResourcesCaregiver({ onBack, onNavigate }: LearningResourcesCaregiverProps) {
  const [activeTab, setActiveTab] = useState('quick-guides');

  // A. Quick Reference Guides (Downloadable & Printable)
  const quickGuides = [
    { 
      title: 'Password Manager Setup', 
      description: 'Step-by-step guide to setting up and using a password manager',
      pages: 4,
      updated: 'October 2025'
    },
    { 
      title: 'Spotting Email & Text Scams', 
      description: 'Visual examples of common scams and red flags to watch for',
      pages: 6,
      updated: 'October 2025'
    },
    { 
      title: 'Video Calling Setup', 
      description: 'How to use FaceTime, WhatsApp, and Zoom for video calls',
      pages: 5,
      updated: 'September 2025'
    },
    { 
      title: 'Banking App Basics', 
      description: 'Safe mobile banking practices and common features',
      pages: 4,
      updated: 'October 2025'
    },
    { 
      title: 'Health Portal Navigation', 
      description: 'Accessing medical records, test results, and appointments online',
      pages: 5,
      updated: 'August 2025'
    },
    { 
      title: 'Photo Organization & Sharing', 
      description: 'Organizing photos and sharing them with family safely',
      pages: 3,
      updated: 'September 2025'
    },
    { 
      title: 'Social Media Privacy Settings', 
      description: 'Protecting privacy on Facebook and Instagram',
      pages: 7,
      updated: 'October 2025'
    },
    { 
      title: 'Email Organization 101', 
      description: 'Managing inbox, folders, and unsubscribing from unwanted emails',
      pages: 4,
      updated: 'September 2025'
    },
    { 
      title: 'Device Settings Overview', 
      description: 'Essential iPhone and Android settings for seniors',
      pages: 6,
      updated: 'October 2025'
    },
    { 
      title: 'Before Clicking Any Link', 
      description: 'Checklist to verify links are safe before clicking',
      pages: 2,
      updated: 'October 2025'
    },
  ];

  // B. Emergency Reference Cards
  const emergencyScenarios = [
    {
      title: 'They receive a suspicious call',
      steps: [
        'Don\'t share ANY personal information',
        'Hang up immediately',
        'Look up the organization\'s real number yourself',
        'Call back using the verified number',
        'Report the scam to Mālama support'
      ],
      urgency: 'high'
    },
    {
      title: 'They forgot their password',
      steps: [
        'Don\'t panic - this is very common',
        'Click "Forgot Password" on the login page',
        'Check their email for reset link',
        'Help them create a new, strong password',
        'Write it down in their password notebook'
      ],
      urgency: 'low'
    },
    {
      title: 'Their device won\'t turn on',
      steps: [
        'Check if it\'s plugged in and charging',
        'Try a different charging cable',
        'Hold power button for 10-15 seconds',
        'If tablet/phone, try charging for 30 minutes first',
        'Contact Mālama support if still not working'
      ],
      urgency: 'medium'
    },
    {
      title: 'They accidentally deleted something',
      steps: [
        'Check the Trash/Recently Deleted folder',
        'Most apps keep deleted items for 30 days',
        'For photos: Check "Recently Deleted" album',
        'For emails: Check "Trash" or "Deleted Items"',
        'Contact Mālama support for recovery help'
      ],
      urgency: 'medium'
    },
    {
      title: 'An app isn\'t working',
      steps: [
        'Close the app completely and reopen it',
        'Restart the device (turn off, then on)',
        'Check if internet connection is working',
        'Update the app if updates are available',
        'Contact Mālama support for further help'
      ],
      urgency: 'low'
    },
  ];

  const emergencyContacts = [
    { name: 'Mālama Support Hotline', number: '(808) 555-HELP', available: '24/7' },
    { name: 'Tech Emergency Line', number: '(808) 555-TECH', available: 'Mon-Sun 8am-10pm' },
    { name: 'Scam Reporting', number: '(808) 555-SCAM', available: '24/7' },
  ];

  const techTerminology = [
    { term: 'Browser', definition: 'The app you use to visit websites (Safari, Chrome, Edge)' },
    { term: 'App', definition: 'A program on your phone or tablet' },
    { term: 'Cloud', definition: 'Storage on the internet, not on your device' },
    { term: 'Password', definition: 'Secret code to access your accounts' },
    { term: 'Wi-Fi', definition: 'Wireless internet connection' },
    { term: 'Update', definition: 'Installing new improvements to apps or device' },
    { term: 'Download', definition: 'Saving something from internet to your device' },
    { term: 'Link', definition: 'Clickable text or button that takes you somewhere' },
    { term: 'Attachment', definition: 'File sent with an email' },
    { term: 'Notification', definition: 'Alert or message from an app' },
  ];

  // C. Video Tutorial Library
  const videoTutorials = [
    {
      title: 'Making Your First Video Call',
      duration: '4:30',
      difficulty: 'Beginner',
      category: 'Communication',
      description: 'Learn how to start a FaceTime or WhatsApp video call with family',
      thumbnail: 'video-call'
    },
    {
      title: 'Sending Photos to Family',
      duration: '3:45',
      difficulty: 'Beginner',
      category: 'Communication',
      description: 'Share your favorite photos through text messages and email',
      thumbnail: 'send-photos'
    },
    {
      title: 'Recognizing Phishing Emails',
      duration: '5:20',
      difficulty: 'Beginner',
      category: 'Safety',
      description: 'Identify fake emails that try to steal your information',
      thumbnail: 'phishing'
    },
    {
      title: 'Setting Up Two-Factor Authentication',
      duration: '4:50',
      difficulty: 'Intermediate',
      category: 'Safety',
      description: 'Add an extra layer of security to your important accounts',
      thumbnail: '2fa'
    },
    {
      title: 'Using Your Banking App Safely',
      duration: '5:10',
      difficulty: 'Intermediate',
      category: 'Banking',
      description: 'Check balances, transfer money, and pay bills on your phone',
      thumbnail: 'banking'
    },
    {
      title: 'Mobile Check Deposit',
      duration: '3:15',
      difficulty: 'Intermediate',
      category: 'Banking',
      description: 'Deposit checks using your phone camera',
      thumbnail: 'check-deposit'
    },
    {
      title: 'Accessing Your Health Portal',
      duration: '4:40',
      difficulty: 'Intermediate',
      category: 'Health',
      description: 'View test results, schedule appointments, and message your doctor',
      thumbnail: 'health-portal'
    },
    {
      title: 'Managing Prescription Refills Online',
      duration: '3:50',
      difficulty: 'Intermediate',
      category: 'Health',
      description: 'Request refills and track prescriptions through pharmacy apps',
      thumbnail: 'prescriptions'
    },
    {
      title: 'Streaming Movies and Shows',
      duration: '4:20',
      difficulty: 'Beginner',
      category: 'Entertainment',
      description: 'Watch content on Netflix, YouTube, and other platforms',
      thumbnail: 'streaming'
    },
    {
      title: 'Creating Photo Albums',
      duration: '4:00',
      difficulty: 'Intermediate',
      category: 'Entertainment',
      description: 'Organize photos into albums and create slideshows',
      thumbnail: 'photo-albums'
    },
    {
      title: 'Advanced Email Filtering',
      duration: '5:30',
      difficulty: 'Advanced',
      category: 'Communication',
      description: 'Set up rules to automatically organize incoming emails',
      thumbnail: 'email-filter'
    },
    {
      title: 'Smart Home Device Setup',
      duration: '5:45',
      difficulty: 'Advanced',
      category: 'Entertainment',
      description: 'Connect and control smart speakers, lights, and thermostats',
      thumbnail: 'smart-home'
    },
  ];

  // D. Teaching Tools for Caregivers
  const teachingTools = [
    {
      title: 'How to Help Without Taking Over',
      type: 'Guide',
      duration: '15 min read',
      description: 'Strategies for supporting independence while providing assistance',
      icon: BookOpen
    },
    {
      title: 'Patient Teaching Techniques',
      type: 'Video',
      duration: '12 min',
      description: 'Professional techniques for teaching technology to seniors',
      icon: Video
    },
    {
      title: 'Encouraging Independence with Technology',
      type: 'Guide',
      duration: '10 min read',
      description: 'Building confidence and self-sufficiency in tech use',
      icon: BookOpen
    },
    {
      title: 'Talking to Seniors About Scams',
      type: 'Guide',
      duration: '8 min read',
      description: 'How to have sensitive conversations about online safety',
      icon: BookOpen
    },
    {
      title: 'Setting Up Learning Sessions at Home',
      type: 'Video',
      duration: '10 min',
      description: 'Creating an effective learning environment and routine',
      icon: Video
    },
    {
      title: 'Progress Tracking Template',
      type: 'Worksheet',
      duration: 'Downloadable PDF',
      description: 'Track skills learned and goals achieved over time',
      icon: FileText
    },
  ];

  const handleDownload = (title: string) => {
    toast.success(`Downloading "${title}"`, {
      description: 'PDF will open in a new window for printing or saving'
    });
  };

  const handlePrint = (title: string) => {
    toast.success(`Preparing to print "${title}"`, {
      description: 'Print dialog will open shortly'
    });
  };

  const handlePlayVideo = (title: string) => {
    toast.success(`Loading "${title}"`, {
      description: 'Video player will open in a moment'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#16A34A';
      case 'Intermediate':
        return '#F59E0B';
      case 'Advanced':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return '#DC2626';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#16A34A';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline transition-all"
          style={{ color: '#2D9596' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl" style={{ color: '#265073' }}>
            Learning Resources
          </h1>
          <p className="mt-2 text-sm md:text-base" style={{ color: '#6B7280' }}>
            Comprehensive guides, videos, and tools to help your kūpuna thrive with technology
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-2 w-full overflow-x-auto" style={{ background: '#FFFFFF' }}>
            <TabsTrigger 
              value="quick-guides" 
              className="px-2 md:px-4 py-3 data-[state=active]:bg-[#2D9596] data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap"
            >
              <FileText className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Quick Guides</span>
              <span className="sm:hidden">Guides</span>
            </TabsTrigger>
            <TabsTrigger 
              value="emergency" 
              className="px-2 md:px-4 py-3 data-[state=active]:bg-[#2D9596] data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap"
            >
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Emergency Cards</span>
              <span className="sm:hidden">Emergency</span>
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="px-2 md:px-4 py-3 data-[state=active]:bg-[#2D9596] data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap"
            >
              <Video className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Video Library</span>
              <span className="sm:hidden">Videos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="teaching" 
              className="px-2 md:px-4 py-3 data-[state=active]:bg-[#2D9596] data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Teaching Tools</span>
              <span className="sm:hidden">Teaching</span>
            </TabsTrigger>
          </TabsList>

          {/* A. Quick Reference Guides */}
          <TabsContent value="quick-guides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Reference Guides</CardTitle>
                <CardDescription>
                  Downloadable and printable step-by-step guides. All documents are large-print and senior-friendly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {quickGuides.map((guide, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: '#E6F7F4' }}
                          >
                            <FileText className="w-6 h-6" style={{ color: '#2D9596' }} />
                          </div>
                          <div className="flex-1 min-w-0 w-full">
                            <h4 className="mb-2 text-base md:text-lg break-words" style={{ color: '#265073' }}>
                              {guide.title}
                            </h4>
                            <p className="mb-3 text-sm md:text-base break-words" style={{ color: '#6B7280' }}>
                              {guide.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs md:text-sm" style={{ color: '#6B7280' }}>
                              <span>{guide.pages} pages</span>
                              <span>•</span>
                              <span className="break-words">Updated {guide.updated}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 w-full">
                              <Button
                                onClick={() => handleDownload(guide.title)}
                                className="flex-1 hover:text-white transition-colors text-sm md:text-base whitespace-nowrap"
                                style={{ background: '#2D9596', color: '#FFFFFF' }}
                              >
                                <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span className="truncate">Download PDF</span>
                              </Button>
                              <Button
                                onClick={() => handlePrint(guide.title)}
                                variant="outline"
                                className="flex-1 hover:bg-[#2D9596] hover:text-white hover:border-[#2D9596] transition-colors text-sm md:text-base whitespace-nowrap"
                              >
                                <Printer className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span className="truncate">Print</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* B. Emergency Reference Cards */}
          <TabsContent value="emergency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>"What to Do If..." Scenarios</CardTitle>
                <CardDescription>
                  Quick action cards for common tech emergencies. Print these and keep them near their device!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {emergencyScenarios.map((scenario, index) => (
                    <Card 
                      key={index}
                      className="border-2"
                      style={{ borderColor: getUrgencyColor(scenario.urgency) }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <AlertCircle 
                            className="w-6 h-6 flex-shrink-0 mt-1" 
                            style={{ color: getUrgencyColor(scenario.urgency) }}
                          />
                          <h4 style={{ color: '#265073' }}>
                            {scenario.title}
                          </h4>
                        </div>
                        <ol className="space-y-2 mb-4 list-decimal list-inside">
                          {scenario.steps.map((step, stepIndex) => (
                            <li key={stepIndex} style={{ fontSize: '16px', color: '#2D3436' }}>
                              {step}
                            </li>
                          ))}
                        </ol>
                        <Button
                          onClick={() => handlePrint(`Emergency Card: ${scenario.title}`)}
                          variant="outline"
                          className="w-full hover:bg-[#2D9596] hover:text-white hover:border-[#2D9596] transition-colors"
                        >
                          <Printer className="w-4 h-4 mr-2" />
                          Print Card
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact Card</CardTitle>
                  <CardDescription>
                    Keep this list near their device for quick access to help
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg flex items-center justify-between"
                      style={{ background: '#F9FAFB', border: '2px solid #E5E7EB' }}
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" style={{ color: '#2D9596' }} />
                        <div>
                          <p style={{ color: '#265073' }}>
                            {contact.name}
                          </p>
                          <p style={{ fontSize: '20px', color: '#2D9596' }}>
                            {contact.number}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{contact.available}</Badge>
                    </div>
                  ))}
                  <Button
                    onClick={() => handlePrint('Emergency Contact Card')}
                    className="w-full hover:text-white transition-colors"
                    style={{ background: '#2D9596', color: '#FFFFFF' }}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Contact Card
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tech Terminology Glossary</CardTitle>
                  <CardDescription>
                    Common tech terms explained in plain language
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                  {techTerminology.map((item, index) => (
                    <div key={index} className="pb-3 border-b border-gray-200 last:border-0">
                      <p className="mb-1" style={{ color: '#2D9596' }}>
                        {item.term}
                      </p>
                      <p style={{ fontSize: '16px', color: '#6B7280' }}>
                        {item.definition}
                      </p>
                    </div>
                  ))}
                  <Button
                    onClick={() => handleDownload('Tech Terminology Glossary')}
                    className="w-full mt-4 hover:text-white transition-colors"
                    style={{ background: '#2D9596', color: '#FFFFFF' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Glossary
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* C. Video Tutorial Library */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorial Library</CardTitle>
                <CardDescription>
                  Short, focused instructional videos organized by topic and difficulty level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {videoTutorials.map((video, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        {/* Video Thumbnail */}
                        <div 
                          className="w-full h-40 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                          style={{ background: 'linear-gradient(135deg, #2D9596 0%, #265073 100%)' }}
                        >
                          <Play className="w-12 h-12 text-white opacity-80" />
                          <div className="absolute top-2 right-2">
                            <Badge 
                              style={{ 
                                background: getDifficultyColor(video.difficulty),
                                color: 'white'
                              }}
                            >
                              {video.difficulty}
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {video.duration}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Badge variant="secondary" className="mb-2">
                              {video.category}
                            </Badge>
                            <h4 className="mb-2" style={{ color: '#265073' }}>
                              {video.title}
                            </h4>
                            <p style={{ fontSize: '16px', color: '#6B7280' }}>
                              {video.description}
                            </p>
                          </div>

                          <Button
                            onClick={() => handlePlayVideo(video.title)}
                            className="w-full hover:text-white transition-colors"
                            style={{ background: '#2D9596', color: '#FFFFFF' }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch Video
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* D. Teaching Tools for Caregivers */}
          <TabsContent value="teaching" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Tools for Caregivers</CardTitle>
                <CardDescription>
                  Professional resources to help you become a more effective tech teacher
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {teachingTools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div 
                              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: '#E6F7F4' }}
                            >
                              <Icon className="w-7 h-7" style={{ color: '#2D9596' }} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{tool.type}</Badge>
                                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                  {tool.duration}
                                </span>
                              </div>
                              <h4 className="mb-2" style={{ color: '#265073' }}>
                                {tool.title}
                              </h4>
                              <p className="mb-4" style={{ fontSize: '16px', color: '#6B7280' }}>
                                {tool.description}
                              </p>
                              <Button
                                onClick={() => {
                                  if (tool.type === 'Video') {
                                    handlePlayVideo(tool.title);
                                  } else {
                                    handleDownload(tool.title);
                                  }
                                }}
                                className="w-full hover:text-white transition-colors"
                                style={{ background: '#2D9596', color: '#FFFFFF' }}
                              >
                                {tool.type === 'Video' ? (
                                  <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Watch Video
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-4 h-4 mr-2" />
                                    {tool.type === 'Worksheet' ? 'Download Template' : 'Read Guide'}
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card style={{ background: '#F1FADA', border: '2px solid #9AD0C2' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Award className="w-8 h-8 flex-shrink-0" style={{ color: '#2D9596' }} />
                  <div>
                    <h4 className="mb-2" style={{ color: '#265073' }}>
                      Caregiver Certification Program
                    </h4>
                    <p className="mb-4" style={{ color: '#2D3436' }}>
                      Complete our comprehensive training program to become a certified Mālama Tech Educator. 
                      Learn advanced teaching techniques, gain deeper technical knowledge, and join our community of caregivers.
                    </p>
                    <Button style={{ background: '#265073' }}>
                      Learn About Certification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      {onNavigate && (
        <CaregiverBottomNav currentView="resources" onNavigate={onNavigate} />
      )}
    </div>
  );
}