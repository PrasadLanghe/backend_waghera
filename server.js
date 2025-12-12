import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./src/config/db.js";

import galleryRoutes from './src/routes/gallery.js';
import adminRoomRoutes from './src/routes/adminRoomRoutes.js';
import reviewRoutes from './src/routes/review.js';
import contactRoutes from './src/routes/contact.js';
import authRoutes from './src/routes/auth.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import availabilityRoutes from './src/routes/availabilityRoutes.js';
import eventPhotoRoutes from './src/routes/eventPhotoRoutes.js'
import teamRoutes from './src/routes/teamRoutes.js'
import activityRoutes from './src/routes/activityRoutes.js'
import dashboardRoutes from './src/routes/dashboardRoutes.js'
import menuRoutes from './src/routes/menuRoutes.js'



dotenv.config();
connectDB();

const app = express();

// ------------------------------
// ✅ CORRECT CORS CONFIGURATION
// ------------------------------
app.use(cors({
  origin: ["http://localhost:5173"],   // allow frontend
  credentials: true,                   // allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ------------------------------
app.use(express.json());

// ------------------------------
// Static Uploads Folder
// ------------------------------
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ------------------------------
// API Routes
// ------------------------------
app.use("/api/admin/rooms", adminRoomRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);



// custom routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/events/photos", eventPhotoRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/menu", menuRoutes);


// ------------------------------
// 404 Fallback
// ------------------------------
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// ------------------------------
// Start Server
// ------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
