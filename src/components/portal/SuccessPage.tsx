import { CheckCircle, Printer, ArrowRight, Calendar, Mail, Phone, Download, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface SuccessPageProps {
  type: 'booking' | 'reschedule' | 'cancel' | 'subscription' | 'payment';
  title: string;
  message: string;
  details?: Array<{ label: string; value: string }>;
  onContinue: () => void;
  onPrint?: () => void;
}

export function SuccessPage({ type, title, message, details, onContinue, onPrint }: SuccessPageProps) {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleDownloadCalendar = () => {
    // Create ICS file for calendar import
    const event = {
      title: title,
      description: message,
      start: new Date(), // Would use actual date from details
      end: new Date(Date.now() + 90 * 60000), // 90 min later
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Malama Digital Care//Booking//EN
BEGIN:VEVENT
UID:${Date.now()}@malamadigital.care
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${title}
DESCRIPTION:${message}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'malama-appointment.ics';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('✓ Calendar event downloaded!');
  };

  const handleEmailConfirmation = () => {
    const detailsText = details?.map(d => `${d.label}: ${d.value}`).join('%0D%0A') || '';
    const emailSubject = encodeURIComponent(title);
    const emailBody = encodeURIComponent(`${message}\n\nDetails:\n${detailsText.replace(/%0D%0A/g, '\n')}`);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  const handleTextConfirmation = () => {
    const detailsText = details?.map(d => `${d.label}: ${d.value}`).join('\n') || '';
    const smsBody = encodeURIComponent(`${title}\n\n${message}\n\n${detailsText}`);
    window.location.href = `sms:?body=${smsBody}`;
    toast.info('Text message app opening...');
  };

  const getIcon = () => {
    switch (type) {
      case 'booking':
      case 'reschedule':
        return <Calendar className="w-16 h-16" style={{ color: '#16A34A' }} />;
      default:
        return <CheckCircle className="w-16 h-16" style={{ color: '#16A34A' }} />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 print:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500"
            style={{ background: '#D1FAE5' }}
          >
            {getIcon()}
          </div>
          <h1 className="text-[40px] font-bold mb-4" style={{ color: '#16A34A' }}>
            {title}
          </h1>
          <p className="text-[22px]" style={{ color: '#4B5563' }}>
            {message}
          </p>
        </div>

        {/* Details Card */}
        {details && details.length > 0 && (
          <div className="bg-white rounded-xl border-2 p-8 mb-8" style={{ borderColor: '#D1D5DB' }}>
            <h2 className="text-[28px] font-bold mb-6" style={{ color: '#265073' }}>
              Confirmation Details
            </h2>
            <div className="space-y-4">
              {details.map((detail, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between py-3 border-b last:border-b-0" style={{ borderColor: '#E5E7EB' }}>
                  <span className="text-[18px] font-bold mb-1 md:mb-0" style={{ color: '#265073' }}>
                    {detail.label}:
                  </span>
                  <span className="text-[18px]" style={{ color: '#4B5563' }}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-blue-50 rounded-xl border-2 p-6 mb-8 print:border print:border-gray-300" style={{ borderColor: '#DBEAFE' }}>
          <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
            Need to Make Changes?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[16px]" style={{ color: '#4B5563' }}>
              <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#2D9596' }} />
              <span>Call us: <a href="tel:8085551234" className="font-bold" style={{ color: '#2D9596' }}>(808) 555-1234</a></span>
            </div>
            <div className="flex items-center gap-3 text-[16px]" style={{ color: '#4B5563' }}>
              <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#2D9596' }} />
              <span>Email: <a href="mailto:kokua@malamadigital.care" className="font-bold" style={{ color: '#2D9596' }}>kokua@malamadigital.care</a></span>
            </div>
          </div>
        </div>

        {/* Quick Actions - Seniors Love Physical Records */}
        {(type === 'booking' || type === 'reschedule') && (
          <div className="mb-8">
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              Save This Confirmation
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={handleDownloadCalendar}
                variant="outline"
                className="h-14 text-[16px] border-2"
                style={{ borderColor: '#2D9596', color: '#2D9596' }}
              >
                <Download className="w-5 h-5 mr-2" />
                Add to Calendar
              </Button>
              <Button
                onClick={handleEmailConfirmation}
                variant="outline"
                className="h-14 text-[16px] border-2"
                style={{ borderColor: '#2D9596', color: '#2D9596' }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email to Myself
              </Button>
              <Button
                onClick={handleTextConfirmation}
                variant="outline"
                className="h-14 text-[16px] border-2"
                style={{ borderColor: '#2D9596', color: '#2D9596' }}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Text to Family
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="h-14 text-[16px] border-2"
                style={{ borderColor: '#2D9596', color: '#2D9596' }}
              >
                <Printer className="w-5 h-5 mr-2" />
                Print Page
              </Button>
            </div>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 print:hidden">
          {(type === 'cancel' || type === 'subscription' || type === 'payment') && (
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1 h-16 text-[18px] font-bold border-2"
              style={{ borderColor: '#265073', color: '#265073' }}
            >
              <Printer className="w-6 h-6 mr-2" />
              Print This Page
            </Button>
          )}
          <Button
            onClick={onContinue}
            className="flex-1 h-16 text-[18px] font-bold"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            Back to Dashboard
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>

        {/* Print-only footer */}
        <div className="hidden print:block mt-12 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
          <div className="text-center">
            <p className="text-[14px] mb-2" style={{ color: '#4B5563' }}>
              Mālama Digital Care - Technology Support for Hawaii's Kūpuna
            </p>
            <p className="text-[14px]" style={{ color: '#4B5563' }}>
              (808) 555-1234 • kokua@malamadigital.care
            </p>
            <p className="text-[12px] mt-4" style={{ color: '#9CA3AF' }}>
              Printed on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
