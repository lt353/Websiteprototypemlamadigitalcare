import {
  Clock,
  Lightbulb,
  Handshake,
  Linkedin,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "figma:asset/9771c12755f26891ac4f768648eb003cd82290a0.png";
import aboutImage from "figma:asset/1c8c820b33322afaea68b04678dbf9e64f3560a0.png";
import teaPhoto from "figma:asset/a3a775ac2cba4ffbcef1af39c03d1f6c6518a426.png";
import lindsayPhoto from "figma:asset/c29be2a600d2a05de3e76d5ec96b4f1df330190d.png";
import djPhoto from "figma:asset/eb8fc67c6f617bf12947ae3460accb5957f8d84b.png";
import { Logo } from "./Logo";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, #B8E6E3 0%, #FFFFFF 100%)",
        }}
      >
        {/* Decorative Elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "#2D9596" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "#265073" }}
        ></div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col items-center text-center max-w-[900px] mx-auto">
            {/* Eyebrow/Tag */}
            <div
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
              style={{
                borderColor: "#2D9596",
                background: "rgba(45, 149, 150, 0.1)",
              }}
            >
              <span
                className="text-[14px] font-semibold tracking-wide uppercase"
                style={{ color: "#2D9596" }}
              >
                Our Story
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="mb-6 text-[40px] md:text-[48px]"
              style={{
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#265073",
              }}
            >
              About Mālama Digital Care
            </h1>

            {/* Subheading */}
            <p
              className="text-[20px] md:text-[24px] max-w-[700px]"
              style={{
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#4A5568",
              }}
            >
              Built by Hawaii residents who understand our
              kūpuna
            </p>

            {/* Decorative Divider */}
            <div
              className="mt-8 w-24 h-1 rounded-full"
              style={{ background: "#2D9596" }}
            ></div>
          </div>
        </div>
      </section>

      {/* How The Journey Started */}
<section className="bg-white py-20 md:py-20">
  <div className="max-w-[1280px] mx-auto px-6 md:px-16">
    {/* Centered Title */}
    <div className="text-center mb-12">
      <h2 className="text-[32px] md:text-[40px]" style={{ fontWeight: 700, lineHeight: 1.2, color: '#265073' }}>
        How The Journey Started
      </h2>
    </div>
    
    {/* Two Columns - Text and Image */}
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-8">
      {/* Text Content - Left */}
      <div className="flex-1">
        <div className="text-[16px] md:text-[18px]" style={{ lineHeight: 1.5, color: '#2D3436' }}>
          <p className="mb-4">
            Mālama Digital Care began with a simple observation: our kūpuna were struggling with technology—not because they couldn't learn, but because they weren't getting the right kind of help.
          </p>
          <p className="mb-4">We watched our own family members and friends:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Get locked out of email repeatedly</li>
            <li>Fall for sophisticated scams despite warnings</li>
            <li>Feel embarrassed asking the same questions</li>
            <li>Grow frustrated with impatient helpers</li>
          </ul>
        </div>
      </div>
      {/* Image - Right */}
      <div className="flex-1 w-full lg:flex-[1.2]">
        <img
          src={heroImage}
          alt="Seniors learning technology in group workshop"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
    
    {/* Bottom Section - Full Width Text */}
    <div className="text-[16px] md:text-[18px]" style={{ lineHeight: 1.5, color: '#2D3436' }}>
      <p className="mb-4">
        Before we launched, we reached out and talked with seniors and caregivers across the islands. Their feedback changed everything.
      </p>
      <p className="mb-4">
        What we learned: Seniors don't want quick fixes—they want to understand. They want to feel capable, not dependent. They value relationships over transactions.
      </p>
      <p>
        That insight shaped our entire approach: patient teaching, ongoing support, and building real confidence that lasts.
      </p>
    </div>
  </div>
</section>


      {/* Our Mission & Values */}
      <section className="bg-white py-20 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2
              className="text-[#2D3748] mb-6 text-[32px] md:text-[40px]"
              style={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              Our Mission & Values
            </h2>
            <p
              className="text-[#2D3748] max-w-[768px] mx-auto text-[16px] md:text-[18px]"
              style={{ lineHeight: 1.5 }}
            >
              We believe in patient, continuous learning that
              builds true digital confidence. Our method goes
              beyond quick fixes.
            </p>
          </div>

          {/* Three Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Patience */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Clock
                  className="w-9 h-9 text-[#2D3748]"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3
                  className="text-[#2D3748] mb-4 text-[20px] md:text-[24px]"
                  style={{ fontWeight: 700, lineHeight: 1.4 }}
                >
                  Patience
                </h3>
                <p
                  className="text-[#2D3748] text-[16px]"
                  style={{ lineHeight: 1.5 }}
                >
                  We move at your speed. Ask the same question
                  five times? That's fine. We'll answer it six.
                  No judgment, no rushing, ever.
                </p>
              </div>
            </div>

            {/* Empowerment */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Lightbulb
                  className="w-9 h-9 text-[#2D3748]"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3
                  className="text-[#2D3748] mb-4 text-[20px] md:text-[24px]"
                  style={{ fontWeight: 700, lineHeight: 1.4 }}
                >
                  Empowerment
                </h3>
                <p
                  className="text-[#2D3748] text-[16px]"
                  style={{ lineHeight: 1.5 }}
                >
                  We teach you how to solve problems yourself.
                  Our goal is your independence, not your
                  dependence on us.
                </p>
              </div>
            </div>

            {/* Trust & Safety */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Handshake
                  className="w-9 h-9 text-[#2D3748]"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3
                  className="text-[#2D3748] mb-4 text-[20px] md:text-[24px]"
                  style={{ fontWeight: 700, lineHeight: 1.4 }}
                >
                  Trust & Safety
                </h3>
                <p
                  className="text-[#2D3748] text-[16px]"
                  style={{ lineHeight: 1.5 }}
                >
                  Your safety is our top priority. We'll never
                  rush you, judge you, or make you feel
                  inadequate. You're in good hands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="bg-white py-20 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2
              className="text-[32px] md:text-[40px]"
              style={{
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#265073",
              }}
            >
              Meet The Team
            </h2>
          </div>

          {/* Team Cards - ALIGNED HEIGHTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {/* Tea Araki */}
            <div className="flex flex-col items-center text-center">
              <div
                className="w-40 h-40 rounded-full mb-6 overflow-hidden flex-shrink-0"
                style={{ background: "#B8E6E3" }}
              >
                <img
                  src={teaPhoto}
                  alt="Tea Araki"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                className="text-[#2D3748] mb-2 text-[20px]"
                style={{ fontWeight: 600, lineHeight: 1.5 }}
              >
                Tea Araki
              </h3>
              <p
                className="text-[#2D3748] mb-4 text-[18px]"
                style={{ lineHeight: 1.5 }}
              >
                Founder
              </p>
              <div
                className="text-[#2D3748] mb-4 flex-grow text-[14px]"
                style={{ lineHeight: 1.5 }}
              >
                <p className="mb-2">Our Original IT Wizard</p>
                <p className="mb-2">
                  Former: Tech Coordinator at Kahakai Elementary
                  School
                </p>
                <p className="italic opacity-80 text-[12px]">
                  "I people with technology every day. I know
                  how to explain tech without jargon and without
                  making anyone feel rushed or inadequate."
                </p>
              </div>
              <a
                href="#"
                className="text-[#2D3748] hover:text-[#2D9596] transition-colors mt-auto"
              >
                <Linkedin className="w-6 h-6" strokeWidth={2} />
              </a>
            </div>

            {/* Lindsay Trenton */}
            <div className="flex flex-col items-center text-center">
              <div
                className="w-40 h-40 rounded-full mb-6 overflow-hidden flex-shrink-0"
                style={{ background: "#B8E6E3" }}
              >
                <img
                  src={lindsayPhoto}
                  alt="Lindsay Trenton"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                className="text-[#2D3748] mb-2 text-[20px]"
                style={{ fontWeight: 600, lineHeight: 1.5 }}
              >
                Lindsay Trenton
              </h3>
              <p
                className="text-[#2D3748] mb-4 text-[18px]"
                style={{ lineHeight: 1.5 }}
              >
                Founder
              </p>
              <div
                className="text-[#2D3748] mb-4 flex-grow text-[14px]"
                style={{ lineHeight: 1.5 }}
              >
                <p className="mb-2">Our Training Guru</p>
                <p className="mb-2">
                  Former: GM for a large hostel group in Hungary
                </p>
                <br />
                <p className="italic opacity-80 text-[12px]">
                  "Working with a diverse team taught me how to
                  take my time and teach every member in the way
                  that works best for them"
                </p>
              </div>
              <a
                href="#"
                className="text-[#2D3748] hover:text-[#2D9596] transition-colors mt-auto"
              >
                <Linkedin className="w-6 h-6" strokeWidth={2} />
              </a>
            </div>

            {/* DJ Sable */}
            <div className="flex flex-col items-center text-center">
              <div
                className="w-40 h-40 rounded-full mb-6 overflow-hidden flex-shrink-0"
                style={{ background: "#B8E6E3" }}
              >
                <img
                  src={djPhoto}
                  alt="DJ Sable"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                className="text-[#2D3748] mb-2 text-[20px]"
                style={{ fontWeight: 600, lineHeight: 1.5 }}
              >
                DJ Sable
              </h3>
              <p
                className="text-[#2D3748] mb-4 text-[18px]"
                style={{ lineHeight: 1.5 }}
              >
                Founder
              </p>
              <div
                className="text-[#2D3748] mb-4 flex-grow text-[14px]"
                style={{ lineHeight: 1.5 }}
              >
                <p className="mb-2">Our Business Tycoon</p>
                <p className="mb-2">
                  Former: Entrepreneur and Investor
                </p>
                <br />
                <p className="italic opacity-80 text-[12px]">
                  "Running a business means understanding what
                  customers really need, not just what think
                  they need. I listen first, then solve."
                </p>
              </div>
              <a
                href="#"
                className="text-[#2D3748] hover:text-[#2D9596] transition-colors mt-auto"
              >
                <Linkedin className="w-6 h-6" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Growing our 'Ohana */}
          <div className="max-w-[966px] mx-auto text-center">
            <h2
              className="text-[#2D3748] mb-6 text-[32px] md:text-[40px]"
              style={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              Growing our 'Ohana
            </h2>
            <div
              className="text-[#2D3748] mb-6 text-[16px]"
              style={{ fontWeight: 500, lineHeight: 1.5 }}
            >
              <p className="mb-4">
                We're building a team of patient, tech-savvy
                guides who share our passion for helping kūpuna
                thrive in the digital world.
              </p>
              <p className="mb-4">
                We're looking for people who understand that
                teaching technology isn't about speed, it's
                about building trust and confidence.
              </p>
              <p className="mb-4">
                Whether you're a tech professional looking for
                more meaningful work, a recent graduate
                passionate about serving your community, or
                someone who simply has the patience and heart to
                help kūpuna feel empowered, we'd love to hear
                from you.
              </p>
              <p>
                We are currently based on Oahu, so we are
                primarily looking to expand our team here. That
                siad, as we expand across Hawaii's islands, we
                will be looking to expand our team on the outer
                islands as well.
              </p>
            </div>
            <button
              onClick={() => onNavigate("careers")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#257D7E';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(45, 149, 150, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2D9596';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              className="text-white transition-all active:scale-95"
              style={{
                fontSize: "18px",
                padding: "14px 32px",
                fontWeight: 600,
                borderRadius: "8px",
                background: "#2D9596",
              }}
            >
              View Open Positions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}