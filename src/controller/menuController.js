import MenuItem from "../models/MenuItem.js";
import cloudinary from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// GET all menu items
export const getAllMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET menu items by category
export const getMenuItemsByCategory = async (req, res) => {
    try {
        const category = req.params.categoryName;
        const items = await MenuItem.find({ category });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// POST create a new menu item with image upload
export const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!req.file) return res.status(400).json({ message: "Image is required" });

        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "menu_items"
        });

        // Remove temporary file
        fs.unlinkSync(req.file.path);

        const menuItem = new MenuItem({
            name,
            description,
            price,
            category,
            imageUrl: result.secure_url
        });

        const savedItem = await menuItem.save();
        res.status(201).json(savedItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
