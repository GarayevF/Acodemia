"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoFull } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useDict, useLocale } from "@/lib/i18n/context";

export function Sidebar() {
  const pathname = usePathname();
  const dict = useDict();
  const locale = useLocale();

  const navItems = [
    { href: `/${locale}/dashboard`, label: dict.nav.dashboard, icon: "📊" },
    { href: `/${locale}/lessons`, label: dict.nav.lessons, icon: "📚" },
    { href: `/${locale}/playground`, label: dict.nav.playground, icon: "💻" },
    { href: `/${locale}/quiz`, label: dict.nav.quiz, icon: "🧠" },
    { href: `/${locale}/leaderboard`, label: dict.nav.leaderboard, icon: "🏆" },
    { href: `/${locale}/profile`, label: dict.nav.profile, icon: "👤" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white h-screen sticky top-0">
      <div className="p-6 border-b">
        <Link href={`/${locale}/dashboard`}>
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
