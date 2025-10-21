import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { toast } from 'sonner';

interface UpdatePaymentProps {
  onBack: () => void;
}

export function UpdatePayment({ onBack }: UpdatePaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    zipCode: ''
  });
  const [bankData, setBankData] = useState({
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking'
  });

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardData({ ...cardData, number: formatted });
  };

  const handleExpiryChange = (value: string) => {
    // Format expiry as MM/YY
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setCardData({ ...cardData, expiry: `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}` });
    } else {
      setCardData({ ...cardData, expiry: cleaned });
    }
  };

  const handleSubmit = () => {
    if (paymentMethod === 'card') {
      if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
        toast.error('Please fill in all card details');
        return;
      }
    } else {
      if (!bankData.accountName || !bankData.accountNumber || !bankData.routingNumber) {
        toast.error('Please fill in all bank account details');
        return;
      }
    }

    toast.success('✓ Payment method updated successfully!');
    setTimeout(() => onBack(), 1500);
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
          Back to Settings
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Update Payment Method
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Securely update how you pay for Mary Johnson's care plan
          </p>
        </div>

        {/* Current Payment Method */}
        <Card className="mb-6" style={{ borderColor: '#E0F2FE', background: '#F0F9FF' }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2D9596' }}>
                <CreditCard className="w-6 h-6" style={{ color: '#FFFFFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[18px] mb-1" style={{ color: '#265073' }}>
                  Current Payment Method
                </p>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>
                  Visa ending in 4242 • Expires 12/2027
                </p>
                <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                  Next billing: December 1, 2025 for $79.00
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="flex items-center gap-3 p-4 rounded-lg mb-6" style={{ background: '#D1FAE5', border: '1px solid #9AD0C2' }}>
          <Shield className="w-6 h-6 flex-shrink-0" style={{ color: '#16A34A' }} />
          <div>
            <p className="font-bold text-[16px]" style={{ color: '#065F46' }}>
              Your information is secure
            </p>
            <p className="text-[14px]" style={{ color: '#065F46' }}>
              We use bank-level encryption to protect your payment details
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Choose Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer" style={{ borderColor: paymentMethod === 'card' ? '#2D9596' : '#E5E7EB' }}>
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6" style={{ color: '#2D9596' }} />
                      <div>
                        <p className="font-bold text-[18px]" style={{ color: '#265073' }}>Credit or Debit Card</p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>Visa, Mastercard, Discover, American Express</p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer" style={{ borderColor: paymentMethod === 'bank' ? '#2D9596' : '#E5E7EB' }}>
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Lock className="w-6 h-6" style={{ color: '#2D9596' }} />
                      <div>
                        <p className="font-bold text-[18px]" style={{ color: '#265073' }}>Bank Account (ACH)</p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>Direct debit from checking or savings</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Card Information</CardTitle>
              <CardDescription className="text-[16px]">All fields are required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="cardNumber" className="text-[18px] mb-2 block">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  maxLength={19}
                  className="h-14 text-[18px]"
                />
              </div>

              <div>
                <Label htmlFor="cardName" className="text-[18px] mb-2 block">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="Name on card"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-[18px] mb-2 block">Expiration</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                    maxLength={5}
                    className="h-14 text-[18px]"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-[18px] mb-2 block">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                    maxLength={4}
                    type="password"
                    className="h-14 text-[18px]"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-[18px] mb-2 block">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="96814"
                    value={cardData.zipCode}
                    onChange={(e) => setCardData({ ...cardData, zipCode: e.target.value.replace(/\D/g, '') })}
                    maxLength={5}
                    className="h-14 text-[18px]"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: '#FEF3C7' }}>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#F59E0B' }} />
                <p className="text-[14px]" style={{ color: '#92400E' }}>
                  Your card will be charged $79.00 on December 1, 2025. You can cancel anytime before then.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bank Account Form */}
        {paymentMethod === 'bank' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Bank Account Information</CardTitle>
              <CardDescription className="text-[16px]">Direct debit (ACH) from your checking or savings account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="accountName" className="text-[18px] mb-2 block">Account Holder Name</Label>
                <Input
                  id="accountName"
                  placeholder="Name on bank account"
                  value={bankData.accountName}
                  onChange={(e) => setBankData({ ...bankData, accountName: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>

              <div>
                <Label htmlFor="routingNumber" className="text-[18px] mb-2 block">Routing Number</Label>
                <Input
                  id="routingNumber"
                  placeholder="9 digits"
                  value={bankData.routingNumber}
                  onChange={(e) => setBankData({ ...bankData, routingNumber: e.target.value.replace(/\D/g, '') })}
                  maxLength={9}
                  className="h-14 text-[18px]"
                />
              </div>

              <div>
                <Label htmlFor="accountNumber" className="text-[18px] mb-2 block">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="Account number"
                  value={bankData.accountNumber}
                  onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value.replace(/\D/g, '') })}
                  className="h-14 text-[18px]"
                  type="password"
                />
              </div>

              <div>
                <Label className="text-[18px] mb-3 block">Account Type</Label>
                <RadioGroup value={bankData.accountType} onValueChange={(value) => setBankData({ ...bankData, accountType: value })}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="checking" id="checking" />
                      <Label htmlFor="checking" className="text-[16px]">Checking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="savings" id="savings" />
                      <Label htmlFor="savings" className="text-[16px]">Savings</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: '#E0F2FE' }}>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#0284C7' }} />
                <p className="text-[14px]" style={{ color: '#075985' }}>
                  It may take 1-2 business days to verify your bank account. Your first charge will be $79.00 on December 1, 2025.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-16 text-[18px] font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-16 text-[18px] font-bold"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            Update Payment Method
          </Button>
        </div>
      </div>
    </div>
  );
}
