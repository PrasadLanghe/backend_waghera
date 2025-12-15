// import PDFDocument from "pdfkit";
// import { Buffer } from "buffer";

// export const generatePdf = async (booking) => {
//     return new Promise((resolve) => {
//         const doc = new PDFDocument();
//         const buffers = [];

//         doc.on("data", buffers.push.bind(buffers));
//         doc.on("end", () => resolve(Buffer.concat(buffers)));

//         doc.fontSize(20).text("Booking Confirmation", { align: "center" });
//         doc.text(`Booking ID: ${booking._id}`);
//         doc.text(`Check-in: ${booking.checkInDate}`);
//         doc.text(`Check-out: ${booking.checkOutDate}`);
//         doc.end();
//     });
// };





// services/pdfService.js
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";
import Room from "../models/AdminRoom.js";
import ExtraService from "../models/extraServiceModel.js";
import User from "../models/User.js";

export const generatePdf = async (booking) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];

            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => resolve(Buffer.concat(buffers)));

            // Fetch related info
            const room = await Room.findById(booking.room);
            const user = await User.findById(booking.user);
            const services = booking.extraServices.length > 0 
                ? await ExtraService.find({ _id: { $in: booking.extraServices } }) 
                : [];

            const nights = Math.ceil(
                (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)
            );

            // --- Header ---
            doc.fontSize(20).fillColor("#2c7a7b").text("🌿 Waghera Agro Tourism 🌿", { align: "center" });
            doc.moveDown();
            doc.fontSize(16).fillColor("#000").text(`Booking Confirmation`, { align: "center" });
            doc.moveDown();
            doc.fontSize(12).text(`Booking ID: ${booking._id}`);
            doc.text(`Guest Name: ${user.name}`);
            doc.text(`Contact: +91 9876543210`);
            doc.text(`Email: ${user.email}`);
            doc.moveDown();

            // --- Booking Details ---
            doc.fontSize(14).fillColor("#2c7a7b").text("📋 Booking Details");
            doc.moveDown(0.5);
            doc.fontSize(12).fillColor("#000");
            doc.text(`Room: ${room.roomId} - ${room.name}`);
            doc.text(`Check-in: ${new Date(booking.checkInDate).toLocaleDateString()}`);
            doc.text(`Check-out: ${new Date(booking.checkOutDate).toLocaleDateString()}`);
            doc.text(`Adults: ${booking.adults}`);
            doc.text(`Children: ${booking.children}`);
            doc.text(`Extra Bed(s): ${booking.extraBed}`);
            doc.moveDown();

            // --- Extra Services ---
            doc.fontSize(14).fillColor("#2c7a7b").text("🌟 Extra Services");
            doc.moveDown(0.5);
            doc.fontSize(12).fillColor("#000");
            if (services.length > 0) {
                services.forEach(s => {
                    doc.text(`${s.name}: ₹${s.pricePerNight} x ${nights} nights = ₹${s.pricePerNight * nights}`);
                });
            } else {
                doc.text("None");
            }
            doc.moveDown();

            // --- Total Price ---
            doc.fontSize(14).fillColor("#2c7a7b").text("💰 Total Price");
            doc.moveDown(0.5);
            doc.fontSize(12).fillColor("#000");
            doc.text(`₹${booking.totalPrice}`);
            doc.moveDown();

            // --- Contact Info ---
            doc.fontSize(14).fillColor("#2c7a7b").text("📞 Contact Info");
            doc.moveDown(0.5);
            doc.fontSize(12).fillColor("#000");
            doc.text("Phone: +91 9876543210");
            doc.text("Email: wagheragro@gmail.com");

            // End PDF
            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};
