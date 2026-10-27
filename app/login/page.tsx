"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Phone, Waves, Mail, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LANDING_PAGE_URL = process.env.NEXT_PUBLIC_LANDING_PAGE_URL || "https://baharicbo.com";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get("identifier") ?? "").trim();
    if (!identifier) return;
    sessionStorage.setItem("bahari-farmer-identifier", identifier);
    router.push("/dashboard");
  };

  const requestPasswordReset = () => {
    const subject = encodeURIComponent("Farmer’s Link password assistance");
    window.location.href = `mailto:info@baharicbo.org?subject=${subject}`;
  };

  return (
    <main className="min-h-screen bg-[var(--bahari-sand)] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[var(--bahari-sea)] via-white to-[var(--bahari-green-soft)] p-10 lg:flex">
          <div className="pointer-events-none absolute inset-0 opacity-40"><div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[var(--bahari-sea)] blur-3xl" /><div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[var(--bahari-green-soft)] blur-3xl" /></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/60 bg-white shadow-sm"><Image src="/logo-icon.png" alt="Bahari CBO Network logo" fill className="object-cover" priority /></div>
            <div><div className="text-xl font-bold text-[var(--bahari-blue)]">Bahari CBO Network</div><div className="text-sm text-slate-600">Blue Empowerment (BE) · Farmer’s Link</div></div>
          </div>

          <div className="relative z-10 max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--bahari-green)]/20 bg-white/70 px-4 py-2 text-sm font-medium text-[var(--bahari-green)] shadow-sm"><Waves size={16} /> Coastal monitoring made practical</div>
            <div className="space-y-4"><h1 className="text-5xl font-extrabold leading-tight text-[var(--bahari-blue)]">Farmer’s Link</h1><p className="text-lg leading-8 text-slate-700">Access your monitoring site, review temperature trends, and keep track of device connectivity and alerts.</p></div>
            <div className="grid gap-4 sm:grid-cols-3"><InfoPill title="Site visibility" text="Know your latest readings" /><InfoPill title="Timely alerts" text="Spot conditions to review" /><InfoPill title="Field-ready" text="Designed for coastal teams" /></div>
          </div>
          <div className="relative z-10 text-sm text-slate-600">Bahari Yetu Maisha Yetu</div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md space-y-6">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm"><Image src="/logo-icon.png" alt="Bahari CBO Network logo" fill className="object-cover" priority /></div>
              <div><div className="font-bold text-[var(--bahari-blue)]">Bahari CBO Network</div><div className="text-xs text-slate-500">Blue Empowerment (BE) · Farmer’s Link</div></div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"><Lock size={14} /> Farmer access</div>
              <h2 className="text-3xl font-bold text-[var(--bahari-blue)]">Welcome back</h2>
              <p className="text-sm leading-6 text-slate-600">Sign in to open your monitoring dashboard, site readings, and alert history.</p>
            </div>

            <Card className="rounded-3xl border-slate-200 bg-white shadow-xl">
              <CardContent className="p-6 sm:p-7">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2"><label htmlFor="identifier" className="text-sm font-medium text-slate-700">Phone or email</label><Input id="identifier" name="identifier" type="text" placeholder="Enter phone number or email" autoComplete="username" required className="h-11 rounded-2xl" /></div>
                  <div className="space-y-2"><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label><button type="button" onClick={requestPasswordReset} className="text-xs font-medium text-[var(--bahari-blue)] hover:underline">Forgot password?</button></div><Input id="password" name="password" type="password" placeholder="Enter password" autoComplete="current-password" required className="h-11 rounded-2xl" /></div>
                  <Button type="submit" className="h-11 w-full rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">Sign in <ArrowRight size={16} /></Button>
                </form>
                <div className="mt-5 rounded-2xl border border-slate-100 bg-[var(--bahari-sand)] p-4 text-sm text-slate-600"><div className="font-semibold text-[var(--bahari-blue)]">Need access?</div><p className="mt-1 leading-5">Contact the Bahari CBO Network team to request or update your account access.</p><a href="mailto:info@baharicbo.org" className="mt-3 inline-flex items-center gap-2 font-semibold text-[var(--bahari-blue)] hover:underline"><Mail size={14} /> Contact support</a></div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600"><div className="inline-flex items-center gap-2"><Phone size={15} className="text-[var(--bahari-blue)]" /> 0712729004</div><Link href={LANDING_PAGE_URL} className="font-medium text-[var(--bahari-blue)] hover:underline">Back to main website</Link></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoPill({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
      <div className="font-semibold text-[var(--bahari-blue)]">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{text}</div>
    </div>
  );
}