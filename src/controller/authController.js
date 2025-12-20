// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

// // ---------------------------
// // REGISTER USER
// // ---------------------------
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, contact, password } = req.body;

//     // Basic validation
//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Name, email & password required" });

//     // Check duplicate email
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email already registered" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = new User({
//       name,
//       email,
//       contact,
//       password: hashedPassword,
//     });

//     await user.save();

//     // OPTIONAL: Email notification
//     try {
//       await sendRegistrationEmail(email, name);
//     } catch (err) {
//       console.log("Email sending failed:", err.message);
//     }

//     res.status(201).json({
//       success: true,
//       message: "Registration successful",
//       userId: user._id,
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// };

// // ---------------------------
// // LOGIN USER
// // ---------------------------
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "Email & password required" });

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ message: "Invalid email or password" });

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid email or password" });

//     // JWT Token (OPTIONAL)
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || "dummy_secret_key",
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// // ---------------------------
// // LOGOUT USER
// // ---------------------------
// export const logoutUser = (req, res) => {
//   res.json({ success: true, message: "Logged out successfully" });
// };

// // ---------------------------
// // SEND REGISTRATION EMAIL (DUMMY SMTP)
// // ---------------------------
// const sendRegistrationEmail = async (toEmail, userName) => {
  
//   // Dummy SMTP (works for local development)
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: "test@example.com",   // dummy email
//       pass: "password123",        // dummy password
//     },
//   });

//   const html = `
//     <div style="font-family: Arial; padding:20px;">
//       <h2>🎉 Welcome, ${userName}!</h2>
//       <p>Your registration at <b>Waghera Agro Tourism</b> was successful.</p>
//     </div>
//   `;

//   await transporter.sendMail({
//     from: `"Waghera Agro" <noreply@wagheraagro.com>`,
//     to: toEmail,
//     subject: "Registration Successful 🎉",
//     html,
//   });
// };







import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendRegistrationEmail } from "../services/emailService.js"; // ✅ NEW

// ---------------------------
// REGISTER USER
// ---------------------------
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, contact, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Name, email & password required" });
//     console.log("Register request email:", email);

//     // const existingUser = await User.findOne({ email });
//     //     console.log("Existing user from DB:", existingUser); // <--- add this


//     // if (existingUser)
//     //   return res.status(400).json({ message: "Email already registered" });

//     const existingUser = await User.findOne({ email });
// console.log("Register email:", email);
// console.log("Existing user:", existingUser);
// if (existingUser)
//   return res.status(400).json({ message: "Email already registered" });


//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       contact,
//       password: hashedPassword,
//     });

//     await user.save();

//     // ✅ SEND REGISTRATION EMAIL
//     await sendRegistrationEmail(email, name);

//     res.status(201).json({
//       success: true,
//       message: "Registration successful",
//       userId: user._id,
//     });

//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// };

export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Name, email & password required" });

    const normalizedEmail = email.trim().toLowerCase();

    console.log("➡️ Incoming register:", { name, email: normalizedEmail });   // <---
    const existingUser = await User.findOne({ email: normalizedEmail });
    console.log("🔍 existingUser:", existingUser);                            // <---

    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: normalizedEmail,
      contact,
      password: hashedPassword,
    });

    await user.save();

    await sendRegistrationEmail(email, name);

    console.log("✅ New user saved:", user._id);                               // <---

    res.status(201).json({
      success: true,
      message: "Registration successful",
      userId: user._id,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};


// ---------------------------
// LOGIN USER
// ---------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "dummy_secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ---------------------------
// LOGOUT USER
// ---------------------------
export const logoutUser = (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};

