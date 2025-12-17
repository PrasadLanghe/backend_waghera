// import Booking from "../models/bookingModel.js";
// import Room from "../models/AdminRoom.js";

// export const getRoomStats = async () => {
//     const totalRooms = await Room.countDocuments();

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const bookedToday = await Booking.countDocuments({
//         bookingDate: { $gte: today, $lt: tomorrow }
//     });

//     const availableRooms = totalRooms - bookedToday;
//     const totalBookings = await Booking.countDocuments();

//     return {
//         totalRooms,
//         bookedToday,
//         availableRooms,
//         totalBookings
//     };
// };

// export const getMonthlyBookings = async () => {
//     const result = [];

//     const currentYear = new Date().getFullYear();

//     for (let month = 0; month < 12; month++) {
//         const start = new Date(currentYear, month, 1);
//         const end = new Date(currentYear, month + 1, 1);

//         const count = await Booking.countDocuments({
//             bookingDate: { $gte: start, $lt: end }
//         });

//         result.push({
//             month: getMonthName(month + 1),
//             Booked: count
//         });
//     }

//     return result;
// };

// const getMonthName = (month) => {
//     return new Date(2000, month - 1).toLocaleString("default", { month: "short" });
// };









import Booking from "../models/bookingModel.js";
import Room from "../models/AdminRoom.js";

// ================= ROOM STATS =================
export const getRoomStats = async () => {
  const totalRooms = await Room.countDocuments();

  const bookedRoomIds = await Booking.distinct("roomId", {
    status: "CONFIRMED"
  });

  const availableRooms = totalRooms - bookedRoomIds.length;

  // TODAY BOOKINGS
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const bookedToday = await Booking.countDocuments({
    createdAt: { $gte: startOfDay }
  });

  return {
    totalRooms,
    availableRooms,
    bookedToday
  };
};

// ================= DAY WISE =================
export const getDailyBookings = async () => {
  const data = await Booking.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        total: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  return {
    labels: data.map(d => d._id),
    values: data.map(d => d.total)
  };
};

// ================= WEEK WISE =================
export const getWeeklyBookings = async () => {
  const data = await Booking.aggregate([
    {
      $group: {
        _id: { $week: "$createdAt" },
        total: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  return {
    labels: data.map(d => `Week ${d._id}`),
    values: data.map(d => d.total)
  };
};

// ================= MONTH WISE =================
export const getMonthlyBookings = async () => {
  const data = await Booking.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  return {
    labels: data.map(d => monthNames[d._id - 1]),
    values: data.map(d => d.total)
  };
};

// ================= YEAR WISE =================
export const getYearlyBookings = async () => {
  const data = await Booking.aggregate([
    {
      $group: {
        _id: { $year: "$createdAt" },
        total: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  return {
    labels: data.map(d => d._id),
    values: data.map(d => d.total)
  };
};
