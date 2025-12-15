import GalleryImage from "../models/GalleryImage.js";
import cloudinary from "../config/cloudinary.js";

// -------------------- Upload Image --------------------
export const uploadImage = async (req, res) => {
  try {
    const { category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "waghera_gallery",
    });

    // Save URL + public_id
    const galleryImage = new GalleryImage({
      url: result.secure_url,
      category,
      public_id: result.public_id,
    });

    await galleryImage.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      data: galleryImage,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- Get All Images --------------------
export const getAllImages = async (req, res) => {
  try {
    const images = await GalleryImage.find();
    res.json(images);
  } catch (err) {
    console.error("Get all images error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- Get Images by Category --------------------
export const getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const images = await GalleryImage.find({ category });
    res.json(images);
  } catch (err) {
    console.error("Get category images error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- Update Image (Optional File Replace) --------------------
export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    const image = await GalleryImage.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    let updatedData = { category };

    // If new image file uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "waghera_gallery",
      });

      updatedData.url = result.secure_url;
      updatedData.public_id = result.public_id;
    }

    const updatedImage = await GalleryImage.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json({
      message: "Image updated successfully",
      data: updatedImage,
    });
  } catch (err) {
    console.error("Update image error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- Delete Image --------------------
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await GalleryImage.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await GalleryImage.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Delete image error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
