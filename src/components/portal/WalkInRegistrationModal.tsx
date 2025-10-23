import { useState } from 'react';
import { X, Smartphone, Tablet, Eye, Ear, Navigation, Search, UserPlus, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Student } from './TeacherRouter';
import { toast } from 'sonner';

interface WalkInRegistrationModalProps {
  onClose: () => void;
  onAddStudent: (student: Student) => void;
}

// Mock database of previous students
const PREVIOUS_STUDENTS: Omit<Student, 'id'>[] = [
  { name: 'Margaret Santos', deviceType: 'iPhone', status: 'premium', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'margaret.santos@email.com', phone: '(808) 555-0123' },
  { name: 'Robert Tanaka', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'robert.tanaka@email.com', phone: '(808) 555-0124' },
  { name: 'Dorothy Chang', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'dorothy.chang@email.com', phone: '(808) 555-0125' },
  { name: 'William Lee', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: true, hearing: true, mobility: false }, email: 'william.lee@email.com', phone: '(808) 555-0126' },
  { name: 'Patricia Kim', deviceType: 'Android', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'patricia.kim@email.com', phone: '(808) 555-0127' },
  { name: 'James Wong', deviceType: 'iPad', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'james.wong@email.com', phone: '(808) 555-0128' },
  { name: 'Mary Nakamura', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'mary.nakamura@email.com', phone: '(808) 555-0129' },
  { name: 'Richard Silva', deviceType: 'Android', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'richard.silva@email.com', phone: '(808) 555-0130' },
  { name: 'Barbara Fernandez', deviceType: 'iPhone', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'barbara.fernandez@email.com', phone: '(808) 555-0131' },
  { name: 'Thomas Martinez', deviceType: 'iPad', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'thomas.martinez@email.com', phone: '(808) 555-0132' },
  { name: 'Susan Yamamoto', deviceType: 'iPhone', status: 'premium', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'susan.yamamoto@email.com', phone: '(808) 555-0133' },
  { name: 'George Fernandes', deviceType: 'Android', status: 'community', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'george.fernandes@email.com', phone: '(808) 555-0134' },
  { name: 'Linda Chen', deviceType: 'iPad', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'linda.chen@email.com', phone: '(808) 555-0135' },
  { name: 'Charles Wong', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'charles.wong@email.com', phone: '(808) 555-0136' },
  { name: 'Helen Rodriguez', deviceType: 'Android', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'helen.rodriguez@email.com', phone: '(808) 555-0137' }
];

export function WalkInRegistrationModal({ onClose, onAddStudent }: WalkInRegistrationModalProps) {
  const [mode, setMode] = useState<'new' | 'previous'>('previous'); // Default to previous for faster flow
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deviceType, setDeviceType] = useState<Student['deviceType'] | null>(null);
  const [accessibilityNeeds, setAccessibilityNeeds] = useState({
    vision: false,
    hearing: false,
    mobility: false
  });

  const filteredPreviousStudents = PREVIOUS_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.includes(searchQuery)
  );

  const handleSelectPreviousStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: `walk-in-${Date.now()}`,
      status: 'walk-in' // Override to walk-in status
    };

    onAddStudent(newStudent);
    toast.success('Walk-in student added!', {
      description: `${student.name} has been added to the class roster`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !deviceType) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newStudent: Student = {
      id: `walk-in-${Date.now()}`,
      name,
      phone,
      email: email || undefined,
      deviceType,
      status: 'walk-in',
      accessibilityNeeds
    };

    onAddStudent(newStudent);
    toast.success('Walk-in student added!', {
      description: `${name} has been added to the class roster`
    });
  };

  const deviceOptions: Array<{ type: Student['deviceType']; label: string; icon: any }> = [
    { type: 'iPhone', label: 'iPhone', icon: Smartphone },
    { type: 'Android', label: 'Android', icon: Smartphone },
    { type: 'iPad', label: 'iPad', icon: Tablet },
    { type: 'Other', label: 'Other', icon: Navigation }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border-2 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="sticky top-0 z-10 p-6 border-b"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[28px] font-bold" style={{ color: '#265073' }}>
                Add Walk-In Student
              </h2>
              <p className="text-[16px]" style={{ color: '#6B7280' }}>
                Quick registration for students joining today
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: '#6B7280' }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode('previous')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all"
              style={{
                background: mode === 'previous' ? '#E6F7F4' : '#FFFFFF',
                borderColor: mode === 'previous' ? '#2D9596' : '#E5E7EB',
                color: mode === 'previous' ? '#2D9596' : '#6B7280'
              }}
            >
              <Users className="w-5 h-5" />
              <span className="font-semibold">Previous Student</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('new')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all"
              style={{
                background: mode === 'new' ? '#E6F7F4' : '#FFFFFF',
                borderColor: mode === 'new' ? '#2D9596' : '#E5E7EB',
                color: mode === 'new' ? '#2D9596' : '#6B7280'
              }}
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-semibold">New Student</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {mode === 'previous' ? (
            /* Previous Student Selection */
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="space-y-2">
                <label htmlFor="search" className="text-[18px] font-medium" style={{ color: '#265073' }}>
                  Search for Student
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                  <Input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone..."
                    className="h-14 pl-12 text-[18px]"
                    style={{
                      borderColor: '#E5E7EB',
                      background: '#FFFFFF'
                    }}
                  />
                </div>
              </div>

              {/* Student List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredPreviousStudents.length > 0 ? (
                  filteredPreviousStudents.map((student, index) => {
                    const DeviceIcon = student.deviceType === 'iPad' ? Tablet : Smartphone;
                    const hasAccessibilityNeeds = Object.values(student.accessibilityNeeds).some(need => need);

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectPreviousStudent(student)}
                        className="w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md hover:border-teal-500"
                        style={{
                          background: '#FFFFFF',
                          borderColor: '#E5E7EB'
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-[18px] font-bold mb-1" style={{ color: '#265073' }}>
                              {student.name}
                            </h3>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center gap-1">
                                <DeviceIcon className="w-4 h-4" style={{ color: '#6B7280' }} />
                                <span className="text-[14px]" style={{ color: '#6B7280' }}>
                                  {student.deviceType}
                                </span>
                              </div>
                              <span className="text-[14px]" style={{ color: '#6B7280' }}>
                                • {student.phone}
                              </span>
                            </div>
                            {hasAccessibilityNeeds && (
                              <div className="flex items-center gap-2">
                                {student.accessibilityNeeds.vision && (
                                  <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: '#FEF3C7' }}>
                                    <Eye className="w-3 h-3" style={{ color: '#F59E0B' }} />
                                    <span className="text-[12px]" style={{ color: '#F59E0B' }}>Vision</span>
                                  </div>
                                )}
                                {student.accessibilityNeeds.hearing && (
                                  <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: '#DBEAFE' }}>
                                    <Ear className="w-3 h-3" style={{ color: '#3B82F6' }} />
                                    <span className="text-[12px]" style={{ color: '#3B82F6' }}>Hearing</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: '#E6F7F4' }}>
                            <span className="text-[20px]">→</span>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[16px]" style={{ color: '#9CA3AF' }}>
                      No students found matching "{searchQuery}"
                    </p>
                    <button
                      type="button"
                      onClick={() => setMode('new')}
                      className="mt-4 text-[14px] hover:underline"
                      style={{ color: '#2D9596' }}
                    >
                      Add as new student instead →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* New Student Form */
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-[18px] font-medium" style={{ color: '#265073' }}>
              Full Name <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student's full name"
              className="h-14 text-[18px]"
              style={{
                borderColor: '#E5E7EB',
                background: '#FFFFFF'
              }}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-[18px] font-medium" style={{ color: '#265073' }}>
              Phone Number <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(808) 555-0123"
              className="h-14 text-[18px]"
              style={{
                borderColor: '#E5E7EB',
                background: '#FFFFFF'
              }}
              required
            />
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-[18px] font-medium" style={{ color: '#265073' }}>
              Email Address <span className="text-[14px] italic" style={{ color: '#6B7280' }}>(Optional)</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Optional - many kūpuna don't use email"
              className="h-14 text-[18px]"
              style={{
                borderColor: '#E5E7EB',
                background: '#FFFFFF'
              }}
            />
          </div>

          {/* Device Type */}
          <div className="space-y-3">
            <label className="text-[18px] font-medium block" style={{ color: '#265073' }}>
              Device Type <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {deviceOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = deviceType === option.type;
                return (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => setDeviceType(option.type)}
                    className="rounded-lg p-4 border-2 transition-all hover:shadow-md"
                    style={{
                      background: isSelected ? '#E6F7F4' : '#FFFFFF',
                      borderColor: isSelected ? '#2D9596' : '#E5E7EB',
                      color: isSelected ? '#2D9596' : '#6B7280'
                    }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-[16px] font-semibold">
                      {option.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accessibility Needs */}
          <div className="space-y-3">
            <label className="text-[18px] font-medium block" style={{ color: '#265073' }}>
              Accessibility Needs
            </label>
            <div
              className="rounded-lg p-4 space-y-4"
              style={{ background: '#F9FAFB' }}
            >
              {/* Vision */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="vision"
                  checked={accessibilityNeeds.vision}
                  onCheckedChange={(checked) =>
                    setAccessibilityNeeds({ ...accessibilityNeeds, vision: checked as boolean })
                  }
                  className="w-6 h-6"
                />
                <label
                  htmlFor="vision"
                  className="flex items-center gap-2 cursor-pointer text-[18px]"
                  style={{ color: '#265073' }}
                >
                  <Eye className="w-5 h-5" style={{ color: '#6B7280' }} />
                  Vision Needs (larger text, high contrast)
                </label>
              </div>

              {/* Hearing */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="hearing"
                  checked={accessibilityNeeds.hearing}
                  onCheckedChange={(checked) =>
                    setAccessibilityNeeds({ ...accessibilityNeeds, hearing: checked as boolean })
                  }
                  className="w-6 h-6"
                />
                <label
                  htmlFor="hearing"
                  className="flex items-center gap-2 cursor-pointer text-[18px]"
                  style={{ color: '#265073' }}
                >
                  <Ear className="w-5 h-5" style={{ color: '#6B7280' }} />
                  Hearing Needs (speak clearly, face student)
                </label>
              </div>

              {/* Mobility */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="mobility"
                  checked={accessibilityNeeds.mobility}
                  onCheckedChange={(checked) =>
                    setAccessibilityNeeds({ ...accessibilityNeeds, mobility: checked as boolean })
                  }
                  className="w-6 h-6"
                />
                <label
                  htmlFor="mobility"
                  className="flex items-center gap-2 cursor-pointer text-[18px]"
                  style={{ color: '#265073' }}
                >
                  <Navigation className="w-5 h-5" style={{ color: '#6B7280' }} />
                  Mobility Needs (ensure accessible seating)
                </label>
              </div>

              {/* None */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="none"
                  checked={!accessibilityNeeds.vision && !accessibilityNeeds.hearing && !accessibilityNeeds.mobility}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAccessibilityNeeds({ vision: false, hearing: false, mobility: false });
                    }
                  }}
                  className="w-6 h-6"
                />
                <label
                  htmlFor="none"
                  className="cursor-pointer text-[18px]"
                  style={{ color: '#265073' }}
                >
                  No accessibility needs at this time
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 h-14 text-[18px]"
              style={{
                borderColor: '#E5E7EB',
                color: '#6B7280'
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-14 text-[18px]"
              style={{
                background: '#E67E50',
                color: '#FFFFFF'
              }}
            >
              Add to Class
            </Button>
          </div>

          {/* Helper Text */}
          <div
            className="rounded-lg p-4"
            style={{
              background: '#E6F7F4',
              border: '1px solid #2D9596'
            }}
          >
            <p className="text-[14px]" style={{ color: '#265073' }}>
              💡 <strong>Tip:</strong> This usually takes under 60 seconds. You can update their information later if needed.
            </p>
          </div>
        </form>
          )}
        </div>
      </div>
    </div>
  );
}