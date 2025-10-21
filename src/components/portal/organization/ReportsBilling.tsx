import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

interface ReportsBillingProps {
  onBack: () => void;
}

export function ReportsBilling({ onBack }: ReportsBillingProps) {
  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto p-8">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 hover:underline" style={{ color: '#2D9596' }}>
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl md:text-[36px] font-bold mb-8" style={{ color: '#265073' }}>Reports & Billing</h1>
        
        <Tabs defaultValue="invoices">
          <TabsList className="mb-8">
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Current Balance: $320</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { invoice: 'INV-001', date: 'Nov 30', desc: 'Password Class (8 attendees)', amount: '$160' },
                    { invoice: 'INV-002', date: 'Nov 15', desc: 'Email Class (10 attendees)', amount: '$160' }
                  ].map((inv, i) => (
                    <div key={i} className="flex justify-between p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                      <div>
                        <p className="font-semibold">{inv.desc}</p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>{inv.invoice} • {inv.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{inv.amount}</p>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['October 2025', 'September 2025'].map((month, i) => (
                  <div key={i} className="flex justify-between p-4 rounded-lg" style={{ background: '#F9FAFB' }}>
                    <span>{month} Report</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
