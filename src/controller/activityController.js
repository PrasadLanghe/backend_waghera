import { uploadActivity, getAllActivities } from "../services/activityService.js";

export const createActivity = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!req.file) return res.status(400).json({ message: "File is required" });

        const activity = await uploadActivity(title, description, req.file);
        res.status(201).json(activity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const fetchActivities = async (req, res) => {
    try {
        const activities = await getAllActivities();
        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
