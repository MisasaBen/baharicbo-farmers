"use client";

import Image from "next/image";
import {
  Activity,
  BarChart3,
  Bell,
  Clock3,
  Droplets,
  MapPin,
  Thermometer,
  Waves,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const site = {
  id: "imta-cage-1",
  name: "IMTA Cage 1",
  location: "Kwale Coast",
  status: "Normal",
  lastSync: "2 mins ago",
  description:
    "Primary IMTA monitoring site supporting fish and seaweed environmental tracking.",
};

const metrics = [
  { label: "Temperature", value: "27.4°C", icon: Thermometer, hint: "Within expected range" },
  { label: "pH", value: "7.90", icon: Droplets, hint: "Balanced condition" },
  { label: "Salinity", value: "33.0 ppt", icon: Waves, hint: "Stable water concentration" },
  { label: "Turbidity", value: "4.0 NTU", icon: Activity, hint: "Clear water state" },
];

export default function SiteDetailPage() {
  return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
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
              <div className="text-lg font-bold text-[var(--bahari-blue)]">
                Farmer’s Link
              </div>
              <div className="text-sm text-slate-500">
                Site detail view
              </div>
            </div>
          </div>

          <Button className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
            View records
          </Button>
        </div>

        <section className="mb-8 rounded-3xl border bg-white p-6 shadow-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} />
                {site.location}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-[var(--bahari-blue)]">
                {site.name}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                {site.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InfoBox label="Site status" value={site.status} />
              <InfoBox label="Last sync" value={site.lastSync} />
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="rounded-3xl shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--bahari-sea)] text-[var(--bahari-blue)]">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{metric.label}</div>
                      <div className="text-xs text-slate-500">{metric.hint}</div>
                    </div>
                  </div>
                  <div className="mt-5 text-3xl font-extrabold text-[var(--bahari-blue)]">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <Card className="rounded-3xl shadow-md xl:col-span-2">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex items-center gap-2 font-semibold text-[var(--bahari-blue)]">
                <BarChart3 size={18} />
                Site trend preview
              </div>
              <div className="rounded-2xl border bg-[var(--bahari-sand)] p-4">
                <div className="flex h-44 items-end gap-3">
                  {[46, 54, 59, 66, 60, 70, 64].map((bar, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                      <div
                        className="w-full rounded-2xl bg-[var(--bahari-blue)]/80"
                        style={{ height: `${bar}%` }}
                      />
                      <span className="text-xs text-slate-500">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="inline-flex items-center gap-2 font-semibold text-[var(--bahari-blue)]">
                <Bell size={18} />
                Site alerts
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-[var(--bahari-green-soft)] p-4">
                <div className="font-medium text-slate-800">No active critical alerts</div>
                <p className="mt-1 text-sm text-slate-600">
                  This site is currently operating within expected monitoring thresholds.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-4">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Clock3 size={14} />
                  Monitoring note
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Real alert timelines and acknowledgement history will appear here after backend integration.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-[var(--bahari-sand)] px-4 py-4">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}