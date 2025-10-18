import { Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ReadAloudButtonProps {
  text: string;
  label?: string;
}

export function ReadAloudButton({ text, label = 'Read this aloud' }: ReadAloudButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleReadAloud = () => {
    if (!speechSynthesis) return;

    if (isPlaying) {
      // Stop current speech
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Start new speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for seniors
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={handleReadAloud}
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all border-2"
      style={{ 
        background: isPlaying ? '#2D9596' : '#FFFFFF',
        color: isPlaying ? '#FFFFFF' : '#2D9596',
        borderColor: '#2D9596',
        fontSize: '16px'
      }}
      onMouseEnter={(e) => {
        if (!isPlaying) {
          e.currentTarget.style.background = '#E5F5F5';
        }
      }}
      onMouseLeave={(e) => {
        if (!isPlaying) {
          e.currentTarget.style.background = '#FFFFFF';
        }
      }}
      title={label}
    >
      {isPlaying ? (
        <VolumeX className="max-[480px]:w-4 max-[480px]:h-4 w-5 h-5" />
      ) : (
        <Volume2 className="max-[480px]:w-4 max-[480px]:h-4 w-5 h-5" />
      )}
      <span className="max-[480px]:text-[14px]">{isPlaying ? 'Stop' : '🗣️ Read aloud'}</span>
    </button>
  );
}
