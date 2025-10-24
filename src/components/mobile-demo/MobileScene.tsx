import { ReactNode } from 'react';

interface MobileSceneProps {
  children: ReactNode;
  className?: string;
}

export function MobileScene({ children, className = '' }: MobileSceneProps) {
  return (
    <div
      className={`min-h-screen w-full max-w-[600px] mx-auto px-4 py-8 ${className}`}
      style={{
        // Mobile-optimized container
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      {children}
    </div>
  );
}
