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

// Public lesson catalog — visible on the marketing page even when logged out.
export const LESSON_CATALOG: { id: number; module: number; title_az: string; title_en: string }[] = [
  { id: 1, module: 1, title_az: "Kompüter necə işləyir?", title_en: "How does a computer work?" },
  { id: 2, module: 1, title_az: "İnternet və veb səhifələr", title_en: "Internet and web pages" },
  { id: 3, module: 1, title_az: "Məntiq və alqoritmlər", title_en: "Logic and algorithms" },
  { id: 4, module: 1, title_az: "İlk kodunuz: \"Salam, Dünya!\"", title_en: "Your first code: \"Hello, World!\"" },
  { id: 5, module: 1, title_az: "Dəyişənlər və verilən tipləri", title_en: "Variables and data types" },
  { id: 6, module: 2, title_az: "HTML nədir? İlk səhifəniz", title_en: "What is HTML? Your first page" },
  { id: 7, module: 2, title_az: "Başlıqlar, paraqraflar, siyahılar", title_en: "Headings, paragraphs, lists" },
  { id: 8, module: 2, title_az: "Şəkillər və keçidlər", title_en: "Images and links" },
  { id: 9, module: 2, title_az: "CSS ilə rəngləndirmə", title_en: "Styling with CSS" },
  { id: 10, module: 2, title_az: "Öz veb səhifənizi yaradın", title_en: "Create your own web page" },
  { id: 11, module: 3, title_az: "JavaScript nədir?", title_en: "What is JavaScript?" },
  { id: 12, module: 3, title_az: "Dəyişənlər və operatorlar", title_en: "Variables and operators" },
  { id: 13, module: 3, title_az: "Şərtlər (if/else)", title_en: "Conditions (if/else)" },
  { id: 14, module: 3, title_az: "Dövrlər (for, while)", title_en: "Loops (for, while)" },
  { id: 15, module: 3, title_az: "Funksiyalar və hadisələr", title_en: "Functions and events" },
  { id: 16, module: 4, title_az: "Python nədir? Niyə Python?", title_en: "What is Python? Why Python?" },
  { id: 17, module: 4, title_az: "Dəyişənlər və hesablamalar", title_en: "Variables and calculations" },
  { id: 18, module: 4, title_az: "Siyahılar və lüğətlər", title_en: "Lists and dictionaries" },
  { id: 19, module: 4, title_az: "Dövrlər və şərtlər", title_en: "Loops and conditions" },
  { id: 20, module: 4, title_az: "Mini layihə: Kalkulyator proqramı", title_en: "Mini project: Calculator program" },
];
