import cloudinary from "cloudinary";
import Activity from "../models/Activity.js";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadActivity = async (title, description, file) => {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, { folder: "activities" });

    // Save activity to MongoDB
    const activity = new Activity({
        title,
        description,
        imageUrl: result.secure_url
    });

    return activity.save();
};

export const getAllActivities = async () => {
    return Activity.find();
};
