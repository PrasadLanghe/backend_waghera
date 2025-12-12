import express from "express";
import multer from "multer";
import { createActivity, fetchActivities } from "../controller/activityController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temporary folder for file before Cloudinary

router.post("/upload", upload.single("file"), createActivity);
router.get("/all", fetchActivities);

export default router;
