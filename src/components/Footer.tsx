import { Phone, Mail, MapPin } from 'lucide-react';
import logoWithTagline from 'figma:asset/140c39ed7110ccde8247af09ff726bd0e36766fb.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigate = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D3748] text-white py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Mission */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src={logoWithTagline}
                alt="Mālama Digital Care - Helping Kūpuna thrive in the digital age"
                className="w-full max-w-[280px] h-auto"
              />
            </div>
            <p className="text-white/80 mb-6" style={{ fontSize: '16px', lineHeight: 1.6 }}>
              Patient, judgment-free technology support for Hawaii's kūpuna. We believe everyone deserves to feel confident in the digital world.
            </p>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-5 h-5" />
              <span style={{ fontSize: '14px' }}>Proudly serving Oahu</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6" style={{ fontSize: '18px', fontWeight: 700, color: '#B8E6E3' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigate('home')}
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('about')}
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('services')}
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('contact')}
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('workshops')}
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  Workshops & Classes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('partners')}
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('careers')}
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6" style={{ fontSize: '18px', fontWeight: 700, color: '#B8E6E3' }}>
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+18085551234"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontSize: '16px' }}
                  >
                    (808) 555-1234
                  </a>
                  <p className="text-white/60" style={{ fontSize: '14px' }}>
                    Mon-Fri 9am-5pm HST
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:kokua@malamadigital.care"
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontSize: '16px' }}
                >
                  kokua@malamadigital.care
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60" style={{ fontSize: '14px' }}>
            © 2025 Mālama Digital Care. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-white/60 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
              Privacy Policy
            </button>
            <button className="text-white/60 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
