import Booking from "../models/bookingModel.js";
import Room from "../models/AdminRoom.js";

export const getRoomStats = async () => {
    const totalRooms = await Room.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookedToday = await Booking.countDocuments({
        bookingDate: { $gte: today, $lt: tomorrow }
    });

    const availableRooms = totalRooms - bookedToday;
    const totalBookings = await Booking.countDocuments();

    return {
        totalRooms,
        bookedToday,
        availableRooms,
        totalBookings
    };
};

export const getMonthlyBookings = async () => {
    const result = [];

    const currentYear = new Date().getFullYear();

    for (let month = 0; month < 12; month++) {
        const start = new Date(currentYear, month, 1);
        const end = new Date(currentYear, month + 1, 1);

        const count = await Booking.countDocuments({
            bookingDate: { $gte: start, $lt: end }
        });

        result.push({
            month: getMonthName(month + 1),
            Booked: count
        });
    }

    return result;
};

const getMonthName = (month) => {
    return new Date(2000, month - 1).toLocaleString("default", { month: "short" });
};
