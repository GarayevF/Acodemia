// Shared Pyodide loader — loads the CDN script once and caches the instance.

const PYODIDE_VERSION = "0.26.2";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export interface PyodideInterface {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
}

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let instancePromise: Promise<PyodideInterface> | null = null;

function injectScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-pyodide="1"]`,
    );
    if (existing) {
      if (window.loadPyodide) return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Pyodide script load failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.pyodide = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Pyodide script load failed"));
    document.head.appendChild(s);
  });
}

export async function loadPyodide(): Promise<PyodideInterface> {
  if (instancePromise) return instancePromise;
  instancePromise = (async () => {
    await injectScript(PYODIDE_URL + "pyodide.js");
    if (!window.loadPyodide) throw new Error("loadPyodide not available on window");
    return window.loadPyodide({ indexURL: PYODIDE_URL });
  })();
  return instancePromise;
}
