import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, User, Phone, Building2, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import logoWithTagline from 'figma:asset/67e57119f09275ddba6aeee613daad29af3852a3.png';

type UserType = 'kupuna' | 'caregiver' | 'organization';

interface RegisterPageProps {
  onRegister: (userType: UserType) => void;
  onNavigateToLogin: () => void;
  onNavigate?: (page: string) => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin, onNavigate }: RegisterPageProps) {
  const [selectedUserType, setSelectedUserType] = useState<UserType>('kupuna');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Kupuna form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Caregiver specific fields
  const [relationship, setRelationship] = useState('');
  const [seniorFirstName, setSeniorFirstName] = useState('');
  const [seniorLastName, setSeniorLastName] = useState('');
  const [seniorPhone, setSeniorPhone] = useState('');
  const [seniorEmail, setSeniorEmail] = useState('');
  const [oahuArea, setOahuArea] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  
  // Organization specific fields
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [numResidents, setNumResidents] = useState('');
  const [servicesInterest, setServicesInterest] = useState<string[]>([]);
  const [authorityChecked, setAuthorityChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(selectedUserType);
  };

  const handleServiceInterestToggle = (service: string) => {
    setServicesInterest(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const UserTypeCard = ({ 
    type, 
    icon, 
    title
  }: { 
    type: UserType; 
    icon: string; 
    title: string;
  }) => (
    <button
      type="button"
      onClick={() => setSelectedUserType(type)}
      className={`relative flex flex-col items-center text-center p-8 rounded-xl cursor-pointer transition-all duration-200 min-h-[140px] ${
        selectedUserType === type 
          ? 'border-3 shadow-lg' 
          : 'border-2 hover:border-[#2D9596] hover:shadow-md hover:scale-[1.02]'
      }`}
      style={{
        borderColor: selectedUserType === type ? '#2D9596' : '#E2E8F0',
        background: selectedUserType === type ? '#E6F7F4' : '#FFFFFF',
      }}
    >
      {selectedUserType === type && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-6 h-6" style={{ color: '#2D9596' }} />
        </div>
      )}
      <div className="text-[48px] mb-3">{icon}</div>
      <h3 
        className="text-[20px] font-bold" 
        style={{ color: selectedUserType === type ? '#2D9596' : '#265073' }}
      >
        {title}
      </h3>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT COLUMN - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-2xl space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logoWithTagline}
              alt="Mālama Digital Care"
              className="w-64 h-auto"
            />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
              Create Your Account
            </h1>
            <p className="text-[18px]" style={{ color: '#4B5563' }}>
              Start your digital confidence journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Type Selection Cards */}
            <div className="space-y-4">
              <div>
                <h2 className="text-[24px] font-bold mb-2" style={{ color: '#265073' }}>
                  I am registering as:
                </h2>
                <p className="text-[16px]" style={{ color: '#6B7280' }}>
                  Choose the option that describes you best
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <UserTypeCard
                  type="kupuna"
                  icon="👤"
                  title="Kūpuna (Senior)"
                />
                <UserTypeCard
                  type="caregiver"
                  icon="👥"
                  title="Family Member / Caregiver"
                />
                <UserTypeCard
                  type="organization"
                  icon="🏢"
                  title="Organization / Facility"
                />
              </div>
            </div>

            {/* KUPUNA FORM */}
            {selectedUserType === 'kupuna' && (
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-14 text-[18px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-14 text-[18px]"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-[18px]"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 text-[18px]"
                    placeholder="(808) 555-1234"
                    required
                  />
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 pr-12 text-[18px]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-14 pr-12 text-[18px]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth (for personalization)</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="h-14 text-[18px]"
                  />
                </div>

                {/* How did you hear */}
                <div className="space-y-2">
                  <Label htmlFor="hearAbout">How did you hear about us?</Label>
                  <Select value={hearAbout} onValueChange={setHearAbout}>
                    <SelectTrigger className="h-14 text-[18px] border-2 border-gray-300 hover:border-[#2D9596] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596] focus:ring-opacity-20">
                      <SelectValue placeholder="Select one..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="friend">Friend or Family</SelectItem>
                      <SelectItem value="doctor">Doctor/Healthcare Provider</SelectItem>
                      <SelectItem value="senior-center">Senior Center</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="newspaper">Newspaper/Magazine</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="w-6 h-6 mt-0.5 border-2"
                    style={{ borderColor: '#9CA3AF' }}
                    required
                  />
                  <Label htmlFor="terms" className="text-[16px] cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                </div>
              </div>
            )}

            {/* CAREGIVER FORM */}
            {selectedUserType === 'caregiver' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
                    Your Information
                  </h3>
                  <div className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="h-14 text-[18px]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="h-14 text-[18px]"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 text-[18px]"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-14 text-[18px]"
                        placeholder="(808) 555-1234"
                        required
                      />
                    </div>

                    {/* Relationship */}
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship to senior *</Label>
                      <Select value={relationship} onValueChange={setRelationship}>
                        <SelectTrigger className="h-14 text-[18px] border-2 border-gray-300 hover:border-[#2D9596] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596] focus:ring-opacity-20">
                          <SelectValue placeholder="Select one..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daughter">Daughter</SelectItem>
                          <SelectItem value="son">Son</SelectItem>
                          <SelectItem value="grandchild">Grandchild</SelectItem>
                          <SelectItem value="niece-nephew">Niece/Nephew</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="professional">Professional Caregiver</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Password Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 pr-12 text-[18px]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-14 pr-12 text-[18px]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Senior&apos;s Information
                  </h3>
                  <p className="text-[14px] mb-4" style={{ color: '#6B7280' }}>
                    The person you&apos;re arranging support for
                  </p>
                  <div className="space-y-4">
                    {/* Senior Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="seniorFirstName">Their First Name *</Label>
                        <Input
                          id="seniorFirstName"
                          value={seniorFirstName}
                          onChange={(e) => setSeniorFirstName(e.target.value)}
                          className="h-14 text-[18px]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seniorLastName">Their Last Name *</Label>
                        <Input
                          id="seniorLastName"
                          value={seniorLastName}
                          onChange={(e) => setSeniorLastName(e.target.value)}
                          className="h-14 text-[18px]"
                          required
                        />
                      </div>
                    </div>

                    {/* Senior Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="seniorPhone">Their Phone Number *</Label>
                      <Input
                        id="seniorPhone"
                        type="tel"
                        value={seniorPhone}
                        onChange={(e) => setSeniorPhone(e.target.value)}
                        className="h-14 text-[18px]"
                        placeholder="(808) 555-1234"
                        required
                      />
                    </div>

                    {/* Senior Email */}
                    <div className="space-y-2">
                      <Label htmlFor="seniorEmail">Their Email (optional)</Label>
                      <Input
                        id="seniorEmail"
                        type="email"
                        value={seniorEmail}
                        onChange={(e) => setSeniorEmail(e.target.value)}
                        className="h-14 text-[18px]"
                      />
                    </div>
                  </div>
                </div>

                {/* How did you hear */}
                <div className="space-y-2">
                  <Label htmlFor="hearAbout">How did you hear about us? *</Label>
                  <Select value={hearAbout} onValueChange={setHearAbout}>
                    <SelectTrigger className="h-14 text-[18px] border-2 border-gray-300 hover:border-[#2D9596] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596] focus:ring-opacity-20">
                      <SelectValue placeholder="Select one..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="friend">Friend or Family</SelectItem>
                      <SelectItem value="doctor">Doctor/Healthcare Provider</SelectItem>
                      <SelectItem value="senior-center">Senior Center</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="newspaper">Newspaper/Magazine</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                    className="w-6 h-6 mt-0.5 border-2"
                    style={{ borderColor: '#9CA3AF' }}
                    required
                  />
                  <Label htmlFor="consent" className="text-[16px] cursor-pointer">
                    My loved one knows I am creating this account and consents to me helping arrange their technology support *
                  </Label>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="w-6 h-6 mt-0.5 border-2"
                    style={{ borderColor: '#9CA3AF' }}
                    required
                  />
                  <Label htmlFor="terms" className="text-[16px] cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                </div>

                {/* Note about confirmation */}
                <div className="rounded-lg p-4" style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}>
                  <p className="text-[16px]" style={{ color: '#92400E' }}>
                    📧 After registration, your loved one will receive a confirmation email/call and must grant you permission to access their session information and progress.
                  </p>
                </div>
              </div>
            )}

            {/* ORGANIZATION FORM */}
            {selectedUserType === 'organization' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
                    Organization Information
                  </h3>
                  <div className="space-y-4">
                    {/* Organization Name */}
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="h-14 text-[18px]"
                        required
                      />
                    </div>

                    {/* Organization Type */}
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type *</Label>
                      <Select value={orgType} onValueChange={setOrgType}>
                        <SelectTrigger className="h-14 text-[18px] border-2 border-gray-300 hover:border-[#2D9596] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596] focus:ring-opacity-20">
                          <SelectValue placeholder="Select one..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="senior-living">Senior Living Facility</SelectItem>
                          <SelectItem value="assisted-living">Assisted Living</SelectItem>
                          <SelectItem value="retirement">Retirement Community</SelectItem>
                          <SelectItem value="senior-center">Senior Center</SelectItem>
                          <SelectItem value="community-center">Community Center</SelectItem>
                          <SelectItem value="library">Library</SelectItem>
                          <SelectItem value="healthcare">Healthcare Organization</SelectItem>
                          <SelectItem value="hospice">Hospice/Palliative Care</SelectItem>
                          <SelectItem value="faith">Church or Faith-Based Organization</SelectItem>
                          <SelectItem value="ccrc">CCRC (Continuing Care Retirement Community)</SelectItem>
                          <SelectItem value="memory-care">Memory Care Facility</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Your Contact Information
                  </h3>
                  <p className="text-[14px] mb-4" style={{ color: '#6B7280' }}>
                    Primary contact for workshop coordination
                  </p>
                  <div className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Your First Name *</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="h-14 text-[18px]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Your Last Name *</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="h-14 text-[18px]"
                          required
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Your Title/Role *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-14 text-[18px]"
                        placeholder="e.g., Activities Director, Program Coordinator"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 text-[18px]"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Your Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-14 text-[18px]"
                        placeholder="(808) 555-1234"
                        required
                      />
                    </div>

                    {/* Password Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 pr-12 text-[18px]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-14 pr-12 text-[18px]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold mb-4" style={{ color: '#265073' }}>
                    Facility Details
                  </h3>
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-14 text-[18px]"
                        required
                      />
                    </div>

                    {/* City and Zip */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-14 text-[18px]"
                          placeholder="Should be on Oahu"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code *</Label>
                        <Input
                          id="zipCode"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="h-14 text-[18px]"
                          required
                        />
                      </div>
                    </div>

                    {/* Number of Residents */}
                    <div className="space-y-2">
                      <Label htmlFor="numResidents">Approximate Number of Residents/Members *</Label>
                      <Select value={numResidents} onValueChange={setNumResidents}>
                        <SelectTrigger className="h-14 text-[18px] border-2 border-gray-300 hover:border-[#2D9596] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596] focus:ring-opacity-20">
                          <SelectValue placeholder="Select one..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1-50</SelectItem>
                          <SelectItem value="51-100">51-100</SelectItem>
                          <SelectItem value="101-200">101-200</SelectItem>
                          <SelectItem value="201-500">201-500</SelectItem>
                          <SelectItem value="500+">500+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    What services interest you?
                  </h3>
                  <p className="text-[14px] mb-4" style={{ color: '#6B7280' }}>
                    Select all that apply
                  </p>
                  <div className="space-y-3">
                    {[
                      'Free scam prevention workshops for our community',
                      'Paid skill-building classes for residents',
                      'Regular monthly workshop series',
                      'Individual resident support program',
                      'Private group classes',
                      'Custom training solutions',
                      'Not sure yet - just exploring options'
                    ].map((service) => (
                      <div key={service} className="flex items-start gap-3">
                        <Checkbox
                          id={service}
                          checked={servicesInterest.includes(service)}
                          onCheckedChange={() => handleServiceInterestToggle(service)}
                          className="w-6 h-6 mt-0.5 border-2"
                          style={{ borderColor: '#9CA3AF' }}
                        />
                        <Label htmlFor={service} className="text-[16px] cursor-pointer">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How did you hear */}
                <div className="space-y-2">
                  <Label htmlFor="hearAbout">How did you hear about us? *</Label>
                  <Select value={hearAbout} onValueChange={setHearAbout}>
                    <SelectTrigger className="h-14 text-[18px] border-2 border-gray-300 hover:border-[#2D9596] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596] focus:ring-opacity-20">
                      <SelectValue placeholder="Select one..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="referral">Referral from another organization</SelectItem>
                      <SelectItem value="conference">Conference or Event</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="newspaper">Newspaper/Magazine</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Authority Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="authority"
                    checked={authorityChecked}
                    onCheckedChange={(checked) => setAuthorityChecked(checked as boolean)}
                    className="w-6 h-6 mt-0.5 border-2"
                    style={{ borderColor: '#9CA3AF' }}
                    required
                  />
                  <Label htmlFor="authority" className="text-[16px] cursor-pointer">
                    I have authority to arrange programming/services for this organization *
                  </Label>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="w-6 h-6 mt-0.5 border-2"
                    style={{ borderColor: '#9CA3AF' }}
                    required
                  />
                  <Label htmlFor="terms" className="text-[16px] cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                </div>

                {/* Note about follow-up */}
                <div className="rounded-lg p-4" style={{ background: '#E6F4FF', border: '2px solid #3B82F6' }}>
                  <p className="text-[16px]" style={{ color: '#1E40AF' }}>
                    📞 We&apos;ll contact you within 48 hours to discuss partnership options, availability, and pricing. No commitment required.
                  </p>
                </div>
              </div>
            )}

            {/* Create Account Button */}
            <Button
              type="submit"
              className="w-full h-14 text-[18px] font-semibold"
              style={{ background: '#2D9596', color: '#FFFFFF' }}
            >
              Create Account
            </Button>

            {/* Login Link */}
            <p className="text-center text-[16px]" style={{ color: '#4B5563' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="font-semibold hover:underline"
                style={{ color: '#2D9596' }}
              >
                Login here
              </button>
            </p>

            {/* Return to Home */}
            {onNavigate && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="w-full text-center text-[18px] hover:underline"
                  style={{ color: '#6B7280' }}
                >
                  ← Return to Home
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN - Trust Indicators */}
      <div 
        className="hidden lg:flex lg:w-1/2 items-start justify-center p-12 min-h-screen sticky top-0"
        style={{ 
          background: '#4DB8A8'
        }}
      >
        <div className="max-w-lg space-y-8">
          {/* Hero Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full flex items-center justify-center text-6xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
              📱
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[32px] font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Join hundreds of kūpuna building digital confidence
            </h2>
            <p className="text-[20px]" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Patient support, ongoing learning, and peace of mind.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-6 mt-12">
            {/* Card 1 */}
            <div className="rounded-xl p-8 shadow-lg" style={{ background: '#FFFFFF' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#E6F7F4' }}>
                    <Check className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Start with a free consultation
                  </h3>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>
                    Talk with us before committing to anything
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl p-8 shadow-lg" style={{ background: '#FFFFFF' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#E6F7F4' }}>
                    <Check className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Cancel anytime - No contracts
                  </h3>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>
                    Complete flexibility, no long-term commitment
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl p-8 shadow-lg" style={{ background: '#FFFFFF' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#E6F7F4' }}>
                    <Check className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Patient, judgment-free support
                  </h3>
                  <p className="text-[16px]" style={{ color: '#6B7280' }}>
                    Learn at your own pace, never rushed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Note */}
          <div className="rounded-lg p-4 mt-8" style={{ background: '#E6F4FF', border: '2px solid #3B82F6' }}>
            <p className="text-[16px] text-center" style={{ color: '#1E40AF' }}>
              🎨 <strong>Demo Mode:</strong> Any email/password combination will work. Select your account type to explore different dashboards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
