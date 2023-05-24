import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  try {
    const client = await getClient();

    // Fetch the data in ascending order
    const query = "SELECT * FROM users ORDER BY _id ASC";
    const result = await client.query(query);
    const data = result.rows;

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Server Error" });
  }
}
