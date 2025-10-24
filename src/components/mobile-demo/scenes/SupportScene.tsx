import { useState } from 'react';
import { MobileScene } from '../MobileScene';
import { Button } from '../../ui/button';
import { MessageCircle, RefreshCw, Users, Calendar, ChevronDown, ChevronUp, Share2 } from 'lucide-react';

interface SupportSceneProps {
  onNext: () => void;
  onInteraction: (id: string) => void;
}

interface SupportType {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  details: string[];
  color: string;
  bgColor: string;
}

export function SupportScene({ onNext, onInteraction }: SupportSceneProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showCalendar, setShowCalendar] = useState(false);

  const supportTypes: SupportType[] = [
    {
      id: 'text-call',
      icon: <MessageCircle className="w-10 h-10" />,
      title: 'Text/Call Anytime',
      subtitle: 'Quick question? Just text!',
      details: [
        'Same-day response guaranteed',
        'Direct line to your instructor',
        'No question too small',
        'Available 7 days a week',
        'Text, call, or video chat'
      ],
      color: '#2D9596',
      bgColor: '#E6F7F4'
    },
    {
      id: 'follow-up',
      icon: <RefreshCw className="w-10 h-10" />,
      title: 'Free Follow-up Sessions',
      subtitle: 'Week 2, 4, and 6 check-ins',
      details: [
        '3 free follow-up sessions included',
        'Make sure you\'re confident',
        'Add more accounts as you\'re ready',
        'Troubleshoot any issues',
        'Build on what you learned'
      ],
      color: '#F59E0B',
      bgColor: '#FEF3C7'
    },
    {
      id: 'community',
      icon: <Users className="w-10 h-10" />,
      title: 'Community Classes',
      subtitle: 'Learn alongside other kūpuna',
      details: [
        'Monthly community sessions',
        'New topics each month',
        'Share tips with peers',
        'Build friendships',
        'Always welcoming newcomers'
      ],
      color: '#EC4899',
      bgColor: '#FCE7F3'
    },
    {
      id: 'book-anytime',
      icon: <Calendar className="w-10 h-10" />,
      title: 'Book When You Need',
      subtitle: 'Need a refresher? No problem.',
      details: [
        'Book additional sessions anytime',
        'Flexible scheduling',
        'No judgment ever',
        'Same supportive approach',
        'We remember your learning style'
      ],
      color: '#10B981',
      bgColor: '#F0FDF4'
    }
  ];

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
    onInteraction(`expand-${cardId}`);

    if (window.navigator && 'vibrate' in window.navigator) {
      window.navigator.vibrate(10);
    }
  };

  const handleShare = async () => {
    onInteraction('share-demo');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mālama Digital Care - Password Management',
          text: 'Check out how Michelle transformed her digital security!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback - copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <MobileScene>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[32px] md:text-[40px] font-bold mb-4" style={{ color: '#265073' }}>
          🤝 Your Support System
        </h1>
        <p className="text-[20px] md:text-[24px] leading-relaxed" style={{ color: '#6B7280' }}>
          Because one class is just the beginning
        </p>
      </div>

      {/* Hero Illustration */}
      <div className="mb-8">
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F1FADA 0%, #9AD0C2 100%)',
            aspectRatio: '16/9'
          }}
        >
          <div className="w-full h-full flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-[80px] mb-3">📱💬</div>
              <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                Michelle with phone showing support chat
              </p>
              <p className="text-[13px] mt-2" style={{ color: '#475569' }}>
                [Illustration: Circular icons showing support channels]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction */}
      <p className="text-[18px] font-semibold mb-6 text-center" style={{ color: '#2D9596' }}>
        👆 Tap each card to learn more
      </p>

      {/* Support Cards */}
      <div className="space-y-4 mb-8">
        {supportTypes.map((support) => {
          const isExpanded = expandedCards.has(support.id);

          return (
            <button
              key={support.id}
              onClick={() => toggleCard(support.id)}
              className="w-full text-left p-6 rounded-2xl transition-all active:scale-98"
              style={{
                background: support.bgColor,
                border: `3px solid ${support.color}`
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div style={{ color: support.color }}>
                    {support.icon}
                  </div>
                  <div>
                    <h3 className="text-[22px] md:text-[24px] font-bold mb-1" style={{ color: '#265073' }}>
                      {support.title}
                    </h3>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>
                      {support.subtitle}
                    </p>
                  </div>
                </div>
                <div style={{ color: support.color }}>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t-2" style={{ borderColor: support.color }}>
                  <ul className="space-y-2">
                    {support.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[18px]">✓</span>
                        <span className="text-[16px]" style={{ color: '#475569' }}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* What Makes Us Different */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: '#EFF6FF', border: '3px solid #3B82F6' }}>
        <h3 className="text-[24px] font-bold mb-4" style={{ color: '#1E40AF' }}>
          This Ongoing Relationship Makes Us Different
        </h3>
        <p className="text-[18px] leading-relaxed mb-4" style={{ color: '#1E3A8A' }}>
          We're not like Geek Squad or the Apple Store.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[24px]">❌</span>
            <p className="text-[16px]" style={{ color: '#1E3A8A' }}>
              We're not fixing your device
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[24px]">✅</span>
            <p className="text-[16px] font-semibold" style={{ color: '#1E40AF' }}>
              We're building your confidence
            </p>
          </div>
        </div>
      </div>

      {/* Sample Timeline */}
      <button
        onClick={() => {
          setShowCalendar(!showCalendar);
          onInteraction('toggle-calendar');
        }}
        className="w-full mb-8 p-6 rounded-2xl text-left transition-all active:scale-98"
        style={{
          background: '#F0F9FF',
          border: '2px solid #0EA5E9'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[22px] font-bold" style={{ color: '#075985' }}>
            📅 Michelle's Support Timeline
          </h3>
          {showCalendar ? (
            <ChevronUp className="w-6 h-6" style={{ color: '#0EA5E9' }} />
          ) : (
            <ChevronDown className="w-6 h-6" style={{ color: '#0EA5E9' }} />
          )}
        </div>

        {showCalendar && (
          <div className="mt-4 space-y-3">
            {[
              { week: 'Week 1', event: 'Initial 90-min class' },
              { week: 'Week 2', event: 'Check-in call (15 min)' },
              { week: 'Week 3', event: 'Text support for a question' },
              { week: 'Week 4', event: 'Follow-up session (30 min)' },
              { week: 'Week 6', event: 'Final check-in (15 min)' },
              { week: 'Ongoing', event: 'Text support anytime' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#FFFFFF' }}>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#0EA5E9' }}
                />
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: '#075985' }}>
                    {item.week}
                  </p>
                  <p className="text-[15px]" style={{ color: '#0C4A6E' }}>
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </button>

      {/* Success Story Teaser */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}>
        <div className="flex items-start gap-3 mb-4">
          <span className="text-[40px]">💛</span>
          <div>
            <p className="text-[18px] italic mb-2" style={{ color: '#78350F' }}>
              "The follow-ups made all the difference. Week 2, I had questions. Week 4, I was ready to add more accounts. By week 6, I was helping my friend!"
            </p>
            <p className="text-[16px] font-bold" style={{ color: '#92400E' }}>
              - Michelle, reflecting on her journey
            </p>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <Button
        onClick={handleShare}
        className="w-full h-[60px] mb-4 text-[20px] font-bold rounded-2xl transition-transform active:scale-95"
        style={{
          background: '#FFFFFF',
          color: '#2D9596',
          border: '3px solid #2D9596'
        }}
      >
        <Share2 className="w-6 h-6 mr-2" />
        Share This Story
      </Button>

      {/* CTA Buttons */}
      <div className="space-y-4 mb-6">
        <Button
          onClick={() => onInteraction('see-pricing')}
          className="w-full h-[70px] text-[22px] font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #2D9596 0%, #265073 100%)',
            color: '#FFFFFF'
          }}
        >
          See Pricing & Book →
        </Button>

        <Button
          onClick={() => onInteraction('free-consultation')}
          className="w-full h-[70px] text-[22px] font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
          style={{
            background: '#E67E50',
            color: '#FFFFFF'
          }}
        >
          Book Free Consultation
        </Button>
      </div>

      {/* Final Message */}
      <div className="text-center p-6 rounded-2xl" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
        <div className="text-[48px] mb-3">🌺</div>
        <p className="text-[20px] font-bold mb-2" style={{ color: '#065F46' }}>
          Your transformation starts here
        </p>
        <p className="text-[16px]" style={{ color: '#047857' }}>
          Let's make your digital life easier, safer, and more confident
        </p>
      </div>

      {/* Journey Complete Indicator */}
      <div className="mt-8 text-center">
        <p className="text-[16px] mb-2" style={{ color: '#9CA3AF' }}>
          ✓ You've completed Michelle's journey
        </p>
        <p className="text-[14px]" style={{ color: '#D1D5DB' }}>
          Tap "Home" to start over or book your session
        </p>
      </div>
    </MobileScene>
  );
}
