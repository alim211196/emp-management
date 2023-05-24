import { getClient } from "../../db/connection";

export default async function handler(req, res) {
  const { apiName } = req.query;

  if (req.method === "OPTIONS") {
    // Set CORS headers
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://emp-management-alim211196.vercel.app"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end(); // Respond with a 200 status code
    return;
  }

  // Set CORS headers for the actual request
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://emp-management-alim211196.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (apiName === "admin_login") {
    const { username, password } = req.body;

    try {
      const client = await getClient();
      const query =
        "SELECT * FROM users WHERE username = $1 AND password = $2 AND user_type = 'admin'";
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
  } else if (apiName === "employee_login") {
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
  } else if (apiName === "forgot_password") {
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
  } else if (apiName === "reset_password") {
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
  } else if (apiName === "get_employees") {
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
  } else if (apiName === "get_blogs") {
    try {
      const client = await getClient();

      // Fetch the data in ascending order
      const query = " SELECT * FROM blogs ORDER BY _id ASC";
      const result = await client.query(query);
      const data = result.rows;

      res.status(200).json({ data });
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else if (apiName === "add_employee") {
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
  } else if (apiName === "add_blog") {
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
  } else if (apiName === "update_employee") {
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
  } else if (apiName === "update_blogs") {
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
  } else if (apiName === "delete_employee") {
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
  } else if (apiName === "delete_blog") {
    const { _id } = req.body;

    try {
      const client = await getClient();
      const deleteQuery = "DELETE FROM blogs WHERE _id = $1";
      const deleteValues = [_id];
      await client.query(deleteQuery, deleteValues);

      // Fetch the remaining data in ascending order
      const selectQuery =
        "SELECT _id, blog_title, blog_description, username, creation_date FROM blogs ORDER BY _id ASC";
      const result = await client.query(selectQuery);

      res.status(200).json({
        message: "Blog deleted successfully",
        data: result.rows, // Include the remaining data in the response
      });
    } catch (error) {
      console.error("Error deleting data", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    // Handle unknown API requests
    res.status(404).json({ message: "API Not Found" });
  }
}
