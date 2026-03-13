import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Farmer’s Link | Bahari CBO Network",
    template: "%s | Farmer’s Link",
  },
  description:
    "Farmer’s Link is the monitoring dashboard for the Bahari CBO Network Blue Empowerment (BE) Project. It provides environmental monitoring, alerts, and site records for climate-smart aquaculture.",
  applicationName: "Farmer’s Link",
  openGraph: {
    title: "Farmer’s Link",
    description:
      "Environmental monitoring dashboard for Bahari CBO Network aquaculture sites.",
    siteName: "Bahari CBO Network",
    type: "website",
  },
  keywords: [
    "Bahari CBO",
    "Blue Empowerment",
    "IMTA",
    "Aquaculture monitoring",
    "IoT monitoring",
    "Kenya fisheries",
  ],
  authors: [{ name: "Bahari CBO Network" }],
  creator: "Bahari CBO Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
