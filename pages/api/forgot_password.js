import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const { email } = req.body;

  try {
     const client = await getClient();
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);
    const user = result.rows[0];

    if (user) {
      res.status(200).json({
        message: "Email is valid",
        _id: user._id,
      });
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Server Error" });
  }
}
