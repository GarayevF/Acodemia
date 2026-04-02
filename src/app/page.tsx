import Link from "next/link";
import { LogoFull, LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/types";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <LogoFull />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Daxil ol</Button>
            </Link>
            <Link href="/register">
              <Button>Pulsuz başla</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span>🎮</span> Oyunlaşdırılmış kodlama platforması
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Kodlamanı öyrən,
              <br />
              <span className="text-primary">gələcəyini</span> qur.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Azərbaycan dilində interaktiv dərslər ilə HTML, CSS, JavaScript və
              Python öyrən. XP qazan, səviyyə artır, liderlik cədvəlində yarış!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/register">
                <Button size="lg" className="text-base px-8">
                  Pulsuz başla →
                </Button>
              </Link>
              <Link href="#modules">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Dərsləri gör
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <span>✓ Tamamilə pulsuz</span>
              <span>✓ Azərbaycan dilində</span>
              <span>✓ Real kod yaz</span>
            </div>
          </div>

          {/* Hero illustration — code editor mockup */}
          <div className="hidden lg:block">
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl shadow-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-slate-500 text-xs ml-2">salam.py</span>
              </div>
              <pre className="text-sm font-mono leading-relaxed">
                <code>
                  <span className="text-purple-400">print</span>
                  <span className="text-slate-300">(</span>
                  <span className="text-green-400">
                    &quot;Salam, Dünya!&quot;
                  </span>
                  <span className="text-slate-300">)</span>
                  {"\n\n"}
                  <span className="text-purple-400">ad</span>
                  <span className="text-slate-400"> = </span>
                  <span className="text-purple-400">input</span>
                  <span className="text-slate-300">(</span>
                  <span className="text-green-400">
                    &quot;Adın nədir? &quot;
                  </span>
                  <span className="text-slate-300">)</span>
                  {"\n"}
                  <span className="text-purple-400">print</span>
                  <span className="text-slate-300">(</span>
                  <span className="text-green-400">f&quot;Xoş gəldin, </span>
                  <span className="text-yellow-300">{"{ad}"}</span>
                  <span className="text-green-400">!&quot;</span>
                  <span className="text-slate-300">)</span>
                </code>
              </pre>
              <div className="mt-4 bg-slate-800 rounded-lg p-3 text-sm font-mono">
                <span className="text-green-400">▶ </span>
                <span className="text-slate-300">Salam, Dünya!</span>
                {"\n"}
                <span className="text-yellow-300">Adın nədir? </span>
                <span className="text-slate-300">Aynur</span>
                {"\n"}
                <span className="text-green-400">▶ </span>
                <span className="text-slate-300">Xoş gəldin, Aynur!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Niyə Acodemia?</h2>
            <p className="text-muted-foreground text-lg">
              Kodlamanı əyləncəli və əlçatan edən xüsusiyyətlər
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "Real kod yaz",
                desc: "Brauzerində kod yaz və nəticəni dərhal gör. Heç bir quraşdırma lazım deyil.",
              },
              {
                icon: "🎮",
                title: "Oyunlaşdırılmış təhsil",
                desc: "XP qazan, səviyyə artır, nişanlar topla və liderlik cədvəlində yarış.",
              },
              {
                icon: "🇦🇿",
                title: "Azərbaycan dilində",
                desc: "Bütün dərslər, izahlar və tapşırıqlar Azərbaycan dilindədir.",
              },
              {
                icon: "📚",
                title: "İnformatika müfredatı",
                desc: "Milli imtahan müfredatına uyğun dərslər. Nəzəriyyədən praktikaya keçid.",
              },
              {
                icon: "🏆",
                title: "Quizlər və imtahanlar",
                desc: "Biliklərini yoxla, zamanlı quizlərdə yarış və nəticələrini izlə.",
              },
              {
                icon: "📱",
                title: "Hər yerdən əlçatan",
                desc: "Kompüter, planşet və ya telefon — istədiyin cihazdan daxil ol.",
              },
            ].map((feature) => (
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
            <h2 className="text-3xl font-bold mb-3">Müfredat</h2>
            <p className="text-muted-foreground text-lg">
              4 modul, 20 interaktiv dərs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-6 rounded-2xl border bg-card text-center hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-3">{mod.icon}</div>
                <h3 className="font-semibold mb-1">Modul {mod.id}</h3>
                <p className="text-primary font-medium">{mod.title_az}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {mod.lessons} dərs
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Kodlamağa hazırsan?</h2>
          <p className="text-white/80 text-lg">
            Pulsuz qeydiyyatdan keç və ilk dərsini bu gün tamamla.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 mt-4"
            >
              İndi başla →
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
              © 2026 Acodemia. Bütün hüquqlar qorunur.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Bakı, Azərbaycan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
