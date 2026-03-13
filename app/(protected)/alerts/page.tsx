"use client";

import Image from "next/image";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  Filter,
  MapPin,
  Thermometer,
  Waves,
  Droplets,
  Activity,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const alertSummary = {
  active: 1,
  warning: 2,
  resolved: 4,
  lastUpdated: "Just now",
};

const alerts = [
  {
    id: "ALT-001",
    title: "Temperature above preferred range",
    metric: "Temperature",
    value: "31.4°C",
    site: "IMTA Cage 1",
    level: "warning" as const,
    time: "Today, 11:20 AM",
    description:
      "Temperature has moved slightly above the preferred operational threshold. Monitor closely and review site conditions.",
    action:
      "Check water conditions and review if readings remain high over the next monitoring interval.",
  },
  {
    id: "ALT-002",
    title: "Turbidity increasing",
    metric: "Turbidity",
    value: "9.8 NTU",
    site: "Seaweed Line A",
    level: "warning" as const,
    time: "Today, 09:10 AM",
    description:
      "Water clarity has decreased compared to the recent baseline. This may affect water quality assessment and site conditions.",
    action:
      "Inspect surrounding water conditions and compare with next scheduled readings.",
  },
  {
    id: "ALT-003",
    title: "All current parameters stable",
    metric: "System",
    value: "Normal",
    site: "IMTA Cage 2",
    level: "resolved" as const,
    time: "Yesterday, 04:35 PM",
    description:
      "The previously observed fluctuation has returned to the expected operating range.",
    action:
      "No immediate action required. Continue routine monitoring.",
  },
];

export default function AlertsPage() {
  return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top bar */}
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
                Alerts & notifications
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusPill label={`Last updated: ${alertSummary.lastUpdated}`} tone="muted" />
            <Button className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
              Refresh alerts
            </Button>
          </div>
        </div>

        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--bahari-blue)]">
              Alerts
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Review active warnings, site-level issues, and recently resolved monitoring alerts.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm">
            <Filter size={16} className="text-[var(--bahari-blue)]" />
            <span className="text-slate-600">Filter:</span>
            <span className="font-medium">All alerts</span>
          </div>
        </div>

        {/* Summary cards */}
        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <SummaryCard
            title="Active alerts"
            value={String(alertSummary.active)}
            tone="warning"
            icon={<AlertTriangle size={22} />}
            hint="Needs attention"
          />
          <SummaryCard
            title="Warnings"
            value={String(alertSummary.warning)}
            tone="warning"
            icon={<Bell size={22} />}
            hint="Monitor conditions"
          />
          <SummaryCard
            title="Resolved"
            value={String(alertSummary.resolved)}
            tone="normal"
            icon={<CheckCircle2 size={22} />}
            hint="Returned to normal"
          />
        </section>

        {/* Alerts list */}
        <section className="space-y-5">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className="rounded-3xl border-white/80 bg-white shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <AlertMetricIcon metric={alert.metric} />
                      <StatusPill
                        label={
                          alert.level === "resolved"
                            ? "Resolved"
                            : alert.level === "warning"
                              ? "Warning"
                              : "Critical"
                        }
                        tone={alert.level === "resolved" ? "normal" : "warning"}
                      />
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        {alert.id}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-[var(--bahari-blue)]">
                      {alert.title}
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {alert.description}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <MetaItem
                        icon={<MapPin size={15} />}
                        label="Site"
                        value={alert.site}
                      />
                      <MetaItem
                        icon={<Clock3 size={15} />}
                        label="Detected"
                        value={alert.time}
                      />
                      <MetaItem
                        icon={<Bell size={15} />}
                        label="Observed value"
                        value={alert.value}
                      />
                    </div>

                    <div className="mt-5 rounded-2xl border bg-[var(--bahari-sea)]/40 p-4">
                      <div className="text-sm font-semibold text-[var(--bahari-blue)]">
                        Recommended action
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {alert.action}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-row gap-3 lg:flex-col">
                    <Button
                      variant="outline"
                      className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50"
                    >
                      View site
                    </Button>
                    <Button
                      className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]"
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
  );
}

function SummaryCard({
  title,
  value,
  tone,
  icon,
  hint,
}: {
  title: string;
  value: string;
  tone: "normal" | "warning";
  icon: React.ReactNode;
  hint: string;
}) {
  const box =
    tone === "normal"
      ? "bg-[var(--bahari-green-soft)] border-emerald-200"
      : "bg-amber-50 border-amber-200";

  const text =
    tone === "normal"
      ? "text-[var(--bahari-green)]"
      : "text-amber-700";

  return (
    <Card className={`rounded-3xl shadow-md ${box}`}>
      <CardContent className="p-6">
        <div className={`inline-flex items-center gap-2 ${text}`}>
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <div className="mt-5 text-4xl font-extrabold text-[var(--bahari-blue)]">
          {value}
        </div>
        <div className="mt-2 text-sm text-slate-600">{hint}</div>
      </CardContent>
    </Card>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white px-4 py-3">
      <div className="mb-1 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}

function AlertMetricIcon({ metric }: { metric: string }) {
  const shared = "text-[var(--bahari-blue)]";

  if (metric === "Temperature") return <Thermometer size={18} className={shared} />;
  if (metric === "pH") return <Droplets size={18} className={shared} />;
  if (metric === "Salinity") return <Waves size={18} className={shared} />;
  if (metric === "Turbidity") return <Activity size={18} className={shared} />;
  return <Bell size={18} className={shared} />;
}

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "normal" | "warning" | "muted";
}) {
  const classes =
    tone === "normal"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-slate-200 bg-white text-slate-600";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}
    >
      {label}
    </span>
  );
}