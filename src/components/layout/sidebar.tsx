"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoFull } from "@/components/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "İdarə paneli", icon: "📊" },
  { href: "/lessons", label: "Dərslər", icon: "📚" },
  { href: "/playground", label: "Kod meydançası", icon: "💻" },
  { href: "/quiz", label: "Quizlər", icon: "🧠" },
  { href: "/leaderboard", label: "Liderlik", icon: "🏆" },
  { href: "/profile", label: "Profil", icon: "👤" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white h-screen sticky top-0">
      <div className="p-6 border-b">
        <Link href="/dashboard">
          <LogoFull />
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
