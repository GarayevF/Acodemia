"use client";

import { useState, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { loadPyodide } from "@/lib/pyodide";

interface CodeEditorProps {
  language: "html" | "css" | "javascript" | "python";
  defaultValue?: string;
  onCodeChange?: (code: string) => void;
}

export function CodeEditor({
  language,
  defaultValue = "",
  onCodeChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleEditorMount: OnMount = (editor) => {
    editor.focus();
  };

  function handleChange(value: string | undefined) {
    const newCode = value ?? "";
    setCode(newCode);
    onCodeChange?.(newCode);
  }

  async function runCode() {
    setIsRunning(true);
    setOutput("");

    if (language === "html" || language === "css") {
      // Render HTML/CSS in iframe
      const htmlContent =
        language === "css"
          ? `<style>${code}</style><div class="demo">CSS nümunəsi</div>`
          : code;
      if (iframeRef.current) {
        const doc = iframeRef.current.contentDocument;
        if (doc) {
          doc.open();
          doc.write(htmlContent);
          doc.close();
        }
      }
      setOutput("✓ Render edildi");
    } else if (language === "javascript") {
      // Run JS in sandboxed iframe
      try {
        const logs: string[] = [];
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        const win = iframe.contentWindow as unknown as Record<string, unknown>;
        if (!win) throw new Error("Sandbox yaradıla bilmədi");
        (win.console as Console).log = (...args: unknown[]) => {
          logs.push(args.map(String).join(" "));
        };
        (win as unknown as { eval: (code: string) => void }).eval(code);
        document.body.removeChild(iframe);
        setOutput(logs.join("\n") || "✓ Kod uğurla icra edildi (çıxış yoxdur)");
      } catch (err) {
        setOutput(`Xəta: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else if (language === "python") {
      // Python via Pyodide
      setOutput("Python mühərriki yüklənir...");
      try {
        const pyodide = await loadPyodide();
        pyodide.runPython(
          "import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = sys.stdout",
        );
        try {
          pyodide.runPython(code);
          const result = String(pyodide.runPython("sys.stdout.getvalue()"));
          setOutput(result || "✓ Kod uğurla icra edildi (çıxış yoxdur)");
        } catch (runErr) {
          const captured = String(pyodide.runPython("sys.stdout.getvalue()"));
          const msg = runErr instanceof Error ? runErr.message : String(runErr);
          setOutput((captured ? captured + "\n" : "") + "Xəta:\n" + msg);
        }
      } catch (err) {
        setOutput(`Python yüklənmədi: ${err instanceof Error ? err.message : String(err)}`);
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
          {isRunning ? "İcra edilir..." : "▶ İcra et"}
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-[300px]">
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
          Nəticə
        </div>
        {(language === "html" || language === "css") ? (
          <iframe
            ref={iframeRef}
            className="w-full h-40 bg-white"
            sandbox="allow-scripts"
            title="preview"
          />
        ) : (
          <pre className="p-4 text-sm font-mono bg-slate-900 text-slate-100 min-h-[100px] max-h-[200px] overflow-auto">
            {output || "Kodu icra etmək üçün ▶ düyməsinə basın"}
          </pre>
        )}
      </div>
    </div>
  );
}

