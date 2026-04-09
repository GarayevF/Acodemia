"use client";

import { useEffect, useState } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { loadPyodide } from "@/lib/pyodide";
import { useDict } from "@/lib/i18n/context";

interface CodeEditorProps {
  language: "html" | "css" | "javascript" | "python";
  defaultValue?: string;
  onCodeChange?: (code: string) => void;
}

const CSS_DEMO_HTML = `<h1>Hello, World!</h1>
<p>This is a demo paragraph.</p>
<button>Click me</button>
<ul><li>Item 1</li><li>Item 2</li></ul>`;

export function CodeEditor({
  language,
  defaultValue = "",
  onCodeChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [srcDoc, setSrcDoc] = useState("");
  const dict = useDict();
  const t = dict.editor;

  const isWeb = language === "html" || language === "css";

  const handleEditorMount: OnMount = (editor) => {
    editor.focus();
  };

  function handleChange(value: string | undefined) {
    const newCode = value ?? "";
    setCode(newCode);
    onCodeChange?.(newCode);
  }

  // Auto-preview for HTML/CSS with debounce
  useEffect(() => {
    if (!isWeb) return;
    const timer = setTimeout(() => {
      const doc =
        language === "css"
          ? `<!DOCTYPE html><html><head><style>${code}</style></head><body>${CSS_DEMO_HTML}</body></html>`
          : `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${code}</body></html>`;
      setSrcDoc(doc);
    }, 400);
    return () => clearTimeout(timer);
  }, [code, language, isWeb]);

  async function runCode() {
    setIsRunning(true);
    setOutput("");

    if (isWeb) {
      // Force immediate preview refresh
      const doc =
        language === "css"
          ? `<!DOCTYPE html><html><head><style>${code}</style></head><body>${CSS_DEMO_HTML}</body></html>`
          : `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${code}</body></html>`;
      setSrcDoc(doc);
    } else if (language === "javascript") {
      try {
        const logs: string[] = [];
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        const win = iframe.contentWindow as unknown as Record<string, unknown>;
        if (!win) throw new Error(t.sandboxError);
        (win.console as Console).log = (...args: unknown[]) => {
          logs.push(args.map(String).join(" "));
        };
        (win as unknown as { eval: (code: string) => void }).eval(code);
        document.body.removeChild(iframe);
        setOutput(logs.join("\n") || t.success);
      } catch (err) {
        setOutput(`${t.error}: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else if (language === "python") {
      setOutput(t.loadingPython);
      try {
        const pyodide = await loadPyodide();
        pyodide.runPython(
          "import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = sys.stdout",
        );
        try {
          pyodide.runPython(code);
          const result = String(pyodide.runPython("sys.stdout.getvalue()"));
          setOutput(result || t.success);
        } catch (runErr) {
          const captured = String(pyodide.runPython("sys.stdout.getvalue()"));
          const msg = runErr instanceof Error ? runErr.message : String(runErr);
          setOutput((captured ? captured + "\n" : "") + t.error + ":\n" + msg);
        }
      } catch (err) {
        setOutput(`${t.pyLoadError}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    setIsRunning(false);
  }

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b">
        <span className="text-xs font-medium text-muted-foreground uppercase">
          {language}
        </span>
        <Button size="sm" onClick={runCode} disabled={isRunning}>
          {isRunning ? t.running : t.run}
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-[250px]">
        <Editor
          height="100%"
          language={language === "python" ? "python" : language}
          value={code}
          onChange={handleChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12 },
            tabSize: 2,
          }}
        />
      </div>

      {/* Output */}
      <div className="border-t">
        <div className="px-4 py-2 bg-slate-50 text-xs font-medium text-muted-foreground">
          {isWeb ? t.preview : t.result}
        </div>
        {isWeb ? (
          <iframe
            srcDoc={srcDoc}
            className="w-full h-48 bg-white"
            sandbox="allow-scripts allow-modals"
            title="preview"
          />
        ) : (
          <pre className="p-4 text-sm font-mono bg-slate-900 text-slate-100 min-h-[100px] max-h-[200px] overflow-auto whitespace-pre-wrap">
            {output || t.runHint}
          </pre>
        )}
      </div>
    </div>
  );
}
