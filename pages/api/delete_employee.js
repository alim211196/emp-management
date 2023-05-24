import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const { _id } = req.body;

  try {
    const client = await getClient();
    const deleteQuery = "DELETE FROM users WHERE _id = $1";
    const deleteValues = [_id];
    await client.query(deleteQuery, deleteValues);

    // Fetch the remaining data in ascending order
    const selectQuery = "SELECT * FROM users ORDER BY _id ASC";
    const result = await client.query(selectQuery);

    res.status(200).json({
      message: "Employee deleted successfully",
      data: result.rows, // Include the remaining data in the response
    });
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).json({ message: "Server Error" });
  }
}
