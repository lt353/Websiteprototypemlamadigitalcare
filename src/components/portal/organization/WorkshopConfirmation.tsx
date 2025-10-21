import { Printer, Calendar, Mail } from 'lucide-react';
import { Button } from '../../ui/button';
import { toast } from 'sonner@2.0.3';

interface WorkshopConfirmationProps {
  workshop: {
    title: string;
    date: string;
    time: string;
    duration?: string;
    attendance?: string;
    type?: string;
  };
  onBack: () => void;
  onEnrollResidents?: () => void;
}

export function WorkshopConfirmation({ workshop, onBack, onEnrollResidents }: WorkshopConfirmationProps) {
  const confirmationNumber = `SSL-2025-${new Date().getMonth() + 1}${new Date().getDate()}-${workshop.title.substring(0, 3).toUpperCase()}`;
  
  const handlePrint = () => {
    window.print();
    toast.success('✓ Opening print dialog...');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Workshop Confirmed: ${workshop.title}`);
    const body = encodeURIComponent(`
Workshop Booking Confirmation

Workshop: ${workshop.title}
Date: ${workshop.date}
Time: ${workshop.time}
Expected Attendance: ${workshop.attendance} residents
Confirmation Number: ${confirmationNumber}

What's Next:
1. Enroll residents for this workshop
2. Send workshop details to participants
3. Prepare community room
4. Post flyer in common areas

Contact: Mālama Digital Care
Phone: (808) 555-TECH (8324)
Email: support@malamadigital.com
    `);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen print:p-8" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Success Icon */}
        <div className="text-center mb-8 print:mb-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 print:mb-4"
            style={{ background: '#D1FAE5' }}
          >
            <Calendar className="w-12 h-12" style={{ color: '#16A34A' }} />
          </div>
          <h1 className="text-[40px] font-bold mb-4 print:text-[32px]" style={{ color: '#16A34A' }}>
            ✓ Workshop Confirmed!
          </h1>
        </div>

        {/* Print Button - Hide on print */}
        <div className="flex justify-end mb-6 print:hidden">
          <Button
            onClick={handlePrint}
            variant="outline"
            className="h-12 px-6"
            style={{ borderColor: '#2D9596', color: '#2D9596' }}
          >
            <Printer className="w-5 h-5 mr-2" />
            Print Confirmation
          </Button>
        </div>

        {/* Organization Header */}
        <div className="text-center mb-6 pb-6 border-b-2" style={{ borderColor: '#E5E7EB' }}>
          <p className="text-[24px] font-bold" style={{ color: '#265073' }}>SUNSET SENIOR LIVING</p>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>Workshop Booking Confirmation</p>
        </div>

        {/* Workshop Details */}
        <div className="bg-white rounded-xl border-2 p-8 mb-6 print:border" style={{ borderColor: '#D1D5DB' }}>
          <h2 className="text-xl md:text-[28px] font-bold mb-6" style={{ color: '#265073' }}>
            Workshop Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Workshop:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>{workshop.title}</span>
            </div>
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Date:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>{workshop.date}</span>
            </div>
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Time:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>{workshop.time} ({workshop.duration || '90 minutes'})</span>
            </div>
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Location:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>Sunset Senior Living - Community Room</span>
            </div>
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Instructor:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>Tea Araki</span>
            </div>
          </div>
        </div>

        {/* Registration Information */}
        <div className="bg-white rounded-xl border-2 p-8 mb-6 print:border" style={{ borderColor: '#D1D5DB' }}>
          <h2 className="text-xl md:text-[28px] font-bold mb-6" style={{ color: '#265073' }}>
            Registration Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Expected Attendance:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>{workshop.attendance} residents</span>
            </div>
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Maximum Capacity:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>30 residents</span>
            </div>
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Status:</span>
              <span className="text-[18px] font-bold" style={{ color: '#16A34A' }}>Confirmed ✓</span>
            </div>
            <div className="flex justify-between py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Workshop Type:</span>
              <span className="text-[18px]" style={{ color: '#4B5563' }}>
                {workshop.type === 'free' ? 'Free Community Workshop' : 'Paid Class'}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
            <div className="flex justify-between">
              <span className="text-[18px] font-bold" style={{ color: '#265073' }}>Confirmation Number:</span>
              <span className="text-[20px] font-bold" style={{ color: '#2D9596' }}>{confirmationNumber}</span>
            </div>
            <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
              Booked on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-xl border-2 p-8 mb-6 print:border" style={{ borderColor: '#D1D5DB' }}>
          <h2 className="text-xl md:text-[28px] font-bold mb-4" style={{ color: '#265073' }}>
            What Happens Next
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-[#16A34A] text-[20px]">✓</span>
              <span className="text-[16px]" style={{ color: '#4B5563' }}>Instructor confirmed and notified</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#16A34A] text-[20px]">✓</span>
              <span className="text-[16px]" style={{ color: '#4B5563' }}>Workshop added to your dashboard</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#16A34A] text-[20px]">✓</span>
              <span className="text-[16px]" style={{ color: '#4B5563' }}>Ready to enroll residents</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#16A34A] text-[20px]">✓</span>
              <span className="text-[16px]" style={{ color: '#4B5563' }}>Materials will arrive 48 hours before workshop</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-[20px] font-bold mb-3" style={{ color: '#265073' }}>Next Steps:</h3>
            <ol className="space-y-2">
              <li className="text-[16px] flex gap-2" style={{ color: '#4B5563' }}>
                <span className="font-bold">1.</span>
                Enroll residents for this workshop
              </li>
              <li className="text-[16px] flex gap-2" style={{ color: '#4B5563' }}>
                <span className="font-bold">2.</span>
                Send workshop details to participants
              </li>
              <li className="text-[16px] flex gap-2" style={{ color: '#4B5563' }}>
                <span className="font-bold">3.</span>
                Prepare community room
              </li>
              <li className="text-[16px] flex gap-2" style={{ color: '#4B5563' }}>
                <span className="font-bold">4.</span>
                Post flyer in common areas
              </li>
            </ol>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-xl border-2 p-6 mb-8 print:border print:border-gray-300" style={{ borderColor: '#DBEAFE' }}>
          <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
            Contact Information
          </h3>
          <div className="space-y-2">
            <p className="text-[16px]" style={{ color: '#4B5563' }}>
              <strong>Mālama Digital Care Partnership Team</strong>
            </p>
            <p className="text-[16px]" style={{ color: '#4B5563' }}>
              Phone: <a href="tel:8085558324" className="font-bold" style={{ color: '#2D9596' }}>(808) 555-TECH (8324)</a>
            </p>
            <p className="text-[16px]" style={{ color: '#4B5563' }}>
              Email: <a href="mailto:support@malamadigital.com" className="font-bold" style={{ color: '#2D9596' }}>support@malamadigital.com</a>
            </p>
            <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
              Hours: Monday-Friday, 9am-5pm HST
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 print:hidden">
          <Button
            onClick={handleEmail}
            variant="outline"
            className="flex-1 h-16 text-[18px]"
            style={{ borderColor: '#2D9596', color: '#2D9596' }}
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Confirmation
          </Button>
          {onEnrollResidents && (
            <Button
              onClick={onEnrollResidents}
              className="flex-1 h-16 text-[18px]"
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              Enroll Residents Now
            </Button>
          )}
          <Button
            onClick={onBack}
            className="flex-1 h-16 text-[18px]"
            style={{ background: '#265073', color: '#FFFFFF' }}
          >
            Return to Dashboard
          </Button>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block mt-12 pt-6 border-t text-center" style={{ borderColor: '#E5E7EB' }}>
          <p className="text-[14px] mb-2" style={{ color: '#4B5563' }}>
            Mālama Digital Care - Technology Support for Hawaii's Kūpuna
          </p>
          <p className="text-[14px]" style={{ color: '#4B5563' }}>
            (808) 555-TECH (8324) • support@malamadigital.com
          </p>
          <p className="text-[12px] mt-4" style={{ color: '#9CA3AF' }}>
            Printed on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </p>
        </div>
      </div>
    </div>
  );
}
