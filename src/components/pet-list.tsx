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
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Database Records
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-72">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Total</p>
            <p className="mt-3 text-3xl font-semibold text-white">{pets.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-cyan-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">With Owner</p>
            <p className="mt-3 text-3xl font-semibold text-cyan-100">{totalWithOwner}</p>
          </div>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/4 p-10 text-sm text-white/65">
          {emptyLabel}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <article
              key={pet.id}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.38)] transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-300/10 to-transparent opacity-80 transition group-hover:opacity-100" />

              <div className="relative mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    #{pet.id}
                  </p>
                  <h2 className="mt-2 text-2xl font-medium text-white">{pet.name}</h2>
                </div>
                <span className="rounded-full border border-cyan-300/12 bg-cyan-400/12 px-3 py-1 text-xs font-medium text-cyan-200">
                  {pet.breed ?? "Unknown breed"}
                </span>
              </div>

              <dl className="relative space-y-3 text-sm text-white/72">
                <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-3">
                  <dt>Age</dt>
                  <dd className="font-medium text-white/88">
                    {pet.age_years === null ? "Unknown" : `${pet.age_years} years`}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-3">
                  <dt>Owner</dt>
                  <dd className="text-right font-medium text-white/88">
                    {pet.owner_name ?? "No owner assigned"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-3">
                  <dt>Email</dt>
                  <dd className="truncate text-right text-white/52">
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
