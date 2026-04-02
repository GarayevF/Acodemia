import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/types";
import Link from "next/link";

export const metadata = { title: "İdarə paneli" };

export default function DashboardPage() {
  // TODO: Fetch real data from Supabase
  const xp = 150;
  const level = 2;
  const levelTitle = "Kod Kəşfçisi";
  const lessonsCompleted = 3;
  const totalLessons = 20;
  const levelProgress = 50;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Xoş gəldin! 👋</h1>
        <p className="text-muted-foreground">
          Kodlama səyahətinə davam et
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Səviyyə
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {level}
            </div>
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
              Tamamlanan dərslər
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
              Nişanlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">İlk Addım 🏅</p>
          </CardContent>
        </Card>
      </div>

      {/* Continue learning */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Davam et</h2>
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Modul 1 — Dərs 4</p>
              <h3 className="text-lg font-semibold">
                İlk kodunuz: &quot;Salam, Dünya!&quot;
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                +50 XP qazanacaqsan
              </p>
            </div>
            <Link href="/lessons/4">
              <Button>Davam et →</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Modules overview */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Modullar</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod) => (
            <Link key={mod.id} href={`/lessons?module=${mod.id}`}>
              <Card className="p-5 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">{mod.icon}</div>
                <h3 className="font-semibold text-sm">Modul {mod.id}</h3>
                <p className="text-primary text-sm font-medium">
                  {mod.title_az}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mod.lessons} dərs
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
