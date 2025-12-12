import express from "express";
import { fetchRoomStats, fetchMonthlyBookings } from "../controller/dashboardController.js";

const router = express.Router();

router.get("/room-stats", fetchRoomStats);
router.get("/monthly-bookings", fetchMonthlyBookings);

export default router;
