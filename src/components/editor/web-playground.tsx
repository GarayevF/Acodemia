"use client";

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const DEFAULT_HTML = `<h1>Salam, Dünya!</h1>
<p>Bu mənim ilk veb səhifəmdir.</p>
<button id="btn">Mənə bas!</button>`;

const DEFAULT_CSS = `body {
  font-family: sans-serif;
  background: #f0f8ff;
  text-align: center;
  padding: 40px;
}
h1 { color: #2563eb; }
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}`;

const DEFAULT_JS = `document.getElementById("btn").addEventListener("click", () => {
  alert("Salam! 👋");
});`;

export function WebPlayground() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [tab, setTab] = useState<"html" | "css" | "javascript">("html");
  const [srcDoc, setSrcDoc] = useState("");

  // Auto-run with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSrcDoc(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>${css}</style></head>
<body>
${html}
<script>
try {
${js}
} catch (e) {
  document.body.insertAdjacentHTML('beforeend', '<pre style="color:red">' + e.message + '</pre>');
}
<\/script>
</body>
</html>`);
    }, 400);
    return () => clearTimeout(timer);
  }, [html, css, js]);

  function runNow() {
    setSrcDoc(
      `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`,
    );
  }

  function reset() {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
  }

  const value = tab === "html" ? html : tab === "css" ? css : js;
  const onChange = (v: string | undefined) => {
    const nv = v ?? "";
    if (tab === "html") setHtml(nv);
    else if (tab === "css") setCss(nv);
    else setJs(nv);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4 h-[600px]">
      {/* Editor side */}
      <div className="flex flex-col border rounded-xl overflow-hidden bg-white">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="h-8">
              <TabsTrigger value="html" className="text-xs">HTML</TabsTrigger>
              <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
              <TabsTrigger value="javascript" className="text-xs">JS</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={reset}>Reset</Button>
            <Button size="sm" onClick={runNow}>▶ Run</Button>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={tab}
            value={value}
            onChange={onChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 12 },
              tabSize: 2,
            }}
          />
        </div>
      </div>

      {/* Preview side */}
      <div className="flex flex-col border rounded-xl overflow-hidden bg-white">
        <div className="px-3 py-2 bg-slate-50 border-b text-xs font-medium text-muted-foreground uppercase">
          Preview
        </div>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts allow-modals"
          className="flex-1 w-full bg-white"
        />
      </div>
    </div>
  );
}
