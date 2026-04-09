"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { loadPyodide } from "@/lib/pyodide";

const DEFAULT_PY = `# Python ilə sınaq edin
name = "Aynur"
print(f"Salam, {name}!")

for i in range(1, 6):
    print(f"{i} - Kodlama əyləncəlidir!")
`;

export function PythonPlayground() {
  const [code, setCode] = useState(DEFAULT_PY);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function run() {
    setRunning(true);
    setOutput("");
    setStatus("Python mühərriki yüklənir...");
    try {
      const pyodide = await loadPyodide();
      setStatus("");
      // Reset stdout/stderr each run
      pyodide.runPython(
        "import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = sys.stdout",
      );
      try {
        pyodide.runPython(code);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const captured = String(pyodide.runPython("sys.stdout.getvalue()"));
        setOutput((captured ? captured + "\n" : "") + "Xəta:\n" + msg);
        setRunning(false);
        return;
      }
      const result = String(pyodide.runPython("sys.stdout.getvalue()"));
      setOutput(result || "✓ Kod uğurla icra edildi (çıxış yoxdur)");
    } catch (err) {
      setStatus("");
      setOutput("Python yüklənmədi: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setRunning(false);
    }
  }

  function reset() {
    setCode(DEFAULT_PY);
    setOutput("");
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b">
        <span className="text-xs font-medium text-muted-foreground uppercase">Python</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={reset}>Reset</Button>
          <Button size="sm" onClick={run} disabled={running}>
            {running ? "İcra edilir..." : "▶ Run"}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="python"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12 },
            tabSize: 4,
            insertSpaces: true,
          }}
        />
      </div>

      <div className="border-t">
        <div className="px-4 py-2 bg-slate-50 text-xs font-medium text-muted-foreground">
          Nəticə {status && <span className="text-blue-600">— {status}</span>}
        </div>
        <pre className="p-4 text-sm font-mono bg-slate-900 text-slate-100 min-h-[120px] max-h-[220px] overflow-auto whitespace-pre-wrap">
          {output || "Kodu icra etmək üçün ▶ düyməsinə basın"}
        </pre>
      </div>
    </div>
  );
}
