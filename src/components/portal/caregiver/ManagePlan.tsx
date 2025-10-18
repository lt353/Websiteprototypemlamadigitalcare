import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';

interface ManagePlanProps {
  seniorName: string;
  onBack: () => void;
}

export function ManagePlan({ seniorName, onBack }: ManagePlanProps) {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [showConfirm, setShowConfirm] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Support',
      price: '$39/month',
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

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-8">
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
                <p className="text-[16px]"><strong>Next billing date:</strong> January 1, 2026</p>
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
              {plan.badge && (
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
                    onClick={() => setShowConfirm(true)}
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

        <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm plan change?</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>Change {seniorName} from Standard ($79) to {plans.find(p => p.id === selectedPlan)?.name}?</p>
                <ul className="space-y-2">
                  <li>• New plan starts: January 1, 2026</li>
                  <li>• You&apos;ll be charged on your next billing date</li>
                  <li>• Current benefits continue until then</li>
                  <li>• Cancel anytime</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Go Back</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setShowConfirm(false);
                  alert(`✓ Plan updated! ${seniorName}'s new plan starts January 1.`);
                  onBack();
                }}
                style={{ background: '#2D9596', color: '#FFFFFF' }}
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
