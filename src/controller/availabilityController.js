// import { checkAvailability } from "../services/availabilityService.js";

// export const handleCheckAvailability = async (req, res) => {
//     try {
//         const rooms = await checkAvailability(req.body.checkInDate, req.body.checkOutDate);
//         res.status(200).json(rooms);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };



import { checkAvailability } from "../services/availabilityService.js";

export const handleCheckAvailability = async (req, res) => {
    try {
        const { checkInDate, checkOutDate } = req.body;

        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({ message: "Dates required" });
        }

        const rooms = await checkAvailability(checkInDate, checkOutDate);
        res.status(200).json(rooms);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
