CREATE INDEX IF NOT EXISTS cat_owner_id_idx ON app.cat (owner_id);

CREATE INDEX IF NOT EXISTS dog_owner_id_idx ON app.dog (owner_id);

ALTER TABLE app.cat
  ADD CONSTRAINT cat_owner_id_fkey
  FOREIGN KEY (owner_id) REFERENCES neon_auth."user"(id) ON DELETE SET NULL;

ALTER TABLE app.dog
  ADD CONSTRAINT dog_owner_id_fkey
  FOREIGN KEY (owner_id) REFERENCES neon_auth."user"(id) ON DELETE SET NULL;
