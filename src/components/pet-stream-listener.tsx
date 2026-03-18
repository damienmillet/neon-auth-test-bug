"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PetStreamListenerProps = {
  entity: "cat" | "dog";
};

type IncomingPetEvent = {
  type: "cat.created" | "dog.created";
  petName: string;
  createdAt: string;
};

export function PetStreamListener({ entity }: PetStreamListenerProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"connecting" | "live" | "offline">(
    "connecting",
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const source = new EventSource("/api/pets/events");

    source.addEventListener("connected", () => {
      setStatus("live");
    });

    source.addEventListener("pet", (event) => {
      const payload = JSON.parse((event as MessageEvent).data) as IncomingPetEvent;
      const eventEntity = payload.type.startsWith("cat") ? "cat" : "dog";

      if (eventEntity !== entity) {
        return;
      }

      setMessage(`New ${entity} added: ${payload.petName}`);
      router.refresh();
    });

    source.onerror = () => {
      setStatus("offline");
    };

    return () => {
      source.close();
    };
  }, [entity, router]);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-3xl border border-(--line) bg-(--surface) px-4 py-3 text-sm text-(--muted) shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      <span
        className={[
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
          status === "live"
            ? "bg-[rgba(152,180,138,0.14)] text-(--accent-alt)"
            : status === "connecting"
              ? "bg-(--accent-soft) text-(--accent)"
              : "bg-[rgba(217,87,87,0.14)] text-red-300",
        ].join(" ")}
      >
        {status}
      </span>
      <p>{message || `SSE stream listening for ${entity} updates.`}</p>
    </div>
  );
}
