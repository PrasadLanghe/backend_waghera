import express from "express";
import MenuItem from "../models/MenuItem.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// ---------------- CRUD ------------------

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by category
router.get("/category/:categoryName", async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.categoryName });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE menu item (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    const imageUrl = req.file ? req.file.path : undefined;

    const newItem = new MenuItem({ name, description, price, category, imageUrl });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE menu item by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, ...(imageUrl && { imageUrl }) },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: "Menu item not found" });

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE menu item by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE all menu items
router.delete("/", async (req, res) => {
  try {
    await MenuItem.deleteMany();
    res.json({ message: "All menu items deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
