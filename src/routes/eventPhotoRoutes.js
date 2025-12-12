import express from "express";
import multer from "multer";
import {
    uploadPhoto,
    getPhotos,
    getPhoto,
    removePhoto
} from "../controller/eventPhotoController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage before Cloudinary upload

router.post("/", upload.single("file"), uploadPhoto);
router.get("/", getPhotos);
router.get("/:id", getPhoto);
router.delete("/:id", removePhoto);

export default router;
