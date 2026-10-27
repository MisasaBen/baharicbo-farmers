"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BatteryCharging,
  Bell,
  BarChart3,
  Clock3,
  MapPin,
  RadioTower,
  Signal,
  Thermometer,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getReadingsForSite, getSiteById, monitoringAlerts } from "@/lib/mock-data";

export default function SiteDetailPage() {
  const params = useParams<{ siteId: string }>();
  const site = getSiteById(params.siteId);

  if (!site) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="text-2xl font-bold text-[var(--bahari-blue)]">Monitoring site not found</div>
        <p className="mt-2 text-sm text-slate-500">Choose a site from the dashboard to review its monitoring details.</p>
        <Button asChild className="mt-5 rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]"><Link href="/dashboard">Return to dashboard</Link></Button>
      </div>
    );
  }

  const readings = getReadingsForSite(site.id);
  const alerts = monitoringAlerts.filter((alert) => alert.siteId === site.id && alert.status !== "resolved");
  const trend = readings.slice(0, 7).reverse();
  const minTemp = trend.length ? Math.min(...trend.map((reading) => reading.temperatureC)) : 0;
  const maxTemp = trend.length ? Math.max(...trend.map((reading) => reading.temperatureC)) : 1;
  const statusTone = site.status === "connected" ? "normal" : site.status === "attention" ? "warning" : "muted";

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Button asChild variant="ghost" className="mb-3 h-auto px-0 py-1 text-sm text-slate-500 hover:bg-transparent hover:text-[var(--bahari-blue)]">
            <Link href="/dashboard"><ArrowLeft size={15} /> Back to dashboard</Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500"><MapPin size={15} /> {site.location} <span>·</span> {site.type}</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--bahari-blue)]">{site.name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{site.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <StatusPill label={site.status === "connected" ? "Connected" : site.status === "attention" ? "Attention required" : "Offline"} tone={statusTone} />
          <Button asChild className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]"><Link href="/records">View records <ArrowUpRight size={15} /></Link></Button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<Thermometer size={22} />} label="Water temperature" value={site.temperatureC === null ? "—" : `${site.temperatureC.toFixed(1)}°C`} detail={`Configured range ${site.minTemperatureC}–${site.maxTemperatureC}°C`} tone={site.status === "attention" ? "warning" : site.status === "offline" ? "muted" : "normal"} badge={site.status === "attention" ? "Review" : site.status === "offline" ? "No reading" : "Normal"} />
        <MetricCard icon={<Signal size={22} />} label="Signal strength" value={site.signalPercent === null ? "—" : `${site.signalPercent}%`} detail="Last reported connection quality" tone={site.signalPercent !== null && site.signalPercent < 70 ? "warning" : site.signalPercent === null ? "muted" : "normal"} badge={site.signalPercent === null ? "Unavailable" : site.signalPercent < 70 ? "Weak" : "Good"} />
        <MetricCard icon={<BatteryCharging size={22} />} label="Battery level" value={site.batteryPercent === null ? "—" : `${site.batteryPercent}%`} detail="Last reported device battery" tone={site.batteryPercent !== null && site.batteryPercent < 25 ? "warning" : "normal"} badge={site.batteryPercent !== null && site.batteryPercent < 25 ? "Low" : "Good"} />
        <MetricCard icon={<Clock3 size={22} />} label="Last report" value={site.lastSeen} detail={`Device ${site.deviceId}`} tone={site.status === "offline" ? "muted" : "normal"} badge={site.status === "offline" ? "Delayed" : "Recent"} />
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="rounded-3xl border-slate-200 shadow-sm xl:col-span-3">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--bahari-blue)]"><BarChart3 size={19} /> Temperature history</h2>
                <p className="mt-1 text-sm text-slate-500">Recent readings for {site.name}</p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">°C</span>
            </div>
            {trend.length ? (
              <div className="rounded-2xl border border-slate-100 bg-[var(--bahari-sand)] px-4 pb-3 pt-5">
                <div className="flex h-48 items-end gap-2 sm:gap-3">
                  {trend.map((reading) => {
                    const range = Math.max(maxTemp - minTemp, 0.5);
                    const height = 34 + ((reading.temperatureC - minTemp) / range) * 52;
                    return <div key={reading.id} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"><span className="text-[10px] font-semibold text-slate-600 sm:text-xs">{reading.temperatureC.toFixed(1)}°</span><div className="w-full rounded-t-xl bg-gradient-to-t from-[var(--bahari-blue)] to-sky-400" style={{ height: `${height}%` }} /><span className="text-[10px] text-slate-500 sm:text-xs">{reading.time}</span></div>;
                  })}
                </div>
              </div>
            ) : (
              <EmptyState title="No recent readings" description="The chart will fill as this device reports new measurements." />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm xl:col-span-2">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center gap-2 text-lg font-bold text-[var(--bahari-blue)]"><Bell size={19} /> Site alerts <span className="ml-auto rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">{alerts.length} open</span></div>
            {alerts.length ? (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="rounded-2xl border border-slate-100 p-4">
                    <div className="flex items-start justify-between gap-3"><div className="font-semibold text-slate-800">{alert.title}</div><StatusPill label={alert.severity === "critical" ? "Critical" : "Warning"} tone={alert.severity === "critical" ? "critical" : "warning"} /></div>
                    <div className="mt-1 text-xs text-slate-500">{alert.detectedAt} · {alert.value}</div>
                    <p className="mt-2 text-sm leading-5 text-slate-600">{alert.action}</p>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full rounded-2xl border-slate-200 bg-white"><Link href="/alerts">Open alert centre <ArrowUpRight size={15} /></Link></Button>
              </div>
            ) : (
              <EmptyState title="No open alerts for this site" description="The site has no outstanding temperature or connectivity alerts in the current monitoring summary." />
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div><h2 className="text-lg font-bold text-[var(--bahari-blue)]">Device information</h2><p className="mt-1 text-sm text-slate-500">Identification and connection details</p></div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500"><RadioTower size={15} /> {site.deviceId}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <InfoBox label="Monitoring site" value={site.name} />
              <InfoBox label="Device type" value={site.type} />
              <InfoBox label="Location" value={site.location} />
              <InfoBox label="Configured range" value={`${site.minTemperatureC}–${site.maxTemperatureC}°C`} />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function MetricCard({ icon, label, value, detail, tone, badge }: { icon: React.ReactNode; label: string; value: string; detail: string; tone: "normal" | "warning" | "muted"; badge: string }) {
  return <Card className="rounded-3xl border-slate-200 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--bahari-sea)] text-[var(--bahari-blue)]">{icon}</div><StatusPill label={badge} tone={tone} /></div><div className="mt-5 text-sm font-semibold text-slate-600">{label}</div><div className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--bahari-blue)]">{value}</div><div className="mt-2 text-xs leading-5 text-slate-500">{detail}</div></CardContent></Card>;
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-100 bg-[var(--bahari-sand)] px-4 py-4"><div className="text-xs font-medium text-slate-500">{label}</div><div className="mt-1 text-sm font-semibold text-slate-800">{value}</div></div>;
}

function StatusPill({ label, tone }: { label: string; tone: "normal" | "warning" | "critical" | "muted" }) {
  const classes = { normal: "border-emerald-200 bg-emerald-50 text-emerald-700", warning: "border-amber-200 bg-amber-50 text-amber-800", critical: "border-rose-200 bg-rose-50 text-rose-700", muted: "border-slate-200 bg-slate-100 text-slate-600" };
  return <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${classes[tone]}`}>{label}</span>;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center"><div className="font-semibold text-slate-700">{title}</div><p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{description}</p></div>;
}
