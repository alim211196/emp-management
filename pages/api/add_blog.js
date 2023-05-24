import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const { blog_title, blog_description, username, creation_date } = req.body;

  try {
    const client = await getClient();
    const insertQuery =
      "INSERT INTO blogs (blog_title, blog_description, username, creation_date) VALUES ($1, $2, $3, $4)";
    const insertValues = [
      blog_title,
      blog_description,
      username,
      creation_date,
    ];
    await client.query(insertQuery, insertValues);

    // Fetch the inserted data in ascending order
    const selectQuery =
      "SELECT _id, blog_title, blog_description, username, creation_date FROM blogs ORDER BY _id ASC";
    const result = await client.query(selectQuery);

    res.status(200).json({
      message: "Blog created successfully",
      data: result.rows, // Include the ordered data in the response
    });
  } catch (error) {
    console.error("Error inserting data", error);
    res.status(500).json({ message: "Server Error" });
  }
}
