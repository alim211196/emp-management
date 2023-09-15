import { getClient } from "../../db/connection";
import { generateOTP, insertOTP, transporter, verifyOTP } from "./nodemailerfunctions";


const handler = async (req, res) => {
  const { apiName } = req.query;
  const client = await getClient();

  

  if (req.method === "OPTIONS") {
    // Set CORS headers
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://emp-management-five.vercel.app"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end(); // Respond with a 200 status code
    return;
  }

  // Set CORS headers for the actual request
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://emp-management-five.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (apiName === "admin_login") {
    const { username, password } = req.body;

    try {
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
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "employee_login") {
    const { username, password } = req.body;

    try {
      const query =
        "SELECT * FROM users WHERE username = $1 AND password = $2 AND user_type = 'employee'";
      const values = [username, password];
      const result = await client.query(query, values);
      const user = result.rows[0];

      if (user) {
        if (user.active === false) {
          res.status(409).json({
            message:
              "Your account is temporarily deactivated. Please contact the administrator.",
            status: 409,
          });
        } else {
          res.status(200).json({
            message: "Login successful",
            user: user,
            status: 200,
          });
        }
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "forgot_password") {
    const { email } = req.body;
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const result = await client.query(query, values);
      const user = result.rows[0];

      if (user) {
        // Generate and send OTP to user's email
        const otp = generateOTP(); // Implement your OTP generation logic
        const mailOptions = {
          from: "Alim.Mohammad619@outlook.com", // Sender email address
          to: email, // Receiver email address
          subject: "Password Reset OTP", // Email subject
          text: `Your OTP for password reset is: ${otp}`, // Email body
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).json({ message: "Failed to send OTP" });
          } else {
            res.status(200).json({
              message: "Email is valid",
              _id: user._id,
            });
            insertOTP(email, otp);
          }
        });
      } else {
        res.status(404).json({ message: "Email not found" });
      }
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "reset_password") {
    const { _id, new_password, otp } = req.body;

    try {
      const query = "SELECT * FROM users WHERE _id = $1";
      const values = [_id];
      const result = await client.query(query, values);
      const user = result.rows[0];

      if (user) {
        // Verify the received OTP
        const isOTPValid = verifyOTP(user.email, otp); // Implement your OTP verification logic
        if (isOTPValid) {
          // Update the user's password in the database
          const updateQuery = "UPDATE users SET password = $1 WHERE _id = $2";
          const updateValues = [new_password, _id];
          await client.query(updateQuery, updateValues);

          res.status(200).json({ message: "Password reset successfully" });
        } else {
          res.status(400).json({ message: "Invalid OTP" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "get_employees") {
    try {
      // Fetch the data in ascending order
      const query = "SELECT * FROM users ORDER BY _id ASC";
      const result = await client.query(query);
      const data = result.rows;

      res.status(200).json({ data });
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "get_blogs") {
    try {
      // Fetch the data in ascending order
      const query = " SELECT * FROM blogs ORDER BY _id ASC";
      const result = await client.query(query);
      const data = result.rows;

      res.status(200).json({ data });
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
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
      // Check if email or username already exists in the database
      const checkQuery =
        "SELECT * FROM users WHERE email = $1 OR username = $2";
      const checkValues = [email, username];
      const checkResult = await client.query(checkQuery, checkValues);
      const existingUser = checkResult.rows[0];
      if (existingUser) {
        // Return an error if email or username already exists
        res.status(409).json({ message: "Email or username already exists" });
      } else {
        // Insert the new user into the database
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
      }
    } catch (error) {
      console.error("Error inserting data", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "add_blog") {
    const {
      blog_title,
      blog_description,
      created_by,
      updated_by,
      creation_date,
      profileimage,
      active,
      employees_ids,
    } = req.body;

    try {
      const insertQuery =
        "INSERT INTO blogs (blog_title, blog_description,created_by,updated_by, creation_date,profileimage,active,employees_ids) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)";
      const insertValues = [
        blog_title,
        blog_description,
        created_by,
        updated_by,
        creation_date,
        profileimage,
        active,
        employees_ids,
      ];
      await client.query(insertQuery, insertValues);

      // Fetch the inserted data in ascending order
      const selectQuery = "SELECT * FROM blogs ORDER BY _id ASC";
      const result = await client.query(selectQuery);

      res.status(200).json({
        message: "Blog created successfully",
        data: result.rows, // Include the ordered data in the response
      });
    } catch (error) {
      console.error("Error inserting data", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
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
      // Check if email or username already exists in the database
      const checkQuery =
        "SELECT * FROM users WHERE email = $1 OR username = $2";
      const checkValues = [email, username];
      const checkResult = await client.query(checkQuery, checkValues);
      const existingUser = checkResult.rows[0];

      // Check if the existing user is the same as the user being updated
      if (existingUser && existingUser._id !== _id) {
        // Return an error if email or username already exists for a different user
        res.status(409).json({ message: "Email or username already exists" });
      } else {
        // Update the existing user in the database
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

        res
          .status(200)
          .json({ message: "Employee updated successfully", data });
      }
    } catch (error) {
      console.error("Error updating data", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "update_blogs") {
    const {
      _id,
      blog_title,
      blog_description,
      created_by,
      updated_by,
      creation_date,
      profileimage,
      active,
      employees_ids,
    } = req.body;

    try {
      const updateQuery = `
      UPDATE blogs 
      SET 
        blog_title = $1, 
        blog_description = $2, 
        created_by = $3, 
        updated_by =$4,
        creation_date = $5,
        profileimage=$6,active=$7,employees_ids=$8
      WHERE 
        _id = $9
    `;
      const updateValues = [
        blog_title,
        blog_description,
        created_by,
        updated_by,
        creation_date,
        profileimage,
        active,
        employees_ids,
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
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "update_employee_active") {
    const { _id, active } = req.body;

    try {
      const updateQuery = "UPDATE users SET active = $1 WHERE _id = $2";
      const updateValues = [active, _id];
      await client.query(updateQuery, updateValues);

      // Fetch the updated data in ascending order
      const selectQuery = "SELECT * FROM users ORDER BY _id ASC";
      const result = await client.query(selectQuery);

      res.status(200).json({
        message:
          active === true
            ? "Employee activated successfully"
            : "Employee deactivated successfully",
        data: result.rows, // Include the updated data in the response
      });
    } catch (error) {
      console.error("Error updating data", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "update_blog_active") {
    const { _id, active } = req.body;

    try {
      const updateQuery = "UPDATE blogs SET active = $1 WHERE _id = $2";
      const updateValues = [active, _id];
      await client.query(updateQuery, updateValues);

      // Fetch the updated data in ascending order
      const selectQuery = "SELECT * FROM blogs ORDER BY _id ASC";
      const result = await client.query(selectQuery);

      res.status(200).json({
        message:
          active === true
            ? "Blog activated successfully"
            : "Blog deactivated successfully",
        data: result.rows, // Include the updated data in the response
      });
    } catch (error) {
      console.error("Error updating data", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "assign_blog") {
    const { _id, employees_ids } = req.body;

    try {
      const updateQuery = "UPDATE blogs SET employees_ids = $1 WHERE _id = $2";
      const updateValues = [employees_ids, _id];
      await client.query(updateQuery, updateValues);

      // Fetch the updated data in ascending order
      const selectQuery = "SELECT * FROM blogs ORDER BY _id ASC";
      const result = await client.query(selectQuery);

      res.status(200).json({
        message: "Blog Assigned Successfully.",
        data: result.rows, // Include the updated data in the response
      });
    } catch (error) {
      console.error("Error updating data", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "post_comment") {
    const { fullname, email, phone, comment, creation_date } = req.body;

    try {
      const insertQuery =
        "INSERT INTO contacts (fullname, email, phone, comment, creation_date) VALUES ($1, $2, $3, $4, $5)";
      const insertValues = [fullname, email, phone, comment, creation_date];
      await client.query(insertQuery, insertValues);

      // Fetch the inserted data in ascending order
      const selectQuery = "SELECT * FROM contacts ORDER BY _id ASC";
      const result = await client.query(selectQuery);

      res.status(200).json({
        message: "Thanks for submitting your form.",
        data: result.rows, // Include the ordered data in the response
      });
    } catch (error) {
      console.error("Error inserting data", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else if (apiName === "get_comments") {
    try {
      // Fetch the data in ascending order
      const query = " SELECT * FROM contacts ORDER BY _id ASC";
      const result = await client.query(query);
      const data = result.rows;

      res.status(200).json({ data });
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  } else {
    // Handle unknown API requests
    res.status(404).json({ message: "API not found" });
    client.release();
  }
};

export default handler;
