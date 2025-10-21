import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

type UserType = 'kupuna' | 'caregiver' | 'organization';

interface LoginPageProps {
  onLogin: (userType: UserType) => void;
  onNavigateToRegister: () => void;
  onNavigate?: (page: string) => void;
}

export function LoginPage({ onLogin, onNavigateToRegister, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState<UserType>('kupuna');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Accept any email/password and pass user type
    onLogin(userType);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT COLUMN - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logoWithTagline}
              alt="Mālama Digital Care"
              className="w-64 h-auto"
            />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl md:text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
              Welcome Back
            </h1>
            <p className="text-[18px]" style={{ color: '#4B5563' }}>
              Sign in to continue your digital confidence journey
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 text-[18px]"
                  placeholder="your.email@example.com"
                  style={{ 
                    borderColor: '#E5E7EB',
                    background: '#FFFFFF'
                  }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 pr-12 text-[18px]"
                  placeholder="Enter your password"
                  style={{ 
                    borderColor: '#E5E7EB',
                    background: '#FFFFFF'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#6B7280' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* User Type Selection */}
            <div className="space-y-3">
              <Label className="text-[18px] font-semibold" style={{ color: '#265073' }}>
                I am logging in as:
              </Label>
              
              <div className="space-y-4">
                {/* Kupuna Option */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="kupuna"
                      checked={userType === 'kupuna'}
                      onChange={(e) => setUserType(e.target.value as UserType)}
                      className="w-5 h-5 cursor-pointer"
                      style={{ 
                        accentColor: '#2D9596',
                        transform: 'scale(1.2)'
                      }}
                    />
                  </div>
                  <span className="text-[18px] group-hover:text-[#2D9596] transition-colors" style={{ color: '#2D3748' }}>
                    Kūpuna (Senior)
                  </span>
                </label>

                {/* Caregiver Option */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="caregiver"
                      checked={userType === 'caregiver'}
                      onChange={(e) => setUserType(e.target.value as UserType)}
                      className="w-5 h-5 cursor-pointer"
                      style={{ 
                        accentColor: '#2D9596',
                        transform: 'scale(1.2)'
                      }}
                    />
                  </div>
                  <span className="text-[18px] group-hover:text-[#2D9596] transition-colors" style={{ color: '#2D3748' }}>
                    Family Member/Caregiver
                  </span>
                </label>

                {/* Organization Option */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="organization"
                      checked={userType === 'organization'}
                      onChange={(e) => setUserType(e.target.value as UserType)}
                      className="w-5 h-5 cursor-pointer"
                      style={{ 
                        accentColor: '#2D9596',
                        transform: 'scale(1.2)'
                      }}
                    />
                  </div>
                  <span className="text-[18px] group-hover:text-[#2D9596] transition-colors" style={{ color: '#2D3748' }}>
                    Organization/Facility
                  </span>
                </label>
              </div>

              {/* Demo Note */}
              <p className="text-[14px] italic" style={{ color: '#6B7280' }}>
                Demo: Select your account type to see the appropriate dashboard
              </p>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="w-5 h-5"
                />
                <Label htmlFor="remember" className="text-[16px] cursor-pointer" style={{ color: '#4B5563' }}>
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-[16px] hover:underline"
                style={{ color: '#2D9596' }}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-14 text-[18px] font-semibold"
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              Login
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: '#D1D5DB' }}></div>
              </div>
              <div className="relative flex justify-center text-[18px]">
                <span className="px-4 bg-white" style={{ color: '#4B5563' }}>or</span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center text-[18px]" style={{ color: '#4B5563' }}>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="font-semibold hover:underline"
                style={{ color: '#2D9596' }}
              >
                Register here
              </button>
            </p>

            {/* Return to Home */}
            {onNavigate && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="w-full text-center text-[18px] hover:underline"
                  style={{ color: '#6B7280' }}
                >
                  ← Return to Home
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN - Trust Indicators */}
      <div 
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
        style={{ 
          background: '#4DB8A8'
        }}
      >
        <div className="max-w-lg space-y-8">
          {/* Hero Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full flex items-center justify-center text-6xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
              📱
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[32px] font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Your digital confidence journey continues...
            </h2>
            <p className="text-[20px]" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Patient support, ongoing learning, and peace of mind.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-6 mt-12">
            {/* Card 1 */}
            <div className="rounded-xl p-8 shadow-lg" style={{ background: '#FFFFFF' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#E6F7F4' }}>
                    <Check className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Start with a free consultation
                  </h3>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>
                    Talk with us before committing to anything
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl p-8 shadow-lg" style={{ background: '#FFFFFF' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#E6F7F4' }}>
                    <Check className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Cancel anytime - No contracts
                  </h3>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>
                    Complete flexibility, no long-term commitment
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl p-8 shadow-lg" style={{ background: '#FFFFFF' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#E6F7F4' }}>
                    <Check className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Patient, judgment-free support
                  </h3>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>
                    Learn at your own pace, never rushed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Note */}
          <div className="rounded-lg p-4 mt-8" style={{ background: '#E6F4FF', border: '2px solid #3B82F6' }}>
            <p className="text-[16px] text-center" style={{ color: '#1E40AF' }}>
              🎨 <strong>Demo Mode:</strong> Any email/password combination will work. Select your account type to explore different dashboards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
