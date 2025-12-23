import Booking from "../models/bookingModel.js";
import Room from "../models/AdminRoom.js";
import User from "../models/User.js";
import ExtraService from "../models/extraServiceModel.js";
import { generatePdf } from "../services/pdfService.js";
import { sendEmailWithAttachment } from "../services/emailService.js";
import { checkAvailability } from "../services/availabilityService.js";

const EXTRA_BED_PRICE = 300;





export const handleCreateBooking = async (req, res) => {
    try {
        const data = req.body;

        // 1. Find room
        const room = await Room.findById(data.roomId);
        if (!room || room.status !== "AVAILABLE") throw new Error("Room not available");

        // 2. Find user
        const user = await User.findById(data.userId);
        if (!user) throw new Error("User not found");

        // 3. Check overlapping bookings
        // const overlaps = await Booking.find({
        //     room: room._id,
        //     $or: [
        //         { checkInDate: { $lt: new Date(data.checkOutDate), $gte: new Date(data.checkInDate) } },
        //         { checkOutDate: { $gt: new Date(data.checkInDate), $lte: new Date(data.checkOutDate) } },
        //         { checkInDate: { $lte: new Date(data.checkInDate) }, checkOutDate: { $gte: new Date(data.checkOutDate) } }
        //     ]
        // });
        // if (overlaps.length > 0) throw new Error("Room already booked");

      // 3️⃣ CHECK AVAILABILITY USING SERVICE
      
const availableRooms = await checkAvailability(
    data.checkInDate,
    data.checkOutDate
);

const isRoomAvailable = availableRooms.some(
    r => r._id.toString() === room._id.toString()
);

if (!isRoomAvailable) {
    throw new Error("Room not available for selected dates");
}









        // 4. Get extra services if any
        const services = data.serviceIds ? await ExtraService.find({ _id: { $in: data.serviceIds } }) : [];

        // 5. Calculate total price
        const nights = Math.ceil((new Date(data.checkOutDate) - new Date(data.checkInDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = (room.price * nights) +
            (services.reduce((sum, s) => sum + s.pricePerNight * nights, 0)) +
            (data.extraBed * EXTRA_BED_PRICE * nights);

        // 6. Create booking object
        const booking = new Booking({
            room: room._id,
            user: user._id,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            adults: data.adults,
            children: data.children,
            extraBed: data.extraBed,
            extraServices: services.map(s => s._id),
            totalPrice
        });

        // 7. Save booking
        const savedBooking = await booking.save();

        // 8. Generate PDF
        const pdfBuffer = await generatePdf(savedBooking);

        // 9. Helper to render extra services
        const renderExtraServices = (services, nights) => {
            if (!services || services.length === 0) return "None";
            return services.map(s => `${s.name} (₹${s.pricePerNight} x ${nights} nights)`).join("<br>");
        };

        // 10. Create email HTML
        const htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px;">
            <h2 style="color: #2c7a7b; text-align:center;">
              🌿 Waghera Agro Tourism - Booking Confirmed 🌿
            </h2>

            <p style="font-size: 16px;">Hello <b>${user.name}</b>,</p>
            <p style="font-size: 15px; color:#444;">
              Thank you for booking with Waghera Agro Tourism! We are excited to welcome you.
            </p>

            <hr style="margin: 20px 0;">
            <h3 style="color: #2c7a7b;">📋 Booking Details</h3>
            <p>
              <b>Room:</b> ${room.roomId} - ${room.name} <br>
              <b>Check-in:</b> ${new Date(savedBooking.checkInDate).toLocaleDateString()} <br>
              <b>Check-out:</b> ${new Date(savedBooking.checkOutDate).toLocaleDateString()} <br>
              <b>Adults:</b> ${savedBooking.adults} <br>
              <b>Children:</b> ${savedBooking.children} <br>
              <b>Extra Bed(s):</b> ${savedBooking.extraBed} <br>
              <b>Extra Services:</b> ${renderExtraServices(services, nights)} <br>
              <b>Total Price:</b> ₹${savedBooking.totalPrice}
            </p>

            <hr style="margin: 20px 0;">
            <h3 style="color: #2c7a7b;">🌾 Recommended Activities</h3>
            <ul>
              <li>Nature Trail Walk</li>
              <li>Sunset Point Visit</li>
              <li>Village Tour Experience</li>
              <li>Campfire Night (On Request)</li>
            </ul>

            <h3 style="color: #2c7a7b;">🍽 Food Suggestions</h3>
            <p>Try our special Maharashtrian Thali & Farm Fresh Breakfast.</p>

            <hr style="margin: 20px 0;">
            <h3 style="color: #2c7a7b;">📞 Contact Info</h3>
            <p>
              <b>Phone:</b> +91 9876543210 <br>
              <b>Email:</b> wagheragro@gmail.com <br>
              <b>Instagram:</b> 
              <a href="https://instagram.com/wagheraagro_tourism" style="color:#3182ce;">@wagheraagro_tourism</a>
            </p>

            <p style="font-size: 14px; color:#555;">
              Warm Regards,<br>
              <b>Waghera Agro Tourism Team</b>
            </p>
          </div>
        </div>
        `;

        // 11. Send email
        await sendEmailWithAttachment(
            user.email,
            `🌿 Booking Confirmation - #${savedBooking._id}`,
            htmlBody,
            pdfBuffer,
            `booking_${savedBooking._id}.pdf`
        );

        res.status(200).json(savedBooking);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};














// Optional GET route to test booking API
export const testBookingRoute = (req, res) => {
    res.json({ message: "Booking route is working" });
};


// Example of the new function to add to bookingController.js

export const handleGetAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('room', 'name price capacity') 
            .populate('user', 'name email phone')
            .populate('extraServices', 'name pricePerNight')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching all bookings.",
            error: err.message 
        });
    }
};

// ... other existing functions (handleCreateBooking, testBookingRoute) ...
