import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

interface TeacherLoginPageProps {
  onLogin: () => void;
}

export function TeacherLoginPage({ onLogin }: TeacherLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Accept any email/password for teacher login
    onLogin();
  };

  const handleDemoFill = () => {
    setEmail('lindsay@malamadigitalcare.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F9FAFB' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logoWithTagline}
            alt="Mālama Digital Care"
            className="w-64 h-auto"
          />
        </div>

        {/* Login Card */}
        <div
          className="rounded-xl p-8 border-2 shadow-lg"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-block px-4 py-2 rounded-full mb-4"
              style={{
                background: '#FED7AA',
                color: '#E67E50'
              }}
            >
              <span className="text-[14px] font-semibold">🍎 Teacher Portal</span>
            </div>
            <h1 className="text-[32px] font-bold mb-2" style={{ color: '#265073' }}>
              Welcome Back, Team!
            </h1>
            <p className="text-[16px]" style={{ color: '#6B7280' }}>
              Sign in to access your teacher dashboard
            </p>
          </div>

          {/* Demo Quick Fill */}
          <div className="mb-6 p-4 rounded-lg border-2" style={{ background: '#FEF3C7', borderColor: '#E67E50' }}>
            <p className="text-[14px] font-semibold mb-3 text-center" style={{ color: '#92400E' }}>
              Demo Login
            </p>
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full px-4 py-3 rounded-lg border-2 transition-all active:scale-95 hover:shadow-md"
              style={{
                background: '#FFFFFF',
                borderColor: '#E67E50',
                color: '#E67E50',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Fill Demo Credentials
            </button>
            <p className="text-[12px] text-center mt-2" style={{ color: '#92400E' }}>
              Click to auto-fill and try the demo
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[16px]">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 text-[16px]"
                  placeholder="your.email@malamadigitalcare.com"
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
              <Label htmlFor="password" className="text-[16px]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 pr-12 text-[16px]"
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-[14px] hover:underline"
                style={{ color: '#E67E50' }}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-14 text-[18px] font-semibold"
              style={{ background: '#E67E50', color: '#FFFFFF' }}
            >
              Sign In to Teacher Portal
            </Button>
          </form>

          {/* Security Note */}
          <div
            className="mt-6 rounded-lg p-4"
            style={{ background: '#E6F7F4', border: '1px solid #2D9596' }}
          >
            <p className="text-[13px]" style={{ color: '#265073' }}>
              🔒 <strong>Employee Access Only:</strong> This portal is for Mālama Digital Care teaching staff only. If you're a student or caregiver, please use the main login portal.
            </p>
          </div>

          {/* Demo Note */}
          <div className="mt-4 rounded-lg p-3" style={{ background: '#E6F4FF', border: '1px solid #3B82F6' }}>
            <p className="text-[12px] text-center" style={{ color: '#1E40AF' }}>
              🎨 <strong>Demo Mode:</strong> Any email/password will work for this demonstration.
            </p>
          </div>
        </div>

        {/* Team Info */}
        <div className="mt-6 text-center">
          <p className="text-[14px]" style={{ color: '#6B7280' }}>
            Lindsay, Tea & DJ - Digital Care Guides
          </p>
        </div>
      </div>
    </div>
  );
}
