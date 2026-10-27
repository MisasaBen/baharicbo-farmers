"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BatteryCharging,
  Bell,
  BarChart3,
  Clock3,
  Download,
  MapPin,
  RadioTower,
  Signal,
  Thermometer,
  Wifi,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getReadingsForSite,
  getSiteById,
  monitoringAlerts,
  monitoringSites,
  temperatureTrend,
} from "@/lib/mock-data";
import { downloadCsv } from "@/lib/utils";
import type { MonitoringSite } from "@/types/site";

export default function DashboardPage() {
  const [selectedSiteId, setSelectedSiteId] = useState("imta-cage-1");
  const site = getSiteById(selectedSiteId) ?? monitoringSites[0];
  const siteReadings = getReadingsForSite(site.id);
  const recentReadings = siteReadings.slice(0, 6);
  const activeAlerts = monitoringAlerts.filter((alert) => alert.status === "active");
  const reportingCount = monitoringSites.filter((item) => item.status !== "offline").length;
  const offlineCount = monitoringSites.filter((item) => item.status === "offline").length;
  const attentionCount = monitoringSites.filter((item) => item.status === "attention").length;

  const trend = useMemo(() => {
    const readings = getReadingsForSite(site.id);
    if (readings.length >= 2) {
      return readings.slice(0, 7).reverse().map((reading) => ({
        label: reading.time,
        value: reading.temperatureC,
      }));
    }
    return site.status === "offline" ? [] : temperatureTrend;
  }, [site.id, site.status]);

  const minTrend = trend.length ? Math.min(...trend.map((point) => point.value)) : 0;
  const maxTrend = trend.length ? Math.max(...trend.map((point) => point.value)) : 1;
  const statusText = getSiteStatusText(site);

  const handleExport = () => {
    downloadCsv(
      `${site.id}-monitoring-summary.csv`,
      siteReadings.map((reading) => ({
        Site: site.name,
        Device: site.deviceId,
        Date: reading.date,
        Time: reading.time,
        "Temperature (°C)": reading.temperatureC,
        "Signal (%)": reading.signalPercent,
        "Battery (%)": reading.batteryPercent,
        Status: reading.status,
      })),
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Coastal monitoring
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--bahari-blue)]">Good to see you, Amina</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Here is the latest monitoring overview for your site and the wider coastal network.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex min-w-56 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
            <MapPin size={17} className="shrink-0 text-[var(--bahari-blue)]" />
            <span className="sr-only">Select monitoring site</span>
            <select
              value={selectedSiteId}
              onChange={(event) => setSelectedSiteId(event.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
            >
              {monitoringSites.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </label>
          <Button onClick={handleExport} className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
            <Download size={16} /> Export readings
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <NetworkStat icon={<RadioTower size={19} />} label="Monitoring sites" value={String(monitoringSites.length)} hint="Across the coastal network" tone="blue" />
        <NetworkStat icon={<Wifi size={19} />} label="Reporting devices" value={String(reportingCount)} hint="Sending recent readings" tone="green" />
        <NetworkStat icon={<AlertTriangle size={19} />} label="Active alerts" value={String(activeAlerts.length)} hint="Require review or follow-up" tone="amber" />
        <NetworkStat icon={<Activity size={19} />} label="Offline devices" value={String(offlineCount)} hint="Connectivity checks needed" tone="slate" />
      </section>

      <section className={`rounded-3xl border p-5 shadow-sm ${site.status === "connected" ? "border-emerald-200 bg-[var(--bahari-green-soft)]" : site.status === "attention" ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-100"}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${site.status === "connected" ? "bg-white text-emerald-700" : site.status === "attention" ? "bg-white text-amber-700" : "bg-white text-slate-600"}`}>
              {site.status === "connected" ? <Wifi size={20} /> : site.status === "attention" ? <AlertTriangle size={20} /> : <RadioTower size={20} />}
            </div>
            <div>
              <div className="font-semibold text-slate-900">{site.name} · {statusText}</div>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {site.status === "connected"
                  ? `The latest temperature reading is ${site.temperatureC?.toFixed(1)}°C. The device last reported ${site.lastSeen}.`
                  : site.status === "attention"
                    ? `The latest temperature reading is ${site.temperatureC?.toFixed(1)}°C, outside the configured ${site.minTemperatureC}–${site.maxTemperatureC}°C range.`
                    : `No recent reading has been received. The last report was ${site.lastSeen}; check power and connectivity.`}
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0 rounded-2xl border-slate-200 bg-white hover:bg-white">
            <Link href={`/sites/${site.id}`}>Open site details <ArrowUpRight size={16} /></Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Thermometer size={22} />}
          label="Water temperature"
          value={site.temperatureC === null ? "—" : `${site.temperatureC.toFixed(1)}°C`}
          hint={`Configured range ${site.minTemperatureC}–${site.maxTemperatureC}°C`}
          tone={site.status === "attention" ? "warning" : site.status === "offline" ? "muted" : "normal"}
          badge={site.status === "attention" ? "Review" : site.status === "offline" ? "No reading" : "Normal"}
        />
        <MetricCard
          icon={<Signal size={22} />}
          label="Signal strength"
          value={site.signalPercent === null ? "—" : `${site.signalPercent}%`}
          hint="Last reported connection quality"
          tone={site.signalPercent !== null && site.signalPercent < 70 ? "warning" : site.signalPercent === null ? "muted" : "normal"}
          badge={site.signalPercent === null ? "Unavailable" : site.signalPercent < 70 ? "Weak" : "Good"}
        />
        <MetricCard
          icon={<BatteryCharging size={22} />}
          label="Battery level"
          value={site.batteryPercent === null ? "—" : `${site.batteryPercent}%`}
          hint="Last reported device battery"
          tone={site.batteryPercent !== null && site.batteryPercent < 25 ? "warning" : "normal"}
          badge={site.batteryPercent !== null && site.batteryPercent < 25 ? "Low" : "Good"}
        />
        <MetricCard
          icon={<Clock3 size={22} />}
          label="Latest report"
          value={site.lastSeen}
          hint={`Device ${site.deviceId}`}
          tone={site.status === "offline" ? "muted" : "normal"}
          badge={site.status === "offline" ? "Delayed" : "Recent"}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="rounded-3xl border-slate-200 shadow-sm xl:col-span-3">
          <CardContent className="p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--bahari-blue)]"><BarChart3 size={19} /> Temperature trend</h2>
                <p className="mt-1 text-sm text-slate-500">Recent readings for {site.name}</p>
              </div>
              <StatusPill label="°C" tone="muted" />
            </div>
            {trend.length > 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-[var(--bahari-sand)] px-4 pb-3 pt-5">
                <div className="flex h-48 items-end gap-2 sm:gap-3">
                  {trend.map((point, index) => {
                    const range = Math.max(maxTrend - minTrend, 0.5);
                    const height = 32 + ((point.value - minTrend) / range) * 54;
                    return (
                      <div key={`${point.label}-${index}`} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                        <span className="text-[10px] font-semibold tabular-nums text-slate-600 sm:text-xs">{point.value.toFixed(1)}°</span>
                        <div className="w-full rounded-t-xl bg-gradient-to-t from-[var(--bahari-blue)] to-sky-400" style={{ height: `${height}%` }} />
                        <span className="max-w-full truncate text-[10px] text-slate-500 sm:text-xs">{point.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <EmptyState title="No recent temperature history" description="A trend will appear when this site has recorded readings." />
            )}
            <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>Temperature history</span>
              <Button asChild variant="link" className="h-auto p-0 text-[var(--bahari-blue)]">
                <Link href="/records">View all records <ArrowUpRight size={14} /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm xl:col-span-2">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--bahari-blue)]"><Bell size={19} /> Network alerts</h2>
                <p className="mt-1 text-sm text-slate-500">Items needing attention</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">{activeAlerts.length} active</span>
            </div>
            <div className="space-y-3">
              {activeAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800">{alert.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{alert.siteName} · {alert.detectedAt}</div>
                    </div>
                    <StatusPill label={alert.severity === "critical" ? "Critical" : "Warning"} tone={alert.severity === "critical" ? "critical" : "warning"} />
                  </div>
                  <div className="mt-3 text-sm text-slate-600">Observed value: <span className="font-semibold text-slate-800">{alert.value}</span></div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-4 w-full rounded-2xl border-slate-200 bg-white hover:bg-slate-50">
              <Link href="/alerts">Open alert centre <ArrowUpRight size={15} /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--bahari-blue)]">Recent readings</h2>
                <p className="mt-1 text-sm text-slate-500">Most recent temperature records for {site.name}</p>
              </div>
              <Button asChild variant="outline" className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50">
                <Link href="/records">View all records <ArrowUpRight size={15} /></Link>
              </Button>
            </div>
            {recentReadings.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Time</th>
                      <th className="px-4 py-3 font-semibold">Temperature</th>
                      <th className="px-4 py-3 font-semibold">Signal</th>
                      <th className="px-4 py-3 font-semibold">Battery</th>
                      <th className="px-4 py-3 font-semibold">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReadings.map((reading) => (
                      <tr key={reading.id} className="border-t border-slate-100">
                        <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{reading.date}</td>
                        <td className="px-4 py-3.5 text-slate-600">{reading.time}</td>
                        <td className="px-4 py-3.5 font-semibold tabular-nums text-slate-800">{reading.temperatureC.toFixed(1)}°C</td>
                        <td className="px-4 py-3.5 text-slate-600">{reading.signalPercent}%</td>
                        <td className="px-4 py-3.5 text-slate-600">{reading.batteryPercent}%</td>
                        <td className="px-4 py-3.5"><StatusPill label={reading.status === "normal" ? "Normal" : "Attention"} tone={reading.status === "normal" ? "normal" : "warning"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No recent readings" description="This device has not sent readings in the current sample history." />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function getSiteStatusText(site: MonitoringSite) {
  if (site.status === "connected") return "Connected and reporting";
  if (site.status === "attention") return "Reading needs review";
  return "Not reporting";
}

function NetworkStat({
  icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone: "blue" | "green" | "amber" | "slate";
}) {
  const tones = {
    blue: "bg-sky-50 text-[var(--bahari-blue)]",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--bahari-blue)]">{value}</div>
          </div>
          <div className={`grid h-10 w-10 place-items-center rounded-2xl ${tones[tone]}`}>{icon}</div>
        </div>
        <div className="mt-3 text-xs text-slate-500">{hint}</div>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  icon,
  label,
  value,
  hint,
  tone,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone: "normal" | "warning" | "muted";
  badge: string;
}) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--bahari-sea)] text-[var(--bahari-blue)]">{icon}</div>
          <StatusPill label={badge} tone={tone} />
        </div>
        <div className="mt-5 text-sm font-semibold text-slate-600">{label}</div>
        <div className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--bahari-blue)]">{value}</div>
        <div className="mt-2 text-xs leading-5 text-slate-500">{hint}</div>
      </CardContent>
    </Card>
  );
}

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "normal" | "warning" | "critical" | "muted";
}) {
  const classes = {
    normal: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    critical: "border-rose-200 bg-rose-50 text-rose-700",
    muted: "border-slate-200 bg-slate-100 text-slate-600",
  };

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${classes[tone]}`}>{label}</span>;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center">
      <div className="font-semibold text-slate-700">{title}</div>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{description}</p>
    </div>
  );
}
