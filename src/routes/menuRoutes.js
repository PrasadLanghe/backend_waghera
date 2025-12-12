import express from "express";
import multer from "multer";
import { getAllMenuItems, getMenuItemsByCategory, createMenuItem } from "../controller/menuController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
router.get("/", getAllMenuItems);
router.get("/category/:categoryName", getMenuItemsByCategory);
router.post("/", createMenuItem);

export default router;
