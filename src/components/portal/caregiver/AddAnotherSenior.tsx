import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface AddAnotherSeniorProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function AddAnotherSenior({ onBack, onSuccess }: AddAnotherSeniorProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    needs: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  const needsOptions = [
    'Password management',
    'Avoiding scams',
    'Video calling',
    'Email',
    'Device organization',
    'Health apps',
    'Not sure yet'
  ];

  const toggleNeed = (need: string) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Add Another Loved One
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Extend your care to another family member
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Their Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                    className="h-14 text-[18px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                    className="h-14 text-[18px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Relationship to you *</Label>
                <Select value={formData.relationship} onValueChange={(val) => setFormData({...formData, relationship: val})}>
                  <SelectTrigger className="h-14 text-[18px]">
                    <SelectValue placeholder="Select relationship..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="grandmother">Grandmother</SelectItem>
                    <SelectItem value="grandfather">Grandfather</SelectItem>
                    <SelectItem value="aunt">Aunt</SelectItem>
                    <SelectItem value="uncle">Uncle</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="h-14 text-[18px]"
                    placeholder="(808) 555-1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email (optional)</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-14 text-[18px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Their Address</CardTitle>
              <p className="text-[16px]" style={{ color: '#6B7280' }}>For in-home visits</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Street Address *</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                  className="h-14 text-[18px]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                    className="h-14 text-[18px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Zip Code *</Label>
                  <Input
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    required
                    className="h-14 text-[18px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[24px]">Their Needs</CardTitle>
              <p className="text-[16px]" style={{ color: '#6B7280' }}>What do they most need help with?</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {needsOptions.map((need) => (
                  <div key={need} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.needs.includes(need)}
                      onChange={() => toggleNeed(need)}
                      className="w-5 h-5"
                    />
                    <label className="text-[16px]">{need}</label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card style={{ background: '#FEF3C7', borderColor: '#F59E0B' }}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <input type="checkbox" required className="w-6 h-6 mt-1 flex-shrink-0" />
                <label className="text-[16px]" style={{ color: '#92400E' }}>
                  This person knows I am adding them and consents to me helping arrange their technology support *
                </label>
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit"
            className="w-full h-14 text-[18px]"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Add to My Care
          </Button>
        </form>
      </div>
    </div>
  );
}