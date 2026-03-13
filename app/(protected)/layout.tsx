"use client";

import { useEffect, useState } from "react";
import { FarmerSidebar } from "@/components/app-shell/farmer-sidebar";
import { FarmerHeader } from "@/components/app-shell/farmer-header";
import { MobileDrawer } from "@/components/app-shell/mobile-drawer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[var(--bahari-sand)] text-slate-900">
      <div className="flex min-h-screen">
        <FarmerSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <FarmerHeader onOpenMenu={() => setMenuOpen(true)} />
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}