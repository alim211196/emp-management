import { getClient } from "../../db/connection";


export default async function handler(req, res) {
  const { _id, new_password } = req.body;

  try {
    const client = await getClient();
    const query = "SELECT * FROM users WHERE _id = $1";
    const values = [_id];
    const result = await client.query(query, values);
    const user = result.rows[0];

    if (user) {
      // Update the user's password in the database
      const updateQuery = "UPDATE users SET password = $1 WHERE _id = $2";
      const updateValues = [new_password, _id];
      await client.query(updateQuery, updateValues);

      res.status(200).json({ message: "Password reset successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Server Error" });
  }
}
