import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/types";
import Link from "next/link";

export const metadata = { title: "Quizlər" };

const QUIZZES = [
  { id: 1, module: 1, title: "Kompüterlər və Məntiq Quiz", questions: 10, timeLimit: 300, xp: "20-100" },
  { id: 2, module: 2, title: "HTML & CSS Quiz", questions: 12, timeLimit: 360, xp: "20-100" },
  { id: 3, module: 3, title: "JavaScript Əsasları Quiz", questions: 13, timeLimit: 420, xp: "20-100" },
  { id: 4, module: 4, title: "Python Giriş Quiz", questions: 15, timeLimit: 450, xp: "20-100" },
];

export default function QuizListPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Quizlər</h1>
        <p className="text-muted-foreground">
          Biliklərini yoxla və XP qazan
        </p>
      </div>

      <div className="space-y-4">
        {QUIZZES.map((quiz) => {
          const mod = MODULES.find((m) => m.id === quiz.module);
          return (
            <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
              <Card className="p-5 hover:border-primary/50 transition-colors cursor-pointer mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{mod?.icon}</span>
                    <div>
                      <h3 className="font-semibold">{quiz.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{quiz.questions} sual</span>
                        <span>•</span>
                        <span>{Math.floor(quiz.timeLimit / 60)} dəqiqə</span>
                        <span>•</span>
                        <span>+{quiz.xp} XP</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">Başla →</Badge>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
