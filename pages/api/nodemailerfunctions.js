const nodemailer = require("nodemailer");

// Configure nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "Alim.Mohammad619@outlook.com",
    pass: "Mc@2020!$",
  },
});

export const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};


export const insertOTP = async (email, otp) => {
  try {
    const query = "INSERT INTO otp_table (email, otp) VALUES ($1, $2)";
    const values = [email, otp];
    await client.query(query, values);
  } catch (error) {
    console.error("Error inserting OTP", error);
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const query = "SELECT otp FROM otp_table WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const storedOTP = result.rows[0].otp;
      return storedOTP === otp;
    } else {
      throw new Error("OTP not found for the given email");
    }
  } catch (error) {
    console.error("Error verifying OTP", error);
    throw new Error("Failed to verify OTP");
  }
};