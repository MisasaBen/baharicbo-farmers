import Image from "next/image";
import Link from "next/link";
import { Lock, Phone, Waves } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--bahari-sand)] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand side */}
        <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[var(--bahari-sea)] via-white to-[var(--bahari-green-soft)] p-10">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-[var(--bahari-sea)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[var(--bahari-green-soft)] blur-3xl" />
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/60 bg-white shadow-sm">
              <Image
                src="/logo-icon.png"
                alt="Bahari CBO Network logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--bahari-blue)]">
                Bahari CBO Network
              </div>
              <div className="text-sm text-slate-600">
                Blue Empowerment (BE) • Farmer’s Link
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--bahari-green)]/20 bg-white/70 px-4 py-2 text-sm font-medium text-[var(--bahari-green)] shadow-sm">
              <Waves size={16} />
              Coastal monitoring made practical
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold leading-tight text-[var(--bahari-blue)]">
                Farmer’s Link
              </h1>
              <p className="text-lg leading-8 text-slate-700">
                Secure access to your aquaculture monitoring records, site
                updates, alerts, and water quality insights.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoPill title="Offline-aware" text="Built for low-bandwidth use" />
              <InfoPill title="Secure access" text="Role-based portal access" />
              <InfoPill title="Field-ready" text="Designed for farmers and teams" />
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-600">
            Bahari Yetu Maisha Yetu
          </div>
        </section>

        {/* Form side */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md space-y-6">
            {/* Mobile brand */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                <Image
                  src="/logo-icon.png"
                  alt="Bahari CBO Network logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <div className="font-bold text-[var(--bahari-blue)]">
                  Bahari CBO Network
                </div>
                <div className="text-xs text-slate-500">
                  Blue Empowerment (BE) • Farmer’s Link
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                <Lock size={14} />
                Secure portal
              </div>
              <h2 className="text-3xl font-bold text-[var(--bahari-blue)]">
                Sign in
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Access your monitoring dashboard, alerts, and site records.
              </p>
            </div>

            <Card className="rounded-3xl border-white/80 bg-white shadow-xl">
              <CardContent className="space-y-5 p-6 sm:p-7">
                <div className="space-y-2">
                  <label
                    htmlFor="identifier"
                    className="text-sm font-medium text-slate-700"
                  >
                    Phone or email
                  </label>
                  <Input
                    id="identifier"
                    placeholder="Enter phone number or email"
                    className="h-11 rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium text-[var(--bahari-blue)] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="h-11 rounded-2xl"
                  />
                </div>

                <Button className="h-11 w-full rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
                  Sign in
                </Button>

                <div className="rounded-2xl border bg-[var(--bahari-sea)]/50 p-4 text-sm text-slate-700">
                  <div className="mb-1 font-medium text-[var(--bahari-blue)]">
                    Prototype notice
                  </div>
                  Authentication is not yet connected. This page currently
                  serves as the approved UI entry point for the Farmer’s Link
                  platform.
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 text-[var(--bahari-blue)]" />
                <span>
                  Need access? Contact Bahari CBO Network through the project
                  support channels.
                </span>
              </div>

              <div>
                <Link
                  href="https://www.baharicpo.com"
                  className="font-medium text-[var(--bahari-blue)] hover:underline"
                >
                  Back to main website
                </Link>
              </div>
            </div>
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