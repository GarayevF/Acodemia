import { AuthForm } from "@/components/auth/auth-form";
import { LogoFull } from "@/components/logo";
import Link from "next/link";

export const metadata = { title: "Qeydiyyat" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-white space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-mono font-bold text-xl">
              {"<A>"}
            </div>
            <span className="text-3xl font-bold">Acodemia</span>
          </div>
          <h2 className="text-2xl font-semibold leading-tight">
            Pulsuz başla,
            <br />
            kodlamağı öyrən.
          </h2>
          <p className="text-white/80 text-lg">
            20 interaktiv dərs, oyunlaşdırılmış sistem və HTML, CSS, JavaScript,
            Python dərsləri səni gözləyir.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex justify-center">
            <LogoFull />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Yeni hesab yarat</h1>
            <p className="text-muted-foreground">
              Pulsuz qeydiyyatdan keç və kodlamağa başla
            </p>
          </div>
          <AuthForm mode="register" />
          <p className="text-center text-sm text-muted-foreground">
            Artıq hesabın var?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Daxil ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
