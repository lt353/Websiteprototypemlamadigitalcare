import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Trophy, 
  Star, 
  Award, 
  TrendingUp, 
  Calendar,
  Flame,
  CheckCircle2,
  Target,
  BookOpen,
  Video,
  Mail,
  Smartphone,
  Lock,
  CreditCard,
  MessageSquare,
  Download,
  ArrowRight
} from 'lucide-react';

interface ProgressDashboardProps {
  userName?: string;
  onNavigateToLearning?: () => void;
}

export function ProgressDashboard({ userName = "Mary", onNavigateToLearning }: ProgressDashboardProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // User progress data
  const userStats = {
    totalSessions: 12,
    hoursLearned: 9.5,
    currentStreak: 5,
    longestStreak: 8,
    achievementsUnlocked: 6,
    totalAchievements: 15
  };

  // Skills progress
  const skills = [
    { 
      id: 'email', 
      name: 'Email Basics', 
      icon: Mail, 
      progress: 85, 
      level: 'Advanced',
      sessionsCompleted: 4,
      totalSessions: 5,
      color: '#2D9596'
    },
    { 
      id: 'video', 
      name: 'Video Calling', 
      icon: Video, 
      progress: 60, 
      level: 'Intermediate',
      sessionsCompleted: 3,
      totalSessions: 5,
      color: '#F59E0B'
    },
    { 
      id: 'phone', 
      name: 'Smartphone Use', 
      icon: Smartphone, 
      progress: 75, 
      level: 'Intermediate',
      sessionsCompleted: 3,
      totalSessions: 4,
      color: '#2563EB'
    },
    { 
      id: 'security', 
      name: 'Online Safety', 
      icon: Lock, 
      progress: 40, 
      level: 'Beginner',
      sessionsCompleted: 2,
      totalSessions: 5,
      color: '#DC2626'
    },
    { 
      id: 'banking', 
      name: 'Online Banking', 
      icon: CreditCard, 
      progress: 20, 
      level: 'Beginner',
      sessionsCompleted: 1,
      totalSessions: 5,
      color: '#7C3AED'
    }
  ];

  // Achievements
  const achievements = [
    { 
      id: 1, 
      title: 'First Step', 
      description: 'Complete your first session',
      icon: '🌱',
      unlocked: true,
      unlockedDate: 'Oct 15, 2025'
    },
    { 
      id: 2, 
      title: 'Email Expert', 
      description: 'Master email basics',
      icon: '📧',
      unlocked: true,
      unlockedDate: 'Nov 2, 2025'
    },
    { 
      id: 3, 
      title: 'Video Pro', 
      description: 'Make 5 video calls',
      icon: '📹',
      unlocked: true,
      unlockedDate: 'Nov 8, 2025'
    },
    { 
      id: 4, 
      title: 'Consistent Learner', 
      description: '5-day learning streak',
      icon: '🔥',
      unlocked: true,
      unlockedDate: 'Nov 18, 2025'
    },
    { 
      id: 5, 
      title: 'Safety First', 
      description: 'Identify 10 scams correctly',
      icon: '🛡️',
      unlocked: true,
      unlockedDate: 'Nov 20, 2025'
    },
    { 
      id: 6, 
      title: 'Tech Helper', 
      description: 'Help another senior with tech',
      icon: '🤝',
      unlocked: true,
      unlockedDate: 'Nov 21, 2025'
    },
    { 
      id: 7, 
      title: 'Week Warrior', 
      description: '7-day learning streak',
      icon: '⚡',
      unlocked: false
    },
    { 
      id: 8, 
      title: 'Social Butterfly', 
      description: 'Join 3 group workshops',
      icon: '🦋',
      unlocked: false
    },
    { 
      id: 9, 
      title: 'Banking Boss', 
      description: 'Complete online banking course',
      icon: '💰',
      unlocked: false
    }
  ];

  const recentActivity = [
    { date: 'Nov 21', activity: 'Completed: Email Management Session', type: 'session' },
    { date: 'Nov 21', activity: 'Achievement Unlocked: Tech Helper 🤝', type: 'achievement' },
    { date: 'Nov 18', activity: 'Completed: Video Calling Basics', type: 'session' },
    { date: 'Nov 18', activity: 'Achievement Unlocked: Consistent Learner 🔥', type: 'achievement' }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] md:text-[36px] font-bold mb-2" style={{ color: '#265073' }}>
            Your Learning Journey
          </h1>
          <p className="text-[16px] md:text-[18px]" style={{ color: '#6B7280' }}>
            Track your progress and celebrate your achievements, {userName}! 🌺
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8" style={{ color: '#2D9596' }} />
                <Badge style={{ background: '#E6F7F4', color: '#2D9596' }}>Total</Badge>
              </div>
              <p className="text-[28px] md:text-[36px] font-bold" style={{ color: '#265073' }}>
                {userStats.totalSessions}
              </p>
              <p className="text-[14px] md:text-[16px]" style={{ color: '#6B7280' }}>
                Sessions Completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8" style={{ color: '#F59E0B' }} />
                <Badge style={{ background: '#FEF3C7', color: '#92400E' }}>Streak</Badge>
              </div>
              <p className="text-[28px] md:text-[36px] font-bold" style={{ color: '#265073' }}>
                {userStats.currentStreak}
              </p>
              <p className="text-[14px] md:text-[16px]" style={{ color: '#6B7280' }}>
                Days in a Row
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8" style={{ color: '#F59E0B' }} />
                <Badge style={{ background: '#FEF3C7', color: '#92400E' }}>
                  {userStats.achievementsUnlocked}/{userStats.totalAchievements}
                </Badge>
              </div>
              <p className="text-[28px] md:text-[36px] font-bold" style={{ color: '#265073' }}>
                {userStats.achievementsUnlocked}
              </p>
              <p className="text-[14px] md:text-[16px]" style={{ color: '#6B7280' }}>
                Achievements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8" style={{ color: '#16A34A' }} />
                <Badge style={{ background: '#D1FAE5', color: '#065F46' }}>Hours</Badge>
              </div>
              <p className="text-[28px] md:text-[36px] font-bold" style={{ color: '#265073' }}>
                {userStats.hoursLearned}
              </p>
              <p className="text-[14px] md:text-[16px]" style={{ color: '#6B7280' }}>
                Hours Learning
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Skills Progress */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[20px] md:text-[24px]">Your Skills</CardTitle>
                  <Button
                    onClick={onNavigateToLearning}
                    style={{ background: '#2D9596', color: '#FFFFFF' }}
                    className="text-[14px] md:text-[16px]"
                  >
                    Continue Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div 
                      key={skill.id}
                      className="cursor-pointer transition-all hover:bg-gray-50 p-4 rounded-lg -mx-4"
                      onClick={() => setSelectedSkill(skill.id === selectedSkill ? null : skill.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${skill.color}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: skill.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-[18px] md:text-[20px] font-bold" style={{ color: '#265073' }}>
                                {skill.name}
                              </h3>
                              <p className="text-[14px]" style={{ color: '#6B7280' }}>
                                {skill.sessionsCompleted} of {skill.totalSessions} sessions completed
                              </p>
                            </div>
                            <Badge 
                              style={{ 
                                background: skill.progress >= 70 ? '#D1FAE5' : skill.progress >= 40 ? '#FEF3C7' : '#FEE2E2',
                                color: skill.progress >= 70 ? '#065F46' : skill.progress >= 40 ? '#92400E' : '#991B1B'
                              }}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[14px]" style={{ color: '#6B7280' }}>Progress</span>
                              <span className="text-[16px] font-bold" style={{ color: skill.color }}>
                                {skill.progress}%
                              </span>
                            </div>
                            <Progress value={skill.progress} className="h-3" />
                          </div>

                          {selectedSkill === skill.id && (
                            <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                              <p className="text-[14px] mb-3" style={{ color: '#6B7280' }}>
                                Next session: {skill.name} Advanced Techniques
                              </p>
                              <Button
                                onClick={onNavigateToLearning}
                                variant="outline"
                                className="w-full"
                                style={{ borderColor: skill.color, color: skill.color }}
                              >
                                Book Next Session
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg"
                      style={{ background: '#F9FAFB' }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ 
                          background: item.type === 'achievement' ? '#FEF3C7' : '#E6F7F4'
                        }}
                      >
                        {item.type === 'achievement' ? (
                          <Trophy className="w-5 h-5" style={{ color: '#F59E0B' }} />
                        ) : (
                          <CheckCircle2 className="w-5 h-5" style={{ color: '#2D9596' }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-[16px] font-semibold" style={{ color: '#265073' }}>
                          {item.activity}
                        </p>
                        <p className="text-[14px]" style={{ color: '#6B7280' }}>
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-[20px] md:text-[24px] flex items-center gap-2">
                  <Award className="w-6 h-6" style={{ color: '#F59E0B' }} />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.unlocked ? 'cursor-pointer hover:shadow-md' : ''
                      }`}
                      style={{
                        background: achievement.unlocked ? '#FFFFFF' : '#F9FAFB',
                        borderColor: achievement.unlocked ? '#2D9596' : '#E5E7EB',
                        opacity: achievement.unlocked ? 1 : 0.6
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="text-[32px] flex-shrink-0"
                          style={{ 
                            filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
                          }}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[16px] font-bold mb-1" style={{ color: '#265073' }}>
                            {achievement.title}
                          </h4>
                          <p className="text-[13px] mb-2" style={{ color: '#6B7280' }}>
                            {achievement.description}
                          </p>
                          {achievement.unlocked && achievement.unlockedDate && (
                            <Badge 
                              className="text-[11px]"
                              style={{ background: '#D1FAE5', color: '#065F46' }}
                            >
                              Unlocked {achievement.unlockedDate}
                            </Badge>
                          )}
                          {!achievement.unlocked && (
                            <Badge 
                              className="text-[11px]"
                              style={{ background: '#E5E7EB', color: '#6B7280' }}
                            >
                              🔒 Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Motivational Card */}
            <Card className="mt-6" style={{ background: '#E6F7F4', borderColor: '#2D9596' }}>
              <CardContent className="p-6">
                <div className="text-center">
                  <Star className="w-12 h-12 mx-auto mb-3" style={{ color: '#F59E0B' }} />
                  <h3 className="text-[20px] font-bold mb-2" style={{ color: '#265073' }}>
                    Keep It Up!
                  </h3>
                  <p className="text-[16px] mb-4" style={{ color: '#4B5563' }}>
                    You're just 2 days away from a 7-day streak! 🔥
                  </p>
                  <Button
                    onClick={onNavigateToLearning}
                    className="w-full"
                    style={{ background: '#2D9596', color: '#FFFFFF' }}
                  >
                    Book Next Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}