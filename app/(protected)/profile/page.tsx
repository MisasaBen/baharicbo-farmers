"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, UserRound, Pencil, Save, KeyRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { farmerProfile } from "@/lib/mock-data";

export default function ProfilePage() {
  const [profile, setProfile] = useState(farmerProfile);
  const [draft, setDraft] = useState(farmerProfile);
  const [editing, setEditing] = useState(false);

  const saveProfile = () => {
    setProfile({ ...draft });
    setEditing(false);
  };

  const requestPasswordReset = () => {
    const subject = encodeURIComponent("Farmer’s Link password assistance");
    const body = encodeURIComponent(`Hello Bahari CBO Network,\n\nI need assistance updating the password for my Farmer’s Link account.\n\nName: ${profile.name}\nAccount email: ${profile.email}`);
    window.location.href = `mailto:info@baharicbo.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <section>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bahari-blue)]"><UserRound size={14} /> Account settings</div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--bahari-blue)]">My profile</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Manage your contact details and review the monitoring site assigned to your account.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-slate-200 shadow-sm lg:col-span-1">
          <CardContent className="flex flex-col items-center p-7 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--bahari-sea)] text-[var(--bahari-blue)]"><UserRound size={38} /></div>
            <h2 className="mt-5 text-2xl font-bold text-[var(--bahari-blue)]">{profile.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{profile.role}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700"><ShieldCheck size={14} /> {profile.accountStatus} account</div>
            <div className="mt-6 w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Assigned monitoring site</div>
              <div className="mt-2 font-semibold text-slate-800">{profile.assignedSite}</div>
              <div className="mt-1 text-sm text-slate-500">{profile.location}</div>
              <Button asChild variant="outline" className="mt-4 w-full rounded-2xl border-slate-200 bg-white"><Link href={`/sites/${profile.assignedSiteId}`}>View assigned site</Link></Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm lg:col-span-2">
          <CardContent className="p-6 sm:p-7">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div><h2 className="text-xl font-bold text-[var(--bahari-blue)]">Account details</h2><p className="mt-1 text-sm text-slate-500">Your identity and project contact information.</p></div>
              {!editing ? (
                <Button onClick={() => { setDraft(profile); setEditing(true); }} className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]"><Pencil size={15} /> Edit details</Button>
              ) : (
                <Button onClick={saveProfile} className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]"><Save size={15} /> Save changes</Button>
              )}
            </div>

            {editing ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name"><Input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} className="h-11 rounded-2xl" /></Field>
                <Field label="Phone number"><Input value={draft.phone} onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))} className="h-11 rounded-2xl" /></Field>
                <Field label="Email address"><Input type="email" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} className="h-11 rounded-2xl" /></Field>
                <Field label="Location"><Input value={draft.location} onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))} className="h-11 rounded-2xl" /></Field>
                <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
                  <Button onClick={saveProfile} className="rounded-2xl bg-[var(--bahari-blue)] text-white hover:bg-[var(--bahari-blue-deep)]"><Save size={15} /> Save changes</Button>
                  <Button variant="outline" onClick={() => { setDraft(profile); setEditing(false); }} className="rounded-2xl border-slate-200 bg-white">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <ProfileItem icon={<ShieldCheck size={16} />} label="Role" value={profile.role} />
                <ProfileItem icon={<MapPin size={16} />} label="Assigned site" value={profile.assignedSite} />
                <ProfileItem icon={<Phone size={16} />} label="Phone" value={profile.phone} />
                <ProfileItem icon={<Mail size={16} />} label="Email" value={profile.email} />
                <ProfileItem icon={<MapPin size={16} />} label="Location" value={profile.location} />
                <ProfileItem icon={<ShieldCheck size={16} />} label="Account status" value={profile.accountStatus} />
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-[var(--bahari-sand)] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[var(--bahari-blue)]"><KeyRound size={18} /></div><div><div className="font-semibold text-slate-800">Password and account access</div><p className="mt-1 text-sm leading-5 text-slate-600">For password assistance, contact the project support team.</p></div></div>
              <Button onClick={requestPasswordReset} variant="outline" className="shrink-0 rounded-2xl border-slate-200 bg-white"><Mail size={15} /> Request assistance</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-2"><span className="text-sm font-semibold text-slate-700">{label}</span>{children}</label>;
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4"><div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500"><span className="text-[var(--bahari-blue)]">{icon}</span>{label}</div><div className="mt-2 text-sm font-semibold text-slate-800">{value}</div></div>;
}
