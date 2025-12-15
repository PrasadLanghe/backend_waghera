// import cloudinary from "cloudinary";
// import Activity from "../models/Activity.js";

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export const uploadActivity = async (title, description, file) => {
//     // Upload image to Cloudinary
//     const result = await cloudinary.v2.uploader.upload(file.path, { folder: "activities" });

//     // Save activity to MongoDB
//     const activity = new Activity({
//         title,
//         description,
//         imageUrl: result.secure_url
//     });

//     return activity.save();
// };

// export const getAllActivities = async () => {
//     return Activity.find();
// };



import cloudinary from "cloudinary";
import fs from "fs";
import Activity from "../models/Activity.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// CREATE
export const uploadActivity = async (title, description, file) => {
  const result = await cloudinary.v2.uploader.upload(file.path, {
    folder: "activities"
  });

  fs.unlinkSync(file.path);

  const activity = new Activity({
    title,
    description,
    imageUrl: result.secure_url,
    publicId: result.public_id
  });

  return activity.save();
};

// READ
export const getAllActivities = async () => {
  return Activity.find().sort({ createdAt: -1 });
};

// UPDATE (SAFE)
export const updateActivity = async (id, title, description, file) => {
  const activity = await Activity.findById(id);
  if (!activity) throw new Error("Activity not found");

  if (file) {
    // ✅ SAFETY CHECK
    if (activity.publicId) {
      await cloudinary.v2.uploader.destroy(activity.publicId);
    }

    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "activities"
    });

    fs.unlinkSync(file.path);

    activity.imageUrl = result.secure_url;
    activity.publicId = result.public_id;
  }

  if (title) activity.title = title;
  if (description) activity.description = description;

  return activity.save();
};

// DELETE (SAFE)
export const deleteActivity = async (id) => {
  const activity = await Activity.findById(id);
  if (!activity) throw new Error("Activity not found");

  // ✅ SAFETY CHECK
  if (activity.publicId) {
    await cloudinary.v2.uploader.destroy(activity.publicId);
  }

  await activity.deleteOne();
  return { message: "Activity deleted successfully" };
};
