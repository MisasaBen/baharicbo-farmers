"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Database,
  LayoutDashboard,
  MapPinned,
  UserRound,
  X,
} from "lucide-react";
import { span } from "motion/react-client";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

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

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close menu overlay"
        className="absolute inset-0 bg-slate-950/40"
        onClick={onClose}
      />

      <div className="relative h-full w-[82%] max-w-sm bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
              <Image
                src="/logo-icon.png"
                alt="Bahari CBO Network logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <div className="text-sm font-bold text-[var(--bahari-blue)]">
                Farmer’s Link
              </div>
              <div className="text-xs text-slate-500">Bahari CBO Network</div>
            </div>
          </div>

          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-5">
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
                  onClick={onClose}
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
      </div>
    </div>
  );
}