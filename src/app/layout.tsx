import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const displayFont = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Neon Pets",
  description: "Cats and dogs loaded from Neon Postgres with Neon Auth owners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        <div className="relative min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--ink)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,119,87,0.16),_transparent_28%),radial-gradient(circle_at_88%_10%,_rgba(152,180,138,0.12),_transparent_24%),linear-gradient(180deg,_rgba(17,19,21,1),_rgba(11,13,15,1))]" />
          <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-[rgba(217,119,87,0.10)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[rgba(152,180,138,0.09)] blur-3xl" />
          <div className="relative">
            <SiteHeader />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
