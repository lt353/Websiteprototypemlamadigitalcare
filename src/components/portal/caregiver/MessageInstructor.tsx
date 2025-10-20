import { useState } from 'react';
import { ArrowLeft, Send, Phone, Mail, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner@2.0.3';

interface MessageInstructorProps {
  seniorName: string;
  instructorName?: string;
  onBack: () => void;
}

export function MessageInstructor({ seniorName, instructorName = 'Tea Araki', onBack }: MessageInstructorProps) {
  const [messageType, setMessageType] = useState<'question' | 'reschedule' | 'concern' | 'feedback'>('question');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');

  const messageTemplates = {
    question: `Hi ${instructorName},\n\nI have a question about ${seniorName}'s recent session:\n\n`,
    reschedule: `Hi ${instructorName},\n\nI need to reschedule ${seniorName}'s upcoming session:\n\n`,
    concern: `Hi ${instructorName},\n\nI wanted to discuss a concern about ${seniorName}:\n\n`,
    feedback: `Hi ${instructorName},\n\nI wanted to share some feedback about ${seniorName}'s progress:\n\n`
  };

  const handleMessageTypeChange = (type: typeof messageType) => {
    setMessageType(type);
    if (!message || Object.values(messageTemplates).some(t => message.startsWith(t))) {
      setMessage(messageTemplates[type]);
    }
  };

  const handleSend = () => {
    if (!message.trim() || message === messageTemplates[messageType]) {
      toast.error('Please write a message before sending');
      return;
    }

    const subject = urgency === 'urgent' 
      ? `URGENT: Message from ${seniorName}'s caregiver`
      : `Message about ${seniorName}`;

    // Simulate sending
    toast.success(`✓ Message sent to ${instructorName}! They typically respond within 24 hours.`);
    
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const instructorInfo = {
    name: instructorName,
    title: 'Senior Technology Instructor',
    phone: '(808) 555-TECH',
    email: 'tea@malamadigital.care',
    availability: 'Mon-Fri 9am-5pm HST',
    responseTime: 'Usually within 24 hours'
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Message {instructorName}
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Send a message about {seniorName}'s sessions
          </p>
        </div>

        {/* Instructor Info Card */}
        <Card className="mb-6" style={{ background: '#E6F7F4', borderColor: '#9AD0C2' }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-[24px]" style={{ background: '#2D9596', color: '#FFFFFF' }}>
                TA
              </div>
              <div className="flex-1">
                <h3 className="text-[22px] font-bold" style={{ color: '#265073' }}>
                  {instructorInfo.name}
                </h3>
                <p className="text-[16px] mb-3" style={{ color: '#6B7280' }}>{instructorInfo.title}</p>
                
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                    <Phone className="w-4 h-4" style={{ color: '#2D9596' }} />
                    <a href={`tel:${instructorInfo.phone}`} className="hover:underline">
                      {instructorInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                    <Mail className="w-4 h-4" style={{ color: '#2D9596' }} />
                    <a href={`mailto:${instructorInfo.email}`} className="hover:underline">
                      {instructorInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                    <Calendar className="w-4 h-4" style={{ color: '#2D9596' }} />
                    {instructorInfo.availability}
                  </div>
                  <div className="flex items-center gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                    <MessageSquare className="w-4 h-4" style={{ color: '#2D9596' }} />
                    {instructorInfo.responseTime}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Call Button */}
        <div className="mb-6 p-4 rounded-lg border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: '#9AD0C2', background: '#E6F7F4' }}>
          <div className="flex-1">
            <p className="font-bold text-[18px]" style={{ color: '#265073' }}>Need help right now?</p>
            <p className="text-[16px]" style={{ color: '#6B7280' }}>Call {instructorName} directly during business hours</p>
          </div>
          <Button
            onClick={() => window.location.href = `tel:${instructorInfo.phone}`}
            className="w-full sm:w-auto h-14 text-[18px] font-bold whitespace-nowrap"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>
        </div>

        {/* Message Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Compose Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Message Type */}
            <div>
              <Label className="text-[18px] mb-3 block">What's this about?</Label>
              <RadioGroup value={messageType} onValueChange={(value: any) => handleMessageTypeChange(value)}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div 
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer"
                    style={{ borderColor: messageType === 'question' ? '#2D9596' : '#E5E7EB' }}
                  >
                    <RadioGroupItem value="question" id="question" />
                    <Label htmlFor="question" className="cursor-pointer flex-1">
                      <p className="font-bold text-[16px]" style={{ color: '#265073' }}>General Question</p>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>About sessions or progress</p>
                    </Label>
                  </div>

                  <div 
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer"
                    style={{ borderColor: messageType === 'reschedule' ? '#2D9596' : '#E5E7EB' }}
                  >
                    <RadioGroupItem value="reschedule" id="reschedule" />
                    <Label htmlFor="reschedule" className="cursor-pointer flex-1">
                      <p className="font-bold text-[16px]" style={{ color: '#265073' }}>Reschedule Request</p>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Change session time/date</p>
                    </Label>
                  </div>

                  <div 
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer"
                    style={{ borderColor: messageType === 'concern' ? '#2D9596' : '#E5E7EB' }}
                  >
                    <RadioGroupItem value="concern" id="concern" />
                    <Label htmlFor="concern" className="cursor-pointer flex-1">
                      <p className="font-bold text-[16px]" style={{ color: '#265073' }}>Concern</p>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Something to discuss</p>
                    </Label>
                  </div>

                  <div 
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer"
                    style={{ borderColor: messageType === 'feedback' ? '#2D9596' : '#E5E7EB' }}
                  >
                    <RadioGroupItem value="feedback" id="feedback" />
                    <Label htmlFor="feedback" className="cursor-pointer flex-1">
                      <p className="font-bold text-[16px]" style={{ color: '#265073' }}>Positive Feedback</p>
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>Share good news!</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Urgency */}
            <div>
              <Label className="text-[18px] mb-3 block">How urgent is this?</Label>
              <RadioGroup value={urgency} onValueChange={(value: any) => setUrgency(value)}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="text-[16px]">Normal (24 hour response)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="text-[16px]">
                      <span className="flex items-center gap-2 flex-wrap">
                        <span className="whitespace-nowrap">Urgent (same day response)</span>
                        <Badge style={{ background: '#FEE2E2', color: '#DC2626' }}>Will call you</Badge>
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-[18px] mb-2 block">Your Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Write your message to ${instructorName}...`}
                className="min-h-[250px] text-[16px]"
              />
              <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                Be as detailed as possible so {instructorName} can help you best
              </p>
            </div>

            {urgency === 'urgent' && (
              <div className="p-4 rounded-lg" style={{ background: '#FEE2E2', border: '1px solid #FCA5A5' }}>
                <p className="font-bold text-[16px] mb-1" style={{ color: '#DC2626' }}>
                  ⚠️ Urgent Message
                </p>
                <p className="text-[14px]" style={{ color: '#991B1B' }}>
                  {instructorName} will call you within 2 hours during business hours. If it's after 5pm, you'll receive a call first thing tomorrow morning.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-16 text-[18px] font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            className="flex-1 h-16 text-[18px] font-bold"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
