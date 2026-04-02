"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Sample quiz data — will come from Supabase
const QUIZ_DATA: Record<
  string,
  {
    title: string;
    timeLimit: number;
    questions: {
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }[];
  }
> = {
  "1": {
    title: "Kompüterlər və Məntiq Quiz",
    timeLimit: 300,
    questions: [
      {
        question: "Kompüterin əsas beyin hissəsi hansıdır?",
        options: ["RAM", "CPU (Prosessor)", "Hard disk", "Monitor"],
        correct: 1,
        explanation:
          "CPU (Central Processing Unit) kompüterin əsas emal hissəsidir və bütün hesablamaları yerinə yetirir.",
      },
      {
        question: "HTML nə üçün istifadə olunur?",
        options: [
          "Oyun yaratmaq",
          "Veb səhifə qurmaq",
          "Musiqi yazmaq",
          "Foto redaktə etmək",
        ],
        correct: 1,
        explanation:
          "HTML (HyperText Markup Language) veb səhifələrin strukturunu yaratmaq üçün istifadə olunur.",
      },
      {
        question:
          "Aşağıdakılardan hansı proqramlaşdırma dili deyil?",
        options: ["Python", "JavaScript", "HTML", "Java"],
        correct: 2,
        explanation:
          "HTML bir markup (işarələmə) dilidir, proqramlaşdırma dili deyil. O, veb səhifələrin strukturunu təyin edir.",
      },
      {
        question: "1 baytda neçə bit var?",
        options: ["4", "8", "16", "32"],
        correct: 1,
        explanation: "1 bayt = 8 bit. Bu kompüter elminin əsas anlayışıdır.",
      },
      {
        question: "Alqoritm nədir?",
        options: [
          "Proqramlaşdırma dili",
          "Kompüter hissəsi",
          "Məsələni həll etmək üçün addım-addım təlimat",
          "İnternet brauzer",
        ],
        correct: 2,
        explanation:
          "Alqoritm müəyyən bir məsələni həll etmək üçün ardıcıl addımlar toplusudur.",
      },
    ],
  },
};

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const quiz = QUIZ_DATA[quizId];

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit ?? 300);

  const finishQuiz = useCallback(() => {
    setFinished(true);
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, finished, timeLeft, finishQuiz]);

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Quiz tapılmadı</h1>
        <Link href="/quiz">
          <Button>Quizlərə qayıt</Button>
        </Link>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>{quiz.questions.length} sual</span>
          <span>•</span>
          <span>{Math.floor(quiz.timeLimit / 60)} dəqiqə</span>
        </div>
        <Button size="lg" onClick={() => setStarted(true)}>
          Quizə başla
        </Button>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const xpEarned =
      score === quiz.questions.length
        ? 100
        : Math.round(20 + (score / quiz.questions.length) * 80);
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">Quiz tamamlandı!</h1>
        <div className="text-6xl font-bold text-primary">{percentage}%</div>
        <p className="text-lg">
          {score} / {quiz.questions.length} düzgün cavab
        </p>
        <Badge className="text-base px-4 py-1">+{xpEarned} XP qazandın!</Badge>
        <div className="flex justify-center gap-3 pt-4">
          <Link href="/quiz">
            <Button variant="outline">Quizlərə qayıt</Button>
          </Link>
          <Link href="/dashboard">
            <Button>İdarə paneli</Button>
          </Link>
        </div>
      </div>
    );
  }

  const q = quiz.questions[currentQ];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress & timer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Sual {currentQ + 1} / {quiz.questions.length}
        </span>
        <Badge variant={timeLeft < 60 ? "destructive" : "outline"}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </Badge>
      </div>
      <Progress
        value={((currentQ + 1) / quiz.questions.length) * 100}
        className="h-2"
      />

      {/* Question */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((option, i) => {
            let style = "border-2 border-muted hover:border-primary/50";
            if (answered) {
              if (i === q.correct) style = "border-2 border-green-500 bg-green-50";
              else if (i === selected)
                style = "border-2 border-red-500 bg-red-50";
            } else if (i === selected) {
              style = "border-2 border-primary";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl transition-colors ${style}`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 p-4 bg-muted rounded-xl">
            <p className="text-sm">
              <strong>İzah:</strong> {q.explanation}
            </p>
          </div>
        )}
      </Card>

      {answered && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>
            {currentQ < quiz.questions.length - 1
              ? "Növbəti sual →"
              : "Quizi bitir"}
          </Button>
        </div>
      )}
    </div>
  );
}
