"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  LayoutDashboard,
  MapPinned,
  UserRound,
  Database,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Site",
    href: "/sites/imta-cage-1",
    icon: MapPinned,
  },
  {
    label: "Records",
    href: "/records",
    icon: Database,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
];

export function FarmerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:bg-white">
      <div className="flex h-full flex-col">
        <div className="border-b px-6 py-5">
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

            <div className="min-w-0">
              <div className="truncate text-base font-bold text-[var(--bahari-blue)]">
                Farmer’s Link
              </div>
              <div className="truncate text-xs text-slate-500">
                Bahari CBO Network
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5">
          <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Navigation
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                    active
                      ? "bg-[var(--bahari-sea)] text-[var(--bahari-blue)] shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[var(--bahari-blue)]",
                  ].join(" ")}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-3xl border bg-[var(--bahari-sea)]/40 p-4">
            <div className="text-sm font-semibold text-[var(--bahari-blue)]">
              Field-ready access
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Designed for low-bandwidth monitoring, alerts, and site records.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}