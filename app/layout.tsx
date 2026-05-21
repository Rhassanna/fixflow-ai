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
  title: "FixFlow AI — From Problem to Fix — In Seconds",
  description:
    "Enterprise-grade operational troubleshooting, incident response, and organizational knowledge assistant. Reduce MTTR and accelerate root-cause analysis.",
  keywords: [
    "operational intelligence",
    "troubleshooting AI",
    "incident response",
    "root cause analysis",
    "maintenance AI",
    "FixFlow",
  ],
  openGraph: {
    title: "FixFlow AI — Operational Intelligence Platform",
    description:
      "Enterprise-grade operational troubleshooting, incident response, and organizational knowledge assistant.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
