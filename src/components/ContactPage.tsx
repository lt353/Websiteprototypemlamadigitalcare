import { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { toast } from "sonner@2.0.3";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "",
    island: "",
    challenges: [] as string[],
    hearAbout: "",
    message: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.error("Please accept the terms to continue");
      return;
    }
    toast.success(
      "Message sent! We'll contact you within 24 hours.",
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userType: "",
      island: "",
      challenges: [],
      hearAbout: "",
      message: "",
      acceptTerms: false,
    });
  };

  const toggleChallenge = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16"style={{
          background:
            "linear-gradient(135deg, #B8E6E3 0%, #FFFFFF 100%)",
        }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 text-center">
          <h1
            className="text-[#2D3748] mb-6 text-[40px] md:text-[56px]"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            Let's Start a Conversation
          </h1>
          <p
            className="text-[#2D3748] max-w-[768px] mx-auto text-[16px] md:text-[18px]"
            style={{ fontWeight: 400, lineHeight: 1.5 }}
          >
            Whether you're seeking help for yourself or a loved
            one, we're here to listen and find the right path
            forward—at your pace, with patience.
          </p>
        </div>
      </section>

      {/* Get in Touch + Form Section */}
      <section className="bg-white py-20 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-16">
            {/* LEFT COLUMN - Contact Info */}
            <div>
              <h2
                className="text-[#2D3748] mb-6"
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                Get in Touch
              </h2>
              <p
                className="text-[#2D3748] mb-8"
                style={{ fontSize: "16px", lineHeight: 1.5 }}
              >
                We are always easy and loving you using new
                digital confidence.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4">
                  <Phone
                    className="w-6 h-6 text-[#2D3748] flex-shrink-0 mt-1"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p
                      className="text-[#2D3748] mb-1"
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Phone
                    </p>
                    <a
                      href="tel:+18085551234"
                      className="text-[#2D3748] hover:text-[#4DB8A8] transition-colors"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.5,
                      }}
                    >
                      Phone: +1 (808) 555-1234
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <Mail
                    className="w-6 h-6 text-[#2D3748] flex-shrink-0 mt-1"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p
                      className="text-[#2D3748] mb-1"
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:hello@digitalkupuna.com"
                      className="text-[#2D3748] hover:text-[#4DB8A8] transition-colors"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.5,
                      }}
                    >
                      hello@digitalkupuna.com
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex gap-4">
                  <Clock
                    className="w-6 h-6 text-[#2D3748] flex-shrink-0 mt-1"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p
                      className="text-[#2D3748] mb-1"
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Office Hours
                    </p>
                    <p
                      className="text-[#2D3748]"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.8,
                      }}
                    >
                      Monday - Friday: 9am-5pm HST
                      <br />
                      Saturday: 10am-2pm HST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex gap-4">
                  <MapPin
                    className="w-6 h-6 text-[#2D3748] flex-shrink-0 mt-1"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p
                      className="text-[#2D3748] mb-1"
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Service area:
                    </p>
                    <p
                      className="text-[#2D3748]"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.5,
                      }}
                    >
                      We are based on Oahu and serve customers
                      across the island through in-home
                      sessions. Online sessions are available
                      for those on neighbor islands who are
                      comfortable with video calls.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prefer to Talk First */}
              <div className="mt-12 bg-[#F5F1E8] p-6 rounded-lg">
                <h3
                  className="text-[#2D3748] mb-4"
                  style={{ fontSize: "20px", fontWeight: 700 }}
                >
                  Prefer to Talk First?
                </h3>
                <p
                  className="text-[#2D3748] mb-4"
                  style={{ fontSize: "16px", lineHeight: 1.6 }}
                >
                  We completely understand many kūpuna prefer
                  speaking on the phone. Call us during our
                  business hours and we'll discuss your needs,
                  answer questions, and help you decide if we're
                  the right fit.
                </p>
                <p
                  className="text-[#2D3748]"
                  style={{ fontSize: "16px", lineHeight: 1.6 }}
                >
                  No pressure, no sales pitch. Just a friendly
                  conversation.
                </p>
              </div>

              {/* What Happens Next */}
              <div className="mt-8">
                <h3
                  className="text-[#2D3748] mb-4"
                  style={{ fontSize: "18px", fontWeight: 700 }}
                >
                  What Happens Next?
                </h3>
                <ol
                  className="space-y-3 text-[#2D3748]"
                  style={{ fontSize: "16px", lineHeight: 1.6 }}
                >
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">
                      1.
                    </span>
                    <span>
                      We'll call you within 24 hours (48 hours
                      on weekends)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">
                      2.
                    </span>
                    <span>
                      We'll discuss your specific needs and
                      concerns
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">
                      3.
                    </span>
                    <span>
                      We'll schedule an initial in-person
                      meeting to build trust (optional online
                      virtual meeting with a loved one there if
                      preferred)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">
                      4.
                    </span>
                    <span>
                      You decide how you would like to move
                      forward.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            {/* RIGHT COLUMN - Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-[#2D3748] mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    First name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full border-2 border-[#E2E8F0] rounded-lg bg-white text-[#2D3748] focus:border-[#4DB8A8] focus:outline-none focus:ring-2 focus:ring-[#4DB8A8]/20 transition-colors"
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                      minHeight: "52px",
                    }}
                    placeholder="Enter your first name"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-[#2D3748] mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Last name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full border-2 border-[#E2E8F0] rounded-lg bg-white text-[#2D3748] focus:border-[#4DB8A8] focus:outline-none focus:ring-2 focus:ring-[#4DB8A8]/20 transition-colors"
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                      minHeight: "52px",
                    }}
                    placeholder="Enter your last name"
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#2D3748] mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Email{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full border-2 border-[#E2E8F0] rounded-lg bg-white text-[#2D3748] focus:border-[#4DB8A8] focus:outline-none focus:ring-2 focus:ring-[#4DB8A8]/20 transition-colors"
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                      minHeight: "52px",
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[#2D3748] mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Phone number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full border-2 border-[#E2E8F0] rounded-lg bg-white text-[#2D3748] focus:border-[#4DB8A8] focus:outline-none focus:ring-2 focus:ring-[#4DB8A8]/20 transition-colors"
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                      minHeight: "52px",
                    }}
                    placeholder="(808) 555-1234"
                  />
                </div>
                
                <div>
                  <label
                    className="block text-[#2D3748] mb-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    I am:{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        userType: value,
                      })
                    }
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="myself"
                          id="myself"
                          className="w-6 h-6 border-2 border-[#265073] data-[state=checked]:bg-[#2D9596] data-[state=checked]:border-[#2D9596]"
                        />
                        <label
                          htmlFor="myself"
                          className="text-[#2D3748] cursor-pointer"
                          style={{ fontSize: "16px" }}
                        >
                          Looking for help for myself
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="parent"
                          id="parent"
                          className="w-6 h-6 border-2 border-[#265073] data-[state=checked]:bg-[#2D9596] data-[state=checked]:border-[#2D9596]"
                        />
                        <label
                          htmlFor="parent"
                          className="text-[#2D3748] cursor-pointer"
                          style={{ fontSize: "16px" }}
                        >
                          Looking for help for a parent/loved
                          one
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="organization"
                          id="organization"
                          className="w-6 h-6 border-2 border-[#265073] data-[state=checked]:bg-[#2D9596] data-[state=checked]:border-[#2D9596]"
                        />
                        <label
                          htmlFor="organization"
                          className="text-[#2D3748] cursor-pointer"
                          style={{ fontSize: "16px" }}
                        >
                          Representing an organization/facility
                        </label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                {/* Which Island */}
                <div>
                  <label
                    htmlFor="island"
                    className="block text-[#2D3748] mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Which Island?
                  </label>
                  <select
                    id="island"
                    value={formData.island}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        island: e.target.value,
                      })
                    }
                    className="w-full border-2 border-[#E2E8F0] rounded-lg bg-white text-[#2D3748] focus:border-[#4DB8A8] focus:outline-none focus:ring-2 focus:ring-[#4DB8A8]/20 transition-colors"
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                      minHeight: "52px",
                    }}
                  >
                    <option value="">Select one...</option>
                    <option value="oahu">Oahu</option>
                    <option value="maui">Maui</option>
                    <option value="big-island">
                      Big Island
                    </option>
                    <option value="kauai">Kauai</option>
                    <option value="molokai">Molokai</option>
                    <option value="lanai">Lanai</option>
                  </select>
                </div>
                {/* What are your main challenges */}
                <div>
                  <label
                    className="block text-[#2D3748] mb-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    What are your main challenges? (select all
                    that apply)
                  </label>
                  <div className="space-y-3">
                    {[
                      {
                        id: "passwords",
                        label: "Passwords & account management",
                      },
                      {
                        id: "cluttered",
                        label:
                          "Phone/tablet too cluttered or confusing",
                      },
                      {
                        id: "scams",
                        label:
                          "Identifying scams and staying safe",
                      },
                      {
                        id: "health",
                        label: "Setting up health apps",
                      },
                      {
                        id: "video",
                        label: "Video calls with family",
                      },
                      {
                        id: "not-sure",
                        label: "Not sure—need general guidance",
                      },
                    ].map((challenge) => (
                      <div
                        key={challenge.id}
                        className="flex items-center gap-3"
                      >
                        <Checkbox
                          id={challenge.id}
                          checked={formData.challenges.includes(
                            challenge.id,
                          )}
                          onCheckedChange={() =>
                            toggleChallenge(challenge.id)
                          }
                          className="w-6 h-6 border-2 border-[#265073]"
                        />
                        <label
                          htmlFor={challenge.id}
                          className="text-[#2D3748] cursor-pointer"
                          style={{ fontSize: "16px" }}
                        >
                          {challenge.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* How did you hear about us */}
                <div>
                  <label
                    htmlFor="hearAbout"
                    className="block text-[#2D3748] mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAbout"
                    value={formData.hearAbout}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hearAbout: e.target.value,
                      })
                    }
                    className="w-full border-2 border-[#E2E8F0] rounded-lg bg-white text-[#2D3748] focus:border-[#4DB8A8] focus:outline-none focus:ring-2 focus:ring-[#4DB8A8]/20 transition-colors"
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                      minHeight: "52px",
                    }}
                  >
                    <option value="">Select one...</option>
                    <option value="google">
                      Google search
                    </option>
                    <option value="facebook">Facebook</option>
                    <option value="generations">
                      Generations Magazine
                    </option>
                    <option value="aarp">AARP</option>
                    <option value="friend">
                      Friend or family
                    </option>
                    <option value="community">
                      Community event
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {/* Tell Us More */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#2D3748] mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Tell Us More (optional)
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    rows={5}
                    className="w-full border-2 border-[#E2E8F0] rounded-lg bg-white text-[#2D3748] focus:border-[#4DB8A8] focus:outline-none focus:ring-2 focus:ring-[#4DB8A8]/20 transition-colors resize-none"
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                    }}
                    placeholder="Any specific questions or details you'd like to share?"
                  />
                </div>
                {/* Accept Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        acceptTerms: checked as boolean,
                      })
                    }
                    className="w-6 h-6 border-2 border-[#265073] mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[#2D3748] cursor-pointer"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.6,
                    }}
                  >
                    I accept the terms{" "}
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                {/* Privacy Notice */}
                <div className="flex items-start gap-3 bg-[#F5F1E8] p-4 rounded-lg">
                  <Shield className="w-5 h-5 text-[#4DB8A8] flex-shrink-0 mt-0.5" />
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    Your privacy matters. We'll never share your
                    information.
                  </p>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#4DB8A8] text-white hover:bg-[#3DA089] transition-colors rounded-lg"
                  style={{
                    padding: "16px 24px",
                    fontSize: "18px",
                    fontWeight: 600,
                    minHeight: "56px",
                  }}
                >
                  Submit
                </button>
                <p
                  className="text-[#2D3748] text-center"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  By clicking Submit, you agree that your
                  information will be used to contact you about
                  our services
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-20 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2
              className="text-[#2D3748] text-[32px] md:text-[48px]"
              style={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              FAQs
            </h2>
          </div>

          <div className="max-w-[900px] mx-auto pb-4">
            <Accordion
              type="single"
              collapsible
              className="space-y-4"
            >
              <AccordionItem
                value="item-1"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    How much does it cost?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    Our pricing is transparent and flexible.
                    Single in-home sessions start at $85 (90
                    minutes). Virtual sessions are $35 (60
                    minutes). Monthly plans range from
                    $39-$149/month. Visit our Services page for
                    full details.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    I'm not ready to commit to monthly sessions
                    yet...
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    That's completely fine! Many clients start
                    with a single session to try us out. There's
                    no pressure to commit to a monthly plan. You
                    can book sessions as needed or upgrade to a
                    plan later if it feels right.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    Do you serve all Hawaiian islands?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    We're based on Oahu for in-home visits.
                    However, we offer virtual sessions statewide
                    for those on neighbor islands who are
                    comfortable with video calls. We're
                    expanding to other islands soon!
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    I'm not comfortable with technology and feel
                    embarrassed...
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    Please don't feel embarrassed! We work with
                    complete beginners every day. There's
                    absolutely no judgment—ever. Our entire
                    approach is built on patience, kindness, and
                    meeting you exactly where you are. Many of
                    our clients felt the same way before their
                    first session.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    Can I bring a friend or family member to the
                    session?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    Absolutely! We encourage it if it makes you
                    more comfortable. However, we focus the
                    teaching on you so that you can become
                    independent. Family members are welcome to
                    observe and learn alongside you.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    What exactly do you help with?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    We help with smartphones, tablets,
                    computers, video calls, online safety,
                    password management, scam prevention, health
                    apps, photo sharing, and much more. If it's
                    technology-related, we can help. Visit our
                    Services page for details.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-7"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    What devices do you support?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    All of them! iPhone, Android phones, iPads,
                    tablets, Mac computers, Windows PCs,
                    laptops, desktops. We work with whatever
                    devices you have.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-8"
                className="border-2 border-[#E2E8F0] rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    Can my daughter/son arrange this for me?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    Yes! Many adult children arrange and pay for
                    services for their parents. We just need you
                    (the senior) to be willing and interested in
                    learning. It's a wonderful gift that builds
                    independence.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-9"
                className="border-2 border-[#E2E8F0] rounded-lg px-6 mb-8"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span
                    className="text-left text-[#2D3748]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    Why do you meet in-person first, even for
                    online help?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-[#2D3748]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                    }}
                  >
                    Building trust is essential, especially for
                    kūpuna. An in-person meeting lets us get to
                    know each other face-to-face in your home
                    environment. After we've established that
                    trust, virtual sessions work great for
                    ongoing support. (If you're on a neighbor
                    island, we can do an initial video call with
                    a family member present if preferred.)
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}