import { Lock, Shield, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import heroImage from "figma:asset/6de2924a14c31eb5583f694400f4938d3e9eb820.png";
import logoWithTagline from "figma:asset/140c39ed7110ccde8247af09ff726bd0e36766fb.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-white">
      {/* HERO SECTION - Two Column Split */}
      <section className="bg-white min-h-[600px] flex flex-col md:flex-row items-stretch">
        {/* LEFT COLUMN - Content */}
        <div className="w-full md:w-1/2 flex items-center bg-white px-8 py-12 md:px-16 lg:pl-20">
          <div className="w-full max-w-[540px]">
            {/* Logo with tagline */}
            <div className="mb-8">
              <img
                src={logoWithTagline}
                alt="Mālama Digital Care - Helping Kūpuna thrive in the digital age"
                className="w-full max-w-[500px] h-auto"
              />
            </div>

            {/* Headline */}
            <h1
              className="mb-8 text-[40px] md:text-[48px]"
              style={{
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#265073",
              }}
            >
              Patient, in-person tech support that builds
              lasting confidence
            </h1>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate("register")}
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
                className="text-white transition-all flex-shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  height: "56px",
                  width: "100%",
                  maxWidth: "200px",
                  padding: "0 24px",
                  borderRadius: "8px",
                  background: "#2D9596",
                  outlineColor: "#2D9596",
                }}
              >
                Get Started
              </button>
              <button
                onClick={() => onNavigate("contact")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F0FDFA';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                className="border-2 transition-all flex-shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  height: "56px",
                  width: "100%",
                  maxWidth: "220px",
                  padding: "0 24px",
                  borderRadius: "8px",
                  color: "#265073",
                  borderColor: "#265073",
                  whiteSpace: "nowrap",
                  background: "#FFFFFF",
                  outlineColor: "#265073",
                }}
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Image */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative overflow-hidden">
          <img
            src={heroImage}
            alt="Caregiver helping senior with tablet"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ objectPosition: "center center" }}
          />
        </div>
      </section>

      {/* Stats Section - "The Digital Divide in Hawaii" */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="flex flex-col gap-16">
            {/* Section Title */}
            <div className="max-w-[768px]">
              <div className="flex flex-col gap-6">
                <h2
                  className="text-[32px] md:text-[40px]"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "#265073",
                  }}
                >
                  The Digital Divide in Hawaii
                </h2>
                <p
                  className="text-[16px] md:text-[18px]"
                  style={{
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: "#6B7280",
                  }}
                >
                  Technology access isn't the problem—confidence
                  is
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="bg-white flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Stat 1 */}
              <div className="flex-1 border-l-4 border-[#2D9596] pl-6">
                <div className="flex flex-col gap-2">
                  <p
                    className="text-[56px] md:text-[72px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: "#2D9596",
                    }}
                  >
                    90%
                  </p>
                  <p
                    className="text-[18px] md:text-[20px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "#265073",
                    }}
                  >
                    Of seniors are online daily
                  </p>
                  <p
                    className="text-[14px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: "#6B7280",
                    }}
                  >
                    Pew Research 2022
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex-1 border-l-4 border-[#DC2626] pl-6">
                <div className="flex flex-col gap-2">
                  <p
                    className="text-[56px] md:text-[72px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: "#DC2626",
                    }}
                  >
                    26%
                  </p>
                  <p
                    className="text-[18px] md:text-[20px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "#265073",
                    }}
                  >
                    Feel confident using devices
                  </p>
                  <p
                    className="text-[14px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: "#6B7280",
                    }}
                  >
                    Pew Research 2024
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex-1 border-l-4 border-[#F59E0B] pl-6">
                <div className="flex flex-col gap-2">
                  <p
                    className="text-[56px] md:text-[72px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: "#F59E0B",
                    }}
                  >
                    $4.8B
                  </p>
                  <p
                    className="text-[18px] md:text-[20px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "#265073",
                    }}
                  >
                    Lost to elder fraud in 2024
                  </p>
                  <p
                    className="text-[14px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: "#6B7280",
                    }}
                  >
                    FBI Report 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - "You're Not Alone" */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="flex flex-col gap-16">
            {/* Section Title */}
            <div className="max-w-[768px]">
              <div className="flex flex-col gap-6">
                <h2
                  className="text-[32px] md:text-[40px]"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "#265073",
                  }}
                >
                  You're Not Alone
                </h2>
                <p
                  className="text-[16px] md:text-[18px]"
                  style={{
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: "#6B7280",
                  }}
                >
                  Nearly 3 out of 4 Hawaii seniors who use
                  devices don't feel confident using them safely
                </p>
              </div>
            </div>

            {/* Three Pain Point Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Column 1 - Too Many Passwords */}
              <div className="flex flex-col gap-6">
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "#9AD0C2" }}
                  >
                    <Lock
                      className="w-7 h-7"
                      strokeWidth={2}
                      style={{ color: "#265073" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-[22px] md:text-[24px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "#265073",
                    }}
                  >
                    Too Many Passwords?
                  </h3>
                  <p
                    className="text-[16px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: "#4A5568",
                    }}
                  >
                    Forgetting logins, locked out of accounts,
                    written notes everywhere that don't help
                  </p>
                </div>
              </div>

              {/* Column 2 - Worried About Scams */}
              <div className="flex flex-col gap-6">
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "#9AD0C2" }}
                  >
                    <Shield
                      className="w-7 h-7"
                      strokeWidth={2}
                      style={{ color: "#265073" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-[22px] md:text-[24px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "#265073",
                    }}
                  >
                    Worried About Scams?
                  </h3>
                  <p
                    className="text-[16px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: "#4A5568",
                    }}
                  >
                    Suspicious texts and emails that seem too
                    real to ignore or recognize
                  </p>
                </div>
              </div>

              {/* Column 3 - Tired of Rushed Help */}
              <div className="flex flex-col gap-6">
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "#9AD0C2" }}
                  >
                    <Clock
                      className="w-7 h-7"
                      strokeWidth={2}
                      style={{ color: "#265073" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-[22px] md:text-[24px]"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "#265073",
                    }}
                  >
                    Tired of Rushed Help?
                  </h3>
                  <p
                    className="text-[16px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: "#4A5568",
                    }}
                  >
                    Family means well but moves too fast and
                    doesn't always have time to explain
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-[#B8E6E3] py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-10">
              {/* Quote */}
              <div className="max-w-[900px]">
                <p
                  className="text-center text-[22px] md:text-[28px]"
                  style={{
                    fontWeight: 600,
                    lineHeight: 1.5,
                    color: "#265073",
                  }}
                >
                  "People born before 1960 are like tech
                  immigrants. We need patient help to guide us
                  through the language and steps, otherwise it
                  feels like we'll never belong in this digital
                  world."
                </p>
              </div>

              {/* Avatar with Name */}
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full overflow-hidden bg-gray-200 w-20 h-20 shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1660794124904-c85540c9be87?w=200"
                    alt="Michelle Blair"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p
                    className="text-[18px] mb-1"
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.5,
                      color: "#265073",
                    }}
                  >
                    Michelle Blair, 78
                  </p>
                  <p
                    className="text-[16px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: "#4A5568",
                    }}
                  >
                    Cares for her husband with Dementia while
                    navigating both of their technology
                  </p>
                  <p
                    className="text-[16px] mt-1"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.5,
                      color: "#2D9596",
                    }}
                  >
                    Kauai
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full w-3 h-3"
                  style={{ background: "#2D9596" }}
                ></div>
                <div className="rounded-full bg-gray-300 w-3 h-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="flex flex-col gap-16">
            {/* Section Title */}
            <div className="max-w-[768px] mx-auto text-center">
              <h2
                className="text-[32px] md:text-[40px] mb-4"
                style={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#265073",
                }}
              >
                What Makes Us Different
              </h2>
              <p
                className="text-[16px] md:text-[18px]"
                style={{
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#6B7280",
                }}
              >
                We don't just fix problems—we build lasting
                confidence
              </p>
            </div>

            {/* Three Cards - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 - Personalized sessions */}
              <div className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-10 border border-gray-100 h-full">
                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-full mb-6 w-16 h-16 flex-shrink-0"
                  style={{ background: "#2D9596" }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>

                {/* Title */}
                <h3
                  className="mb-4 text-[22px] md:text-[24px] flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#265073",
                  }}
                >
                  Personalized sessions
                </h3>

                {/* Description - grows to fill space */}
                <p
                  className="text-[16px] flex-grow"
                  style={{
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: "#4A5568",
                  }}
                >
                  One-on-one or small groups. In-home or online.
                  Your choice. We move at your pace, answer
                  every question, and never make you feel
                  rushed.
                </p>

                {/* Link - pushed to bottom */}
                <button
                  onClick={() => {
                    onNavigate("services");
                    setTimeout(() => {
                      document
                        .getElementById("choose-how-you-learn")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }, 100);
                  }}
                  className="flex items-center gap-2 hover:gap-3 transition-all text-[16px] mt-6 flex-shrink-0"
                  style={{ fontWeight: 600, color: "#2D9596" }}
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Card 2 - Ongoing learning */}
              <div className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-10 border border-gray-100 h-full">
                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-full mb-6 w-16 h-16 flex-shrink-0"
                  style={{ background: "#2D9596" }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>

                {/* Title */}
                <h3
                  className="mb-4 text-[22px] md:text-[24px] flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#265073",
                  }}
                >
                  Ongoing learning
                </h3>

                {/* Description - grows to fill space */}
                <p
                  className="text-[16px] flex-grow"
                  style={{
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: "#4A5568",
                  }}
                >
                  Monthly subscription support that builds
                  confidence over time, not just quick fixes.
                  Build deep understanding with custom guides
                  after each session.
                </p>

                <button
                  onClick={() => {
                    onNavigate("services");
                    setTimeout(() => {
                      document
                        .getElementById("pricing-plans")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }, 100);
                  }}
                  className="flex items-center gap-2 hover:gap-3 transition-all text-[16px] mt-6 flex-shrink-0"
                  style={{ fontWeight: 600, color: "#2D9596" }}
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Card 3 - Community workshops */}
              <div className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-10 border border-gray-100 h-full">
                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-full mb-6 w-16 h-16 flex-shrink-0"
                  style={{ background: "#2D9596" }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                {/* Title */}
                <h3
                  className="mb-4 text-[22px] md:text-[24px] flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#265073",
                  }}
                >
                  Community workshops
                </h3>

                {/* Description - grows to fill space */}
                <p
                  className="text-[16px] flex-grow"
                  style={{
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: "#4A5568",
                  }}
                >
                  Free safety seminars and affordable group
                  classes at libraries and community centers.
                  Learn together, meet others with similar
                  challenges.
                </p>

                {/* Link - pushed to bottom */}
                <button
                  onClick={() => onNavigate("workshops")}
                  className="flex items-center gap-2 hover:gap-3 transition-all text-[16px] mt-6 flex-shrink-0"
                  style={{ fontWeight: 600, color: "#2D9596" }}
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started is Easy Section */}
      <section className="bg-[#B8E6E3] py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="flex flex-col gap-16">
            {/* Section Title */}
            <div className="text-center">
              <h2
                className="text-[32px] md:text-[40px] mb-4"
                style={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#265073",
                }}
              >
                Getting Started is Easy
              </h2>
              <p
                className="text-[16px] md:text-[18px]"
                style={{
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#6B7280",
                }}
              >
                Our approach is simple, patient, and designed to
                build confidence step by step
              </p>
            </div>

            {/* Four Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Step 1 */}
              <div className="flex flex-col text-center items-center h-full">
                <div
                  className="text-[64px] mb-4 flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#2D9596",
                  }}
                >
                  1
                </div>
                <h3
                  className="mb-3 text-[20px] md:text-[22px] flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#265073",
                  }}
                >
                  Initial consultation
                </h3>
                <p
                  className="text-[16px] flex-grow"
                  style={{ lineHeight: 1.6, color: "#4A5568" }}
                >
                  We listen to your challenges and recommend the
                  best starting point
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col text-center items-center h-full">
                <div
                  className="text-[64px] mb-4 flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#2D9596",
                  }}
                >
                  2
                </div>
                <h3
                  className="mb-3 text-[20px] md:text-[22px] flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#265073",
                  }}
                >
                  Choose Your Service
                </h3>
                <p
                  className="text-[16px] flex-grow"
                  style={{ lineHeight: 1.6, color: "#4A5568" }}
                >
                  Pick the format that fits your comfort level
                  and budget
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col text-center items-center h-full">
                <div
                  className="text-[64px] mb-4 flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#2D9596",
                  }}
                >
                  3
                </div>
                <h3
                  className="mb-3 text-[20px] md:text-[22px] flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#265073",
                  }}
                >
                  Start Building Confidence
                </h3>
                <p
                  className="text-[16px] flex-grow"
                  style={{ lineHeight: 1.6, color: "#4A5568" }}
                >
                  We tackle your biggest pain points and build
                  quick wins together
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col text-center items-center h-full">
                <div
                  className="text-[64px] mb-4 flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#2D9596",
                  }}
                >
                  4
                </div>
                <h3
                  className="mb-3 text-[20px] md:text-[22px] flex-shrink-0"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#265073",
                  }}
                >
                  Keep Learning, Keep Growing
                </h3>
                <p
                  className="text-[16px] flex-grow"
                  style={{ lineHeight: 1.6, color: "#4A5568" }}
                >
                  Choose ongoing support that fits your pace
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate("services")}
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
                  lineHeight: 1.5,
                  background: "#2D9596",
                  borderRadius: "8px",
                }}
              >
                Explore plans
              </button>
              <button
                onClick={() => onNavigate("contact")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F0FDFA';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                className="border-2 transition-all flex items-center gap-2 active:scale-95"
                style={{
                  fontSize: "18px",
                  padding: "12px 32px",
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: "#265073",
                  borderColor: "#265073",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                }}
              >
                Contact us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}