import {
  Heart,
  Users,
  BookOpen,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";

interface CareersPageProps {
  onNavigate: (page: string) => void;
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#FFFFFF" }}
    >
      {/* Hero Section */}
      <section
        className="py-20 px-6"
        style={{
          background:
            "linear-gradient(135deg, #B8E6E3 0%, #FFFFFF 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-[48px] font-bold mb-6"
            style={{ color: "#265073" }}
          >
            Join Our 'Ohana
          </h1>
          <p
            className="text-[24px]"
            style={{ color: "#6B7280" }}
          >
            Help build digital confidence for kūpuna across
            Hawaii
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section
        className="py-16 px-6"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-[36px] font-bold mb-6 text-center"
            style={{ color: "#265073" }}
          >
            Why We Do This Work
          </h2>
          <div
            className="text-[20px] leading-relaxed space-y-4"
            style={{ color: "#2D3436" }}
          >
            <p>
              Teaching technology to seniors isn't just a
              job—it's about restoring independence, reducing
              isolation, and honoring our kūpuna. Every session
              we teach means someone can video call their
              grandchildren, avoid a scam, or access their
              healthcare independently.
            </p>
            <p>
              We're a small, mission-driven team that values
              patience over speed, relationships over
              transactions, and impact over scale.
            </p>
            <p>
              If you believe technology should be accessible to
              everyone, regardless of age, we'd love to meet
              you.
            </p>
          </div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section
        className="py-16 px-6"
        style={{ background: "#F9FAFB" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-[36px] font-bold mb-6 text-center"
            style={{ color: "#265073" }}
          >
            We're Looking for Patient, Empathetic Technology
            Instructors
          </h2>
          <p
            className="text-[20px] text-center mb-12 max-w-3xl mx-auto"
            style={{ color: "#6B7280" }}
          >
            We don&apos;t expect you to know everything about
            technology. We can teach you the technical skills.
            What we can&apos;t teach is patience, empathy, and
            genuine respect for our kūpuna.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🌺",
                title: "Patience",
                description:
                  "You understand that learning takes time, especially when someone is building confidence from scratch. You never rush, never judge, and can explain the same thing five different ways if needed.",
              },
              {
                icon: "💚",
                title: "Empathy",
                description:
                  "You genuinely care about people's challenges and frustrations. You see past the technology problem to understand the human need underneath—whether it's loneliness, fear, or a desire for independence.",
              },
              {
                icon: "🤝",
                title: "Respect for Kūpuna",
                description:
                  "You honor the wisdom and life experience of older adults. You see them as teachers in their own right, not just students. You understand Hawaiian values of mālama (care) and kuleana (responsibility).",
              },
              {
                icon: "🎓",
                title: "Love of Teaching",
                description:
                  'You get joy from those "aha!" moments when someone finally gets it. You\'re a natural explainer who can break down complex concepts into simple, digestible steps.',
              },
              {
                icon: "🏝️",
                title: "Connection to Hawaii",
                description:
                  "You understand local culture, speak the language of our community (even if not fluent in ʻŌlelo Hawaiʻi), and are committed to staying in Hawaii long-term.",
              },
              {
                icon: "🔧",
                title: "Technical Comfort (not expertise!)",
                description:
                  "You're comfortable with phones, tablets, computers, and apps. You don't need to be a programmer—you just need to know how everyday technology works and be willing to learn more.",
              },
            ].map((trait, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 p-6"
                style={{
                  borderColor: "#E5E7EB",
                  background: "#FFFFFF",
                  boxShadow:
                    "0 2px 8px rgba(38, 80, 115, 0.08)",
                }}
              >
                <div className="text-[32px] mb-3">
                  {trait.icon}
                </div>
                <h3
                  className="text-[24px] font-bold mb-3"
                  style={{ color: "#265073" }}
                >
                  {trait.title}
                </h3>
                <p
                  className="text-[18px]"
                  style={{ color: "#6B7280", lineHeight: 1.6 }}
                >
                  {trait.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Position */}
      <section
        className="py-16 px-6"
        style={{ background: "#B8E6E3" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-[36px] font-bold mb-8"
            style={{ color: "#265073" }}
          >
            We're Hiring: Digital Literacy Instructors
          </h2>

          <div
            className="rounded-xl border-2 p-8 mb-8"
            style={{
              borderColor: "#2D9596",
              background: "#FFFFFF",
            }}
          >
            <h3
              className="text-[28px] font-bold mb-4"
              style={{ color: "#265073" }}
            >
              Digital Literacy Instructor
            </h3>
            <div
              className="grid md:grid-cols-3 gap-4 mb-6 text-[18px]"
              style={{ color: "#6B7280" }}
            >
              <div>
                <strong style={{ color: "#265073" }}>
                  Location:
                </strong>{" "}
                Oahu (in-person required)
              </div>
              <div>
                <strong style={{ color: "#265073" }}>
                  Type:
                </strong>{" "}
                Full-time or Part-time
              </div>
              <div>
                <strong style={{ color: "#265073" }}>
                  Pay:
                </strong>{" "}
                $25-35/hour
              </div>
            </div>

            <div
              className="space-y-6 text-[18px]"
              style={{ color: "#2D3436", lineHeight: 1.6 }}
            >
              <div>
                <h4
                  className="font-bold mb-2"
                  style={{ color: "#265073" }}
                >
                  What you&apos;ll do:
                </h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Teach one-on-one sessions in customers&apos;
                    homes (in-home visits)
                  </li>
                  <li>
                    Lead virtual sessions via Zoom
                    screen-sharing
                  </li>
                  <li>
                    Facilitate small group workshops and classes
                    (6-15 people)
                  </li>
                  <li>
                    Create custom take-home guides for clients
                  </li>
                  <li>
                    Document session progress and client needs
                  </li>
                  <li>
                    Respond to between-session questions via
                    phone/email
                  </li>
                  <li>
                    Help customers with password management,
                    scam prevention, device organization
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  className="font-bold mb-2"
                  style={{ color: "#265073" }}
                >
                  What we&apos;re looking for:
                </h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Patient, empathetic personality (most
                    important!)
                  </li>
                  <li>
                    Comfortable teaching iPhone, Android,
                    tablets, computers
                  </li>
                  <li>
                    Reliable car for in-home visits across Oahu
                  </li>
                  <li>
                    Available during daytime hours (9am-5pm
                    weekdays, some weekend workshops)
                  </li>
                  <li>
                    Background check and TB test required (we
                    cover costs)
                  </li>
                  <li>
                    Bonus: Experience working with seniors,
                    teaching, or customer service
                  </li>
                  <li>
                    Bonus: Bilingual (English/ʻŌlelo Hawaiʻi,
                    English/Tagalog, etc.)
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  className="font-bold mb-2"
                  style={{ color: "#265073" }}
                >
                  What we offer:
                </h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Competitive hourly pay: $25-35/hour with
                    room for raises
                  </li>
                  <li>
                    Mileage reimbursement: IRS standard rate for
                    all in-home visits
                  </li>
                  <li>
                    Flexible scheduling: Choose your
                    availability
                  </li>
                  <li>
                    Health insurance stipend for full-time (30+
                    hours/week)
                  </li>
                  <li>
                    Paid time off: Vacation days, sick leave,
                    Hawaii holidays
                  </li>
                  <li>
                    Equipment provided: Company laptop, teaching
                    materials
                  </li>
                  <li>
                    Professional development: We&apos;ll pay for
                    training
                  </li>
                  <li>
                    Performance bonuses quarterly based on
                    satisfaction
                  </li>
                  <li>Meaningful work: See immediate impact</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Button
                onClick={() =>
                  (window.location.href =
                    "mailto:careers@malamadigitalcare.com?subject=Digital Literacy Instructor Application")
                }
                className="h-14 px-8 text-[18px] hover:opacity-90 active:scale-95 transition-all"
                style={{
                  background: "#2D9596",
                  color: "#FFFFFF",
                }}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Testimonials */}
      <section
        className="py-16 px-6"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-[36px] font-bold mb-12 text-center"
            style={{ color: "#265073" }}
          >
            What Our Team Says
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "\"I left a corporate IT job to do this work, and I've never been happier. Seeing an 80-year-old grandmother's face light up when she successfully video calls her grandson in California—that's worth more than any bonus I used to get.\"",
                name: "Tea Araki",
                title: "Co-Founder & Lead Instructor",
              },
              {
                quote:
                  "\"The best part is the variety. One day I'm teaching someone to use a password manager, the next I'm helping recover a Facebook account, and then I'm leading a workshop on scam prevention. It never gets boring, and you build real relationships with people.\"",
                name: "Lindsay Trenton",
                title: "Co-Founder & Instructor",
              },
              {
                quote:
                  "\"What I love most is that we're not just fixing technology problems—we're reducing isolation, restoring independence, and helping people stay connected to what matters most. That's meaningful work.\"",
                name: "DJ Sable",
                title: "Co-Founder & Instructor",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 flex flex-col"
                style={{ background: "#B8E6E3" }}
              >
                <p
                  className="text-[18px] mb-4 italic flex-grow"
                  style={{ color: "#2D3436", lineHeight: 1.6 }}
                >
                  {testimonial.quote}
                </p>
                <div className="mt-auto">
                  <p
                    className="font-bold"
                    style={{ color: "#265073" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-[16px]"
                    style={{ color: "#6B7280" }}
                  >
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section
        className="py-16 px-6"
        style={{ background: "#F9FAFB" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-[36px] font-bold mb-12 text-center"
            style={{ color: "#265073" }}
          >
            Our Hiring Process
          </h2>

          <div className="space-y-6">
            {[
              {
                number: "1",
                title: "Apply",
                description:
                  "Submit your resume and a brief cover letter (or video!) telling us why you're passionate about helping kūpuna with technology. We want to hear your story!",
              },
              {
                number: "2",
                title: "Phone Screening (30 minutes)",
                description:
                  "We'll have an informal conversation about your background, what you're looking for, and whether we might be a good fit. This is a two-way conversation—ask us anything!",
              },
              {
                number: "3",
                title: "Working Interview (2-3 hours, paid)",
                description:
                  "Shadow one of us during a real session (with customer permission), then co-teach a mock lesson where you explain a technology concept. We pay you $50 for this time because we value it.",
              },
              {
                number: "4",
                title: "Meet the Team",
                description:
                  "Casual conversation over coffee with the three founders. Get to know us, ask about the day-to-day reality of the work.",
              },
              {
                number: "5",
                title: "Decision",
                description:
                  "We'll let you know within one week. If it's a yes, we'll talk start dates, training, and get you set up. If it's a no, we'll give you honest, helpful feedback.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-[24px] font-bold"
                  style={{
                    background: "#2D9596",
                    color: "#FFFFFF",
                  }}
                >
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-[24px] font-bold mb-2"
                    style={{ color: "#265073" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[18px]"
                    style={{
                      color: "#6B7280",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-[18px] text-center mt-8 italic"
            style={{ color: "#6B7280" }}
          >
            Our timeline: We try to move quickly (2-3 weeks from
            application to offer) because we know job searching
            is stressful.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-6"
        style={{ background: "#2D9596" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-[36px] font-bold mb-6"
            style={{ color: "#FFFFFF" }}
          >
            We'd Love to Hear From You
          </h2>
          <p
            className="text-[20px] mb-4"
            style={{ color: "#B8E6E3" }}
          >
            Send us your resume and a brief note (or video!)
            telling us:
          </p>
          <ul
            className="text-[18px] mb-8 text-left max-w-2xl mx-auto space-y-2"
            style={{ color: "#B8E6E3" }}
          >
            <li>
              • Why you want to help kūpuna with technology
            </li>
            <li>• What makes you patient and empathetic</li>
            <li>• What your availability looks like</li>
            <li>• Any questions you have for us</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:careers@malamadigitalcare.com?subject=Digital Literacy Instructor Application")
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F0FDFA';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              className="h-14 px-8 text-[18px] transition-all inline-flex items-center justify-center gap-2 rounded-md font-medium border-2 active:scale-95"
              style={{
                background: "#FFFFFF",
                color: "#2D9596",
                borderColor: "#2D9596",
                cursor: "pointer",
              }}
            >
              <Mail className="w-5 h-5" />
              Email Your Application
            </button>
            <button
              onClick={() =>
                (window.location.href = "tel:8085551234")
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1E4A5F';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(38, 80, 115, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#265073';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              className="h-14 px-8 text-[18px] transition-all inline-flex items-center justify-center gap-2 rounded-md font-medium active:scale-95"
              style={{
                background: "#265073",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Phone className="w-5 h-5" />
              Call (808) 555-1234
            </button>
          </div>
          <p
            className="text-[16px] mt-6"
            style={{ color: "#B8E6E3" }}
          >
            We review applications on a rolling basis and
            respond to everyone who applies (usually within 3-5
            business days).
          </p>
        </div>
      </section>

      {/* Mahalo Section */}
      <section
        className="py-16 px-6"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3
            className="text-[28px] font-bold mb-4"
            style={{ color: "#265073" }}
          >
            Mahalo for Your Interest
          </h3>
          <p
            className="text-[20px]"
            style={{ color: "#6B7280", lineHeight: 1.6 }}
          >
            Teaching kūpuna isn&apos;t always easy, but
            it&apos;s always meaningful. If you have the heart
            for this work, we want to meet you.
          </p>
        </div>
      </section>
    </div>
  );
}