import { PetCreateForm } from "@/components/pet-create-form";
import { PetList } from "@/components/pet-list";
import { PetStreamListener } from "@/components/pet-stream-listener";
import { createDogAction } from "./actions";
import { getDogs } from "@/lib/pets";

export const dynamic = "force-dynamic";

export default async function DogsPage() {
  const dogs = await getDogs();

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <PetStreamListener entity="dog" />
      </div>
      <PetList
        pets={dogs}
        title="Dogs"
        description="Live records loaded from app.dog with their optional Neon Auth owner."
        emptyLabel="No dog records were found in the database."
        form={
          <PetCreateForm
            title="Add a dog"
            description="Create a new dog record and optionally link it to a Neon Auth user through the owner email."
            submitLabel="Add dog"
            action={createDogAction}
          />
        }
      />
    </>
  );
}
