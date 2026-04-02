// ===== User & Auth =====
export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  school: string | null;
  age: number | null;
  xp: number;
  level: number;
  created_at: string;
}

// ===== Lessons =====
export type LessonLanguage = "html" | "css" | "javascript" | "python";
export type LessonDifficulty = "beginner" | "intermediate";
export type LessonStatus = "not_started" | "in_progress" | "completed";

export interface Lesson {
  id: number;
  module: number;
  order_num: number;
  title_az: string;
  description_az: string;
  content: LessonContent;
  language: LessonLanguage;
  xp_reward: number;
  difficulty: LessonDifficulty;
}

export interface LessonContent {
  sections: LessonSection[];
  starter_code: string;
  expected_output?: string;
}

export interface LessonSection {
  type: "text" | "code" | "hint";
  content: string;
}

export interface LessonProgress {
  id: number;
  user_id: string;
  lesson_id: number;
  status: LessonStatus;
  code: string | null;
  completed_at: string | null;
}

// ===== Quizzes =====
export interface Quiz {
  id: number;
  module: number;
  title_az: string;
  time_limit: number;
}

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  question_az: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizResult {
  id: number;
  user_id: string;
  quiz_id: number;
  score: number;
  total: number;
  xp_earned: number;
  completed_at: string;
}

// ===== Gamification =====
export interface Badge {
  id: number;
  name_az: string;
  description: string;
  icon_url: string;
  criteria: BadgeCriteria;
}

export interface BadgeCriteria {
  type: "lessons_completed" | "quiz_perfect" | "streak" | "all_lessons";
  count?: number;
}

export interface UserBadge {
  id: number;
  user_id: string;
  badge_id: number;
  earned_at: string;
  badge?: Badge;
}

// ===== Gamification Constants =====
export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  QUIZ_BASE: 20,
  QUIZ_PERFECT: 100,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 5,
} as const;

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title_az: "Yeni Başlayan" },
  { level: 2, xp: 100, title_az: "Kod Kəşfçisi" },
  { level: 3, xp: 300, title_az: "Proqramçı Şagird" },
  { level: 4, xp: 600, title_az: "Veb Ustası" },
  { level: 5, xp: 1000, title_az: "Kod Sehrbazı" },
] as const;

// ===== Modules =====
export const MODULES = [
  { id: 1, title_az: "Kompüterlər və Məntiq", icon: "💻", lessons: 5 },
  { id: 2, title_az: "HTML & CSS", icon: "🌐", lessons: 5 },
  { id: 3, title_az: "JavaScript Əsasları", icon: "⚡", lessons: 5 },
  { id: 4, title_az: "Python Giriş", icon: "🐍", lessons: 5 },
] as const;
