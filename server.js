// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import connectDB from "./src/config/db.js";

// import galleryRoutes from './src/routes/gallery.js';
// import adminRoomRoutes from './src/routes/adminRoomRoutes.js';
// import reviewRoutes from './src/routes/review.js';
// import contactRoutes from './src/routes/contact.js';
// import authRoutes from './src/routes/auth.js';
// import bookingRoutes from './src/routes/bookingRoutes.js';
// import availabilityRoutes from './src/routes/availabilityRoutes.js';
// import eventPhotoRoutes from './src/routes/eventPhotoRoutes.js'
// import teamRoutes from './src/routes/teamRoutes.js'
// import activityRoutes from './src/routes/activityRoutes.js'
// import dashboardRoutes from './src/routes/dashboardRoutes.js'
// import menuRoutes from './src/routes/menuRoutes.js'

// import uploadRoutes from "./src/routes/uploadRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ------------------------------
// // ✅ CORRECT CORS CONFIGURATION
// // ------------------------------
// app.use(cors({
//   origin: ["http://localhost:5173"],   // allow frontend
//   credentials: true,                   // allow cookies/auth headers
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ------------------------------
// app.use(express.json());

// // ------------------------------
// // Static Uploads Folder
// // ------------------------------
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// // ------------------------------
// // API Routes
// // ------------------------------
// app.use("/api/admin/rooms", adminRoomRoutes);
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/auth", authRoutes);



// // custom routes
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/availability", availabilityRoutes);
// // app.use("/api/events/photos", eventPhotoRoutes);
// app.use("/api/event-photos", eventPhotoRoutes);
// app.use("/api/team", teamRoutes);
// app.use("/api/activities", activityRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/uploads", uploadRoutes);

// // ------------------------------
// // 404 Fallback
// // ------------------------------
// app.use((req, res) => {
//   res.status(404).json({ message: "API endpoint not found" });
// });

// // ------------------------------
// // Start Server
// // ------------------------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));






import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import path from "path";

import connectDB from "./src/config/db.js";


// Routes

import galleryRoutes from "./src/routes/gallery.js";

import adminRoomRoutes from "./src/routes/adminRoomRoutes.js";

import reviewRoutes from "./src/routes/review.js";

import contactRoutes from "./src/routes/contact.js";

import authRoutes from "./src/routes/auth.js";

import bookingRoutes from "./src/routes/bookingRoutes.js";

import availabilityRoutes from "./src/routes/availabilityRoutes.js";

import eventPhotoRoutes from "./src/routes/eventPhotoRoutes.js";

import teamRoutes from "./src/routes/teamRoutes.js";

import activityRoutes from "./src/routes/activityRoutes.js";

import dashboardRoutes from "./src/routes/dashboardRoutes.js";

import menuRoutes from "./src/routes/menuRoutes.js";

import uploadRoutes from "./src/routes/uploadRoutes.js";


dotenv.config();


// ------------------------------

// ✅ Connect Database

// ------------------------------

connectDB();


const app = express();


// ------------------------------

// ✅ CORS – DEV + PRODUCTION SAFE

// ------------------------------

const allowedOrigins = [

  "http://localhost:5173",

  "https://waghera.onrender.com",

  "https://wagheraagrofrontend.vercel.app/"

];


app.use(

  cors({

    origin: (origin, callback) => {

      // allow requests with no origin (Postman, server-to-server)

      if (!origin) return callback(null, true);


      if (allowedOrigins.includes(origin)) {

        return callback(null, true);

      } else {

        return callback(new Error("Not allowed by CORS"));

      }

    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    allowedHeaders: ["Content-Type", "Authorization"]

  })

);


// ------------------------------

// Body Parser

// ------------------------------

app.use(express.json());


// ------------------------------

// Static Uploads

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


app.use("/api/bookings", bookingRoutes);

app.use("/api/availability", availabilityRoutes);

app.use("/api/event-photos", eventPhotoRoutes);

app.use("/api/team", teamRoutes);

app.use("/api/activities", activityRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/uploads", uploadRoutes);


// ------------------------------

// Health Check (IMPORTANT for Render)

// ------------------------------

app.get("/health", (req, res) => {

  res.status(200).json({ status: "OK", message: "Server is running" });

});


// ------------------------------

// 404 Fallback

// ------------------------------

app.use((req, res) => {

  res.status(404).json({ message: "API endpoint not found" });

});


// ------------------------------

// Global Error Handler

// ------------------------------

app.use((err, req, res, next) => {

  console.error("❌ Server Error:", err.message);

  res.status(500).json({ message: "Internal Server Error" });

});


// ------------------------------

// Start Server

// ------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>

  console.log(`✅ Server running on port ${PORT}`)

);