import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const metadata = { title: "Profil" };

export default function ProfilePage() {
  // TODO: Fetch from Supabase
  const profile = {
    name: "Aynur Həsənova",
    email: "aynur@mail.com",
    school: "45 nömrəli məktəb",
    xp: 150,
    level: 2,
    levelTitle: "Kod Kəşfçisi",
    lessonsCompleted: 3,
    quizzesCompleted: 1,
    streak: 3,
    badges: [
      { id: 1, name: "İlk Addım", icon: "🏅", desc: "İlk dərsi tamamla" },
    ],
  };

  const levelProgress = 50; // (150-100)/(300-100)*100

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Profile header */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20 text-2xl">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.school}</p>
            <div className="flex items-center gap-3 mt-2">
              <Badge className="bg-primary">
                Səviyyə {profile.level} — {profile.levelTitle}
              </Badge>
              <Badge variant="outline">{profile.xp} XP</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* XP Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Səviyyə irəliləyişi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm mb-2">
            <span>Səviyyə {profile.level}</span>
            <span>{profile.xp} / 300 XP</span>
            <span>Səviyyə 3</span>
          </div>
          <Progress value={levelProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Növbəti səviyyəyə {300 - profile.xp} XP qalıb
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5 text-center">
          <div className="text-3xl font-bold text-primary">
            {profile.lessonsCompleted}
          </div>
          <p className="text-sm text-muted-foreground">Tamamlanan dərs</p>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-3xl font-bold text-primary">
            {profile.quizzesCompleted}
          </div>
          <p className="text-sm text-muted-foreground">Tamamlanan quiz</p>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-3xl font-bold text-primary">
            {profile.streak} gün
          </div>
          <p className="text-sm text-muted-foreground">Ardıcıl giriş</p>
        </Card>
      </div>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Nişanlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {profile.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
              >
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="font-medium text-sm">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </div>
            ))}
            <Separator className="my-2" />
            <p className="text-sm text-muted-foreground">
              Daha çox dərs tamamla, daha çox nişan qazan!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
