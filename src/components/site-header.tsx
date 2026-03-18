"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/cats", label: "Cats" },
  { href: "/dogs", label: "Dogs" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/12 text-sm font-semibold text-cyan-100">
            NP
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
              Neon Auth
            </span>
            <span className="block text-lg font-semibold tracking-tight text-white">
              Pets Directory
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 sm:flex"
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-white/70 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/auth/sign-in"
              className="rounded-full px-4 py-2 text-sm font-medium text-white/72 transition hover:bg-white/6 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 px-4 py-2 sm:hidden">
        <nav aria-label="Mobile navigation" className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                    : "border-white/10 bg-white/5 text-white/70",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
