import { neon } from "@neondatabase/serverless";

type PetRow = {
  id: number;
  name: string;
  breed: string | null;
  age_years: number | null;
  owner_name: string | null;
  owner_email: string | null;
};

export type Pet = PetRow;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable must be set");
  }

  return neon(databaseUrl);
}

export async function getCats(): Promise<Pet[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      c.id,
      c.name,
      c.breed,
      c.age_years,
      u.name AS owner_name,
      u.email AS owner_email
    FROM app.cat AS c
    LEFT JOIN neon_auth."user" AS u ON u.id = c.owner_id
    ORDER BY c.id ASC
  `;

  return rows as Pet[];
}

export async function getDogs(): Promise<Pet[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      d.id,
      d.name,
      d.breed,
      d.age_years,
      u.name AS owner_name,
      u.email AS owner_email
    FROM app.dog AS d
    LEFT JOIN neon_auth."user" AS u ON u.id = d.owner_id
    ORDER BY d.id ASC
  `;

  return rows as Pet[];
}
