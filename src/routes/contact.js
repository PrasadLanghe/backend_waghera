// import express from "express";
// // import { sendMessage, getAllMessages } from "../controller/contactController.js";
// import { sendContactMail } from "../controller/contactController.js";
// const router = express.Router();

// // POST /api/contact/send
// // router.post("/send", sendMessage);

// // GET /api/contact/all
// // router.get("/all", getAllMessages);

// router.post("/", sendContactMail);

// export default router;




import express from "express";
import {
  sendContactMail,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} from "../controller/contactController.js";

const router = express.Router();

// Create + Send Email
router.post("/", sendContactMail);

// Read All
router.get("/", getAllMessages);

// Read Single
router.get("/:id", getMessageById);

// Update
router.put("/:id", updateMessage);

// Delete
router.delete("/:id", deleteMessage);

export default router;
