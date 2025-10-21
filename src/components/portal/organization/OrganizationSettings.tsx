import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { toast } from 'sonner';

interface OrganizationSettingsProps {
  onBack: () => void;
  onNavigateToUpdatePayment?: () => void;
}

export function OrganizationSettings({ onBack, onNavigateToUpdatePayment }: OrganizationSettingsProps) {
  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 hover:underline" style={{ color: '#2D9596' }}>
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl md:text-[36px] font-bold mb-8" style={{ color: '#265073' }}>Settings</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Facility Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input defaultValue="Sunset Senior Living" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="123 Beach Rd, Honolulu, HI 96815" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="(808) 555-1234" className="h-12" />
              </div>
              <Button
                onClick={() => toast.success('✓ Facility information updated successfully')}
                style={{ background: '#2D9596', color: '#FFFFFF' }}
              >
                Update Information
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing & Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg mb-4" style={{ background: '#F9FAFB' }}>
                <p>Payment method: •••• •••• •••• 4242</p>
              </div>
              <Button 
                variant="outline"
                onClick={onNavigateToUpdatePayment}
              >
                Update Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
