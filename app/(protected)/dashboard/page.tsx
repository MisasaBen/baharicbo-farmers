"use client";

import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  Clock3,
  Droplets,
  MapPin,
  Thermometer,
  Waves,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const currentSite = {
  id: "imta-cage-1",
  name: "IMTA Cage 1",
  location: "Kwale Coast",
  lastSync: "2 mins ago",
  status: "Normal",
};

const metrics = [
  {
    label: "Temperature",
    value: "27.4°C",
    hint: "Optimal range maintained",
    icon: Thermometer,
    tone: "normal",
  },
  {
    label: "pH",
    value: "7.90",
    hint: "Balanced water condition",
    icon: Droplets,
    tone: "normal",
  },
  {
    label: "Salinity",
    value: "33.0 ppt",
    hint: "Within expected range",
    icon: Waves,
    tone: "normal",
  },
  {
    label: "Turbidity",
    value: "4.0 NTU",
    hint: "Water clarity is stable",
    icon: Activity,
    tone: "normal",
  },
];

const alerts = [
  {
    title: "No active critical alerts",
    description: "All monitored parameters are currently within normal operating thresholds.",
    level: "normal",
  },
];

const recentReadings = [
  { time: "08:00", temperature: "27.1°C", ph: "7.86", salinity: "32.8 ppt", turbidity: "4.2 NTU" },
  { time: "10:00", temperature: "27.3°C", ph: "7.88", salinity: "33.0 ppt", turbidity: "4.1 NTU" },
  { time: "12:00", temperature: "27.4°C", ph: "7.90", salinity: "33.0 ppt", turbidity: "4.0 NTU" },
  { time: "14:00", temperature: "27.5°C", ph: "7.91", salinity: "33.1 ppt", turbidity: "4.1 NTU" },
];

const trendBars = [45, 58, 52, 72, 64, 60, 69];

export default function DashboardPage() {
  return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top bar */}
        {/* <div className="mb-8 flex flex-col gap-4 rounded-3xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
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
                Blue Empowerment (BE) • Monitoring Dashboard
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusPill label="Secure access" tone="muted" icon={<Bell size={14} />} />
            <Button className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
              Export summary
            </Button>
          </div>
        </div> */}

        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--bahari-blue)]">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              View the latest environmental readings, alert status, and recent activity for your monitoring site.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="inline-flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm">
              <MapPin size={16} className="text-[var(--bahari-blue)]" />
              <span className="font-medium">{currentSite.name}</span>
              <ChevronDown size={16} className="text-slate-400" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm">
              <Clock3 size={16} className="text-[var(--bahari-blue)]" />
              <span className="text-slate-600">Last sync:</span>
              <span className="font-medium">{currentSite.lastSync}</span>
            </div>
          </div>
        </div>

        {/* Status banner */}
        <div className="mb-8 rounded-3xl border border-emerald-200 bg-[var(--bahari-green-soft)] p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-[var(--bahari-green)]">
                Site status: {currentSite.status}
              </div>
              <div className="mt-1 text-sm text-slate-700">
                All current readings for {currentSite.name} are within the expected safe operating range.
              </div>
            </div>

            <StatusPill label="System healthy" tone="normal" />
          </div>
        </div>

        {/* Metrics */}
        <section className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="rounded-3xl border-white/80 bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--bahari-sea)] text-[var(--bahari-blue)]">
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{metric.label}</div>
                        <div className="text-xs text-slate-500">{metric.hint}</div>
                      </div>
                    </div>

                    <StatusPill label="Normal" tone="normal" />
                  </div>

                  <div className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--bahari-blue)]">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Middle row */}
        <section className="mb-8 grid gap-6 xl:grid-cols-3">
          {/* Alerts */}
          <Card className="rounded-3xl border-white/80 bg-white shadow-md xl:col-span-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-semibold text-[var(--bahari-blue)]">
                  <Bell size={18} />
                  Alerts
                </div>
                <span className="text-xs text-slate-500">Live status</span>
              </div>

              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-emerald-200 bg-[var(--bahari-green-soft)] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={18} className="mt-0.5 text-[var(--bahari-green)]" />
                      <div>
                        <div className="font-medium text-slate-800">{alert.title}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-600">
                          {alert.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full rounded-2xl border-slate-200 bg-white hover:bg-slate-50"
                >
                  View alert history
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trend */}
          <Card className="rounded-3xl border-white/80 bg-white shadow-md xl:col-span-2">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-semibold text-[var(--bahari-blue)]">
                  <BarChart3 size={18} />
                  Weekly trend
                </div>
                <span className="text-xs text-slate-500">Mock chart preview</span>
              </div>

              <div className="rounded-2xl border bg-[var(--bahari-sand)] p-4">
                <div className="flex h-48 items-end gap-3">
                  {trendBars.map((bar, index) => (
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

              <p className="mt-4 text-sm text-slate-600">
                This chart will later be connected to live and historical sensor records from the backend API.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Recent readings */}
        <section>
          <Card className="rounded-3xl border-white/80 bg-white shadow-md">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--bahari-blue)]">
                    Recent readings
                  </h2>
                  <p className="text-sm text-slate-500">
                    Latest captured measurements for {currentSite.name}
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50"
                >
                  View all records
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-slate-500">
                      <th className="px-3 py-3 font-medium">Time</th>
                      <th className="px-3 py-3 font-medium">Temperature</th>
                      <th className="px-3 py-3 font-medium">pH</th>
                      <th className="px-3 py-3 font-medium">Salinity</th>
                      <th className="px-3 py-3 font-medium">Turbidity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReadings.map((row) => (
                      <tr key={row.time} className="border-b last:border-b-0">
                        <td className="px-3 py-4 font-medium text-slate-800">{row.time}</td>
                        <td className="px-3 py-4 text-slate-600">{row.temperature}</td>
                        <td className="px-3 py-4 text-slate-600">{row.ph}</td>
                        <td className="px-3 py-4 text-slate-600">{row.salinity}</td>
                        <td className="px-3 py-4 text-slate-600">{row.turbidity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
  );
}

function StatusPill({
  label,
  tone,
  icon,
}: {
  label: string;
  tone: "normal" | "warning" | "muted";
  icon?: React.ReactNode;
}) {
  const classes =
    tone === "normal"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-slate-200 bg-white text-slate-600";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}
    >
      {icon ? icon : null}
      {label}
    </span>
  );
}