import { useState } from 'react';
import { MobileScene } from '../MobileScene';
import { Button } from '../../ui/button';

interface ChallengeSc eneProps {
  onNext: () => void;
  onInteraction: (id: string) => void;
}

interface StickyNote {
  id: string;
  text: string;
  problem: string;
  rotation: number;
  color: string;
  position: { top: string; left: string };
}

export function ChallengeScene({ onNext, onInteraction }: ChallengeSceneProps) {
  const [flippedNotes, setFlippedNotes] = useState<Set<string>>(new Set());

  const stickyNotes: StickyNote[] = [
    {
      id: 'note-1',
      text: 'password123',
      problem: 'Too simple - cracked in seconds',
      rotation: -5,
      color: '#FEF3C7',
      position: { top: '20%', left: '10%' }
    },
    {
      id: 'note-2',
      text: 'hawaii2020',
      problem: 'Easy to guess - uses personal info',
      rotation: 8,
      color: '#DBEAFE',
      position: { top: '25%', left: '50%' }
    },
    {
      id: 'note-3',
      text: 'Same for all',
      problem: 'One breach = everything exposed',
      rotation: -3,
      color: '#FCE7F3',
      position: { top: '45%', left: '15%' }
    },
    {
      id: 'note-4',
      text: 'By computer',
      problem: 'Anyone walking by can see it',
      rotation: 6,
      color: '#D1FAE5',
      position: { top: '50%', left: '55%' }
    }
  ];

  const flipNote = (noteId: string) => {
    const newFlipped = new Set(flippedNotes);
    if (newFlipped.has(noteId)) {
      newFlipped.delete(noteId);
    } else {
      newFlipped.add(noteId);
    }
    setFlippedNotes(newFlipped);
    onInteraction(`flip-${noteId}`);

    // Haptic feedback if supported
    if (window.navigator && 'vibrate' in window.navigator) {
      window.navigator.vibrate(10);
    }
  };

  return (
    <MobileScene>
      {/* Hero Illustration */}
      <div className="w-full mb-6">
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FED7AA 100%)',
            aspectRatio: '4/3'
          }}
        >
          {/* Placeholder for Michelle frustrated illustration */}
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-[80px] mb-4">😟</div>
              <p className="text-[18px] font-semibold" style={{ color: '#78350F' }}>
                Michelle surrounded by sticky notes
              </p>
              <p className="text-[14px] mt-2" style={{ color: '#92400E' }}>
                [Illustration: Michelle at kitchen table with tablet, frustrated look, sticky notes everywhere]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-[32px] md:text-[40px] font-bold mb-4" style={{ color: '#265073' }}>
          😟 Meet Michelle
        </h1>
        <p className="text-[20px] md:text-[24px] leading-relaxed" style={{ color: '#6B7280' }}>
          Michelle is like many kūpuna - she has 15+ different accounts but can't keep track of all those passwords.
        </p>
      </div>

      {/* Interactive Sticky Notes Section */}
      <div className="mb-8">
        <p className="text-[22px] font-semibold mb-6 text-center" style={{ color: '#265073' }}>
          👆 Tap the sticky notes to see her password problems
        </p>

        <div className="relative h-[500px] mb-8" style={{ background: '#F9FAFB', borderRadius: '16px' }}>
          {stickyNotes.map((note) => {
            const isFlipped = flippedNotes.has(note.id);

            return (
              <button
                key={note.id}
                onClick={() => flipNote(note.id)}
                className="absolute w-[140px] h-[140px] p-4 rounded-lg shadow-lg transition-all duration-300 active:scale-95"
                style={{
                  top: note.position.top,
                  left: note.position.left,
                  transform: `rotate(${note.rotation}deg) ${isFlipped ? 'rotateY(180deg)' : ''}`,
                  background: note.color,
                  border: '2px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d'
                }}
              >
                {!isFlipped ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-[18px] font-bold text-center" style={{ color: '#1F2937' }}>
                      ❌ {note.text}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full" style={{ transform: 'rotateY(180deg)' }}>
                    <span className="text-[14px] font-semibold text-center" style={{ color: '#991B1B' }}>
                      {note.problem}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Problems List */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: '#FEF2F2', border: '2px solid #FCA5A5' }}>
        <h3 className="text-[24px] font-bold mb-4" style={{ color: '#991B1B' }}>
          Michelle's Daily Struggles:
        </h3>
        <div className="space-y-3">
          {[
            'Constantly locked out of accounts',
            'Worried about being hacked',
            'Wastes 20+ minutes resetting passwords',
            'Afraid to shop online',
            'Can\'t access important health portals'
          ].map((problem, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-[24px]">❌</span>
              <p className="text-[18px] flex-1" style={{ color: '#7F1D1D' }}>
                {problem}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emotional Impact */}
      <div className="mb-8 text-center">
        <p className="text-[22px] italic leading-relaxed mb-4" style={{ color: '#6B7280' }}>
          "I just want to feel safe online, but the current system isn't working for me."
        </p>
        <p className="text-[18px] font-semibold" style={{ color: '#265073' }}>
          - Michelle, before her transformation
        </p>
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
        See How We Helped Michelle →
      </Button>

      {/* Progress Hint */}
      <div className="mt-6 text-center">
        <p className="text-[16px]" style={{ color: '#9CA3AF' }}>
          Swipe up or tap "Next" to continue
        </p>
      </div>
    </MobileScene>
  );
}
