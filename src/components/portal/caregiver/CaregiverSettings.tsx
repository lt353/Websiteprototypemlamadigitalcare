import { useState } from 'react';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { toast } from 'sonner';
import { CaregiverBottomNav } from './CaregiverBottomNav';

// Plan pricing
const STANDARD_PLAN_PRICE = 79;

interface CaregiverSettingsProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export function CaregiverSettings({ onBack, onNavigate }: CaregiverSettingsProps) {
  const [paymentResponsibility, setPaymentResponsibility] = useState<'senior' | 'caregiver' | 'split'>('senior');

  // Calculate split payment amount
  const splitAmount = (STANDARD_PLAN_PRICE / 2).toFixed(2);
  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 md:mb-6 hover:underline active:scale-95 transition-transform"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-[28px] md:text-[36px] font-bold mb-2 break-words" style={{ color: '#265073' }}>
            Settings
          </h1>
          <p className="text-[16px] md:text-[18px] break-words" style={{ color: '#6B7280' }}>
            Manage your account and preferences
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6 md:mb-8 h-auto grid grid-cols-2 gap-2 p-2">
            <TabsTrigger value="profile" className="text-[14px] md:text-[16px] px-4 md:px-5 py-2.5 md:py-3.5">My Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="text-[14px] md:text-[16px] px-4 md:px-5 py-2.5 md:py-3.5">Notifications</TabsTrigger>
            <TabsTrigger value="billing" className="text-[14px] md:text-[16px] px-4 md:px-5 py-2.5 md:py-3.5">Billing & Payment</TabsTrigger>
            <TabsTrigger value="security" className="text-[14px] md:text-[16px] px-4 md:px-5 py-2.5 md:py-3.5">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px]">Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[16px] md:text-[18px]">Name</Label>
                  <Input defaultValue="Sarah Miller" className="h-12 md:h-14 text-[16px] md:text-[18px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[16px] md:text-[18px]">Email</Label>
                  <Input type="email" defaultValue="sarah.miller@email.com" className="h-12 md:h-14 text-[16px] md:text-[18px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[16px] md:text-[18px]">Phone</Label>
                  <Input type="tel" defaultValue="(808) 555-5678" className="h-12 md:h-14 text-[16px] md:text-[18px]" />
                </div>
                <Button
                  onClick={() => toast.success('✓ Profile updated successfully')}
                  className="mt-4 w-full sm:w-auto text-[16px] md:text-[18px] h-12 md:h-14 active:scale-95 transition-transform"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px]">Email Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Email me 3 days before sessions',
                  'Text me 1 day before sessions',
                  'Notify me when progress updates are posted',
                  'Send monthly summary reports'
                ].map((pref, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={i < 3} className="w-5 h-5 flex-shrink-0" />
                    <label className="text-[16px] md:text-[18px] break-words">{pref}</label>
                  </div>
                ))}
                <Button
                  onClick={() => toast.success('✓ Notification preferences saved')}
                  className="mt-4 w-full sm:w-auto text-[16px] md:text-[18px] h-12 md:h-14 active:scale-95 transition-transform"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 md:space-y-6">
            {/* FIX 15: Payment Responsibility */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 flex-shrink-0" style={{ color: '#2D9596' }} />
                  <CardTitle className="text-[20px] md:text-[24px] break-words">Payment Responsibility</CardTitle>
                </div>
                <CardDescription className="text-[14px] md:text-[16px] break-words">
                  Choose who pays for Mary Johnson's care plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentResponsibility} onValueChange={(value: any) => setPaymentResponsibility(value)}>
                  <div className="space-y-3 md:space-y-4">
                    <div 
                      className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all"
                      style={{ borderColor: paymentResponsibility === 'senior' ? '#2D9596' : '#E5E7EB' }}
                    >
                      <RadioGroupItem value="senior" id="senior-pays" className="mt-1 flex-shrink-0" />
                      <Label htmlFor="senior-pays" className="cursor-pointer flex-1">
                        <p className="font-bold text-[16px] md:text-[18px] mb-1 break-words" style={{ color: '#265073' }}>
                          Mary Johnson pays (recommended)
                        </p>
                        <p className="text-[14px] md:text-[16px] break-words" style={{ color: '#6B7280' }}>
                          Charges go to Mary's payment method. You'll receive notifications but Mary manages billing.
                        </p>
                      </Label>
                    </div>

                    <div 
                      className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all"
                      style={{ borderColor: paymentResponsibility === 'caregiver' ? '#2D9596' : '#E5E7EB' }}
                    >
                      <RadioGroupItem value="caregiver" id="caregiver-pays" className="mt-1 flex-shrink-0" />
                      <Label htmlFor="caregiver-pays" className="cursor-pointer flex-1">
                        <p className="font-bold text-[16px] md:text-[18px] mb-1 break-words" style={{ color: '#265073' }}>
                          I pay for Mary's care
                        </p>
                        <p className="text-[14px] md:text-[16px] break-words" style={{ color: '#6B7280' }}>
                          Charges go to your payment method. You handle all billing and plan changes.
                        </p>
                      </Label>
                    </div>

                    <div 
                      className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all"
                      style={{ borderColor: paymentResponsibility === 'split' ? '#2D9596' : '#E5E7EB' }}
                    >
                      <RadioGroupItem value="split" id="split-payment" className="mt-1 flex-shrink-0" />
                      <Label htmlFor="split-payment" className="cursor-pointer flex-1">
                        <p className="font-bold text-[16px] md:text-[18px] mb-1 break-words" style={{ color: '#265073' }}>
                          Split 50/50 with Mary
                        </p>
                        <p className="text-[14px] md:text-[16px] break-words" style={{ color: '#6B7280' }}>
                          Monthly cost divided equally. Both of you receive separate charges.
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg" style={{ background: '#E0F2FE' }}>
                    <p className="text-[14px] md:text-[16px] break-words" style={{ color: '#075985' }}>
                      <strong>Current setup:</strong> {
                        paymentResponsibility === 'senior'
                          ? `Mary pays $${STANDARD_PLAN_PRICE}/month`
                          : paymentResponsibility === 'caregiver'
                          ? `You pay $${STANDARD_PLAN_PRICE}/month`
                          : `You and Mary each pay $${splitAmount}/month`
                      }
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => toast.success('✓ Payment responsibility updated')}
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                  className="w-full sm:w-auto text-[16px] md:text-[18px] h-12 md:h-14 active:scale-95 transition-transform"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px]">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 md:p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                  <p className="text-[16px] md:text-[18px]" style={{ color: '#265073' }}>
                    •••• •••• •••• 4242
                  </p>
                  <p className="text-[14px] md:text-[16px]" style={{ color: '#6B7280' }}>Expires 12/2025</p>
                </div>
                <Button
                  onClick={() => onNavigate?.('update-payment')}
                  variant="outline"
                  className="w-full sm:w-auto text-[16px] md:text-[18px] h-12 md:h-14 active:scale-95 transition-transform"
                >
                  Update Payment Method
                </Button>
                <Button
                  onClick={() => {
                    toast.success('Downloading tax summary...', {
                      description: 'PDF will open in a new window'
                    });
                    window.open('about:blank', '_blank');
                  }}
                  variant="outline"
                  className="w-full sm:w-auto text-[16px] md:text-[18px] h-12 md:h-14 active:scale-95 transition-transform"
                >
                  Download Tax Summary
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-4 md:mt-6">
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px]">Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: 'Nov 1, 2025', amount: '$79', description: 'Monthly subscription (Mary Johnson)' },
                    { date: 'Oct 1, 2025', amount: '$79', description: 'Monthly subscription (Mary Johnson)' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between gap-3 p-3 md:p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                      <div className="flex-1">
                        <p className="text-[16px] md:text-[18px] font-semibold break-words">{item.description}</p>
                        <p className="text-[14px] md:text-[16px]" style={{ color: '#6B7280' }}>{item.date}</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:text-right">
                        <p className="text-[16px] md:text-[18px] font-semibold">{item.amount}</p>
                        <Button variant="ghost" size="sm" className="text-[14px] md:text-[16px] active:scale-95 transition-transform">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px]">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[16px] md:text-[18px]">Current Password</Label>
                  <Input type="password" className="h-12 md:h-14 text-[16px] md:text-[18px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[16px] md:text-[18px]">New Password</Label>
                  <Input type="password" className="h-12 md:h-14 text-[16px] md:text-[18px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[16px] md:text-[18px]">Confirm New Password</Label>
                  <Input type="password" className="h-12 md:h-14 text-[16px] md:text-[18px]" />
                </div>
                <Button
                  onClick={() => toast.success('✓ Password updated successfully')}
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                  className="w-full sm:w-auto text-[16px] md:text-[18px] h-12 md:h-14 active:scale-95 transition-transform"
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-4 md:mt-6">
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px]">Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[16px] md:text-[18px] mb-4 break-words" style={{ color: '#6B7280' }}>
                  Add an extra layer of security to your account
                </p>
                <Button
                  onClick={() => toast.success('✓ Two-Factor Authentication enabled', {
                    description: 'You\'ll receive a verification code via text message'
                  })}
                  variant="outline"
                  className="w-full sm:w-auto text-[16px] md:text-[18px] h-12 md:h-14 active:scale-95 transition-transform"
                >
                  Enable Two-Factor Auth
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      {onNavigate && (
        <CaregiverBottomNav currentView="settings" onNavigate={onNavigate} />
      )}
    </div>
  );
}