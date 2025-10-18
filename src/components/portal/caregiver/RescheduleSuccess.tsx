import { CheckCircle2, Calendar, Mail, MessageSquare, Printer } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';

interface RescheduleSuccessProps {
  seniorName: string;
  newDate: string;
  newTime: string;
  instructor: string;
  onBackToDashboard: () => void;
}

export function RescheduleSuccess({ 
  seniorName, 
  newDate, 
  newTime, 
  instructor,
  onBackToDashboard 
}: RescheduleSuccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F9FAFB' }}>
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ background: '#D1FAE5' }}>
            <CheckCircle2 className="w-12 h-12" style={{ color: '#16A34A' }} />
          </div>
          <h1 className="text-[36px] font-bold mb-4" style={{ color: '#265073' }}>
            Session Rescheduled!
          </h1>
          <p className="text-[20px]" style={{ color: '#6B7280' }}>
            {seniorName}&apos;s session has been moved to:
          </p>
        </div>

        <Card className="mb-8" style={{ borderColor: '#2D9596', borderWidth: '2px' }}>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>New Date & Time</p>
                <p className="text-[28px] font-bold" style={{ color: '#2D9596' }}>
                  {newDate} at {newTime}
                </p>
              </div>
              <div>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>Instructor</p>
                <p className="text-[20px] font-semibold" style={{ color: '#265073' }}>
                  {instructor}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              We&apos;ve sent confirmation to:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                <span className="text-[16px]">{seniorName} at mary.johnson@email.com</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                <span className="text-[16px]">You at sarah.miller@email.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8" style={{ background: '#E6F7F4' }}>
          <CardContent className="p-6">
            <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
              What&apos;s Next:
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span style={{ color: '#2D9596' }}>•</span>
                <span className="text-[16px]">Add to your calendar</span>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#2D9596' }}>•</span>
                <span className="text-[16px]">We&apos;ll send a reminder 24 hours before</span>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#2D9596' }}>•</span>
                <span className="text-[16px]">Text {seniorName} to let her know</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Button variant="outline" className="h-14">
            <Calendar className="w-5 h-5 mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="h-14">
            <MessageSquare className="w-5 h-5 mr-2" />
            Text {seniorName}
          </Button>
          <Button variant="outline" className="h-14">
            <Printer className="w-5 h-5 mr-2" />
            Print
          </Button>
        </div>

        <Button
          onClick={onBackToDashboard}
          className="w-full h-14 text-[18px]"
          style={{ background: '#2D9596', color: '#FFFFFF' }}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
