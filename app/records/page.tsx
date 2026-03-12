"use client";

import Image from "next/image";
import {
  BarChart3,
  CalendarDays,
  Download,
  Droplets,
  Filter,
  MapPin,
  Search,
  Thermometer,
  Waves,
  Activity,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const selectedSite = {
  name: "IMTA Cage 1",
  location: "Kwale Coast",
};

const records = [
  { date: "2026-03-12", time: "08:00", temperature: "27.1°C", ph: "7.86", salinity: "32.8 ppt", turbidity: "4.2 NTU" },
  { date: "2026-03-12", time: "10:00", temperature: "27.3°C", ph: "7.88", salinity: "33.0 ppt", turbidity: "4.1 NTU" },
  { date: "2026-03-12", time: "12:00", temperature: "27.4°C", ph: "7.90", salinity: "33.0 ppt", turbidity: "4.0 NTU" },
  { date: "2026-03-11", time: "16:00", temperature: "27.2°C", ph: "7.85", salinity: "32.7 ppt", turbidity: "4.3 NTU" },
  { date: "2026-03-11", time: "12:00", temperature: "27.0°C", ph: "7.82", salinity: "32.6 ppt", turbidity: "4.4 NTU" },
];

const trendBars = [42, 50, 56, 63, 58, 67, 61];

export default function RecordsPage() {
  return (
    <main className="min-h-screen bg-[var(--bahari-sand)] text-slate-900">
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
                Historical records
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
              Refresh
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--bahari-blue)]">
              Records
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Browse historical environmental readings for your selected site and prepare for trend analysis and reporting.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm">
            <MapPin size={16} className="text-[var(--bahari-blue)]" />
            <span className="font-medium">{selectedSite.name}</span>
          </div>
        </div>

        {/* Filters */}
        <section className="mb-8 grid gap-4 lg:grid-cols-4">
          <Card className="rounded-3xl shadow-md lg:col-span-2">
            <CardContent className="p-5">
              <div className="mb-2 text-sm font-semibold text-slate-700">
                Search records
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by date, time, or value"
                  className="h-11 rounded-2xl pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-md">
            <CardContent className="p-5">
              <div className="mb-2 text-sm font-semibold text-slate-700">
                Date range
              </div>
              <div className="inline-flex h-11 w-full items-center gap-2 rounded-2xl border bg-white px-4 text-sm text-slate-600">
                <CalendarDays size={16} className="text-[var(--bahari-blue)]" />
                Last 7 days
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-md">
            <CardContent className="p-5">
              <div className="mb-2 text-sm font-semibold text-slate-700">
                Filter metric
              </div>
              <div className="inline-flex h-11 w-full items-center gap-2 rounded-2xl border bg-white px-4 text-sm text-slate-600">
                <Filter size={16} className="text-[var(--bahari-blue)]" />
                All metrics
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chart preview */}
        <section className="mb-8">
          <Card className="rounded-3xl shadow-md">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-semibold text-[var(--bahari-blue)]">
                  <BarChart3 size={18} />
                  Trend preview
                </div>
                <span className="text-xs text-slate-500">Mock visualization</span>
              </div>

              <div className="rounded-2xl border bg-[var(--bahari-sand)] p-4">
                <div className="flex h-44 items-end gap-3">
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
                This panel will later allow metric switching, date filters, and export-ready visualizations.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Records table */}
        <section>
          <Card className="rounded-3xl shadow-md">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--bahari-blue)]">
                    Recorded measurements
                  </h2>
                  <p className="text-sm text-slate-500">
                    Historical readings for {selectedSite.name}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-slate-500">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3 font-medium">Temperature</th>
                      <th className="px-4 py-3 font-medium">pH</th>
                      <th className="px-4 py-3 font-medium">Salinity</th>
                      <th className="px-4 py-3 font-medium">Turbidity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((row, index) => (
                      <tr key={`${row.date}-${row.time}-${index}`} className="border-t">
                        <td className="px-4 py-4 font-medium text-slate-800">{row.date}</td>
                        <td className="px-4 py-4 text-slate-600">{row.time}</td>
                        <td className="px-4 py-4 text-slate-600">{row.temperature}</td>
                        <td className="px-4 py-4 text-slate-600">{row.ph}</td>
                        <td className="px-4 py-4 text-slate-600">{row.salinity}</td>
                        <td className="px-4 py-4 text-slate-600">{row.turbidity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-4">
                <StatMini
                  icon={<Thermometer size={16} />}
                  label="Temperature"
                  value="Stable"
                />
                <StatMini
                  icon={<Droplets size={16} />}
                  label="pH"
                  value="Balanced"
                />
                <StatMini
                  icon={<Waves size={16} />}
                  label="Salinity"
                  value="Normal"
                />
                <StatMini
                  icon={<Activity size={16} />}
                  label="Turbidity"
                  value="Low"
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function StatMini({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white px-4 py-4">
      <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="text-[var(--bahari-blue)]">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}