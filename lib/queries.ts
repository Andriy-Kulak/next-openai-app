import { RoleType } from "@/ts-types";
import { sql } from "@vercel/postgres";

export async function createTable() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS chat2 (
      id SERIAL PRIMARY KEY,
      role VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;
  return {
    createTable,
  };
}

export async function insert({ role, text }: { role: RoleType; text: string }) {
  const queryResp = await sql`
          INSERT INTO chat2 (role, content)
          VALUES (${role}, ${text})
          ON CONFLICT (id) DO NOTHING;
      `;
  return {
    queryResp,
  };
}

export async function clearTable() {
  return sql`TRUNCATE TABLE chat2;`;
}

export async function getAll() {
  // limiting to 100
  return sql`SELECT * from chat2 LIMIT 100;`;
}
