import { PetList } from "@/components/pet-list";
import { getCats } from "@/lib/pets";

export const dynamic = "force-dynamic";

export default async function CatsPage() {
  const cats = await getCats();

  return (
    <PetList
      pets={cats}
      title="Cats"
      description="Live records loaded from app.cat with their optional Neon Auth owner." 
      emptyLabel="No cat records were found in the database."
    />
  );
}
