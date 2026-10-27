"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BatteryCharging,
  Bell,
  CheckCircle2,
  Clock3,
  Download,
  Filter,
  MapPin,
  RadioTower,
  Search,
  Thermometer,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { monitoringAlerts } from "@/lib/mock-data";
import { downloadCsv } from "@/lib/utils";
import type { AlertStatus, MonitoringAlert } from "@/types/alert";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<MonitoringAlert[]>(monitoringAlerts);
  const [filter, setFilter] = useState<"all" | AlertStatus>("all");
  const [query, setQuery] = useState("");

  const summary = useMemo(() => ({
    active: alerts.filter((alert) => alert.status === "active").length,
    acknowledged: alerts.filter((alert) => alert.status === "acknowledged").length,
    resolved: alerts.filter((alert) => alert.status === "resolved").length,
  }), [alerts]);

  const filteredAlerts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return alerts.filter((alert) => {
      const matchesStatus = filter === "all" || alert.status === filter;
      const matchesQuery = !normalizedQuery || [alert.title, alert.siteName, alert.id, alert.metric, alert.value]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    });
  }, [alerts, filter, query]);

  const updateStatus = (id: string, status: AlertStatus) => {
    setAlerts((current) => current.map((alert) => alert.id === id ? { ...alert, status } : alert));
  };

  const exportAlerts = () => downloadCsv("farmer-alert-history.csv", filteredAlerts.map((alert) => ({
    ID: alert.id,
    Alert: alert.title,
    Metric: alert.metric,
    Value: alert.value,
    Site: alert.siteName,
    Severity: alert.severity,
    Status: alert.status,
    Detected: alert.detectedAt,
    RecommendedAction: alert.action,
  })));

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">
            <Bell size={14} /> Monitoring centre
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--bahari-blue)]">Alerts & notifications</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review temperature exceptions, device connectivity issues, and maintenance items across your assigned monitoring network.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setAlerts(monitoringAlerts)} className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50">
            Refresh alerts
          </Button>
          <Button onClick={exportAlerts} className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
            <Download size={16} /> Export history
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard title="Active alerts" value={summary.active} hint="Require review or follow-up" tone="critical" icon={<AlertTriangle size={20} />} />
        <SummaryCard title="Acknowledged" value={summary.acknowledged} hint="Seen by the project team" tone="warning" icon={<Bell size={20} />} />
        <SummaryCard title="Resolved" value={summary.resolved} hint="Returned to a normal state" tone="normal" icon={<CheckCircle2 size={20} />} />
      </section>

      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div>
              <label htmlFor="alert-search" className="mb-2 block text-sm font-semibold text-slate-700">Search alerts</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input id="alert-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by site, alert, ID, or value" className="h-11 rounded-2xl pl-9" />
              </div>
            </div>
            <div>
              <label htmlFor="alert-filter" className="mb-2 block text-sm font-semibold text-slate-700">Status filter</label>
              <div className="relative">
                <Filter size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select id="alert-filter" value={filter} onChange={(event) => setFilter(event.target.value as "all" | AlertStatus)} className="h-11 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[var(--bahari-blue)]">
                  <option value="all">All alerts</option>
                  <option value="active">Active</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[var(--bahari-blue)]">Alert history</h2>
          <span className="text-sm text-slate-500">{filteredAlerts.length} result{filteredAlerts.length === 1 ? "" : "s"}</span>
        </div>

        {filteredAlerts.length ? filteredAlerts.map((alert) => (
          <Card key={alert.id} className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <AlertMetricIcon metric={alert.metric} />
                    <StatusPill label={alert.severity === "critical" ? "Critical" : "Warning"} tone={alert.severity === "critical" ? "critical" : "warning"} />
                    <StatusPill label={statusLabel(alert.status)} tone={statusTone(alert.status)} />
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{alert.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--bahari-blue)]">{alert.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{alert.description}</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <MetaItem icon={<MapPin size={15} />} label="Site" value={alert.siteName} />
                    <MetaItem icon={<Clock3 size={15} />} label="Detected" value={alert.detectedAt} />
                    <MetaItem icon={<AlertMetricIcon metric={alert.metric} />} label="Observed value" value={alert.value} />
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-100 bg-[var(--bahari-sea)]/35 p-4">
                    <div className="text-sm font-semibold text-[var(--bahari-blue)]">Recommended action</div>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{alert.action}</p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-row gap-2 xl:flex-col">
                  <Button asChild variant="outline" className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50">
                    <Link href={`/sites/${alert.siteId}`}>View site</Link>
                  </Button>
                  {alert.status === "active" ? (
                    <Button onClick={() => updateStatus(alert.id, "acknowledged")} className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">Acknowledge</Button>
                  ) : alert.status === "acknowledged" ? (
                    <Button onClick={() => updateStatus(alert.id, "resolved")} className="rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800">Mark resolved</Button>
                  ) : (
                    <Button onClick={() => updateStatus(alert.id, "active")} variant="outline" className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50">Reopen</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
            <div className="font-semibold text-slate-700">No alerts match those filters</div>
            <p className="mt-1 text-sm text-slate-500">Try a different status or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  hint,
  tone,
  icon,
}: {
  title: string;
  value: number;
  hint: string;
  tone: "normal" | "warning" | "critical";
  icon: React.ReactNode;
}) {
  const palette = {
    normal: "border-emerald-200 bg-emerald-50/70 text-emerald-700",
    warning: "border-amber-200 bg-amber-50/70 text-amber-800",
    critical: "border-rose-200 bg-rose-50/70 text-rose-700",
  };
  return (
    <Card className={`rounded-3xl border shadow-sm ${palette[tone]}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">{title}</span>
          {icon}
        </div>
        <div className="mt-4 text-4xl font-extrabold text-[var(--bahari-blue)]">{value}</div>
        <div className="mt-1 text-sm text-slate-600">{hint}</div>
      </CardContent>
    </Card>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
      <div className="mb-1 inline-flex items-center gap-2 text-xs font-medium text-slate-500">{icon}{label}</div>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function AlertMetricIcon({ metric }: { metric: MonitoringAlert["metric"] }) {
  const className = "text-[var(--bahari-blue)]";
  if (metric === "Temperature") return <Thermometer size={18} className={className} />;
  if (metric === "Battery") return <BatteryCharging size={18} className={className} />;
  return <RadioTower size={18} className={className} />;
}

function statusLabel(status: AlertStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusTone(status: AlertStatus): "normal" | "warning" | "muted" {
  if (status === "resolved") return "normal";
  if (status === "acknowledged") return "muted";
  return "warning";
}

function StatusPill({ label, tone }: { label: string; tone: "normal" | "warning" | "critical" | "muted" }) {
  const classes = {
    normal: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    critical: "border-rose-200 bg-rose-50 text-rose-700",
    muted: "border-slate-200 bg-slate-100 text-slate-600",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${classes[tone]}`}>{label}</span>;
}
