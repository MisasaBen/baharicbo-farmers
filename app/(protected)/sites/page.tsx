"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BatteryCharging,
  MapPin,
  RadioTower,
  Search,
  Signal,
  Thermometer,
  Wifi,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { monitoringSites } from "@/lib/mock-data";
import type { SiteStatus } from "@/types/site";

export default function SitesPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SiteStatus>("all");

  const sites = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return monitoringSites.filter((site) => {
      const matchesStatus = statusFilter === "all" || site.status === statusFilter;
      const matchesQuery = !normalizedQuery || [site.name, site.location, site.type, site.deviceId]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const connected = monitoringSites.filter((site) => site.status === "connected").length;
  const attention = monitoringSites.filter((site) => site.status === "attention").length;
  const offline = monitoringSites.filter((site) => site.status === "offline").length;

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bahari-blue)]"><MapPin size={14} /> Site directory</div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--bahari-blue)]">Monitoring sites</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Review assigned monitoring locations, device status, temperature readings, and connection quality.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <MiniSummary label="Connected" value={connected} tone="normal" />
          <MiniSummary label="Attention" value={attention} tone="warning" />
          <MiniSummary label="Offline" value={offline} tone="muted" />
        </div>
      </section>

      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div>
              <label htmlFor="site-search" className="mb-2 block text-sm font-semibold text-slate-700">Find a site</label>
              <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><Input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search site, location, or device ID" className="h-11 rounded-2xl pl-9" /></div>
            </div>
            <div>
              <label htmlFor="site-status" className="mb-2 block text-sm font-semibold text-slate-700">Connection status</label>
              <select id="site-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | SiteStatus)} className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[var(--bahari-blue)]">
                <option value="all">All sites</option><option value="connected">Connected</option><option value="attention">Attention</option><option value="offline">Offline</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">Showing {sites.length} of {monitoringSites.length} monitoring sites</div>
        </CardContent>
      </Card>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sites.map((site) => (
          <Link key={site.id} href={`/sites/${site.id}`} className="group block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bahari-blue)] focus-visible:ring-offset-2">
            <Card className="h-full rounded-3xl border-slate-200 shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--bahari-sea)] text-[var(--bahari-blue)]"><RadioTower size={23} /></div>
                  <StatusPill status={site.status} />
                </div>
                <h2 className="mt-5 text-lg font-bold text-[var(--bahari-blue)]">{site.name}</h2>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={13} /> {site.location}</div>
                <p className="mt-3 min-h-10 text-sm leading-5 text-slate-600">{site.type}</p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <DataItem icon={<Thermometer size={15} />} label="Temperature" value={site.temperatureC === null ? "—" : `${site.temperatureC.toFixed(1)}°C`} />
                  <DataItem icon={<Signal size={15} />} label="Signal" value={site.signalPercent === null ? "—" : `${site.signalPercent}%`} />
                  <DataItem icon={<BatteryCharging size={15} />} label="Battery" value={site.batteryPercent === null ? "—" : `${site.batteryPercent}%`} />
                  <DataItem icon={<Wifi size={15} />} label="Last report" value={site.lastSeen} />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <span>{site.deviceId}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[var(--bahari-blue)]">View details <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
      {!sites.length && <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center"><div className="font-semibold text-slate-700">No sites found</div><p className="mt-1 text-sm text-slate-500">Try another search or connection filter.</p></div>}
    </div>
  );
}

function MiniSummary({ label, value, tone }: { label: string; value: number; tone: "normal" | "warning" | "muted" }) {
  const classes = tone === "normal" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : tone === "warning" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-slate-200 bg-slate-100 text-slate-700";
  return <div className={`min-w-20 rounded-2xl border px-3 py-2 text-center ${classes}`}><div className="text-xl font-extrabold">{value}</div><div className="mt-0.5 text-[11px] font-semibold">{label}</div></div>;
}

function DataItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"><div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500"><span className="text-[var(--bahari-blue)]">{icon}</span>{label}</div><div className="mt-1 text-sm font-bold text-slate-800">{value}</div></div>;
}

function StatusPill({ status }: { status: SiteStatus }) {
  const label = status === "connected" ? "Connected" : status === "attention" ? "Attention" : "Offline";
  const classes = status === "connected" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : status === "attention" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-slate-200 bg-slate-100 text-slate-600";
  return <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}>{label}</span>;
}
