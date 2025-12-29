import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import Admin from "./src/models/Admin.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    // ✅ SET YOUR ADMIN CREDENTIALS HERE
    const ADMIN_USERNAME = "Sadanand";        // Change this
    const ADMIN_PASSWORD = "sada@123";     // Change this

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD, // This will be hashed automatically
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();