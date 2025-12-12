import { getRoomStats, getMonthlyBookings } from "../services/dashboardService.js";

export const fetchRoomStats = async (req, res) => {
    try {
        const stats = await getRoomStats();
        res.json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const fetchMonthlyBookings = async (req, res) => {
    try {
        const data = await getMonthlyBookings();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
