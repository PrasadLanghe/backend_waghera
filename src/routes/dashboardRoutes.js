// import express from "express";
// import { fetchRoomStats, fetchMonthlyBookings } from "../controller/dashboardController.js";

// const router = express.Router();

// router.get("/room-stats", fetchRoomStats);
// router.get("/monthly-bookings", fetchMonthlyBookings);

// export default router;






import express from "express";
import {
  fetchRoomStats,
  fetchDailyBookings,
  fetchWeeklyBookings,
  fetchMonthlyBookings,
  fetchYearlyBookings
} from "../controller/dashboardController.js";

const router = express.Router();

router.get("/room-stats", fetchRoomStats);
router.get("/daily-bookings", fetchDailyBookings);
router.get("/weekly-bookings", fetchWeeklyBookings);
router.get("/monthly-bookings", fetchMonthlyBookings);
router.get("/yearly-bookings", fetchYearlyBookings);

export default router;
