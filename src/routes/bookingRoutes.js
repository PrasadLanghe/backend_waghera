import express from "express";
import { handleCreateBooking, testBookingRoute, handleGetAllBookings} from "../controller/bookingController.js";

const router = express.Router();

// POST /api/bookings -> Create booking
// router.post("/book", handleCreateBooking);

// // GET /api/bookings -> Test endpoint
// router.get("/", testBookingRoute);
// router.get("/all", handleGetAllBookings);



router.post("/book", handleCreateBooking);
router.get("/", handleGetAllBookings);
router.get("/test", testBookingRoute);

export default router;

