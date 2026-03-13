"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type FarmerHeaderProps = {
  onOpenMenu: () => void;
};

export function FarmerHeader({ onOpenMenu }: FarmerHeaderProps) {
  const pathname = usePathname();

  const pageMeta = useMemo(() => {
    if (pathname === "/dashboard") {
      return {
        title: "Dashboard",
        subtitle: "Monitoring overview",
      };
    }

    if (pathname === "/records") {
      return {
        title: "Historical Records",
        subtitle: "Past environmental measurements",
      };
    }

    if (pathname === "/alerts") {
      return {
        title: "Alerts",
        subtitle: "Warnings and site notifications",
      };
    }

    if (pathname === "/profile") {
      return {
        title: "Profile",
        subtitle: "Account and assigned site details",
      };
    }

    if (pathname.startsWith("/sites/")) {
      return {
        title: "Site Details",
        subtitle: "Monitoring site overview",
      };
    }

    return {
      title: "Farmer’s Link",
      subtitle: "Monitoring dashboard",
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open navigation menu"
            onClick={onOpenMenu}
            className="inline-flex rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-[var(--bahari-blue)] lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="text-sm font-semibold text-[var(--bahari-blue)]">
              {pageMeta.title}
            </div>
            <div className="text-xs text-slate-500">
              {pageMeta.subtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
            <ShieldCheck size={14} />
            Secure access
          </span>

          <Button
            variant="outline"
            size="sm"
            className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50"
          >
            <Bell size={16} />
            <span className="hidden sm:inline">Alerts</span>
          </Button>
        </div>
      </div>
    </header>
  );
}