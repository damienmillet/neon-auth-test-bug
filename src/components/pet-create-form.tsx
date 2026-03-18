"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export type PetFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

type PetCreateFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  action: (
    prevState: PetFormState,
    formData: FormData,
  ) => Promise<PetFormState>;
};

const initialState: PetFormState = {
  status: "idle",
  message: "",
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#140f0d] transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

export function PetCreateForm({
  title,
  description,
  submitLabel,
  action,
}: PetCreateFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section className="rounded-4xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
      <div className="mb-6 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
          Create Record
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-[var(--ink)]">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p>
      </div>

      <form ref={formRef} action={formAction} className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Name
          <input
            name="name"
            type="text"
            required
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)]/75 focus:border-[var(--accent)]"
            placeholder="Mochi"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Breed
          <input
            name="breed"
            type="text"
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)]/75 focus:border-[var(--accent)]"
            placeholder="European Shorthair"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Age
          <input
            name="ageYears"
            type="number"
            min="0"
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)]/75 focus:border-[var(--accent)]"
            placeholder="2"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Owner email
          <input
            name="ownerEmail"
            type="email"
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)]/75 focus:border-[var(--accent)]"
            placeholder="alice.martin+fixtures@example.com"
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3 border-t border-[var(--line)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-[var(--muted)]">
            The owner email is optional. If it matches a Neon Auth user, the pet will be linked automatically.
          </p>
          <SubmitButton label={submitLabel} />
        </div>

        {state.message ? (
          <p
            className={[
              "md:col-span-2 text-sm",
              state.status === "error" ? "text-red-300" : "text-[var(--accent-alt)]",
            ].join(" ")}
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
