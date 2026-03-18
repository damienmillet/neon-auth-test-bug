BEGIN;

TRUNCATE TABLE app.cat, app.dog RESTART IDENTITY;

WITH selected_owners AS (
  SELECT
    (
      SELECT id
      FROM neon_auth."user"
      ORDER BY "createdAt", id
      LIMIT 1
    ) AS owner_1,
    (
      SELECT id
      FROM neon_auth."user"
      ORDER BY "createdAt", id
      OFFSET 1
      LIMIT 1
    ) AS owner_2
),
cat_seed AS (
  SELECT *
  FROM (
    VALUES
      (1, 'Mochi', 'European Shorthair', 2),
      (2, 'Pixel', 'Maine Coon', 5),
      (3, 'Nori', 'Siamese', 1)
  ) AS rows(position, name, breed, age_years)
),
cat_owner_map AS (
  SELECT 1 AS position, owner_1 AS owner_id FROM selected_owners
  UNION ALL
  SELECT 2 AS position, owner_2 AS owner_id FROM selected_owners
  UNION ALL
  SELECT 3 AS position, NULL::uuid AS owner_id
)
INSERT INTO app.cat (name, breed, age_years, owner_id)
SELECT cat_seed.name, cat_seed.breed, cat_seed.age_years, cat_owner_map.owner_id
FROM cat_seed
JOIN cat_owner_map USING (position);

WITH selected_owners AS (
  SELECT
    (
      SELECT id
      FROM neon_auth."user"
      ORDER BY "createdAt", id
      LIMIT 1
    ) AS owner_1,
    (
      SELECT id
      FROM neon_auth."user"
      ORDER BY "createdAt", id
      OFFSET 1
      LIMIT 1
    ) AS owner_2
),
dog_seed AS (
  SELECT *
  FROM (
    VALUES
      (1, 'Rex', 'Labrador Retriever', 4),
      (2, 'Nova', 'Border Collie', 3),
      (3, 'Toby', 'Beagle', 7)
  ) AS rows(position, name, breed, age_years)
),
dog_owner_map AS (
  SELECT 1 AS position, owner_2 AS owner_id FROM selected_owners
  UNION ALL
  SELECT 2 AS position, owner_1 AS owner_id FROM selected_owners
  UNION ALL
  SELECT 3 AS position, NULL::uuid AS owner_id
)
INSERT INTO app.dog (name, breed, age_years, owner_id)
SELECT dog_seed.name, dog_seed.breed, dog_seed.age_years, dog_owner_map.owner_id
FROM dog_seed
JOIN dog_owner_map USING (position);

COMMIT;
