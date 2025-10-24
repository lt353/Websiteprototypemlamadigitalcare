import { useState } from 'react';
import { ChallengeScene } from './scenes/ChallengeScene';
import { ClassroomScene } from './scenes/ClassroomScene';
import { StepsCarousel } from './scenes/StepsCarousel';
import { ResultsScene } from './scenes/ResultsScene';
import { SupportScene } from './scenes/SupportScene';
import { BottomNav } from './navigation/BottomNav';

interface MobileDemoState {
  currentScene: number;
  interactionsCompleted: Set<string>;
  preferences: {
    autoAdvance: boolean;
    hapticFeedback: boolean;
    reducedMotion: boolean;
  };
}

export function MobileDemoRouter() {
  const [state, setState] = useState<MobileDemoState>({
    currentScene: 0,
    interactionsCompleted: new Set(),
    preferences: {
      autoAdvance: false,
      hapticFeedback: true,
      reducedMotion: false
    }
  });

  const totalScenes = 5;

  const nextScene = () => {
    if (state.currentScene < totalScenes - 1) {
      setState(prev => ({ ...prev, currentScene: prev.currentScene + 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousScene = () => {
    if (state.currentScene > 0) {
      setState(prev => ({ ...prev, currentScene: prev.currentScene - 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToScene = (sceneIndex: number) => {
    if (sceneIndex >= 0 && sceneIndex < totalScenes) {
      setState(prev => ({ ...prev, currentScene: sceneIndex }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markInteractionComplete = (interactionId: string) => {
    setState(prev => ({
      ...prev,
      interactionsCompleted: new Set([...prev.interactionsCompleted, interactionId])
    }));
  };

  const scenes = [
    <ChallengeScene
      key="challenge"
      onNext={nextScene}
      onInteraction={markInteractionComplete}
    />,
    <ClassroomScene
      key="classroom"
      onNext={nextScene}
      onInteraction={markInteractionComplete}
    />,
    <StepsCarousel
      key="steps"
      onNext={nextScene}
      onInteraction={markInteractionComplete}
    />,
    <ResultsScene
      key="results"
      onNext={nextScene}
      onInteraction={markInteractionComplete}
    />,
    <SupportScene
      key="support"
      onNext={nextScene}
      onInteraction={markInteractionComplete}
    />
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      {/* Scene Container */}
      <div className="pb-20">
        {scenes[state.currentScene]}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        currentScene={state.currentScene}
        totalScenes={totalScenes}
        onPrevious={previousScene}
        onNext={nextScene}
        onHome={() => goToScene(0)}
      />
    </div>
  );
}
