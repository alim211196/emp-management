import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const {
    _id,
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
    const updateQuery = `
      UPDATE users 
      SET 
        firstname = $1, 
        lastname = $2, 
        email = $3, 
        username = $4, 
        user_type = $5, 
        password = $6, 
        creation_date = $7 
      WHERE 
        _id = $8
    `;
    const updateValues = [
      firstname,
      lastname,
      email,
      username,
      user_type,
      password,
      creation_date,
      _id,
    ];
    await client.query(updateQuery, updateValues);

    // Fetch the updated data in ascending order
    const selectQuery = "SELECT * FROM users ORDER BY _id ASC";
    const result = await client.query(selectQuery);
    const data = result.rows;

    res.status(200).json({ message: "Employee updated successfully", data });
  } catch (error) {
    console.error("Error updating data", error);
    res.status(500).json({ message: "Server Error" });
  }
}
