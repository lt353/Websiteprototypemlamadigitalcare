import { useState } from 'react';
import { Star, CheckCircle, Download, ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface PostSessionScreenProps {
  instructorName?: string;
  sessionDate?: string;
  sessionTime?: string;
  sessionDuration?: string;
  onReturnToDashboard: () => void;
}

export function PostSessionScreen({
  instructorName = 'Tea Araki',
  sessionDate = 'Nov 28',
  sessionTime = '2:00 PM',
  sessionDuration = '45 minutes',
  onReturnToDashboard
}: PostSessionScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    if (rating > 0) {
      setSubmitted(true);
      // In production, this would save feedback to database
      setTimeout(() => {
        onReturnToDashboard();
      }, 2000);
    }
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: '#F9FAFB' }}
    >
      <div className="w-full max-w-3xl">
        {!submitted ? (
          <>
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: '#2D9596' }}
                >
                  <CheckCircle className="w-12 h-12" style={{ color: '#FFFFFF' }} />
                </div>
              </div>
              <h1 
                className="mb-3"
                style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  color: '#265073',
                  lineHeight: '1.2'
                }}
              >
                Session Complete!
              </h1>
              <p style={{ fontSize: '18px', color: '#6B7280' }}>
                Thank you for joining your session with {instructorName}
              </p>
            </div>

            {/* Session Summary Card */}
            <div 
              className="p-8 rounded-xl mb-6"
              style={{ 
                background: '#FFFFFF',
                border: '2px solid #E5E7EB',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h2 
                className="mb-6"
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#265073' 
                }}
              >
                Session Summary
              </h2>

              <div className="space-y-4 mb-6">
                {/* Instructor */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E6F7F4' }}
                  >
                    <User className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                      Instructor
                    </p>
                    <p style={{ fontSize: '18px', color: '#265073', fontWeight: '600' }}>
                      {instructorName}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E6F7F4' }}
                  >
                    <Calendar className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                      Date & Time
                    </p>
                    <p style={{ fontSize: '18px', color: '#265073', fontWeight: '600' }}>
                      {sessionDate}, {sessionTime}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E6F7F4' }}
                  >
                    <Clock className="w-6 h-6" style={{ color: '#2D9596' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                      Duration
                    </p>
                    <p style={{ fontSize: '18px', color: '#265073', fontWeight: '600' }}>
                      {sessionDuration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Topics Covered */}
              <div 
                className="p-6 rounded-lg mb-6"
                style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
              >
                <h3 
                  className="mb-4"
                  style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    color: '#265073' 
                  }}
                >
                  Topics Covered:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span style={{ color: '#2D9596', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                    <span style={{ fontSize: '16px', color: '#6B7280' }}>
                      Email Management Best Practices
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span style={{ color: '#2D9596', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                    <span style={{ fontSize: '16px', color: '#6B7280' }}>
                      Setting Up Two-Factor Authentication
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span style={{ color: '#2D9596', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                    <span style={{ fontSize: '16px', color: '#6B7280' }}>
                      Password Security Tips
                    </span>
                  </li>
                </ul>
              </div>

              {/* Print Summary Button */}
              <button
                onClick={handlePrintSummary}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg transition-all border-2"
                style={{ 
                  background: '#FFFFFF',
                  borderColor: '#2D9596',
                  color: '#2D9596',
                  fontSize: '16px',
                  fontWeight: '600',
                  height: '48px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E6F7F4';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download className="w-5 h-5" />
                <span>Print Session Summary</span>
              </button>
            </div>

            {/* Rating Section */}
            <div 
              className="p-8 rounded-xl mb-6"
              style={{ 
                background: '#FFFFFF',
                border: '2px solid #E5E7EB',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h2 
                className="mb-4 text-center"
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#265073' 
                }}
              >
                How was your session?
              </h2>
              <p 
                className="text-center mb-6"
                style={{ fontSize: '16px', color: '#6B7280' }}
              >
                Your feedback helps us improve your experience
              </p>

              {/* Star Rating */}
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      minWidth: '44px',
                      minHeight: '44px'
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.9)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                  >
                    <Star
                      className="w-12 h-12 transition-all"
                      style={{
                        color: (hoveredRating || rating) >= star ? '#F59E0B' : '#D1D5DB',
                        fill: (hoveredRating || rating) >= star ? '#F59E0B' : 'transparent',
                        strokeWidth: 2
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Rating Text */}
              {rating > 0 && (
                <p 
                  className="text-center mb-6"
                  style={{ 
                    fontSize: '18px', 
                    color: '#2D9596',
                    fontWeight: '600'
                  }}
                >
                  {rating === 5 && "Excellent! We're so glad you had a great session!"}
                  {rating === 4 && "Great! Thank you for the positive feedback!"}
                  {rating === 3 && "Good! We'll work to make it even better next time."}
                  {rating === 2 && "Thank you for your feedback. We'll do better."}
                  {rating === 1 && "We're sorry. Please let us know how we can improve."}
                </p>
              )}

              {/* Feedback Textarea */}
              <div className="mb-6">
                <label 
                  htmlFor="feedback"
                  className="block mb-3"
                  style={{ 
                    fontSize: '16px', 
                    color: '#265073',
                    fontWeight: '600'
                  }}
                >
                  Additional Comments (Optional):
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts about the session..."
                  className="w-full p-4 rounded-lg resize-none"
                  style={{
                    background: '#F9FAFB',
                    border: '2px solid #E5E7EB',
                    fontSize: '16px',
                    color: '#265073',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2D9596';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#F9FAFB';
                  }}
                />
              </div>

              {/* Submit Feedback Button */}
              <button
                onClick={handleSubmitFeedback}
                disabled={rating === 0}
                className="w-full flex items-center justify-center gap-3 transition-all"
                style={{
                  background: rating > 0 ? '#2D9596' : '#D1D5DB',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  height: '56px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: rating > 0 ? 'pointer' : 'not-allowed',
                  boxShadow: rating > 0 ? '0 4px 12px rgba(45, 149, 150, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (rating > 0) {
                    e.currentTarget.style.background = '#257D7E';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 149, 150, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (rating > 0) {
                    e.currentTarget.style.background = '#2D9596';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 149, 150, 0.3)';
                  }
                }}
                onMouseDown={(e) => {
                  if (rating > 0) {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                onMouseUp={(e) => {
                  if (rating > 0) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
              >
                <span>Submit Feedback & Return to Dashboard</span>
              </button>
            </div>

            {/* Skip Button */}
            <div className="text-center">
              <button
                onClick={onReturnToDashboard}
                className="transition-all"
                style={{
                  background: 'transparent',
                  color: '#6B7280',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px 24px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#265073';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6B7280';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Skip for now
              </button>
            </div>
          </>
        ) : (
          /* Thank You Message */
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: '#10B981' }}
              >
                <CheckCircle className="w-16 h-16" style={{ color: '#FFFFFF' }} />
              </div>
            </div>
            <h1 
              className="mb-4"
              style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#265073'
              }}
            >
              Mahalo! 🌺
            </h1>
            <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '24px' }}>
              Your feedback has been submitted successfully
            </p>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>
              Returning to dashboard...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
