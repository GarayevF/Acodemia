import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = { title: "Liderlik cədvəli" };

// Mock data — will come from Supabase
const LEADERBOARD = [
  { rank: 1, name: "Əli Məmmədov", school: "45 nömrəli məktəb", xp: 520, level: 4 },
  { rank: 2, name: "Aynur Həsənova", school: "45 nömrəli məktəb", xp: 410, level: 3 },
  { rank: 3, name: "Kamran Əliyev", school: "132 nömrəli məktəb", xp: 380, level: 3 },
  { rank: 4, name: "Nigar Rəhimova", school: "132 nömrəli məktəb", xp: 290, level: 2 },
  { rank: 5, name: "Tural Hüseynov", school: "45 nömrəli məktəb", xp: 250, level: 2 },
  { rank: 6, name: "Ləman Quliyeva", school: "45 nömrəli məktəb", xp: 200, level: 2 },
  { rank: 7, name: "Rəşad İsmayılov", school: "132 nömrəli məktəb", xp: 180, level: 2 },
  { rank: 8, name: "Günel Babayeva", school: "45 nömrəli məktəb", xp: 150, level: 2 },
  { rank: 9, name: "Orxan Nəsirov", school: "132 nömrəli məktəb", xp: 120, level: 2 },
  { rank: 10, name: "Fidan Əsgərova", school: "45 nömrəli məktəb", xp: 80, level: 1 },
];

const medalColors: Record<number, string> = {
  1: "text-yellow-500",
  2: "text-slate-400",
  3: "text-amber-600",
};

function LeaderboardTable({ data }: { data: typeof LEADERBOARD }) {
  return (
    <div className="space-y-3">
      {data.map((user) => (
        <Card
          key={user.rank}
          className={`p-4 flex items-center gap-4 ${user.rank <= 3 ? "border-primary/30 bg-primary/5" : ""}`}
        >
          <div
            className={`w-8 text-center font-bold text-lg ${medalColors[user.rank] ?? "text-muted-foreground"}`}
          >
            {user.rank <= 3 ? ["🥇", "🥈", "🥉"][user.rank - 1] : user.rank}
          </div>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.school}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary">{user.xp} XP</p>
            <Badge variant="outline" className="text-xs">
              Səviyyə {user.level}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Liderlik cədvəli</h1>
        <p className="text-muted-foreground">
          Ən yüksək XP-yə sahib şagirdlər
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Hamısı</TabsTrigger>
          <TabsTrigger value="school1">45 nömrəli məktəb</TabsTrigger>
          <TabsTrigger value="school2">132 nömrəli məktəb</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <LeaderboardTable data={LEADERBOARD} />
        </TabsContent>
        <TabsContent value="school1" className="mt-6">
          <LeaderboardTable
            data={LEADERBOARD.filter(
              (u) => u.school === "45 nömrəli məktəb"
            ).map((u, i) => ({ ...u, rank: i + 1 }))}
          />
        </TabsContent>
        <TabsContent value="school2" className="mt-6">
          <LeaderboardTable
            data={LEADERBOARD.filter(
              (u) => u.school === "132 nömrəli məktəb"
            ).map((u, i) => ({ ...u, rank: i + 1 }))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
