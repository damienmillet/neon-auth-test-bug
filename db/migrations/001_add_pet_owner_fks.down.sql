ALTER TABLE app.dog
  DROP CONSTRAINT IF EXISTS dog_owner_id_fkey;

ALTER TABLE app.cat
  DROP CONSTRAINT IF EXISTS cat_owner_id_fkey;

DROP INDEX IF EXISTS app.dog_owner_id_idx;

DROP INDEX IF EXISTS app.cat_owner_id_idx;
