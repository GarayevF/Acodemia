"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/editor/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlaygroundPage() {
  const [language, setLanguage] = useState<"html" | "css" | "javascript" | "python">("javascript");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kod Meydançası</h1>
        <p className="text-muted-foreground">
          Sərbəst kod yaz və sına — istədiyin dildə!
        </p>
      </div>

      <Tabs value={language} onValueChange={(v) => setLanguage(v as typeof language)}>
        <TabsList>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
        </TabsList>

        <TabsContent value={language} className="mt-4">
          <div className="h-[600px]">
            <CodeEditor
              key={language}
              language={language}
              defaultValue={defaultCode[language]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const defaultCode: Record<string, string> = {
  html: '<h1>Salam, Dünya!</h1>\n<p>Bu mənim veb səhifəmdir.</p>\n<button>Mənə bas!</button>',
  css: 'body {\n  background-color: #f0f8ff;\n  font-family: sans-serif;\n  text-align: center;\n  padding: 40px;\n}\n\nh1 {\n  color: #2563eb;\n}',
  javascript: '// JavaScript ilə sınaq edin\nlet ad = "Aynur";\nconsole.log("Salam, " + ad + "!");\n\nfor (let i = 1; i <= 5; i++) {\n  console.log(i + " - Kodlama əyləncəlidir!");\n}',
  python: '# Python ilə sınaq edin\nad = "Aynur"\nprint(f"Salam, {ad}!")\n\nfor i in range(1, 6):\n    print(f"{i} - Kodlama əyləncəlidir!")',
};
