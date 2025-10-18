import { useState } from 'react';
import { BookOpen, Video, FileText, CheckSquare, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

interface LearningLibraryPageProps {
  onBack: () => void;
}

export function LearningLibraryPage({ onBack }: LearningLibraryPageProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);

  const allResources = [
    {
      type: 'video',
      title: 'How to Spot a Phishing Email',
      duration: '5 minutes',
      difficulty: 'Beginner',
      description: 'Learn the warning signs of fake emails and protect yourself from scams',
      content: 'This video covers: Red flags in email addresses, urgent language tactics, suspicious links, grammar mistakes, and requests for personal information.'
    },
    {
      type: 'video',
      title: 'iPhone Basics: Getting Started',
      duration: '12 minutes',
      difficulty: 'Beginner',
      description: 'Master the essential features of your iPhone',
      content: 'Learn how to navigate your iPhone, make calls, send texts, take photos, and adjust settings.'
    },
    {
      type: 'video',
      title: 'Setting Up Two-Factor Authentication',
      duration: '8 minutes',
      difficulty: 'Intermediate',
      description: 'Add an extra layer of security to your accounts',
      content: 'Step-by-step guide to enabling 2FA on email, banking, and social media accounts.'
    },
    {
      type: 'video',
      title: 'Zoom Basics for Video Calls',
      duration: '10 minutes',
      difficulty: 'Beginner',
      description: 'Connect with family and friends through video chat',
      content: 'Learn to join meetings, use mute/unmute, turn your camera on/off, and share your screen.'
    },
    {
      type: 'video',
      title: 'Organizing Your Photos',
      duration: '15 minutes',
      difficulty: 'Beginner',
      description: 'Keep your memories organized and easy to find',
      content: 'Create albums, delete duplicates, back up to cloud storage, and share with family.'
    },
    {
      type: 'guide',
      title: 'Password Manager Setup Guide',
      pages: '8 pages',
      difficulty: 'Intermediate',
      description: 'Never forget a password again with this helpful tool',
      content: 'Complete guide to choosing and setting up a password manager like LastPass or 1Password.'
    },
    {
      type: 'guide',
      title: 'Facebook Privacy Settings',
      pages: '6 pages',
      difficulty: 'Beginner',
      description: 'Control who sees your posts and personal information',
      content: 'Step-by-step instructions with screenshots to adjust your Facebook privacy settings.'
    },
    {
      type: 'guide',
      title: 'Email Organization 101',
      pages: '10 pages',
      difficulty: 'Beginner',
      description: 'Manage your inbox without feeling overwhelmed',
      content: 'Learn to create folders, set up filters, unsubscribe from unwanted emails, and manage spam.'
    },
    {
      type: 'guide',
      title: 'Online Banking Safety Tips',
      pages: '12 pages',
      difficulty: 'Intermediate',
      description: 'Bank online with confidence and security',
      content: 'Best practices for secure online banking, recognizing fake bank websites, and protecting your accounts.'
    },
    {
      type: 'checklist',
      title: 'Before Clicking Any Link',
      pages: '1 page',
      difficulty: 'Beginner',
      description: 'Quick reference for staying safe online',
      content: 'Printable checklist: Hover over links, check the URL, verify the sender, look for HTTPS, and trust your instincts.'
    },
    {
      type: 'checklist',
      title: 'Daily Device Care Routine',
      pages: '2 pages',
      difficulty: 'Beginner',
      description: 'Keep your devices running smoothly',
      content: 'Daily and weekly maintenance tasks: Close unused apps, clear browser cache, check for updates, backup important files.'
    },
    {
      type: 'checklist',
      title: 'Account Security Checklist',
      pages: '1 page',
      difficulty: 'Intermediate',
      description: 'Ensure all your accounts are properly secured',
      content: 'Check: Strong unique passwords, two-factor authentication, recovery email/phone, recent login activity.'
    }
  ];

  const filteredResources = activeTab === 'all'
    ? allResources
    : activeTab === 'videos'
    ? allResources.filter(r => r.type === 'video')
    : activeTab === 'guides'
    ? allResources.filter(r => r.type === 'guide')
    : allResources.filter(r => r.type === 'checklist');

  const handleViewResource = (resource: any) => {
    setSelectedResource(resource);
    setShowDialog(true);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-[18px] hover:underline active:scale-95 transition-transform"
          style={{ color: '#2D9596' }}
        >
          ← Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#F3E8FF' }}>
            <BookOpen className="w-10 h-10" style={{ color: '#A855F7' }} />
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
            { id: 'checklists', label: 'Checklists', count: allResources.filter(r => r.type === 'checklist').length }
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
                <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: '#D1FAE5', color: '#10B981' }}>
                  {selectedResource?.difficulty}
                </span>
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
              <p className="text-[16px] leading-relaxed" style={{ color: '#4B5563' }}>
                {selectedResource?.content}
              </p>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setShowDialog(false)}
                  className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  {selectedResource?.type === 'video' ? 'Watch Again' : 'Download PDF'}
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
