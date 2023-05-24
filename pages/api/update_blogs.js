import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const { _id, blog_title, blog_description, username, creation_date } =
    req.body;

  try {
    const client = await getClient();
    const updateQuery = `
      UPDATE blogs 
      SET 
        blog_title = $1, 
        blog_description = $2, 
        username = $3, 
        creation_date = $4
      WHERE 
        _id = $5
    `;
    const updateValues = [
      blog_title,
      blog_description,
      username,
      creation_date,
      _id,
    ];
    await client.query(updateQuery, updateValues);

    // Fetch the updated data in ascending order
    const selectQuery = "SELECT * FROM blogs ORDER BY _id ASC";
    const result = await client.query(selectQuery);
    const data = result.rows;

    res.status(200).json({ message: "Blogs updated successfully", data });
  } catch (error) {
    console.error("Error updating data", error);
    res.status(500).json({ message: "Server Error" });
  }
}
