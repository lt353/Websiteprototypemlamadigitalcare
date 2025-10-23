import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { X, ChevronRight, Undo2, Check } from 'lucide-react';
import { Student } from './TeacherRouter';
import { getIssuesForClass, getSubIssuesForDevice, IssueCategory } from './classIssuesData';

interface TrackedIssue {
  categoryId: string;
  categoryLabel: string;
  subIssue: string;
  timestamp: Date;
}

interface IssueTrackingPanelProps {
  student: Student;
  classTopic: string;
  existingIssues: TrackedIssue[];
  onClose: () => void;
  onAddIssue: (issue: TrackedIssue) => void;
}

type SelectionMode = 'category' | 'sub-issue';

export function IssueTrackingPanel({
  student,
  classTopic,
  existingIssues,
  onClose,
  onAddIssue
}: IssueTrackingPanelProps) {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('category');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | null>(null);
  const [recentActions, setRecentActions] = useState<TrackedIssue[]>([]);

  const categories = getIssuesForClass(classTopic);

  // Reset to category selection when student changes
  useEffect(() => {
    setSelectionMode('category');
    setSelectedCategory(null);
  }, [student.id]);

  const handleCategorySelect = (category: IssueCategory) => {
    setSelectedCategory(category);
    setSelectionMode('sub-issue');
  };

  const handleSubIssueSelect = (subIssue: string) => {
    if (!selectedCategory) return;

    const newIssue: TrackedIssue = {
      categoryId: selectedCategory.id,
      categoryLabel: selectedCategory.label,
      subIssue,
      timestamp: new Date()
    };

    onAddIssue(newIssue);
    setRecentActions([newIssue, ...recentActions.slice(0, 4)]); // Keep last 5

    // Visual feedback - quick flash
    const button = document.querySelector(`[data-sub-issue="${subIssue}"]`);
    if (button) {
      button.classList.add('scale-95');
      setTimeout(() => {
        button.classList.remove('scale-95');
      }, 150);
    }

    // Reset to category selection for next issue
    setSelectionMode('category');
    setSelectedCategory(null);
  };

  const handleBack = () => {
    if (selectionMode === 'sub-issue') {
      setSelectionMode('category');
      setSelectedCategory(null);
    } else {
      onClose();
    }
  };

  const handleUndo = () => {
    if (recentActions.length > 0) {
      // This would need to be implemented with a proper undo mechanism
      // For now, just remove from recent actions
      setRecentActions(recentActions.slice(1));
    }
  };

  const subIssues = selectedCategory
    ? getSubIssuesForDevice(selectedCategory, student.deviceType)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-h-[85vh] rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up"
        style={{ background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-6 py-4 border-b"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB'
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" style={{ color: '#6B7280' }} />
            </button>
            {recentActions.length > 0 && (
              <button
                onClick={handleUndo}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Undo2 className="w-5 h-5" style={{ color: '#6B7280' }} />
                <span className="text-[14px] font-medium" style={{ color: '#6B7280' }}>
                  Undo
                </span>
              </button>
            )}
          </div>
          <h2 className="text-[24px] font-bold" style={{ color: '#265073' }}>
            {student.name}
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[16px]" style={{ color: '#6B7280' }}>
              {student.deviceType}
            </span>
            <span style={{ color: '#E5E7EB' }}>•</span>
            <span className="text-[16px]" style={{ color: '#6B7280' }}>
              {existingIssues.length} issue{existingIssues.length !== 1 ? 's' : ''} tracked
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-3" style={{ background: '#F9FAFB' }}>
          <div className="flex items-center gap-2">
            <div
              className="flex-1 h-1.5 rounded-full"
              style={{
                background: selectionMode === 'category' ? '#2D9596' : '#E5E7EB'
              }}
            />
            <div
              className="flex-1 h-1.5 rounded-full"
              style={{
                background: selectionMode === 'sub-issue' ? '#2D9596' : '#E5E7EB'
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span
              className="text-[12px] font-medium"
              style={{ color: selectionMode === 'category' ? '#2D9596' : '#9CA3AF' }}
            >
              Select Category
            </span>
            <span
              className="text-[12px] font-medium"
              style={{ color: selectionMode === 'sub-issue' ? '#2D9596' : '#9CA3AF' }}
            >
              Select Issue
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 200px)' }}>
          {selectionMode === 'category' ? (
            /* Category Selection */
            <div className="px-6 py-4">
              <h3 className="text-[18px] font-semibold mb-4" style={{ color: '#265073' }}>
                What area did they need help with?
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:shadow-md active:scale-98"
                    style={{
                      background: '#FFFFFF',
                      borderColor: '#E5E7EB'
                    }}
                  >
                    <span className="text-[18px] font-medium text-left" style={{ color: '#265073' }}>
                      {category.label}
                    </span>
                    <ChevronRight className="w-6 h-6" style={{ color: '#9CA3AF' }} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Sub-Issue Selection */
            <div className="px-6 py-4">
              <div className="mb-4">
                <button
                  onClick={() => {
                    setSelectionMode('category');
                    setSelectedCategory(null);
                  }}
                  className="text-[14px] hover:underline"
                  style={{ color: '#2D9596' }}
                >
                  ← Back to categories
                </button>
                <h3 className="text-[18px] font-semibold mt-2" style={{ color: '#265073' }}>
                  {selectedCategory?.label}
                </h3>
                <p className="text-[14px] mt-1" style={{ color: '#6B7280' }}>
                  Select the specific issue:
                </p>
              </div>
              <div className="space-y-3">
                {subIssues.map((subIssue, index) => {
                  const isTracked = existingIssues.some(
                    (issue) =>
                      issue.categoryId === selectedCategory?.id &&
                      issue.subIssue === subIssue
                  );

                  return (
                    <button
                      key={index}
                      data-sub-issue={subIssue}
                      onClick={() => handleSubIssueSelect(subIssue)}
                      disabled={isTracked}
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: isTracked ? '#F3F4F6' : '#FFFFFF',
                        borderColor: isTracked ? '#9CA3AF' : '#E5E7EB'
                      }}
                    >
                      <span
                        className="text-[16px] text-left"
                        style={{ color: isTracked ? '#9CA3AF' : '#265073' }}
                      >
                        {subIssue}
                      </span>
                      {isTracked && (
                        <Check className="w-5 h-5" style={{ color: '#16A34A' }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}