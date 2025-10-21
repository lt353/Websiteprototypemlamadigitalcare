import { useState } from 'react';
import { BookOpen, Video, FileText, CheckSquare, Play, AlertCircle, Phone, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';

interface LearningLibraryPageProps {
  onBack: () => void;
}

export function LearningLibraryPage({ onBack }: LearningLibraryPageProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);

  const allResources = [
    // VIDEOS
    {
      type: 'video',
      title: 'How to Spot a Phishing Email',
      duration: '5 minutes',
      difficulty: 'Beginner',
      category: 'Safety',
      description: 'Learn the warning signs of fake emails and protect yourself from scams',
      content: 'This video covers: Red flags in email addresses, urgent language tactics, suspicious links, grammar mistakes, and requests for personal information.'
    },
    {
      type: 'video',
      title: 'iPhone Basics: Getting Started',
      duration: '12 minutes',
      difficulty: 'Beginner',
      category: 'Communication',
      description: 'Master the essential features of your iPhone',
      content: 'Learn how to navigate your iPhone, make calls, send texts, take photos, and adjust settings.'
    },
    {
      type: 'video',
      title: 'Setting Up Two-Factor Authentication',
      duration: '8 minutes',
      difficulty: 'Intermediate',
      category: 'Safety',
      description: 'Add an extra layer of security to your accounts',
      content: 'Step-by-step guide to enabling 2FA on email, banking, and social media accounts.'
    },
    {
      type: 'video',
      title: 'Zoom Basics for Video Calls',
      duration: '10 minutes',
      difficulty: 'Beginner',
      category: 'Communication',
      description: 'Connect with family and friends through video chat',
      content: 'Learn to join meetings, use mute/unmute, turn your camera on/off, and share your screen.'
    },
    {
      type: 'video',
      title: 'Organizing Your Photos',
      duration: '15 minutes',
      difficulty: 'Beginner',
      category: 'Entertainment',
      description: 'Keep your memories organized and easy to find',
      content: 'Create albums, delete duplicates, back up to cloud storage, and share with family.'
    },
    {
      type: 'video',
      title: 'Making Your First Video Call',
      duration: '4 minutes',
      difficulty: 'Beginner',
      category: 'Communication',
      description: 'Learn how to start a FaceTime or WhatsApp video call with family',
      content: 'Step-by-step instructions for making video calls on FaceTime and WhatsApp. Learn how to answer calls, adjust audio and video settings, and troubleshoot common issues.'
    },
    {
      type: 'video',
      title: 'Sending Photos to Family',
      duration: '4 minutes',
      difficulty: 'Beginner',
      category: 'Communication',
      description: 'Share your favorite photos through text messages and email',
      content: 'Learn multiple ways to share photos: text messages, email, and photo sharing apps. Includes tips on selecting multiple photos and adding captions.'
    },
    {
      type: 'video',
      title: 'Using Your Banking App Safely',
      duration: '5 minutes',
      difficulty: 'Intermediate',
      category: 'Banking',
      description: 'Check balances, transfer money, and pay bills on your phone',
      content: 'Complete guide to mobile banking safety: checking account balances, transferring money between accounts, paying bills online, and recognizing secure banking practices.'
    },
    {
      type: 'video',
      title: 'Mobile Check Deposit',
      duration: '3 minutes',
      difficulty: 'Intermediate',
      category: 'Banking',
      description: 'Deposit checks using your phone camera',
      content: 'Learn how to deposit checks remotely using your banking app. Includes proper lighting, positioning, and what to do with the check after depositing.'
    },
    {
      type: 'video',
      title: 'Accessing Your Health Portal',
      duration: '5 minutes',
      difficulty: 'Intermediate',
      category: 'Health',
      description: 'View test results, schedule appointments, and message your doctor',
      content: 'Navigate your healthcare provider\'s online portal to view medical records, test results, upcoming appointments, and communicate securely with your healthcare team.'
    },
    {
      type: 'video',
      title: 'Managing Prescription Refills Online',
      duration: '4 minutes',
      difficulty: 'Intermediate',
      category: 'Health',
      description: 'Request refills and track prescriptions through pharmacy apps',
      content: 'Use your pharmacy\'s app or website to request prescription refills, check medication status, set up auto-refill, and receive notifications when prescriptions are ready.'
    },
    {
      type: 'video',
      title: 'Streaming Movies and Shows',
      duration: '4 minutes',
      difficulty: 'Beginner',
      category: 'Entertainment',
      description: 'Watch content on Netflix, YouTube, and other platforms',
      content: 'Get started with streaming services: creating accounts, browsing content, using search features, creating watchlists, and adjusting playback settings like subtitles and quality.'
    },
    {
      type: 'video',
      title: 'Creating Photo Albums',
      duration: '4 minutes',
      difficulty: 'Intermediate',
      category: 'Entertainment',
      description: 'Organize photos into albums and create slideshows',
      content: 'Organize your photos by creating albums and folders. Learn to create custom albums, add and remove photos, create slideshows, and share albums with family.'
    },
    {
      type: 'video',
      title: 'Advanced Email Filtering',
      duration: '6 minutes',
      difficulty: 'Advanced',
      category: 'Communication',
      description: 'Set up rules to automatically organize incoming emails',
      content: 'Create email filters and rules to automatically sort incoming messages into folders, flag important emails, and reduce inbox clutter.'
    },
    {
      type: 'video',
      title: 'Smart Home Device Setup',
      duration: '6 minutes',
      difficulty: 'Advanced',
      category: 'Entertainment',
      description: 'Connect and control smart speakers, lights, and thermostats',
      content: 'Introduction to smart home technology: setting up smart speakers like Alexa or Google Home, connecting smart lights and thermostats, and using voice commands.'
    },

    // GUIDES
    {
      type: 'guide',
      title: 'Password Manager Setup Guide',
      pages: '4 pages',
      difficulty: 'Intermediate',
      description: 'Step-by-step guide to setting up and using a password manager',
      content: 'Complete guide to choosing and setting up a password manager like LastPass or 1Password. Learn to store passwords securely, generate strong passwords, and access them across devices.'
    },
    {
      type: 'guide',
      title: 'Facebook Privacy Settings',
      pages: '6 pages',
      difficulty: 'Beginner',
      description: 'Control who sees your posts and personal information',
      content: 'Step-by-step instructions with screenshots to adjust your Facebook privacy settings. Control who can see your posts, contact you, and find you on the platform.'
    },
    {
      type: 'guide',
      title: 'Email Organization 101',
      pages: '4 pages',
      difficulty: 'Beginner',
      description: 'Managing inbox, folders, and unsubscribing from unwanted emails',
      content: 'Learn to create folders, set up filters, unsubscribe from unwanted emails, and manage spam. Keep your inbox organized and find important messages quickly.'
    },
    {
      type: 'guide',
      title: 'Online Banking Safety Tips',
      pages: '12 pages',
      difficulty: 'Intermediate',
      description: 'Bank online with confidence and security',
      content: 'Best practices for secure online banking, recognizing fake bank websites, and protecting your accounts from fraud and scams.'
    },
    {
      type: 'guide',
      title: 'Spotting Email & Text Scams',
      pages: '6 pages',
      difficulty: 'Beginner',
      description: 'Visual examples of common scams and red flags to watch for',
      content: 'Learn to identify phishing emails, text message scams, and fraudulent requests. Includes real examples of scam messages and what to look for before responding or clicking.'
    },
    {
      type: 'guide',
      title: 'Video Calling Setup',
      pages: '5 pages',
      difficulty: 'Beginner',
      description: 'How to use FaceTime, WhatsApp, and Zoom for video calls',
      content: 'Complete setup instructions for popular video calling apps: FaceTime for iPhone users, WhatsApp for cross-platform calls, and Zoom for group meetings.'
    },
    {
      type: 'guide',
      title: 'Banking App Basics',
      pages: '4 pages',
      difficulty: 'Intermediate',
      description: 'Safe mobile banking practices and common features',
      content: 'Introduction to mobile banking apps: downloading and setting up your bank\'s app, understanding common features, security best practices, and troubleshooting tips.'
    },
    {
      type: 'guide',
      title: 'Health Portal Navigation',
      pages: '5 pages',
      difficulty: 'Intermediate',
      description: 'Accessing medical records, test results, and appointments online',
      content: 'Navigate your healthcare provider\'s patient portal to view test results, download medical records, schedule appointments, request prescription refills, and message your care team.'
    },
    {
      type: 'guide',
      title: 'Photo Organization & Sharing',
      pages: '3 pages',
      difficulty: 'Beginner',
      description: 'Organizing photos and sharing them with family safely',
      content: 'Learn to organize photos on your device, create albums, back up photos to the cloud, and share photos with family through various methods.'
    },
    {
      type: 'guide',
      title: 'Social Media Privacy Settings',
      pages: '7 pages',
      difficulty: 'Intermediate',
      description: 'Protecting privacy on Facebook and Instagram',
      content: 'Comprehensive guide to privacy settings on major social media platforms. Control who sees your content, manage friend requests, and protect your personal information.'
    },
    {
      type: 'guide',
      title: 'Device Settings Overview',
      pages: '6 pages',
      difficulty: 'Beginner',
      description: 'Essential iPhone and Android settings for seniors',
      content: 'Guide to the most important device settings: accessibility features, text size, brightness, notifications, battery management, and storage. Includes sections for both iPhone and Android.'
    },

    // CHECKLISTS
    {
      type: 'checklist',
      title: 'Before Clicking Any Link',
      pages: '2 pages',
      difficulty: 'Beginner',
      description: 'Checklist to verify links are safe before clicking',
      content: 'Printable checklist: Hover over links to see the real destination, check the URL for misspellings, verify the sender, look for HTTPS, and trust your instincts if something feels wrong.'
    },
    {
      type: 'checklist',
      title: 'Daily Device Care Routine',
      pages: '2 pages',
      difficulty: 'Beginner',
      description: 'Keep your devices running smoothly',
      content: 'Daily and weekly maintenance tasks: Close unused apps, clear browser cache, check for updates, backup important files, and monitor storage space.'
    },
    {
      type: 'checklist',
      title: 'Account Security Checklist',
      pages: '1 page',
      difficulty: 'Intermediate',
      description: 'Ensure all your accounts are properly secured',
      content: 'Security checklist: Strong unique passwords for each account, two-factor authentication enabled, up-to-date recovery email and phone number, review recent login activity.'
    },

    // EMERGENCY CARDS
    {
      type: 'emergency',
      title: 'What to Do: Suspicious Call',
      pages: '1 page',
      difficulty: 'Beginner',
      urgency: 'high',
      description: 'Quick action steps if you receive a suspicious phone call',
      content: 'Emergency steps: 1) Don\'t share ANY personal information, 2) Hang up immediately, 3) Look up the organization\'s real number yourself, 4) Call back using the verified number, 5) Report the scam to Mālama support.'
    },
    {
      type: 'emergency',
      title: 'What to Do: Forgot Password',
      pages: '1 page',
      difficulty: 'Beginner',
      urgency: 'low',
      description: 'Simple steps to recover a forgotten password',
      content: 'Emergency steps: 1) Don\'t panic - this is very common, 2) Click "Forgot Password" on the login page, 3) Check your email for reset link, 4) Create a new, strong password, 5) Write it down in your password notebook.'
    },
    {
      type: 'emergency',
      title: 'What to Do: Device Won\'t Turn On',
      pages: '1 page',
      difficulty: 'Beginner',
      urgency: 'medium',
      description: 'Troubleshooting steps when your device won\'t power on',
      content: 'Emergency steps: 1) Check if it\'s plugged in and charging, 2) Try a different charging cable, 3) Hold power button for 10-15 seconds, 4) If tablet/phone, try charging for 30 minutes first, 5) Contact Mālama support if still not working.'
    },
    {
      type: 'emergency',
      title: 'What to Do: Accidentally Deleted Something',
      pages: '1 page',
      difficulty: 'Beginner',
      urgency: 'medium',
      description: 'How to recover accidentally deleted files or photos',
      content: 'Emergency steps: 1) Check the Trash/Recently Deleted folder, 2) Most apps keep deleted items for 30 days, 3) For photos: Check "Recently Deleted" album, 4) For emails: Check "Trash" or "Deleted Items", 5) Contact Mālama support for recovery help.'
    },
    {
      type: 'emergency',
      title: 'What to Do: App Isn\'t Working',
      pages: '1 page',
      difficulty: 'Beginner',
      urgency: 'low',
      description: 'Basic troubleshooting when an app stops working',
      content: 'Emergency steps: 1) Close the app completely and reopen it, 2) Restart the device (turn off, then on), 3) Check if internet connection is working, 4) Update the app if updates are available, 5) Contact Mālama support for further help.'
    },

    // REFERENCE MATERIALS
    {
      type: 'reference',
      title: 'Emergency Contact Numbers',
      pages: '1 page',
      difficulty: 'Beginner',
      description: 'Important phone numbers for tech support and scam reporting',
      content: 'Keep these numbers handy:\n\nMālama Support Hotline: (808) 555-HELP (Available 24/7)\n\nTech Emergency Line: (808) 555-TECH (Mon-Sun 8am-10pm)\n\nScam Reporting: (808) 555-SCAM (Available 24/7)\n\nPrint this card and keep it near your device for quick access to help.'
    },
    {
      type: 'reference',
      title: 'Tech Terminology Guide',
      pages: '2 pages',
      difficulty: 'Beginner',
      description: 'Common tech terms explained in plain language',
      content: 'Quick reference for common terms:\n\nBrowser: The app you use to visit websites (Safari, Chrome, Edge)\nApp: A program on your phone or tablet\nCloud: Storage on the internet, not on your device\nPassword: Secret code to access your accounts\nWi-Fi: Wireless internet connection\nUpdate: Installing new improvements to apps or device\nDownload: Saving something from internet to your device\nLink: Clickable text or button that takes you somewhere\nAttachment: File sent with an email\nNotification: Alert or message from an app'
    }
  ];

  const filteredResources = activeTab === 'all'
    ? allResources
    : activeTab === 'videos'
    ? allResources.filter(r => r.type === 'video')
    : activeTab === 'guides'
    ? allResources.filter(r => r.type === 'guide')
    : activeTab === 'checklists'
    ? allResources.filter(r => r.type === 'checklist')
    : activeTab === 'emergency'
    ? allResources.filter(r => r.type === 'emergency')
    : allResources.filter(r => r.type === 'reference');

  const handleViewResource = (resource: any) => {
    setSelectedResource(resource);
    setShowDialog(true);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-[22px] font-medium hover:underline"
          style={{ color: '#2D9596' }}
        >
          ← Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#F3E8FF' }}>
            <BookOpen className="w-14 h-14" style={{ color: '#A855F7' }} />
          </div>
          <h1 className="text-[40px] font-bold mb-4" style={{ color: '#265073' }}>
            Learning Library
          </h1>
          <p className="text-[22px]" style={{ color: '#4B5563' }}>
            Watch, read, and practice at your own pace
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {[
            { id: 'all', label: 'All Resources', count: allResources.length },
            { id: 'videos', label: 'Videos', count: allResources.filter(r => r.type === 'video').length },
            { id: 'guides', label: 'Guides', count: allResources.filter(r => r.type === 'guide').length },
            { id: 'checklists', label: 'Checklists', count: allResources.filter(r => r.type === 'checklist').length },
            { id: 'emergency', label: 'Emergency Help', count: allResources.filter(r => r.type === 'emergency').length },
            { id: 'reference', label: 'Quick Reference', count: allResources.filter(r => r.type === 'reference').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 rounded-lg text-[18px] font-medium transition-all active:scale-95"
              style={{
                background: activeTab === tab.id ? '#2D9596' : '#F3F4F6',
                color: activeTab === tab.id ? '#FFFFFF' : '#265073'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all" style={{ borderColor: '#D1D5DB' }}>
              <div className="h-48 flex items-center justify-center" style={{ background: '#F3F4F6' }}>
                {resource.type === 'video' && <Video className="w-16 h-16" style={{ color: '#4B5563' }} />}
                {resource.type === 'guide' && <FileText className="w-16 h-16" style={{ color: '#4B5563' }} />}
                {resource.type === 'checklist' && <CheckSquare className="w-16 h-16" style={{ color: '#4B5563' }} />}
                {resource.type === 'emergency' && <AlertCircle className="w-16 h-16" style={{ color: '#DC2626' }} />}
                {resource.type === 'reference' && <HelpCircle className="w-16 h-16" style={{ color: '#2D9596' }} />}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[12px] font-bold uppercase" style={{ background: '#DBEAFE', color: '#2D9596' }}>
                    {resource.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: '#D1FAE5', color: '#10B981' }}>
                    {resource.difficulty}
                  </span>
                </div>
                <h3 className="text-[20px] font-bold mb-2 line-clamp-2" style={{ color: '#265073' }}>
                  {resource.title}
                </h3>
                <p className="text-[14px] mb-3" style={{ color: '#4B5563' }}>
                  {resource.duration || resource.pages}
                </p>
                <p className="text-[16px] mb-4 line-clamp-2" style={{ color: '#4B5563' }}>
                  {resource.description}
                </p>
                <Button
                  onClick={() => handleViewResource(resource)}
                  className="w-full h-12 text-[16px] font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  {resource.type === 'video' && <Play className="w-5 h-5" />}
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[20px]" style={{ color: '#4B5563' }}>
              No resources found in this category.
            </p>
          </div>
        )}

        {/* Resource View Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[12px] font-bold uppercase" style={{ background: '#DBEAFE', color: '#2D9596' }}>
                  {selectedResource?.type}
                </span>
                {selectedResource?.difficulty && (
                  <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: '#D1FAE5', color: '#10B981' }}>
                    {selectedResource?.difficulty}
                  </span>
                )}
                {selectedResource?.urgency && (
                  <Badge
                    style={{
                      background: selectedResource.urgency === 'high' ? '#DC2626' : selectedResource.urgency === 'medium' ? '#F59E0B' : '#16A34A',
                      color: 'white',
                      textTransform: 'uppercase',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {selectedResource.urgency} Priority
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>
                {selectedResource?.title}
              </DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                {selectedResource?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              {selectedResource?.type === 'video' && (
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Play className="w-16 h-16 mx-auto mb-4" style={{ color: '#2D9596' }} />
                    <p className="text-[18px]" style={{ color: '#4B5563' }}>Video Player</p>
                    <p className="text-[14px]" style={{ color: '#4B5563' }}>({selectedResource?.duration})</p>
                  </div>
                </div>
              )}
              {selectedResource?.type === 'emergency' && (
                <div className="mb-6 p-4 rounded-lg" style={{ background: '#FEE2E2', border: '2px solid #DC2626' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5" style={{ color: '#DC2626' }} />
                    <p className="font-bold" style={{ color: '#DC2626' }}>Emergency Action Steps</p>
                  </div>
                </div>
              )}
              <div className="text-[16px] leading-relaxed whitespace-pre-line" style={{ color: '#4B5563' }}>
                {selectedResource?.content}
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setShowDialog(false)}
                  className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  {selectedResource?.type === 'video' ? 'Watch Again' :
                   selectedResource?.type === 'emergency' || selectedResource?.type === 'reference' ? 'Print Card' : 'Download PDF'}
                </Button>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant="outline"
                  className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                  style={{ borderColor: '#265073', color: '#265073' }}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
