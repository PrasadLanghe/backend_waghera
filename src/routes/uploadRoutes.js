import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// POST /uploads  -> Upload image to Cloudinary
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "waghera_menu"
    });

    fs.unlinkSync(req.file.path); // delete temp file

    return res.json({ url: result.secure_url });

  } catch (error) {
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
