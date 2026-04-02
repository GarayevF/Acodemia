"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="full_name">Ad və Soyad</Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Adınızı daxil edin"
            required
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">E-poçt</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nümunə@mail.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Şifrə</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Minimum 6 simvol"
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
          ? "Gözləyin..."
          : mode === "login"
            ? "Daxil ol"
            : "Qeydiyyatdan keç"}
      </Button>
    </form>
  );
}
