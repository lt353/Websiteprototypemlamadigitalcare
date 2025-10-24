import { useState } from 'react';
import { MobileScene } from '../MobileScene';
import { Button } from '../../ui/button';
import { Clock, Users, MapPin, Coffee } from 'lucide-react';

interface ClassroomSceneProps {
  onNext: () => void;
  onInteraction: (id: string) => void;
}

export function ClassroomScene({ onNext, onInteraction }: ClassroomSceneProps) {
  const [michelleThought, setMichelleThought] = useState(false);
  const [instructorApproach, setInstructorApproach] = useState(false);

  const handleMichelleTap = () => {
    setMichelleThought(!michelleThought);
    onInteraction('michelle-thought');
    if (window.navigator && 'vibrate' in window.navigator) {
      window.navigator.vibrate(15);
    }
  };

  const handleInstructorTap = () => {
    setInstructorApproach(!instructorApproach);
    onInteraction('instructor-approach');
    if (window.navigator && 'vibrate' in window.navigator) {
      window.navigator.vibrate(15);
    }
  };

  return (
    <MobileScene>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[32px] md:text-[40px] font-bold mb-4" style={{ color: '#265073' }}>
          🌺 Learning with Mālama
        </h1>
        <p className="text-[20px] md:text-[24px] leading-relaxed" style={{ color: '#6B7280' }}>
          Michelle joined our Password Management class - just her and 3 other kūpuna learning together.
        </p>
      </div>

      {/* Interactive Classroom Illustration */}
      <div className="mb-8">
        <p className="text-[18px] font-semibold mb-4 text-center" style={{ color: '#2D9596' }}>
          👆 Tap Michelle or the instructor to learn more
        </p>

        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
            aspectRatio: '4/3',
            border: '3px solid #2D9596'
          }}
        >
          {/* Placeholder for classroom illustration */}
          <div className="w-full h-full flex flex-col items-center justify-center p-6">
            {/* Instructor (left side) */}
            <button
              onClick={handleInstructorTap}
              className="absolute top-[20%] left-[15%] w-[120px] h-[120px] rounded-full flex items-center justify-center transition-transform active:scale-95"
              style={{
                background: '#9AD0C2',
                border: instructorApproach ? '4px solid #2D9596' : '4px solid transparent',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-center">
                <div className="text-[40px]">👩‍🏫</div>
                <p className="text-[12px] font-bold mt-1" style={{ color: '#265073' }}>
                  Instructor
                </p>
              </div>
            </button>

            {/* Michelle (right side) */}
            <button
              onClick={handleMichelleTap}
              className="absolute top-[20%] right-[15%] w-[120px] h-[120px] rounded-full flex items-center justify-center transition-transform active:scale-95"
              style={{
                background: '#F1FADA',
                border: michelleThought ? '4px solid #E67E50' : '4px solid transparent',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-center">
                <div className="text-[40px]">😊</div>
                <p className="text-[12px] font-bold mt-1" style={{ color: '#265073' }}>
                  Michelle
                </p>
              </div>
            </button>

            {/* Tablet between them */}
            <div
              className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[100px] h-[70px] rounded-lg flex items-center justify-center"
              style={{
                background: '#FFFFFF',
                border: '3px solid #265073',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
              }}
            >
              <span className="text-[32px]">📱</span>
            </div>

            {/* Background blur elements representing other students */}
            <div className="absolute bottom-[15%] left-[10%] opacity-30">
              <div className="text-[30px]">👤</div>
            </div>
            <div className="absolute bottom-[15%] right-[10%] opacity-30">
              <div className="text-[30px]">👤</div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-[14px] italic" style={{ color: '#475569' }}>
                [Illustration: Cozy learning environment with natural light]
              </p>
            </div>
          </div>
        </div>

        {/* Thought Bubbles */}
        {michelleThought && (
          <div
            className="mt-4 p-6 rounded-2xl animate-in slide-in-from-top-3"
            style={{
              background: '#FEF3C7',
              border: '3px solid #F59E0B'
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-[32px]">💭</span>
              <div>
                <p className="text-[20px] font-bold mb-2" style={{ color: '#78350F' }}>
                  Michelle's Thought:
                </p>
                <p className="text-[18px] leading-relaxed" style={{ color: '#92400E' }}>
                  "Finally, someone who doesn't make me feel stupid for asking questions!"
                </p>
              </div>
            </div>
          </div>
        )}

        {instructorApproach && (
          <div
            className="mt-4 p-6 rounded-2xl animate-in slide-in-from-top-3"
            style={{
              background: '#E0F2FE',
              border: '3px solid #0EA5E9'
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-[32px]">💡</span>
              <div>
                <p className="text-[20px] font-bold mb-2" style={{ color: '#075985' }}>
                  Our Teaching Approach:
                </p>
                <ul className="space-y-2">
                  <li className="text-[16px]" style={{ color: '#0C4A6E' }}>
                    ✓ No rushing - go at your pace
                  </li>
                  <li className="text-[16px]" style={{ color: '#0C4A6E' }}>
                    ✓ No judgment - all questions welcome
                  </li>
                  <li className="text-[16px]" style={{ color: '#0C4A6E' }}>
                    ✓ No tech jargon - plain English
                  </li>
                  <li className="text-[16px]" style={{ color: '#0C4A6E' }}>
                    ✓ Hands-on practice on YOUR device
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Class Details Cards */}
      <div className="mb-8">
        <h3 className="text-[24px] font-bold mb-4" style={{ color: '#265073' }}>
          Class Details:
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className="p-5 rounded-xl"
            style={{
              background: '#E6F7F4',
              border: '2px solid #2D9596'
            }}
          >
            <Clock className="w-10 h-10 mb-3" style={{ color: '#2D9596' }} />
            <p className="text-[16px] font-semibold mb-1" style={{ color: '#265073' }}>
              Duration
            </p>
            <p className="text-[20px] font-bold" style={{ color: '#2D9596' }}>
              90 min
            </p>
          </div>

          <div
            className="p-5 rounded-xl"
            style={{
              background: '#FEF3C7',
              border: '2px solid #F59E0B'
            }}
          >
            <Users className="w-10 h-10 mb-3" style={{ color: '#F59E0B' }} />
            <p className="text-[16px] font-semibold mb-1" style={{ color: '#265073' }}>
              Class Size
            </p>
            <p className="text-[20px] font-bold" style={{ color: '#F59E0B' }}>
              4 max
            </p>
          </div>

          <div
            className="p-5 rounded-xl"
            style={{
              background: '#FCE7F3',
              border: '2px solid #EC4899'
            }}
          >
            <MapPin className="w-10 h-10 mb-3" style={{ color: '#EC4899' }} />
            <p className="text-[16px] font-semibold mb-1" style={{ color: '#265073' }}>
              Location
            </p>
            <p className="text-[18px] font-bold" style={{ color: '#EC4899' }}>
              On Oahu
            </p>
          </div>

          <div
            className="p-5 rounded-xl"
            style={{
              background: '#F0FDF4',
              border: '2px solid #10B981'
            }}
          >
            <Coffee className="w-10 h-10 mb-3" style={{ color: '#10B981' }} />
            <p className="text-[16px] font-semibold mb-1" style={{ color: '#265073' }}>
              Included
            </p>
            <p className="text-[18px] font-bold" style={{ color: '#10B981' }}>
              Snacks!
            </p>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: '#F0F9FF', border: '2px solid #0EA5E9' }}>
        <h3 className="text-[24px] font-bold mb-4" style={{ color: '#075985' }}>
          What Makes Us Different:
        </h3>
        <div className="space-y-3">
          {[
            { emoji: '❤️', text: 'We treat you like family, not a ticket number' },
            { emoji: '⏰', text: 'Small groups mean real attention' },
            { emoji: '🏝️', text: 'Local, culturally aware instruction' },
            { emoji: '🎯', text: 'Focus on YOUR goals, not our curriculum' }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-[24px]">{item.emoji}</span>
              <p className="text-[18px] flex-1" style={{ color: '#0C4A6E' }}>
                {item.text}
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
        See What Michelle Learned →
      </Button>
    </MobileScene>
  );
}
