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
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(19,22,25,0.86)] shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-strong)] text-sm font-semibold text-[var(--accent)] shadow-[0_8px_30px_rgba(0,0,0,0.22)]">
            NP
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              Neon Auth
            </span>
            <span className="font-display block text-xl font-semibold tracking-tight text-[var(--ink)]">
              Pets Directory
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1 sm:flex"
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
                      ? "bg-[var(--ink)] text-[var(--page-bg)]"
                      : "text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]",
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
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--ink)]/82 transition hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]"
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#140f0d] transition hover:opacity-92"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-4 py-2 sm:hidden">
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
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--page-bg)]"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]/78",
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
