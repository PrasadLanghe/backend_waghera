import express from "express";
import upload from "../middleware/multer.js";
import {
  uploadImage,
  getAllImages,
  getImagesByCategory,
  updateImage,
  deleteImage,
} from "../controller/galleryController.js";

const router = express.Router();

// Upload image
router.post("/upload", upload.single("file"), uploadImage);

// Get all
router.get("/all", getAllImages);

// Get by category
router.get("/category/:category", getImagesByCategory);

// Update (with optional image upload)
router.put("/update/:id", upload.single("file"), updateImage);

// Delete
router.delete("/delete/:id", deleteImage);

export default router;
