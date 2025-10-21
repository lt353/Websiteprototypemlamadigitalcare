import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { toast } from 'sonner@2.0.3';

interface UpdatePaymentOrgProps {
  onBack: () => void;
}

export function UpdatePaymentOrg({ onBack }: UpdatePaymentOrgProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'invoice'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    zipCode: '',
    billingAddress: ''
  });
  const [bankData, setBankData] = useState({
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking'
  });
  const [invoiceData, setInvoiceData] = useState({
    organizationName: 'Sunset Senior Living',
    taxId: '',
    billingContact: '',
    billingEmail: '',
    billingAddress: '',
    city: '',
    state: 'HI',
    zip: ''
  });

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardData({ ...cardData, number: formatted });
  };

  const handleExpiryChange = (value: string) => {
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
    } else if (paymentMethod === 'bank') {
      if (!bankData.accountName || !bankData.accountNumber || !bankData.routingNumber) {
        toast.error('Please fill in all bank account details');
        return;
      }
    } else if (paymentMethod === 'invoice') {
      if (!invoiceData.taxId || !invoiceData.billingContact || !invoiceData.billingEmail) {
        toast.error('Please fill in required billing information');
        return;
      }
    }

    toast.success('✓ Organization payment method updated successfully!');
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
            Securely update how Sunset Senior Living pays for services
          </p>
        </div>

        {/* Current Payment Method */}
        <Card className="mb-6" style={{ borderColor: '#E0F2FE', background: '#F0F9FF' }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2D9596' }}>
                <Building2 className="w-6 h-6" style={{ color: '#FFFFFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[18px] mb-1" style={{ color: '#265073' }}>
                  Current Payment Method
                </p>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>
                  Business Visa ending in 8765 • Expires 03/2028
                </p>
                <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                  Next billing: December 1, 2025 for $890.00 (42 active residents)
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
              Enterprise-grade security
            </p>
            <p className="text-[14px]" style={{ color: '#065F46' }}>
              Bank-level encryption • PCI DSS compliant • SOC 2 certified
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
                        <p className="font-bold text-[18px]" style={{ color: '#265073' }}>Business Credit Card</p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>Earn rewards • Instant billing</p>
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
                        <p className="font-bold text-[18px]" style={{ color: '#265073' }}>Business Bank Account (ACH)</p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>Direct debit • Lower processing fees</p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer" style={{ borderColor: paymentMethod === 'invoice' ? '#2D9596' : '#E5E7EB' }}>
                  <RadioGroupItem value="invoice" id="invoice" />
                  <Label htmlFor="invoice" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6" style={{ color: '#2D9596' }} />
                      <div>
                        <p className="font-bold text-[18px]" style={{ color: '#265073' }}>Invoice Billing (NET 30)</p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>For organizations • Monthly invoices • Purchase orders accepted</p>
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
              <CardTitle className="text-[24px]">Business Card Information</CardTitle>
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
                <Label htmlFor="cardName" className="text-[18px] mb-2 block">Name on Card</Label>
                <Input
                  id="cardName"
                  placeholder="Sunset Senior Living LLC"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

              <div>
                <Label htmlFor="billingAddress" className="text-[18px] mb-2 block">Billing Address</Label>
                <Input
                  id="billingAddress"
                  placeholder="123 Business Pkwy, Honolulu, HI 96814"
                  value={cardData.billingAddress}
                  onChange={(e) => setCardData({ ...cardData, billingAddress: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bank Account Form */}
        {paymentMethod === 'bank' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Business Bank Account</CardTitle>
              <CardDescription className="text-[16px]">Direct debit (ACH) from your business account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="accountName" className="text-[18px] mb-2 block">Business/Account Name</Label>
                <Input
                  id="accountName"
                  placeholder="Sunset Senior Living LLC"
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
                      <Label htmlFor="checking" className="text-[16px]">Business Checking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="savings" id="savings" />
                      <Label htmlFor="savings" className="text-[16px]">Business Savings</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invoice Billing Form */}
        {paymentMethod === 'invoice' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Invoice Billing Information</CardTitle>
              <CardDescription className="text-[16px]">We'll send monthly invoices with NET 30 terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="orgName" className="text-[18px] mb-2 block">Legal Organization Name</Label>
                <Input
                  id="orgName"
                  value={invoiceData.organizationName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, organizationName: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>

              <div>
                <Label htmlFor="taxId" className="text-[18px] mb-2 block">Tax ID / EIN *</Label>
                <Input
                  id="taxId"
                  placeholder="12-3456789"
                  value={invoiceData.taxId}
                  onChange={(e) => setInvoiceData({ ...invoiceData, taxId: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingContact" className="text-[18px] mb-2 block">Billing Contact Name *</Label>
                  <Input
                    id="billingContact"
                    placeholder="John Doe"
                    value={invoiceData.billingContact}
                    onChange={(e) => setInvoiceData({ ...invoiceData, billingContact: e.target.value })}
                    className="h-14 text-[18px]"
                  />
                </div>
                <div>
                  <Label htmlFor="billingEmail" className="text-[18px] mb-2 block">Billing Email *</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    placeholder="billing@sunsetsenior.com"
                    value={invoiceData.billingEmail}
                    onChange={(e) => setInvoiceData({ ...invoiceData, billingEmail: e.target.value })}
                    className="h-14 text-[18px]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-[18px] mb-2 block">Billing Address</Label>
                <Input
                  id="address"
                  placeholder="123 Business Parkway"
                  value={invoiceData.billingAddress}
                  onChange={(e) => setInvoiceData({ ...invoiceData, billingAddress: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Label htmlFor="city" className="text-[18px] mb-2 block">City</Label>
                  <Input
                    id="city"
                    value={invoiceData.city}
                    onChange={(e) => setInvoiceData({ ...invoiceData, city: e.target.value })}
                    className="h-14 text-[18px]"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-[18px] mb-2 block">State</Label>
                  <Input
                    id="state"
                    value={invoiceData.state}
                    onChange={(e) => setInvoiceData({ ...invoiceData, state: e.target.value })}
                    className="h-14 text-[18px]"
                  />
                </div>
                <div>
                  <Label htmlFor="zip" className="text-[18px] mb-2 block">ZIP</Label>
                  <Input
                    id="zip"
                    value={invoiceData.zip}
                    onChange={(e) => setInvoiceData({ ...invoiceData, zip: e.target.value.replace(/\D/g, '') })}
                    maxLength={5}
                    className="h-14 text-[18px]"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: '#FEF3C7' }}>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#F59E0B' }} />
                <p className="text-[14px]" style={{ color: '#92400E' }}>
                  Invoice billing requires approval. Our team will contact you within 1 business day to set up NET 30 terms. You can also upload a W-9 form for faster processing.
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