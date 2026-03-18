import { auth } from "@/lib/auth/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: session } = await auth.getSession();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
            Next.js + Neon
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Browse cats and dogs stored in Neon with optional Neon Auth owners.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
            This demo reads live records from app.cat and app.dog, then enriches each pet with the linked owner profile from neon_auth.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cats"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Open cats
            </Link>
            <Link
              href="/dogs"
              className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open dogs
            </Link>
            {!session?.user ? (
              <Link
                href="/auth/sign-in"
                className="rounded-full px-5 py-3 text-sm font-medium text-white/72 transition hover:bg-white/6 hover:text-white"
              >
                Sign in
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_90px_rgba(2,6,23,0.35)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Session</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Current access</h2>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/12 px-3 py-1 text-xs font-medium text-emerald-100">
              {session?.user ? "Authenticated" : "Guest"}
            </span>
          </div>

          {session?.user ? (
            <div className="space-y-4 text-sm text-white/72">
              <div className="rounded-2xl border border-white/8 bg-slate-950/45 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">User</p>
                <p className="mt-2 text-lg font-medium text-white">{session.user.name}</p>
                <p className="mt-1 text-white/55">{session.user.email}</p>
              </div>
              <p>
                You can navigate directly to the pet pages and compare the animal records with the linked owner accounts stored in Neon Auth.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-white/72">
              <p>
                The public pages stay readable, but signing in lets you test the auth flow and compare it with the seeded owner profiles in the database.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/auth/sign-up"
                  className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 font-medium text-white transition hover:bg-white/10"
                >
                  Create account
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-4 font-medium text-cyan-100 transition hover:bg-cyan-300/16"
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
