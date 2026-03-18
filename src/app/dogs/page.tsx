import { PetList } from "@/components/pet-list";
import { getDogs } from "@/lib/pets";

export const dynamic = "force-dynamic";

export default async function DogsPage() {
  const dogs = await getDogs();

  return (
    <PetList
      pets={dogs}
      title="Dogs"
      description="Live records loaded from app.dog with their optional Neon Auth owner."
      emptyLabel="No dog records were found in the database."
    />
  );
}
