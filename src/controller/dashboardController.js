// import { getRoomStats, getMonthlyBookings } from "../services/dashboardService.js";

// export const fetchRoomStats = async (req, res) => {
//     try {
//         const stats = await getRoomStats();
//         res.json(stats);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// export const fetchMonthlyBookings = async (req, res) => {
//     try {
//         const data = await getMonthlyBookings();
//         res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };





import {
  getRoomStats,
  getDailyBookings,
  getWeeklyBookings,
  getMonthlyBookings,
  getYearlyBookings
} from "../services/dashboardService.js";

// ROOM + TODAY STATS
export const fetchRoomStats = async (req, res) => {
  try {
    const data = await getRoomStats();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard stats error" });
  }
};

// DAY WISE
export const fetchDailyBookings = async (req, res) => {
  try {
    const data = await getDailyBookings();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Daily booking error" });
  }
};

// WEEK WISE
export const fetchWeeklyBookings = async (req, res) => {
  try {
    const data = await getWeeklyBookings();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Weekly booking error" });
  }
};

// MONTH WISE
export const fetchMonthlyBookings = async (req, res) => {
  try {
    const data = await getMonthlyBookings();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Monthly booking error" });
  }
};

// YEAR WISE
export const fetchYearlyBookings = async (req, res) => {
  try {
    const data = await getYearlyBookings();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Yearly booking error" });
  }
};
