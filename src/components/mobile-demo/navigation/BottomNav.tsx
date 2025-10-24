import { Home, ChevronLeft, ChevronRight } from 'lucide-react';

interface BottomNavProps {
  currentScene: number;
  totalScenes: number;
  onPrevious: () => void;
  onNext: () => void;
  onHome: () => void;
}

export function BottomNav({
  currentScene,
  totalScenes,
  onPrevious,
  onNext,
  onHome
}: BottomNavProps) {
  const sceneNames = [
    'Challenge',
    'Classroom',
    'Steps',
    'Results',
    'Support'
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t z-40"
      style={{
        background: '#FFFFFF',
        borderColor: '#E5E7EB',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="max-w-[600px] mx-auto px-4 py-3">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {[...Array(totalScenes)].map((_, index) => (
            <div
              key={index}
              className="transition-all"
              style={{
                width: currentScene === index ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentScene === index ? '#2D9596' : '#D1D5DB'
              }}
            />
          ))}
        </div>

        {/* Scene Name */}
        <div className="text-center mb-3">
          <p className="text-[14px] font-semibold" style={{ color: '#6B7280' }}>
            {sceneNames[currentScene]} ({currentScene + 1}/{totalScenes})
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {/* Back Button */}
          <button
            onClick={onPrevious}
            disabled={currentScene === 0}
            className="h-[50px] rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100"
            style={{
              background: currentScene === 0 ? '#F3F4F6' : '#FFFFFF',
              border: '2px solid #E5E7EB',
              color: '#265073'
            }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-[16px] font-semibold">Back</span>
          </button>

          {/* Home Button */}
          <button
            onClick={onHome}
            className="h-[50px] rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: '#F9FAFB',
              border: '2px solid #2D9596',
              color: '#2D9596'
            }}
          >
            <Home className="w-5 h-5" />
            <span className="text-[16px] font-semibold">Home</span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentScene === totalScenes - 1}
            className="h-[50px] rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100"
            style={{
              background: currentScene === totalScenes - 1 ? '#F3F4F6' : '#2D9596',
              border: '2px solid #2D9596',
              color: currentScene === totalScenes - 1 ? '#9CA3AF' : '#FFFFFF'
            }}
          >
            <span className="text-[16px] font-semibold">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Swipe Hint */}
        <div className="mt-3 text-center">
          <p className="text-[12px]" style={{ color: '#9CA3AF' }}>
            Swipe up/down to navigate • Tap elements to interact
          </p>
        </div>
      </div>

      {/* Safe area spacing for mobile devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
