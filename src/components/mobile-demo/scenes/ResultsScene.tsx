import { useState, useEffect } from 'react';
import { MobileScene } from '../MobileScene';
import { Button } from '../../ui/button';
import { Lock, Clock, CheckCircle, Shield } from 'lucide-react';

interface ResultsSceneProps {
  onNext: () => void;
  onInteraction: (id: string) => void;
}

interface Metric {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
  bgColor: string;
}

export function ResultsScene({ onNext, onInteraction }: ResultsSceneProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [counters, setCounters] = useState({
    accounts: 0,
    hours: 0,
    frustrations: 0,
    security: 0
  });

  const metrics: Metric[] = [
    {
      id: 'accounts',
      icon: <Lock className="w-12 h-12" />,
      label: 'Accounts Protected',
      value: 15,
      suffix: '',
      color: '#2D9596',
      bgColor: '#E6F7F4'
    },
    {
      id: 'hours',
      icon: <Clock className="w-12 h-12" />,
      label: 'Hours Saved/Week',
      value: 2,
      suffix: '+',
      color: '#F59E0B',
      bgColor: '#FEF3C7'
    },
    {
      id: 'frustrations',
      icon: <CheckCircle className="w-12 h-12" />,
      label: 'Login Frustrations',
      value: 0,
      suffix: '',
      color: '#10B981',
      bgColor: '#F0FDF4'
    },
    {
      id: 'security',
      icon: <Shield className="w-12 h-12" />,
      label: 'Passwords Secure',
      value: 100,
      suffix: '%',
      color: '#EC4899',
      bgColor: '#FCE7F3'
    }
  ];

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        accounts: Math.floor(15 * progress),
        hours: Math.floor(2 * progress),
        frustrations: 0,
        security: Math.floor(100 * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setShowConfetti(true);
        onInteraction('counters-completed');
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onInteraction]);

  const handleMetricTap = (metricId: string) => {
    onInteraction(`metric-tap-${metricId}`);
    // Show detail modal or expand info
  };

  return (
    <MobileScene>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-[30px] animate-bounce"
              style={{
                top: `${Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              {['🎉', '✨', '🌺', '🎊'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-[36px] md:text-[44px] font-bold mb-4" style={{ color: '#265073' }}>
          ✨ Three Weeks Later
        </h1>
        <p className="text-[24px] md:text-[28px] font-semibold" style={{ color: '#2D9596' }}>
          Michelle's Digital Life: Secured ✓
        </p>
      </div>

      {/* Hero Image - Transformed Michelle */}
      <div className="mb-8">
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #9AD0C2 0%, #2D9596 100%)',
            aspectRatio: '4/3'
          }}
        >
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-[100px] mb-4">😊✨</div>
              <p className="text-[18px] font-semibold text-white">
                Confident Michelle with tablet
              </p>
              <p className="text-[14px] mt-2 text-white/90">
                [Illustration: Michelle relaxed, no sticky notes, bright warm colors]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Metrics */}
      <div className="mb-8">
        <p className="text-[18px] font-semibold mb-4 text-center" style={{ color: '#6B7280' }}>
          👆 Tap any metric to learn more
        </p>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => handleMetricTap(metric.id)}
              className="p-6 rounded-2xl transition-transform active:scale-95"
              style={{
                background: metric.bgColor,
                border: `3px solid ${metric.color}`
              }}
            >
              <div style={{ color: metric.color }} className="mb-3">
                {metric.icon}
              </div>
              <div className="text-[36px] md:text-[44px] font-bold mb-2" style={{ color: metric.color }}>
                {counters[metric.id as keyof typeof counters]}{metric.suffix}
              </div>
              <p className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#265073' }}>
                {metric.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Before vs After Comparison */}
      <div className="mb-8">
        <h3 className="text-[26px] font-bold mb-4 text-center" style={{ color: '#265073' }}>
          Before → After
        </h3>

        <div className="space-y-4">
          {[
            { before: '😟 Stressed', after: '😊 Confident', beforeBg: '#FEE2E2', afterBg: '#D1FAE5' },
            { before: '📝 Sticky notes', after: '🔒 Password manager', beforeBg: '#FEE2E2', afterBg: '#D1FAE5' },
            { before: '❌ Locked out weekly', after: '✅ Always access', beforeBg: '#FEE2E2', afterBg: '#D1FAE5' },
            { before: '2/10 confidence', after: '9/10 confidence', beforeBg: '#FEE2E2', afterBg: '#D1FAE5' }
          ].map((comparison, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3"
            >
              <div
                className="p-4 rounded-xl border-2"
                style={{
                  background: comparison.beforeBg,
                  borderColor: '#EF4444'
                }}
              >
                <p className="text-[16px] md:text-[18px] font-semibold text-center" style={{ color: '#7F1D1D' }}>
                  {comparison.before}
                </p>
              </div>
              <div
                className="p-4 rounded-xl border-2"
                style={{
                  background: comparison.afterBg,
                  borderColor: '#10B981'
                }}
              >
                <p className="text-[16px] md:text-[18px] font-semibold text-center" style={{ color: '#065F46' }}>
                  {comparison.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: '#F0F9FF', border: '3px solid #0EA5E9' }}>
        <div className="flex items-start gap-4 mb-4">
          <span className="text-[48px]">💬</span>
          <div>
            <p className="text-[20px] md:text-[22px] italic leading-relaxed mb-4" style={{ color: '#075985' }}>
              "I sleep better knowing my accounts are protected. And I don't waste 20 minutes trying to remember passwords anymore!"
            </p>
            <p className="text-[18px] font-bold" style={{ color: '#0C4A6E' }}>
              - Michelle, Aiea
            </p>
          </div>
        </div>
      </div>

      {/* Additional Success Indicators */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
        <h3 className="text-[22px] font-bold mb-4" style={{ color: '#065F46' }}>
          What Michelle Can Do Now:
        </h3>
        <div className="space-y-3">
          {[
            'Shop online with confidence',
            'Access health portals anytime',
            'Help her grandkids set up accounts',
            'Never worry about forgotten passwords',
            'Feel in control of her digital life'
          ].map((achievement, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-[24px]">✓</span>
              <p className="text-[17px]" style={{ color: '#065F46' }}>
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="mb-8 text-center p-6 rounded-2xl" style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}>
        <div className="text-[48px] mb-3">⭐⭐⭐⭐⭐</div>
        <p className="text-[18px] font-semibold mb-2" style={{ color: '#78350F' }}>
          Michelle is one of 200+ kūpuna we've helped
        </p>
        <p className="text-[16px]" style={{ color: '#92400E' }}>
          Your transformation could be next
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-4">
        <Button
          onClick={onNext}
          className="w-full h-[70px] text-[22px] font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #2D9596 0%, #265073 100%)',
            color: '#FFFFFF'
          }}
        >
          See Your Support System →
        </Button>

        <Button
          onClick={() => onInteraction('want-this-tap')}
          className="w-full h-[70px] text-[22px] font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
          style={{
            background: '#FFFFFF',
            color: '#2D9596',
            border: '3px solid #2D9596'
          }}
        >
          I Want This Too!
        </Button>
      </div>
    </MobileScene>
  );
}
