"use client";

import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/editor/code-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";
import { useDict, useLocale } from "@/lib/i18n/context";

// Static lesson content — will come from Supabase
const LESSON_DATA: Record<
  string,
  {
    title_az: string;
    title_en: string;
    module: number;
    language: "html" | "css" | "javascript" | "python";
    xp: number;
    sections_az: { type: "text" | "code" | "hint"; content: string }[];
    sections_en: { type: "text" | "code" | "hint"; content: string }[];
    starterCode: string;
  }
> = {
  "4": {
    title_az: 'İlk kodunuz: "Salam, Dünya!"',
    title_en: 'Your first code: "Hello, World!"',
    module: 1,
    language: "javascript",
    xp: 50,
    sections_az: [
      {
        type: "text",
        content:
          'Hər proqramçının ilk kodu "Salam, Dünya!" yazmaqdan başlayır. Bu dərsdə siz JavaScript dilində ilk kodunuzu yazacaqsınız.',
      },
      {
        type: "text",
        content:
          "`console.log()` funksiyası ekrana mətn yazmaq üçün istifadə edilir. Mötərizə içinə yazdığınız mətn ekranda görünəcək.",
      },
      {
        type: "code",
        content: 'console.log("Salam, Dünya!");',
      },
      {
        type: "text",
        content:
          'Yuxarıdakı kodu sağ tərəfdəki redaktora yazın və ▶ İcra et düyməsinə basın. Nəticə bölməsində "Salam, Dünya!" yazısını görəcəksiniz.',
      },
      {
        type: "hint",
        content:
          'İpucu: Mətni dəyişdirməyi sınayın — məsələn, öz adınızı yazın: console.log("Salam, Aynur!");',
      },
    ],
    sections_en: [
      {
        type: "text",
        content:
          'Every programmer\'s first code starts with writing "Hello, World!". In this lesson you will write your first code in JavaScript.',
      },
      {
        type: "text",
        content:
          "The `console.log()` function is used to print text to the screen. The text you write inside the parentheses will appear on screen.",
      },
      {
        type: "code",
        content: 'console.log("Hello, World!");',
      },
      {
        type: "text",
        content:
          'Write the code above in the editor on the right and press the ▶ Run button. You will see "Hello, World!" in the output section.',
      },
      {
        type: "hint",
        content:
          'Hint: Try changing the text — for example, write your own name: console.log("Hello, Aynur!");',
      },
    ],
    starterCode: '// Write your first code here\nconsole.log("Hello, World!");',
  },
  "6": {
    title_az: "HTML nədir? İlk səhifəniz",
    title_en: "What is HTML? Your first page",
    module: 2,
    language: "html",
    xp: 50,
    sections_az: [
      {
        type: "text",
        content:
          "HTML (HyperText Markup Language) veb səhifələrin əsasını təşkil edən dildir. Bütün veb saytlar HTML ilə yazılır.",
      },
      {
        type: "text",
        content:
          "HTML teqlər (tags) ilə işləyir. Hər teq < və > simvolları arasında yazılır. Məsələn, <h1> böyük başlıq, <p> isə paraqraf yaradır.",
      },
      {
        type: "code",
        content:
          '<h1>Salam, Dünya!</h1>\n<p>Bu mənim ilk veb səhifəmdir.</p>',
      },
      {
        type: "hint",
        content:
          "İpucu: <h1> başlığı ən böyük başlıqdır. <h2>, <h3>... ilə daha kiçik başlıqlar yarada bilərsiniz.",
      },
    ],
    sections_en: [
      {
        type: "text",
        content:
          "HTML (HyperText Markup Language) is the language that forms the foundation of web pages. All websites are written with HTML.",
      },
      {
        type: "text",
        content:
          "HTML works with tags. Each tag is written between < and > symbols. For example, <h1> creates a big heading, and <p> creates a paragraph.",
      },
      {
        type: "code",
        content:
          '<h1>Hello, World!</h1>\n<p>This is my first web page.</p>',
      },
      {
        type: "hint",
        content:
          "Hint: <h1> is the biggest heading. You can create smaller headings with <h2>, <h3>...",
      },
    ],
    starterCode:
      "<h1>Hello, World!</h1>\n<p>This is my first web page.</p>\n\n<!-- Add your own text -->",
  },
};

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [completed, setCompleted] = useState(false);
  const dict = useDict();
  const locale = useLocale();
  const t = dict.lessons;
  const lesson = LESSON_DATA[lessonId];

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
        <p className="text-muted-foreground mb-6">{t.notFoundDesc}</p>
        <Link href={`/${locale}/lessons`}>
          <Button>{t.backToLessons}</Button>
        </Link>
      </div>
    );
  }

  const sections = locale === "az" ? lesson.sections_az : lesson.sections_en;
  const title = locale === "az" ? lesson.title_az : lesson.title_en;

  function handleComplete() {
    setCompleted(true);
    // TODO: Save progress to Supabase and award XP
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {t.module} {lesson.module} — {t.lesson} {lessonId}
          </p>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">+{lesson.xp} XP</Badge>
          {completed ? (
            <Badge className="bg-green-500">{t.completed}</Badge>
          ) : (
            <Button onClick={handleComplete}>{t.complete}</Button>
          )}
        </div>
      </div>

      {/* Content + Editor */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Lesson content */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <Card key={i} className="p-5">
              {section.type === "text" && (
                <p className="leading-relaxed">{section.content}</p>
              )}
              {section.type === "code" && (
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {section.content}
                </pre>
              )}
              {section.type === "hint" && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">{section.content}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Right: Code editor */}
        <div className="lg:sticky lg:top-20 h-[600px]">
          <CodeEditor
            language={lesson.language}
            defaultValue={lesson.starterCode}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link href={`/${locale}/lessons/${Number(lessonId) - 1}`}>
          <Button variant="outline" disabled={Number(lessonId) <= 1}>
            {t.prevLesson}
          </Button>
        </Link>
        <Link href={`/${locale}/lessons/${Number(lessonId) + 1}`}>
          <Button disabled={Number(lessonId) >= 20}>{t.nextLesson}</Button>
        </Link>
      </div>
    </div>
  );
}
