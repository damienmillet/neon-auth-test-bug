import { neon } from "@neondatabase/serverless";

export function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable must be set");
  }

  return databaseUrl;
}

export function getSql() {
  return neon(getDatabaseUrl());
}
