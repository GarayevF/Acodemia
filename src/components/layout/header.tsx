"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogoFull } from "@/components/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDict, useLocale } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const router = useRouter();
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

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}`);
    router.refresh();
  }

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-6">
      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 hover:bg-accent hover:text-accent-foreground">
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6 border-b">
              <LogoFull />
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
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
          </SheetContent>
        </Sheet>
      </div>

      <div className="md:hidden">
        <LogoFull />
      </div>

      {/* Spacer for desktop */}
      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          {dict.nav.logout}
        </Button>
      </div>
    </header>
  );
}
