BEGIN;

TRUNCATE TABLE app.cat, app.dog RESTART IDENTITY;

INSERT INTO neon_auth."user" (
  name,
  email,
  "emailVerified",
  image,
  role,
  banned
)
VALUES
  (
    'Alice Martin',
    'alice.martin+fixtures@example.com',
    true,
    'https://api.dicebear.com/9.x/initials/svg?seed=Alice%20Martin',
    'user',
    false
  ),
  (
    'Benoit Leroy',
    'benoit.leroy+fixtures@example.com',
    true,
    'https://api.dicebear.com/9.x/initials/svg?seed=Benoit%20Leroy',
    'user',
    false
  ),
  (
    'Chloe Bernard',
    'chloe.bernard+fixtures@example.com',
    true,
    'https://api.dicebear.com/9.x/initials/svg?seed=Chloe%20Bernard',
    'admin',
    false
  )
ON CONFLICT (email) DO UPDATE
SET
  name = EXCLUDED.name,
  "emailVerified" = EXCLUDED."emailVerified",
  image = EXCLUDED.image,
  role = EXCLUDED.role,
  banned = EXCLUDED.banned,
  "updatedAt" = CURRENT_TIMESTAMP;

WITH selected_owners AS (
  SELECT
    (
      SELECT id
      FROM neon_auth."user"
      WHERE email = 'alice.martin+fixtures@example.com'
    ) AS owner_1,
    (
      SELECT id
      FROM neon_auth."user"
      WHERE email = 'benoit.leroy+fixtures@example.com'
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
      WHERE email = 'alice.martin+fixtures@example.com'
    ) AS owner_1,
    (
      SELECT id
      FROM neon_auth."user"
      WHERE email = 'benoit.leroy+fixtures@example.com'
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
