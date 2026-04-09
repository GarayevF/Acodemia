"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDict } from "@/lib/i18n/context";
import { WebPlayground } from "@/components/editor/web-playground";
import { PythonPlayground } from "@/components/editor/python-playground";

export default function PlaygroundPage() {
  const dict = useDict();
  const t = dict.playground;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.desc}</p>
      </div>

      <Tabs defaultValue="web">
        <TabsList>
          <TabsTrigger value="web">Web (HTML · CSS · JS)</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
        </TabsList>

        <TabsContent value="web" className="mt-4">
          <WebPlayground />
        </TabsContent>

        <TabsContent value="python" className="mt-4">
          <PythonPlayground />
        </TabsContent>
      </Tabs>
    </div>
  );
}
