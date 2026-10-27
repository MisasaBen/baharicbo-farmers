"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  BatteryCharging,
  CalendarDays,
  Download,
  Filter,
  MapPin,
  RefreshCw,
  Search,
  Signal,
  Thermometer,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getReadingsForSite, monitoringSites } from "@/lib/mock-data";
import { downloadCsv } from "@/lib/utils";
import type { MonitoringReading } from "@/types/metrics";

export default function RecordsPage() {
  const [selectedSiteId, setSelectedSiteId] = useState("imta-cage-1");
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<"24h" | "7d" | "all">("7d");
  const [conditionFilter, setConditionFilter] = useState<"all" | "normal" | "attention">("all");

  const selectedSite = monitoringSites.find((site) => site.id === selectedSiteId) ?? monitoringSites[0];
  const allSiteReadings = getReadingsForSite(selectedSite.id);
  const latestDate = allSiteReadings[0]?.date;

  const records = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allSiteReadings.filter((reading) => {
      const matchesQuery = !normalizedQuery || [reading.id, reading.date, reading.time, reading.temperatureC.toFixed(1), reading.signalPercent, reading.batteryPercent]
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
      const matchesDate = dateRange === "all" || (dateRange === "24h" ? reading.date === latestDate : true);
      const matchesCondition = conditionFilter === "all" || reading.status === conditionFilter;
      return matchesQuery && matchesDate && matchesCondition;
    });
  }, [allSiteReadings, latestDate, query, dateRange, conditionFilter]);

  const chartReadings = [...records].slice(0, 7).reverse();
  const temperatures = records.map((record) => record.temperatureC);
  const averageTemperature = temperatures.length ? temperatures.reduce((sum, value) => sum + value, 0) / temperatures.length : null;
  const minimumTemperature = temperatures.length ? Math.min(...temperatures) : null;
  const maximumTemperature = temperatures.length ? Math.max(...temperatures) : null;

  const exportRecords = () => downloadCsv(`${selectedSite.id}-historical-readings.csv`, records.map((reading) => ({
    ReadingID: reading.id,
    Site: selectedSite.name,
    Device: selectedSite.deviceId,
    Date: reading.date,
    Time: reading.time,
    "Temperature (°C)": reading.temperatureC,
    "Signal (%)": reading.signalPercent,
    "Battery (%)": reading.batteryPercent,
    Condition: reading.status,
  })));

  const resetFilters = () => {
    setQuery("");
    setDateRange("7d");
    setConditionFilter("all");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bahari-blue)]">
            <CalendarDays size={14} /> Reading archive
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--bahari-blue)]">Historical records</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review temperature history and device telemetry for a monitoring site, then export the records for analysis or reporting.
          </p>
        </div>
        <Button onClick={exportRecords} className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
          <Download size={16} /> Export CSV
        </Button>
      </section>

      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label htmlFor="records-site" className="mb-2 block text-sm font-semibold text-slate-700">Monitoring site</label>
              <div className="relative">
                <MapPin size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select id="records-site" value={selectedSiteId} onChange={(event) => setSelectedSiteId(event.target.value)} className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[var(--bahari-blue)]">
                  {monitoringSites.map((site) => <option key={site.id} value={site.id}>{site.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="records-search" className="mb-2 block text-sm font-semibold text-slate-700">Search records</label>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input id="records-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Date, time, value, or ID" className="h-11 rounded-2xl pl-9" />
              </div>
            </div>
            <div>
              <label htmlFor="records-range" className="mb-2 block text-sm font-semibold text-slate-700">Date range</label>
              <div className="relative">
                <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select id="records-range" value={dateRange} onChange={(event) => setDateRange(event.target.value as "24h" | "7d" | "all")} className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[var(--bahari-blue)]">
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="all">All available records</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="records-condition" className="mb-2 block text-sm font-semibold text-slate-700">Condition</label>
              <div className="relative">
                <Filter size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select id="records-condition" value={conditionFilter} onChange={(event) => setConditionFilter(event.target.value as "all" | "normal" | "attention")} className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[var(--bahari-blue)]">
                  <option value="all">All conditions</option>
                  <option value="normal">Normal</option>
                  <option value="attention">Attention</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-500">Showing {records.length} record{records.length === 1 ? "" : "s"} for {selectedSite.name}</p>
            <Button variant="ghost" onClick={resetFilters} className="h-auto rounded-xl px-2 py-1 text-xs text-[var(--bahari-blue)]"><RefreshCw size={13} /> Reset filters</Button>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={<Activity size={18} />} label="Records found" value={String(records.length)} detail="Match the current filters" />
        <SummaryCard icon={<Thermometer size={18} />} label="Average temperature" value={averageTemperature === null ? "—" : `${averageTemperature.toFixed(1)}°C`} detail="Across selected records" />
        <SummaryCard icon={<Thermometer size={18} />} label="Minimum / maximum" value={minimumTemperature === null || maximumTemperature === null ? "—" : `${minimumTemperature.toFixed(1)}° / ${maximumTemperature.toFixed(1)}°`} detail="Temperature range" />
        <SummaryCard icon={<Signal size={18} />} label="Latest signal" value={selectedSite.signalPercent === null ? "—" : `${selectedSite.signalPercent}%`} detail="Last reported signal quality" />
      </section>

      <section>
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--bahari-blue)]"><BarChart3 size={19} /> Temperature trend</h2>
                <p className="mt-1 text-sm text-slate-500">Recent temperature readings for {selectedSite.name}</p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">Degrees Celsius</span>
            </div>
            {chartReadings.length ? (
              <div className="rounded-2xl border border-slate-100 bg-[var(--bahari-sand)] px-4 pb-3 pt-5">
                <div className="flex h-44 items-end gap-2 sm:gap-4">
                  {chartReadings.map((reading) => {
                    const range = Math.max((maximumTemperature ?? 0) - (minimumTemperature ?? 0), 0.5);
                    const height = 34 + ((reading.temperatureC - (minimumTemperature ?? reading.temperatureC)) / range) * 52;
                    return (
                      <div key={reading.id} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                        <span className="text-[10px] font-semibold tabular-nums text-slate-600 sm:text-xs">{reading.temperatureC.toFixed(1)}°</span>
                        <div className="w-full rounded-t-xl bg-gradient-to-t from-[var(--bahari-blue)] to-sky-400" style={{ height: `${height}%` }} />
                        <span className="max-w-full truncate text-[10px] text-slate-500 sm:text-xs">{reading.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <EmptyState title="No readings for this selection" description="Choose another site or widen the date range to review available history." />
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[var(--bahari-blue)]">Recorded measurements</h2>
                <p className="mt-1 text-sm text-slate-500">Temperature and device telemetry for {selectedSite.name}</p>
              </div>
              <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><BatteryCharging size={15} /> Battery and connectivity included</div>
            </div>
            {records.length ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Reading ID</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Time</th>
                      <th className="px-4 py-3 font-semibold">Temperature</th>
                      <th className="px-4 py-3 font-semibold">Signal</th>
                      <th className="px-4 py-3 font-semibold">Battery</th>
                      <th className="px-4 py-3 font-semibold">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record: MonitoringReading) => (
                      <tr key={record.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                        <td className="px-4 py-3.5 font-semibold text-[var(--bahari-blue)]">{record.id}</td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{record.date}</td>
                        <td className="px-4 py-3.5 text-slate-600">{record.time}</td>
                        <td className="px-4 py-3.5 font-semibold tabular-nums text-slate-800">{record.temperatureC.toFixed(1)}°C</td>
                        <td className="px-4 py-3.5 text-slate-600">{record.signalPercent}%</td>
                        <td className="px-4 py-3.5 text-slate-600">{record.batteryPercent}%</td>
                        <td className="px-4 py-3.5"><StatusPill label={record.status === "normal" ? "Normal" : "Attention"} tone={record.status === "normal" ? "normal" : "warning"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No records found" description="No stored readings match the selected site, date range, and condition filters." />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SummaryCard({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="text-[var(--bahari-blue)]">{icon}</span>{label}</div>
        <div className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--bahari-blue)]">{value}</div>
        <div className="mt-1 text-xs text-slate-500">{detail}</div>
      </CardContent>
    </Card>
  );
}

function StatusPill({ label, tone }: { label: string; tone: "normal" | "warning" }) {
  const classes = tone === "normal" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-800";
  return <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}>{label}</span>;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center"><div className="font-semibold text-slate-700">{title}</div><p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{description}</p></div>;
}
