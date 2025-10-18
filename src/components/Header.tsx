import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className="sticky top-0 z-[1000] border-b border-[#E2E8F0]"
      style={{ height: '90px', background: '#FAFAFA' }}
    >
      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between" style={{ padding: '0 24px' }}>
        {/* LEFT SECTION - Logo (30%) */}
        <div className="flex items-center" style={{ width: '30%' }}>
          <button onClick={() => handleNavigate('home')} className="flex items-center">
            <Logo variant="nav" />
          </button>
        </div>

        {/* CENTER SECTION - Navigation Links (50%) - Desktop Only */}
        <nav className="hidden lg:flex items-center justify-center gap-10" style={{ width: '50%' }}>
          <button
            onClick={() => handleNavigate('home')}
            className={`transition-colors ${
              currentPage === 'home' 
                ? 'text-[#4DB8A8] border-b-[3px] border-[#4DB8A8]' 
                : 'text-[#2D3748] hover:text-[#4DB8A8]'
            }`}
            style={{ fontSize: '17px', fontWeight: 600, paddingBottom: '4px' }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate('services')}
            className={`transition-colors ${
              currentPage === 'services' 
                ? 'text-[#4DB8A8] border-b-[3px] border-[#4DB8A8]' 
                : 'text-[#2D3748] hover:text-[#4DB8A8]'
            }`}
            style={{ fontSize: '17px', fontWeight: 600, paddingBottom: '4px' }}
          >
            Services
          </button>
          <button
            onClick={() => handleNavigate('about')}
            className={`transition-colors ${
              currentPage === 'about' 
                ? 'text-[#4DB8A8] border-b-[3px] border-[#4DB8A8]' 
                : 'text-[#2D3748] hover:text-[#4DB8A8]'
            }`}
            style={{ fontSize: '17px', fontWeight: 600, paddingBottom: '4px' }}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavigate('contact')}
            className={`transition-colors ${
              currentPage === 'contact' 
                ? 'text-[#4DB8A8] border-b-[3px] border-[#4DB8A8]' 
                : 'text-[#2D3748] hover:text-[#4DB8A8]'
            }`}
            style={{ fontSize: '17px', fontWeight: 600, paddingBottom: '4px' }}
          >
            Contact
          </button>
          
          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
              className="flex items-center gap-1 text-[#2D3748] hover:text-[#4DB8A8] transition-colors"
              style={{ fontSize: '17px', fontWeight: 600 }}
            >
              More
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isMoreDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsMoreDropdownOpen(false)}
                />
                <div 
                  className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg z-20"
                  style={{ minWidth: '200px' }}
                >
                  <button
                    onClick={() => handleNavigate('workshops')}
                    className="w-full text-left px-6 py-4 text-[#2D3748] hover:bg-[#4DB8A8]/10 transition-colors rounded-t-lg"
                    style={{ fontSize: '16px' }}
                  >
                    Workshops & Classes
                  </button>
                  <button
                    onClick={() => handleNavigate('partners')}
                    className="w-full text-left px-6 py-4 text-[#2D3748] hover:bg-[#4DB8A8]/10 transition-colors"
                    style={{ fontSize: '16px' }}
                  >
                    Partners
                  </button>
                  <button
                    onClick={() => handleNavigate('careers')}
                    className="w-full text-left px-6 py-4 text-[#2D3748] hover:bg-[#4DB8A8]/10 transition-colors rounded-b-lg"
                    style={{ fontSize: '16px' }}
                  >
                    Careers
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* RIGHT SECTION - Auth Buttons (20%) - Desktop Only */}
        <div className="hidden lg:flex items-center justify-end gap-4" style={{ width: '20%' }}>
          <button
            onClick={() => handleNavigate('login')}
            className="hover:underline"
            style={{ fontSize: '18px', fontWeight: 700, color: '#2D9596' }}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate('register')}
            className="text-white transition-all rounded-md"
            style={{ 
              fontSize: '16px',
              fontWeight: 400,
              padding: '10px 16px',
              background: '#2D9596'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1F6B6C';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(45, 149, 150, 0.7), 0 4px 8px rgba(45, 149, 150, 0.4)';
              e.currentTarget.style.filter = 'brightness(1.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2D9596';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            Register
          </button>
        </div>

        {/* MOBILE - Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex items-center justify-center"
          style={{ width: '40px', height: '40px' }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* MOBILE - Full Screen Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto" style={{ top: '90px' }}>
          <nav className="flex flex-col p-6">
            <button
              onClick={() => handleNavigate('home')}
              className="text-left py-6 text-[#2D3748] hover:bg-[#F5F1E8] transition-colors"
              style={{ fontSize: '24px' }}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('services')}
              className="text-left py-6 text-[#2D3748] hover:bg-[#F5F1E8] transition-colors"
              style={{ fontSize: '24px' }}
            >
              Services
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="text-left py-6 text-[#2D3748] hover:bg-[#F5F1E8] transition-colors"
              style={{ fontSize: '24px' }}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className="text-left py-6 text-[#2D3748] hover:bg-[#F5F1E8] transition-colors"
              style={{ fontSize: '24px' }}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigate('workshops')}
              className="text-left py-6 text-[#2D3748] hover:bg-[#F5F1E8] transition-colors"
              style={{ fontSize: '24px' }}
            >
              Workshops & Classes
            </button>
            <button
              onClick={() => handleNavigate('partners')}
              className="text-left py-6 text-[#2D3748] hover:bg-[#F5F1E8] transition-colors"
              style={{ fontSize: '24px' }}
            >
              Partners
            </button>
            <button
              onClick={() => handleNavigate('careers')}
              className="text-left py-6 text-[#2D3748] hover:bg-[#F5F1E8] transition-colors"
              style={{ fontSize: '24px' }}
            >
              Careers
            </button>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => handleNavigate('login')}
                className="w-full border-2 hover:text-white transition-colors rounded-md"
                style={{ 
                  fontSize: '18px',
                  fontWeight: 400,
                  padding: '12px 24px',
                  borderColor: '#2D9596',
                  color: '#2D9596'
                }}
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate('register')}
                className="w-full text-white transition-all rounded-md"
                style={{ 
                  fontSize: '18px',
                  fontWeight: 400,
                  padding: '12px 24px',
                  background: '#2D9596'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1F6B6C';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(45, 149, 150, 0.7), 0 4px 8px rgba(45, 149, 150, 0.4)';
                  e.currentTarget.style.filter = 'brightness(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2D9596';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                Register
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
