// import express from "express";
// import multer from "multer";
// import {
//     uploadPhoto,
//     getPhotos,
//     getPhoto,
//     removePhoto
// } from "../controller/eventPhotoController.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" }); // Temporary storage before Cloudinary upload

// router.post("/", upload.single("file"), uploadPhoto);
// router.get("/", getPhotos);
// router.get("/:id", getPhoto);
// router.delete("/:id", removePhoto);

// export default router;



import express from "express";
import multer from "multer";
import {
  uploadPhoto,
  getPhotos,
  getPhoto,
  removePhoto,
  updatePhoto
} from "../controller/eventPhotoController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadPhoto);      // CREATE
router.get("/", getPhotos);                                // READ ALL
router.get("/:id", getPhoto);                              // READ ONE
router.put("/:id", updatePhoto);                           // UPDATE (no file change)
router.delete("/:id", removePhoto);                        // DELETE

export default router;
