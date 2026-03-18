import { getSql } from "@/lib/db";

export type PetEventType = "cat.created" | "dog.created";

export type PetEvent = {
  type: PetEventType;
  petName: string;
  createdAt: string;
};

export const PET_EVENTS_CHANNEL = "pet_events";

export async function emitPetEvent(event: PetEvent) {
  const sql = getSql();

  await sql`
    SELECT pg_notify(${PET_EVENTS_CHANNEL}, ${JSON.stringify(event)})
  `;
}
