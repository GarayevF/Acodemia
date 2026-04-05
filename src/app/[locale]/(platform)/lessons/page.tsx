import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/types";
import Link from "next/link";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

// Temporary static lesson data — will come from Supabase
const LESSONS = [
  { id: 1, module: 1, order: 1, title_az: "Kompüter necə işləyir?", title_en: "How does a computer work?", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 2, module: 1, order: 2, title_az: "İnternet və veb səhifələr", title_en: "Internet and web pages", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 3, module: 1, order: 3, title_az: "Məntiq və alqoritmlər", title_en: "Logic and algorithms", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 4, module: 1, order: 4, title_az: "İlk kodunuz: \"Salam, Dünya!\"", title_en: "Your first code: \"Hello, World!\"", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 5, module: 1, order: 5, title_az: "Dəyişənlər və verilən tipləri", title_en: "Variables and data types", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 6, module: 2, order: 1, title_az: "HTML nədir? İlk səhifəniz", title_en: "What is HTML? Your first page", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 7, module: 2, order: 2, title_az: "Başlıqlar, paraqraflar, siyahılar", title_en: "Headings, paragraphs, lists", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 8, module: 2, order: 3, title_az: "Şəkillər və keçidlər", title_en: "Images and links", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 9, module: 2, order: 4, title_az: "CSS ilə rəngləndirmə", title_en: "Styling with CSS", lang: "css", xp: 50, difficulty: "beginner" },
  { id: 10, module: 2, order: 5, title_az: "Öz veb səhifənizi yaradın", title_en: "Create your own web page", lang: "html", xp: 50, difficulty: "intermediate" },
  { id: 11, module: 3, order: 1, title_az: "JavaScript nədir?", title_en: "What is JavaScript?", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 12, module: 3, order: 2, title_az: "Dəyişənlər və operatorlar", title_en: "Variables and operators", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 13, module: 3, order: 3, title_az: "Şərtlər (if/else)", title_en: "Conditions (if/else)", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 14, module: 3, order: 4, title_az: "Dövrlər (for, while)", title_en: "Loops (for, while)", lang: "javascript", xp: 50, difficulty: "intermediate" },
  { id: 15, module: 3, order: 5, title_az: "Funksiyalar və hadisələr", title_en: "Functions and events", lang: "javascript", xp: 50, difficulty: "intermediate" },
  { id: 16, module: 4, order: 1, title_az: "Python nədir? Niyə Python?", title_en: "What is Python? Why Python?", lang: "python", xp: 50, difficulty: "beginner" },
  { id: 17, module: 4, order: 2, title_az: "Dəyişənlər və hesablamalar", title_en: "Variables and calculations", lang: "python", xp: 50, difficulty: "beginner" },
  { id: 18, module: 4, order: 3, title_az: "Siyahılar və lüğətlər", title_en: "Lists and dictionaries", lang: "python", xp: 50, difficulty: "intermediate" },
  { id: 19, module: 4, order: 4, title_az: "Dövrlər və şərtlər", title_en: "Loops and conditions", lang: "python", xp: 50, difficulty: "intermediate" },
  { id: 20, module: 4, order: 5, title_az: "Mini layihə: Kalkulyator proqramı", title_en: "Mini project: Calculator program", lang: "python", xp: 50, difficulty: "intermediate" },
];

const langColors: Record<string, string> = {
  html: "bg-orange-100 text-orange-700",
  css: "bg-blue-100 text-blue-700",
  javascript: "bg-yellow-100 text-yellow-700",
  python: "bg-green-100 text-green-700",
};

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.lessons;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {MODULES.map((mod) => {
        const moduleLessons = LESSONS.filter((l) => l.module === mod.id);
        return (
          <div key={mod.id}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{mod.icon}</span>
              <div>
                <h2 className="text-lg font-semibold">
                  {t.module} {mod.id}:{" "}
                  {dict.modules[String(mod.id) as keyof typeof dict.modules]}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mod.lessons} {t.lessonCount}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {moduleLessons.map((lesson) => (
                <Link key={lesson.id} href={`/${locale}/lessons/${lesson.id}`}>
                  <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                          {lesson.order}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {locale === "az" ? lesson.title_az : lesson.title_en}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${langColors[lesson.lang]}`}
                            >
                              {lesson.lang.toUpperCase()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              +{lesson.xp} XP
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{t.start}</Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
