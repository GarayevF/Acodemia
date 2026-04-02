-- =============================================
-- Acodemia MVP Database Schema
-- =============================================

-- 1. Profiles (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  avatar_url text,
  school text,
  age int,
  xp int default 0,
  level int default 1,
  streak_days int default 0,
  last_login_date date,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users can view all profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Yeni İstifadəçi'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Lessons
create table public.lessons (
  id serial primary key,
  module int not null check (module between 1 and 4),
  order_num int not null,
  title_az text not null,
  description_az text,
  content jsonb not null default '{}',
  language text not null check (language in ('html', 'css', 'javascript', 'python')),
  xp_reward int default 50,
  difficulty text default 'beginner' check (difficulty in ('beginner', 'intermediate')),
  unique(module, order_num)
);

alter table public.lessons enable row level security;
create policy "Lessons are viewable by everyone" on public.lessons for select using (true);

-- 3. Lesson Progress
create table public.lesson_progress (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id int references public.lessons(id) on delete cascade not null,
  status text default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  code text,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;
create policy "Users can view own progress" on public.lesson_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.lesson_progress for update using (auth.uid() = user_id);

-- 4. Quizzes
create table public.quizzes (
  id serial primary key,
  module int not null check (module between 1 and 4),
  title_az text not null,
  time_limit int default 300 -- seconds
);

alter table public.quizzes enable row level security;
create policy "Quizzes are viewable by everyone" on public.quizzes for select using (true);

-- 5. Quiz Questions
create table public.quiz_questions (
  id serial primary key,
  quiz_id int references public.quizzes(id) on delete cascade not null,
  question_az text not null,
  options jsonb not null,
  correct int not null,
  explanation text
);

alter table public.quiz_questions enable row level security;
create policy "Questions are viewable by everyone" on public.quiz_questions for select using (true);

-- 6. Quiz Results
create table public.quiz_results (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  quiz_id int references public.quizzes(id) on delete cascade not null,
  score int not null,
  total int not null,
  xp_earned int not null,
  completed_at timestamptz default now()
);

alter table public.quiz_results enable row level security;
create policy "Users can view own results" on public.quiz_results for select using (auth.uid() = user_id);
create policy "Users can insert own results" on public.quiz_results for insert with check (auth.uid() = user_id);

-- 7. Badges
create table public.badges (
  id serial primary key,
  name_az text not null,
  description text,
  icon_url text,
  criteria jsonb not null default '{}'
);

alter table public.badges enable row level security;
create policy "Badges are viewable by everyone" on public.badges for select using (true);

-- 8. User Badges
create table public.user_badges (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id int references public.badges(id) on delete cascade not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

alter table public.user_badges enable row level security;
create policy "Users can view own badges" on public.user_badges for select using (auth.uid() = user_id);
create policy "Users can view all badges earned" on public.user_badges for select using (true);

-- =============================================
-- Seed: Default badges
-- =============================================
insert into public.badges (name_az, description, icon_url, criteria) values
  ('İlk Addım', 'İlk dərsi tamamla', '/badges/first-step.svg', '{"type": "lessons_completed", "count": 1}'),
  ('Modul Ustası', 'Bir modülü tam bitir', '/badges/module-master.svg', '{"type": "lessons_completed", "count": 5}'),
  ('Quiz Çempionu', 'Bir quizdə 100% al', '/badges/quiz-champion.svg', '{"type": "quiz_perfect", "count": 1}'),
  ('Kod Marafonu', '7 gün ardıcıl giriş yap', '/badges/marathon.svg', '{"type": "streak", "count": 7}'),
  ('Tam Bitirmə', 'Bütün 20 dərsi tamamla', '/badges/complete.svg', '{"type": "all_lessons", "count": 20}');
