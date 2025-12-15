// import express from "express";
// import multer from "multer";
// import { fetchTeamMembers, addTeamMember } from "../controller/teamController.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" }); // Temporary folder for file before Cloudinary upload

// router.get("/", fetchTeamMembers);
// router.post("/", upload.single("image"), addTeamMember);

// export default router;
import express from "express";
import multer from "multer";
import {
  fetchTeamMembers,
  fetchTeamMemberById,
  addTeamMember,
  editTeamMember,
  removeTeamMember
} from "../controller/teamController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// CRUD ROUTES
router.get("/", fetchTeamMembers);            // READ ALL
router.get("/:id", fetchTeamMemberById);      // READ ONE
router.post("/", upload.single("image"), addTeamMember); // CREATE
router.put("/:id", upload.single("image"), editTeamMember); // UPDATE
router.delete("/:id", removeTeamMember);      // DELETE

export default router;
