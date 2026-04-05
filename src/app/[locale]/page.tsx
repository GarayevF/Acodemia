import Link from "next/link";
import { LogoFull, LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/types";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.home;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <LogoFull />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href={`/${locale}/login`}>
              <Button variant="ghost">{dict.nav.login}</Button>
            </Link>
            <Link href={`/${locale}/register`}>
              <Button>{dict.nav.register}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {t.heroTitle1}
              <br />
              <span className="text-primary">{t.heroTitle2}</span> {t.heroTitle3}
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">{t.heroDesc}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/${locale}/register`}>
                <Button size="lg" className="text-base px-8">
                  {t.startFree}
                </Button>
              </Link>
              <Link href="#modules">
                <Button size="lg" variant="outline" className="text-base px-8">
                  {t.seeLessons}
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <span>✓ {t.freeCheck}</span>
              <span>✓ {t.azCheck}</span>
              <span>✓ {t.realCodeCheck}</span>
            </div>
          </div>

          {/* Hero illustration — 3D code editor */}
          <div className="hidden lg:block">
            <div
              className="hero-card rounded-[20px] p-7 border border-white/[0.08]"
              style={{
                background: "linear-gradient(145deg, #151e30 0%, #111a2c 40%, #0d1525 100%)",
              }}
            >
              {/* Top highlight */}
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent rounded-t-[20px]" />

              {/* Window chrome */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-[13px] h-[13px] rounded-full bg-[#ff5f57]" />
                <div className="w-[13px] h-[13px] rounded-full bg-[#febc2e]" />
                <div className="w-[13px] h-[13px] rounded-full bg-[#28c840]" />
                <span className="text-slate-500 text-xs ml-3 font-mono tracking-wide">
                  {locale === "az" ? "salam.py" : "hello.py"}
                </span>
              </div>

              {/* Code with line numbers */}
              <div className="flex gap-4">
                <pre className="text-[15px] font-mono leading-[2] whitespace-pre text-slate-600 select-none text-right">
{`1
2
3
4`}
                </pre>
                <div className="w-px bg-slate-700/30 my-1" />
                {locale === "az" ? (
                  <pre className="text-[15px] font-mono leading-[2] whitespace-pre">
<span className="text-purple-400">print</span><span className="text-slate-300">(</span><span className="text-green-400">&quot;Salam, Dünya!&quot;</span><span className="text-slate-300">)</span>{"\n\n"}<span className="text-blue-300">ad</span><span className="text-slate-400"> = </span><span className="text-purple-400">input</span><span className="text-slate-300">(</span><span className="text-green-400">&quot;Adın nədir? &quot;</span><span className="text-slate-300">)</span>{"\n"}<span className="text-purple-400">print</span><span className="text-slate-300">(</span><span className="text-green-400">f&quot;Xoş gəldin, </span><span className="text-cyan-300">{"{ad}"}</span><span className="text-green-400">!&quot;</span><span className="text-slate-300">)</span>
                  </pre>
                ) : (
                  <pre className="text-[15px] font-mono leading-[2] whitespace-pre">
<span className="text-purple-400">print</span><span className="text-slate-300">(</span><span className="text-green-400">&quot;Hello, World!&quot;</span><span className="text-slate-300">)</span>{"\n\n"}<span className="text-blue-300">name</span><span className="text-slate-400"> = </span><span className="text-purple-400">input</span><span className="text-slate-300">(</span><span className="text-green-400">&quot;What is your name? &quot;</span><span className="text-slate-300">)</span>{"\n"}<span className="text-purple-400">print</span><span className="text-slate-300">(</span><span className="text-green-400">f&quot;Welcome, </span><span className="text-cyan-300">{"{name}"}</span><span className="text-green-400">!&quot;</span><span className="text-slate-300">)</span>
                  </pre>
                )}
              </div>

              {/* Terminal output */}
              <div className="mt-5 rounded-xl p-4 text-sm font-mono bg-white/[0.04]">
                {locale === "az" ? (
                  <pre className="whitespace-pre">
<span className="text-green-400">▶ </span><span className="text-slate-200">Salam, Dünya!</span>{"\n"}<span className="text-yellow-300">  Adın nədir? </span><span className="text-slate-200">Aynur</span>{"\n"}<span className="text-green-400">▶ </span><span className="text-slate-200">Xoş gəldin, Aynur!</span>
                  </pre>
                ) : (
                  <pre className="whitespace-pre">
<span className="text-green-400">▶ </span><span className="text-slate-200">Hello, World!</span>{"\n"}<span className="text-yellow-300">  What is your name? </span><span className="text-slate-200">Aynur</span>{"\n"}<span className="text-green-400">▶ </span><span className="text-slate-200">Welcome, Aynur!</span>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">{t.whyTitle}</h2>
            <p className="text-muted-foreground text-lg">{t.whyDesc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">{t.curriculumTitle}</h2>
            <p className="text-muted-foreground text-lg">{t.curriculumDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-6 rounded-2xl border bg-card text-center hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-3">{mod.icon}</div>
                <h3 className="font-semibold mb-1">
                  {t.module} {mod.id}
                </h3>
                <p className="text-primary font-medium">
                  {dict.modules[String(mod.id) as keyof typeof dict.modules]}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {mod.lessons} {t.lessonCount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">{t.ctaTitle}</h2>
          <p className="text-white/80 text-lg">{t.ctaDesc}</p>
          <Link href={`/${locale}/register`}>
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 mt-4"
            >
              {t.ctaButton}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-6 h-6" />
            <span className="text-sm text-muted-foreground">
              {t.copyright}
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>{t.location}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
