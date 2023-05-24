import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const {
    firstname,
    lastname,
    email,
    username,
    user_type,
    password,
    creation_date,
  } = req.body;

  try {
    const client = await getClient();
    const insertQuery =
      "INSERT INTO users (firstname, lastname, email, username, user_type, password, creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const insertValues = [
      firstname,
      lastname,
      email,
      username,
      user_type,
      password,
      creation_date,
    ];
    await client.query(insertQuery, insertValues);

    // Fetch the inserted data in ascending order
    const selectQuery = "SELECT * FROM users ORDER BY _id ASC";
    const result = await client.query(selectQuery);

    res.status(200).json({
      message: "Employee added successfully",
      data: result.rows, // Include the ordered data in the response
    });
  } catch (error) {
    console.error("Error inserting data", error);
    res.status(500).json({ message: "Server Error" });
  }
}
