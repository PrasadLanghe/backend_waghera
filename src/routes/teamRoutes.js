import express from "express";
import multer from "multer";
import { fetchTeamMembers, addTeamMember } from "../controller/teamController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary folder for file before Cloudinary upload

router.get("/", fetchTeamMembers);
router.post("/", upload.single("image"), addTeamMember);

export default router;
