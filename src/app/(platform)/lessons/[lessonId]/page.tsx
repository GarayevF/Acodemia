"use client";

import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/editor/code-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

// Static lesson content — will come from Supabase
const LESSON_DATA: Record<
  string,
  {
    title: string;
    module: number;
    language: "html" | "css" | "javascript" | "python";
    xp: number;
    sections: { type: "text" | "code" | "hint"; content: string }[];
    starterCode: string;
  }
> = {
  "4": {
    title: 'İlk kodunuz: "Salam, Dünya!"',
    module: 1,
    language: "javascript",
    xp: 50,
    sections: [
      {
        type: "text",
        content:
          "Hər proqramçının ilk kodu \"Salam, Dünya!\" yazmaqdan başlayır. Bu dərsdə siz JavaScript dilində ilk kodunuzu yazacaqsınız.",
      },
      {
        type: "text",
        content:
          '`console.log()` funksiyası ekrana mətn yazmaq üçün istifadə edilir. Mötərizə içinə yazdığınız mətn ekranda görünəcək.',
      },
      {
        type: "code",
        content: 'console.log("Salam, Dünya!");',
      },
      {
        type: "text",
        content:
          "Yuxarıdakı kodu sağ tərəfdəki redaktora yazın və ▶ İcra et düyməsinə basın. Nəticə bölməsində \"Salam, Dünya!\" yazısını görəcəksiniz.",
      },
      {
        type: "hint",
        content:
          'İpucu: Mətni dəyişdirməyi sınayın — məsələn, öz adınızı yazın: console.log("Salam, Aynur!");',
      },
    ],
    starterCode: '// İlk kodunuzu buraya yazın\nconsole.log("Salam, Dünya!");',
  },
  "6": {
    title: "HTML nədir? İlk səhifəniz",
    module: 2,
    language: "html",
    xp: 50,
    sections: [
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
    starterCode:
      "<h1>Salam, Dünya!</h1>\n<p>Bu mənim ilk veb səhifəmdir.</p>\n\n<!-- Öz mətnlərinizi əlavə edin -->",
  },
};

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [completed, setCompleted] = useState(false);
  const lesson = LESSON_DATA[lessonId];

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Dərs tapılmadı</h1>
        <p className="text-muted-foreground mb-6">
          Bu dərs hələ hazır deyil. Tezliklə əlavə olunacaq!
        </p>
        <Link href="/lessons">
          <Button>Dərslərə qayıt</Button>
        </Link>
      </div>
    );
  }

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
            Modul {lesson.module} — Dərs {lessonId}
          </p>
          <h1 className="text-xl font-bold">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">+{lesson.xp} XP</Badge>
          {completed ? (
            <Badge className="bg-green-500">Tamamlandı ✓</Badge>
          ) : (
            <Button onClick={handleComplete}>Dərsi tamamla</Button>
          )}
        </div>
      </div>

      {/* Content + Editor */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Lesson content */}
        <div className="space-y-4">
          {lesson.sections.map((section, i) => (
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
        <Link href={`/lessons/${Number(lessonId) - 1}`}>
          <Button variant="outline" disabled={Number(lessonId) <= 1}>
            ← Əvvəlki dərs
          </Button>
        </Link>
        <Link href={`/lessons/${Number(lessonId) + 1}`}>
          <Button disabled={Number(lessonId) >= 20}>Növbəti dərs →</Button>
        </Link>
      </div>
    </div>
  );
}
