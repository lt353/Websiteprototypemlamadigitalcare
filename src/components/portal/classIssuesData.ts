// Issue tracking data structure for different class topics

export interface IssueCategory {
  id: string;
  label: string;
  subIssues: {
    iPhone?: string[];
    Android?: string[];
    iPad?: string[];
    'All Devices'?: string[];
  };
}

export interface ClassIssues {
  [classTopic: string]: IssueCategory[];
}

export const classIssuesData: ClassIssues = {
  'Password Management Made Easy': [
    {
      id: 'password-basics',
      label: 'Password Basics',
      subIssues: {
        'All Devices': [
          'Creating strong passwords',
          'Remembering passwords',
          'Writing passwords down',
          'Reusing same password everywhere'
        ]
      }
    },
    {
      id: 'password-managers',
      label: 'Password Managers',
      subIssues: {
        iPhone: [
          "Can't install from App Store",
          'Face ID setup confusion',
          'Auto-fill not working',
          'Sharing passwords with spouse'
        ],
        Android: [
          'Google Password Manager location',
          'Fingerprint unlock issues',
          'Chrome sync problems',
          'Samsung Pass vs Google'
        ],
        iPad: [
          'Different apps on phone vs tablet',
          "Keyboard doesn't appear",
          'Too small to read',
          'Split screen confusion'
        ],
        'All Devices': [
          'Forgot master password',
          'Too many passwords',
          "Don't trust cloud storage",
          'What if I lose my device?'
        ]
      }
    },
    {
      id: 'account-recovery',
      label: 'Account Recovery',
      subIssues: {
        'All Devices': [
          'Forgot password - where to reset?',
          'Security questions forgotten',
          'No access to recovery email',
          'Account locked after attempts'
        ]
      }
    },
    {
      id: 'two-factor-auth',
      label: 'Two-Factor Authentication',
      subIssues: {
        iPhone: [
          'Text codes not arriving',
          'Authenticator app confusion',
          'Backup codes - where to store?'
        ],
        Android: [
          'Google Authenticator setup',
          'SMS vs app codes',
          'Switching to new phone'
        ],
        'All Devices': [
          "Why do I need this?",
          'Too complicated',
          'Codes expire too fast',
          'Lost phone - now what?'
        ]
      }
    },
    {
      id: 'browser-saved-passwords',
      label: 'Browser Saved Passwords',
      subIssues: {
        iPhone: [
          'Safari keychain access',
          'iCloud keychain sync',
          'Viewing saved passwords'
        ],
        Android: [
          'Chrome password manager',
          'Exporting passwords',
          'Auto-fill prompts annoying'
        ],
        'All Devices': [
          'Browser vs password manager?',
          'Are saved passwords safe?',
          'Accidentally saved wrong password'
        ]
      }
    }
  ],

  'Video Calling with Family': [
    {
      id: 'starting-calls',
      label: 'Starting Calls',
      subIssues: {
        iPhone: [
          'FaceTime vs other apps',
          'Finding contacts',
          'Call button location',
          'Accepting incoming calls'
        ],
        Android: [
          'Google Meet vs Zoom',
          'Which app does family use?',
          'Camera permission denied',
          'App keeps opening camera app'
        ],
        iPad: [
          'Prefer iPad for larger screen',
          'Where is the call button?',
          'Contact photos not showing',
          'Starting group calls'
        ],
        'All Devices': [
          'Family uses different apps',
          'Calling wrong person',
          'How to schedule calls?',
          'Time zone confusion'
        ]
      }
    },
    {
      id: 'audio-video-issues',
      label: 'Audio/Video Issues',
      subIssues: {
        iPhone: [
          "Can't find mute button",
          'Camera showing ceiling',
          'Face too dark',
          "Can't hear grandkids"
        ],
        Android: [
          'Permissions keep asking',
          'Echo/feedback',
          'Video frozen',
          'Wrong camera (front vs back)'
        ],
        iPad: [
          'Too close to face',
          'Prop it up?',
          'Volume too low',
          'Screen goes dark mid-call'
        ],
        'All Devices': [
          'Embarrassed by background',
          'Look strange on video',
          'Family can\'t hear me',
          'Accidental hangups'
        ]
      }
    },
    {
      id: 'adding-participants',
      label: 'Adding Participants',
      subIssues: {
        'All Devices': [
          'Adding third person',
          'Group call limits',
          'Inviting via link',
          'Someone can\'t join'
        ]
      }
    },
    {
      id: 'screen-issues',
      label: 'Screen Issues',
      subIssues: {
        iPhone: [
          'Screen too small to see faces',
          'Can\'t find controls',
          'Accidentally tapping things',
          'Text messages interrupt call'
        ],
        Android: [
          'Switching to speaker view',
          'Gallery vs speaker mode',
          'Picture-in-picture confusing',
          'Screen rotation issues'
        ],
        iPad: [
          'Using landscape mode',
          'Split screen with notes?',
          'Screen sharing confusion',
          'Everyone looks tiny'
        ],
        'All Devices': [
          'Can\'t see who\'s talking',
          'Finding screen share button',
          'Viewing shared photos together',
          'Call quality poor'
        ]
      }
    },
    {
      id: 'app-confusion',
      label: 'App Confusion',
      subIssues: {
        'All Devices': [
          'Zoom vs FaceTime vs WhatsApp',
          'Too many video apps',
          'Which app for which family?',
          'Do they need same app?',
          'Installing apps takes forever'
        ]
      }
    }
  ],

  'iPhone Basics for Beginners': [
    {
      id: 'basic-navigation',
      label: 'Basic Navigation',
      subIssues: {
        iPhone: [
          'Home button vs swipe up',
          'Back button location',
          'App switching confusion',
          'Closing apps properly',
          'Control Center access',
          'Notification Center vs Control'
        ]
      }
    },
    {
      id: 'home-screen',
      label: 'Home Screen Organization',
      subIssues: {
        iPhone: [
          'Moving app icons',
          'Creating folders',
          'Deleting apps',
          'App Library confusion',
          'Finding lost apps',
          'Widgets - what are they?'
        ]
      }
    },
    {
      id: 'settings-control',
      label: 'Settings & Control Center',
      subIssues: {
        iPhone: [
          'Finding Settings app',
          'WiFi on/off',
          'Bluetooth pairing',
          'Volume controls',
          'Brightness too low/high',
          'Do Not Disturb mode'
        ]
      }
    },
    {
      id: 'typing-keyboard',
      label: 'Typing & Keyboard',
      subIssues: {
        iPhone: [
          'Keyboard too small',
          'Autocorrect frustration',
          'Capital letters',
          'Numbers and symbols',
          'Voice typing (dictation)',
          'Selecting/copying text'
        ]
      }
    },
    {
      id: 'notifications',
      label: 'Notifications',
      subIssues: {
        iPhone: [
          'Too many notifications',
          'Clearing notifications',
          'Notification sounds',
          'Lock screen notifications',
          'App badges (red dots)',
          'Turning off specific apps'
        ]
      }
    }
  ],

  'Health Apps & Patient Portals': [
    {
      id: 'logging-in',
      label: 'Logging In',
      subIssues: {
        iPhone: [
          'MyChart login failing',
          'Password reset loop',
          'Healthcare.gov confusion',
          'Medicare.gov access'
        ],
        Android: [
          'Different portal per doctor',
          'App vs website?',
          'Insurance portal separate?',
          'Prescription refills where?'
        ],
        iPad: [
          'Prefer larger screen but...',
          'Portal looks different',
          "Can't download forms",
          'Print from iPad?'
        ],
        'All Devices': [
          'Too many logins!',
          'Security questions forgotten',
          'Portal down frequently',
          'Portal calls it different things'
        ]
      }
    },
    {
      id: 'finding-information',
      label: 'Finding Information',
      subIssues: {
        'All Devices': [
          'Where are test results?',
          'Lab results confusing',
          'Finding vaccination records',
          'Medication list location',
          'Appointment history',
          'Medical terminology unclear'
        ]
      }
    },
    {
      id: 'appointment-scheduling',
      label: 'Appointment Scheduling',
      subIssues: {
        'All Devices': [
          'Booking vs requesting?',
          'Which provider to choose?',
          'No available times shown',
          'Canceling appointments',
          'Rescheduling process',
          'Adding to calendar'
        ]
      }
    },
    {
      id: 'messaging-providers',
      label: 'Messaging Providers',
      subIssues: {
        'All Devices': [
          'How to message doctor?',
          'Response time unclear',
          'Attaching photos',
          'Character limit frustrating',
          'Urgent vs non-urgent',
          'Nurse vs doctor messages'
        ]
      }
    },
    {
      id: 'medication-tracking',
      label: 'Medication Tracking',
      subIssues: {
        iPhone: [
          'Apple Health medication',
          'Reminder notifications',
          'Refill requests',
          'Tracking doses taken'
        ],
        Android: [
          'Google Fit medication?',
          'Pharmacy app separate',
          'CVS vs Walgreens apps',
          'Medication reminders'
        ],
        'All Devices': [
          'Too many pharmacy apps',
          'Transferring prescriptions',
          'Insurance coverage check',
          'Generic vs brand name'
        ]
      }
    }
  ]
};

// Helper function to get issues for a class topic
export function getIssuesForClass(classTopic: string): IssueCategory[] {
  return classIssuesData[classTopic] || [];
}

// Helper function to get device-specific sub-issues
export function getSubIssuesForDevice(
  category: IssueCategory,
  deviceType: 'iPhone' | 'Android' | 'iPad' | 'Other'
): string[] {
  const deviceIssues = category.subIssues[deviceType] || [];
  const allDevicesIssues = category.subIssues['All Devices'] || [];
  return [...deviceIssues, ...allDevicesIssues];
}