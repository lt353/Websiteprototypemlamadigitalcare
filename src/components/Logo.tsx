import logoWithTagline from "figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png";
import logoNoTagline from "figma:asset/b3896b1c25bf716df167396f2f85a96f4bc48a2a.png";

interface LogoProps {
  variant?: 'nav' | 'hero';
  className?: string;
}

export function Logo({ variant = 'nav', className }: LogoProps) {
  if (variant === 'hero') {
    // Hero version: Full logo WITH tagline
    return (
      <div className={className || ''}>
        <img 
          alt="Mālama Digital Care - Helping Kūpuna thrive in the digital age" 
          className="w-full h-auto object-contain" 
          src={logoWithTagline}
        />
      </div>
    );
  }

  // Nav version: Logo WITHOUT tagline
  return (
    <div className={`w-[180px] h-[50px] ${className || ''}`}>
      <img 
        alt="Mālama Digital Care" 
        className="w-full h-full object-contain" 
        src={logoNoTagline} 
      />
    </div>
  );
}
