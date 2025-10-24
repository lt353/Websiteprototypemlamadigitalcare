import { useState, useRef, useEffect } from 'react';
import { MobileScene } from '../MobileScene';
import { Button } from '../../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepsCarouselProps {
  onNext: () => void;
  onInteraction: (id: string) => void;
}

interface Step {
  id: number;
  title: string;
  emoji: string;
  content: string;
  quote: string;
  visual: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export function StepsCarousel({ onNext, onInteraction }: StepsCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Why This Matters',
      emoji: '🛡️',
      content: `We started by showing Michelle real examples (not scary, just honest):

• What could happen without good passwords
• Why sticky notes aren't safe
• How password managers protect you

Michelle understood the "why" before the "how" - this made her motivated to learn.`,
      quote: '"I didn\'t know people could see my passwords just by looking at my computer!"',
      visual: 'Shield protecting a lock',
      bgColor: '#E0F2FE',
      borderColor: '#0EA5E9',
      textColor: '#075985'
    },
    {
      id: 2,
      title: 'Choosing Your Tool',
      emoji: '📱',
      content: `We helped Michelle pick a password manager that felt right for her.

Together, we:
• Compared 2-3 easy options
• Installed it on her device
• Set up her account
• Made sure she felt comfortable

No tech overwhelm - just one decision at a time.`,
      quote: '"You helped me understand what each button does. Now I\'m not afraid to use it."',
      visual: 'Phone with password manager app',
      bgColor: '#F0FDF4',
      borderColor: '#10B981',
      textColor: '#065F46'
    },
    {
      id: 3,
      title: 'Your First Password',
      emoji: '🔑',
      content: `Michelle created her first secure password with us right there:

✓ Used the password generator
✓ Understood why it's strong
✓ Saved it safely
✓ Practiced using it

We didn't move on until she felt confident.`,
      quote: '"I was nervous to let the computer make my password, but now I see why it\'s better!"',
      visual: 'Key being generated with secure symbols',
      bgColor: '#FEF3C7',
      borderColor: '#F59E0B',
      textColor: '#78350F'
    },
    {
      id: 4,
      title: 'Moving Everything Over',
      emoji: '✅',
      content: `We didn't do it all at once - that's overwhelming!

Session 1: Most important accounts (3-4)
Week 2 Check-in: Added 5 more
Week 3 Check-in: Finished the rest

Michelle practiced logging in with her new system until it felt natural.`,
      quote: '"Breaking it into small steps made it doable. I never felt overwhelmed."',
      visual: 'Checkmarks with multiple account icons',
      bgColor: '#FCE7F3',
      borderColor: '#EC4899',
      textColor: '#831843'
    }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left - next step
      nextStep();
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right - previous step
      previousStep();
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      onInteraction(`step-${currentStep + 1}`);
      if (window.navigator && 'vibrate' in window.navigator) {
        window.navigator.vibrate(10);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (window.navigator && 'vibrate' in window.navigator) {
        window.navigator.vibrate(10);
      }
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    onInteraction(`jump-to-step-${stepIndex}`);
  };

  const step = steps[currentStep];

  return (
    <MobileScene>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[32px] md:text-[40px] font-bold mb-4" style={{ color: '#265073' }}>
          📚 The Learning Journey
        </h1>
        <p className="text-[18px]" style={{ color: '#6B7280' }}>
          Swipe left/right or use arrows to see each step
        </p>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative mb-6 overflow-hidden"
      >
        {/* Step Card */}
        <div
          className="p-6 rounded-2xl transition-all duration-300"
          style={{
            background: step.bgColor,
            border: `3px solid ${step.borderColor}`,
            minHeight: '550px'
          }}
        >
          {/* Step Header */}
          <div className="text-center mb-6">
            <div className="text-[80px] mb-3">{step.emoji}</div>
            <h2 className="text-[28px] md:text-[32px] font-bold mb-2" style={{ color: step.textColor }}>
              Step {step.id}: {step.title}
            </h2>
            <p className="text-[14px] italic" style={{ color: step.textColor, opacity: 0.7 }}>
              [{step.visual}]
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            <div
              className="text-[18px] leading-relaxed whitespace-pre-line"
              style={{ color: step.textColor }}
            >
              {step.content}
            </div>
          </div>

          {/* Quote */}
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              border: `2px solid ${step.borderColor}`
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-[32px]">💬</span>
              <div>
                <p className="text-[16px] italic font-medium" style={{ color: step.textColor }}>
                  {step.quote}
                </p>
                <p className="text-[14px] font-semibold mt-2" style={{ color: step.textColor }}>
                  - Michelle
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={previousStep}
          disabled={currentStep === 0}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 disabled:opacity-30"
          style={{
            background: '#FFFFFF',
            border: '3px solid #2D9596'
          }}
        >
          <ChevronLeft className="w-8 h-8" style={{ color: '#2D9596' }} />
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 disabled:opacity-30"
          style={{
            background: '#FFFFFF',
            border: '3px solid #2D9596'
          }}
        >
          <ChevronRight className="w-8 h-8" style={{ color: '#2D9596' }} />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-3 mb-8">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className="transition-all active:scale-90"
            style={{
              width: currentStep === index ? '40px' : '12px',
              height: '12px',
              borderRadius: '6px',
              background: currentStep === index ? '#2D9596' : '#D1D5DB',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Step Counter */}
      <div className="text-center mb-8">
        <p className="text-[20px] font-semibold" style={{ color: '#265073' }}>
          Step {currentStep + 1} of {steps.length}
        </p>
        <p className="text-[16px] mt-2" style={{ color: '#6B7280' }}>
          {currentStep < steps.length - 1 ? (
            '← Swipe to continue →'
          ) : (
            'All steps completed! 🎉'
          )}
        </p>
      </div>

      {/* Summary Box */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: '#F0F9FF', border: '2px solid #0EA5E9' }}>
        <h3 className="text-[22px] font-bold mb-3" style={{ color: '#075985' }}>
          Why This Approach Works:
        </h3>
        <div className="space-y-2">
          {[
            'One step at a time - never overwhelming',
            'Practice until you feel confident',
            'Real support, not just instruction',
            'Focus on YOUR specific needs'
          ].map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-[20px]">✓</span>
              <p className="text-[16px]" style={{ color: '#0C4A6E' }}>
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={onNext}
        className="w-full h-[70px] text-[22px] font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
        style={{
          background: 'linear-gradient(135deg, #2D9596 0%, #265073 100%)',
          color: '#FFFFFF'
        }}
      >
        See Michelle's Results →
      </Button>
    </MobileScene>
  );
}
