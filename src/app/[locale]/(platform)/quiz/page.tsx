import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/types";
import Link from "next/link";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

const QUIZZES = [
  { id: 1, module: 1, title_az: "Kompüterlər və Məntiq Quiz", title_en: "Computers & Logic Quiz", questions: 10, timeLimit: 300, xp: "20-100" },
  { id: 2, module: 2, title_az: "HTML & CSS Quiz", title_en: "HTML & CSS Quiz", questions: 12, timeLimit: 360, xp: "20-100" },
  { id: 3, module: 3, title_az: "JavaScript Əsasları Quiz", title_en: "JavaScript Basics Quiz", questions: 13, timeLimit: 420, xp: "20-100" },
  { id: 4, module: 4, title_az: "Python Giriş Quiz", title_en: "Intro to Python Quiz", questions: 15, timeLimit: 450, xp: "20-100" },
];

export default async function QuizListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.quiz;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="space-y-4">
        {QUIZZES.map((quiz) => {
          const mod = MODULES.find((m) => m.id === quiz.module);
          return (
            <Link key={quiz.id} href={`/${locale}/quiz/${quiz.id}`}>
              <Card className="p-5 hover:border-primary/50 transition-colors cursor-pointer mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{mod?.icon}</span>
                    <div>
                      <h3 className="font-semibold">
                        {locale === "az" ? quiz.title_az : quiz.title_en}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>
                          {quiz.questions} {t.questions}
                        </span>
                        <span>•</span>
                        <span>
                          {Math.floor(quiz.timeLimit / 60)} {t.minutes}
                        </span>
                        <span>•</span>
                        <span>+{quiz.xp} XP</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{t.start}</Badge>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
