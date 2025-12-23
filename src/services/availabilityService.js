


// import Room from "../models/AdminRoom.js";
// import Booking from "../models/bookingModel.js";

// export const checkAvailability = async (checkIn, checkOut) => {
//     // Normalize dates (prevents timezone bugs)
//     const checkInDate = new Date(`${checkIn}T00:00:00`);
//     const checkOutDate = new Date(`${checkOut}T00:00:00`);

//     // 1️⃣ Get all AVAILABLE rooms
//     const rooms = await Room.find({ status: "AVAILABLE" });

//     // 2️⃣ Find ALL overlapping bookings in ONE query
//     const overlappingBookings = await Booking.find({
//         checkInDate: { $lt: checkOutDate },
//         checkOutDate: { $gt: checkInDate },
//     }).select("room");

//     // 3️⃣ Extract booked room IDs
//     const bookedRoomIds = overlappingBookings.map(
//         (b) => b.room.toString()
//     );

//     // 4️⃣ Filter available rooms
//     const availableRooms = rooms.filter(
//         (room) => !bookedRoomIds.includes(room._id.toString())
//     );

//     return availableRooms;
// };













import Room from "../models/AdminRoom.js";
import Booking from "../models/bookingModel.js";

export const checkAvailability = async (checkIn, checkOut) => {
    const checkInDate = new Date(`${checkIn}T00:00:00`);
    const checkOutDate = new Date(`${checkOut}T00:00:00`);

    const rooms = await Room.find({ status: "AVAILABLE" });

    const overlappingBookings = await Booking.find({
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate }
    }).select("room");

    const bookedRoomIds = overlappingBookings.map(b => b.room.toString());

    return rooms.filter(
        room => !bookedRoomIds.includes(room._id.toString())
    );
};
