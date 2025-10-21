import { ArrowLeft, CheckCircle2, Gift, Printer } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { toast } from 'sonner';

interface ManagePlanProps {
  seniorName: string;
  onBack: () => void;
}

export function ManagePlan({ seniorName, onBack }: ManagePlanProps) {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showGiftDialog, setShowGiftDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showUpgradeConfirmation, setShowUpgradeConfirmation] = useState(false);
  const [isGiftUpgrade, setIsGiftUpgrade] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Dynamic billing date calculation
  const getNextBillingDate = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic Support',
      price: '$39/month',
      priceNum: 39,
      savings: 'Save $480/year',
      features: [
        '1 virtual check-in (30 min)',
        'Email/phone support (48-hr response)',
        'Limited access to both AI assistants',
        'Access to learning library',
        'Physical reference cards (quarterly)',
        '15% discount on add-ons'
      ],
      bestFor: 'Budget-conscious families needing occasional support'
    },
    {
      id: 'standard',
      name: 'Standard Care',
      price: '$79/month',
      priceNum: 79,
      badge: 'Most Popular',
      current: true,
      features: [
        '1 in-home visit (90 min) OR 3 virtual sessions',
        'Email/phone support (same-day)',
        'Unlimited access to both AI assistants',
        'Access to learning library',
        'Custom Guides after each session',
        '15% discount on add-ons'
      ],
      bestFor: 'Regular support with flexibility'
    },
    {
      id: 'premium',
      name: 'Premium Care',
      price: '$149/month',
      priceNum: 149,
      badge: 'Comprehensive Support',
      features: [
        '2 in-home visits (90 min each) & 2 virtual sessions',
        '24/7 emergency support line',
        'Unlimited access to both AI assistants',
        'Access to learning library',
        'Custom Guides & session recordings',
        'Quarterly progress reviews',
        '15% discount on add-ons',
        'Proactive scam monitoring'
      ],
      bestFor: 'Complex needs or maximum peace of mind',
      upgrade: '+$70/month'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === 'premium') {
      // Show option to gift upgrade
      setShowGiftDialog(true);
    } else if (planId !== 'standard') {
      setShowConfirm(true);
    }
  };

  const handleGiftChoice = (asGift: boolean) => {
    setIsGiftUpgrade(asGift);
    setShowGiftDialog(false);
    if (asGift) {
      setGiftMessage(`Merry Christmas! I'm upgrading your Mālama plan to Premium Care as my gift to you. Enjoy the enhanced support and peace of mind! Love, Sarah`);
    }
    setShowPaymentDialog(true);
  };

  const handlePaymentSubmit = () => {
    setShowPaymentDialog(false);
    setShowUpgradeConfirmation(true);
  };

  const priceDifference = plans.find(p => p.id === 'premium')?.priceNum! - plans.find(p => p.id === 'standard')?.priceNum!;

  const printConfirmation = () => {
    window.print();
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Manage {seniorName}&apos;s Plan
          </h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[24px]">{seniorName}&apos;s Current Plan: Standard Care ($79/month)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {['1 in-home visit (90 min)', 'OR 3 virtual sessions', 'Unlimited email/phone support', 'Family training included'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                    <span className="text-[16px]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-[16px]"><strong>Next billing date:</strong> {getNextBillingDate()}</p>
                <p className="text-[16px]"><strong>Payment method:</strong> Visa ending in 4532</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-[28px] font-bold mb-6" style={{ color: '#265073' }}>Available Plans</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all ${
                selectedPlan === plan.id ? 'border-2 shadow-lg' : 'border'
              }`}
              style={{
                borderColor: selectedPlan === plan.id ? '#2D9596' : '#E5E7EB',
                background: plan.current ? '#E6F7F4' : '#FFFFFF'
              }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.badge && !plan.current && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[14px]" style={{ background: '#2D9596', color: '#FFFFFF' }}>
                  {plan.badge}
                </div>
              )}
              {plan.current && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[14px]" style={{ background: '#2D9596', color: '#FFFFFF' }}>
                  Current Plan
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-[24px]">{plan.name}</CardTitle>
                {plan.savings && (
                  <p className="text-[16px]" style={{ color: '#16A34A' }}>{plan.savings}</p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-[32px] font-bold mb-4" style={{ color: '#2D9596' }}>{plan.price}</p>
                {plan.upgrade && (
                  <p className="text-[16px] mb-4" style={{ color: '#6B7280' }}>{plan.upgrade}</p>
                )}
                <div className="space-y-2 mb-6">
                  <p className="font-semibold">What&apos;s Included:</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: '#2D9596' }}>•</span>
                      <span className="text-[16px]">{feature}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[14px] mb-4" style={{ color: '#6B7280' }}>
                  <strong>Best For:</strong> {plan.bestFor}
                </p>
                {!plan.current && (
                  <Button
                    className="w-full"
                    style={{ background: '#2D9596', color: '#FFFFFF' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.id);
                    }}
                  >
                    {plan.id === 'premium' ? 'Upgrade to Premium' : 'Select Basic Plan'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline" className="flex-1 h-14 text-[18px]">
            Keep Current Plan
          </Button>
        </div>

        {/* Gift Upgrade Dialog */}
        <Dialog open={showGiftDialog} onOpenChange={setShowGiftDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px] flex items-center gap-3" style={{ color: '#265073' }}>
                <Gift className="w-8 h-8" style={{ color: '#2D9596' }} />
                Gift This Upgrade?
              </DialogTitle>
              <DialogDescription className="text-[16px]">
                Would you like to pay for this upgrade as a gift to {seniorName}?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="p-6 rounded-lg" style={{ background: '#E6F7F4', border: '2px solid #2D9596' }}>
                <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
                  Premium Care Upgrade
                </h3>
                <div className="space-y-2 text-[16px]">
                  <p><strong>Current Plan:</strong> Standard Care ($79/month)</p>
                  <p><strong>New Plan:</strong> Premium Care ($149/month)</p>
                  <p><strong>Monthly Difference:</strong> +${priceDifference}</p>
                  <p className="text-[14px] mt-4" style={{ color: '#6B7280' }}>
                    You'll pay the ${priceDifference} difference each month. {seniorName} will receive a notification about the upgrade with your gift message.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => handleGiftChoice(true)}
                  className="flex-1 h-14"
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Yes, Gift This Upgrade
                </Button>
                <Button
                  onClick={() => handleGiftChoice(false)}
                  variant="outline"
                  className="flex-1 h-14"
                >
                  No, Regular Upgrade
                </Button>
              </div>
              <Button
                onClick={() => setShowGiftDialog(false)}
                variant="ghost"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px]" style={{ color: '#265073' }}>
                {isGiftUpgrade ? 'Complete Gift Upgrade Payment' : 'Confirm Upgrade Payment'}
              </DialogTitle>
              <DialogDescription className="text-[16px]">
                {isGiftUpgrade
                  ? `You'll pay $${priceDifference}/month for ${seniorName}'s Premium upgrade`
                  : `Upgrade ${seniorName} to Premium Care for $149/month`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {isGiftUpgrade && (
                <div>
                  <Label className="text-[16px] mb-2 block">Gift Message to {seniorName}</Label>
                  <Textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="min-h-[120px]"
                    placeholder={`Write a personal message to ${seniorName} about this gift...`}
                  />
                  <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                    This message will be included in the upgrade notification email to {seniorName}.
                  </p>
                </div>
              )}

              <div>
                <Label className="text-[16px] mb-3 block">Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2" style={{ borderColor: paymentMethod === 'card' ? '#2D9596' : '#E5E7EB' }}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Credit/Debit Card</span>
                        <span style={{ color: '#6B7280' }}>Visa ending in 4532</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2" style={{ borderColor: paymentMethod === 'new-card' ? '#2D9596' : '#E5E7EB' }}>
                    <RadioGroupItem value="new-card" id="new-card" />
                    <Label htmlFor="new-card" className="flex-1 cursor-pointer">
                      Use a different card
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'new-card' && (
                <div className="space-y-4">
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" className="mt-2" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input placeholder="123" type="password" className="mt-2" />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg" style={{ background: '#E6F7F4' }}>
                <h4 className="font-bold mb-2" style={{ color: '#265073' }}>Payment Summary</h4>
                {isGiftUpgrade ? (
                  <div className="space-y-1 text-[16px]">
                    <p><strong>Your monthly payment:</strong> ${priceDifference}</p>
                    <p><strong>{seniorName}'s payment:</strong> $79 (unchanged)</p>
                    <p><strong>First charge:</strong> {getNextBillingDate()}</p>
                  </div>
                ) : (
                  <div className="space-y-1 text-[16px]">
                    <p><strong>New monthly charge:</strong> $149</p>
                    <p><strong>First charge:</strong> {getNextBillingDate()}</p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePaymentSubmit}
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                {isGiftUpgrade ? `Pay $${priceDifference}/month` : 'Confirm Upgrade'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upgrade Confirmation Dialog */}
        <Dialog open={showUpgradeConfirmation} onOpenChange={setShowUpgradeConfirmation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[28px] text-center flex items-center justify-center gap-3" style={{ color: '#16A34A' }}>
                {isGiftUpgrade && <Gift className="w-8 h-8" />}
                ✓ Upgrade Complete!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              {isGiftUpgrade && (
                <div className="text-center p-6 rounded-lg" style={{ background: '#FEF3C7' }}>
                  <p className="text-[20px] font-bold mb-2" style={{ color: '#92400E' }}>
                    🎁 Gift Upgrade Successful!
                  </p>
                  <p className="text-[16px]" style={{ color: '#92400E' }}>
                    {seniorName} has been notified about your thoughtful gift
                  </p>
                </div>
              )}

              <div className="p-6 rounded-lg border-2" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>Upgrade Summary</h3>
                <div className="space-y-2 text-[16px]">
                  <p><strong>Senior:</strong> {seniorName}</p>
                  <p><strong>New Plan:</strong> Premium Care ($149/month)</p>
                  <p><strong>Previous Plan:</strong> Standard Care ($79/month)</p>
                  {isGiftUpgrade && (
                    <>
                      <p><strong>Your Monthly Payment:</strong> ${priceDifference}</p>
                      <p><strong>{seniorName}'s Monthly Payment:</strong> $79</p>
                      <p><strong>Gift Message Sent:</strong> Yes</p>
                    </>
                  )}
                  <p><strong>Effective Date:</strong> {getCurrentDate()}</p>
                  <p><strong>Next Billing Date:</strong> {getNextBillingDate()}</p>
                  <p><strong>Confirmation #:</strong> UPG-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>

                {isGiftUpgrade && giftMessage && (
                  <div className="mt-4 p-4 rounded-lg" style={{ background: '#E6F7F4' }}>
                    <p className="font-semibold mb-2" style={{ color: '#265073' }}>Your Gift Message:</p>
                    <p className="text-[14px] italic" style={{ color: '#6B7280' }}>"{giftMessage}"</p>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-lg" style={{ background: '#E6F7F4', border: '1px solid #2D9596' }}>
                <h4 className="font-bold mb-2" style={{ color: '#265073' }}>What Happens Next:</h4>
                <ul className="space-y-1 text-[14px]">
                  <li>✓ {seniorName} now has access to all Premium Care benefits</li>
                  <li>✓ {isGiftUpgrade ? `${seniorName} will receive an email about your gift` : 'Upgrade confirmation email sent'}</li>
                  <li>✓ {isGiftUpgrade ? `You'll be charged $${priceDifference}` : `New plan charge of $149`} on {getNextBillingDate()}</li>
                  <li>✓ You can modify or cancel the plan anytime</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={printConfirmation}
                  variant="outline"
                  className="flex-1"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Confirmation
                </Button>
                <Button
                  onClick={() => {
                    setShowUpgradeConfirmation(false);
                    toast.success(`✓ ${seniorName} upgraded to Premium Care!`);
                    onBack();
                  }}
                  style={{ background: '#2D9596', color: '#FFFFFF' }}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Regular Plan Change Confirmation */}
        <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[24px]" style={{ color: '#265073' }}>Confirm plan change?</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p className="text-[16px]">Change {seniorName} from Standard ($79) to {plans.find(p => p.id === selectedPlan)?.name}?</p>
                <ul className="space-y-2 text-[16px]">
                  <li>• New plan starts: {getCurrentDate()}</li>
                  <li>• You&apos;ll be charged on your next billing date: {getNextBillingDate()}</li>
                  <li>• Current benefits continue until then</li>
                  <li>• Cancel anytime</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-[16px]">Go Back</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setShowConfirm(false);
                  toast.success(`✓ Plan updated! ${seniorName}'s new plan starts ${getCurrentDate()}.`);
                  onBack();
                }}
                style={{ background: '#2D9596', color: '#FFFFFF' }}
                className="text-[16px]"
              >
                Confirm Change
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
