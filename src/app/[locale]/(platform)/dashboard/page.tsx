import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/types";
import Link from "next/link";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.dashboard;

  // TODO: Fetch real data from Supabase
  const xp = 150;
  const level = 2;
  const levelTitle = dict.levels["2"];
  const lessonsCompleted = 3;
  const totalLessons = 20;
  const levelProgress = 50;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">{t.welcome}</h1>
        <p className="text-muted-foreground">{t.welcomeDesc}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.level}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{level}</div>
            <p className="text-sm text-muted-foreground">{levelTitle}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{xp}</div>
            <Progress value={levelProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.completedLessons}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lessonsCompleted}/{totalLessons}
            </div>
            <Progress
              value={(lessonsCompleted / totalLessons) * 100}
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.badges}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">
              {locale === "az" ? "İlk Addım" : "First Step"} 🏅
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue learning */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t.continueTitle}</h2>
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.moduleLesson
                  .replace("{module}", "1")
                  .replace("{lesson}", "4")}
              </p>
              <h3 className="text-lg font-semibold">
                {locale === "az"
                  ? 'İlk kodunuz: "Salam, Dünya!"'
                  : 'Your first code: "Hello, World!"'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t.xpReward.replace("{xp}", "50")}
              </p>
            </div>
            <Link href={`/${locale}/lessons/4`}>
              <Button>{t.continue}</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Modules overview */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t.modulesTitle}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod) => (
            <Link key={mod.id} href={`/${locale}/lessons?module=${mod.id}`}>
              <Card className="p-5 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">{mod.icon}</div>
                <h3 className="font-semibold text-sm">
                  {t.module} {mod.id}
                </h3>
                <p className="text-primary text-sm font-medium">
                  {dict.modules[String(mod.id) as keyof typeof dict.modules]}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mod.lessons} {t.lessonCount}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
