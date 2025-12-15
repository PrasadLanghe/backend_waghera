// import { sendEmailWithAttachment } from "../services/emailService.js";

// export const sendContactMail = async (req, res) => {
//   const { name, email, message } = req.body;

//   const emailSent = await sendEmail(
//     "langheps2003@example.com",
//     "New Contact Form Message",
//     `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
//   );

//   if (emailSent) {
//     return res.status(200).json({ success: true, message: "Email sent!" });
//   } else {
//     return res.status(500).json({ success: false, message: "Email failed!" });
//   }
// };





import Contact from "../models/Contact.js";
import { sendEmailWithAttachment } from "../services/emailService.js";

// CREATE + Send Email
export const sendContactMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to DB
    const contact = await Contact.create({ name, email, message });

    // Send email
    await sendEmailWithAttachment(
      "langheps2003@example.com",
      "New Contact Form Message",
      `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
    );

    res.status(201).json({ success: true, data: contact, message: "Message sent!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ ALL
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ SINGLE
export const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: "Not found!" });
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ success: false, message: "Not found!" });
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: "Not found!" });
    res.status(200).json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

