import { auth } from "@/lib/auth/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: session } = await auth.getSession();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:items-start">
        <div>
          <p className="mb-4 text-(--accent) text-xs font-semibold uppercase tracking-[0.32em]">
            Editorial Demo
          </p>
          <h1 className="font-display max-w-3xl text-6xl font-semibold leading-none tracking-tight text-foreground sm:text-7xl">
            Cats, dogs, and owner profiles in one clean Neon directory.
          </h1>
          <p className="mt-6 max-w-2xl text-(--muted) text-base leading-8">
            The app reads live data from app.cat and app.dog, then joins each pet with its optional Neon Auth owner to show a simple relational model without hiding the database behind fake UI chrome.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/cats"
              className="rounded-full bg-foreground px-5 py-3 text-background text-sm font-semibold transition hover:opacity-92"
            >
              Open cats
            </Link>
            <Link
              href="/dogs"
              className="rounded-full border border-(--line) bg-(--surface) px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-(--surface-strong)"
            >
              Open dogs
            </Link>
            {!session?.user ? (
              <Link
                href="/auth/sign-in"
                className="rounded-full px-5 py-3 text-sm font-medium text-foreground/78 transition hover:bg-(--accent-soft) hover:text-foreground"
              >
                Sign in
              </Link>
            ) : null}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-(--line) bg-(--surface) p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-foreground/62">Pages</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">2</p>
            </div>
            <div className="rounded-[1.75rem] border border-(--line) bg-(--surface) p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-foreground/62">Data source</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">Neon Postgres</p>
            </div>
            <div className="rounded-[1.75rem] border border-[rgba(152,180,138,0.22)] bg-[rgba(152,180,138,0.10)] p-5">
              <p className="text-(--accent-alt) text-xs uppercase tracking-[0.24em]">Owner model</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">Neon Auth</p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-(--line) bg-(--surface-strong) p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-foreground/62">Session</p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-foreground">Current access</h2>
            </div>
            <span className="rounded-full border border-[rgba(152,180,138,0.22)] bg-[rgba(152,180,138,0.10)] px-3 py-1 text-(--accent-alt) text-xs font-medium">
              {session?.user ? "Authenticated" : "Guest"}
            </span>
          </div>

          {session?.user ? (
            <div className="space-y-4 text-(--muted) text-sm">
              <div className="rounded-3xl border border-(--line) bg-(--surface) p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-foreground/62">User</p>
                <p className="mt-2 text-lg font-medium text-foreground">{session.user.name}</p>
                <p className="mt-1 text-(--muted)">{session.user.email}</p>
              </div>
              <p>
                You can navigate directly to the pet pages and compare the animal records with the linked owner accounts stored in Neon Auth.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-(--muted) text-sm">
              <p>
                The public pages stay readable, but signing in lets you test the auth flow and compare it with the seeded owner profiles in the database.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/auth/sign-up"
                  className="rounded-3xl border border-(--line) bg-(--surface) px-4 py-4 font-medium text-foreground transition hover:bg-(--surface-strong)"
                >
                  Create account
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="rounded-3xl border border-[rgba(217,119,87,0.20)] bg-(--accent-soft) px-4 py-4 text-(--accent) font-medium transition hover:opacity-90"
                >
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
