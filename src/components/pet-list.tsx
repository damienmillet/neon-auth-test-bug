import type { Pet } from "@/lib/pets";

type PetListProps = {
  pets: Pet[];
  title: string;
  description: string;
  emptyLabel: string;
};

export function PetList({
  pets,
  title,
  description,
  emptyLabel,
}: PetListProps) {
  const totalWithOwner = pets.filter((pet) => pet.owner_name).length;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Live Directory
          </p>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-[var(--ink)] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-72">
          <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.20)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Total</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--ink)]">{pets.length}</p>
          </div>
          <div className="rounded-[1.75rem] border border-[rgba(152,180,138,0.22)] bg-[rgba(152,180,138,0.10)] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.20)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-alt)]">With Owner</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--ink)]">{totalWithOwner}</p>
          </div>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-[var(--line)] bg-[var(--surface-strong)] p-10 text-sm text-[var(--muted)]">
          {emptyLabel}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <article
              key={pet.id}
              className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[rgba(217,119,87,0.12)] to-transparent opacity-90" />

              <div className="relative mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                    #{pet.id}
                  </p>
                  <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--ink)]">
                    {pet.name}
                  </h2>
                </div>
                <span className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  {pet.breed ?? "Unknown breed"}
                </span>
              </div>

              <dl className="relative space-y-3 text-sm text-[var(--muted)]">
                <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-3">
                  <dt>Age</dt>
                  <dd className="font-medium text-[var(--ink)]">
                    {pet.age_years === null ? "Unknown" : `${pet.age_years} years`}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-3">
                  <dt>Owner</dt>
                  <dd className="text-right font-medium text-[var(--ink)]">
                    {pet.owner_name ?? "No owner assigned"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-3">
                  <dt>Email</dt>
                  <dd className="truncate text-right text-[var(--ink)]/72">
                    {pet.owner_email ?? "-"}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
