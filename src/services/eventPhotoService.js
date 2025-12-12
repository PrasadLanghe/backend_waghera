import cloudinary from "cloudinary";
import EventPhoto from "../models/EventPhoto.js";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadAndSave = async (file, title, description) => {
    const result = await cloudinary.v2.uploader.upload(file.path, { folder: "event_photos" });

    const photo = new EventPhoto({
        title,
        description,
        imageUrl: result.secure_url,
        publicId: result.public_id
    });

    return photo.save();
};

export const getAllPhotos = async () => {
    return EventPhoto.find();
};

export const getPhotoById = async (id) => {
    return EventPhoto.findById(id);
};

export const deletePhoto = async (id) => {
    const photo = await EventPhoto.findById(id);
    if (!photo) return null;

    await cloudinary.v2.uploader.destroy(photo.publicId);
    await EventPhoto.findByIdAndDelete(id);

    return photo;
};
