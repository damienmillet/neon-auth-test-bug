import { PetCreateForm } from "@/components/pet-create-form";
import { PetList } from "@/components/pet-list";
import { PetStreamListener } from "@/components/pet-stream-listener";
import { createCatAction } from "./actions";
import { getCats } from "@/lib/pets";

export const dynamic = "force-dynamic";

export default async function CatsPage() {
  const cats = await getCats();

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <PetStreamListener entity="cat" />
      </div>
      <PetList
        pets={cats}
        title="Cats"
        description="Live records loaded from app.cat with their optional Neon Auth owner."
        emptyLabel="No cat records were found in the database."
        form={
          <PetCreateForm
            title="Add a cat"
            description="Create a new cat record and optionally link it to a Neon Auth user through the owner email."
            submitLabel="Add cat"
            action={createCatAction}
          />
        }
      />
    </>
  );
}
