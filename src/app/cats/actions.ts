"use server";

import { revalidatePath } from "next/cache";
import { createCat } from "@/lib/pets";
import type { PetFormState } from "@/components/pet-create-form";

function normalizeText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function createCatAction(
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

  const result = await createCat({
    name,
    breed: breed || null,
    ageYears,
    ownerEmail: ownerEmail || null,
  });

  revalidatePath("/cats");

  return {
    status: "success",
    message: result.linkedOwner
      ? "Cat added and linked to a Neon Auth owner."
      : "Cat added without owner link.",
  };
}
