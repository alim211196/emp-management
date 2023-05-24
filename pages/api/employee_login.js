import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const { username, password } = req.body;

  try {
    const client = await getClient();
    const query =
      "SELECT * FROM users WHERE username = $1 AND password = $2 AND user_type = 'employee'";
    const values = [username, password];
    const result = await client.query(query, values);
    const user = result.rows[0];

    if (user) {
     res.status(200).json({
       message: "Login successful",
       user: user,
     });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Server Error" });
  }
}
