"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useDict, useLocale } from "@/lib/i18n/context";

// Sample quiz data — will come from Supabase
const QUIZ_DATA: Record<
  string,
  {
    title_az: string;
    title_en: string;
    timeLimit: number;
    questions: {
      question_az: string;
      question_en: string;
      options_az: string[];
      options_en: string[];
      correct: number;
      explanation_az: string;
      explanation_en: string;
    }[];
  }
> = {
  "1": {
    title_az: "Kompüterlər və Məntiq Quiz",
    title_en: "Computers & Logic Quiz",
    timeLimit: 300,
    questions: [
      {
        question_az: "Kompüterin əsas beyin hissəsi hansıdır?",
        question_en: "What is the main brain of a computer?",
        options_az: ["RAM", "CPU (Prosessor)", "Hard disk", "Monitor"],
        options_en: ["RAM", "CPU (Processor)", "Hard disk", "Monitor"],
        correct: 1,
        explanation_az:
          "CPU (Central Processing Unit) kompüterin əsas emal hissəsidir və bütün hesablamaları yerinə yetirir.",
        explanation_en:
          "CPU (Central Processing Unit) is the main processing part of a computer and performs all calculations.",
      },
      {
        question_az: "HTML nə üçün istifadə olunur?",
        question_en: "What is HTML used for?",
        options_az: [
          "Oyun yaratmaq",
          "Veb səhifə qurmaq",
          "Musiqi yazmaq",
          "Foto redaktə etmək",
        ],
        options_en: [
          "Creating games",
          "Building web pages",
          "Writing music",
          "Editing photos",
        ],
        correct: 1,
        explanation_az:
          "HTML (HyperText Markup Language) veb səhifələrin strukturunu yaratmaq üçün istifadə olunur.",
        explanation_en:
          "HTML (HyperText Markup Language) is used to create the structure of web pages.",
      },
      {
        question_az: "Aşağıdakılardan hansı proqramlaşdırma dili deyil?",
        question_en: "Which of the following is NOT a programming language?",
        options_az: ["Python", "JavaScript", "HTML", "Java"],
        options_en: ["Python", "JavaScript", "HTML", "Java"],
        correct: 2,
        explanation_az:
          "HTML bir markup (işarələmə) dilidir, proqramlaşdırma dili deyil. O, veb səhifələrin strukturunu təyin edir.",
        explanation_en:
          "HTML is a markup language, not a programming language. It defines the structure of web pages.",
      },
      {
        question_az: "1 baytda neçə bit var?",
        question_en: "How many bits are in 1 byte?",
        options_az: ["4", "8", "16", "32"],
        options_en: ["4", "8", "16", "32"],
        correct: 1,
        explanation_az: "1 bayt = 8 bit. Bu kompüter elminin əsas anlayışıdır.",
        explanation_en: "1 byte = 8 bits. This is a fundamental concept in computer science.",
      },
      {
        question_az: "Alqoritm nədir?",
        question_en: "What is an algorithm?",
        options_az: [
          "Proqramlaşdırma dili",
          "Kompüter hissəsi",
          "Məsələni həll etmək üçün addım-addım təlimat",
          "İnternet brauzer",
        ],
        options_en: [
          "A programming language",
          "A computer part",
          "Step-by-step instructions for solving a problem",
          "An internet browser",
        ],
        correct: 2,
        explanation_az:
          "Alqoritm müəyyən bir məsələni həll etmək üçün ardıcıl addımlar toplusudur.",
        explanation_en:
          "An algorithm is a sequence of steps to solve a particular problem.",
      },
    ],
  },
};

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const dict = useDict();
  const locale = useLocale();
  const t = dict.quiz;
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
        <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
        <Link href={`/${locale}/quiz`}>
          <Button>{t.backToQuizzes}</Button>
        </Link>
      </div>
    );
  }

  const quizTitle = locale === "az" ? quiz.title_az : quiz.title_en;

  if (!started) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">{quizTitle}</h1>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>
            {quiz.questions.length} {t.questions}
          </span>
          <span>•</span>
          <span>
            {Math.floor(quiz.timeLimit / 60)} {t.minutes}
          </span>
        </div>
        <Button size="lg" onClick={() => setStarted(true)}>
          {t.startQuiz}
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
        <h1 className="text-2xl font-bold">{t.quizCompleted}</h1>
        <div className="text-6xl font-bold text-primary">{percentage}%</div>
        <p className="text-lg">
          {t.correctAnswers
            .replace("{score}", String(score))
            .replace("{total}", String(quiz.questions.length))}
        </p>
        <Badge className="text-base px-4 py-1">
          {t.xpEarned.replace("{xp}", String(xpEarned))}
        </Badge>
        <div className="flex justify-center gap-3 pt-4">
          <Link href={`/${locale}/quiz`}>
            <Button variant="outline">{t.backToQuizzesBtn}</Button>
          </Link>
          <Link href={`/${locale}/dashboard`}>
            <Button>{t.toDashboard}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const q = quiz.questions[currentQ];
  const question = locale === "az" ? q.question_az : q.question_en;
  const options = locale === "az" ? q.options_az : q.options_en;
  const explanation = locale === "az" ? q.explanation_az : q.explanation_en;
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
          {t.questionOf
            .replace("{current}", String(currentQ + 1))
            .replace("{total}", String(quiz.questions.length))}
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
        <h2 className="text-lg font-semibold mb-6">{question}</h2>
        <div className="space-y-3">
          {options.map((option, i) => {
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
              <strong>{t.explanation}</strong> {explanation}
            </p>
          </div>
        )}
      </Card>

      {answered && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>
            {currentQ < quiz.questions.length - 1
              ? t.nextQuestion
              : t.finishQuiz}
          </Button>
        </div>
      )}
    </div>
  );
}
