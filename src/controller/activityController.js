// import { uploadActivity, getAllActivities } from "../services/activityService.js";

// export const createActivity = async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         if (!req.file) return res.status(400).json({ message: "File is required" });

//         const activity = await uploadActivity(title, description, req.file);
//         res.status(201).json(activity);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// export const fetchActivities = async (req, res) => {
//     try {
//         const activities = await getAllActivities();
//         res.json(activities);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };



import {
  uploadActivity,
  getAllActivities,
  updateActivity,
  deleteActivity
} from "../services/activityService.js";

// CREATE
export const createActivity = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file)
      return res.status(400).json({ message: "Image file required" });

    const activity = await uploadActivity(title, description, req.file);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ
export const fetchActivities = async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const editActivity = async (req, res) => {
  try {
    const { title, description } = req.body;
    const activity = await updateActivity(
      req.params.id,
      title,
      description,
      req.file
    );
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const removeActivity = async (req, res) => {
  try {
    const result = await deleteActivity(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
