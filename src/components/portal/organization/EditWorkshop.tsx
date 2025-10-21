import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Calendar, Users, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface EditWorkshopProps {
  onBack: () => void;
  onSave: () => void;
}

export function EditWorkshop({ onBack, onSave }: EditWorkshopProps) {
  const [formData, setFormData] = useState({
    title: 'Scam Prevention Workshop',
    date: '2025-11-30',
    startTime: '14:00',
    endTime: '15:30',
    location: 'community-room',
    customLocation: '',
    maxCapacity: '30',
    instructor: 'tea',
    workshopType: 'free',
    costPerResident: '',
    specialNotes: 'Extra focus on phone scams requested by residents',
    setupNotes: 'Arrange chairs in semicircle for better visibility'
  });

  const [materials, setMaterials] = useState({
    handouts: true,
    largePrintHandouts: true,
    nameTags: true,
    projector: false,
    laptop: false,
    other: false
  });

  const [otherMaterial, setOtherMaterial] = useState('');
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const duration = (() => {
    if (formData.startTime && formData.endTime) {
      const [startHour, startMin] = formData.startTime.split(':').map(Number);
      const [endHour, endMin] = formData.endTime.split(':').map(Number);
      const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      return totalMinutes;
    }
    return 0;
  })();

  const handleCheckAvailability = () => {
    setAvailabilityChecked(true);
    toast.success('✓ Tea Araki is available for this date and time');
  };

  const handleSave = () => {
    if (!availabilityChecked) {
      toast.error('Please verify instructor availability first');
      return;
    }

    toast.success('✓ Workshop details updated successfully!');
    setTimeout(() => onSave(), 1500);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#2D9596', fontSize: '16px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Workshop Details
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Edit Workshop Details
          </h1>
          <p className="text-[18px]" style={{ color: '#6B7280' }}>
            Scam Prevention Workshop
          </p>
        </div>

        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-[18px] mb-2 block">Workshop Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-14 text-[18px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="text-[18px] mb-2 block">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-14 text-[18px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[18px]">Time</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="startTime" className="text-[14px] mb-1 block">Start</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="h-12 text-[16px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime" className="text-[14px] mb-1 block">End</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="h-12 text-[16px]"
                    />
                  </div>
                </div>
                {duration > 0 && (
                  <p className="text-[14px] mt-1" style={{ color: '#6B7280' }}>
                    Duration: {duration} minutes
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-[18px] mb-3 block">Location</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="location-community"
                    name="location"
                    checked={formData.location === 'community-room'}
                    onChange={() => setFormData({ ...formData, location: 'community-room' })}
                    className="w-5 h-5"
                  />
                  <Label htmlFor="location-community" className="text-[16px] cursor-pointer">
                    Sunset Senior Living - Community Room
                  </Label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    id="location-custom"
                    name="location"
                    checked={formData.location === 'custom'}
                    onChange={() => setFormData({ ...formData, location: 'custom' })}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="location-custom" className="text-[16px] cursor-pointer block mb-2">
                      Different location
                    </Label>
                    {formData.location === 'custom' && (
                      <Input
                        placeholder="Enter custom location"
                        value={formData.customLocation}
                        onChange={(e) => setFormData({ ...formData, customLocation: e.target.value })}
                        className="h-12 text-[16px]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capacity & Registration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Capacity & Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="capacity" className="text-[18px] mb-2 block">Maximum Capacity</Label>
              <Select value={formData.maxCapacity} onValueChange={(value) => setFormData({ ...formData, maxCapacity: value })}>
                <SelectTrigger className="h-14 text-[18px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 residents</SelectItem>
                  <SelectItem value="20">20 residents</SelectItem>
                  <SelectItem value="25">25 residents</SelectItem>
                  <SelectItem value="30">30 residents</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[14px] mt-2" style={{ color: '#6B7280' }}>
                Current Registration: 24 residents
              </p>
              <p className="text-[14px]" style={{ color: '#DC2626' }}>
                (Cannot reduce capacity below current registration)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructor */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Instructor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="instructor-tea"
                  name="instructor"
                  checked={formData.instructor === 'tea'}
                  onChange={() => setFormData({ ...formData, instructor: 'tea' })}
                  className="w-5 h-5"
                />
                <Label htmlFor="instructor-tea" className="text-[16px] cursor-pointer">
                  Tea Araki (currently assigned)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="instructor-lindsay"
                  name="instructor"
                  checked={formData.instructor === 'lindsay'}
                  onChange={() => setFormData({ ...formData, instructor: 'lindsay' })}
                  className="w-5 h-5"
                />
                <Label htmlFor="instructor-lindsay" className="text-[16px] cursor-pointer">
                  Lindsay Trenton
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="instructor-dj"
                  name="instructor"
                  checked={formData.instructor === 'dj'}
                  onChange={() => setFormData({ ...formData, instructor: 'dj' })}
                  className="w-5 h-5"
                />
                <Label htmlFor="instructor-dj" className="text-[16px] cursor-pointer">
                  DJ
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="instructor-other"
                  name="instructor"
                  checked={formData.instructor === 'other'}
                  onChange={() => setFormData({ ...formData, instructor: 'other' })}
                  className="w-5 h-5"
                />
                <Label htmlFor="instructor-other" className="text-[16px] cursor-pointer">
                  Request different instructor
                </Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCheckAvailability}
                variant="outline"
                className="h-12"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Check Availability
              </Button>
              {availabilityChecked && (
                <div className="flex items-center gap-2 px-4 rounded-lg" style={{ background: '#D1FAE5' }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} />
                  <span className="text-[16px]" style={{ color: '#065F46' }}>
                    Tea Araki is available
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Workshop Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[24px]">Workshop Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-[18px] mb-3 block">Type</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="type-free"
                    name="type"
                    checked={formData.workshopType === 'free'}
                    onChange={() => setFormData({ ...formData, workshopType: 'free' })}
                    className="w-5 h-5"
                  />
                  <Label htmlFor="type-free" className="text-[16px] cursor-pointer">
                    Free Community Workshop (included in partnership)
                  </Label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    id="type-paid"
                    name="type"
                    checked={formData.workshopType === 'paid'}
                    onChange={() => setFormData({ ...formData, workshopType: 'paid' })}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="type-paid" className="text-[16px] cursor-pointer block mb-2">
                      Paid Class - Cost per resident:
                    </Label>
                    {formData.workshopType === 'paid' && (
                      <Input
                        type="number"
                        placeholder="15"
                        value={formData.costPerResident}
                        onChange={(e) => setFormData({ ...formData, costPerResident: e.target.value })}
                        className="h-12 text-[16px] max-w-xs"
                        prefix="$"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="specialNotes" className="text-[18px] mb-2 block">
                Special Notes for Instructor
              </Label>
              <Textarea
                id="specialNotes"
                value={formData.specialNotes}
                onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                className="min-h-[100px] text-[16px]"
                placeholder="Add any special requests or focus areas..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Materials & Setup */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[24px]">Materials & Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {Object.entries(materials).map(([key, checked]) => (
                <div key={key} className="flex items-center gap-3">
                  <Checkbox
                    id={`material-${key}`}
                    checked={checked}
                    onCheckedChange={(value) => setMaterials({ ...materials, [key]: value as boolean })}
                    className="w-5 h-5"
                  />
                  <Label htmlFor={`material-${key}`} className="text-[16px] cursor-pointer">
                    {key === 'handouts' && 'Printed handouts (30 copies)'}
                    {key === 'largePrintHandouts' && 'Large print handouts (5 copies)'}
                    {key === 'nameTags' && 'Name tags for residents'}
                    {key === 'projector' && 'Projector and screen'}
                    {key === 'laptop' && 'Laptop for presentations'}
                    {key === 'other' && 'Other'}
                  </Label>
                </div>
              ))}
              {materials.other && (
                <Input
                  placeholder="Specify other materials..."
                  value={otherMaterial}
                  onChange={(e) => setOtherMaterial(e.target.value)}
                  className="h-12 text-[16px] ml-8"
                />
              )}
            </div>

            <div>
              <Label htmlFor="setupNotes" className="text-[18px] mb-2 block">
                Setup Notes
              </Label>
              <Textarea
                id="setupNotes"
                value={formData.setupNotes}
                onChange={(e) => setFormData({ ...formData, setupNotes: e.target.value })}
                className="min-h-[80px] text-[16px]"
                placeholder="Room arrangement, special setup requirements..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-16 text-[18px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-16 text-[18px]"
            style={{ background: '#2D9596', color: '#FFFFFF' }}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
