import { useState } from 'react';
import { User, Bell, CreditCard, Lock, ChevronRight, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('subscription');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showDowngradeDialog, setShowDowngradeDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-[18px] hover:underline active:scale-95 transition-transform"
          style={{ color: '#2D9596' }}
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-[40px] font-bold mb-8" style={{ color: '#265073' }}>
          My Plan & Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 space-y-2">
            {[
              { id: 'subscription', icon: CreditCard, label: 'My Plan' },
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'security', icon: Lock, label: 'Security' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="w-full flex items-center justify-between px-6 py-4 rounded-lg text-left text-[18px] font-medium transition-all active:scale-95"
                style={{
                  background: activeTab === id ? '#F0FDFA' : 'transparent',
                  color: activeTab === id ? '#2D9596' : '#265073',
                  border: activeTab === id ? '2px solid #2D9596' : '2px solid transparent'
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'subscription' && (
              <div>
                <h2 className="text-[32px] font-bold mb-6" style={{ color: '#265073' }}>
                  My Plan & Billing
                </h2>

                {/* Current Plan */}
                <div className="bg-white rounded-xl border-4 p-8 mb-6" style={{ borderColor: '#2D9596' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-[28px] font-bold mb-2" style={{ color: '#265073' }}>
                        Standard Care Plan
                      </h3>
                      <p className="text-[20px] font-bold" style={{ color: '#2D9596' }}>
                        $79/month
                      </p>
                    </div>
                    <span className="px-4 py-2 rounded-full text-[14px] font-bold" style={{ background: '#D1FAE5', color: '#10B981' }}>
                      ACTIVE
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="text-[16px] font-bold mb-3" style={{ color: '#265073' }}>Your Benefits:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>1 in-home visit OR 3 virtual sessions per month</span>
                      </li>
                      <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Email/phone support</span>
                      </li>
                      <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Learning Library access</span>
                      </li>
                       <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Custom guides after each session</span>
                      </li>
                      <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Unlimited AI Scam Checker & Tech Helper</span>
                      </li>
                      <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>15% discount on add-ons</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                    <strong>Next billing date:</strong> December 1, 2025
                  </p>
                  <p className="text-[16px] mb-6" style={{ color: '#4B5563' }}>
                    <strong>Payment method:</strong> Visa ending in 4242
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => setShowPaymentDialog(true)}
                      className="h-14 px-6 text-[18px] font-bold active:scale-95 transition-transform"
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                    >
                      Change Payment Method
                    </Button>
                  </div>
                </div>

                {/* Other Plans */}
                <h3 className="text-[24px] font-bold mb-4" style={{ color: '#265073' }}>
                  Other Available Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Basic Plan */}
                  <div className="bg-white rounded-xl border-2 p-6" style={{ borderColor: '#D1D5DB' }}>
                    <h3 className="text-[24px] font-bold mb-2" style={{ color: '#265073' }}>
                      Basic Support
                    </h3>
                    <p className="text-[28px] font-bold mb-4" style={{ color: '#2D9596' }}>
                      $39/month
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>1 virtual sessions per month (30 minute)</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Email/phone support</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Limited AI Scam Checker & Tech Helper</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Access to learning library</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Physical Reference Cards (quarterly)</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>15% discount on add-ons</span>
                      </li>
                    </ul>
                    <br/>
                    <Button
                      onClick={() => setShowDowngradeDialog(true)}
                      variant="outline"
                      className="w-full h-12 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                      style={{ borderColor: '#2D9596', color: '#2D9596' }}
                    >
                      Downgrade to Basic
                    </Button>
                  </div>

                  {/* Premium Plan */}
                  <div className="bg-white rounded-xl border-2 p-6" style={{ borderColor: '#D1D5DB' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-[24px] font-bold" style={{ color: '#265073' }}>
                        Premium Care
                      </h3>
                      <span className="px-2 py-1 rounded text-[10px] font-bold" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-[28px] font-bold mb-4" style={{ color: '#2D9596' }}>
                      $149/month
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>2 in-home & 2 virtual sessions</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Priority 24/7 support</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Unlimited AI Scam Checker & Tech Helper</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Custom Guides & Sessions Recordings</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Quarterly Progress Reviews</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>15% discount on add-ons</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        <span>Proactive scam monitoring</span>
                      </li>
                    </ul>
                    <Button
                      onClick={() => setShowUpgradeDialog(true)}
                      className="w-full h-12 text-[16px] font-bold active:scale-95 transition-transform"
                      style={{ background: '#2D9596', color: '#FFFFFF' }}
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>

                {/* Pause & Cancel Section */}
                <h3 className="text-[24px] font-bold mb-4" style={{ color: '#265073' }}>
                  Manage Subscription
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Pause Section */}
                  <div className="bg-yellow-50 rounded-xl border-2 p-6" style={{ borderColor: '#FEF3C7' }}>
                    <h3 className="text-[20px] font-bold mb-3" style={{ color: '#F59E0B' }}>
                      Pause Subscription
                    </h3>
                    <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                      Taking a break? Pause your subscription for up to 3 months. Your plan and settings will be saved.
                    </p>
                    <Button
                      onClick={() => setShowPauseDialog(true)}
                      variant="outline"
                      className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                      style={{ borderColor: '#F59E0B', color: '#F59E0B' }}
                    >
                      Pause My Subscription
                    </Button>
                  </div>

                  {/* Cancel Section */}
                  <div className="bg-red-50 rounded-xl border-2 p-6" style={{ borderColor: '#FEE2E2' }}>
                    <h3 className="text-[20px] font-bold mb-3" style={{ color: '#EF4444' }}>
                      Cancel Subscription
                    </h3>
                    <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                      Cancel anytime. Your access continues until the end of your billing period (Dec 1, 2025).
                    </p>
                    <Button
                      onClick={() => setShowCancelDialog(true)}
                      variant="outline"
                      className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                      style={{ borderColor: '#EF4444', color: '#EF4444' }}
                    >
                      Cancel My Subscription
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-[32px] font-bold mb-6" style={{ color: '#265073' }}>
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[18px]">First Name</Label>
                    <Input className="h-14 text-[18px]" defaultValue="Joyce" />
                  </div>
                  <div>
                    <Label className="text-[18px]">Last Name</Label>
                    <Input className="h-14 text-[18px]" defaultValue="Lopez" />
                  </div>
                  <div>
                    <Label className="text-[18px]">Email</Label>
                    <Input className="h-14 text-[18px]" type="email" defaultValue="joyce@example.com" />
                  </div>
                  <div>
                    <Label className="text-[18px]">Phone</Label>
                    <Input className="h-14 text-[18px]" type="tel" defaultValue="(808) 555-9876" />
                  </div>
                  <Button className="h-14 px-8 text-[18px] font-bold active:scale-95 transition-transform" style={{ background: '#2D9596', color: '#FFFFFF' }}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-[32px] font-bold mb-6" style={{ color: '#265073' }}>
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border-2" style={{ borderColor: '#D1D5DB' }}>
                    <div>
                      <p className="text-[18px] font-bold" style={{ color: '#265073' }}>Email Notifications</p>
                      <p className="text-[14px]" style={{ color: '#4B5563' }}>Session reminders and updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border-2" style={{ borderColor: '#D1D5DB' }}>
                    <div>
                      <p className="text-[18px] font-bold" style={{ color: '#265073' }}>SMS Notifications</p>
                      <p className="text-[14px]" style={{ color: '#4B5563' }}>Text message reminders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border-2" style={{ borderColor: '#D1D5DB' }}>
                    <div>
                      <p className="text-[18px] font-bold" style={{ color: '#265073' }}>Phone Call Reminders</p>
                      <p className="text-[14px]" style={{ color: '#4B5563' }}>Day before session</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-[32px] font-bold mb-6" style={{ color: '#265073' }}>
                  Security Settings
                </h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-lg border-2" style={{ borderColor: '#D1D5DB' }}>
                    <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-[16px]">Current Password</Label>
                        <Input type="password" className="h-14 text-[18px]" />
                      </div>
                      <div>
                        <Label className="text-[16px]">New Password</Label>
                        <Input type="password" className="h-14 text-[18px]" />
                      </div>
                      <div>
                        <Label className="text-[16px]">Confirm New Password</Label>
                        <Input type="password" className="h-14 text-[18px]" />
                      </div>
                      <Button className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform" style={{ background: '#2D9596', color: '#FFFFFF' }}>
                        Update Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Dialog */}
        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>Upgrade to Premium</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Get more sessions and priority support
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <p className="text-[18px] mb-4" style={{ color: '#265073' }}>
                Your new plan includes:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                  <span>2 in-home OR 6 virtual sessions/month</span>
                </li>
                <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                  <span>Priority 24/7 support</span>
                </li>
                <li className="flex items-start gap-2 text-[16px]" style={{ color: '#4B5563' }}>
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                  <span>Dedicated technician</span>
                </li>
              </ul>
              <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                <strong>New monthly charge:</strong> $149
              </p>
              <p className="text-[14px]" style={{ color: '#4B5563' }}>
                Upgrade takes effect immediately. We'll prorate your first month.
              </p>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowUpgradeDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowUpgradeDialog(false);
                  alert('Upgraded to Premium! You now have access to all premium features.');
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Confirm Upgrade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Downgrade Dialog */}
        <Dialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>Downgrade to Basic</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Are you sure you want to downgrade?
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                Your new plan will include:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                  <span>2 virtual sessions per month</span>
                </li>
                <li className="flex items-start gap-2 text-[14px]" style={{ color: '#4B5563' }}>
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                  <span>Email support</span>
                </li>
              </ul>
              <p className="text-[16px] mb-2" style={{ color: '#4B5563' }}>
                <strong>New monthly charge:</strong> $39
              </p>
              <p className="text-[14px]" style={{ color: '#4B5563' }}>
                Change takes effect on your next billing date (December 1, 2025).
              </p>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowDowngradeDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Keep Current Plan
              </Button>
              <Button
                onClick={() => {
                  setShowDowngradeDialog(false);
                  alert('Plan downgrade scheduled for December 1, 2025.');
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#F59E0B', color: '#FFFFFF' }}
              >
                Confirm Downgrade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Pause Subscription Dialog */}
        <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#F59E0B' }}>Pause Subscription</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Take a break and come back when you're ready
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                When you pause your subscription:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-[16px]" style={{ color: '#4B5563' }}>✓ No charges during pause period</li>
                <li className="text-[16px]" style={{ color: '#4B5563' }}>✓ Your plan and settings are saved</li>
                <li className="text-[16px]" style={{ color: '#4B5563' }}>✓ Resume anytime within 3 months</li>
                <li className="text-[16px]" style={{ color: '#4B5563' }}>✓ Automatic resume option available</li>
              </ul>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="text-[16px] font-bold block mb-2" style={{ color: '#265073' }}>
                    Pause Duration
                  </label>
                  <select
                    className="w-full h-14 px-4 rounded-lg border-2 text-[18px]"
                    style={{ borderColor: '#D1D5DB' }}
                  >
                    <option>1 month</option>
                    <option>2 months</option>
                    <option>3 months</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: '#FEF3C7' }}>
                <p className="text-[14px]" style={{ color: '#92400E' }}>
                  <strong>Note:</strong> Your pause starts immediately. Billing resumes on the date you select.
                </p>
              </div>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowPauseDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSubscriptionChange('pause');
                  setShowPauseDialog(false);
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#F59E0B', color: '#FFFFFF' }}
              >
                Confirm Pause
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Subscription Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#EF4444' }}>Cancel Subscription</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                We're sorry to see you go
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                If you cancel, you'll lose access to:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-[16px]" style={{ color: '#4B5563' }}>• All tech support sessions</li>
                <li className="text-[16px]" style={{ color: '#4B5563' }}>• AI Scam Checker & Tech Helper</li>
                <li className="text-[16px]" style={{ color: '#4B5563' }}>• Learning library access</li>
                <li className="text-[16px]" style={{ color: '#4B5563' }}>• Session history and notes</li>
              </ul>
              <p className="text-[14px]" style={{ color: '#4B5563' }}>
                Your access will continue until December 1, 2025.
              </p>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowCancelDialog(false)}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Keep My Subscription
              </Button>
              <Button
                onClick={() => {
                  onSubscriptionChange('cancel');
                  setShowCancelDialog(false);
                }}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#EF4444', color: '#EF4444' }}
              >
                Yes, Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Payment Method Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>Update Payment Method</DialogTitle>
              <DialogDescription className="text-[16px]" style={{ color: '#4B5563' }}>
                Change your billing information
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 space-y-4">
              <div>
                <Label className="text-[16px]">Card Number</Label>
                <Input className="h-14 text-[18px]" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[16px]">Expiry Date</Label>
                  <Input className="h-14 text-[18px]" placeholder="MM/YY" />
                </div>
                <div>
                  <Label className="text-[16px]">CVV</Label>
                  <Input className="h-14 text-[18px]" placeholder="123" type="password" maxLength={3} />
                </div>
              </div>
              <div>
                <Label className="text-[16px]">Name on Card</Label>
                <Input className="h-14 text-[18px]" placeholder="Joyce Lopez" />
              </div>
            </div>
            <DialogFooter className="flex gap-3">
              <Button
                onClick={() => setShowPaymentDialog(false)}
                variant="outline"
                className="h-12 px-6 text-[16px] font-bold border-2 active:scale-95 transition-transform"
                style={{ borderColor: '#265073', color: '#265073' }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onPaymentUpdate();
                  setShowPaymentDialog(false);
                }}
                className="h-12 px-6 text-[16px] font-bold active:scale-95 transition-transform"
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Save Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
