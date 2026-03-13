"use client";

import Image from "next/image";
import { Mail, MapPin, Phone, ShieldCheck, User2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const profile = {
  name: "Farmer User",
  role: "Farmer",
  assignedSite: "IMTA Cage 1",
  location: "Kwale Coast",
  phone: "+254 7XX XXX XXX",
  email: "farmer@example.com",
};

export default function ProfilePage() {
  return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3 rounded-3xl border bg-white p-4 shadow-sm">
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
              Profile
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl shadow-md lg:col-span-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--bahari-sea)] text-[var(--bahari-blue)]">
                <User2 size={36} />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-[var(--bahari-blue)]">
                {profile.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{profile.role}</p>

              <div className="mt-5 rounded-full border border-emerald-200 bg-[var(--bahari-green-soft)] px-4 py-2 text-xs font-semibold text-[var(--bahari-green)]">
                Active account
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-md lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[var(--bahari-blue)]">
                  Account details
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Your assigned monitoring access and contact information.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ProfileItem icon={<ShieldCheck size={16} />} label="Role" value={profile.role} />
                <ProfileItem icon={<MapPin size={16} />} label="Assigned site" value={profile.assignedSite} />
                <ProfileItem icon={<Phone size={16} />} label="Phone" value={profile.phone} />
                <ProfileItem icon={<Mail size={16} />} label="Email" value={profile.email} />
                <ProfileItem icon={<MapPin size={16} />} label="Location" value={profile.location} />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]">
                  Edit profile
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50"
                >
                  Change password
                </Button>
              </div>

              <div className="rounded-2xl border bg-[var(--bahari-sea)]/40 p-4 text-sm text-slate-700">
                Profile editing and secure account controls will be connected in a later implementation phase.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}

function ProfileItem({
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