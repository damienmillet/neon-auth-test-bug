"use server";

import { revalidatePath } from "next/cache";
import { emitPetEvent } from "@/lib/pet-events";
import { createDog } from "@/lib/pets";
import type { PetFormState } from "@/components/pet-create-form";

function normalizeText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function createDogAction(
  _prevState: PetFormState,
  formData: FormData,
): Promise<PetFormState> {
  const name = normalizeText(formData.get("name"));
  const breed = normalizeText(formData.get("breed"));
  const ageValue = normalizeText(formData.get("ageYears"));
  const ownerEmail = normalizeText(formData.get("ownerEmail"));

  if (!name) {
    return { status: "error", message: "Name is required." };
  }

  const ageYears = ageValue ? Number(ageValue) : null;

  if (ageYears !== null && (!Number.isInteger(ageYears) || ageYears < 0)) {
    return { status: "error", message: "Age must be a positive integer." };
  }

  const result = await createDog({
    name,
    breed: breed || null,
    ageYears,
    ownerEmail: ownerEmail || null,
  });

  await emitPetEvent({
    type: "dog.created",
    petName: name,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/dogs");

  return {
    status: "success",
    message: result.linkedOwner
      ? "Dog added and linked to a Neon Auth owner."
      : "Dog added without owner link.",
  };
}
