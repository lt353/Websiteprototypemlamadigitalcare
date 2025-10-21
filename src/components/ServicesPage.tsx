import { Lock, Shield, Smartphone, User, Users, Calendar, Check, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('pricing-plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32"
        style={{
          background:
            "linear-gradient(135deg, #B8E6E3 0%, #FFFFFF 100%)",
        }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-[#2D3748] mb-6" style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 700, lineHeight: 1.2 }}>
              Technology Support Designed for You
            </h1>
            <p className="text-[#2D3748] mb-8" style={{ fontSize: '20px', lineHeight: 1.6 }}>
              Flexible options from single sessions to ongoing support—start wherever feels comfortable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToPlans}
                className="min-h-[56px] px-10 bg-primary hover:bg-primary/90 text-white"
                style={{ fontSize: '18px' }}
              >
                Find Your Plan
              </Button>
              <Button
                onClick={() => onNavigate('contact')}
                variant="outline"
                className="min-h-[56px] px-10 border-2 border-primary text-primary hover:bg-primary hover:text-white"
                style={{ fontSize: '18px' }}
              >
                Talk to Us First
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Philosophy Section */}
      <section className="py-20 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[#2D3748] mb-6" style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, lineHeight: 1.3 }}>
              How We Help
            </h2>
            <p className="text-[#2D3748] max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: 1.6 }}>
              We focus on three core areas where kūpuna need the most support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border-2 border-primary/20 rounded-xl p-8 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-[#2D3748] mb-4" style={{ fontSize: '24px', fontWeight: 700 }}>
                  Password & Account Management
                </h3>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <br />
                <p className="text-[#2D3748] mb-4" style={{ fontSize: '18px', lineHeight: 1.6 }}>
                  Set up password managers, recover accounts, organize logins
                </p>
                <p className="text-primary italic" style={{ fontSize: '16px', fontWeight: 600 }}>
                  "We don't just fix it—we teach you how"
                </p>
              </div>
            </div>
          
            <div className="bg-white border-2 border-primary/20 rounded-xl p-8 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-[#2D3748] mb-4" style={{ fontSize: '24px', fontWeight: 700 }}>
                  Scam Prevention & Response
                </h3>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-[#2D3748] mb-8 mt-8" style={{ fontSize: '18px', lineHeight: 1.6 }}>
                  Identify threats, report fraud, secure accounts after breaches
                </p>
                <p className="text-primary italic" style={{ fontSize: '16px', fontWeight: 600 }}>
                  "Stay safe with confidence, not fear"
                </p>
              </div>
            </div>
          
            <div className="bg-white border-2 border-primary/20 rounded-xl p-8 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-[#2D3748] mb-4" style={{ fontSize: '24px', fontWeight: 700 }}>
                  Device Organization & Confidence
                </h3>
              </div>
              <br />
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-[#2D3748] mb-4" style={{ fontSize: '18px', lineHeight: 1.6 }}>
                  Declutter apps, adjust settings, patient troubleshooting
                </p>
                <p className="text-primary italic" style={{ fontSize: '16px', fontWeight: 600 }}>
                  "Your device should work for you, not against you"
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-[#2D3748] opacity-70 italic" style={{ fontSize: '16px' }}>
            We focus on education and empowerment, not device repairs or full IT support
          </p>
        </div>
      </section>

      {/* Service Delivery Options Section */}
      <section id="choose-how-you-learn" className="py-20 md:py-20 bg-[#F5F1E8]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[#2D3748] mb-6" style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, lineHeight: 1.3 }}>
              Choose How You Learn Best
            </h2>
            <p className="text-[#2D3748] max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: 1.6 }}>
              Everyone learns differently. Pick what feels right for you—you can always change later.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* One-on-One Sessions */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-[#2D3748]" style={{ fontSize: '24px', fontWeight: 700 }}>
                  One-on-One Sessions
                </h3>
              </div>
              <p className="text-primary mb-6" style={{ fontSize: '18px', fontWeight: 600 }}>
                Personal attention at your pace
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>In-home: $85 per 90-min session</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Virtual: $35 per 60-min session</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Package discounts available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Great for: Specific problems, building deep understanding</span>
                </li>
              </ul>
              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate('register')}
                  className="w-full min-h-[56px] bg-primary hover:bg-primary/90"
                  style={{ fontSize: '18px' }}
                >
                  Sign Up to Book
                </Button>
                <Button
                  onClick={() => onNavigate('contact')}
                  variant="outline"
                  className="w-full min-h-[48px] border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  style={{ fontSize: '16px' }}
                >
                  Get In Touch for Consultation
                </Button>
              </div>
            </div>

            {/* Small Group Sessions */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-[#2D3748]" style={{ fontSize: '24px', fontWeight: 700 }}>
                  Small Group Sessions
                </h3>
              </div>
              <p className="text-primary mb-6" style={{ fontSize: '18px', fontWeight: 600 }}>
                Learn with friends or family
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>2 people: $120 per session</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Add $35 per additional person</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>In-home, 90 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Great for: Couples, friends learning together</span>
                </li>
              </ul>
              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate('register')}
                  className="w-full min-h-[56px] bg-primary hover:bg-primary/90"
                  style={{ fontSize: '18px' }}
                >
                  Sign Up to Schedule
                </Button>
                <Button
                  onClick={() => onNavigate('contact')}
                  variant="outline"
                  className="w-full min-h-[48px] border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  style={{ fontSize: '16px' }}
                >
                  Get In Touch for Consultation
                </Button>
              </div>
            </div>

            {/* Workshops or Larger Group Classes */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-[#2D3748]" style={{ fontSize: '24px', fontWeight: 700 }}>
                  Workshops or Larger Group Classes
                </h3>
              </div>
              <p className="text-primary mb-6" style={{ fontSize: '18px', fontWeight: 600 }}>
                Learn with others in your community
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>FREE scam prevention workshops</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Affordable skill-building classes ($15-$25)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Libraries and community centers on Oahu</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Great for: Meeting us first, learning with peers</span>
                </li>
              </ul>
              <br />
              <Button
                onClick={() => onNavigate('workshops')}
                className="w-full min-h-[56px] bg-primary hover:bg-primary/90"
                style={{ fontSize: '18px' }}
              >
                View All Workshops & Classes
              </Button>
            </div>

            {/* Monthly Support Plans */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-[#2D3748]" style={{ fontSize: '24px', fontWeight: 700 }}>
                  Monthly Support Plans
                </h3>
              </div>
              <p className="text-primary mb-6" style={{ fontSize: '18px', fontWeight: 600 }}>
                Ongoing confidence building
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Basic: $39/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Standard: $79/month <span className="text-primary font-semibold">(Most Popular)</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Premium: $149/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span style={{ fontSize: '16px' }}>Great for: Continuous learning, peace of mind</span>
                </li>
              </ul>
              <br />
              <Button
                onClick={scrollToPlans}
                className="w-full min-h-[56px] bg-primary hover:bg-primary/90"
                style={{ fontSize: '18px' }}
              >
                See Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Plans Comparison Section */}
      <section id="pricing-plans" className="py-20 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[#2D3748] mb-6 text-[32px] md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
              Monthly Support Plans
            </h2>
            <p className="text-[#2D3748] max-w-3xl mx-auto text-[16px] md:text-[20px]" style={{ lineHeight: 1.6 }}>
              For ongoing learning and support—not just when things break
            </p>
          </div>

          {/* RESPONSIVE PRICING GRID - Stack on mobile, show Standard first */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mb-8">
            {/* Basic Plan */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 order-2 md:order-1">
              <div className="text-center mb-8">
                <h3 className="text-[#2D3748] mb-4" style={{ fontSize: '28px', fontWeight: 700 }}>
                  Basic Plan
                </h3>
                <div className="mb-2">
                  <span className="text-primary" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
                    $39
                  </span>
                  <span className="text-[#2D3748]" style={{ fontSize: '20px' }}>/month</span>
                </div>
                <p className="text-[#2D3748] opacity-70" style={{ fontSize: '14px' }}>
                  $219 every 6 months (save $15)<br />
                  $390/year (save 2 months)
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>1 virtual check-in monthly (30 min)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to our AI powered scam checker 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to our AI powered tech helper 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Email support (48-hour response)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Phone support M-F 9am-5pm HST</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>15% discount on in-home sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to learning library</span>
                </li>

              </ul>
              <br />
              <br />
              <br />
              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate('register')}
                  className="w-full min-h-[56px] bg-primary hover:bg-primary/90"
                  style={{ fontSize: '18px' }}
                >
                  Sign Up to Start Basic
                </Button>
                <Button
                  onClick={() => onNavigate('contact')}
                  variant="outline"
                  className="w-full min-h-[48px] border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  style={{ fontSize: '16px' }}
                >
                  Get In Touch for Consultation
                </Button>
              </div>
            </div>

            {/* Standard Plan - Most Popular */}
            <div className="bg-white border-4 border-primary rounded-xl p-8 relative shadow-xl order-1 md:order-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-2 rounded-full" style={{ fontSize: '14px', fontWeight: 700 }}>
                ⭐ MOST POPULAR
              </div>
              
              <div className="text-center mb-8 mt-4">
                <h3 className="text-[#2D3748] mb-4" style={{ fontSize: '28px', fontWeight: 700 }}>
                  Standard Plan
                </h3>
                <div className="mb-2">
                  <span className="text-primary" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
                    $79
                  </span>
                  <span className="text-[#2D3748]" style={{ fontSize: '20px' }}>/month</span>
                </div>
                <p className="text-[#2D3748] opacity-70" style={{ fontSize: '14px' }}>
                  $429 every 6 months (save $45)<br />
                  $790/year (save 2 months)
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>1 in-home visit (90 min) OR 3 virtual sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to our AI powered scam checker 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to our AI powered tech helper 24/7</span>
                </li>
                 <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Email support (48-hour response)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Phone support M-F 9am-5pm HST</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to learning library</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Custom guides after each session</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>15% discount on additional in-home sessions</span>
                </li>
              </ul>

              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate('register')}
                  className="w-full min-h-[56px] bg-primary hover:bg-primary/90"
                  style={{ fontSize: '18px' }}
                >
                  Sign Up to Start Standard
                </Button>
                <Button
                  onClick={() => onNavigate('contact')}
                  variant="outline"
                  className="w-full min-h-[48px] border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  style={{ fontSize: '16px' }}
                >
                  Get In Touch for Consultation
                </Button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 order-3 md:order-3">
              <div className="text-center mb-8">
                <h3 className="text-[#2D3748] mb-4" style={{ fontSize: '28px', fontWeight: 700 }}>
                  Premium Plan
                </h3>
                <div className="mb-2">
                  <span className="text-primary" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
                    $149
                  </span>
                  <span className="text-[#2D3748]" style={{ fontSize: '20px' }}>/month</span>
                </div>
                <p className="text-[#2D3748] opacity-70" style={{ fontSize: '14px' }}>
                  $899 every 6 months (save $90)<br />
                  $1,490/year (save 2 months)
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>2 in-home visits (90 min each) monthly</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>2 virtual sessions (30 min each)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to our AI powered scam checker 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to our AI powered tech helper 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>24/7 emergency support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Access to learning library</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Custom guides + session recordings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>Quarterly progress review</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '16px' }}>15% discount on additional in-home sessions</span>
                </li>
              </ul>

              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate('register')}
                  className="w-full min-h-[56px] bg-primary hover:bg-primary/90"
                  style={{ fontSize: '18px' }}
                >
                  Sign Up to Start Premium
                </Button>
                <Button
                  onClick={() => onNavigate('contact')}
                  variant="outline"
                  className="w-full min-h-[48px] border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  style={{ fontSize: '16px' }}
                >
                  Get In Touch for Consultation
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-[#2D3748]" style={{ fontSize: '16px', fontWeight: 600 }}>
            Whatever your needs, there is a service or plan that can help! 
          </p>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 md:py-20 bg-[#F5F1E8]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[#2D3748] mb-6" style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, lineHeight: 1.3 }}>
              What to Expect
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🧘', text: 'Patient Teaching (no rushing)' },
              { icon: '📝', text: 'Custom Take-Home Guides' },
              { icon: '📹', text: 'Session Notes & Recordings' },
              { icon: '🛡️', text: '24/7 Scam Checker and Tech Help Tools' },
              { icon: '👨‍👩‍👧', text: 'Family Collaboration Welcome' },
              { icon: '✅', text: 'No Long-Term Contracts' },
              { icon: '🏠', text: 'In-Person First Approach' },
              { icon: '📱', text: 'All Devices Supported' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-[#2D3748]" style={{ fontSize: '16px', fontWeight: 600 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[#2D3748] mb-6" style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, lineHeight: 1.3 }}>
              Common Questions About Our Services
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-xl border-2 border-primary/20 px-6 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-left text-[#2D3748]" style={{ fontSize: '20px', fontWeight: 700 }}>
                    Can I switch between plans?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-[#2D3748]" style={{ fontSize: '18px', lineHeight: 1.7 }}>
                    Yes! Upgrade, downgrade, or pause anytime. No cancellation fees.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-xl border-2 border-primary/20 px-6 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-left text-[#2D3748]" style={{ fontSize: '20px', fontWeight: 700 }}>
                    What devices do you support?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-[#2D3748]" style={{ fontSize: '18px', lineHeight: 1.7 }}>
                    All of them—iPhone, Android, iPad, tablets, Mac, PC, laptops, desktops.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-xl border-2 border-primary/20 px-6 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-left text-[#2D3748]" style={{ fontSize: '20px', fontWeight: 700 }}>
                    Do you do repairs?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-[#2D3748]" style={{ fontSize: '18px', lineHeight: 1.7 }}>
                    No, we focus on teaching and problem-solving, not hardware repairs. We can recommend local repair shops.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-xl border-2 border-primary/20 px-6 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-left text-[#2D3748]" style={{ fontSize: '20px', fontWeight: 700 }}>
                    Can I gift this to my parent?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-[#2D3748]" style={{ fontSize: '18px', lineHeight: 1.7 }}>
                    Absolutely! Many adult children purchase plans as gifts. We just need your parent to be willing to learn.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-xl border-2 border-primary/20 px-6 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-left text-[#2D3748]" style={{ fontSize: '20px', fontWeight: 700 }}>
                    What if I need to cancel a session?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-[#2D3748]" style={{ fontSize: '18px', lineHeight: 1.7 }}>
                    Cancel or reschedule up to 24 hours before with no charge.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-xl border-2 border-primary/20 px-6 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-left text-[#2D3748]" style={{ fontSize: '20px', fontWeight: 700 }}>
                    Do you come to neighbor islands?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-[#2D3748]" style={{ fontSize: '18px', lineHeight: 1.7 }}>
                    We're based on Oahu for in-home visits. Virtual sessions available statewide.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2 className="text-white mb-8" style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 700, lineHeight: 1.3 }}>
            Ready to Feel Confident with Technology?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
            <button
              onClick={() => onNavigate('contact')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#9AD0C2';
                e.currentTarget.style.color = '#265073';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(154, 208, 194, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#2D9596';
                e.currentTarget.style.boxShadow = 'none';
              }}
              className="min-h-[64px] px-12 transition-all rounded-md inline-flex items-center justify-center"
              style={{ fontSize: '20px', fontWeight: 700, background: '#FFFFFF', color: '#2D9596', border: 'none', cursor: 'pointer' }}
            >
              Get Started
            </button>
            <button
              onClick={() => onNavigate('contact')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#265073';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(38, 80, 115, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#2D9596';
                e.currentTarget.style.boxShadow = 'none';
              }}
              className="min-h-[64px] px-12 transition-all rounded-md inline-flex items-center justify-center gap-2"
              style={{ fontSize: '20px', fontWeight: 700, background: '#FFFFFF', color: '#2D9596', border: 'none', cursor: 'pointer' }}
            >
              <Phone className="w-6 h-6" />
              Call Us: (808) 555-1234
            </button>
          </div>
          
        </div>
      </section>
    </div>
  );
}
