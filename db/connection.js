import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "EmployeeManagement",
  user: "postgres",
  password: "root",
});

export async function getClient() {
  const client = await pool.connect();
  return client;
}

