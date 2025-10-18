import { useState } from 'react';
import { MessageCircle, Smartphone, Monitor, Mail, Lock, Camera, Globe, Phone, Volume2, Settings, HelpCircle, Bookmark, Printer, Star } from 'lucide-react';

interface TechHelperPageProps {
  onBack: () => void;
}

type Category = 'phone' | 'computer' | 'email' | 'password' | 'photos' | 'internet' | 'calling' | 'sound' | 'settings' | 'other';

export function TechHelperPage({ onBack }: TechHelperPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string; showDeviceButtons?: boolean; questionKey?: string; device?: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  // Demo saved answers to showcase the feature
  const [savedAnswers, setSavedAnswers] = useState<Array<{ question: string; answer: string; device?: string; timestamp: number }>>([
    {
      question: 'How do I take a screenshot?',
      answer: `Let me show you how to take a screenshot on your iPhone.

Here's what to do:

1. Find the picture or screen you want to capture

2. Press TWO buttons at the same time:
   - The SIDE button (on the right edge of your phone)
   - The VOLUME UP button (on the left edge, top button)

3. Press them together, then let go quickly

What you'll see:
- The screen will flash white
- You'll hear a camera click sound
- A small picture appears in the bottom left corner

Where to find it later:
- Open the Photos app
- Tap "Albums" at the bottom
- Scroll down to "Screenshots"
- All your screenshots are there!`,
      device: 'iPhone',
      timestamp: Date.now() - 86400000
    },
    {
      question: 'How do I connect to Wi-Fi?',
      answer: `I'll help you connect your iPhone to Wi-Fi!

Here are the steps:

1. Open the Settings app (looks like gray gears ⚙️)

2. At the very top, tap "Wi-Fi"

3. Make sure the Wi-Fi switch is turned ON (it should be green)

4. You'll see a list of available networks

5. Find your network name and tap on it

6. Type in your Wi-Fi password
   - Be careful with capital letters and numbers
   - The password is case-sensitive

7. Tap "Join" in the top right

When it works:
- A blue checkmark appears next to your network
- The Wi-Fi symbol shows at the top of your screen

If you can't remember your password:
- Look on the bottom or back of your Wi-Fi router
- It might be on a sticker
- Or call your internet company for help`,
      device: 'iPhone',
      timestamp: Date.now() - 172800000
    }
  ]);
  const [showSavedLibrary, setShowSavedLibrary] = useState(false);
  const [deviceContext, setDeviceContext] = useState<{ osVersion?: string; deviceLooksD different?: boolean }>({});

  const categories = [
    { id: 'phone' as Category, icon: Smartphone, label: 'Phone/Tablet Help', emoji: '📱' },
    { id: 'computer' as Category, icon: Monitor, label: 'Computer Help', emoji: '💻' },
    { id: 'email' as Category, icon: Mail, label: 'Email Issues', emoji: '📧' },
    { id: 'password' as Category, icon: Lock, label: 'Password Problems', emoji: '🔐' },
    { id: 'photos' as Category, icon: Camera, label: 'Photos & Videos', emoji: '📷' },
    { id: 'internet' as Category, icon: Globe, label: 'Internet/Wi-Fi', emoji: '🌐' },
    { id: 'calling' as Category, icon: Phone, label: 'Video Calling', emoji: '📞' },
    { id: 'sound' as Category, icon: Volume2, label: 'Sound/Volume', emoji: '🔊' },
    { id: 'settings' as Category, icon: Settings, label: 'Settings & Updates', emoji: '⚙️' },
    { id: 'other' as Category, icon: HelpCircle, label: 'Something Else', emoji: '❓' },
  ];

  const commonQuestions: Record<Category, string[]> = {
    phone: [
      'How do I take a screenshot?',
      'How do I delete apps I don\'t use?',
      'Why is my phone storage full?',
      'How do I update my phone?',
      'How do I make text bigger?'
    ],
    computer: [
      'How do I restart my computer?',
      'How do I create a new folder?',
      'How do I save a file?',
      'My computer is running slow, what should I do?',
      'How do I close a frozen program?'
    ],
    email: [
      'How do I send an email with a photo?',
      'How do I delete old emails?',
      'How do I unsubscribe from emails?',
      'I forgot my email password',
      'How do I add a contact?'
    ],
    password: [
      'I forgot my password',
      'How do I change my password?',
      'Should I write down my passwords?',
      'What makes a strong password?',
      'How do password managers work?'
    ],
    photos: [
      'How do I take a photo?',
      'How do I share photos with family?',
      'How do I delete unwanted photos?',
      'How do I organize my photos into albums?',
      'How do I print photos?'
    ],
    internet: [
      'How do I connect to Wi-Fi?',
      'Why is my internet slow?',
      'How do I reset my Wi-Fi?',
      'What if I forgot my Wi-Fi password?',
      'How do I turn Wi-Fi on/off?'
    ],
    calling: [
      'How do I make a FaceTime call?',
      'How do I join a Zoom meeting?',
      'My video is frozen, what do I do?',
      'How do I mute myself on a call?',
      'How do I share my screen?'
    ],
    sound: [
      'Why can\'t I hear anything?',
      'How do I adjust the volume?',
      'How do I connect headphones?',
      'How do I turn on speaker phone?',
      'Why is there an echo on my calls?'
    ],
    settings: [
      'How do I update my device?',
      'How do I change my ringtone?',
      'How do I make my screen brighter?',
      'How do I turn off notifications?',
      'Where do I find settings?'
    ],
    other: ['Type my own question']
  };

  // Related questions that appear after answering
  const relatedQuestions: Record<string, string[]> = {
    'How do I take a screenshot?': [
      'How do I share photos with family?',
      'How do I delete unwanted photos?',
      'How do I organize my photos into albums?'
    ],
    'How do I update my phone?': [
      'How do I update my device?',
      'How do I make text bigger?',
      'How do I make my screen brighter?'
    ],
    'How do I update my device?': [
      'How do I update my phone?',
      'Where do I find settings?',
      'How do I restart my computer?'
    ],
    'How do I connect to Wi-Fi?': [
      'What if I forgot my Wi-Fi password?',
      'Why is my internet slow?',
      'How do I turn Wi-Fi on/off?'
    ],
    'How do I make text bigger?': [
      'How do I make my screen brighter?',
      'How do I turn off notifications?',
      'Where do I find settings?'
    ],
    'How do I send an email?': [
      'How do I check my email?',
      'How do I attach a photo to an email?',
      'How do I delete emails?'
    ],
    'How do I check my email?': [
      'How do I send an email?',
      'How do I reply to an email?',
      'How do I delete emails?'
    ],
    'How do I change my password?': [
      'How do I reset my password?',
      'What is a strong password?',
      'How do I save passwords?'
    ],
    'How do I take a photo?': [
      'How do I take a screenshot?',
      'How do I share photos with family?',
      'How do I organize my photos into albums?'
    ],
    'How do I share photos with family?': [
      'How do I attach a photo to an email?',
      'How do I organize my photos into albums?',
      'How do I print photos?'
    ],
    'How do I make a FaceTime call?': [
      'How do I join a Zoom meeting?',
      'How do I mute myself on a call?',
      'My video is frozen, what do I do?'
    ],
    'How do I join a Zoom meeting?': [
      'How do I make a FaceTime call?',
      'How do I mute myself on a call?',
      'How do I share my screen?'
    ],
    'Why can\'t I hear anything?': [
      'How do I adjust the volume?',
      'How do I connect headphones?',
      'How do I turn on speaker phone?'
    ],
    'How do I adjust the volume?': [
      'Why can\'t I hear anything?',
      'How do I connect headphones?',
      'Why is there an echo on my calls?'
    ],
    'Why is my internet slow?': [
      'How do I reset my Wi-Fi?',
      'How do I connect to Wi-Fi?',
      'What if I forgot my Wi-Fi password?'
    ],
    'How do I restart my computer?': [
      'How do I update my device?',
      'Where do I find settings?',
      'How do I make my screen brighter?'
    ],
    'How do I make my screen brighter?': [
      'How do I make text bigger?',
      'Where do I find settings?',
      'How do I turn off notifications?'
    ],
    'How do I delete unwanted photos?': [
      'How do I organize my photos into albums?',
      'How do I share photos with family?',
      'How do I print photos?'
    ],
    'How do I organize my photos into albums?': [
      'How do I delete unwanted photos?',
      'How do I share photos with family?',
      'How do I take a screenshot?'
    ],
    'How do I attach a photo to an email?': [
      'How do I send an email?',
      'How do I share photos with family?',
      'How do I organize my photos into albums?'
    ],
    'How do I delete emails?': [
      'How do I check my email?',
      'How do I reply to an email?',
      'How do I send an email?'
    ],
    'How do I reset my Wi-Fi?': [
      'How do I connect to Wi-Fi?',
      'Why is my internet slow?',
      'What if I forgot my Wi-Fi password?'
    ],
    'What if I forgot my Wi-Fi password?': [
      'How do I connect to Wi-Fi?',
      'How do I reset my Wi-Fi?',
      'How do I turn Wi-Fi on/off?'
    ]
  };

  const deviceQuestions = [
    'How do I take a screenshot?',
    'How do I update my phone?',
    'How do I update my device?',
    'How do I make text bigger?',
    'How do I restart my computer?',
    'How do I connect to Wi-Fi?',
    'How do I adjust the volume?'
  ];

  const getDeviceOptions = (question: string, category?: Category): string[] => {
    if (category === 'phone') return ['iPhone', 'Android'];
    if (category === 'computer') return ['Windows', 'Mac'];
    
    if (question.includes('phone') || question.includes('screenshot') || question.includes('text bigger')) {
      return ['iPhone', 'Android'];
    }
    if (question.includes('computer') || question.includes('restart')) {
      return ['Windows', 'Mac'];
    }
    
    return ['iPhone', 'Android', 'Windows', 'Mac'];
  };

  const getAnswerForDevice = (question: string, device: string): string => {
    const key = `${question}|${device}`;
    
    const answers: Record<string, string> = {
      // ============ SCREENSHOT ANSWERS ============
      'How do I take a screenshot?|iPhone': `Let me show you how to take a screenshot on your iPhone.

Here's what to do:

1. Find the picture or screen you want to capture

2. Press TWO buttons at the same time:
   - The SIDE button (on the right edge of your phone)
   - The VOLUME UP button (on the left edge, top button)

3. Press them together, then let go quickly

What you'll see:
- The screen will flash white
- You'll hear a camera click sound
- A small picture appears in the bottom left corner

What to do next:
- Tap the small picture to edit or share it
- Or just leave it - it saves automatically to your Photos

Where to find it later:
- Open the Photos app
- Tap "Albums" at the bottom
- Scroll down to "Screenshots"
- All your screenshots are there!

If it didn't work:
- Try pressing the buttons at exactly the same time
- Press and release quickly - don't hold them down`,

      'How do I take a screenshot?|Android': `Let me show you how to take a screenshot on your Android phone.

Here's what to do:

1. Find the picture or screen you want to capture

2. Press TWO buttons at the same time:
   - The POWER button (usually on the right side)
   - The VOLUME DOWN button (on the side)

3. Press them together, then let go quickly

What you'll see:
- The screen will flash
- A notification appears saying "Screenshot captured"
- You might see a preview at the bottom

Where to find it later:
- Open your Gallery or Photos app
- Look for an album called "Screenshots"
- All your screenshots are saved there!

If it didn't work:
- Try pressing the buttons at exactly the same time
- Some phones: swipe down with three fingers on the screen instead

Need help finding your screenshots?`,

      // ============ WIFI ANSWERS ============
      'How do I connect to Wi-Fi?|iPhone': `Let me help you connect to Wi-Fi on your iPhone.

Follow these steps:

1. Find and tap the "Settings" app
   - It looks like a gray gear
   - Usually on your home screen

2. Tap "Wi-Fi" (near the top of the list)

3. Make sure Wi-Fi is turned ON
   - The switch should be green
   - If it's gray, tap it to turn it on

4. Wait a moment - you'll see a list of Wi-Fi networks

5. Find your home Wi-Fi name in the list
   - Look for the name you recognize
   - It might be the name of your internet company

6. Tap on your Wi-Fi name

7. Type in your Wi-Fi password
   - This is usually on a sticker on your router
   - Or a paper from your internet company

8. Tap "Join"

How to know it worked:
- You'll see a checkmark next to your Wi-Fi name
- At the top of your screen, you'll see the Wi-Fi symbol (curved lines)

Can't find your password?
- Check the bottom or back of your internet router
- Look for a sticker with "Password" or "Network Key"
- Call your internet company - they can tell you

Connected! Your phone will remember this Wi-Fi and connect automatically next time.`,

      'How do I connect to Wi-Fi?|Android': `Let me help you connect to Wi-Fi on your Android phone.

Follow these steps:

1. Swipe down from the very top of your screen
   - Use your finger to pull down

2. Look for the Wi-Fi symbol
   - It looks like curved lines, like a fan
   - Tap and HOLD it (don't just tap once)

3. You'll see a list of Wi-Fi networks

4. Find your home Wi-Fi name
   - Look for the name you recognize
   - It might be the name of your internet company

5. Tap on your Wi-Fi name

6. Type in your Wi-Fi password
   - This is usually on your router
   - Check the sticker on the bottom or back

7. Tap "Connect"

How to know it worked:
- You'll see "Connected" under your Wi-Fi name
- At the top of your screen, the Wi-Fi symbol appears

Can't find your password?
- Look on your internet router for a sticker
- It might say "Password" or "WPA Key"
- You can call your internet company for help

That's it! Your phone will remember and connect automatically from now on.`,

      // ============ UPDATE DEVICE ANSWERS ============
      'How do I update my device?|iPhone': `Let me help you update your iPhone. This keeps it secure and running well.

Before you start:
- Plug your phone into the charger
- Connect to Wi-Fi
- This will take about 30 minutes

Here's what to do:

1. Open "Settings"
   - Tap the gray gear icon

2. Tap "General"
   - It's in the main list

3. Tap "Software Update"
   - At the top of the General screen

4. Wait while it checks...
   - This takes a minute

5. If an update is available, tap "Download and Install"

6. If asked, type in your phone password

7. Tap "Agree"

8. Now wait while it downloads
   - This takes 15-30 minutes
   - You can keep using your phone

9. When it says "Install Now," tap it
   - Or tap "Install Tonight" to do it while you sleep

What happens next:
- Your phone screen goes black
- You'll see the Apple logo
- It might restart a few times - this is normal!
- Takes about 15-30 minutes total

Important:
- Don't turn off your phone during the update
- Keep it plugged in the whole time
- Don't worry if it takes a while - be patient!

When it's done, you'll see your lock screen. Enter your password and you're all set!

Tip: Do this before bed and let it update overnight while you sleep.`,

      'How do I update my device?|Android': `Let me help you update your Android phone. This keeps it secure and running well.

Before you start:
- Plug your phone into the charger  
- Connect to Wi-Fi
- This will take about 30 minutes

Here's what to do:

1. Open "Settings"
   - Tap the gear icon

2. Scroll down and tap "System" or "Software Update"
   - The name varies by phone brand
   - Look for anything with "Update" in the name

3. Tap "System Update" or "Check for Updates"

4. Wait while it checks...

5. If an update is available, tap "Download and Install"

6. Wait while it downloads
   - Takes 10-20 minutes
   - You can keep using your phone

7. When ready, tap "Install"

8. Your phone will restart

What happens next:
- Screen goes dark
- You'll see your phone's logo
- Takes about 15-20 minutes
- Phone restarts automatically

Important:
- Don't turn off your phone during update
- Keep it plugged in
- Be patient - it takes time!

When finished, you'll see your lock screen. Unlock your phone and you're done!

Tip: Start the update before bed and let it finish overnight.`,

      'How do I update my device?|Windows': `Let me help you update your Windows computer. This keeps it secure and running smoothly.

Here's what to do:

1. Click the Start button
   - The Windows logo in the bottom-left corner

2. Click the "Settings" icon
   - Looks like a gear

3. Click "Update & Security"
   - Near the bottom of the options

4. Click "Check for updates"

5. Wait while it checks...
   - Takes a minute or two

If updates are found:

6. Click "Download" or "Install now"
   - Windows starts downloading automatically

7. When ready, click "Restart now"
   - Or schedule it for later

What happens next:
- Computer restarts
- You'll see "Installing updates" messages
- Don't turn off your computer!
- Takes 15-45 minutes
- Might restart a few times - this is normal

Important:
- Save any work before restarting
- Keep computer plugged in if it's a laptop
- Don't force shut down during updates
- Be patient!

When done, you'll see your login screen. Log back in normally.

Best time to update: Before you go to bed - let it update overnight!`,

      'How do I update my device?|Mac': `Let me help you update your Mac computer. This keeps it secure and running well.

Here's what to do:

1. Click the Apple logo
   - Top-left corner of your screen

2. Click "System Settings" (or "System Preferences")

3. Click "General" then "Software Update"
   - Or just click "Software Update" if you see it

4. Wait while it checks for updates...

If an update is available:

5. Click "Update Now" or "Upgrade Now"

6. Type your password if asked

7. Click "Restart" when prompted

What happens next:
- Mac screen goes dark
- You'll see the Apple logo
- Progress bar fills up
- Takes 20-45 minutes
- Mac restarts automatically

Important:
- Save any work first
- Keep Mac plugged in if it's a laptop
- Don't close the lid or turn it off
- Be patient - updates take time!

When finished, you'll see your login screen. Enter your password and you're all set!

Tip: Start updates in the evening and let them finish overnight.`,

      // ============ RESTART COMPUTER ANSWERS ============
      'How do I restart my computer?|Windows': `Let me show you the safe way to restart your Windows computer.

Here's what to do:

1. Click the Start button
   - The Windows logo in the bottom-left corner

2. Click the Power icon
   - Looks like a circle with a line at the top

3. Click "Restart"

4. Wait while your computer restarts
   - Takes 2-5 minutes
   - Don't touch anything!

What you'll see:
- Screen goes black
- Computer turns off
- Then turns back on by itself
- You'll see the Windows logo
- Finally, your login screen appears

When to restart:
- When your computer is slow or frozen
- After installing new programs
- When something isn't working right
- Once a week is good practice!

Important:
- Don't hold the power button unless absolutely necessary
- Let it restart on its own
- Be patient - it takes a few minutes

After restart, log in like normal and your computer should work better!

Still having problems? Let me know what's happening and I can help more.`,

      'How do I restart my computer?|Mac': `Let me show you how to safely restart your Mac.

Here's what to do:

1. Click the Apple logo
   - Top-left corner of your screen

2. Click "Restart"

3. Click "Restart" again to confirm

4. Wait while your Mac restarts
   - Takes 2-5 minutes
   - Don't close the lid or press anything!

What you'll see:
- Screen goes dark
- Mac turns off
- Then turns back on by itself  
- You'll see the Apple logo
- Then your login screen

When to restart:
- When your Mac is slow or acting strange
- After installing new programs
- When something isn't working
- Once a week is good maintenance!

Important:
- Let it restart completely on its own
- Don't close the lid during restart
- Be patient!

After restart, log in normally and your Mac should work better!

Need more help? Tell me what problem you're having and I'll walk you through it.`,

      // ============ VOLUME ANSWERS ============
      'How do I adjust the volume?|iPhone': `Let me show you how to change the volume on your iPhone.

The simple way:

1. Find the volume buttons on the LEFT side of your iPhone
   - Two buttons, one above the other

2. Press the TOP button to make it louder

3. Press the BOTTOM button to make it quieter

What you'll see:
- A volume bar appears on your screen
- Shows how loud or quiet it is
- Disappears after a few seconds

Different types of volume:

When you're playing music or watching a video:
- The buttons control how loud the sound is

When nothing is playing:
- The buttons control your ringtone volume
- How loud your phone rings when someone calls

To check your volume:
1. Press a volume button
2. Look at the bar on screen
3. All the way right = loudest
4. All the way left = quietest

Can't hear anything?
- Check the volume is turned up (not all the way left)
- Check the switch on the left side isn't set to silent (don't see orange)
- Try pressing the top volume button several times

That's all there is to it! Pretty simple once you know where the buttons are.`,

      'How do I adjust the volume?|Android': `Let me show you how to change the volume on your Android phone.

The simple way:

1. Find the volume buttons on the SIDE of your phone
   - Usually on the right side
   - Two buttons, one above the other

2. Press the TOP button to make it louder

3. Press the BOTTOM button to make it quieter

What you'll see:
- A volume slider appears on your screen
- Shows how loud it is
- Goes away after a few seconds

See more options:
- When the volume bar appears, tap the three lines or down arrow
- You'll see different types of volume:
  - Media (for music and videos)
  - Ringtone (for phone calls)
  - Alarms

Can't hear anything?
- Make sure volume is turned up
- Check you're not in silent mode
- Press the volume up button several times

That's it! Once you know where the buttons are, it's easy.`,

      'How do I adjust the volume?|Windows': `Let me show you how to change the volume on your Windows computer.

The simple way:

1. Look at the bottom-right corner of your screen

2. Find the speaker icon
   - Looks like a speaker with sound waves

3. Click on it once

4. A slider appears - drag it up or down
   - Up = louder
   - Down = quieter

Using your keyboard:
- Most keyboards have volume keys
- Look for keys with speaker symbols
- Usually F11 and F12, or separate volume buttons
- Press them to adjust volume

Can't hear anything?

1. Click the speaker icon
2. Make sure the slider isn't all the way at the bottom
3. Look for an X on the speaker icon - click it to unmute

That's all you need to know! Most people just use the speaker icon in the corner.`,

      'How do I adjust the volume?|Mac': `Let me show you how to change the volume on your Mac.

The simple way:

1. Look at the top-right corner of your screen

2. Find the speaker icon
   - Looks like a speaker

3. Click on it

4. A slider appears - drag it up or down
   - Up = louder  
   - Down = quieter

Using your keyboard:
- Press F11 to make it quieter
- Press F12 to make it louder
- You'll see a volume bar on your screen

Can't hear anything?

1. Click the speaker icon at the top
2. Make sure the slider isn't all the way down
3. Check that "Mute" isn't checked

Easy! Most people just use the speaker icon in the corner or the keyboard keys.`,

      // ============ TEXT SIZE ANSWERS ============
      'How do I make text bigger?|iPhone': `Let me show you how to make text bigger on your iPhone.

Here's what to do:

1. Open "Settings" (the gray gear icon)

2. Tap "Display & Brightness"

3. Tap "Text Size"

4. You'll see a slider with an "A" on each side
   - Drag it to the RIGHT to make text bigger
   - You'll see the preview change

5. Tap the back arrow when you're happy with the size

That's it! Text in most apps will now be bigger.

Want it even BIGGER?

1. Go to Settings > Accessibility

2. Tap "Display & Text Size"

3. Tap "Larger Text"

4. Turn ON "Larger Accessibility Sizes"

5. Drag the slider all the way to the right

This makes text MUCH bigger!

Can't read this?
- Ask someone to help you make it bigger first
- Then you'll be able to see everything better!`,

      'How do I make text bigger?|Android': `Let me show you how to make text bigger on your Android phone.

Here's what to do:

1. Open "Settings" (the gear icon)

2. Tap "Display"

3. Tap "Font Size" or "Font and Screen Zoom"

4. You'll see a slider
   - Drag it to the RIGHT to make text bigger
   - You'll see a preview

5. Tap back when you're happy

Want EVERYTHING bigger (not just text)?

1. In Display settings, tap "Display Size"

2. Drag the slider to the right

3. Makes buttons, icons, and text all bigger!

Can't read this?
- Ask someone to help you make it bigger first
- Then you'll be able to see everything better!`,

// ============ WI-FI ON/OFF ANSWERS ============
      'How do I turn Wi-Fi on/off?|iPhone': `Let me show you how to turn Wi-Fi on or off.

To turn Wi-Fi ON or OFF:

1. Swipe down from the top-right corner of your screen
   - Or swipe up from the bottom on older iPhones

2. Look for the Wi-Fi symbol (curved lines)

3. Tap it once
   - Blue = Wi-Fi is ON
   - Gray = Wi-Fi is OFF

Another way:

1. Open "Settings"

2. Tap "Wi-Fi" near the top

3. Tap the switch to turn it ON or OFF
   - Green = ON
   - Gray = OFF

When to turn Wi-Fi OFF:
- To save battery
- When you want to use cellular data instead

When to turn Wi-Fi ON:
- At home or places with free Wi-Fi
- Saves your cellular data
- Usually faster than cellular`,

      'How do I turn Wi-Fi on/off?|Android': `Let me show you how to turn Wi-Fi on or off.

Quick way:

1. Swipe down from the very top of your screen

2. Look for the Wi-Fi symbol

3. Tap it once
   - Colored/highlighted = Wi-Fi is ON
   - Gray = Wi-Fi is OFF

Another way:

1. Open "Settings"

2. Tap "Wi-Fi" or "Connections"

3. Tap the switch to turn it ON or OFF

When to turn Wi-Fi OFF:
- To save battery
- When you're not near any networks

When to turn Wi-Fi ON:
- At home
- At places with free Wi-Fi
- Saves your cellular data`,

      // ============ SCREEN BRIGHTNESS ANSWERS ============
      'How do I make my screen brighter?|iPhone': `Let me show you how to make your screen brighter.

Quick way:

1. Swipe down from the top-right corner
   - Or swipe up from bottom on older iPhones

2. Look for the sun icon with a slider

3. Drag the slider UP to make it brighter

4. Drag DOWN to make it dimmer

Settings way:

1. Open "Settings"

2. Tap "Display & Brightness"

3. Drag the "Brightness" slider
   - Right = brighter
   - Left = dimmer

Can't see in sunlight?
- Drag brightness all the way to the top
- iPhone will automatically get extra bright in direct sunlight

Too bright at night?
- Drag brightness down
- Or turn on "Night Shift" in Settings to make it easier on your eyes`,

      'How do I make my screen brighter?|Android': `Let me show you how to make your screen brighter.

Quick way:

1. Swipe down from the top of your screen

2. Look for the brightness slider

3. Drag it to the RIGHT to make brighter

4. Drag LEFT to make dimmer

Settings way:

1. Open "Settings"

2. Tap "Display"

3. Drag the "Brightness level" slider
   - Right = brighter
   - Left = dimmer

Can't see in sunlight?
- Drag brightness all the way up
- Some phones have "Outdoor mode" that makes it extra bright

Too bright at night?
- Turn brightness down
- Or turn on "Blue light filter" to make it easier on your eyes`,

      'How do I make my screen brighter?|Windows': `Let me show you how to make your screen brighter.

Quick way:

1. Look at the bottom-right corner of your screen

2. Click the notification icon (looks like a speech bubble)

3. Look for the brightness slider

4. Drag it right to make brighter, left to make dimmer

Using keyboard:
- Many laptops have brightness keys
- Look for sun symbols on F-keys
- Usually F1 and F2
- Press to adjust

Settings way:

1. Click Start > Settings

2. Click "System"

3. Click "Display"

4. Adjust the "Brightness" slider

Can't see in bright light?
- Turn brightness all the way up
- Close curtains or move to shade

Too bright at night?
- Turn brightness down
- Or turn on "Night light" in Display settings`,

      'How do I make my screen brighter?|Mac': `Let me show you how to make your screen brighter.

Quick way:

1. Look at the top-right corner of your screen

2. Click the Control Center icon

3. Look for "Display"

4. Drag the brightness slider up or down

Using keyboard (easiest!):
- Press F1 to make it dimmer
- Press F2 to make it brighter

Settings way:

1. Click the Apple logo (top-left)

2. Click "System Settings"

3. Click "Displays"

4. Adjust the "Brightness" slider

Can't see in bright light?
- Turn brightness all the way up
- Move to a shadier spot

Too bright at night?
- Turn brightness down
- Or turn on "Night Shift" to make it easier on your eyes`,

      // ============ HEADPHONE ANSWERS ============
      'How do I connect headphones?|iPhone': `Let me show you how to connect headphones to your iPhone.

For WIRED headphones:

Newer iPhones (no headphone jack):
1. You need a special adapter
   - Called "Lightning to headphone adapter"
   - Plug adapter into charging port
   - Plug headphones into adapter

Older iPhones (with headphone jack):
1. Find the round headphone jack
   - Usually on the bottom
2. Plug headphones in until they click
3. That's it!

For WIRELESS (Bluetooth) headphones:

1. Turn on your headphones
   - Hold the power button for 5-10 seconds
   - Light should flash (usually blue and red)

2. Open "Settings" on your iPhone

3. Tap "Bluetooth"

4. Make sure Bluetooth is ON (green)

5. Wait for your headphones to appear in the list

6. Tap the name of your headphones

7. Wait for "Connected"

That's it! Sound now comes through your headphones.

To disconnect:
- Just turn off your headphones
- Or unplug wired ones`,

      'How do I connect headphones?|Android': `Let me show you how to connect headphones to your Android phone.

For WIRED headphones:

1. Find the headphone jack
   - Usually on the top or bottom
   - Round hole

2. Plug headphones in until they click

3. That's it!

Some newer phones don't have a headphone jack:
- You need a USB-C adapter
- Plug adapter into charging port
- Plug headphones into adapter

For WIRELESS (Bluetooth) headphones:

1. Turn on your headphones
   - Hold the power button for 5-10 seconds
   - Light should flash

2. Swipe down from the top of your screen

3. Tap and HOLD the Bluetooth icon

4. Tap "Pair new device"

5. Wait for your headphones to appear

6. Tap the name of your headphones

7. Tap "Pair"

That's it! Sound now comes through your headphones.

To disconnect:
- Just turn off your headphones
- Or unplug wired ones`,

      // ============ SPEAKER PHONE ANSWERS ============
      'How do I turn on speaker phone?|iPhone': `Let me show you how to use speaker phone.

During a phone call:

1. Look at your screen while on the call

2. Find the "Speaker" button
   - Looks like a speaker icon

3. Tap "Speaker"

4. The button turns blue/green = speaker is ON

5. Now you can set the phone down and talk

To turn it OFF:
- Tap "Speaker" button again
- Sound goes back to the earpiece

What speaker phone does:
- Sound comes from the bottom speaker
- Everyone nearby can hear both sides of the call
- Good for when you need hands free

Tips:
- Don't use in public places (private conversations!)
- Ask the other person "Can I put you on speaker?" first
- Speak clearly - keep phone 1-2 feet away`,

      'How do I turn on speaker phone?|Android': `Let me show you how to use speaker phone.

During a phone call:

1. Look at your screen while on the call

2. Find the "Speaker" icon at the bottom
   - Looks like a speaker

3. Tap it once

4. The icon turns colored/highlighted = speaker is ON

5. Now you can set the phone down and talk

To turn it OFF:
- Tap the speaker icon again
- Sound goes back to the earpiece

What speaker phone does:
- Sound comes from your phone's speaker
- Everyone nearby can hear both sides
- Good for when you need hands free

Tips:
- Don't use in public (private conversations!)
- Ask the other person "Can I put you on speaker?" first
- Keep phone about 1-2 feet away when talking`
    };

    return answers[key] || `I'll help you with "${question}" on ${device}!

Let me get you the detailed steps. What specific part do you need help with?`;
  };

  const getDirectAnswer = (question: string): string => {
    const directAnswers: Record<string, string> = {
            'I forgot my password': `I can help you recover your password!

First, let me know what password you forgot:
- Email password (like Gmail, Yahoo)?
- Password to unlock your phone or computer?
- Password for a website (like Facebook, Amazon)?
- Wi-Fi password?

Tell me which one, and I'll walk you through exactly how to reset it.`,

      'Should I write down my passwords?': `Yes! Writing down passwords is actually a GOOD idea - as long as you keep them safe.

The safest way:

Keep a small notebook just for passwords
- Store it in a drawer at home
- Don't carry it with you
- Don't leave it where visitors can see it

What to write:
- Website name (like "Amazon")
- Your username or email
- The password
- Date you created it

Where NOT to keep passwords:
- On sticky notes on your monitor
- In your wallet or purse
- On your phone in Notes
- In an email to yourself

Even better option:
Your phone can remember passwords for you! 
- iPhone does this automatically
- Android does this too
- Much more secure

But keeping a written notebook at home is perfectly fine and very common!

Would you like help setting up your phone to remember passwords instead?`,

      'What makes a strong password?': `Let me explain what makes a good, safe password.

A strong password has:

1. At least 12 characters (letters and numbers)
2. Mix of CAPITAL and lowercase letters
3. At least one number
4. At least one symbol (like ! @ # $)

Good examples:
- Surfing@Maui2025!
- MyDog$Loves2Run
- Coffee&Books#Morning

Bad examples:
- password
- 123456
- Your birthday or name

Easy trick - Use a sentence:
Think of something you'll remember, then:
- "I love surfing at Poipu Beach"
- Becomes: ILove$urfing@Poipu!

Important:
- Use different passwords for different websites
- Don't use the same password everywhere
- If one gets hacked, they all get hacked!

Write it down safely:
Keep your passwords in a notebook at home, in a safe place.

Need help creating a password for a specific account?`,

      'How do password managers work?': `Let me explain password managers in simple terms.

What is it?
Think of it like a safe where you keep all your passwords.
- You only need to remember ONE password
- It remembers all your other passwords
- Works on your phone and computer

How it works:

1. You create one "master password"
   - This is the only one you need to remember!
   - Make it strong but memorable

2. Save all your other passwords in it
   - Website passwords
   - App passwords
   - Everything!

3. When you need to log in somewhere
   - The password manager fills it in automatically
   - You don't have to type anything!

Is it safe?
Yes! Very safe.
- Your passwords are locked up tight
- Much safer than writing them down
- Safer than using the same password everywhere

Do you need one?
Good news - your phone already has one built in!
- iPhone has iCloud Keychain
- Android has Google Password Manager
- They work automatically

Want me to help you turn on your phone's password manager?
It's already there - you just need to turn it on!`,

      'How do I add a contact?': `Let me show you how to add someone's contact information.

On iPhone:

1. Open the "Contacts" app
   - Has a gray icon with a person silhouette

2. Tap the "+" button
   - Top-right corner

3. Type in their information:
   - First name
   - Last name
   - Phone number
   - Email (if you want)

4. Tap "Done" at the top

On Android:

1. Open the "Contacts" or "People" app

2. Tap the "+" button

3. Type in their information:
   - Name
   - Phone number
   - Email (optional)

4. Tap "Save"

Quick way from a text message:

If they texted you:
1. Open the text message
2. Tap their phone number at the top
3. Tap "Create New Contact"
4. Add their name
5. Tap "Done" or "Save"

Now when they call, you'll see their name instead of just a number!

Can't find the Contacts app?
- iPhone: It's usually on your home screen
- Android: Swipe up to see all apps, look for "Contacts"

Need help finding a contact you already added?`,

      'How do I send an email with a photo?': `Let me walk you through sending a photo by email.

Here's how:

1. Open your email app
   - Gmail, Yahoo, Mail, etc.

2. Tap "Compose" or the "+" button
   - This starts a new email

3. Type the person's email address in the "To" line

4. Type a subject
   - Like "Photos from Thanksgiving"

5. Tap in the message area and type your message

6. Look for a paperclip or camera icon
   - Usually at the bottom
   - Tap it

7. Choose "Photos" or "Gallery"

8. Tap the photo you want to send
   - You can select multiple photos

9. Tap "Done" or "Choose"

10. Wait while it attaches - you'll see the photo(s)

11. Tap "Send"

How many photos can you send?
- Usually 3-5 photos per email works well
- Too many makes the email too big

Can't find the photo?
- Make sure you're looking in the right album
- Photos might be in "Camera Roll" or "Recents"

That's it! The person will receive your email with the photos attached.

Need help with a specific email app?`,

      'How do I delete old emails?': `Let me show you how to delete old emails.

On iPhone Mail app:

1. Open the Mail app

2. Find an email you want to delete

3. Swipe LEFT on the email

4. Tap "Trash"

To delete multiple emails:
1. Tap "Edit" in the top-right
2. Tap each email you want to delete
3. Tap "Trash" at the bottom
4. Tap "Done"

On Gmail (phone):

1. Open Gmail app

2. Tap and HOLD an email

3. Tap other emails to select more

4. Tap the trash icon at the top

On computer:

1. Open your email

2. Check the box next to emails you want to delete

3. Click the trash or delete button

Important:
- Deleted emails go to Trash first
- They stay there for 30 days
- Then they're deleted permanently
- You can empty trash to delete them sooner

Tip: Delete emails regularly to keep your inbox clean!`,

      'How do I unsubscribe from emails?': `Let me show you how to stop unwanted emails.

Here's what to do:

1. Open an email you don't want anymore

2. Scroll ALL THE WAY to the bottom

3. Look for tiny text that says "Unsubscribe"
   - It's usually in small gray letters

4. Tap or click "Unsubscribe"

5. You'll go to a webpage

6. Click "Unsubscribe" or "Confirm"

That's it!

Important:
- It may take a few days to stop
- You'll stop getting emails from them

Quick way on Gmail:

1. Open the email

2. Look next to the sender's name at the top

3. If you see "Unsubscribe," tap it

4. Tap "Unsubscribe" again

Much faster!

Can't find "Unsubscribe"?
- It might be spam
- Just delete it and mark as spam
- Don't reply to it

Tip: Unsubscribe from emails you never read - keeps your inbox cleaner!`,

      'I forgot my email password': `Let me help you reset your email password.

For Gmail:

1. Go to gmail.com

2. Click "Forgot password?"

3. Enter your email address

4. Click "Next"

5. Google will send a code to your phone
   - Enter the code you receive

6. Create a new password

7. Type it again to confirm

8. Click "Save"

For Yahoo Mail:

1. Go to yahoo.com

2. Click "Sign in"

3. Enter your email

4. Click "Forgot password?"

5. Choose how to get a code:
   - Text to your phone
   - Call your phone

6. Enter the code you receive

7. Create new password

8. Click "Continue"

Important:
- Write down your new password
- Keep it somewhere safe
- Don't use the same password everywhere

Can't get the code?
- Make sure you have access to your phone
- Check your phone number is correct
- Call your email company for help

Need help with a different email service? Tell me which one!`,

      'How do I delete apps I don\'t use?': `Let me show you how to delete apps you don't use.

On iPhone/iPad:

1. Find the app you want to delete on your home screen

2. Press and HOLD the app icon for 2-3 seconds

3. A menu pops up

4. Tap "Remove App"

5. Tap "Delete App" (NOT "Remove from Home Screen")

6. Tap "Delete" to confirm

The app is gone!

On Android:

1. Find the app you want to delete

2. Press and HOLD the app icon

3. Drag it up to "Uninstall" at the top of the screen

4. Drop it there

5. Tap "OK" to confirm

Important:
- Deleting removes the app AND its data
- You can always download it again later from the App Store or Play Store
- Some built-in apps can't be deleted (like Messages or Phone)

Which apps should you delete?
- Games you don't play anymore
- Apps you haven't opened in months
- Apps you don't remember downloading

This frees up space on your phone!

Need help deciding which apps to delete?`,

      'Why is my phone storage full?': `Let me help you understand why your phone says it's full.

The main reasons:

1. PHOTOS & VIDEOS (usually the biggest!)
   - Each photo takes up space
   - Videos take up A LOT of space

2. APPS you downloaded
   - Games especially take up lots of room
   - Apps you don't use anymore

3. TEXT MESSAGES with photos
   - Old conversations with pictures

Quick fixes:

Delete photos you don't need:
1. Open Photos app
2. Look through your photos
3. Delete blurry ones, duplicates, or ones you don't want
4. Go to "Recently Deleted" album
5. Tap "Select All"
6. Tap "Delete All"
   - This actually frees up the space!

Delete apps you don't use:
1. Press and hold an app icon on your home screen
2. Tap "Remove App"
3. Tap "Delete App"

On iPhone - Check storage:
1. Settings > General > iPhone Storage
2. See what's taking up space
3. Delete what you don't need

On Android - Check storage:
1. Settings > Storage
2. See what's using space
3. Tap categories to delete items

The #1 tip: Delete old photos and videos!

That's where most space goes. Go through your photos and delete ones you don't need.`,

      'My computer is running slow, what should I do?': `Let me help you speed up your computer.

Quick fixes to try first:

1. RESTART YOUR COMPUTER
   - This fixes most slowness!
   - Clears memory
   - See "How do I restart my computer?" for steps

2. CLOSE PROGRAMS YOU'RE NOT USING
   - Look at the taskbar (bottom of screen)
   - Right-click programs you're not using
   - Click "Close"

3. CLOSE BROWSER TABS
   - Each tab uses memory
   - Keep only the ones you're using open

Still slow? Try these:

4. CHECK FOR UPDATES
   - Windows: Start > Settings > Update
   - Mac: Apple menu > Software Update
   - Updates can speed things up

5. FREE UP DISK SPACE
   - Delete old files you don't need
   - Empty Recycle Bin (Windows) or Trash (Mac)
   - Your computer needs breathing room

6. RUN VIRUS SCAN
   - Windows: Search for "Windows Security"
   - Click "Virus & threat protection"
   - Click "Quick scan"

When to get help:
- If it's still very slow after trying these
- If it takes 10+ minutes to start
- If programs crash often

Tip: Restart your computer once a week to keep it running smoothly!`,

      'How do I close a frozen program?': `Let me show you how to close a program that's stuck.

On Windows:

1. Press these three keys at the same time:
   - Ctrl + Alt + Delete

2. Click "Task Manager"

3. Find the frozen program in the list
   - It might say "Not Responding"

4. Click on it once

5. Click "End Task" at the bottom

6. Wait a few seconds - the program closes

On Mac:

1. Press these three keys at the same time:
   - Command + Option + Esc

2. A window appears with all your programs

3. Click on the frozen program

4. Click "Force Quit"

5. Click "Force Quit" again to confirm

What you'll lose:
- Any work you didn't save in that program
- But your other programs will be fine!

Important:
- This only closes ONE program
- Your computer will be fine
- You can open the program again after

Tip: Save your work often (every few minutes) so you don't lose it if something freezes!`,

      'How do I create a new folder?': `Let me show you how to create a folder to organize your files.

On Windows:

1. Go to where you want the folder
   - Desktop, Documents, etc.

2. Right-click on an empty space

3. Hover over "New"

4. Click "Folder"

5. A new folder appears

6. Type a name for your folder
   - Like "2025 Tax Documents" or "Family Photos"

7. Press Enter

Done!

On Mac:

1. Go to where you want the folder
   - Desktop, Documents, etc.

2. Right-click on an empty space
   - Or Control + click if you don't have right-click

3. Click "New Folder"

4. Type a name for your folder

5. Press Return

Done!

Tips for naming folders:
- Be specific: "2025 Medical Bills" not just "Bills"
- Use dates: "2024 Tax Returns"
- Make it clear what's inside

Why use folders?
- Keeps files organized
- Easy to find things later
- Like putting papers in labeled file folders

Want help organizing specific files?`,

      'How do I save a file?': `Let me show you how to save a file on your computer.

When you're working on something (like a Word document):

1. Click "File" at the top

2. Click "Save As"

3. A window opens asking WHERE to save it

4. Choose a location:
   - Documents (good for keeping)
   - Desktop (for things you're working on now)

5. Type a name for your file
   - Like "Letter to Dr Smith" or "Grocery List"

6. Click "Save"

That's it! Your file is saved.

Quick way to save:
- Press Ctrl + S (Windows)
- Press Command + S (Mac)

Do this often while you're working!
- Every few minutes
- After typing something important
- Before you close the program

How to know if it's saved:
- The title at the top shows your file name
- No asterisk (*) next to the name

If you see an asterisk:
- That means you have unsaved changes
- Press Ctrl + S or Command + S to save

Where to find your saved file later:
- Look in Documents folder
- Or Desktop
- Or wherever you chose to save it

Tip: Save your work every 5 minutes so you don't lose anything if something goes wrong!`,
    
      'How do I change my password?': `I can help you change your password!

First, tell me WHICH password you want to change:

1. Email password (Gmail, Yahoo, etc.)?
2. Password to unlock your phone or computer?
3. Password for a website (Facebook, Amazon, etc.)?
4. Wi-Fi password?

Tell me which one, and I'll walk you through the exact steps to change it.

General tip:
Most websites have password change in:
- Settings or Account Settings
- Security section
- Look for "Change Password"

Want specific steps? Tell me what you're trying to change!`,

      'How do I take a photo?': `Let me show you how to take a photo.

On iPhone:

1. Find the Camera app
   - Gray icon with a camera

2. Tap to open it

3. Point the camera at what you want to photograph

4. Tap the big white circle button at the bottom

5. You'll hear a click - photo is taken!

Where to find your photo:
- Open the Photos app
- It's in "Recents"

On Android:

1. Find the Camera app

2. Tap to open it

3. Point at what you want to photograph

4. Tap the circle button (usually white or blue)

5. Photo is taken!

Where to find your photo:
- Open Gallery or Photos app
- Look in "Camera" album

Tips:
- Hold phone steady
- Make sure there's enough light
- Tap on screen to focus before taking the picture`,

      'How do I share photos with family?': `Let me show you how to share photos with family.

By Text Message:

1. Open your Messages app

2. Open a conversation (or start a new one)

3. Tap the camera icon or "+" button

4. Tap "Photo Library" or "Photos"

5. Tap the photos you want to send

6. Tap "Send"

By Email:

1. Open Photos app

2. Tap the photo you want to share

3. Tap the "Share" button
   - Square with arrow pointing up

4. Tap "Mail"

5. Type their email address

6. Tap "Send"

Share multiple photos at once:

1. Open Photos app

2. Tap "Select" in top-right

3. Tap each photo you want to share

4. Tap "Share" button

5. Choose Text Message or Mail

6. Send!

How many can you send?
- Text: Usually 3-5 photos at a time
- Email: Usually 3-5 photos at a time
- More than that gets too big!`,

      'How do I delete unwanted photos?': `Let me show you how to delete photos you don't want.

On iPhone:

1. Open the Photos app

2. Tap the photo you want to delete

3. Tap the trash can icon (bottom-right)

4. Tap "Delete Photo"

To delete multiple photos:
1. Tap "Select" in the top-right
2. Tap each photo you want to delete
3. Tap the trash icon
4. Tap "Delete X Photos"

IMPORTANT - Actually delete them:
1. Go to "Albums" at the bottom
2. Scroll down to "Recently Deleted"
3. Tap "Select" then "Delete All"
4. This actually frees up space!

On Android:

1. Open Photos or Gallery app

2. Tap and HOLD a photo

3. Tap other photos to select more

4. Tap the trash icon

5. Tap "Delete" or "Move to trash"

The photos go to trash and are deleted after 30 days, or you can empty trash now.

Tip: Delete blurry photos, duplicates, and ones you don't need to free up space!`,

      'How do I organize my photos into albums?': `Let me show you how to organize photos into albums.

On iPhone:

Create a new album:
1. Open Photos app
2. Tap "Albums" at the bottom
3. Tap the "+" sign
4. Tap "New Album"
5. Type a name (like "Vacation 2024")
6. Tap "Save"

Add photos to the album:
1. Tap "Add Photos"
2. Tap each photo you want in this album
3. Tap "Done"

Add more photos later:
1. Open the album
2. Tap "Add Photos"
3. Select more photos
4. Tap "Done"

On Android:

1. Open Photos or Gallery app

2. Long-press a photo

3. Tap other photos to select more

4. Tap the three dots (menu)

5. Tap "Move to album" or "Add to album"

6. Tap "Create new album"

7. Type a name

8. Tap "OK" or "Create"

Good album names:
- "Family Events 2024"
- "Hawaii Vacation"
- "Grandkids Photos"
- "Holiday Celebrations"

Why organize?
- Find photos faster
- Keep related photos together
- Easier to share groups of photos`,

      'How do I print photos?': `Let me show you how to print photos.

From your phone:

1. Open Photos app

2. Tap the photo you want to print

3. Tap the Share button
   - Square with arrow pointing up

4. Scroll down and tap "Print"

5. Choose your printer
   - If you have a wireless printer at home
   - It should appear in the list

6. Choose number of copies

7. Tap "Print"

Don't have a printer at home?

Option 1 - Pharmacy:
- Walgreens, CVS, Walmart all print photos
- Use their app to upload photos
- Pick up in 1 hour
- Usually 25-50 cents per photo

Option 2 - Online services:
- Shutterfly
- Snapfish
- Amazon Photos
- Upload photos, they mail them to you

From computer:

1. Plug phone into computer with cable

2. Copy photos to computer

3. Open photo in computer

4. Click "File" > "Print"

5. Choose printer

6. Click "Print"

Tips:
- Most people use pharmacy printing - easy and cheap!
- You can order prints from your phone
- Pick them up same day

Need help using a specific service?`,

      'Why is my internet slow?': `Let me help you figure out why your internet is slow.

Quick fixes to try first:

1. RESTART YOUR ROUTER
   - This fixes most internet problems!
   - Unplug the router from power
   - Wait 30 seconds
   - Plug it back in
   - Wait 3 minutes for it to restart

2. MOVE CLOSER TO THE ROUTER
   - Wi-Fi gets weaker the farther away you are
   - Try using your device in the same room as the router
   - See if it's faster there

3. TOO MANY PEOPLE USING IT
   - Is everyone in the house online?
   - Streaming video uses a LOT of internet
   - Ask others to pause for a moment

4. CHECK YOUR DEVICE
   - Close apps you're not using
   - Restart your phone or computer
   - See "How do I restart" for steps

Still slow?

5. Call your internet company
   - They can check your connection
   - Tell them "My internet is very slow"
   - They can run tests from their office

When internet is slowest:
- Evening (7-10 PM) when everyone is online
- When it's raining or stormy
- When many devices are connected

The #1 fix: Restart your router! Unplug it, wait 30 seconds, plug back in.`,

      'How do I reset my Wi-Fi?': `Let me show you how to reset (restart) your Wi-Fi router.

This fixes most Wi-Fi problems!

Here's what to do:

1. Find your Wi-Fi router
   - The box with blinking lights
   - Usually has antennas

2. Follow the power cord to where it plugs in

3. UNPLUG the power cord
   - Either from the router or from the wall outlet

4. WAIT 30 seconds
   - Count to 30 slowly

5. PLUG IT BACK IN

6. Wait 2-3 minutes
   - Lights will blink
   - Then steady or slow blinking = ready!

7. Try connecting to Wi-Fi again

That's it!

What this does:
- Clears the router's memory
- Fixes connection problems
- Makes internet work better

When to do this:
- When Wi-Fi isn't working
- When internet is very slow
- When devices won't connect
- Once a month for maintenance

What you'll see:
- All lights turn off when unplugged
- Lights come back on when plugged in
- Takes 2-3 minutes to fully restart

Important:
- This is SAFE to do
- Won't delete your Wi-Fi password
- Won't lose any settings

Still not working after restart? Call your internet company.`,

      'What if I forgot my Wi-Fi password?': `Let me help you find your Wi-Fi password.

Easiest way - Check your router:

1. Find your Wi-Fi router
   - The box with blinking lights

2. Look on the bottom or back

3. Find a sticker with information

4. Look for these words:
   - "Password"
   - "WPA Key"  
   - "Network Key"
   - "Wireless Password"

5. That's your password!
   - Write it down somewhere safe

Can't find the sticker?

Ask a device that's already connected:

On iPhone (already connected):
1. Settings > Wi-Fi
2. Tap the (i) next to your network
3. Tap the password field
4. Use Face ID or fingerprint
5. Password appears!

On Android (already connected):
1. Settings > Wi-Fi
2. Tap your network name
3. Tap "Share"
4. Use fingerprint
5. Shows QR code with password below it

Still can't find it?

Call your internet company:
- Comcast: 1-800-XFINITY
- AT&T: 1-800-288-2020
- Spectrum: 1-855-707-7328
- Verizon: 1-800-VERIZON

Tell them: "I forgot my Wi-Fi password"
They can tell you or help you reset it.

After you find it:
- Write it in a notebook
- Keep it somewhere safe at home
- You'll need it for new devices`,

      'How do I make a FaceTime call?': `Let me show you how to make a FaceTime video call. This only works between Apple devices (iPhone to iPhone, iPhone to iPad, etc.).

Here's what to do:

1. Open the FaceTime app
   - Green icon with a video camera

2. Tap the "+" button at the top

3. Start typing the person's name

4. Tap their name when it appears

5. Tap the video camera icon

6. Wait for them to answer

During the call:
- You'll see them on your screen
- They'll see you
- Speak normally

To end the call:
- Tap the red phone icon

Tips:
- Make sure you have good lighting (face a window)
- Hold phone steady or prop it up
- You need Wi-Fi or cellular data

Can't see them?
- Make sure camera isn't covered
- Try tapping the camera flip button

Can't hear them?
- Turn up volume
- Make sure you didn't mute yourself

The other person needs an iPhone, iPad, or Mac to FaceTime with you.

To call someone who doesn't have Apple, see "How do I join a Zoom meeting?" instead.`,

      'How do I join a Zoom meeting?': `Let me show you how to join a Zoom video call.

First time only - Download Zoom:
1. Open App Store (iPhone) or Play Store (Android)
2. Search for "Zoom"
3. Tap "Install"
4. Wait for it to download

To join a meeting:

1. Someone will send you a Zoom link
   - Usually by email or text
   - Looks like: zoom.us/j/123456789

2. Tap or click the link

3. Zoom app opens

4. Tap "Join with Video"

5. Tap "Call using Internet Audio"
   - This is important - lets you hear!

6. You're in the meeting!

During the meeting:

Mute yourself:
- Tap the microphone icon
- Red slash = you're muted
- Tap again to unmute

Turn camera on/off:
- Tap the video camera icon
- Red slash = camera is off

End the call:
- Tap "Leave" in the corner

Tips:
- Find a quiet place
- Good lighting helps (face a window)
- Mute yourself when not talking
- You can join from phone or computer

On computer:
1. Click the Zoom link
2. It downloads and opens automatically
3. Click "Join with Computer Audio"

Don't need a Zoom account to join - just click the link!

First time might take a few minutes to set up, but then it's easy.`,

      'My video is frozen, what do I do?': `Let me help you fix frozen video during a call.

Quick fixes to try:

1. TURN VIDEO OFF AND ON
   - Tap the camera icon
   - Wait 2 seconds
   - Tap it again
   - This usually fixes it!

2. MOVE CLOSER TO WI-FI ROUTER
   - Frozen video usually means weak internet
   - Get closer to your router
   - Video should get better

3. TURN OFF YOUR VIDEO
   - If it keeps freezing, turn video off
   - You can still hear and talk!
   - Just tap the camera icon

4. CLOSE OTHER APPS
   - Too many apps makes video freeze
   - Close everything except the video call

5. RESTART THE CALL
   - Leave the call
   - Wait 10 seconds
   - Join again
   - Usually works better after restart

Still freezing?

- Ask others in your house to pause Netflix or YouTube
- Video streaming uses a lot of internet
- Or just use audio only (no video)

The #1 cause: Internet is too slow or you're too far from the router.

The #1 fix: Move closer to your Wi-Fi router!

Audio-only is perfectly fine if video won't work - better than nothing!`,

      'How do I mute myself on a call?': `Let me show you how to mute yourself during a video call.

On Zoom:

1. Look at the bottom of your screen

2. Find the microphone icon

3. Tap it once

4. Red slash appears = you're muted

5. Tap again to unmute

On FaceTime:

1. Tap anywhere on the screen

2. Tap the microphone icon

3. Red slash = muted

4. Tap again to unmute

On other video calls:
- Look for microphone icon at the bottom
- Tap once to mute
- Tap again to unmute

How to know if you're muted:
- Red slash through microphone = muted
- No slash = unmuted (they can hear you)

When to mute:
- When you're not talking
- When there's background noise (dogs, kids, etc.)
- When typing on keyboard
- In large meetings

Important:
- When muted, they CAN'T hear you
- Unmute before you talk!
- Everyone forgets sometimes - it's normal

Tip: Stay muted when not talking, unmute only when you need to speak.`,

      'How do I share my screen?': `Let me show you how to share your screen during a video call.

On Zoom (most common):

1. During a meeting, tap "Share"
   - Green button at bottom

2. Choose what to share:
   - "Screen" = everything on your phone
   - Or choose a specific app

3. Tap "Start Broadcast"

4. Your screen is now visible to everyone!

To stop sharing:
- Red bar at top says "You are sharing"
- Tap it
- Tap "Stop Share"

On computer (Zoom):

1. Click green "Share Screen" button at bottom

2. Choose what window to share
   - Your whole screen
   - Or just one program

3. Click "Share"

4. Everyone can see your screen

To stop:
- Click "Stop Share" (red button)

Important:
- Everyone will see EVERYTHING on your screen
- Close private things first (email, banking)
- Turn off notifications
- Only share when needed

When to share:
- Showing someone how to do something
- Presenting information
- Getting help with something on your screen

Most common use: Someone helping you with tech problems - they can see what you see!`,

      'Why can\'t I hear anything?': `Let me help you figure out why you can't hear anything.

Quick checks:

1. CHECK THE VOLUME
   - Press the volume UP button
   - Several times to make sure it's loud
   - Look for volume bar on screen

2. CHECK IF MUTED
   - iPhone: Check the switch on the left side
   - If you see orange, flip it = unmuted
   - Android: Make sure not in silent mode

3. UNPLUG HEADPHONES
   - If headphones are plugged in, sound goes there
   - Unplug them
   - Try again

4. RESTART YOUR DEVICE
   - Turn it off completely
   - Wait 10 seconds
   - Turn back on
   - This fixes many sound issues

Still can't hear?

5. CHECK WHAT YOU'RE PLAYING
   - Play a video or music
   - Make sure you pressed "play"
   - Check that video isn't muted

6. CHECK BLUETOOTH
   - Sound might be going to Bluetooth device
   - Swipe down (phone) and turn OFF Bluetooth
   - Try again

On computer:

1. Click speaker icon (bottom-right on Windows, top-right on Mac)
2. Make sure volume isn't at zero
3. Make sure not muted (no X on speaker icon)

When to get help:
- If you can't hear after trying all these
- If speaker seems broken
- If only one side of headphones works

The most common fixes: Turn up volume, restart device, unplug headphones!`,

      'Why is there an echo on my calls?': `Let me help you fix the echo on your calls.

The echo is usually caused by volume being too loud.

Quick fixes:

1. TURN DOWN THE VOLUME
   - This fixes it 90% of the time!
   - Press volume DOWN button
   - Lower it by about half
   - Echo should go away

2. USE HEADPHONES
   - Best fix for echo!
   - Plug in headphones or earbuds
   - Echo disappears completely

3. MOVE PHONE AWAY FROM OTHER DEVICES
   - Don't put phone near computer speakers
   - Keep it away from TV
   - Distance helps

Still have echo?

4. ASK WHO HAS THE PROBLEM
   - Ask: "Do you hear an echo?"
   - If THEY hear echo = it's on your end (fix your volume)
   - If YOU hear echo = it's on their end (they need to fix volume)

5. MUTE WHEN NOT TALKING
   - Tap mute button
   - Unmute only when you speak
   - Prevents echo feedback

6. MOVE TO DIFFERENT ROOM
   - Bathrooms and empty rooms echo more
   - Try a room with carpet or furniture
   - Softer surfaces = less echo

The #1 fix: Turn down your volume by half. If that doesn't work, use headphones!

For video calls: Everyone should mute when not talking - this prevents echo.`,

      'How do I change my ringtone?': `Let me show you how to change your ringtone.

On iPhone:

1. Open "Settings"

2. Tap "Sounds & Haptics" (or just "Sounds")

3. Tap "Ringtone"

4. You'll see a list of ringtones

5. Tap any ringtone to hear it

6. Tap the one you like

7. Tap back - it's now your ringtone!

Want different ringtones for different people?

1. Open Contacts

2. Find the person

3. Tap "Edit"

4. Tap "Ringtone"

5. Choose a unique sound for them

6. Tap "Done"

Now you know who's calling without looking!

On Android:

1. Open "Settings"

2. Tap "Sound" or "Sounds and vibration"

3. Tap "Ringtone" or "Phone ringtone"

4. Tap ringtones to hear them

5. Tap the one you want

6. Tap "OK" or back button

Tips:
- Choose something you can hear clearly
- Not too embarrassing (it will ring in public!)
- Test it to make sure you like it

Can't hear your ringtone?
- Check volume in Settings > Sounds
- Make sure phone isn't in silent mode`,

      'How do I turn off notifications?': `Let me show you how to turn off annoying notifications.

On iPhone:

Turn off ALL notifications temporarily:
1. Swipe down from top-right corner
2. Tap the moon icon (Focus/Do Not Disturb)
3. All notifications silenced!
4. Tap again to turn back on

Turn off notifications from specific app:
1. Open "Settings"
2. Tap "Notifications"
3. Scroll to find the annoying app
4. Tap the app name
5. Turn OFF "Allow Notifications"

On Android:

Turn off ALL notifications temporarily:
1. Swipe down from top
2. Tap "Do Not Disturb"
3. All notifications silenced!

Turn off notifications from specific app:
1. Open "Settings"
2. Tap "Apps" or "Notifications"
3. Find the app
4. Tap "Notifications"
5. Turn OFF "Show notifications"

Quick way (both phones):
- When you see a notification, long-press it
- Tap "Turn off notifications"
- Done!

Which apps to turn off?
- Games (usually too many)
- Shopping apps
- Social media (if too many)
- News apps (if constant)

Which to keep on?
- Text messages
- Phone calls
- Calendar reminders
- Important emails

You can always check apps manually - you don't need notifications for everything!`,

      'Where do I find settings?': `Let me show you where to find Settings.

On iPhone:

1. Look on your home screen

2. Find the GRAY app with a GEAR icon
   - Says "Settings" under it

3. Tap it to open

Can't find it?
- Swipe down on home screen
- Type "Settings" in search box
- Tap it when it appears

On Android:

1. Swipe up from bottom of screen
   - Shows all your apps

2. Look for the GEAR icon
   - Usually says "Settings"

3. Tap it to open

Quick way:
- Swipe down from top of screen
- Tap the gear icon in the corner

On Windows computer:

1. Click the Start button (bottom-left corner)

2. Click the GEAR icon
   - Says "Settings"

Or press: Windows key + I

On Mac computer:

1. Click the Apple logo (top-left corner)

2. Click "System Settings" (or "System Preferences")

What's in Settings?
- Wi-Fi
- Volume/Sounds
- Display/Brightness
- Apps
- Battery
- Everything you need to adjust!

Once you find it once, you'll always know where it is!`    
    
    };

    return directAnswers[question] || `I can help with that! 

Tell me more about what you're trying to do, and I'll walk you through it step by step.

What specifically is giving you trouble?`;
  };

  const askQuestion = async (question: string) => {
    if (!question.trim()) return;

    setChatHistory([...chatHistory, { role: 'user', content: question }]);
    setIsTyping(true);
    setCustomQuestion('');

    await new Promise(resolve => setTimeout(resolve, 600));

    if (deviceQuestions.includes(question)) {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `I'll help you with that! First, which device are you using?`,
        showDeviceButtons: true,
        questionKey: question
      }]);
      setIsTyping(false);
      return;
    }

    const response = getDirectAnswer(question);
    setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  const handleDeviceSelection = (device: string, questionKey: string) => {
    setChatHistory(prev => [...prev, { role: 'user', content: device }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getAnswerForDevice(questionKey, device);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response, device, questionKey }]);
      setIsTyping(false);
    }, 600);
  };

  const saveAnswer = (question: string, answer: string, device?: string) => {
    const newSaved = {
      question,
      answer,
      device,
      timestamp: Date.now()
    };
    setSavedAnswers(prev => [...prev, newSaved]);
  };

  const removeSavedAnswer = (timestamp: number) => {
    setSavedAnswers(prev => prev.filter(item => item.timestamp !== timestamp));
  };

  const printInstructions = (question: string, answer: string, device?: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const steps = answer.split('\n').filter(line => line.trim());
    const checkboxSteps = steps.map((step, index) => {
      if (step.match(/^\d+\./)) {
        return `<div style="margin: 20px 0; display: flex; align-items: flex-start;">
          <input type="checkbox" style="width: 30px; height: 30px; margin-right: 20px; flex-shrink: 0; margin-top: 5px;" />
          <span style="font-size: 22px; line-height: 1.6;">${step}</span>
        </div>`;
      }
      return `<p style="font-size: 22px; line-height: 1.8; margin: 15px 0;">${step}</p>`;
    }).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tech Helper Instructions - ${question}</title>
          <style>
            @media print {
              body { margin: 1in; }
              .no-print { display: none; }
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.8;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              color: #265073;
              font-size: 36px;
              margin-bottom: 10px;
            }
            h2 {
              color: #2D9596;
              font-size: 28px;
              margin-top: 30px;
              margin-bottom: 20px;
            }
            .device-badge {
              display: inline-block;
              background: #9AD0C2;
              color: #265073;
              padding: 8px 20px;
              border-radius: 8px;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 30px;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 2px solid #E5E7EB;
              color: #6B7280;
              font-size: 18px;
            }
            .print-btn {
              background: #2D9596;
              color: white;
              border: none;
              padding: 15px 30px;
              font-size: 20px;
              border-radius: 8px;
              cursor: pointer;
              margin-bottom: 30px;
            }
            .print-btn:hover {
              opacity: 0.9;
            }
          </style>
        </head>
        <body>
          <button class="print-btn no-print" onclick="window.print()">🖨️ Print This Page</button>
          <h1>📖 Tech Helper Instructions</h1>
          <h2>${question}</h2>
          ${device ? `<div class="device-badge">Device: ${device}</div>` : ''}
          <div style="margin-top: 30px;">
            ${checkboxSteps}
          </div>
          <div class="footer">
            <p><strong>Mālama Digital Care</strong></p>
            <p>Need more help? Call (808) 555-1234</p>
            <p>Printed on: ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <button
            onClick={onBack}
            className="text-[22px] font-medium hover:underline"
            style={{ color: '#2D9596' }}
          >
            ← Back
          </button>
          {savedAnswers.length > 0 && (
            <button
              onClick={() => setShowSavedLibrary(!showSavedLibrary)}
              className="h-14 px-6 text-[18px] font-bold rounded-xl border-2 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
              style={{ 
                borderColor: '#2D9596', 
                color: '#2D9596', 
                background: showSavedLibrary ? '#E0F2F1' : '#FFFFFF' 
              }}
            >
              <Bookmark className="w-5 h-5" />
              Saved Answers ({savedAnswers.length})
            </button>
          )}
        </div>

        {!selectedCategory && chatHistory.length === 0 ? (
          <>
            {/* Saved Library Panel at Top */}
            {showSavedLibrary && savedAnswers.length > 0 && (
              <div className="mb-10 p-6 rounded-2xl border-2" style={{ borderColor: '#2D9596', background: '#F0F9FF' }}>
                <h3 className="text-[28px] font-bold mb-6 flex items-center gap-3" style={{ color: '#265073' }}>
                  <Star className="w-8 h-8" style={{ color: '#F59E0B' }} />
                  Your Saved Help Library
                </h3>
                <div className="space-y-4">
                  {savedAnswers.map((saved) => (
                    <div key={saved.timestamp} className="p-6 rounded-xl border-2 bg-white" style={{ borderColor: '#E5E7EB' }}>
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <h4 className="text-[22px] font-bold flex-1" style={{ color: '#265073' }}>
                          {saved.question}
                        </h4>
                        <button
                          onClick={() => removeSavedAnswer(saved.timestamp)}
                          className="text-[18px] px-4 py-2 rounded hover:opacity-70 active:scale-95 transition-all"
                          style={{ color: '#DC2626' }}
                        >
                          Remove
                        </button>
                      </div>
                      {saved.device && (
                        <span className="inline-block px-3 py-1 rounded text-[16px] font-bold mb-3" style={{ background: '#9AD0C2', color: '#265073' }}>
                          📱 {saved.device}
                        </span>
                      )}
                      <button
                        onClick={() => printInstructions(saved.question, saved.answer, saved.device)}
                        className="h-12 px-6 text-[18px] font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                        style={{ background: '#2D9596', color: '#FFFFFF' }}
                      >
                        <Printer className="w-5 h-5" />
                        Print Instructions
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div 
                  className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{ background: '#E0E7FF' }}
                >
                  <MessageCircle className="w-14 h-14" style={{ color: '#2D9596' }} />
                </div>
              </div>
              <h1 className="text-[48px] font-bold mb-4" style={{ color: '#265073' }}>
                Tech Helper
              </h1>
              <p className="text-[26px] leading-relaxed" style={{ color: '#4B5563' }}>
                We'll walk through it together, step by step!
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-[32px] font-bold mb-8" style={{ color: '#265073' }}>
                What do you need help with?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map(({ id, label, emoji }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border-3 transition-all hover:shadow-xl active:scale-95"
                    style={{ borderColor: '#D1D5DB', background: '#FFFFFF' }}
                  >
                    <span className="text-7xl mb-4">{emoji}</span>
                    <span className="text-[20px] font-semibold text-center leading-snug" style={{ color: '#265073' }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : selectedCategory && chatHistory.length === 0 ? (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-6 text-[22px] font-medium hover:underline"
              style={{ color: '#2D9596' }}
            >
              ← Choose Different Topic
            </button>

            <h2 className="text-[36px] font-bold mb-8" style={{ color: '#265073' }}>
              {categories.find(c => c.id === selectedCategory)?.emoji} {categories.find(c => c.id === selectedCategory)?.label}
            </h2>

            <p className="text-[24px] mb-8 leading-relaxed" style={{ color: '#4B5563' }}>
              Pick a question below, or type your own:
            </p>

            <div className="space-y-4 mb-10">
              {commonQuestions[selectedCategory].map((question, index) => (
                <button
                  key={index}
                  onClick={() => question === 'Type my own question' ? null : askQuestion(question)}
                  className="w-full text-left p-7 rounded-xl border-2 transition-all hover:shadow-lg hover:border-[#2D9596] text-[22px] font-medium"
                  style={{ borderColor: '#D1D5DB', color: '#265073' }}
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mt-10 p-8 rounded-2xl border-3" style={{ borderColor: '#2D9596', background: '#F0F9FF' }}>
              <h3 className="text-[26px] font-bold mb-6" style={{ color: '#265073' }}>
                💬 Or describe your problem in your own words:
              </h3>
              <textarea
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Example: My phone keeps saying storage is full and I don't know what to delete..."
                className="w-full min-h-[160px] text-[22px] p-6 rounded-xl border-2 mb-6"
                style={{ borderColor: '#D1D5DB' }}
              />
              <button
                onClick={() => askQuestion(customQuestion)}
                disabled={!customQuestion.trim()}
                className="h-[75px] px-10 text-[24px] font-bold rounded-xl w-full"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Get Help →
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <h2 className="text-[36px] font-bold" style={{ color: '#265073' }}>
                💬 Chat
              </h2>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setShowSavedLibrary(!showSavedLibrary)}
                  className="h-16 px-6 text-[18px] font-bold rounded-xl border-2 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                  style={{ 
                    borderColor: '#2D9596', 
                    color: '#2D9596', 
                    background: showSavedLibrary ? '#E0F2F1' : '#FFFFFF' 
                  }}
                >
                  <Bookmark className="w-5 h-5" />
                  Saved Answers ({savedAnswers.length})
                </button>
                <button
                  onClick={() => {
                    setChatHistory([]);
                    setSelectedCategory(null);
                    setCustomQuestion('');
                  }}
                  className="h-16 px-8 text-[20px] font-bold rounded-xl border-2 hover:opacity-90 active:scale-95 transition-all"
                  style={{ borderColor: '#265073', color: '#265073' }}
                >
                  Start Over
                </button>
              </div>
            </div>

            {/* Saved Library Panel */}
            {showSavedLibrary && savedAnswers.length > 0 && (
              <div className="mb-8 p-6 rounded-2xl border-2" style={{ borderColor: '#2D9596', background: '#F0F9FF' }}>
                <h3 className="text-[28px] font-bold mb-6 flex items-center gap-3" style={{ color: '#265073' }}>
                  <Star className="w-8 h-8" style={{ color: '#F59E0B' }} />
                  Your Saved Help Library
                </h3>
                <div className="space-y-4">
                  {savedAnswers.map((saved) => (
                    <div key={saved.timestamp} className="p-6 rounded-xl border-2 bg-white" style={{ borderColor: '#E5E7EB' }}>
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <h4 className="text-[22px] font-bold flex-1" style={{ color: '#265073' }}>
                          {saved.question}
                        </h4>
                        <button
                          onClick={() => removeSavedAnswer(saved.timestamp)}
                          className="text-[18px] px-4 py-2 rounded hover:opacity-70 active:scale-95 transition-all"
                          style={{ color: '#DC2626' }}
                        >
                          Remove
                        </button>
                      </div>
                      {saved.device && (
                        <span className="inline-block px-3 py-1 rounded text-[16px] font-bold mb-3" style={{ background: '#9AD0C2', color: '#265073' }}>
                          📱 {saved.device}
                        </span>
                      )}
                      <button
                        onClick={() => printInstructions(saved.question, saved.answer, saved.device)}
                        className="h-12 px-6 text-[18px] font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                        style={{ background: '#2D9596', color: '#FFFFFF' }}
                      >
                        <Printer className="w-5 h-5" />
                        Print Instructions
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showSavedLibrary && savedAnswers.length === 0 && (
              <div className="mb-8 p-8 rounded-2xl border-2 text-center" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                <Bookmark className="w-16 h-16 mx-auto mb-4" style={{ color: '#9CA3AF' }} />
                <p className="text-[22px]" style={{ color: '#6B7280' }}>
                  No saved answers yet. Click "Save Answer" on helpful responses!
                </p>
              </div>
            )}

            <div className="space-y-6 mb-8 max-h-[600px] overflow-y-auto">
              {chatHistory.map((message, index) => (
                <div key={index}>
                  <div
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="max-w-[85%] p-7 rounded-2xl text-[22px] whitespace-pre-line leading-relaxed"
                      style={{
                        background: message.role === 'user' ? '#2D9596' : '#F3F4F6',
                        color: message.role === 'user' ? '#FFFFFF' : '#265073'
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                  
                  {/* Save and Print Buttons for Assistant Answers */}
                  {message.role === 'assistant' && !message.showDeviceButtons && message.content.length > 100 && (
                    <>
                      <div className="flex justify-start mt-3 gap-3 flex-wrap">
                        <button
                          onClick={() => saveAnswer(
                            message.questionKey || chatHistory[index - 1]?.content || 'Question',
                            message.content,
                            message.device
                          )}
                          className="h-12 px-5 text-[18px] font-bold rounded-xl border-2 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                          style={{ borderColor: '#2D9596', color: '#2D9596', background: '#FFFFFF' }}
                        >
                          <Bookmark className="w-4 h-4" />
                          Save Answer
                        </button>
                        <button
                          onClick={() => printInstructions(
                            message.questionKey || chatHistory[index - 1]?.content || 'Instructions',
                            message.content,
                            message.device
                          )}
                          className="h-12 px-5 text-[18px] font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                          style={{ background: '#2D9596', color: '#FFFFFF' }}
                        >
                          <Printer className="w-4 h-4" />
                          Print Instructions
                        </button>
                      </div>

                      {/* Related Questions Suggestions */}
                      {message.questionKey && relatedQuestions[message.questionKey] && (
                        <div className="mt-5 ml-2">
                          <div className="p-5 rounded-xl border-2" style={{ borderColor: '#E5E7EB', background: '#FEFEFE' }}>
                            <p className="text-[18px] font-bold mb-3 flex items-center gap-2" style={{ color: '#265073' }}>
                              <HelpCircle className="w-5 h-5" style={{ color: '#2D9596' }} />
                              You might also want to know...
                            </p>
                            <div className="space-y-2">
                              {relatedQuestions[message.questionKey].slice(0, 3).map((relatedQ, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => askQuestion(relatedQ)}
                                  className="w-full text-left px-4 py-3 rounded-lg border hover:border-[#2D9596] hover:bg-[#F0F9FF] transition-all text-[18px] font-medium"
                                  style={{ borderColor: '#D1D5DB', color: '#265073' }}
                                >
                                  → {relatedQ}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {message.showDeviceButtons && message.questionKey && (
                    <div className="flex justify-start mt-4">
                      <div className="flex flex-wrap gap-3">
                        {getDeviceOptions(message.questionKey, selectedCategory).map((device) => (
                          <button
                            key={device}
                            onClick={() => handleDeviceSelection(device, message.questionKey!)}
                            className="h-16 px-8 text-[22px] font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all"
                            style={{ background: '#2D9596', color: '#FFFFFF' }}
                          >
                            {device}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="p-7 rounded-2xl text-[22px]"
                    style={{ background: '#F3F4F6', color: '#265073' }}
                  >
                    <span className="animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white pt-6 border-t-2" style={{ borderColor: '#D1D5DB' }}>
              <textarea
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Type your question or response here..."
                className="w-full min-h-[140px] text-[22px] p-6 rounded-xl border-2 mb-6"
                style={{ borderColor: '#D1D5DB' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (customQuestion.trim()) askQuestion(customQuestion);
                  }
                }}
              />
              <button
                onClick={() => askQuestion(customQuestion)}
                disabled={!customQuestion.trim() || isTyping}
                className="w-full h-[75px] text-[24px] font-bold rounded-xl flex items-center justify-center"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}