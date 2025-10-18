import { Calendar, MapPin, DollarSign, Users, Clock, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

interface WorkshopsPageProps {
  onNavigate: (page: string) => void;
}

export function WorkshopsPage({ onNavigate }: WorkshopsPageProps) {
  const handleRegister = () => {
    onNavigate('register');
  };

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
      {/* Hero Section */}
      <section className="py-20 px-6" style={{
          background:
            "linear-gradient(135deg, #F1FADA 0%, #FFFFFF 100%)",
        }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[48px] font-bold mb-6" style={{ color: '#265073' }}>
            Workshops & Classes
          </h1>
          <p className="text-[24px]" style={{ color: '#6B7280' }}>
            Learn with others in a comfortable, supportive environment. Free scam prevention workshops and affordable skill-building classes on Oahu.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[20px] leading-relaxed" style={{ color: '#2D3436' }}>
            Whether you're concerned about staying safe online or looking to learn a specific skill, our group sessions offer a welcoming space to build confidence alongside other kūpuna. We keep groups small, move at a comfortable pace, and create an atmosphere where questions are encouraged.
          </p>
        </div>
      </section>

      {/* Two Types of Sessions */}
      <section className="py-16 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* FREE Workshops */}
            <div className="rounded-2xl p-8 border-2" style={{ background: '#D1FAE5', borderColor: '#16A34A' }}>
              <h2 className="text-[32px] font-bold mb-6" style={{ color: '#16A34A' }}>
                FREE Workshops
              </h2>
              <p className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
                Scam Prevention & Safety
              </p>
              <ul className="space-y-3 text-[18px]" style={{ color: '#2D3436' }}>
                <li className="flex items-start gap-2">
                  <span>🌺</span>
                  <span>Completely free to attend</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span>Libraries and senior centers on Oahu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⏱️</span>
                  <span>90 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>👥</span>
                  <span>8-15 participants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📅</span>
                  <span>Open to everyone in the community</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>💡</span>
                  <span>Focus: Staying safe from scams and fraud</span>
                </li>
              </ul>
            </div>

            {/* PAID Classes */}
            <div className="rounded-2xl p-8 border-2" style={{ background: '#FEF3C7', borderColor: '#F59E0B' }}>
              <h2 className="text-[32px] font-bold mb-6" style={{ color: '#F59E0B' }}>
                PAID Classes
              </h2>
              <p className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
                Skill Building ($15-$25)
              </p>
              <ul className="space-y-3 text-[18px]" style={{ color: '#2D3436' }}>
                <li className="flex items-start gap-2">
                  <span>💳</span>
                  <span>$15-$25 per person depending on length</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span>Community centers and libraries on Oahu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⏱️</span>
                  <span>45 minutes to 1.5 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>👥</span>
                  <span>Smaller groups (6-10 people)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📚</span>
                  <span>Take-home materials included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>💡</span>
                  <span>Focus: Building specific technology skills</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sample FREE Workshops */}
      <section className="py-16 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[36px] font-bold mb-8" style={{ color: '#265073' }}>
            Upcoming FREE Workshops
          </h2>
          <p className="text-[20px] mb-8" style={{ color: '#6B7280' }}>
            Scam Prevention & Safety - No Registration Required
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Workshop Cards */}
            {[
              {
                title: 'Spotting Scams & Staying Safe',
                date: 'Saturday, December 7, 2025',
                time: '10:00 AM - 11:30 AM',
                location: 'Kailua Library, 239 Kuulei Rd, Kailua',
                spots: '12 spots available',
                description: 'Learn to identify phone, email, and text scams targeting seniors.'
              },
              {
                title: 'Recognizing Email & Text Scams',
                date: 'Tuesday, December 10, 2025',
                time: '2:00 PM - 3:30 PM',
                location: 'Hawaii State Library, 478 S King St, Honolulu',
                spots: '15 spots available',
                description: 'Focus specifically on phishing emails and text message scams.'
              },
              {
                title: 'Phone Scam Tactics & Protection',
                date: 'Thursday, December 12, 2025',
                time: '10:00 AM - 11:30 AM',
                location: 'Pearl City Library, 1138 Waimano Home Rd',
                spots: '10 spots available',
                description: 'Learn about IRS impersonation, Medicare fraud, and grandparent scams.'
              },
              {
                title: 'Social Media Safety & Scams',
                date: 'Saturday, December 14, 2025',
                time: '1:00 PM - 2:30 PM',
                location: 'Kaimuki Library, 1041 Koko Head Ave',
                spots: '12 spots available',
                description: 'Facebook marketplace scams, fake friend requests, and romance scams.'
              }
            ].map((workshop, idx) => (
              <div key={idx} className="rounded-xl border-2 p-6" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[24px] font-bold flex-1" style={{ color: '#265073' }}>
                    {workshop.title}
                  </h3>
                  <span className="px-3 py-1 rounded text-[14px] font-bold ml-2" style={{ background: '#16A34A', color: '#FFFFFF' }}>
                    FREE
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <Users className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{workshop.spots}</span>
                  </div>
                </div>
                <p className="text-[16px] mb-4" style={{ color: '#6B7280' }}>
                  {workshop.description}
                </p>
                <Button
                  onClick={handleRegister}
                  className="w-full h-12 hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: '#16A34A', color: '#FFFFFF' }}
                >
                  Register for Free
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample PAID Classes */}
      <section className="py-16 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[36px] font-bold mb-8" style={{ color: '#265073' }}>
            Upcoming PAID Classes
          </h2>
          <p className="text-[20px] mb-8" style={{ color: '#6B7280' }}>
            Skill Building - Registration Required
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'iPhone Basics for Beginners',
                price: '$15',
                duration: '45 minutes',
                date: 'Monday, December 9, 2025',
                time: '10:00 AM - 10:45 AM',
                location: 'Kailua Library',
                spots: '8 spots remaining',
                description: 'Learn essential features: making calls, texting, photos, and settings.'
              },
              {
                title: 'Video Calling with Family',
                price: '$15',
                duration: '45 minutes',
                date: 'Wednesday, December 11, 2025',
                time: '2:00 PM - 2:45 PM',
                location: 'Manoa Library',
                spots: '6 spots remaining',
                description: 'Quick setup for FaceTime, Zoom, or WhatsApp video calls.'
              },
              {
                title: 'Password Management Made Easy',
                price: '$25',
                duration: '1.5 hours',
                date: 'Tuesday, January 14, 2026',
                time: '10:00 AM - 11:30 AM',
                location: 'Hawaii State Library',
                spots: '7 spots available',
                description: 'Set up password manager and migrate existing passwords. Includes 3 months free subscription.'
              },
              {
                title: 'Health Apps & Patient Portals',
                price: '$25',
                duration: '1.5 hours',
                date: 'Thursday, January 16, 2026',
                time: '1:00 PM - 2:30 PM',
                location: 'Waipahu Library',
                spots: '6 spots available',
                description: 'Access medical records, schedule appointments, and message your doctor.'
              }
            ].map((classItem, idx) => (
              <div key={idx} className="rounded-xl border-2 p-6 flex flex-col" style={{ borderColor: '#E5E7EB', boxShadow: '0 2px 8px rgba(38, 80, 115, 0.08)' }}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[24px] font-bold flex-1" style={{ color: '#265073' }}>
                    {classItem.title}
                  </h3>
                  <div className="ml-2 text-right">
                    <span className="block px-3 py-1 rounded text-[18px] font-bold" style={{ background: '#F59E0B', color: '#FFFFFF' }}>
                      {classItem.price}
                    </span>
                    <span className="text-[12px]" style={{ color: '#6B7280' }}>{classItem.duration}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{classItem.date}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{classItem.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[16px]" style={{ color: '#6B7280' }}>
                    <Users className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D9596' }} />
                    <span>{classItem.spots}</span>
                  </div>
                </div>
                <p className="text-[16px] mb-4 flex-grow" style={{ color: '#6B7280' }}>
                  {classItem.description}
                </p>
                <Button
                  onClick={handleRegister}
                  className="w-full h-12 hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  Register & Pay
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[36px] font-bold mb-6" style={{ color: '#265073' }}>
            Ready to Learn With Us?
          </h2>
          <p className="text-[20px] mb-8" style={{ color: '#6B7280' }}>
            Questions? Call us at (808) 555-1234 – we're happy to help you choose the right session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRegister}
              className="h-14 px-8 text-[18px] hover:opacity-90 active:scale-95 transition-all"
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (808) 555-1234
            </Button>
            <Button
              onClick={handleRegister}
              variant="outline"
              className="h-14 px-8 text-[18px] border-2 hover:!bg-[#2D9596] hover:!text-white active:scale-95 transition-all"
              style={{ borderColor: '#2D9596', color: '#2D9596' }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
