import React from 'react';
import { Building2, Heart, Users, Phone, CheckCircle } from 'lucide-react';

interface PartnersPageProps {
  onNavigate?: (page: string) => void;
}

export function PartnersPage({ onNavigate }: PartnersPageProps) {
  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      alert('Contact us at: info@malamadigitalcare.com or (808) 555-1234');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
      {/* Hero Section */}
      <section className="py-20 px-6" style={{
          background:
            "linear-gradient(135deg, #B8E6E3 0%, #FFFFFF 100%)",
        }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[48px] font-bold mb-6" style={{ color: '#265073' }}>
            Building Partnerships Across Hawaii
          </h1>
          <p className="text-[24px]" style={{ color: '#6B7280' }}>
            Currently serving Hawaii's kūpuna through collaborative digital literacy programs
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[36px] font-bold mb-12 text-center" style={{ color: '#265073' }}>
            Partner With Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Premium Senior Living Partners */}
            <div className="rounded-xl border-2 p-8 text-center" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#DBEAFE' }}>
                <Building2 className="w-8 h-8" style={{ color: '#2D9596' }} />
              </div>
              <h3 className="text-[24px] font-bold mb-4" style={{ color: '#265073' }}>
                Premium Senior Living Partners
              </h3>
              <p className="text-[18px] mb-4" style={{ color: '#6B7280' }}>
                Enhance resident programming with expert-led digital literacy instruction. We offer free scam prevention workshops and paid group classes.
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>Professional instruction & materials</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>Flexible scheduling</span>
                </div>
              </div>
            </div>

            {/* Community Venues */}
            <div className="rounded-xl border-2 p-8 text-center" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#FEE2E2' }}>
                <Heart className="w-8 h-8" style={{ color: '#E67E50' }} />
              </div>
              <h3 className="text-[24px] font-bold mb-4" style={{ color: '#265073' }}>
                Community Venues
              </h3>
              <br />
              <p className="text-[18px] mb-4" style={{ color: '#6B7280' }}>
                Bring essential digital skills training to your patrons. Host free scam prevention workshops and paid specialized classes.
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#E67E50' }} />
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>We handle setup & materials</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#E67E50' }} />
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>Free workshops available</span>
                </div>
              </div>
            </div>

            {/* Advocacy Organizations */}
            <div className="rounded-xl border-2 p-8 text-center" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#D1FAE5' }}>
                <Users className="w-8 h-8" style={{ color: '#16A34A' }} />
              </div>
              <h3 className="text-[24px] font-bold mb-4" style={{ color: '#265073' }}>
                Advocacy & Support Organizations
              </h3>
              <p className="text-[18px] mb-4" style={{ color: '#6B7280' }}>
                Partner with us to expand digital equity and empower kūpuna across Oahu. Protect seniors from scams while connecting them to the digital world.
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>Mission alignment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
                  <span className="text-[16px]" style={{ color: '#6B7280' }}>Community impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-16 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[36px] font-bold mb-8 text-center" style={{ color: '#265073' }}>
            Our Partners
          </h2>
          <p className="text-[20px] text-center mb-12 max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
            Working with Oahu's leading senior-focused organizations
          </p>

          <div className="space-y-12">
            {/* Senior Living Communities */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#DBEAFE' }}>
                  <Building2 className="w-6 h-6" style={{ color: '#2D9596' }} />
                </div>
                <h3 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                  Senior Living Communities
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: '\'Ilima at Leihano', url: 'https://www.kiscoseniorliving.com/senior-living/hi/kapolei/ilima-at-leihano/' },
                  { name: 'Kahala Nui', url: 'https://www.kahalanui.com/' },
                  { name: 'One Kalakaua Senior Living', url: 'https://www.onekalakaua.com/' },
                  { name: 'The Plaza at Punchbowl', url: 'https://www.theplazaassistedliving.com/location/punchbowl/' },
                  { name: 'The Ivy at Hawaii Kai', url: 'https://ivyliving.com/theivyhawaiikai/' }
                ].map((partner, idx) => (
                  <a
                    key={idx}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border-2 p-5 text-center flex items-center justify-center min-h-[100px] transition-all duration-200"
                    style={{ 
                      borderColor: '#E5E7EB', 
                      background: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2D9596';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 149, 150, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <p className="text-[18px] font-semibold group-hover:underline" style={{ color: '#265073' }}>
                        {partner.name}
                      </p>
                      <p className="text-[14px] mt-1" style={{ color: '#9CA3AF' }}>
                        Visit website →
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Libraries & Community Centers */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#FEE2E2' }}>
                  <Heart className="w-6 h-6" style={{ color: '#E67E50' }} />
                </div>
                <h3 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                  Libraries & Community Centers
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Hawaii State Public Library System', url: 'https://www.librarieshawaii.org/' },
                  { name: 'Oahu Senior Centers', url: 'https://elderlyaffairs.com/' },
                  { name: 'Community Centers on Oahu', url: 'https://www.honolulu.gov/dpr/' }
                ].map((partner, idx) => (
                  <a
                    key={idx}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border-2 p-5 text-center flex items-center justify-center min-h-[100px] transition-all duration-200"
                    style={{ 
                      borderColor: '#E5E7EB', 
                      background: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#E67E50';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(230, 126, 80, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <p className="text-[18px] font-semibold group-hover:underline" style={{ color: '#265073' }}>
                        {partner.name}
                      </p>
                      <p className="text-[14px] mt-1" style={{ color: '#9CA3AF' }}>
                        Visit website →
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Organizations & Advocacy */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#D1FAE5' }}>
                  <Users className="w-6 h-6" style={{ color: '#16A34A' }} />
                </div>
                <h3 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                  Organizations & Advocacy Groups
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'AARP Hawaii', url: 'https://states.aarp.org/hawaii/' },
                  { name: 'Kokua Council', url: 'https://kokuacouncil.blogspot.com/' },
                  { name: 'Oahu Veterans Center', url: 'https://www.theovc.org/' }
                ].map((partner, idx) => (
                  <a
                    key={idx}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border-2 p-5 text-center flex items-center justify-center min-h-[100px] transition-all duration-200"
                    style={{ 
                      borderColor: '#E5E7EB', 
                      background: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#16A34A';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <p className="text-[18px] font-semibold group-hover:underline" style={{ color: '#265073' }}>
                        {partner.name}
                      </p>
                      <p className="text-[14px] mt-1" style={{ color: '#9CA3AF' }}>
                        Visit website →
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[36px] font-bold mb-12 text-center" style={{ color: '#265073' }}>
            Why Partner with Mālama Digital Care?
          </h2>

          <div className="space-y-8">
            {/* For Senior Living Communities */}
            <div className="rounded-xl border-2 p-8" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8" style={{ color: '#2D9596' }} />
                <h3 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                  For Senior Living Communities
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2D9596' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Enhance Resident Amenities</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Professional digital literacy programs add value to your community</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2D9596' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Flexible Scheduling</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>We work around your calendar and resident needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2D9596' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>All Materials Provided</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>We bring learning materials and expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2D9596' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Dual Revenue Model</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Free scam workshops and paid specialized classes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Libraries & Community Centers */}
            <div className="rounded-xl border-2 p-8" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8" style={{ color: '#E67E50' }} />
                <h3 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                  For Libraries & Community Centers
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#E67E50' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Free Community Workshops</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Scam prevention workshops at no cost to your facility</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#E67E50' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Turnkey Setup</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>We handle all materials, setup, and instruction</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#E67E50' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Serve Your Kūpuna</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Critical digital safety skills for your community</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#E67E50' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Flexible Options</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Optional paid classes on advanced topics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Organizations */}
            <div className="rounded-xl border-2 p-8" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8" style={{ color: '#16A34A' }} />
                <h3 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                  For Organizations
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#16A34A' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Mission Alignment</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Support digital equity for Hawaii's kūpuna</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#16A34A' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Expanded Reach</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Help us serve more seniors across Oahu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#16A34A' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Collaborative Programs</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Joint events and community initiatives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#16A34A' }} />
                  <div>
                    <p className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>Community Impact</p>
                    <p className="text-[16px]" style={{ color: '#6B7280' }}>Strengthen connections and reduce elder fraud</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6" style={{ background: '#B8E6E3' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[36px] font-bold mb-6" style={{ color: '#265073' }}>
            Interested in Partnering?
          </h2>
          <p className="text-[20px] mb-8" style={{ color: '#6B7280' }}>
            Let's work together to empower Hawaii's kūpuna with digital confidence—from protecting against scams to connecting with loved ones
          </p>
          <button
            onClick={handleNavigate}
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
            className="h-14 px-8 text-[18px] rounded-lg font-medium transition-all inline-flex items-center gap-2"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <Phone className="w-5 h-5" />
            Contact Us About Partnership
          </button>
        </div>
      </section>
    </div>
  );
}

export default PartnersPage;