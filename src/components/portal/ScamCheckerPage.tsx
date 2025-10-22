import { useState, useRef, useEffect } from "react"; 
import {
  Shield,
  Upload,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  Share2,
  HelpCircle,
  Calendar,
  Mic,
} from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface ScamCheckerPageProps {
  onBack: () => void;
  onNavigateToSessions?: () => void;
  onNavigateToBooking?: (context?: { priority?: string; reason?: string; topic?: string }) => void;
}

type MessageType =
  | "text"
  | "email"
  | "call"
  | "social"
  | "other";
type RiskLevel = "high" | "medium" | "low" | null;

interface Indicators {
  // Money & Payment
  askedForMoney: boolean;
  askedForGiftCards: boolean;
  askedForCrypto: boolean;
  askedForWireTransfer: boolean;

  // Personal Information
  askedForSSN: boolean;
  askedForPassword: boolean;
  askedForBankInfo: boolean;
  askedForPersonalInfo: boolean;

  // Urgency & Threats
  urgent: boolean;
  threatenedConsequences: boolean;
  limitedTimeOffer: boolean;

  // Identity Claims
  claimedIRS: boolean;
  claimedBank: boolean;
  claimedMedicare: boolean;
  claimedTechSupport: boolean;
  claimedUtility: boolean;
  claimedDelivery: boolean;
  claimedFamilyFriend: boolean;

  // Actions Requested
  clickLink: boolean;
  download: boolean;
  askedForRemoteAccess: boolean;
  callThemBack: boolean;

  // Romance/Prize
  romanticInterest: boolean;
  offeredPrize: boolean;
  tooGoodToBeTrue: boolean;

  // Red Flags
  poorGrammar: boolean;
  genericGreeting: boolean;
  suspiciousSender: boolean;

  // Trust Indicators
  knowSender: boolean;
}

export function ScamCheckerPage({ onBack, onNavigateToSessions, onNavigateToBooking }: ScamCheckerPageProps) {
  
  const [step, setStep] = useState(1);
  const [messageType, setMessageType] =
    useState<MessageType | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(
    null,
  );
  const [indicators, setIndicators] = useState<Indicators>({
    askedForMoney: false,
    askedForGiftCards: false,
    askedForCrypto: false,
    askedForWireTransfer: false,
    askedForSSN: false,
    askedForPassword: false,
    askedForBankInfo: false,
    askedForPersonalInfo: false,
    urgent: false,
    threatenedConsequences: false,
    limitedTimeOffer: false,
    claimedIRS: false,
    claimedBank: false,
    claimedMedicare: false,
    claimedTechSupport: false,
    claimedUtility: false,
    claimedDelivery: false,
    claimedFamilyFriend: false,
    clickLink: false,
    download: false,
    askedForRemoteAccess: false,
    callThemBack: false,
    romanticInterest: false,
    offeredPrize: false,
    tooGoodToBeTrue: false,
    poorGrammar: false,
    genericGreeting: false,
    suspiciousSender: false,
    knowSender: false,
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    riskLevel: RiskLevel;
    riskScore: number;
    reasons: string[];
    actions: string[];
  } | null>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAlreadyClickedHelp, setShowAlreadyClickedHelp] = useState(false);
  const [needsUrgentHelp, setNeedsUrgentHelp] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);
  const loadSampleMessage = (
    type: "high" | "medium" | "low",
  ) => {
    const messageTypeSpecific = messageType || "text";

    const samples: Record<
      MessageType,
      Record<"high" | "medium" | "low", string>
    > = {
      text: {
        high: `🚨 ALERT: IRS NOTICE 🚨

You owe $4,873 in back taxes.

A warrant will be issued for your arrest within 24 hours unless you call immediately:

☎️ 1-800-555-FAKE

Pay with Apple gift cards to avoid arrest.

DO NOT IGNORE THIS MESSAGE.`,

        medium: `Hi, this is Bank of Hawaii fraud department.

We detected suspicious activity on your account ending in 4829.

Please verify your identity by replying with:
- Full account number
- Social Security Number  
- PIN code

This is urgent to prevent account closure.`,

        low: `Aloha! 🌺

This is Tea from Mālama Digital Care.

Just confirming your tech support session:
- Tomorrow (Thursday)
- 2:00 PM
- At your home

Reply YES to confirm or call (808) 555-1234 to reschedule.

Mahalo!`,
      },

      email: {
        high: `Subject: FINAL NOTICE - Account Suspended

Dear Valued Customer,

Your PayPal account has been LOCKED due to suspicious activity.

⚠️ YOU HAVE 12 HOURS ⚠️

You must verify your identity or your account will be permanently deleted and you will lose access to $1,247.00.

CLICK HERE IMMEDIATELY: 
http://paypa1-verify-secure.com/login

You will need to enter:
- Your password
- Social security number
- Driver's license photo (upload)

Failure to respond = permanent account suspension.

PayPal Security Team
(This is an automated message, do not reply)`,

        medium: `Subject: Unusual Sign-in Activity

Hello,

We noticed a new login to your Amazon account from an unrecognized device in Russia.

If this wasn't you, please confirm your account information:

🔗 Click here to verify: www.amazon-account-verify.net

You'll need to re-enter:
- Your password
- Payment information
- Security questions

Thank you,
Amazon Security Team`,

        low: `Subject: Appointment Confirmation - Tech Support Session

Aloha Joyce! 🌺

This confirms your appointment with Tea Araki from Mālama Digital Care:

📅 Date: Thursday, November 28, 2025
🕐 Time: 2:00 PM - 3:30 PM
📍 Location: Your home
💻 Service: iPhone basics & password setup

If you need to reschedule, please call us at (808) 555-1234 or reply to this email.

We look forward to seeing you!

Mahalo,
The Mālama Digital Care Team
www.malamadigitalcare.com`,
      },

      call: {
        high: `📞 PHONE CALL RECEIVED:

Caller ID: "IRS - Dept Collections"

What they said:
"This is Officer Badge #4729 from the Internal Revenue Service. 

We have issued a federal warrant for your arrest due to $8,400 in unpaid taxes from 2019-2022.

Officers are being dispatched to your home RIGHT NOW unless you pay immediately.

INSTRUCTIONS:
1. Go to CVS immediately
2. Purchase $8,400 in Target gift cards
3. Call me back at this number with the card codes within ONE HOUR

Do not hang up or we will send police to arrest you."

The caller had a heavy accent and sounded threatening.`,

        medium: `📞 PHONE CALL RECEIVED:

Unknown number

Professional-sounding woman said:
"Hello, this is Sarah from Microsoft Windows Technical Support.

Our system shows your computer is infected with viruses that are stealing your banking information RIGHT NOW.

I need you to turn on your computer immediately so I can guide you through fixing this.

Can you go to your computer now? 

I'll help you download TeamViewer so I can remove the viruses remotely.

This is very urgent - your identity could be stolen if we don't fix this in the next few minutes."

She kept insisting I needed to act immediately.`,

        low: `📞 PHONE CALL RECEIVED:

Caller ID: "Mālama Digital" (808) 555-1234

Voicemail message:
"Hi Joyce, this is Tea from Mālama Digital Care calling to remind you about our appointment tomorrow at 2pm.

I'll be bringing some printed guides for the topics we discussed:
- iPhone basics
- Password management

If you need to cancel or reschedule, just give me a call back at this number.

Otherwise, I'll see you tomorrow!

Mahalo."`,
      },

      social: {
        high: `💬 FACEBOOK FRIEND REQUEST & MESSAGE:

From: "Commander David Miller"
Profile: Only 3 friends, no photos posted

Message:
"Hello beautiful lady! 🌹

I am US Army General stationed in Syria. I saw your profile and feel STRONG connection with you.

I want to know you better. ❤️

I have important situation - I have $2.8 MILLION in military payment but cannot access while deployed overseas.

Can you help me? I will share HALF with you ($1.4 million!!!)

Just need your bank account number to transfer funds.

This is URGENT - I ship out in 3 days.

Please respond soon!

God bless America! 🇺🇸

Commander David"`,

        medium: `📱 INSTAGRAM DM:

From: @Investment_Guru_2025
Account created: 2 days ago
Followers: 47

Message:
"Hey! 👋

I noticed you're interested in financial security (saw your post about retirement).

I've made $47,000 in just 3 months using this SIMPLE crypto trading system.

It's completely legitimate and only takes 15 minutes a day!

I can show you EXACTLY how I did it.

First 10 people get access for FREE! 

Click here to join my private training group: [link]

⏰ LIMITED SPOTS REMAINING!

Don't miss this opportunity to change your life!

Message me back ASAP before spots fill up!"`,

        low: `💬 FACEBOOK MESSENGER:

From: Mālama Digital Care
✓ Verified business page
847 followers

Message:
"Aloha Joyce! 🌺

Just posted a new video on our page about spotting email scams - thought you might find it helpful given what we discussed in your last session.

No need to reply, but wanted to share!

Also, quick reminder about your session this Thursday at 2pm.

Looking forward to it!

- Tea"

[Link to their official Facebook page]`,
      },

      other: {
        high: `🖥️ FULL SCREEN POP-UP ON COMPUTER:
(Cannot close or click away)

⚠️⚠️ CRITICAL SECURITY ALERT ⚠️⚠️

WINDOWS DEFENDER HAS DETECTED:
❌ 5 VIRUSES
❌ 3 TROJANS  
❌ RANSOMWARE INFECTION
❌ KEYLOGGER STEALING YOUR PASSWORDS

🚨 YOUR PERSONAL DATA IS BEING STOLEN RIGHT NOW! 🚨

⚠️ DO NOT TURN OFF YOUR COMPUTER OR ALL DATA WILL BE LOST! ⚠️

CALL MICROSOFT CERTIFIED TECHNICIANS IMMEDIATELY:

☎️ 1-888-555-SCAM
(Available 24/7)

Your computer will be LOCKED in 5 minutes if you do not call.

Case ID: WIN-47392

[Countdown timer showing: 4:53... 4:52... 4:51...]`,

        medium: `📬 LETTER IN THE MAIL:

Hawaiian Electric Company
(Official-looking letterhead with logo)

FINAL DISCONNECT NOTICE

Account #: 4783920
Amount Due: $847.23
DISCONNECT DATE: November 30, 2025

Our records show your electricity bill is SEVERELY PAST DUE.

⚡ Power to your residence will be SHUT OFF in 48 hours unless payment is received immediately.

To avoid disconnection, you MUST pay NOW by calling our urgent payment hotline:

☎️ 1-800-555-HECO
Available 24/7

IMPORTANT: Payment can ONLY be accepted via:
- Zelle
- Venmo  
- Prepaid debit card

(For immediate processing - normal payment methods will take too long)

If you believe this is an error, you must call the above number immediately.

Hawaiian Electric Collections Department`,

        low: `📮 POSTCARD IN THE MAIL:

Hawaii State Public Library System
(Official logo)

FREE Technology Workshop! 💻

Learn about online safety and scam prevention

📅 When: Saturday, December 7th
⏰ Time: 10:00 AM - 12:00 PM
📍 Where: Kailua Public Library, Community Room
👥 Who: All ages welcome, especially kūpuna

Topics covered:
- Recognizing phone & email scams
- Protecting personal information  
- Safe online shopping
- Password security

☕ Light refreshments provided
📝 No registration required

Questions? 
Call: (808) 555-LIBR
Visit: librarieshawaii.org

Presented in partnership with Mālama Digital Care`,
      },
    };

    setMessageContent(samples[messageTypeSpecific][type]);
  };

  const analyzeMessage = async () => {
    setAnalyzing(true);
    setStep(4);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const content = messageContent.toLowerCase();
    const reasons: string[] = [];
    const actions: string[] = [];

    // === CATEGORY-BASED SCORING (prevents over-counting) ===
    let categoryScores = {
      impersonation: 0,      // IRS, bank, tech support, etc.
      requestedInfo: 0,      // SSN, password, bank info
      paymentMethod: 0,      // Gift cards, crypto, wire transfer
      urgencyThreats: 0,     // Urgent, arrest, consequences
      suspiciousActions: 0,  // Click link, download, remote access
      redFlags: 0,           // Grammar, generic greeting, sender
      trustFactors: 0,       // Do you know/trust sender
    };

    // === 1. IMPERSONATION CATEGORY (max 25 points) ===
    if (
      indicators.claimedIRS ||
      content.includes("irs") ||
      content.includes("internal revenue")
    ) {
      categoryScores.impersonation = Math.max(categoryScores.impersonation, 25);
      reasons.push("⚠️ HIGH RISK: Impersonated IRS (IRS never contacts by phone/email/text first)");
    }
    
    if (
      indicators.claimedBank ||
      (content.includes("bank") || content.includes("paypal") || content.includes("account")) &&
      (content.includes("locked") || content.includes("suspended") || content.includes("verify"))
    ) {
      categoryScores.impersonation = Math.max(categoryScores.impersonation, 20);
      reasons.push("⚠️ HIGH RISK: Claimed to be from bank/financial institution");
    }

    if (
      indicators.claimedTechSupport ||
      content.includes("microsoft") ||
      content.includes("apple support") ||
      content.includes("virus detected")
    ) {
      categoryScores.impersonation = Math.max(categoryScores.impersonation, 18);
      reasons.push("⚠️ HIGH RISK: Claimed to be tech support (they don't make unsolicited contact)");
    }

    if (indicators.claimedMedicare || content.includes("medicare")) {
      categoryScores.impersonation = Math.max(categoryScores.impersonation, 18);
      reasons.push("⚠️ HIGH RISK: Impersonated Medicare/Medicaid");
    }

    if (indicators.claimedUtility || content.includes("electric") || content.includes("disconnect notice")) {
      categoryScores.impersonation = Math.max(categoryScores.impersonation, 15);
      reasons.push("⚠ Claimed to be from utility company");
    }

    // === 2. REQUESTED SENSITIVE INFO CATEGORY (max 25 points) ===
    if (
      indicators.askedForSSN ||
      content.includes("social security number") ||
      content.includes("social security") ||
      content.includes("ssn")
    ) {
      categoryScores.requestedInfo = Math.max(categoryScores.requestedInfo, 25);
      reasons.push("⚠️ HIGH RISK: Requested Social Security Number");
    }

    if (
      indicators.askedForPassword ||
      (content.includes("password") && content.includes("verify")) ||
      (content.includes("password") && content.includes("confirm")) ||
      (content.includes("password") && !content.includes("reset") && !content.includes("forgot"))
    ) {
      categoryScores.requestedInfo = Math.max(categoryScores.requestedInfo, 22);
      reasons.push("⚠️ HIGH RISK: Asked for password (legitimate companies NEVER ask for passwords)");
    }

    if (
      indicators.askedForBankInfo ||
      content.includes("account number") ||
      (content.includes("verify") && content.includes("account"))
    ) {
      categoryScores.requestedInfo = Math.max(categoryScores.requestedInfo, 20);
      reasons.push("⚠️ HIGH RISK: Requested banking information");
    }

    if (indicators.askedForPersonalInfo) {
      categoryScores.requestedInfo = Math.max(categoryScores.requestedInfo, 15);
      reasons.push("⚠️ Requested personal information");
    }

    // === 3. PAYMENT METHOD CATEGORY (max 30 points) ===
    if (
      indicators.askedForGiftCards ||
      indicators.askedForCrypto ||
      indicators.askedForWireTransfer ||
      content.includes("gift card") ||
      content.includes("bitcoin") ||
      content.includes("wire transfer") ||
      content.includes("venmo") ||
      content.includes("zelle")
    ) {
      categoryScores.paymentMethod = Math.max(categoryScores.paymentMethod, 30);
      reasons.push("🚨 CRITICAL: Requested untraceable payment method (gift cards, crypto, wire transfer)");
    } else if (indicators.askedForMoney) {
      categoryScores.paymentMethod = Math.max(categoryScores.paymentMethod, 15);
      reasons.push("⚠️ Requested money");
    }

    // === 4. URGENCY & THREATS CATEGORY (max 20 points) ===
    if (
      (indicators.threatenedConsequences || content.includes("arrest") || content.includes("warrant")) &&
      (indicators.urgent || content.includes("immediately") || content.includes("urgent"))
    ) {
      categoryScores.urgencyThreats = Math.max(categoryScores.urgencyThreats, 20);
      reasons.push("⚠️ HIGH RISK: Combined threats with extreme urgency");
    } else if (
      indicators.threatenedConsequences ||
      content.includes("arrest") ||
      content.includes("warrant") ||
      content.includes("legal action")
    ) {
      categoryScores.urgencyThreats = Math.max(categoryScores.urgencyThreats, 15);
      reasons.push("⚠️ Threatened serious consequences");
    } else if (
      indicators.urgent ||
      content.includes("urgent") ||
      content.includes("immediately") ||
      content.includes("within 24 hours") ||
      content.includes("within 12 hours")
    ) {
      categoryScores.urgencyThreats = Math.max(categoryScores.urgencyThreats, 12);
      reasons.push("⚠️ Creates false sense of urgency");
    }

    if (indicators.limitedTimeOffer || content.includes("limited time")) {
      categoryScores.urgencyThreats = Math.max(categoryScores.urgencyThreats, 10);
      reasons.push("⚠️ Uses limited time pressure tactic");
    }

    // === 5. SUSPICIOUS ACTIONS CATEGORY (max 20 points) ===
    if (indicators.askedForRemoteAccess) {
      categoryScores.suspiciousActions = Math.max(categoryScores.suspiciousActions, 20);
      reasons.push("🚨 CRITICAL: Requested remote access to your device");
    }

    if (
      indicators.clickLink ||
      (content.includes("click") && content.includes("link")) ||
      (content.includes("verify") && content.includes("link"))
    ) {
      categoryScores.suspiciousActions = Math.max(categoryScores.suspiciousActions, 15);
      reasons.push("⚠️ Urges you to click a link");
    }

    if (
      indicators.download ||
      content.includes("download") ||
      content.includes("teamviewer")
    ) {
      categoryScores.suspiciousActions = Math.max(categoryScores.suspiciousActions, 15);
      reasons.push("⚠️ Asked you to download software");
    }

    if (indicators.callThemBack && indicators.urgent) {
      categoryScores.suspiciousActions = Math.max(categoryScores.suspiciousActions, 12);
      reasons.push("⚠️ Urgently demands you call a specific number");
    }

    // === 6. RED FLAGS CATEGORY (max 15 points) ===
    let redFlagCount = 0;
    
    if (indicators.poorGrammar) {
      redFlagCount++;
      reasons.push("⚠ Contains spelling or grammar errors");
    }
    
    if (indicators.genericGreeting || content.includes("dear customer") || content.includes("dear valued")) {
      redFlagCount++;
      reasons.push("⚠ Uses generic greeting instead of your name");
    }
    
    if (indicators.suspiciousSender) {
      redFlagCount++;
      reasons.push("⚠ Sender address/number doesn't match claimed organization");
    }

    if (messageType === "email" && content.includes("http://") && !content.includes("https://")) {
      redFlagCount++;
      reasons.push('⚠ Link uses unsecure "http://" instead of "https://"');
    }

    categoryScores.redFlags = Math.min(redFlagCount * 5, 15);

    // === 7. TRUST FACTORS (negative points) ===
    if (indicators.knowSender) {
      categoryScores.trustFactors = -15;
      reasons.push("✓ You personally know and trust this sender");
    }

    if (
      content.includes("tea araki") ||
      content.includes("tea from malama") ||
      content.includes("mālama digital")
    ) {
      categoryScores.trustFactors = Math.min(categoryScores.trustFactors, -10);
      reasons.push("✓ Message from known Mālama Digital Care contact");
    }

    // === CALCULATE FINAL SCORE ===
    let riskScore = 
      categoryScores.impersonation +
      categoryScores.requestedInfo +
      categoryScores.paymentMethod +
      categoryScores.urgencyThreats +
      categoryScores.suspiciousActions +
      categoryScores.redFlags +
      categoryScores.trustFactors;

    // Cap score between 0 and 100
    riskScore = Math.max(0, Math.min(100, riskScore));

    // === DETERMINE RISK LEVEL ===
    let riskLevel: RiskLevel;
    if (riskScore >= 60) {
      riskLevel = "high";
    } else if (riskScore >= 30) {
      riskLevel = "medium";
    } else {
      riskLevel = "low";
    }

    // If no reasons found, it's likely safe
    if (reasons.length === 0) {
      reasons.push("✓ No obvious red flags detected");
      reasons.push("✓ Message appears to come from a legitimate source");
    }

    // === SET ACTIONS BASED ON RISK LEVEL ===
    if (riskLevel === "high") {
      actions.push("🛑 STOP IMMEDIATELY - This is almost certainly a scam");
      actions.push("Do NOT click any links, call any numbers, or provide ANY information");
      actions.push("Do NOT send money, gift cards, or banking information");
      actions.push("Delete/block this message immediately");
      actions.push(
        "If they claimed to be from a real company, call that company directly using the official number from your bill or their website",
      );

      if (indicators.claimedBank || content.includes("bank") || content.includes("paypal")) {
        actions.push("📞 Contact your bank immediately at the number on your card (NOT the number in this message)");
      }
      if (indicators.claimedIRS || content.includes("irs")) {
        actions.push("📞 Report to IRS: 1-800-829-1040 or treasury.gov/tigta");
      }
      if (indicators.claimedMedicare || content.includes("medicare")) {
        actions.push("📞 Report to Medicare: 1-800-MEDICARE (1-800-633-4227)");
      }
      if (messageType === "call") {
        actions.push("📞 Hang up immediately and block the number");
      }

      actions.push("🚨 Report to FTC at ReportFraud.ftc.gov or 1-877-FTC-HELP");
      actions.push("💬 Tell your family about this - scammers may try others");
    } else if (riskLevel === "medium") {
      actions.push("⚠️ PROCEED WITH CAUTION - This has several warning signs");
      actions.push("Do NOT click links or provide information yet");
      actions.push(
        "Independently verify the sender (look up the company's real phone number on their official website)",
      );
      actions.push("Call the organization using a number YOU look up, not one provided in the message");
      actions.push("Look for these red flags: spelling errors, wrong sender email/number, generic greetings");
      actions.push("Ask yourself: Was I expecting this? Did I initiate contact?");
      actions.push("When in doubt, contact your Mālama technician for help reviewing it");
      actions.push("Trust your gut - if something feels wrong, it probably is");
    } else {
      actions.push("✓ This appears legitimate, but stay vigilant");
      actions.push("Even legitimate-looking messages can be scams - always verify before taking action");
      actions.push("Never share passwords, PINs, Social Security numbers, or banking info via message");
      actions.push("If asked to take urgent action, independently verify by calling the organization");
      actions.push("When unsure, contact the sender through official channels you find yourself");
    }

    // Educational tips based on message type
    if (messageType === "call") {
      actions.push("💡 TIP: Legitimate companies won't threaten you or demand immediate payment");
    } else if (messageType === "email") {
      actions.push("💡 TIP: Hover over links (don't click!) to see the real web address");
    } else if (messageType === "text") {
      actions.push("💡 TIP: Banks and government agencies don't text asking for sensitive information");
    } else if (messageType === "social") {
      actions.push("💡 TIP: Verify identities of new online contacts before sharing personal info");
    }

    setResult({ riskLevel, riskScore, reasons, actions });
    setAnalyzing(false);
    // Scroll to top after results are ready
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };
  const resetChecker = () => {
    setStep(1);
    setMessageType(null);
    setMessageContent("");
    setUploadedFile(null);
    setIndicators({
      askedForMoney: false,
      askedForGiftCards: false,
      askedForCrypto: false,
      askedForWireTransfer: false,
      askedForSSN: false,
      askedForPassword: false,
      askedForBankInfo: false,
      askedForPersonalInfo: false,
      urgent: false,
      threatenedConsequences: false,
      limitedTimeOffer: false,
      claimedIRS: false,
      claimedBank: false,
      claimedMedicare: false,
      claimedTechSupport: false,
      claimedUtility: false,
      claimedDelivery: false,
      claimedFamilyFriend: false,
      clickLink: false,
      download: false,
      askedForRemoteAccess: false,
      callThemBack: false,
      romanticInterest: false,
      offeredPrize: false,
      tooGoodToBeTrue: false,
      poorGrammar: false,
      genericGreeting: false,
      suspiciousSender: false,
      knowSender: false,
    });
    setResult(null);
  };

  const printReport = () => {
    const printWindow = window.open(
      "",
      "",
      "width=800,height=600",
    );
    if (!printWindow) return;

    const riskColor =
      result?.riskLevel === "high"
        ? "#EF4444"
        : result?.riskLevel === "medium"
          ? "#F59E0B"
          : "#10B981";
    const riskBg =
      result?.riskLevel === "high"
        ? "#FEE2E2"
        : result?.riskLevel === "medium"
          ? "#FEF3C7"
          : "#D1FAE5";
    const riskLabel =
      result?.riskLevel === "high"
        ? "HIGH RISK - DANGER"
        : result?.riskLevel === "medium"
          ? "MEDIUM RISK - CAUTION"
          : "LOW RISK";

    const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Scam Checker Report - ${new Date().toLocaleDateString()}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #2D3436;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #2D9596;
        }
        .header h1 {
          color: #265073;
          font-size: 32px;
          margin-bottom: 10px;
        }
        .header p {
          color: #6B7280;
          font-size: 16px;
        }
        .risk-banner {
          background: ${riskBg};
          border: 4px solid ${riskColor};
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 30px;
        }
        .risk-badge {
          display: inline-block;
          background: ${riskColor};
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .risk-title {
          color: ${riskColor};
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .risk-score {
          color: ${riskColor};
          font-size: 18px;
          font-weight: 600;
        }
        .section {
          background: white;
          border: 2px solid #D1D5DB;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section h2 {
          color: #265073;
          font-size: 24px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #E5E7EB;
        }
        .message-box {
          background: #F9FAFB;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          white-space: pre-wrap;
          font-size: 14px;
        }
        .message-type {
          display: inline-block;
          background: #2D9596;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        ul li {
          margin-bottom: 15px;
          padding-left: 30px;
          position: relative;
          font-size: 16px;
        }
        ul li:before {
          content: "•";
          position: absolute;
          left: 10px;
          font-size: 20px;
          color: #2D9596;
        }
        ol {
          list-style: none;
          counter-reset: item;
          padding: 0;
        }
        ol li {
          counter-increment: item;
          margin-bottom: 20px;
          padding-left: 50px;
          position: relative;
          font-size: 16px;
        }
        ol li:before {
          content: counter(item);
          position: absolute;
          left: 10px;
          top: 0;
          background: #2D9596;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #E5E7EB;
          text-align: center;
          color: #6B7280;
          font-size: 14px;
        }
        .footer-logo {
          color: #2D9596;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
        }
        @media print {
          body {
            padding: 20px;
          }
          .section {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🛡️ Scam Checker Report</h1>
        <p>Mālama Digital Care | Generated: ${new Date().toLocaleString()}</p>
      </div>

      <div class="risk-banner">
        <div class="risk-badge">${riskLabel}</div>
        <div class="risk-title">
          ${
            result?.riskLevel === "high"
              ? "This is almost certainly a SCAM"
              : result?.riskLevel === "medium"
                ? "Be very careful with this"
                : "This appears legitimate"
          }
        </div>
        <div class="risk-score">Risk Score: ${result?.riskScore} / 100</div>
      </div>

      <div class="section">
        <h2>📋 Message Details</h2>
        <div class="message-type">${messageType?.toUpperCase()}</div>
        <div class="message-box">${messageContent}</div>
      </div>

      <div class="section">
        <h2>🔍 Why We Think This</h2>
        <ul>
          ${result?.reasons.map((reason) => `<li>${reason}</li>`).join("")}
        </ul>
      </div>

      <div class="section">
        <h2>✅ What You Should Do</h2>
        <ol>
          ${result?.actions.map((action) => `<li>${action}</li>`).join("")}
        </ol>
        {/* BOOK SESSION BUTTON - NEW! */}
        {(result.riskLevel === 'high' || result.riskLevel === 'medium') && (
          <div className="mb-8 p-6 rounded-xl border-2" style={{
            background: '#F0FDFA',
            borderColor: '#2D9596'
          }}>
            <h3 className="text-[22px] font-bold mb-3" style={{ color: '#265073' }}>
              Want to discuss this with a real person?
            </h3>
            <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
              Your upcoming session with Tea is a great time to go over this in detail and make sure you're fully protected.
            </p>
            <button
              onClick={() => {
                // In real implementation, navigate to booking or sessions page
                alert('In the live version, this would take you to your upcoming session details or help you book a new one.');
              }}
              className="w-full h-14 rounded-lg font-bold text-[18px] transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: '#2D9596',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(45, 149, 150, 0.3)',
              }}
            >
              <Calendar className="w-5 h-5" />
              Review this in my upcoming session
            </button>
            <p className="text-[14px] mt-2 text-center" style={{ color: '#6B7280' }}>
              Or book an additional session if you need help sooner
            </p>
          </div>
        )}
      </div>
      

      ${
        result?.riskLevel === "high"
          ? `
      <div class="section" style="background: #FEE2E2; border-color: #EF4444;">
        <h2 style="color: #EF4444;">🚨 URGENT REMINDER</h2>
        <ul>
          <li style="color: #991B1B; font-weight: 600;">DO NOT respond to this message</li>
          <li style="color: #991B1B; font-weight: 600;">DO NOT click any links</li>
          <li style="color: #991B1B; font-weight: 600;">DO NOT send money or gift cards</li>
          <li style="color: #991B1B; font-weight: 600;">DO NOT provide personal information</li>
        </ul>
      </div>
      `
          : ""
      }

      <div class="section">
        <h2>📞 Need Help?</h2>
        <p style="font-size: 16px; margin-bottom: 15px;">
          If you're unsure about this message or need assistance, contact Mālama Digital Care:
        </p>
        <ul>
          <li><strong>Phone:</strong> (808) 555-1234</li>
          <li><strong>Email:</strong> support@malamadigitalcare.com</li>
          <li><strong>Website:</strong> www.malamadigitalcare.com</li>
        </ul>
      </div>

      <div class="footer">
        <div class="footer-logo">Mālama Digital Care</div>
        <p>Patient, in-person tech support that builds lasting confidence</p>
        <p style="margin-top: 10px;">This report is for informational purposes only. Always verify suspicious messages independently.</p>
      </div>
    </body>
    </html>
  `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Get relevant indicators based on message type
  const getRelevantIndicators = () => {
    const commonIndicators = [
      {
        key: "askedForMoney" as keyof Indicators,
        label: "💰 They asked for money",
        category: "Money & Payment",
      },
      {
        key: "askedForGiftCards" as keyof Indicators,
        label: "🎁 They asked for gift cards",
        category: "Money & Payment",
      },
      {
        key: "askedForCrypto" as keyof Indicators,
        label: "₿ They mentioned Bitcoin/cryptocurrency",
        category: "Money & Payment",
      },
      {
        key: "askedForWireTransfer" as keyof Indicators,
        label: "🏦 They asked for wire transfer/Zelle/Venmo",
        category: "Money & Payment",
      },

      {
        key: "askedForSSN" as keyof Indicators,
        label: "🆔 They asked for Social Security Number",
        category: "Personal Info",
      },
      {
        key: "askedForPassword" as keyof Indicators,
        label: "🔑 They asked for password or PIN",
        category: "Personal Info",
      },
      {
        key: "askedForBankInfo" as keyof Indicators,
        label: "💳 They asked for bank/credit card info",
        category: "Personal Info",
      },
      {
        key: "askedForPersonalInfo" as keyof Indicators,
        label: "📋 They asked for other personal information",
        category: "Personal Info",
      },

      {
        key: "urgent" as keyof Indicators,
        label: "⏰ They said it was urgent/immediate",
        category: "Pressure Tactics",
      },
      {
        key: "threatenedConsequences" as keyof Indicators,
        label:
          "⚠️ They threatened arrest/legal action/account closure",
        category: "Pressure Tactics",
      },
      {
        key: "limitedTimeOffer" as keyof Indicators,
        label: '⏳ They said "limited time" or "act now"',
        category: "Pressure Tactics",
      },

      {
        key: "clickLink" as keyof Indicators,
        label: "🔗 They asked me to click a link",
        category: "Actions Requested",
      },
      {
        key: "download" as keyof Indicators,
        label: "⬇️ They asked me to download something",
        category: "Actions Requested",
      },
      {
        key: "callThemBack" as keyof Indicators,
        label: "📞 They asked me to call a number",
        category: "Actions Requested",
      },

      {
        key: "poorGrammar" as keyof Indicators,
        label: "✏️ Poor spelling or grammar",
        category: "Red Flags",
      },
      {
        key: "genericGreeting" as keyof Indicators,
        label: '👤 Generic greeting ("Dear Customer")',
        category: "Red Flags",
      },
      {
        key: "suspiciousSender" as keyof Indicators,
        label: "📧 Sender looks suspicious or wrong",
        category: "Red Flags",
      },
      {
        key: "tooGoodToBeTrue" as keyof Indicators,
        label: "🎰 Offer seems too good to be true",
        category: "Red Flags",
      },
    ];

    const specificIndicators: Record<
      MessageType,
      {
        key: keyof Indicators;
        label: string;
        category: string;
      }[]
    > = {
      text: [
        {
          key: "claimedBank",
          label: "🏦 Claimed to be from my bank",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedDelivery",
          label: "📦 About a package/delivery",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedUtility",
          label: "⚡ Claimed to be from utility company",
          category: "Who They Claim To Be",
        },
      ],
      email: [
        {
          key: "claimedBank",
          label: "🏦 Claimed to be from my bank",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedDelivery",
          label: "📦 About a package/delivery",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedTechSupport",
          label: "💻 Claimed to be tech support",
          category: "Who They Claim To Be",
        },
      ],
      call: [
        {
          key: "claimedIRS",
          label: "🏛️ Claimed to be from IRS/government",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedBank",
          label: "🏦 Claimed to be from my bank",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedMedicare",
          label: "🏥 Claimed to be from Medicare/insurance",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedTechSupport",
          label: "💻 Claimed to be tech support",
          category: "Who They Claim To Be",
        },
        {
          key: "claimedFamilyFriend",
          label:
            "👨‍👩‍👧‍👦 Claimed to be family member/friend in trouble",
          category: "Who They Claim To Be",
        },
        {
          key: "askedForRemoteAccess",
          label: "🖥️ They wanted remote access to my computer",
          category: "Actions Requested",
        },
      ],
      social: [
        {
          key: "romanticInterest",
          label:
            "💕 Romantic interest from someone I don't know",
          category: "Social Media Specific",
        },
        {
          key: "offeredPrize",
          label: "🏆 Said I won money or a prize",
          category: "Social Media Specific",
        },
        {
          key: "claimedFamilyFriend",
          label:
            "👨‍👩‍👧‍👦 Claims to be someone I know (but seems off)",
          category: "Who They Claim To Be",
        },
      ],
      other: [
        {
          key: "claimedTechSupport",
          label: "💻 Pop-up said I have a virus",
          category: "Who They Claim To Be",
        },
        {
          key: "askedForRemoteAccess",
          label: "🖥️ Wanted remote access to my computer",
          category: "Actions Requested",
        },
        {
          key: "offeredPrize",
          label: "🏆 Said I won money or a prize",
          category: "Other",
        },
      ],
    };

    const typeSpecific = messageType
      ? specificIndicators[messageType]
      : [];
    const allIndicators = [
      ...typeSpecific,
      ...commonIndicators,
    ];

    // Add trust indicator at the end
    allIndicators.push({
      key: "knowSender",
      label: "✅ I know and trust this person/company",
      category: "Trust",
    });

    return allIndicators;
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 text-[22px] font-medium hover:underline"
          style={{ color: "#2D9596" }}
        >
          ← Back to Dashboard
        </button>

        {!result ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{ background: "#DBEAFE" }}
                >
                  <Shield
                    className="w-14 h-14"
                    style={{ color: "#2D9596" }}
                  />
                </div>
              </div>
              <h1
                className="text-[40px] font-bold mb-2"
                style={{ color: "#265073" }}
              >
                Scam Checker
              </h1>
              <p
                className="text-xl md:text-[28px] font-bold mb-4"
                style={{ color: "#DC2626" }}
              >
                Meet Kōkua
              </p>
              <p
                className="text-[20px] mb-2"
                style={{ color: "#4B5563" }}
              >
                Your helper for staying safe online
              </p>
              <p
                className="text-[18px]"
                style={{ color: "#6B7280" }}
              >
                Not sure if a message is real? Let's check it together.
              </p>
            </div>

            {/* STEP 1: Message Type */}
            <div className="mb-10">
              <h2
                className="text-[24px] font-bold mb-6"
                style={{ color: "#265073" }}
              >
                Step 1: How did you receive this?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {
                    type: "text" as MessageType,
                    label: "Text Message",
                    emoji: "💬",
                  },
                  {
                    type: "email" as MessageType,
                    label: "Email",
                    emoji: "📧",
                  },
                  {
                    type: "call" as MessageType,
                    label: "Phone Call",
                    emoji: "📞",
                  },
                  {
                    type: "social" as MessageType,
                    label: "Social Media",
                    emoji: "📱",
                  },
                  {
                    type: "other" as MessageType,
                    label: "Other",
                    emoji: "❓",
                  },
                ].map(({ type, label, emoji }) => (
                  <button
                    key={type}
                    onClick={() => setMessageType(type)}
                    className="flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all hover:shadow-lg active:scale-95"
                    style={{
                      borderColor:
                        messageType === type
                          ? "#2D9596"
                          : "#D1D5DB",
                      background:
                        messageType === type
                          ? "#F0FDFA"
                          : "#FFFFFF",
                      boxShadow:
                        messageType === type
                          ? "0 4px 12px rgba(45, 149, 150, 0.3)"
                          : "none",
                    }}
                  >
                    <span className="text-5xl mb-3">
                      {emoji}
                    </span>
                    <span
                      className="text-[16px] font-medium text-center"
                      style={{ color: "#265073" }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: Message Content */}
            {messageType && (
              <div className="mb-10">
                <h2
                  className="text-[24px] font-bold mb-6"
                  style={{ color: "#265073" }}
                >
                  Step 2: Tell us what happened
                </h2>

                {/* Upload Section */}
                <div
                  className="border-2 border-dashed rounded-xl p-8 mb-6 text-center"
                  style={{ borderColor: "#D1D5DB" }}
                >
                  <Upload
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: "#4B5563" }}
                  />
                  <p
                    className="text-[18px] mb-4"
                    style={{ color: "#265073" }}
                  >
                    Take a photo or screenshot of the message
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button
                      type="button"
                      className="h-[60px] px-8 text-[18px] font-bold rounded-lg"
                      style={{
                        background: "#2D9596",
                        color: "#FFFFFF",
                      }}
                      onClick={() =>
                        document
                          .getElementById("file-upload")
                          ?.click()
                      }
                    >
                      Upload Image
                    </Button>
                  </label>
                  {uploadedFile && (
                    <p
                      className="mt-4 text-[16px]"
                      style={{ color: "#10B981" }}
                    >
                      ✓ {uploadedFile.name}
                    </p>
                  )}
                  <p
                    className="mt-4 text-[14px]"
                    style={{ color: "#4B5563" }}
                  >
                    Supported formats: JPG, PNG, PDF
                  </p>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className="w-full border-t"
                      style={{ borderColor: "#D1D5DB" }}
                    ></div>
                  </div>
                  <div className="relative flex justify-center text-[18px]">
                    <span
                      className="px-4 bg-white font-medium"
                      style={{ color: "#4B5563" }}
                    >
                      OR
                    </span>
                  </div>
                </div>

                {/* Text Input */}
                <div className="mb-6">
                  <Textarea
                    value={messageContent}
                    onChange={(e) =>
                      setMessageContent(e.target.value)
                    }
                    placeholder="Type or paste the message here, or describe what happened during the phone call..."
                    className="min-h-[200px] text-[18px] p-4 rounded-lg border-2"
                    style={{ borderColor: "#D1D5DB" }}
                  />
                  <p
                    className="text-right mt-2 text-[14px]"
                    style={{ color: "#4B5563" }}
                  >
                    {messageContent.length} characters
                  </p>
                </div>

                {/* VOICE RECORDING OPTION - NEW! */}
                <div className="mb-6">
                  <div className="text-center">
                    <p className="text-[18px] mb-4" style={{ color: '#265073' }}>
                      Prefer to describe it instead of typing?
                    </p>
                    <button
                      onClick={() => {
                        if (!isRecording) {
                          setIsRecording(true);
                          setRecordingTime(0);
                          // In real implementation, start recording
                        } else {
                          setIsRecording(false);
                          // In real implementation, stop recording and convert to text
                          // Voice messages that vary by message type
                          const voiceMessages: Record<MessageType, string> = {
                            text: "[Voice recording: I got a text saying my bank account will be closed unless I verify my information by clicking a link. It says I have 24 hours.]",
                            email: "[Voice recording: I received an email saying my PayPal account is locked and I need to click a link to verify my social security number and password within 12 hours.]",
                            call: "[Voice recording: Someone just called saying they're from the IRS and that I owe back taxes. They said police are coming to arrest me if I don't pay with gift cards right away.]",
                            social: "[Voice recording: Someone on Facebook messaged me saying I won a lottery I never entered. They want my personal information and a processing fee.]",
                            other: "[Voice recording: I got a letter saying my utilities will be shut off tomorrow unless I pay immediately with gift cards.]",
                          };
                          setMessageContent(prevContent => 
                            prevContent + "\n\n" + (voiceMessages[messageType || 'text'])
                          );
                        }
                      }}
                      className="relative h-24 w-24 rounded-full flex items-center justify-center transition-all active:scale-95 mx-auto"
                      style={{
                        background: isRecording ? '#EF4444' : '#2D9596',
                        boxShadow: isRecording ? '0 0 0 8px rgba(239, 68, 68, 0.2)' : '0 4px 12px rgba(45, 149, 150, 0.3)',
                      }}
                    >
                     <Mic className="w-10 h-10 text-white" />
                      {isRecording && (
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="text-[16px] text-red-600 font-bold animate-pulse">
                            Recording... Tap to stop
                          </span>
                        </div>
                      )}
                    </button>
                    <p className="text-[14px] mt-6" style={{ color: '#6B7280' }}>
                      {isRecording 
                        ? "Tap the microphone again when you're done speaking"
                        : "Tap the microphone to describe what happened out loud"}
                    </p>
                  </div>
                </div>
                
                {/* DIVIDER */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: '#D1D5DB' }}></div>
                  </div>
                  <div className="relative flex justify-center text-[18px]">
                    <span className="px-4 bg-white font-medium" style={{ color: '#4B5563' }}>
                      OR
                    </span>
                  </div>
                </div>

                
                
                {/* Quick Test Samples */}
                <div className="mb-6">
                  <p
                    className="text-[16px] mb-3"
                    style={{ color: "#4B5563" }}
                  >
                    Or try a sample message to see how this
                    works:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => loadSampleMessage("high")}
                      variant="outline"
                      className="h-12 px-4 text-[16px] border-2 active:scale-95 transition-transform"
                      style={{
                        borderColor: "#EF4444",
                        color: "#EF4444",
                      }}
                    >
                      🚨 High Risk Example
                    </Button>
                    <Button
                      onClick={() =>
                        loadSampleMessage("medium")
                      }
                      variant="outline"
                      className="h-12 px-4 text-[16px] border-2 active:scale-95 transition-transform"
                      style={{
                        borderColor: "#F59E0B",
                        color: "#F59E0B",
                      }}
                    >
                      ⚠️ Medium Risk Example
                    </Button>
                    <Button
                      onClick={() => loadSampleMessage("low")}
                      variant="outline"
                      className="h-12 px-4 text-[16px] border-2 active:scale-95 transition-transform"
                      style={{
                        borderColor: "#10B981",
                        color: "#10B981",
                      }}
                    >
                      ✓ Low Risk Example
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* OPTIONAL: Want to add more details? */}
            {messageContent && (
              <div className="mb-8">
                <button
                  onClick={() => setShowIndicators(!showIndicators)}
                  className="w-full text-left p-6 rounded-xl border-2 transition-all hover:shadow-lg"
                  style={{
                    borderColor: showIndicators ? '#2D9596' : '#D1D5DB',
                    background: showIndicators ? '#F0F9FF' : '#FFFFFF',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[22px] font-bold" style={{ color: '#265073' }}>
                        Want to add more details? (Optional)
                      </h3>
                      <p className="text-[16px] mt-1" style={{ color: '#6B7280' }}>
                        We can analyze the message without this, but adding details helps us be more accurate
                      </p>
                    </div>
                    <span className="text-[24px]" style={{ color: '#2D9596' }}>
                      {showIndicators ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {showIndicators && (
                  <div className="mt-6">
                    <h4 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
                      Check all that apply to this message:
                    </h4>
                    {(() => {
                      // Group indicators by category
                      const allIndicators = getRelevantIndicators();
                      const groupedByCategory: Record<string, { key: keyof Indicators; label: string }[]> = {};

                      allIndicators.forEach((indicator) => {
                        if (!groupedByCategory[indicator.category]) {
                          groupedByCategory[indicator.category] = [];
                        }
                        groupedByCategory[indicator.category].push({
                          key: indicator.key,
                          label: indicator.label
                        });
                      });

                      const indicatorCategories = Object.keys(groupedByCategory).map((category) => ({
                        title: category,
                        items: groupedByCategory[category]
                      }));

                      return indicatorCategories.map((category) => {
                        return (
                          <div
                            key={category.title}
                            className="mb-6 p-6 bg-gray-50 rounded-xl"
                          >
                            <h4
                              className="text-[20px] font-bold mb-4"
                              style={{ color: "#265073" }}
                            >
                              {category.title}
                            </h4>
                            <div className="space-y-3">
                              {category.items.map(
                                ({ key, label }) => (
                                  <div
                                    key={key}
                                    className="flex items-start gap-3"
                                  >
                                    <Checkbox
                                      id={key}
                                      checked={
                                        indicators[
                                          key as keyof Indicators
                                        ]
                                      }
                                      onCheckedChange={(
                                        checked,
                                      ) =>
                                        setIndicators({
                                          ...indicators,
                                          [key]: checked === true,
                                        })
                                      }
                                      className="mt-1 w-6 h-6"
                                    />
                                    <Label
                                      htmlFor={key}
                                      className="text-[16px] cursor-pointer flex-1"
                                      style={{ color: "#265073" }}
                                    >
                                      {label}
                                    </Label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Analyze Button */}
            {messageContent && (
              <div className="text-center">
                <Button
                  onClick={analyzeMessage}
                  disabled={analyzing}
                  className="h-[64px] px-12 text-[22px] font-bold rounded-lg"
                  style={{
                    background: "#2D9596",
                    color: "#FFFFFF",
                  }}
                >
                  {analyzing ? (
                    <span className="flex items-center gap-3">
                      <span className="animate-spin">⏳</span>
                      Analyzing message...
                    </span>
                  ) : (
                    "Check This Message"
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          /* RESULTS PAGE */
          <div>
            {result.riskLevel === "high" && (
              <div
                className="rounded-xl p-8 mb-8 border-4"
                style={{
                  background: "#FEE2E2",
                  borderColor: "#EF4444",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <AlertTriangle
                    className="w-16 h-16 flex-shrink-0"
                    style={{ color: "#EF4444" }}
                  />
                  <div>
                    <div
                      className="inline-block px-4 py-2 rounded-full text-[14px] font-bold mb-2"
                      style={{
                        background: "#EF4444",
                        color: "#FFFFFF",
                      }}
                    >
                      HIGH RISK - DANGER
                    </div>
                    <h2
                      className="text-2xl md:text-[36px] font-bold"
                      style={{ color: "#EF4444" }}
                    >
                      This is almost certainly a SCAM
                    </h2>
                    <p
                      className="text-[18px] mt-2"
                      style={{ color: "#991B1B" }}
                    >
                      Risk Score: {result.riskScore} / 100
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result.riskLevel === "medium" && (
              <div
                className="rounded-xl p-8 mb-8 border-4"
                style={{
                  background: "#FEF3C7",
                  borderColor: "#F59E0B",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <AlertTriangle
                    className="w-16 h-16 flex-shrink-0"
                    style={{ color: "#F59E0B" }}
                  />
                  <div>
                    <div
                      className="inline-block px-4 py-2 rounded-full text-[14px] font-bold mb-2"
                      style={{
                        background: "#F59E0B",
                        color: "#FFFFFF",
                      }}
                    >
                      MEDIUM RISK - CAUTION
                    </div>
                    <h2
                      className="text-2xl md:text-[36px] font-bold"
                      style={{ color: "#F59E0B" }}
                    >
                      Be very careful with this
                    </h2>
                    <p
                      className="text-[18px] mt-2"
                      style={{ color: "#92400E" }}
                    >
                      Risk Score: {result.riskScore} / 100
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result.riskLevel === "low" && (
              <div
                className="rounded-xl p-8 mb-8 border-4"
                style={{
                  background: "#D1FAE5",
                  borderColor: "#10B981",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle
                    className="w-16 h-16 flex-shrink-0"
                    style={{ color: "#10B981" }}
                  />
                  <div>
                    <div
                      className="inline-block px-4 py-2 rounded-full text-[14px] font-bold mb-2"
                      style={{
                        background: "#10B981",
                        color: "#FFFFFF",
                      }}
                    >
                      LOW RISK
                    </div>
                    <h2
                      className="text-2xl md:text-[36px] font-bold"
                      style={{ color: "#10B981" }}
                    >
                      This appears legitimate
                    </h2>
                    <p
                      className="text-[18px] mt-2"
                      style={{ color: "#065F46" }}
                    >
                      Risk Score: {result.riskScore} / 100
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Why we think this */}
            <div
              className="bg-white rounded-xl p-8 mb-6 border-2"
              style={{ borderColor: "#D1D5DB" }}
            >
              <h3
                className="text-[24px] font-bold mb-4"
                style={{ color: "#265073" }}
              >
                Why we think this
              </h3>
              <ul className="space-y-3">
                {result.reasons.map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[20px] mt-1">•</span>
                    <span
                      className="text-[18px]"
                      style={{ color: "#4B5563" }}
                    >
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What you should do */}
            <div
              className="bg-white rounded-xl p-8 mb-8 border-2"
              style={{ borderColor: "#D1D5DB" }}
            >
              <h3
                className="text-[24px] font-bold mb-4"
                style={{ color: "#265073" }}
              >
                What you should do
              </h3>
              <ol className="space-y-4">
                {result.actions.map((action, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[18px] font-bold text-white"
                      style={{ background: "#2D9596" }}
                    >
                      {index + 1}
                    </div>
                    <span
                      className="text-[18px] pt-1"
                      style={{ color: "#4B5563" }}
                    >
                      {action}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            

            {/* ALREADY CLICKED EMERGENCY HELP - Shows in results for high/medium risk */}
            {(result.riskLevel === 'high' || result.riskLevel === 'medium') && (
              <div className="mb-8">
                <button
                  onClick={() => setShowAlreadyClickedHelp(!showAlreadyClickedHelp)}
                  className="w-full text-left p-6 rounded-xl border-2 transition-all hover:shadow-lg"
                  style={{
                    borderColor: showAlreadyClickedHelp ? '#F59E0B' : '#DC2626',
                    background: showAlreadyClickedHelp ? '#FFFBEB' : '#FEE2E2',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[20px] font-bold" style={{ color: '#DC2626' }}>
                        ⚠️ I already clicked a link or shared information
                      </h3>
                      <p className="text-[16px] mt-1" style={{ color: '#991B1B' }}>
                        Click here if you need urgent help
                      </p>
                    </div>
                    <span className="text-[24px]" style={{ color: '#DC2626' }}>
                      {showAlreadyClickedHelp ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {showAlreadyClickedHelp && (
                  <div className="mt-4 p-6 rounded-lg border-2" style={{ 
                    background: '#FEF3C7',
                    borderColor: '#F59E0B' 
                  }}>
                    <h4 className="text-[20px] font-bold mb-3" style={{ color: '#92400E' }}>
                      Don't panic - you're doing the right thing by checking
                    </h4>
                    <p className="text-[16px] mb-4" style={{ color: '#78350F' }}>
                      Many people click on things before realizing they might be scams. The important thing is that you're taking action now.
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-[20px]">✓</span>
                        <span className="text-[16px]" style={{ color: '#78350F' }}>
                          <strong>Stay calm.</strong> Taking a moment to think clearly will help you respond better.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[20px]">✓</span>
                        <span className="text-[16px]" style={{ color: '#78350F' }}>
                          <strong>We can help you.</strong> Our technicians have helped many people in similar situations.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[20px]">✓</span>
                        <span className="text-[16px]" style={{ color: '#78350F' }}>
                          <strong>Act quickly.</strong> The sooner you take protective steps, the better.
                        </span>
                      </div>
                    </div>

                    {/* Urgent Help Button */}
                    <button
                      onClick={() => {
                        setNeedsUrgentHelp(true);
                        window.location.href = 'tel:+18085551234';
                      }}
                      className="w-full h-16 rounded-xl font-bold text-[20px] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                      style={{
                        background: '#DC2626',
                        color: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <Phone className="w-6 h-6" />
                      I need emergency help NOW
                    </button>
                    
                    <p className="text-[14px] text-center" style={{ color: '#78350F' }}>
                      This will prioritize your case and connect you with a technician immediately
                    </p>
                  </div>
                )}
              </div>
            )}


            {/* BOOK SESSION BUTTON - NEW! */}
            {(result.riskLevel === 'high' || result.riskLevel === 'medium') && (
              <div className="mb-8 p-6 rounded-xl border-2" style={{
                background: '#F0FDFA',
                borderColor: '#2D9596'
              }}>
                <h3 className="text-[22px] font-bold mb-3" style={{ color: '#265073' }}>
                  Want to discuss this with a real person?
                </h3>
                <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                  Your upcoming session with Tea is a great time to go over this in detail and make sure you're fully protected.
                </p>
                <button
                  onClick={() => {
                    onNavigateToSessions?.();
                  }}
                  className="w-full h-14 rounded-lg font-bold text-[18px] transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{
                    background: '#2D9596',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(45, 149, 150, 0.3)',
                  }}
                >
                  <Calendar className="w-5 h-5" />
                  Review this in my upcoming session
                </button>
                <p className="text-[14px] mt-2 text-center" style={{ color: '#6B7280' }}>
                  Or book an additional session if you need help sooner
                </p>
              </div>
            )}
            {/* Action Buttons - UPDATED! */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={resetChecker}
                className="h-[60px] px-8 text-[18px] font-bold rounded-lg active:scale-95 transition-transform"
                style={{
                  background: '#2D9596',
                  color: '#FFFFFF',
                }}
              >
                Check Another Message
              </Button>
              <Button
                onClick={printReport}
                variant="outline"
                className="h-[60px] px-8 text-[18px] font-bold rounded-lg border-2 active:scale-95 transition-transform"
                style={{
                  borderColor: '#265073',
                  color: '#265073',
                }}
              >
                Save This Report
              </Button>
              <Button
                  onClick={() => {
                    window.location.href = 'tel:+18085555435';
                  }}

                className="h-[60px] px-8 text-[18px] font-bold rounded-lg border-2 flex items-center gap-2 active:scale-95 transition-transform"
                style={{
                  borderColor: '#10B981',
                  color: '#FFFFFF',
                }}
              >
                <Phone className="w-5 h-5" />
                Call My Technician
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}