"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDict, useLocale } from "@/lib/i18n/context";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dict = useDict();
  const locale = useLocale();
  const t = dict.auth;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

    if (mode === "register") {
      const fullName = formData.get("full_name") as string;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    }

    router.push(`/${locale}/dashboard`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="full_name">{t.fullName}</Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            placeholder={t.fullNamePlaceholder}
            required
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">{t.email}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t.emailPlaceholder}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t.password}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={t.passwordPlaceholder}
          minLength={6}
          required
        />
      </div>
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading
          ? t.loading
          : mode === "login"
            ? t.loginButton
            : t.registerButton}
      </Button>
    </form>
  );
}
