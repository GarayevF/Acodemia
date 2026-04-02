import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/types";
import Link from "next/link";

export const metadata = { title: "Dərslər" };

// Temporary static lesson data — will come from Supabase
const LESSONS = [
  { id: 1, module: 1, order: 1, title: "Kompüter necə işləyir?", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 2, module: 1, order: 2, title: "İnternet və veb səhifələr", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 3, module: 1, order: 3, title: "Məntiq və alqoritmlər", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 4, module: 1, order: 4, title: "İlk kodunuz: \"Salam, Dünya!\"", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 5, module: 1, order: 5, title: "Dəyişənlər və verilən tipləri", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 6, module: 2, order: 1, title: "HTML nədir? İlk səhifəniz", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 7, module: 2, order: 2, title: "Başlıqlar, paraqraflar, siyahılar", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 8, module: 2, order: 3, title: "Şəkillər və keçidlər", lang: "html", xp: 50, difficulty: "beginner" },
  { id: 9, module: 2, order: 4, title: "CSS ilə rəngləndirmə", lang: "css", xp: 50, difficulty: "beginner" },
  { id: 10, module: 2, order: 5, title: "Öz veb səhifənizi yaradın", lang: "html", xp: 50, difficulty: "intermediate" },
  { id: 11, module: 3, order: 1, title: "JavaScript nədir?", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 12, module: 3, order: 2, title: "Dəyişənlər və operatorlar", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 13, module: 3, order: 3, title: "Şərtlər (if/else)", lang: "javascript", xp: 50, difficulty: "beginner" },
  { id: 14, module: 3, order: 4, title: "Dövrlər (for, while)", lang: "javascript", xp: 50, difficulty: "intermediate" },
  { id: 15, module: 3, order: 5, title: "Funksiyalar və hadisələr", lang: "javascript", xp: 50, difficulty: "intermediate" },
  { id: 16, module: 4, order: 1, title: "Python nədir? Niyə Python?", lang: "python", xp: 50, difficulty: "beginner" },
  { id: 17, module: 4, order: 2, title: "Dəyişənlər və hesablamalar", lang: "python", xp: 50, difficulty: "beginner" },
  { id: 18, module: 4, order: 3, title: "Siyahılar və lüğətlər", lang: "python", xp: 50, difficulty: "intermediate" },
  { id: 19, module: 4, order: 4, title: "Dövrlər və şərtlər", lang: "python", xp: 50, difficulty: "intermediate" },
  { id: 20, module: 4, order: 5, title: "Mini layihə: Kalkulyator proqramı", lang: "python", xp: 50, difficulty: "intermediate" },
];

const langColors: Record<string, string> = {
  html: "bg-orange-100 text-orange-700",
  css: "bg-blue-100 text-blue-700",
  javascript: "bg-yellow-100 text-yellow-700",
  python: "bg-green-100 text-green-700",
};

export default function LessonsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Dərslər</h1>
        <p className="text-muted-foreground">4 modul, 20 interaktiv dərs</p>
      </div>

      {MODULES.map((mod) => {
        const moduleLessons = LESSONS.filter((l) => l.module === mod.id);
        return (
          <div key={mod.id}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{mod.icon}</span>
              <div>
                <h2 className="text-lg font-semibold">
                  Modul {mod.id}: {mod.title_az}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mod.lessons} dərs
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {moduleLessons.map((lesson) => (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                  <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                          {lesson.order}
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
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
                      <Badge variant="outline">Başla →</Badge>
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
